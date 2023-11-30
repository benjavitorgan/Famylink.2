import React, { useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image'
import { api } from "src/utils/api";
import Link from 'next/link';
//import { actionAsyncStorage } from 'next/dist/client/components/action-async-storage.external';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };


  return (
    <div className="relative">
      <button
        className={`fixed top-4 ${
          isOpen ? "left-72" : "left-4"
        } z-50 rounded-md bg-gray-800 p-2 text-white transition-all duration-300 ease-in-out`}
        onClick={toggleMenu}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="white"
          stroke-width="2"
          strokeLinecap="round"
          stroke-linejoin="round"
        >
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>


      {isOpen && (
        <div className="fixed left-0 top-0 z-40 h-screen w-3/4 bg-gray-800 bg-opacity-50 lg:w-1/4">
          <div className="flex h-16 w-full flex-row bg-purple-700 ">
            <Image
              src="/Familylink_Simple-removebg-preview.png"
              alt="Picture of the author"
              width={40}
              height={40}
            />


            <p className="flex pt-2 text-5xl font-thin text-white">
              Familylink
            </p>
          </div>


          <ul className="-md flex h-screen flex-col items-center justify-center bg-white text-3xl shadow-md">
            <li className="py-4 hover:underline ">
              <Link href="/Landing">Volver</Link>
            </li>
            <svg
              width="94"
              height="4"
              viewBox="0 0 94 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="94" height="4" rx="2" fill="black" />
            </svg>
            <li className="py-4 hover:underline">
              <Link href="/Landing">Terminos y condiciones</Link>
            </li>
            <svg
              width="94"
              height="4"
              viewBox="0 0 94 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="94" height="4" rx="2" fill="black" />
            </svg>
            <li className="py-4 hover:underline">
              <Link href="/Landing">Sobre nosotros</Link>
            </li>
            <svg
              width="94"
              height="4"
              viewBox="0 0 94 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="94" height="4" rx="2" fill="black" />
            </svg>
            <li className="py-4 hover:underline">
              <Link href="/NewAccounts">Crear cuenta</Link>
            </li>
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
          window.location.reload();
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
            window.location.reload();
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
          setDniM('');
          setDniP('');
          setSugerencia('');
          setNombreC('');

          console.log("Bien");
        },
        onError: (err) => {
          alert ("El dni del paciente o del medico no corresponden a un usuario dado de alta, verifiquelos");
          
          setDniM('');
          setDniP('');
          setSugerencia('');
          setNombreC('');
        }
      })
    }
  }

  const [DniPrincipal, setDniPrincipal] = useState("");
  const [DniPaciente, setDniPaciente] = useState("");
  const [DniMedico, setDniMedico] = useState("");
  const [Sugerencias, setSugerencias] = useState("");
  const [NombreCreador, setNombreCreador] = useState("");
  const [isDniPrincipalMoved, setIsDniPrincipalMoved] = useState(false);
  const [isDniPacienteMoved, setIsDniPacienteMoved] = useState(false);
  const [isDniMedicoMoved, setIsDniMedicoMoved] = useState(false);
  const [isSugerenciasMoved, setIsSugerenciasMoved] = useState(false);
  const [isNombreCreadorMoved, setIsNombreCreadorMoved] = useState(false);


  const handleChangeDniPrincipal = (event: ChangeEvent<HTMLInputElement>) => {
    const nuevoDniPrincipal = event.target.value;
    setDniPrincipal(nuevoDniPrincipal);
    const esValido = /^\d+$/.test(nuevoDniPrincipal);
    // Mostrar mensaje de error si hay letras en el DNI Principal
    // Puedes usar otro estado para manejar el estado de validez del DNI Principal
    // Aquí se establece en false si no es válido
  };

  const handleChangeDniPaciente = (event: ChangeEvent<HTMLInputElement>) => {
    const nuevoDniPaciente = event.target.value;
    setDniPaciente(nuevoDniPaciente);
    const esValido = /^\d+$/.test(nuevoDniPaciente);
    // Mostrar mensaje de error si hay letras en el DNI del Paciente
    // Puedes usar otro estado para manejar el estado de validez del DNI del Paciente
    // Aquí se establece en false si no es válido
  };


  const handleChangeDniMedico = (event: ChangeEvent<HTMLInputElement>) => {
    const nuevoDniMedico = event.target.value;
    setDniMedico(nuevoDniMedico);
    const esValido = /^\d+$/.test(nuevoDniMedico);
    // Mostrar mensaje de error si hay letras en el DNI del Médico
    // Puedes usar otro estado para manejar el estado de validez del DNI del Médico
    // Aquí se establece en false si no es válido
  };


  const handleChangeSugerencias = (event: ChangeEvent<HTMLInputElement>) => {
    const nuevasSugerencias = event.target.value;
    setSugerencias(nuevasSugerencias);
    // Puedes agregar lógica adicional para validar las sugerencias, si es necesario
  };


  const handleChangeNombreCreador = (event: ChangeEvent<HTMLInputElement>) => {
    const nuevoNombreCreador = event.target.value;
    setNombreCreador(nuevoNombreCreador);
    // Puedes agregar lógica adicional para validar el nombre del creador, si es necesario
  };


  const handleDniPrincipalInputClick = () => {
    setIsDniPrincipalMoved(true);
    setIsDniPacienteMoved(false);
    setIsDniMedicoMoved(false);
    setIsSugerenciasMoved(false);
    setIsNombreCreadorMoved(false);
  };


  const handleDniPacienteInputClick = () => {
    setIsDniPacienteMoved(true);
    setIsDniPrincipalMoved(false);
    setIsDniMedicoMoved(false);
    setIsSugerenciasMoved(false);
    setIsNombreCreadorMoved(false);
  };


  const handleDniMedicoInputClick = () => {
    setIsDniMedicoMoved(true);
    setIsDniPrincipalMoved(false);
    setIsDniPacienteMoved(false);
    setIsSugerenciasMoved(false);
    setIsNombreCreadorMoved(false);
  };


  const handleSugerenciasInputClick = () => {
    setIsSugerenciasMoved(true);
    setIsDniPrincipalMoved(false);
    setIsDniPacienteMoved(false);
    setIsDniMedicoMoved(false);
    setIsNombreCreadorMoved(false);
  };


  const handleNombreCreadorInputClick = () => {
    setIsNombreCreadorMoved(true);
    setIsDniPrincipalMoved(false);
    setIsDniPacienteMoved(false);
    setIsDniMedicoMoved(false);
    setIsSugerenciasMoved(false);
  };


  const handleInputBlur = () => {
    setIsNombreCreadorMoved(false);
    setIsDniPrincipalMoved(false);
    setIsDniPacienteMoved(false);
    setIsDniMedicoMoved(false);
    setIsSugerenciasMoved(false);
  };


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
      <div className="py-64">
        <div className="relative flex flex-col items-center justify-center  border-blue-600">
          <h1 className="py-5 text-3xl">Ingrese el dni</h1>
          <div className="flex space-x-4">
            <label className="relative">
              <input
                className="w-full rounded-md border-[2.5px] border-blue-700 px-4 py-2 outline-none transition duration-200 focus:border-blue-700 focus:text-black"
                type="text"
                id="dniPrincipal"
                onClick={handleDniPrincipalInputClick}
                onBlur={handleInputBlur}
                onChange={(e) => setDni(e.target.value)}
                value={dniPrincipal}
              />
              <span
                className={`text-1xl absolute top-[9px] left-4 bg-white text-black text-opacity-75 transition duration-200 ${
                  isDniPrincipalMoved || dniPrincipal !== ""
                    ? "-translate-y-[20.5px] transform text-sm text-blue-700 text-opacity-100"
                    : ""
                }`}
              >
                &nbsp;Dni del familiar&nbsp;
              </span>
            </label>


            <button
              onClick={handleBuscarPersona}
              className="h-10 w-32 bg-blue-700 p-2 text-white rounded"
            >
              Buscar
            </button>
            <div className="absolute right-6 flex h-32 items-center justify-center ">
              <div className="w-86 shadow-grey rounded border-2 border-blue-700 bg-white px-16 py-6 shadow-xl">
                <Link href="/Paneles" className="text-xl font-thin text-black">
                  Crear nuevas actividades
                </Link>
              </div>
            </div>
          </div>
        </div>


        <div className="py-32">
          <div className="flex w-full justify-center">
            {/* Lista de Eventos */}
            <div className="w-1/2  border-2 border-blue-700 bg-white p-6 shadow-xl">
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
                        <strong>Fecha:</strong> {evento.fecha}
                        <br />
                        <strong>Hora:</strong> {evento.hora} 
                      </div>
                      <div className="md:mr-4 md:w-1/6">
                        <strong>Nombre:</strong> {evento.nombre}
                      </div>
                      <div className="grid-cols w-1/6">
                        <strong>Tipo: <br /> </strong> {evento.tipo}
                      </div>
                      <div className="md:mr-4 md:w-1/2">
                        <strong>Descripción:</strong> {evento.descripcion}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>


            {/* Formulario de Sugerencia */}
            <div className="w-1/2  border-2 border-blue-700 bg-white p-6  shadow-xl">
              <div className="rounded border-2 border-black bg-white p-6 shadow-xl">
                <h1 className="mb-4 text-3xl">Sugerir una actividad</h1>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-1">
                    <label className="relative">
                      <input
                        className="w-full rounded-md border-[2.5px] border-blue-700 px-4 py-2 outline-none transition duration-200 focus:border-blue-700 focus:text-black"
                        type="text"
                        id="dniPaciente"
                        onClick={handleDniPacienteInputClick}
                        onBlur={handleInputBlur}
                        onChange={(e) => setDniP(e.target.value)}
                        value={dniPaciente}
                      />
                      <span
                        className={`text-1xl absolute -top-[1.5px] left-4 bg-white text-black text-opacity-75 transition duration-200 ${
                          isDniPacienteMoved || dniPaciente !== ""
                            ? "-translate-y-[20.5px] transform text-sm text-blue-700 text-opacity-100"
                            : ""
                        }`}
                      >
                        &nbsp;Dni del paciente&nbsp;
                      </span>
                    </label>
                  </div>
                  <div className="col-span-1">
                    <label className="relative">
                      <input
                        className="w-full rounded-md border-[2.5px] border-blue-700 px-4 py-2 outline-none transition duration-200 focus:border-blue-700 focus:text-black"
                        type="text"
                        id="dniMedico"
                        onClick={handleDniMedicoInputClick}
                        onBlur={handleInputBlur}
                        onChange={(e) => setDniM(e.target.value)}
                        value={dniMedico}
                      />
                      <span
                        className={`text-1xl absolute -top-[1.5px] left-4 bg-white text-black text-opacity-75 transition duration-200 ${
                          isDniMedicoMoved || dniMedico !== ""
                            ? "-translate-y-[20.5px] transform text-sm text-blue-700 text-opacity-100"
                            : ""
                        }`}
                      >
                        &nbsp;Dni del médico a cargo&nbsp;
                      </span>
                    </label>
                  </div>
                  <div className="col-span-1">
                    <label className="relative">
                      <input
                        className="w-full rounded-md border-[2.5px] border-blue-700 px-4 py-2 outline-none transition duration-200 focus:border-blue-700 focus:text-black"
                        type="text"
                        id="sugerencia"
                        onClick={handleSugerenciasInputClick}
                        onBlur={handleInputBlur}
                        onChange={(e) => setSugerencia(e.target.value)}
                        value={sugerencia}
                      />
                      <span
                        className={`text-1xl absolute -top-[1.5px] left-4 bg-white text-black text-opacity-75 transition duration-200 ${
                          isSugerenciasMoved || sugerencia !== ""
                            ? "-translate-y-[20.5px] transform text-sm text-blue-700 text-opacity-100"
                            : ""
                        }`}
                      >
                        &nbsp;Describa su sugerencia&nbsp;
                      </span>
                    </label>
                  </div>
                  <div className="col-span-1">
                    <label className="relative">
                      <input
                        className="w-full rounded-md border-[2.5px] border-blue-700 px-4 py-2 outline-none transition duration-200 focus:border-blue-700 focus:text-black"
                        type="text"
                        id="nombreCreador"
                        onClick={handleNombreCreadorInputClick}
                        onBlur={handleInputBlur}
                        onChange={(e) => setNombreC(e.target.value)}
                        value={nombreCreador}
                      />
                      <span
                        className={`text-1xl absolute -top-[1.5px] left-4 bg-white text-black text-opacity-75 transition duration-200 ${
                          isNombreCreadorMoved || nombreCreador !== ""
                            ? "-translate-y-[20.5px] transform text-sm text-blue-700 text-opacity-100"
                            : ""
                        }`}
                      >
                        &nbsp;Nombre y apellido&nbsp;
                      </span>
                    </label>
                  </div>
                  <button
                    onClick={handleCrearSugerencia}
                    className="h-10 w-32 items-center justify-center bg-blue-700 p-2 text-white rounded"
                  >
                    Crear sugerencia
                  </button>
                </div>
              </div>
              {/* Mostrar la lista de sugerencias */}
              <div className="mt-6">
                <h2 className="mb-2 text-xl font-semibold">
                  Lista de Sugerencias
                </h2>
                <ul>
                  {newSuggest.map((sugerencia, index) => (
                    <li
                      key={index}
                      className="mb-4 flex flex-col rounded border p-4 md:flex-row md:items-center"
                    >
                      {/* Primer div */}
                      <div className="mb-4 md:mb-0 md:mr-4 md:w-1/4">
                        <strong>Sugiere:</strong> {sugerencia.nombreCreador}
                      </div>


                      {/* Segundo div */}
                      <div className="mb-4 md:mb-0 md:mr-4 md:w-1/4">
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
        </div>
      </div>
    </main>
  );
};



export default PanelActs;