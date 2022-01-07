import { useState, useEffect } from "react";
import { BASE_SERVER_URL } from "../constants/urls";

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
      `${BASE_SERVER_URL}/autocomplete?term=${userInput}&limit=10`
    );
    const { data } = await res.json();
    setIsLoading(false);
    if (data) setData(data);
  }

  return { data, isLoading };
}
