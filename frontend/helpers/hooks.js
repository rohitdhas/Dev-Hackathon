import { useState, useEffect } from "react";

export function useAutocomplete(userInput) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getDocs();
  }, [userInput]);

  async function getDocs() {
    if (!userInput) {
      setData([]);
      return;
    }

    setIsLoading(true);
    const res = await fetch(
      `http://localhost:7000/autocomplete?term=${userInput}&limit=10`
    );
    const { data } = await res.json();
    setIsLoading(false);
    if (data) setData(data);
  }

  return { data, isLoading };
}
