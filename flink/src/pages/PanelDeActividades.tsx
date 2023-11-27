import React, { useState } from 'react';
import Image from 'next/image'
import { api } from "src/utils/api";
import Link from 'next/link';
//import { actionAsyncStorage } from 'next/dist/client/components/action-async-storage.external';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  //const closeMenu = () => {
    //setIsOpen(false);
  //};

  return (

    <div className="relative">
      <button
        className={`fixed top-4 ${
          isOpen ? 'left-72' : 'left-4'
        } z-50 p-2 rounded-md bg-gray-800 text-white transition-all duration-300 ease-in-out`}
        onClick={toggleMenu}
       
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
      

      {isOpen && (
        <div className="fixed top-0 left-0 w-3/4 lg:w-1/4 h-screen bg-gray-800 bg-opacity-50 z-40">
          <div className="flex flex-row h-16 w-full bg-purple-700 ">
          <Image
            src="/Familylink_Simple-removebg-preview.png"
            alt="Picture of the author"
            width={40}
            height={40}
          />
            
            <p className="flex pt-2 text-white text-5xl font-thin">Familylink</p>
          </div>
          
          <ul className="bg-white flex flex-col items-center justify-center h-screen -md shadow-md text-3xl">
            <li className="py-4 hover:underline "><Link href="/Landing">Volver</Link></li>
            <svg width="94" height="4" viewBox="0 0 94 4" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="94" height="4" rx="2" fill="black"/>
            </svg>
            <li className="py-4 hover:underline"><Link href="/Landing">Terminos y condiciones</Link></li>
            <svg width="94" height="4" viewBox="0 0 94 4" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="94" height="4" rx="2" fill="black"/>
            </svg>
            <li className="py-4 hover:underline"><Link href="/Landing">Sobre nosotros</Link></li>
            <svg width="94" height="4" viewBox="0 0 94 4" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="94" height="4" rx="2" fill="black"/>
            </svg>
            <li className="py-4 hover:underline"><Link href="/NewAccounts">Crear cuenta</Link></li>
          </ul>
          
        </div>

      )}
    </div>
  );
};

interface Evento {
  nombre: string;
  fecha: string;
  hora: string;
  tipo: string;
  descripcion: string;
}

