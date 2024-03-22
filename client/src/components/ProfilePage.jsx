import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// Importing API functions for handling profile page data
import { changeUser, insertInfo, getInfo, putInfo } from "../Api/ProfilePage";

// Defining ProfilePage component
export function ProfilePage() {
  // Accessing Redux store state
  const state = useSelector((state) => state.auth);
  const { user } = state;

  // Initializing state variables
  const [formName, setFormName] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [messageName, setMessageName] = useState("");
  const [message, setMessage] = useState("");
  const [dataForm, setDataForm] = useState({});

  // Effect hook to fetch user information on component mount
  useEffect(() => {
    getInfo(user.id)
      .then((response) => {
        console.log(response);
        const { names, lastNames, phone, residenceCity, typeId, numberId } =
          response.data[0];
        // Updating userInfo state with fetched data
        setUserInfo({
          ...userInfo,
          names,
          lastNames,
          phone,
          residenceCity,
          typeId,
          numberId,
          exists: "Si",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Handler function for input field change events
  const onChangeName = (e) => {
    const { name, value } = e.target;
    // Updating formName state with the new value
    setFormName({
      ...formName,
      [name]: value.toLowerCase(),
    });
  };

  // Handler function for form submission to change user
  const onSubmitName = (e) => {
    e.preventDefault();
    setMessageName("Enviando...");
    // Calling API function to change user information
    changeUser(formName)
      .then(() => {
        setMessageName("El usuario se ha cambiado correctamente");
      })
      .catch((error) => {
        console.log(error);
        setMessageName("Ha ocurrido un error");
      });
    console.log(formName);
  };

  // Handler function for input field change events
  const onChange = (e) => {
    const { name, value } = e.target;
    // Updating dataForm state with the new value
    setDataForm({
      ...dataForm,
      // Update the form's state with the new data, converting the first letter of each word in the field value to uppercase
      [name]: value.toLowerCase().replace(/(?:^|\s)\S/g, function (letra) {
        return letra.toUpperCase();
      }),
      user: user.id,
    });
  };

  // Handler function for form submission to update or insert user information
  const onSubmit = (e) => {
    e.preventDefault();
    setMessage("Enviando...");
    // Checking if user information already exists
    if (userInfo.exists) {
      // If exists, update the user information
      putInfo(dataForm)
        .then((response) => {
          console.log(response);
          setMessage("Se han enviado los datos correctamente");
        })
        .catch((error) => {
          console.log(error);
          setMessage(error);
          if (dataForm.user) {
            console.log("si");
            setMessage("No se ha podido enviar, verifica los datos");
          } else {
            console.log("no");
            setMessage("No has realizado ningun cambio");
          }
        });
    } else {
      // If not exists, insert the user information
      insertInfo(dataForm)
        .then((response) => {
          setMessage("Se han enviado los datos correctamente");
        })
        .catch((error) => {
          setMessage(error.response.data);
        });
    }

    console.log(message);
  };
  return (
    <>
      {/* Form for changing user */}
      <form
        onSubmit={onSubmitName}
        className="flex flex-wrap justify-center mb-12"
      >
        {/* Input field for new username */}
        <div className="mb-4 w-full sm:w-1/2 sm:pr-2">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Usuario *
            <p className="text-gray-600 text-xs">
              Recuerda el usuario, ingresarás con él
            </p>
          </label>
          <input
            onChange={onChangeName}
            minLength="4"
            type="text"
            className="form-input px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
            required
            placeholder={user ? user.username : ""}
            name="newUsername"
          />
        </div>
        {/* Button to submit form for changing user */}
        <div className="w-full sm:w-1/2 sm:pl-2">
          <button
            type="submit"
            className="my-11 mb-4 bg-black text-white px-12 py-2 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {messageName === "Enviando..." ? messageName : "Cambiar usuario"}
          </button>
          {/* Display success message if user is changed successfully */}
          {messageName === "El usuario se ha cambiado correctamente" && (
            <p className="text-green-500 text-xs font-semibold mt-2">
              {messageName}
            </p>
          )}
        </div>
      </form>

      {/* Form for updating user profile information */}
      <form onSubmit={onSubmit}>
        {/* Grid layout for profile information fields */}
        <div className="grid grid-cols-1  md:grid-cols-1 xl:grid-cols-2 gap-4">
          {/* Input field for user's names */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Nombres *
              {/* Display error message if names are not entered correctly */}
              {message.names && (
                <p className="text-red-500 text-xs font-semibold mt-2">
                  Introduce el nombre correctamente
                </p>
              )}
            </label>
            <input
              defaultValue={userInfo.names}
              minLength={3}
              maxLength={50}
              onChange={onChange}
              type="text"
              className="form-input  px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              // required
              name="names"
              placeholder="••••••••"
            />
          </div>
          {/* Input field for user's last names */}
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Apellidos *
              {/* Display error message if last names are not entered correctly */}
              {message.lastNames && (
                <p className="text-red-500 text-xs font-semibold mt-2">
                  Introduce los apellidos correctamente
                </p>
              )}
            </label>
            <input
              defaultValue={userInfo.lastNames}
              minLength={3}
              maxLength={50}
              onChange={onChange}
              type="text"
              className="form-input  px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              // required
              placeholder="••••••••"
              name="lastNames"
            />
          </div>
          {/* Input field for user's phone number */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Teléfono *
              {/* Display error message if phone number is not entered correctly */}
              {message.phone && (
                <p className="text-red-500 text-xs font-semibold mt-2">
                  Introduce el telefono correctamente
                </p>
              )}
            </label>
            <input
              defaultValue={userInfo.phone}
              minLength={10}
              maxLength={10}
              onChange={onChange}
              type="text"
              placeholder="••••••••"
              className="form-input  px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              // required
              name="phone"
            />
          </div>
          {/* Input field for user's residence city */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Ciudad de residencia (actual) *
              {/* Display error message if residence city is not entered correctly */}
              {message.residenceCity && (
                <p className="text-red-500 text-xs font-semibold mt-2">
                  Introduce la ciudad de residencia correctamente
                </p>
              )}
            </label>
            <input
              defaultValue={userInfo.residenceCity}
              maxLength={20}
              onChange={onChange}
              type="text"
              placeholder="••••••••"
              className="form-input  px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              // required
              name="residenceCity"
            />
          </div>
          {/* Dropdown for selecting user's ID type */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Tipo de ID *
              {/* Display error message if ID type is not selected correctly */}
              {message.typeId && (
                <p className="text-red-500 text-xs font-semibold mt-2">
                  Introduce el tipo de ID correctamente
                </p>
              )}
            </label>
            <select
              onChange={onChange}
              className="form-select px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              // required
              name="typeId"
            >
              <option value="">
                {/* Displaying selected ID type */}
                {userInfo.typeId === "Cc"
                  ? "Cédula de Ciudadanía (CC)"
                  : userInfo.typeId === "Ti"
                  ? "Tarjeta de Identidad (TI)"
                  : userInfo.typeId === "Ce"
                  ? "Cédula de Extranjería (CE)"
                  : "Seleccionar tipo de ID"}
              </option>
              {/* Options for selecting ID type */}
              <option value="Cc">Cédula de Ciudadanía (CC)</option>
              <option value="Ti">Tarjeta de Identidad (TI)</option>
              <option value="Ce">Cédula de Extranjería (CE)</option>
              {/* Add more options as needed */}
            </select>
          </div>
          {/* Input field for user's ID number */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Número de ID *
              {/* Display error message if ID number is not entered correctly */}
              {message.numberId && (
                <p className="text-red-500 text-xs font-semibold mt-2">
                  Introduce el número de ID correctamente
                </p>
              )}
            </label>
            <input
              defaultValue={userInfo.numberId}
              maxLength={30}
              onChange={onChange}
              type="text"
              placeholder="••••••••"
              className="form-input  px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              // required
              name="numberId"
            />
          </div>

          <div className="mt-4">
            {/* Button to submit form for updating profile information */}
            <button
              type="submit"
              className="mt-10 bg-black text-white px-20 py-2 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {/* Conditional rendering of button text based on message state */}
              {message === "Enviando..." ? message : "Enviar"}
            </button>
            {/* Display success or error message based on message state */}
            {message === "Se han enviado los datos correctamente" && (
              <p className="text-green-500 text-xs font-semibold mt-2">
                {message}
              </p>
            )}
            {(message === "No se ha podido enviar, verifica los datos" ||
              message === "No has realizado ningun cambio") && (
              <p className="text-red-500 text-xs font-semibold mt-2">
                {message}
              </p>
            )}
          </div>
        </div>
      </form>
    </>
  );
}
