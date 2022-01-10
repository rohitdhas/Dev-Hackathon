const stripe = require("stripe")(process.env.STRIPE_PRIVET_KEY);
const Purchase = require("../model/purchaseSchema");

const createCheckout = async (req, res) => {
  const { movieName, movieId, price, uid } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: { name: movieName },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL}/purchases`,
      cancel_url: `${process.env.CLIENT_URL}/details/${movieId}`,
    });
    const purchase = await new Purchase({
      movieId,
      uid,
      paymentSuccess: false,
      purchaseId: session.id,
    });
    await purchase.save();

    res.json({ url: session.url });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: resMessages.err });
  }
};

const webhook = async (request, response) => {
  const { type, data } = request.body;
  response.status(200).json({ recieved: true });

  if (type === "checkout.session.completed") {
    const { id, customer_details } = data.object;
    await Purchase.updateOne(
      { purchaseId: id },
      { $set: { paymentSuccess: true, email: customer_details.email } }
    );
  }
};

module.exports = { createCheckout, webhook };
