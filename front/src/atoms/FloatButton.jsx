import { useState } from "react";
import { FaShare, FaFacebookF, FaWhatsapp } from "react-icons/fa";

export const FloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleButtons = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-center">
      {isOpen && (
        <a
          href="https://wa.me/message/SPESBROOKCQVA1"
          className="mb-2 bg-black hover:bg-red-300 text-white rounded-full p-3 shadow-md transition duration-300 ease-in-out"
          target="_blank"
        >
          <FaWhatsapp className="text-xl" />
        </a>
      )}
      {isOpen && (
        <a
          href="https://www.facebook.com/valu.accesorios14?mibextid=ZbWKwL"
          className="mb-2 bg-black hover:bg-red-300 text-white rounded-full p-3 shadow-md transition duration-300 ease-in-out"
          target="_blank"
        >
          <FaFacebookF className="text-xl" />
        </a>
      )}
      <a
        onClick={toggleButtons}
        className="bg-black hover:bg-red-300 text-white rounded-full p-4 shadow-lg transition duration-300 ease-in-out cursor-pointer"
      >
        <FaShare className="text-2xl" />
      </a>
    </div>
  );
};
