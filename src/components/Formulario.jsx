import { useState, useEffect } from "react";
import Alerta from "./Alerta";
import usePacientes from "../hooks/usePacientes";
import Paciente from "./Paciente";


const Formulario = () => {

  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [sintomas, setSintomas] = useState("");
  const [id, setId] = useState(null);

  const [alerta, setAlerta] = useState({});

  const {guardarPaciente, paciente} = usePacientes();

  useEffect(() => {
    if(paciente?.nombre){
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
      setId(paciente._id)
    }
  },[paciente])

  const handleSubmit = e => {
    e.preventDefault();

    //* Validar el formulario
    if([nombre, propietario, email, fecha, sintomas].includes("")){
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true
      })
      return;
    }

    guardarPaciente({nombre, propietario, email, fecha, sintomas, id  })
    setAlerta({
      msg: "Guardado correctamente",
      error: false
    })
    setNombre("");
    setPropietario("");
    setEmail("");
    setFecha("");
    setSintomas("");
    setId("");
  };

  const {msg} = alerta;
  return (
    <>
        <h2 className="font-black text-xl text-center">Administrador de pacientes</h2>

          <p className="text-xl mt-5 mb-10 text-center">
            Añade tus pacientes y{" "}
            <span className="text-indigo-600 font-bold">
              {" "}
              administralos
            </span>
          </p>

      <form 
      className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md"
      onSubmit={handleSubmit}
      >
        <div className="mb-5">
            <label 
            htmlFor="nombre"
            className="text-gray-700 uppercase font-bold"
            >
                 Nombre Mascota
            </label>
            <input
            id="nombre"
            type="text"
            placeholder="Nombre de la mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange={e => setNombre(e.target.value)} 
             />
        </div>
        <div className="mb-5">
            <label 
            htmlFor="propietario"
            className="text-gray-700 uppercase font-bold"
            >
                 Nombre Propietario
            </label>
            <input
            id="propietario"
            type="text"
            placeholder="Nombre del propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={propietario}
            onChange={e => setPropietario(e.target.value)} 
             />
        </div>
        <div className="mb-5">
            <label 
            htmlFor="email"
            className="text-gray-700 uppercase font-bold"
            >
             Email Propietario
            </label>
            <input
            id="email"
            type="email"
            placeholder="Nombre del email"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={e => setEmail(e.target.value)} 
             />
        </div>
        <div className="mb-5">
            <label 
            htmlFor="fecha"
            className="text-gray-700 uppercase font-bold"
            >
             Fecha Alta 
            </label>
            <input
            id="fecha"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={fecha}
            onChange={e => setFecha(e.target.value)} 
             />
        </div>
        <div className="mb-5">
            <label 
            htmlFor="sintomas"
            className="text-gray-700 uppercase font-bold"
            >
             Sintomas Paciente
            </label>
            <textarea
            id="sintomas"
            placeholder="Describe los sintomas del paciente"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={sintomas}
            onChange={e => setSintomas(e.target.value)} 
             />
        </div>
        <input 
        type="submit"
        className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
        value={id ? "Guardar cambios" : "Agregar paciente"}
         />
      </form>
      {msg && <Alerta alerta={alerta}/>}
    </>
  );
};

export default Formulario;
