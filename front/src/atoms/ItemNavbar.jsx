import { useContext } from "react";
import { ValuContext } from "../context/ValuContext";
import { useNavigate } from "react-router-dom";

export const ItemNavbar = ({ Icon, title, link }) => {
  const { carrito } = useContext(ValuContext);
  const { items } = carrito;
  const navigate = useNavigate();
  const handleClick = () => {
    if (title === "Logout") {
      localStorage.removeItem("token");
      navigate("/");
    } else {
      navigate(link);
    }
  };

  return (
    <div
      className="relative flex items-center justify-center gap-2 hover:underline py-2 px-3 rounded-md transition cursor-pointer"
      onClick={handleClick}
    >
      <Icon className="text-xl" />
      <p className="text-xl">{title}</p>
      {title === "Carrito" && items?.length > 0 && (
        <span className="absolute top-1 left-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
          {items?.length > 9 ? "9+" : items?.length}
        </span>
      )}
    </div>
  );
};
