import { createContext, useEffect, useState } from "react";

const CitiesContext = createContext();

const BASE_URL = `http://localhost:3002`;

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      async function fetchCities() {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      }

      fetchCities();
    } catch {
      alert("There was an error loading data...");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <CitiesContext.Provider value={{ cities, isLoading }}>
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesProvider, CitiesContext };
