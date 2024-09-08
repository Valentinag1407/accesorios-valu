import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axiosConfig";
import { Input } from "../atoms/Input";
import { CiLock, CiUser } from "react-icons/ci";
import { ValuContext } from "../context/ValuContext";
import { showToast } from "../utils/toast";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUsuario } = useContext(ValuContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("api/token/", {
        username,
        password,
      });
      setUsuario({
        is_admin: response.data.is_admin,
        username: response.data.username,
        email: response.data.email,
      });
      localStorage.setItem("token", response.data.access);
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
      showToast(error.response.data?.detail, "error");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-pink-100 px-5">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <div className="flex flex-col gap-2 justify-center items-center mb-10 w-4/5 my-0 mx-auto">
          <a
            href="/"
            className="flex justify-center border-2 box-border w-20 h-20 bg-gradient-to-b from-gray-100 via-transparent to-gray-100 rounded-md border-gray-100"
          >
            <img src="./img/logo.png" alt="Logo" className="w-20 h-20" />
          </a>
          <h2 className="text-xl font-bold text-center">
            Inicia sesión en tu cuenta
          </h2>
          <p className="text-gray-500 text-center text-sm">
            ¡Bienvenido! Por favor, inicia sesión para acceder a tu cuenta y
            disfrutar de nuestra aplicación.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Username: "
            placeholder="Digite su username"
            Icon={CiUser}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            label="Contraseña: "
            placeholder="Digite su contraseña"
            type="password"
            Icon={CiLock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700"
          >
            Iniciar Sesión
          </button>

          <p className="text-sm text-center">
            ¿No tienes una cuenta?{" "}
            <a
              href="/register"
              className="text-pink-600 hover:text-pink-700 font-bold"
            >
              Registrate
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};
