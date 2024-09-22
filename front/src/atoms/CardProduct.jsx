import { useNavigate } from "react-router-dom";
import { api } from "../api/axiosConfig";
import { useContext, useEffect, useState } from "react";
import { ValuContext } from "../context/ValuContext";
import { showToast } from "../utils/toast";
import { formatearDinero } from "../utils/formatDiner";
import { IoMdAddCircle, IoMdRemoveCircle } from "react-icons/io";

export const CardProduct = ({
  id,
  img,
  title,
  link,
  precio,
  cantidad: cantidadTotal,
  carrito: carritoState = false,
}) => {
  const { idCarrito, carrito, setAdd } = useContext(ValuContext);
  const { items } = carrito;
  const navigate = useNavigate();
  const [cantidad, setCantidad] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [firstTime, setFirstTime] = useState(true);

  useEffect(() => {
    if (!items) return;
    const productInCart = items.find((item) => item.producto.id === id);
    if (productInCart) {
      setCantidad(productInCart.cantidad);
      setAddedToCart(true);
    }
  }, [items, id]);

  const handleClick = () => {
    navigate(link);
  };

  useEffect(() => {
    if (addedToCart || cantidad === 0) {
      api.post("/items_carrito/create/", {
        carrito_id: idCarrito,
        producto_id: id,
        cantidad,
      });
    }
  }, [addedToCart, cantidad, idCarrito, id, setAdd]);

  const addToCart = async () => {
    try {
      const response = await api.post("/items_carrito/create/", {
        carrito_id: idCarrito,
        producto_id: id,
        cantidad,
      });

      if (response.status === 201) {
        if (firstTime) {
          setAdd((prev) => !prev);
          showToast("Producto agregado al carrito", "success");
          setFirstTime(false);
        }
        setAddedToCart(true);
      }
    } catch {
      showToast("Error agregando el producto al carrito", "error");
    }
  };

  const increment = () => {
    if (cantidad < cantidadTotal) {
      setCantidad((prev) => prev + 1);
    }
  };

  const decrement = () => {
    if (cantidad === 1) {
      setAddedToCart(false);
    }
    setCantidad((prev) => prev - 1);
  };

  return (
    <div
      onClick={() => {
        !carritoState && handleClick();
      }}
      className="relative flex flex-col w-64 mx-auto bg-gradient-to-r from-pink-50 to-pink-100 shadow-lg rounded-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-[1.02] duration-300 border border-gray-200"
    >
      <img
        src={img}
        alt={title}
        className="w-full h-60 object-cover rounded-t-lg min-h-[60%]"
      />
      <div className="px-3 py-2 flex flex-col h-full">
        <h3 className="text-md font-bold text-center text-gray-800 mb-2 truncate">
          {title}
        </h3>
        <p className="text-xl text-center font-semibold text-pink-700 mb-3">
          {formatearDinero(precio)}
        </p>
        <div className="flex items-center justify-between flex-col text-sm text-gray-600 mb-4">
          <p className="font-medium mb-3">
            Cantidad disponible: {cantidadTotal}
          </p>
          {carritoState && !addedToCart ? (
            <button
              className="bg-pink-600 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-pink-700 transition-colors duration-300"
              onClick={addToCart}
            >
              Añadir al carrito
            </button>
          ) : (
            carritoState &&
            addedToCart && (
              <div className="flex items-center space-x-2">
                <IoMdRemoveCircle
                  className="text-pink-600 cursor-pointer w-8 h-8"
                  onClick={decrement}
                />
                <span className="mx-2">{cantidad}</span>
                <IoMdAddCircle
                  className="text-pink-600 cursor-pointer w-8 h-8"
                  onClick={increment}
                />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
