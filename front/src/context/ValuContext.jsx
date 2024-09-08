import { createContext, useEffect, useState } from "react";
import { checkAuth } from "../auth/validateAuth";

export const ValuContext = createContext(null);

export const ValuProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const result = await checkAuth();
          setUsuario(result.user);
        }
      } catch (error) {
        console.error("Error fetching authentication data:", error);
      }
    };
    fetchAuthData();
  }, []);

  return (
    <ValuContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </ValuContext.Provider>
  );
};
