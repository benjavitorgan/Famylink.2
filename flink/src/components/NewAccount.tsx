/*import { getDisplayName } from "next/dist/shared/lib/utils";
import Head from "next/head";
import { api } from "~/utils/api";*/
import { useState } from 'react';
import { ChangeEvent, FormEvent } from 'react';
import Image from 'next/image'
import { useRouter } from 'next/router';
import Link from "next/link";

import { validarEmail } from './FuncionesValidacion';
import { signIn } from "next-auth/react";
//import router from "next/router";

export default function NewAccounts() {
  const [email, setEmail] = useState('');
  const [emailValido, setEmailValido] = useState(true);
  const [contraseña, setContraseña] = useState('');
  const [contraseñaValida, setContraseñaValida] = useState(true);
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [contraseñaConfirmada, setContraseñaConfirmada] = useState(true);
  const [isEmailMoved, setIsEmailMoved] = useState(false);
  const [isContraseñaMoved, setIsContraseñaMoved] = useState(false);
  const [isConfirmarContraseñaMoved, setIsConfirmarContraseñaMoved] = useState(false);
  const [isNombresMoved, setIsNombresMoved] = useState(false);
  const [isTelefonoMoved, setIsTelefonoMoved] = useState(false);
  const [isApellidoMoved, setIsApellidoMoved] = useState(false);
  const [isBloodtypeMoved, setIsBloodtypeMoved] = useState(false);
  const [isRoleMoved, setIsRoleMoved] = useState(false);
  const [isSicknessMoved, setIsSicknessMoved] = useState(false);
  const [isAgeMoved, setIsAgeMoved] = useState(false);
  const [isDniMoved, setIsDniMoved] = useState(false);
  const [Nombres, setNombres] = useState('');
  const [Telefono, setTelefono] = useState('');
  const [Apellido, setApellido] = useState('');
  const [Bloodtype, setBloodtype] = useState('');
  const [Sickness, setSickness] = useState('');
  const [Role, setRole] = useState('');  
  const [Age, setAge] = useState('');
  const [Dni, setDni] = useState('');
  const router = useRouter();

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    const nuevoEmail = event.target.value;
    setEmail(nuevoEmail);
    const esValido = validarEmail(nuevoEmail);
    setEmailValido(esValido);
  };

  const handleChangeContraseña = (event: ChangeEvent<HTMLInputElement>) => {
    const nuevaContraseña = event.target.value;
    setContraseña(nuevaContraseña);
    setContraseñaValida(nuevaContraseña.length >= 8);
    setContraseñaConfirmada(nuevaContraseña === confirmarContraseña);
  };

  const handleChangeConfirmarContraseña = (event: ChangeEvent<HTMLInputElement>) => {
    const nuevaConfirmarContraseña = event.target.value;
    setConfirmarContraseña(nuevaConfirmarContraseña);
    setContraseñaConfirmada(nuevaConfirmarContraseña === contraseña);
  };

  const handleChangeNombre = (event: ChangeEvent<HTMLInputElement>) => {
    const nuevoNombre = event.target.value;
    setNombres(nuevoNombre);
    //const esValido = /^[a-zA-Z\s]*$/.test(nuevoNombre);
  };

  const handleChangeApellido = (event: ChangeEvent<HTMLInputElement>) => {
    const nuevoApellido = event.target.value;
    setApellido(nuevoApellido);
    //const esValido = /^[a-zA-Z\s]*$/.test(nuevoApellido);
    // Mostrar mensaje de error si no solo hay letras en el apellido
    // Puedes usar otro estado para manejar el estado de validez del apellido
    // Aquí se establece en false si no es válido
  };

  const handleChangeTelefono = (event: ChangeEvent<HTMLInputElement>) => {
    const nuevoTelefono = event.target.value;
    setTelefono(nuevoTelefono);
    //const esValido = /^\d+$/.test(nuevoTelefono);
    // Mostrar mensaje de error si hay letras en el número de teléfono
    // Puedes usar otro estado para manejar el estado de validez del teléfono
    // Aquí se establece en false si no es válido
  };

  const handleChangeAge = (event: ChangeEvent<HTMLInputElement>) => {
    const newAge = event.target.value;
    setAge(newAge);
    //const esValido = /^\d+$/.test(newAge);
    // Mostrar mensaje de error si hay letras en el número de teléfono
    // Puedes usar otro estado para manejar el estado de validez del teléfono
    // Aquí se establece en false si no es válido
  };

  const handleChangeBloodtype = (event: ChangeEvent<HTMLInputElement>) => {
    const newBT = event.target.value;
    setBloodtype(newBT);
    //const esValido = /^\d+$/.test(newBT);
    // Mostrar mensaje de error si hay letras en el número de teléfono
    // Puedes usar otro estado para manejar el estado de validez del teléfono
    // Aquí se establece en false si no es válido
  };

  const handleChangeRole = (newRole: string) => {
    setRole(newRole);
    //const esValido = /^\d+$/.test(newRole);
    // Mostrar mensaje de error si hay letras en el número de teléfono
    // Puedes usar otro estado para manejar el estado de validez del teléfono
    // Aquí se establece en false si no es válido
  };

  const handleChangeSickness = (event: ChangeEvent<HTMLInputElement>) => {
    const newSCK = event.target.value;
    setSickness(newSCK);
    //const esValido = /^\d+$/.test(newSCK);
    // Mostrar mensaje de error si hay letras en el número de teléfono
    // Puedes usar otro estado para manejar el estado de validez del teléfono
    // Aquí se establece en false si no es válido
  };

  const handleChangeDni = (event: ChangeEvent<HTMLInputElement>) => {
    const newDni = event.target.value;
    setDni(newDni);
    //const esValido = /^\d+$/.test(newDni);
    // Mostrar mensaje de error si hay letras en el número de teléfono
    // Puedes usar otro estado para manejar el estado de validez del teléfono
    // Aquí se establece en false si no es válido
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validar campos antes de enviar el formulario
    if (!emailValido || !contraseñaValida || !contraseñaConfirmada) {
      // Si alguno de los campos no es válido, mostrar mensaje de error o realizar acciones necesarias
      return;
    }

    // Resto de la lógica para enviar el formulario
  };


  const handleTelefonoInputClick = () => {
    setIsTelefonoMoved(true);
    setIsNombresMoved(false);
    setIsContraseñaMoved(false);
    setIsConfirmarContraseñaMoved(false);
    setIsEmailMoved(false);
    setIsApellidoMoved(false);
  };

  const handleApellidoInputClick = () => {
    setIsApellidoMoved(true);
    setIsTelefonoMoved(false);
    setIsNombresMoved(false);
    setIsContraseñaMoved(false);
    setIsConfirmarContraseñaMoved(false);
    setIsEmailMoved(false);
  };

  const handleNombresInputClick = () => {
    setIsNombresMoved(true);
    setIsContraseñaMoved(false);
    setIsConfirmarContraseñaMoved(false);
    setIsEmailMoved(false);
    setIsTelefonoMoved(false);
    setIsApellidoMoved(false);

  };

  const handleEmailInputClick = () => {
    setIsEmailMoved(true);
    setIsContraseñaMoved(false);
    setIsConfirmarContraseñaMoved(false);
    setIsNombresMoved(false);
    setIsTelefonoMoved(false);
    setIsApellidoMoved(false);

  };

  const handleContraseñaInputClick = () => {
    setIsContraseñaMoved(true);
    setIsEmailMoved(false);
    setIsConfirmarContraseñaMoved(false);
    setIsNombresMoved(false);
    setIsTelefonoMoved(false);
    setIsApellidoMoved(false);

  };

  const handleConfirmarContraseñaInputClick = () => {
    setIsConfirmarContraseñaMoved(true);
    setIsEmailMoved(false);
    setIsContraseñaMoved(false);
    setIsNombresMoved(false);
    setIsTelefonoMoved(false);
    setIsApellidoMoved(false);

  };

  const handleRoleInputClick = () => {
    setIsTelefonoMoved(false);
    setIsNombresMoved(false);
    setIsContraseñaMoved(false);
    setIsConfirmarContraseñaMoved(false);
    setIsEmailMoved(false);
    setIsApellidoMoved(false);
    setIsBloodtypeMoved (false);
    setIsRoleMoved (true);
    setIsSicknessMoved (false);
    setIsAgeMoved (false);
    setIsDniMoved(false);
  };

  const handleBloodtypeInputClick = () => {
    setIsTelefonoMoved(false);
    setIsNombresMoved(false);
    setIsContraseñaMoved(false);
    setIsConfirmarContraseñaMoved(false);
    setIsEmailMoved(false);
    setIsApellidoMoved(false);
    setIsBloodtypeMoved (true);
    setIsRoleMoved (true);
    setIsSicknessMoved (false);
    setIsAgeMoved (false);
    setIsDniMoved(false);
  };

  const handleSicknessInputClick = () => {
    setIsTelefonoMoved(false);
    setIsNombresMoved(false);
    setIsContraseñaMoved(false);
    setIsConfirmarContraseñaMoved(false);
    setIsEmailMoved(false);
    setIsApellidoMoved(false);
    setIsBloodtypeMoved (false);
    setIsRoleMoved (true);
    setIsSicknessMoved (true);
    setIsAgeMoved (false);
    setIsDniMoved(false);
  };

  const handleAgeInputClick = () => {
    setIsTelefonoMoved(true);
    setIsNombresMoved(false);
    setIsContraseñaMoved(false);
    setIsConfirmarContraseñaMoved(false);
    setIsEmailMoved(false);
    setIsApellidoMoved(false);
    setIsBloodtypeMoved (false);
    setIsRoleMoved (true);
    setIsSicknessMoved (false);
    setIsAgeMoved (true);
    setIsDniMoved(false);
  };

  const handleDniInputClick = () => {
    setIsTelefonoMoved(true);
    setIsNombresMoved(false);
    setIsContraseñaMoved(false);
    setIsConfirmarContraseñaMoved(false);
    setIsEmailMoved(false);
    setIsApellidoMoved(false);
    setIsBloodtypeMoved (false);
    setIsRoleMoved (true);
    setIsSicknessMoved (false);
    setIsAgeMoved (false);
    setIsDniMoved(true);
  };

  const handleInputBlur = () => {
    setIsEmailMoved(false);
    setIsContraseñaMoved(false);
    setIsConfirmarContraseñaMoved(false);
    setIsNombresMoved(false);
    setIsTelefonoMoved(false);
    setIsApellidoMoved(false);
    setIsBloodtypeMoved (false);
    setIsRoleMoved (false);
    setIsSicknessMoved (false);
    setIsAgeMoved (false);
    setIsDniMoved(false);
  };

  const handleEnter = async () => {

    if (Role == "OP") {
      try {
        const response = await signIn("credentials", {
          email,
          name: Nombres,
          password: contraseña,
          method: "signUp",
          redirect: false,
          dni: Dni,
          role: Role,
          phoneNumber: Telefono,
          sickness: Sickness,
          bloodType: Bloodtype,
          age: Age
        });  
         if (response?.ok) {
           void router.push("/PanelDeActividades"); // Redirect to the desired page
         } else {
           alert("No se pudo entrar");
        }
        console.log (response);
      } catch (error) {
        console.error("Error:", error);
        // Handle any errors that occur during the sign-in process
      }
    }
    else{
      try {
        const response = await signIn("credentials", {
          email,
          name: Nombres,
          password: contraseña,
          method: "signUp",
          redirect: false,
          dni: Dni,
          role: Role,
          phoneNumber: Telefono,
          sickness: "",
          bloodtype: "",
          age: ""
        });
         if (response?.ok) {
           void router.push("/PanelDeActividades"); // Redirect to the desired page
         } else {
           alert("No se pudo entrar");
         }
        console.log (response);
      } catch (error) {
        console.error("Error:", error);
        // Handle any errors that occur during the sign-in process
      }
    }
  }

  return (
    <div className=" items-center justify-center h-screen">

    
  
      <header className="bg-white py-4 px-6 flex items-center justify-between border-gray-200">
        <div className="flex z-20">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="89"
            height="60"
            fill="none"
            viewBox="0 0 89 90"
          >
            <path fill="url(#a)" d="M0 0h88.977v90H0z" />
            <defs>
              <pattern
                id="a"
                width="1"
                height="1"
                patternContentUnits="objectBoundingBox"
              >
                <use href="#b" transform="matrix(.00292 0 0 .00289 -.012 0)" />
              </pattern>
              <image
                id="b"
                width="350"
                height="346"
                data-name="image-removebg-preview (7).png"
                href="data:image/png;base64,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"
              />
            </defs>
          </svg>
          <div>
        <svg
        className="absolute top-0 left-0 z-10"
        viewBox="0 0 1366 257"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <rect width="1366" height="127" fill="#7E22CE"/>
        <path d="M-114 242.922C-114 242.922 102.87 137.689 192.501 129.422C300.712 119.442 355.52 196.839 464 190.422C572.751 183.989 630.361 131.188 738.5 118C916.667 96.2731 1012 268.921 1173 222.422C1225.65 207.214 1288.69 172 1343.5 172C1416.5 172 1601.68 140.922 1601.68 140.922" stroke="#85DFF3" strokeWidth="31"/>
        <path d="M-98 159.597C-98 159.597 41.0751 79.8195 139.739 68.6674C258.856 55.2034 320.038 137.762 439.489 128.155C559.235 118.523 591.301 78.8701 710.306 61.9319C906.374 34.0246 1006.93 201.415 1197 151C1319 118.637 1320.48 91.4957 1379.15 78.1527C1460.16 59.7288 1567 37 1567 37" stroke="#7E22CE" strokeWidth="73"/>
        <path d="M-64 217.473C-64 217.473 78.9074 110.19 173.333 102.866C287.334 94.0236 343.799 168.395 458.028 162.962C572.54 157.515 632.703 94.8816 746.677 82.9726C934.458 63.3506 994.769 263.484 1169 196C1226.5 173.729 1307 134 1368 134C1453.72 134 1578.68 102.866 1578.68 102.866" stroke="#4151DA" strokeWidth="39"/>
      </svg>
      </div>
        </div>
      </header>
    <div className="flex items-center justify-center h-screen">
      
      <div className="w-1/2 p-6 bg-white rounded shadow-xl shadow-grey">
        <h2 className="font-semibold text-3xl mb-4 text-center">Crea tu cuenta</h2>
        <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
        <div className="App items-center py-3">
            <label className="relative">
              <input
                className="w-full px-4 py-2 border-[2.5px] border-blue-700 rounded-md outline-none focus:border-blue-700 focus:text-black transition duration-200"
                type="text"
                id="Nombres"
                onClick={handleNombresInputClick}
                onBlur={handleInputBlur}
                onChange={handleChangeNombre}
              />
              <span className={`text-1xl text-black bg-white text-opacity-75 absolute left-4 -top-[1.5px] transition duration-200 ${isNombresMoved || Nombres !== '' ? 'transform -translate-y-[20.5px] text-opacity-100 text-sm text-blue-700' : ''}`}>
                &nbsp;Nombre&nbsp;
              </span>
            </label>
          </div>
          <div className="App items-center py-3">
            <label className="relative">
              <input
                className="w-full px-4 py-2 border-[2.5px] border-blue-700 rounded-md outline-none focus:border-blue-700 focus:text-black transition duration-200"
                type="text"
                id="Apellido"
                onClick={handleApellidoInputClick}
                onBlur={handleInputBlur}
                onChange={handleChangeApellido}/>
              <span className={`text-1xl text-black bg-white text-opacity-75 absolute left-4 -top-[1.5px] transition duration-200 ${isApellidoMoved || Apellido !== '' ? 'transform -translate-y-[20.5px] text-opacity-100 text-sm text-blue-700' : ''}`}>
                &nbsp;Apellido&nbsp;
              </span>
            </label>
          </div>
          <div className="App items-center py-3">
            <label className="relative">
              <input
                className="w-full px-4 py-2 border-[2.5px] border-blue-700 rounded-md outline-none focus:border-blue-700 focus:text-black transition duration-200"
                type="email"
                id="email"
                onClick={handleEmailInputClick}
                onBlur={handleInputBlur}
                onChange={handleChangeEmail}
              />
              {!emailValido && <p className="error-message text-red-600">El correo electrónico ingresado no es válido.</p>}
              <span className={`text-1xl text-black bg-white text-opacity-75 absolute left-4 -top-[1.5px] transition duration-200 ${isEmailMoved || email !== '' ? 'transform -translate-y-[20.5px] text-opacity-100 text-sm text-blue-700' : ''}`}>
                &nbsp;Email&nbsp;
              </span>
            </label>
          </div>
          <div className="App items-center py-3">
            <label className="relative">
              <input
                className="w-full px-4 py-2 border-[2.5px] border-blue-700 rounded-md outline-none focus:border-blue-700 focus:text-black transition duration-200"
                type="text"
                id="telefono"
                onClick={handleTelefonoInputClick}
                onBlur={handleInputBlur}
                onChange={handleChangeTelefono}
              />
              <span className={`text-1xl text-black bg-white text-opacity-75 absolute left-4 -top-[1.5px] transition duration-200 ${isTelefonoMoved || Telefono !== '' ? 'transform -translate-y-[20.5px] text-opacity-100 text-sm text-blue-700' : ''}`}>
                &nbsp;Telefono&nbsp;
              </span>
            </label>
          </div>
          <div className="App items-center py-3">
            <label className="relative">
              <select
                className="w-full px-4 py-2 border-[2.5px] border-blue-700 rounded-md outline-none focus:border-blue-700 focus:text-black transition duration-200"
                id="Role"
                placeholder=""
                onChange={(e) => {
                  const selectedRole = e.target.value;
                  handleChangeRole(selectedRole);
                }}
              >
                <option value="OP" content="" className='text-hidden'>Persona mayor</option>
                <option value="FM">Miembro familiar</option>
                <option value="NS">Enfermero / Medico</option>
              </select>
              <span className={`text-1xl text-black bg-white text-opacity-75 absolute left-4 -top-[1.5px] transition duration-200 ${isRoleMoved || Role !== '' ? 'transform -translate-y-[20.5px] text-opacity-100 text-sm text-blue-700' : ''}`}>
              &nbsp;Rol&nbsp;
            </span>
          </label>
        </div>
        {Role === 'OP' && (
          <div className="App items-center py-3">
            <label className="relative">
              <input
                className="w-full px-4 py-2 border-[2.5px] border-blue-700 rounded-md outline-none focus-border-blue-700 focus-text-black transition duration-200"
                type="text"
                id="bloodType"
                onClick={handleBloodtypeInputClick}
                onBlur={handleInputBlur}
                onChange={handleChangeBloodtype}
              />
              <span className={`text-1xl text-black bg-white text-opacity-75 absolute left-4 -top-[1.5px] transition duration-200 ${isBloodtypeMoved || Bloodtype !== '' ? 'transform -translate-y-[20.5px] text-opacity-100 text-sm text-blue-700' : ''}`}>
                &nbsp;Tipo de sangre&nbsp;
              </span>
            </label>
          </div>
        )}
        {Role === 'OP' && (
          <div className="App items-center py-3">
            <label className="relative">
              <input
                className="w-full px-4 py-2 border-[2.5px] border-blue-700 rounded-md outline-none focus-border-blue-700 focus-text-black transition duration-200"
                type="text"
                id="sickness"
                onClick={handleSicknessInputClick}
                onBlur={handleInputBlur}
                onChange={handleChangeSickness}
              />
              <span className={`text-1xl text-black bg-white text-opacity-75 absolute left-4 -top-[1.5px] transition duration-200 ${isSicknessMoved || Sickness !== '' ? 'transform -translate-y-[20.5px] text-opacity-100 text-sm text-blue-700' : ''}`}>
                &nbsp;Enfermedad&nbsp;
              </span>
            </label>
          </div>
        )}
        {Role === 'OP' && (
          <div className="App items-center py-3">
            <label className="relative">
              <input
                className="w-full px-4 py-2 border-[2.5px] border-blue-700 rounded-md outline-none focus-border-blue-700 focus-text-black transition duration-200"
                type="text"
                id="age"
                onClick={handleAgeInputClick}
                onBlur={handleInputBlur}
                onChange={handleChangeAge}
              />
              <span className={`text-1xl text-black bg-white text-opacity-75 absolute left-4 -top-[1.5px] transition duration-200 ${isAgeMoved || Age !== '' ? 'transform -translate-y-[20.5px] text-opacity-100 text-sm text-blue-700' : ''}`}>
                &nbsp;Edad&nbsp;
              </span>
            </label>
          </div>
        )}
        <div className="App items-center py-3">
            <label className="relative">
              <input
                className="w-full px-4 py-2 border-[2.5px] border-blue-700 rounded-md outline-none focus:border-blue-700 focus:text-black transition duration-200"
                type="text"
                id="dni"  // Asigna un ID único para el segundo nuevo input
                onClick={handleDniInputClick}  // Reemplaza handleNewInput2Click con la función adecuada
                onBlur={handleInputBlur}  // Reemplaza handleInputBlur con la función adecuada
                onChange={handleChangeDni}  // Reemplaza handleChangeNewInput2 con la función adecuada
              />
              <span className={`text-1xl text-black bg-white text-opacity-75 absolute left-4 -top-[1.5px] transition duration-200 ${isDniMoved || Dni !== '' ? 'transform -translate-y-[20.5px] text-opacity-100 text-sm text-blue-700' : ''}`}>
                &nbsp;DNI&nbsp;
              </span>
            </label>
          </div>
          <div className="App items-center py-3">
            <label className="relative">
              <input
                className="w-full px-4 py-2 border-[2.5px] border-blue-700 rounded-md outline-none focus:border-blue-700 focus:text-black transition duration-200"
                type="password"
                id="password"
                onClick={handleContraseñaInputClick}
                onBlur={handleInputBlur}
                onChange={handleChangeContraseña}
              />
              {!contraseñaValida && contraseña.length > 0 && (<p className="error-message text-red-600">La contraseña debe tener al menos 8 caracteres.</p>)}
              <span className={`text-1xl text-black bg-white text-opacity-75 absolute left-4 -top-[1.5px] transition duration-200 ${isContraseñaMoved || contraseña !== '' ? 'transform -translate-y-[20.5px] text-opacity-100 text-sm text-blue-700' : ''}`}>
                &nbsp;Contraseña&nbsp;
              </span>
            </label>
          </div>
          <div className="App items-center py-3">
            <label className="relative">
              <input
                className="w-full px-4 py-2 border-[2.5px] border-blue-700 rounded-md outline-none focus:border-blue-700 focus:text-black transition duration-200"
                type="password"
                id="confirmarpassword"
                onClick={handleConfirmarContraseñaInputClick}
                onBlur={handleInputBlur}
                onChange={handleChangeConfirmarContraseña}
              />
              {!contraseñaConfirmada && confirmarContraseña.length > 0 && <p className="error-message text-red-600">La confirmación de la contraseña no coincide.</p>}
              <span className={`text-1xl text-black bg-white text-opacity-75 absolute left-4 -top-[1.5px] transition duration-200 ${isConfirmarContraseñaMoved || confirmarContraseña !== '' ? 'transform -translate-y-[20.5px] text-opacity-100 text-sm text-blue-700' : ''}`}>
                &nbsp;Confirmar contraseña&nbsp;
              </span>
            </label>
          </div>
          <div className="flex flex-col items-center justify-center w-full col-span-2">
            <button className="w-1/2 px-4 py-2 text-white bg-blue-700 rounded hover:bg-blue-600" type="submit" onClick={() => void handleEnter()}>
              Entrar
              <nav>
                <Link href="/Landing"></Link>
              </nav>
              
            </button>
            <label htmlFor="text" className="py-0 text-center">
              ¿Ya tienes una cuenta? <Link href="/logIn" className="text-blue-600">Iniciar sesión</Link>
            </label>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
}
