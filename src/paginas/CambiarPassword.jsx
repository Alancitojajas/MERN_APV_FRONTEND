import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";
  

const CambiarPassword = () => {
  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState({});
  const { guardarPassword } = useAuth();


  const handleSubmit = async (e) => {
    e.preventDefault();
    if(Object.values(password).every(campo => campo === "")){
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true
      })
      return
    }
    if(password.pwd_nuevo.length < 6){
      setAlerta({
        msg: "El password debe de ser mayor a 6 caracteres",
        error: true
      })
      return
    }
    const  respuesta = await guardarPassword(password);

    setAlerta(respuesta)
  };

  const { msg } = alerta;

  return (
    <>
      <AdminNav />

      <h2 className="font-black text-3xl text-center mt-10">
        Cambiar password
      </h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Modifica tu {""}{" "}
        <span className="text-indigo-600 font-bold">Password aqui</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
          {msg && <Alerta alerta={alerta} />}
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                Password actual
              </label>
              <input
                type="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="pwd_actual"
                placeholder="Escribe tu password actual"
                onChange={e => setPassword({
                  ...password,
                  [e.target.name] : e.target.value
                })}
              />
            </div>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                Password nuevi
              </label>
              <input
                type="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="pwd_nuevo"
                placeholder="Escribe tu nuevo password"
                onChange={e => setPassword({
                  ...password,
                  [e.target.name] : e.target.value
                })}
              />
            </div>

            <input
              type="submit"
              value="Actualizar password"
              className="bg-indigo-700 px-10 py-3 font-bold text-white ronded-lg uppercase w-full mt-5 cursor-pointer hover:bg-indigo-800"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default CambiarPassword;
