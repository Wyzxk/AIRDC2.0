import { useState } from "react";
import { changePassword } from "../Api/PasswordPage";
import { useSelector } from "react-redux";
import { changeUser } from "../Api/ProfilePage";

export function PasswordPage() {
  const state = useSelector((state) => state.auth);
  const { user } = state;
  // Define state variables using the useState hook
  const [dataForm, setDataForm] = useState({}); // State variable to hold form data
  const [passwordState, setPasswordState] = useState(""); // State variable to hold password change status
  const [formName, setFormName] = useState({});
  const [messageName, setMessageName] = useState("");

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

  // Event handler for input changes
  const onChange = (e) => {
    const { name, value } = e.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  // Event handler for form submission
  const onSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setPasswordState("Enviando...");
    // Call the changePassword function with the form data
    changePassword(dataForm)
      .then((response) => {
        // If the password change is successful, update passwordState
        console.log(response.data.message);
        setPasswordState(response.data.message);
      })
      .catch((error) => {
        // If there's an error in changing the password, update passwordState
        setPasswordState(error.response.data.message);
        console.log(error.response.data.message);
      });
  };

  return (
    <>
      <h1 className="text-4xl pb-16">Configuración</h1>

      {/* Form Username */}
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
      {/* Form Password */}
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1  md:grid-cols-1 xl:grid-cols-2 gap-4">
          {/* Current Password */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Contraseña Actual
              {passwordState === "La contraseña es incorrecta" && (
                <p className="text-red-500 text-xs font-semibold mt-2">
                  {passwordState}
                </p>
              )}
            </label>
            <input
              onChange={onChange}
              type="password"
              className="form-input  px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              // required
              name="password"
              placeholder="••••••••"
            />
          </div>
          {/* New Password */}
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Contraseña nueva *
              {passwordState === "Las contraseñas no son iguales" && (
                <p className="text-red-500 text-xs font-semibold mt-2">
                  {passwordState}
                </p>
              )}
            </label>
            <input
              type="password"
              onChange={onChange}
              className="form-input  px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              // required
              placeholder="••••••••"
              name="newPassword"
            />
          </div>
          {/* New Password Confirm */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Confirmar contraseña nueva *
              {passwordState === "Las contraseñas no son iguales" && (
                <p className="text-red-500 text-xs font-semibold mt-2">
                  {passwordState}
                </p>
              )}
            </label>
            <input
              type="password"
              onChange={onChange}
              placeholder="••••••••"
              className="form-input  px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              // required
              name="newPasswordConfirm"
            />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="bg-black text-white px-20 py-2 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {passwordState === "Enviando..." ? passwordState : "Enviar"}
            </button>
            {passwordState === "La contraseña ha sido cambiada" && (
              <p className="text-green-500 text-xs font-semibold mt-2">
                {passwordState}
              </p>
            )}{" "}
          </div>
        </div>
      </form>
    </>
  );
}
