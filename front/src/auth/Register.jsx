import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "../atoms/Input";
import { CiUser, CiMail, CiLock, CiPhone, CiHome } from "react-icons/ci";
import { api } from "../api/axiosConfig";
import { ValuContext } from "../context/ValuContext";
import { showToast } from "../utils/toast";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [celular, setCelular] = useState("");
  const [direccion, setDireccion] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [barrio, setBarrio] = useState("");
  const [departamentos, setDepartamentos] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [passwordError, setPasswordError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();
  const { setUsuario } = useContext(ValuContext);
  useEffect(() => {
    const fetchDepartamentos = async () => {
      try {
        const response = await axios.get(
          "https://api-colombia.com/api/v1/Department"
        );
        const data = response.data;
        data.sort((a, b) => a.name.localeCompare(b.name));
        setDepartamentos(data);
      } catch (error) {
        console.error("Error fetching departments and cities:", error);
      }
    };

    fetchDepartamentos();
  }, []);

  useEffect(() => {
    const fetchCiudades = async () => {
      if (departamento) {
        try {
          const response = await axios.get(
            `https://api-colombia.com/api/v1/Department/${departamento.id}/cities`
          );
          const data = response.data;
          data.sort((a, b) => a.name.localeCompare(b.name));
          setCiudades(data);
        } catch (error) {
          console.error("Error fetching cities:", error);
        }
      }
    };

    fetchCiudades();
  }, [departamento]);

  const handleDepartamentoChange = (e) => {
    const selectedDepartamento = parseInt(e.target.value);
    const departamento = departamentos.find(
      (dep) => dep.id === selectedDepartamento
    );
    setDepartamento(departamento);
    setCiudad("");
  };

  const validateFields = () => {
    let errors = {};

    if (!/^[a-zA-Z]+$/.test(firstName)) {
      errors.firstName = "El nombre solo debe contener letras.";
    }

    if (!/^[a-zA-Z]+$/.test(lastName)) {
      errors.lastName = "El apellido solo debe contener letras.";
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = "El email no tiene un formato válido.";
    }

    if (!/^\d{10}$/.test(celular)) {
      errors.celular = "El celular debe tener 10 dígitos.";
    }

    if (direccion.length < 5) {
      errors.direccion = "La dirección debe tener al menos 5 caracteres.";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden.";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      showToast("Por favor, corrige los errores en el formulario.", "error");
      return;
    }

    try {
      const response = await api.post("api/register/", {
        username,
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        celular,
        direccion,
        estado: 1,
        departamento: departamento?.name,
        ciudad,
        barrio,
        rol: 2,
      });
      setUsuario(response.data.user);
      localStorage.setItem("token", response.data.access);
      navigate("/");
      showToast("Usuario registrado exitosamente", "success");
    } catch (error) {
      showToast("Error registrando el usuario", "error");
      console.error("Error registering:", error);
    }
  };

  return (
    <div className="flex justify-center min-h-screen items-center py-10 px-5 bg-pink-100">
      <div className="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg">
        <div className="flex flex-col gap-2 justify-center items-center mb-10 w-4/5 my-0 mx-auto">
          <a
            href="/"
            className="flex justify-center border-2 box-border w-20 h-20 bg-gradient-to-b from-gray-100 via-transparent to-gray-100 rounded-md border-gray-100"
          >
            <img src="/img/logo.png" alt="Logo" className="w-20 h-20" />
          </a>
          <h2 className="text-xl font-bold text-center">Registrate</h2>
          <p className="text-gray-500 text-center text-sm">
            ¡Bienvenido! Por favor, rellena este formulario para crear tu
            cuenta.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              label="Username: "
              placeholder="Jhon Doe"
              Icon={CiUser}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              error={validationErrors.username}
            />

            <Input
              label="Email: "
              placeholder="jhon@doe.com"
              Icon={CiMail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              error={validationErrors.email}
            />

            <Input
              label="Nombre: "
              placeholder="Jhon"
              Icon={CiUser}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              error={validationErrors.firstName}
            />

            <Input
              label="Apellido: "
              placeholder="Doe"
              Icon={CiUser}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              error={validationErrors.lastName}
            />

            <Input
              label="Celular: "
              placeholder="310000000"
              Icon={CiPhone}
              type="number"
              value={celular}
              onChange={(e) => setCelular(e.target.value)}
              required
              error={validationErrors.celular}
            />
            <Input
              label="Dirección: "
              placeholder="Calle 123"
              Icon={CiHome}
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              required
              error={validationErrors.direccion}
            />

            <div className="col-span-1">
              <label
                className="block text-gray-400 text-xs font-bold mb-1"
                htmlFor="departamento"
              >
                Departamento:
              </label>
              <select
                id="departamento"
                value={departamento.id || ""}
                onChange={handleDepartamentoChange}
                className="w-full px-3 py-2 border border-gray-300 rounded cursor-pointer"
                required
              >
                <option value="">Selecciona un departamento</option>
                {departamentos.map((dep) => (
                  <option key={dep.id} value={dep.id}>
                    {dep.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-1">
              <label
                className="block text-gray-400 text-xs font-bold mb-1"
                htmlFor="ciudad"
              >
                Ciudad:
              </label>
              <select
                id="ciudad"
                value={ciudad}
                onChange={(e) => setCiudad(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded cursor-pointer"
                required
              >
                <option value="">Selecciona una ciudad</option>
                {ciudades.map((ciu) => (
                  <option key={ciu.id} value={ciu.name}>
                    {ciu.name}
                  </option>
                ))}
              </select>
            </div>
            <Input
              label="Barrio: "
              placeholder="Barrio"
              Icon={CiHome}
              value={barrio}
              onChange={(e) => setBarrio(e.target.value)}
              required
            />
            <div className="col-span-1 md:col-span-2"></div>
            <Input
              label="Password: "
              placeholder="********"
              Icon={CiLock}
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              required
            />
            <Input
              label="Confirm Password: "
              placeholder="********"
              Icon={CiLock}
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setPasswordError("");
              }}
              required
            />
            {passwordError && (
              <div className="col-span-1 md:col-span-2 text-red-500 text-sm mt-1">
                {passwordError}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 mt-3"
          >
            Registrate
          </button>

          <p className="text-sm text-center mt-4">
            ¿Ya tienes una cuenta?{" "}
            <a
              href="/login"
              className="text-pink-600 hover:text-pink-700 font-bold"
            >
              Inicia sesión
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};
