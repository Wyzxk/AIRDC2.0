import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { reset_password_confirm } from "../reducers/auth";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const ResetPasswordConfirm = () => {
  // Get parameters from the URL
  const params = useParams();
  const dispatch = useDispatch(); // Get dispatch function for Redux actions
  const navigate = useNavigate(); // Navigate between routes
  const state = useSelector((state) => state.auth); // Get state from Redux store
  const [err, setErr] = useState([]); // State to handle errors

  // Destructure state variables
  const {
    user,
    isAuthenticate,
    reset_password_confirmStateTrue,
    reset_password_confirmStateFalse,
    reset_password_confirmStateLoading,
  } = state;

  // State to manage form data
  const [formData, setFormData] = useState({
    new_password: "",
    new_password_confirm: "",
  });
  const { new_password, new_password_confirm } = formData;

  // Handle form field changes
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      uid: params.uid,
      token: params.token,
      [name]: value,
    });
    console.log(formData);
  };

  // Handle form submission
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Check if passwords match
    if (new_password === new_password_confirm) {
      dispatch(reset_password_confirm(formData)); // Dispatch action to reset password
    } else {
      // Set error message if passwords don't match
      setErr({
        password: "Las contraseñas no coinciden",
      });
    }
  };

  // Redirect user to home page if already authenticated
  useEffect(() => {
    if (isAuthenticate && user) {
      navigate("/"); // Navigate to home page
    }
  }, [isAuthenticate, user]);

  return user ? ( // If user is already authenticated
    <h1>You already has been authenticate</h1>
  ) : reset_password_confirmStateTrue === true ? ( // If password reset is successful
    <>
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="m-4 bg-white p-8 rounded-lg shadow-lg w-full md:w-[410px]">
          <div className="flex justify-center mb-6">
            <span className="inline-block bg-gray-200 rounded-full p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
                />
              </svg>
            </span>
          </div>
          <h2 className="text-2xl font-semibold text-center mb-4">AIRDC</h2>
          <p className="text-gray-600 text-center mb-6">
            ¡Listo!, tu contraseña ha sido cambiada correctamente.
            <br /> <br />
            Ahora solo tienes que iniciar sesión.
          </p>
          <div className="flex justify-center items-center">
            <a href="/login">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Iniciar Sesión
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="m-4 bg-white p-8 rounded-lg shadow-lg w-full md:w-[410px]">
          <div className="flex justify-center mb-6">
            <span className="inline-block bg-gray-200 rounded-full p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
                />
              </svg>
            </span>
          </div>
          <h2 className="text-2xl font-semibold text-center mb-4">AIRDC</h2>
          <p className="text-gray-600 text-center mb-6">
            Ingresa tu nueva contraseña para iniciar sesión
          </p>
          <form onSubmit={(e) => onSubmit(e)}>
            {/* Password Input */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Contraseña *
                {err.password && (
                  <p className="text-red-500 text-xs">{err.password}</p>
                )}
              </label>

              <input
                type="password"
                className={`form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 ${
                  err.password && "border-red-500"
                }`}
                required
                placeholder="••••••••"
                name="new_password"
                onChange={(e) => onChange(e)}
                minLength="6"
              />
            </div>
            {/* Confirm Password */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Confirmar Contraseña *
                {err.password && (
                  <p className="text-red-500 text-xs">{err.password}</p>
                )}
              </label>
              <input
                type="password"
                className={`form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 ${
                  err.password && "border-red-500"
                }`}
                required
                placeholder="••••••••"
                name="new_password_confirm"
                onChange={(e) => onChange(e)}
                minLength="6"
              />
            </div>
            {/* Display error message if password reset fails */}
            {reset_password_confirmStateFalse ? (
              <>
                <p className="text-red-500 text-center mb-4">
                  Ha ocurrido un error, vuelve a intentarlo desde el email{" "}
                  <br />
                </p>
                <p className="text-center font-semibold mb-2">
                  En caso de que no funcione, intenta de nuevo aquí:
                  <br />
                  <a href="/reset-password">Recuperar cuenta</a>
                </p>
              </>
            ) : (
              <></>
            )}
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {reset_password_confirmStateLoading
                ? "Cambiando Contraseña..."
                : "Cambiar Contraseña"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordConfirm;
