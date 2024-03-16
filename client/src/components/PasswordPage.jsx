import { useState } from "react";
import { changePassword } from "../Api/PasswordPage";
export function PasswordPage() {
  // Define state variables using the useState hook
  const [dataForm, setDataForm] = useState({}); // State variable to hold form data
  const [passwordState, setPasswordState] = useState(""); // State variable to hold password change status

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
