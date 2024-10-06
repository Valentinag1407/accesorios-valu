import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-pink-50 text-center py-8">
      <div className="flex md:flex-row flex-col items-center justify-around gap-8 text-gray-800 px-6 w-2/3 m-auto">
        <div>
          <h2 className="font-bold text-lg mb-4">Contactanos:</h2>
          <p>Valú Accesorios</p>
          <p>🛒 Tienda Online - Neiva, Colombia</p>
          <p>✉️ vagape1407@gmail.com</p>
          <p>
            📱 Teléfono & WhatsApp:{" "}
            <a href="https://api.whatsapp.com/message/SPESBROOKCQVA1?autoload=1&app_absent=0">
              +57 3237119619
            </a>
          </p>
        </div>

        <div>
          <h2 className="font-bold text-lg mb-4">Información:</h2>
          <ul>
            <li>
              <a href="/" className="hover:underline">
                Inicio
              </a>
            </li>
            <li>
              <a href="/Productos" className="hover:underline">
                Productos
              </a>
            </li>
            <li>
              <a href="/About" className="hover:underline">
                Sobre nosotros
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-bold text-lg mb-4">Categorías:</h2>
          <ul>
            <li>
              <a href="/productos/Aretes" className="hover:underline">
                Aretes
              </a>
            </li>
            <li>
              <a href="/productos/Collares" className="hover:underline">
                Collares
              </a>
            </li>
            <li>
              <a href="/productos/Manillas" className="hover:underline">
                Manillas
              </a>
            </li>
            <li>
              <a href="/productos/Earcuffs" className="hover:underline">
                Earcuff
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex flex-col items-center">
          <div className="flex justify-center gap-4 mt-4">
            <FaFacebook
              className="text-2xl hover:text-gray-600 cursor-pointer"
              onClick={() =>
                window.open(
                  "https://www.facebook.com/valu.accesorios14?mibextid=ZbWKwL",
                  "_blank"
                )
              }
            />
            <FaInstagram
              className="text-2xl hover:text-gray-600 cursor-pointer"
              onClick={() =>
                window.open(
                  "https://www.instagram.com/accesorioss__valu/",
                  "_blank"
                )
              }
            />
            <FaTiktok
              className="text-2xl hover:text-gray-600 cursor-pointer"
              onClick={() =>
                window.open(
                  "https://www.instagram.com/accesorioss__valu/",
                  "_blank"
                )
              }
            />
          </div>
          <p className="mt-4 text-sm text-gray-600">
            ©2024 Valú Accesorios | Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