interface SugerenciaEncontrada {
  dniMedico: string;
  sugerencia: string;
  nombreCreador: string;
}
const PanelActs = () => {

  const[newEvent, setnewEvent] = useState<Evento[]>([]);
  const[newSuggest, setnewSuggest] = useState<SugerenciaEncontrada[]>([]);
  const[dniPrincipal, setDni] = useState('');
  const[dniPaciente, setDniP] = useState('');
  const[dniMedico, setDniM] = useState('');
  const[sugerencia, setSugerencia] = useState('');
  const[nombreCreador, setNombreC] = useState('');
  const { mutate: crearSugerencia } = api.event.crearSugerencia.useMutation();
  const { mutate: buscarEvento } = api.event.buscarEvento.useMutation();
  const { mutate: buscarSugerencia } = api.event.buscarSugerencia.useMutation();

  const handleBuscarPersona = () => {
    if (dniPrincipal) {
      buscarEvento ({
        dni: dniPrincipal
      }, {
        onSuccess: (act) => {
          if (act.length > 0) {
            const eventosEncontrados = act.map((evento) => ({
              nombre: evento.event,
              fecha: evento.date,
              hora: evento.time,
              tipo: evento.type,
              descripcion: evento.desc,
            }));

            setnewEvent(eventosEncontrados);

            // Ahora eventosEncontrados es un array de objetos Evento
            console.log(eventosEncontrados);
          }
          },
        onError: (err) => {
          console.log(err);
          alert ("No se han encontrado eventos")
        }
      })
      buscarSugerencia ({
        dni: dniPrincipal
      }, {
        onSuccess: (sug) => {
          if (dniPrincipal) {
            const SugerenciasEncontradas = sug.map((sugerencia) => ({
              dniMedico: sugerencia.dniMedico,
              sugerencia: sugerencia.suggestion,
              nombreCreador: sugerencia.creatorName ?? ""
            }));

            setnewSuggest(SugerenciasEncontradas);
            // Ahora eventosEncontrados es un array de objetos Evento
            console.log(SugerenciasEncontradas);
          }
        }, onError: (err) => { 
            console.log(err);
            alert ("No se han encontrado sugerencias");
        }
      })
    } else {
      alert ("Ingrese un dni");
    }
  }

  const handleCrearSugerencia = () => {
    if (dniPaciente && dniMedico) {
      crearSugerencia({
        dniMedico: dniMedico,
        dniPaciente: dniPaciente,
        suggestion: sugerencia,
        creatorName: nombreCreador,
        isVerified: false
      }, {
        onSuccess: () => {
          console.log("Bien");
        },
        onError: (err) => {
          console.log(err);
        }
      })
    }
  }

  return (
    <main>
      <svg
        className="absolute left-0 top-0 z-10"
        viewBox="0 0 1366 209"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1364 0H-2V72.6316H1364V0Z" fill="#7E22CE" />
        <path d="M1364 46.4036H956V127.105H1364V46.4036Z" fill="#7E22CE" />
        <path d="M552 31.272H329V111.974H552V31.272Z" fill="#7E22CE" />
        <path d="M73 31.272H-2V111.974H73V31.272Z" fill="#7E22CE" />
        <path
          d="M-116 190.971C-116 190.971 100.87 84.8151 190.501 76.4756C298.712 66.4081 353.52 144.484 462 138.011C570.751 131.521 628.361 78.2571 736.5 64.9534C914.667 43.0359 1010 217.198 1171 170.291C1223.65 154.95 1286.69 119.427 1341.5 119.427C1414.5 119.427 1599.68 88.0765 1599.68 88.0765"
          stroke="#85DFF3"
          strokeWidth="38"
        />
        <path
          d="M-66 159.246C-66 159.246 76.9074 51.0221 171.333 43.6339C285.334 34.7139 341.799 109.738 456.028 104.257C570.54 98.7623 636.526 43.7898 750.5 31.7764C935.5 22.6974 992.769 205.661 1167 137.585C1224.5 115.118 1305 75.041 1366 75.041C1451.72 75.041 1576.68 43.6339 1576.68 43.6339"
          stroke="#4151DA"
          strokeWidth="53"
        />
      </svg>
      <Navbar />
      <div className="relative flex h-screen flex-col items-center justify-center overflow-y-auto border-t border-blue-600">
        <h1 className="py-5 text-3xl">Ingrese el dni</h1>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Dni del familiar"
            value={dniPrincipal}
            onChange={(e) => setDni(e.target.value)}
            className="h-10 w-64 border-2 border-gray-300 p-2 text-xl"
          />
          <button
            onClick={handleBuscarPersona}
            className="h-10 w-32 bg-blue-700 p-2 text-white"
          >
            Buscar
          </button>
        </div>


        <div className="absolute right-6 flex h-32 items-center justify-center ">
          <div className="w-86 shadow-grey rounded border-2 border-blue-700 bg-white px-16 py-6 shadow-xl">
            <Link href="/Paneles" className="text-xl font-thin text-black">
              Crear nuevas actividades
            </Link>
          </div>
        </div>
      </div>


      <div className="flex px-32 w-full justify-center gap-x-48">
        {/* Lista de Eventos */}
        <div className="rounded border-2 border-blue-700 bg-white p-6 shadow-xl w-5/12">
          <h1 className="mb-4 text-3xl">Lista de Eventos</h1>


          {/* Mostrar la lista de eventos */}
          <div className="mt-6">
            <h2 className="mb-2 text-xl font-semibold">Lista de Eventos</h2>
            <ul>
              {newEvent.map((evento, index) => (
                <li
                  key={index}
                  className="mb-4 flex flex-col rounded border p-4 md:flex-row md:items-center"
                >
                  {/* Detalles del evento */}
                  <div className="md:mr-4 md:w-1/6">
                    <strong>Hora:</strong> {evento.hora}
                  </div>
                  <div className="md:mr-4 md:w-1/6">
                    <strong>Fecha:</strong> {evento.fecha}
                  </div>
                  <div className="grid-cols w-1/6">
                    <strong>Nombre:</strong> {evento.nombre}
                    <br />
                    <strong>Tipo:</strong> {evento.tipo}
                    <br />
                  </div>
                  <div className="md:mr-4 md:w-1/6">
                    <strong>Descripción:</strong> {evento.descripcion}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>


        {/* Formulario de Sugerencia */}
        <div className="rounded border-2 border-blue-700 bg-white p-6 shadow-xl  w-2/4">
        <div className="rounded border-2 border-blue-700 bg-white p-6 shadow-xl">
          <h1 className="mb-4 text-3xl">Sugerir una actividad</h1>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <input
                type="text"
                placeholder="Dni del paciente"
                value={dniPaciente}
                onChange={(e) => setDniP(e.target.value)}
                className="w-full border-2 border-gray-300 p-2 text-xl"
              />
            </div>
            <div className="col-span-1">
              <input
                type="text"
                placeholder="Dni del medico a cargo"
                value={dniMedico}
                onChange={(e) => setDniM(e.target.value)}
                className="w-full border-2 border-gray-300 p-2 text-xl"
              />
            </div>
            <div className="col-span-1">
              <input
                type="text"
                placeholder="Describa su sugerencia"
                value={sugerencia}
                onChange={(e) => setSugerencia(e.target.value)}
                className="w-full border-2 border-gray-300 p-2 text-xl"
              />
            </div>
            <div className="col-span-1">
              <input
                type="text"
                placeholder="Nombre y apellido"
                value={nombreCreador}
                onChange={(e) => setNombreC(e.target.value)}
                className="w-full border-2 border-gray-300 p-2 text-xl"
              />
            </div>
            <button
              onClick={handleCrearSugerencia}
              className="h-10 w-32 items-center justify-center bg-blue-700 p-2 text-white"
            >
              Crear sugerencia
            </button>
          </div>
          </div>
          {/* Mostrar la lista de sugerencias */}
          <div className="mt-6">
            <h2 className="mb-2 text-xl font-semibold">Lista de Sugerencias</h2>
            <ul>
  {newSuggest.map((sugerencia, index) => (
    <li
      key={index}
      className="mb-4 flex flex-col rounded border p-4 md:flex-row md:items-center"
    >
      {/* Primer div */}
      <div className="md:mr-4 md:w-1/4 mb-4 md:mb-0">
        <strong>Sugiere:</strong> {sugerencia.nombreCreador}
      </div>

      {/* Segundo div */}
      <div className="md:mr-4 md:w-1/4 mb-4 md:mb-0">
        <strong>Dni medico:</strong> {sugerencia.dniMedico}
      </div>

      {/* Tercer div (ocupará el resto del ancho) */}
      <div className="w-full md:w-1/2">
        <strong>Sugerencia:</strong> {sugerencia.sugerencia}
      </div>
    </li>
  ))}
</ul>

          </div>
        </div>
      </div>
    </main>
  );
};


export default PanelActs;