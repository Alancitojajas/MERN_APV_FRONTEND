
import clienteAxios from "../config/axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta";
const Registrar = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPaswword] = useState("");
  const [repetirPassword, setRepetirPaswword] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, email, password, repetirPassword].includes("")) {
      setAlerta({ msg: "Hay campos vacios", error: true });
      return;
    }

    if (password !== repetirPassword) {
      setAlerta({ msg: "Los passwords no son iguales", error: true });
      return;
    }

    if (password.length < 6) {
      setAlerta({
        msg: "El password debe ser mayor a 6 caracteres",
        error: true,
      });
      return;
    }
    setAlerta({})

    // crear el usuario en la API
    try {
      await clienteAxios.post(`/veterinarios`, {nombre, email, password});
      setAlerta({
        msg: "Creado correctamente, revisa tu email",
        error: false
      })
      
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error:  true
      })
    }
  };

  const {msg} = alerta;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Crea tu cuenta y administra tus
          <span className="text-black"> Pacienes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">


        {msg && <Alerta alerta={alerta} />}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Nombre
            </label>
            <input
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Email
            </label>
            <input
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              type="email"
              placeholder="Email de registro"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Password
            </label>
            <input
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPaswword(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Confirmar Password
            </label>
            <input
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              type="password"
              placeholder="Repite tu password"
              value={repetirPassword}
              onChange={(e) => setRepetirPaswword(e.target.value)}
            />
          </div>
          <input
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
            type="submit"
            value="Crear cuenta"
          />
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link className="block text-center my-5 text-gray-500" to="/">
            ¿Ya tienes una cuenta? Inicia sesión
          </Link>
          <Link
            className="block text-center my-5 text-gray-500"
            to="/olvide-password"
          >
            Olvidé mi password
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Registrar;
