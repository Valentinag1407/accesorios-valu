import { ItemNavbar } from "../atoms/ItemNavbar";
import {
  FaStoreAlt,
  FaUser,
  FaShoppingCart,
  FaClipboardList,
} from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { MdContactPhone } from "react-icons/md";
import { useContext, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgClose } from "react-icons/cg";
import { IoExitSharp } from "react-icons/io5";
import { ValuContext } from "../context/ValuContext";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { usuario } = useContext(ValuContext);
  const toggleMenu = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between px-4 bg-rose-100 shadow-md fixed top-0 left-0 right-0 h-auto min-h-[80px] z-10">
      <div className="flex items-start justify-between lg:items-center w-full h-full py-2">
        <button className="lg:hidden text-xl" onClick={toggleMenu}>
          {isOpen ? <CgClose /> : <GiHamburgerMenu />}
        </button>
        <div className="flex flex-grow items-start justify-start lg:items-center lg:justify-between lg:w-auto">
          <img
            src="/img/logo.png"
            alt="logo"
            className="hidden lg:block object-cover rounded-full w-24 h-24 border border-pink-300 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <div
            className={`flex lg:flex items-start justify-between lg:items-center lg:gap-4 lg:w-auto flex-col lg:flex-row ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <ItemNavbar Icon={AiFillHome} title="Inicio" link="/" />
            <ItemNavbar Icon={FaStoreAlt} title="Productos" link="/Productos" />
            <ItemNavbar
              Icon={MdContactPhone}
              title="Sobre Nosotros"
              link="/About"
            />
            {usuario?.is_admin && (
              <>
                <ItemNavbar Icon={FaUser} title="Admin" link="/admin" />
                <ItemNavbar
                  Icon={FaClipboardList}
                  title="Pedidos"
                  link="/Pedidos"
                />
              </>
            )}
            {usuario ? (
              <>
                <ItemNavbar
                  Icon={FaShoppingCart}
                  title="Carrito"
                  link="/Carrito"
                />
                <ItemNavbar Icon={IoExitSharp} title="Logout" link="/" />
              </>
            ) : (
              <ItemNavbar Icon={FaUser} title="Login" link="/login" />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
