import Link from 'next/link';
import React, { useState } from 'react';
//import axios from 'axios';
//import { useRouter } from "next/router";
import { api } from "src/utils/api";

/*
const UserPage = () => {
  const { query } = useRouter();
  const userQuery = api.post.create.useMutation();

  return (
    <div>
      <h1>{userQuery.data?.name}</h1>
    </div>
  );
};*/

interface Actividad {
  nombre: string;
  dniPaciente: string;
  fecha: string;
  hora: string;
  tipo: string;
  descripcion: string;
}

const NuevaActividad = () => {
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [nombre, setNombre] = useState<string>('');
  const [fecha, setFecha] = useState<string>('');
  const [hora, setHora] = useState <string>('');
  const [dniPaciente, setDni] = useState<string>('');
  const [descripcion, setDesc] = useState<string>('');
  const [tipo, setTipo] = useState<string>('');
  const { mutate: crearEvento } = api.event.crearEvento.useMutation();

  const handleCrearActividad = () => {
    if (dniPaciente && fecha && hora && tipo && descripcion && nombre) {
      crearEvento({
        event: nombre,
        type: tipo,
        date: fecha,
        time: hora,
        desc: descripcion,
        dniPaciente: dniPaciente
      }, {
        onSuccess: () => {
          const nuevaActividad: Actividad = {
            nombre,
            dniPaciente,
            fecha,
            hora,
            tipo,
            descripcion
          }
      
          setNombre("");
          setDni("");
          setFecha("");
          setHora("");
          setTipo("");
          setDesc("");
      
          setActividades ((prevActividades) => [...prevActividades, nuevaActividad])

          console.log("Bien");
        },
        onError: (err) => {
          console.log(err);
          alert ('El dni no coincide con el de un paciente dado de alta \n \n ¡Registrelo primero!')
          setNombre("");
          setDni("");
          setFecha("");
          setHora("");
          setTipo("");
          setDesc("");
        }
      })
    } else {
      alert ("Complete todos los campos");
    }

  };

  /*
  const handleCompletarActividad = (index: number) => {
    setActividades((prevActividades) =>
      prevActividades.map((actividad, i) =>
        i === index
          ? { ...actividad, completada: !actividad.completada }
          : actividad
      )
    );
  };*/
  
  const [isNameMoved, setIsNameMoved] = useState(false);
  const [isTypeMoved, setIsTypeMoved] = useState(false);
  const [isDNIMoved, setIsDNIMoved] = useState(false);
  const [isDescriptionMoved, setIsDescriptionMoved] = useState(false);
  const [isDateMoved, setIsDateMoved] = useState(false);
  const [isTimeMoved, setIsTimeMoved] = useState(false);




  const handleInputBlur = () => {
    setIsNameMoved(false);
    setIsTypeMoved(false);
    setIsDNIMoved(false);
    setIsDescriptionMoved(false);
    setIsDateMoved(false);
    setIsTimeMoved(false);
  };




  const handleInputClick = (field: string) => {
    setIsNameMoved(field === 'Name');
    setIsTypeMoved(field === 'Type');
    setIsDNIMoved(field === 'DNI');
    setIsDescriptionMoved(field === 'Description');
    setIsDateMoved(field === 'Date');
    setIsTimeMoved(field === 'Time');
  };




  const handleChange = (field: string, value: string) => {
    switch (field) {
      case 'Name':
        setNombre(value);
        break;
      case 'DNI':
        setDni(value);
        break;
      case 'Type':
        setTipo(value);
        break;
      case 'Date':
        setFecha(value);
        break;
      case 'Time':
        setHora(value);
        break;
      case 'Description':
        setDesc(value);
        break;
      default:
        break;
    }
  };

  

  return (
    <main>
      
      <header className="bg-purple-700 px-6 py-5 text-center text-3xl text-white">
        <Link href="/PanelDeActividades" className="text-base float-left mr-4 rounded border border-grey-600 p-2">Volver</Link>
        Panel de actividades
      </header>




      <div className="rounded border-2 border-grey-600 bg-white px-20 py-6 shadow-xl ">
        <div className="grid grid-cols-2 gap-4 max-w-screen-md mx-auto ">
          <div className="">
            <div className="relative py-3">
              <label className="relative">
                <input
                  className="w-full rounded-md border-[2.5px] border-blue-700 px-4 py-2 outline-none transition duration-200 focus:border-blue-700 focus:text-black"
                  type="text"
                  id="Name"
                  onClick={() => handleInputClick('Name')}
                  onBlur={handleInputBlur}
                  onChange={(e) => {
                    handleChange('Name', e.target.value);
                  }}
                  value={nombre}
                />
                <span
                  className={`text-1xl absolute -top-[1.5px] left-4 bg-white text-black text-opacity-75 transition duration-200 ${
                    isNameMoved || nombre !== ''
                      ? '-translate-y-[20.5px] transform text-sm text-blue-700 text-opacity-100'
                      : ''
                  }`}
                >
                  &nbsp;Nombre&nbsp;
                </span>
              </label>
            </div>
          </div>




          <div className="">
            <div className="relative py-3">
              <label className="relative">
                <input
                  className="w-full rounded-md border-[2.5px] border-blue-700 px-4 py-2 outline-none transition duration-200 focus:border-blue-700 focus:text-black"
                  type="text"
                  id="DNI"
                  onClick={() => handleInputClick('DNI')}
                  onBlur={handleInputBlur}
                  onChange={(e) => {
                    handleChange('DNI', e.target.value);
                  }}
                  value={dniPaciente}
                />
                <span
                  className={`text-1xl absolute -top-[1.5px] left-4 bg-white text-black text-opacity-75 transition duration-200 ${
                    isDNIMoved || dniPaciente !== ''
                      ? '-translate-y-[20.5px] transform text-sm text-blue-700 text-opacity-100'
                      : ''
                  }`}
                >
                  &nbsp;DNI&nbsp;
                </span>
              </label>
            </div>
          </div>




          <div className="">
            <div className="relative py-3">
              <label className="relative">
                <input
                  className="w-full rounded-md border-[2.5px] border-blue-700 px-4 py-2 outline-none transition duration-200 focus:border-blue-700 focus:text-black"
                  type="text"
                  id="Type"
                  onClick={() => handleInputClick('Type')}
                  onBlur={handleInputBlur}
                  onChange={(e) => {
                    handleChange('Type', e.target.value);
                  }}
                  value={tipo}
                />
                <span
                  className={`text-1xl absolute -top-[1.5px] left-4 bg-white text-black text-opacity-75 transition duration-200 ${
                    isTypeMoved || tipo !== ''
                      ? '-translate-y-[20.5px] transform text-sm text-blue-700 text-opacity-100'
                      : ''
                  }`}
                >
                  &nbsp;Tipo&nbsp;
                </span>
              </label>
            </div>
          </div>




          <div className=" flex">
            <div className="w-1/2">
              <div className="relative py-3">
                <label className="relative">
                  <input
                    className="w-full rounded-md border-[2.5px] border-blue-700 px-4 py-2 outline-none transition duration-200 focus:border-blue-700 focus:text-black"
                    type="text"
                    id="Date"
                    onClick={() => handleInputClick('Date')}
                    onBlur={handleInputBlur}
                    onChange={(e) => {
                      handleChange('Date', e.target.value);
                    }}
                    value={fecha}
                  />
                  <span
                    className={`text-1xl absolute -top-[1.5px] left-4 bg-white text-black text-opacity-75 transition duration-200 ${
                      isDateMoved || fecha !== ''
                        ? '-translate-y-[20.5px] transform text-sm text-blue-700 text-opacity-100'
                        : ''
                    }`}
                  >
                    &nbsp;Fecha&nbsp;
                  </span>
                </label>
              </div>
            </div>




            <div className="w-1/2 pl-2">
              <div className="relative py-3">
                <label className="relative">
                  <input
                    className="w-full rounded-md border-[2.5px] border-blue-700 px-4 py-2 outline-none transition duration-200 focus:border-blue-700 focus:text-black"
                    type="text"
                    id="Time"
                    onClick={() => handleInputClick('Time')}
                    onBlur={handleInputBlur}
                    onChange={(e) => {
                      handleChange('Time', e.target.value);
                    }}
                    value={hora}
                  />
                  <span
                    className={`text-1xl absolute -top-[1.5px] left-4 bg-white text-black text-opacity-75 transition duration-200 ${
                      isTimeMoved || hora !== ''
                        ? '-translate-y-[20.5px] transform text-sm text-blue-700 text-opacity-100'
                        : ''
                    }`}
                  >
                    &nbsp;Hora&nbsp;
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex max-w-screen-md mx-auto items-center">
  <div className="w-3/4 py-3 pr-2">
    <label className="relative">
      <input
        className="w-full rounded-md border-[2.5px] border-blue-700 px-4 py-5 outline-none transition duration-200 focus:border-blue-700 focus:text-black"
        type="text"
        id="Description"
        onClick={() => handleInputClick('Description')}
        onBlur={handleInputBlur}
        onChange={(e) => {
          handleChange('Description', e.target.value);
        }}
        value={descripcion}
      />
      <span
        className={`text-1xl absolute -top-[1.5px] left-4 bg-white text-black text-opacity-75 transition duration-200 ${
          isDescriptionMoved || descripcion !== ''
            ? '-translate-y-[32.5px] transform text-sm text-blue-700 text-opacity-100'
            : ''
        }`}
      >
        &nbsp;Descripcion&nbsp;
      </span>
    </label>
  </div>
  <div className="w-1/4 ">
    <button
      onClick={handleCrearActividad}
      className="h-full w-full items-center justify-center bg-blue-700 p-4 text-white bg-center"
    >
      Crear
    </button>
  </div>
</div>
        {/* Mostrar la lista de actividades */}
        <div className="mt-6">
          <h2 className="mb-2 text-xl font-semibold">Lista de Actividades</h2>
          <ul>
            {actividades.map((actividad, index) => (
              <li
                key={index}
                className="mb-4 flex flex-col rounded border p-4 md:flex-row md:items-center"
              >
                {/* Detalles de la actividad */}
                <div className="md:mr-4 md:w-1/6">
                  <strong>Hora:</strong> {actividad.hora}
                  <br />
                  <strong>Fecha:</strong> {actividad.fecha}
                </div>
                <div className="md:mr-4 md:w-1/6">
                  <strong>DNI:</strong> {actividad.dniPaciente}
                </div>
                <div className="grid-cols w-1/6">
                  <strong>Nombre:</strong> {actividad.nombre}
                  <br />
                  <strong>Tipo:</strong> {actividad.tipo}
                  <br />
                </div>
                <div className="md:mr-4 md:w-1/2">
                  <strong>Descripción:</strong> {actividad.descripcion}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
};


export default NuevaActividad;
