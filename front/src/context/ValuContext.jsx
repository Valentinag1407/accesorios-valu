import { createContext, useEffect, useState } from "react";
import { checkAuth } from "../auth/validateAuth";
import { api } from "../api/axiosConfig";

export const ValuContext = createContext(null);

export const ValuProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [categories, setCategories] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [idCarrito, setIdCarrito] = useState(null);
  const [add, setAdd] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categorias/get/");
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, [carrito]);

  useEffect(() => {
    if (!usuario) return;
    const fetchCarrito = async () => {
      try {
        const response = await api.get(`/carrito/get/${usuario.id}`, {});
        setCarrito(response.data);
        setIdCarrito(response.data.carrito_id);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCarrito();
  }, [usuario, add]);

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
    <ValuContext.Provider
      value={{
        usuario,
        setUsuario,
        categories,
        carrito,
        setCarrito,
        idCarrito,
        setAdd,
      }}
    >
      {children}
    </ValuContext.Provider>
  );
};
