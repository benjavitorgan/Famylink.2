import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/router";
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
  //const [actividades, setActividades] = useState<Actividad[]>([]);
  const [nombre, setNombre] = useState<string>('');
  const [fecha, setFecha] = useState<string>('');
  const [hora, setHora] = useState <string>('');
  const [dniPaciente, setDni] = useState<string>('');
  const [descripcion, setDesc] = useState<string>('');
  const [tipo, setTipo] = useState<string>('');

  const handleCrearActividad = () => {
    if (dniPaciente && fecha) {
      const nuevaActividad: Actividad = {
        nombre,
        dniPaciente,
        fecha,
        hora,
        tipo,
        descripcion,
      };
      console.log(nuevaActividad);
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
  
  
  

  return (
    <main>
      <header className="bg-purple-700 py-5 px-6 text-3xl text-white text-center">
        Panel de actividades
      </header>
  
      <div className="text-center py-5">
        <h1 className="text-3xl">Crear una nueva actividad</h1>
      </div>
      <div className="px-20 py-6 bg-white shadow-xl border-2 border-blue-700 rounded">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full p-2 border-2 text-xl border-gray-300"
            />
          </div>
          <div className="col-span-1">
            <input
              type="text"
              placeholder="DNI"
              value={dniPaciente}
              onChange={(e) => setDni(e.target.value)}
              className="w-full p-2 border-2 text-xl border-gray-300"
            />
          </div>
          <div className="col-span-1">
            <input
              type="text"
              placeholder="Tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full p-2 border-2 text-xl border-gray-300"
            />
          </div>
          <div className="col-span-1 flex">
          <div className="w-1/2">
            <input
              type="text"
              placeholder="Fecha"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="w-full p-2 border-2 text-xl border-gray-300"
          />
          </div>
          <div className="w-1/2 pl-2">
            <input
              type="text"
              placeholder="Hora"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              className="w-full p-2 border-2 text-xl border-gray-300"
          />
          </div>
          </div>
          <div className="col-span-1">
            <input
              type="text"
              placeholder="Descripcion"
              value={descripcion}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full h-20 p-2 border-2 text-xl border-gray-300"
            />
          </div>
          <div className="col-span-1 text-right">
            <button onClick={handleCrearActividad} className="w-1/2 h-20 p-4 bg-blue-700 text-white items-center justify-center">
              Crear
            </button>
          </div>
        </div>
      </div>
      {/* <div className="py-3"></div> */}
      {/* <div className="px-16">
        {actividades.map((actividad, index) => (
          <div
            key={index}
            className={`flex justify-between items-center py-2 px-5 bg-gray-100 border-t border-b border-gray-300 ${
              actividad.completada ? 'line-through text-green-600 text-2xl' : ''
            }`}
          >
            <div>
              {actividad.fecha}: {actividad.nombre}
            </div>
            <input type="checkbox" checked={actividad.completada} onChange={() => handleCompletarActividad(index)} className="w-5 h-5" />
          </div>
        ))}
      </div> */}
    </main>
  );
};

export default NuevaActividad;
