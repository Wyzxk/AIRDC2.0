import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { reset_password } from "../reducers/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const dispatch = useDispatch(); // Get dispatch function for Redux actions
  const navigate = useNavigate(); // Navigate between routes
  const state = useSelector((state) => state.auth); // Get state from Redux store

  // Destructure state variables
  const {
    user,
    isAuthenticate,
    reset_passwordFalse,
    reset_passwordTrue,
    reset_passwordLoading,
  } = state;

  // State to manage form data
  const [formData, setFormData] = useState({
    email: "",
  });

  // Handle form field changes
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.toLowerCase() });
  };

  // Handle form submission
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(reset_password(formData)).then((result) => {
      if (result.payload) {
        // Reset form data if successful
        setFormData({
          email: "",
        });
      } else {
        // Handle errors if any
      }
    });
  };

  // Redirect user to home page if already authenticated
  useEffect(() => {
    if (isAuthenticate && user) {
      navigate("/"); // Navigate to home page
    }
  }, [isAuthenticate, user]);

  return user ? ( // If user is already authenticated
    <h1>You already has been authenticate</h1>
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
            Ingresa el correo electrónico para recuperar tu contraseña
          </p>
          <form onSubmit={(e) => onSubmit(e)}>
            {/* Email */}
            <div className="mb-3">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Correo Electrónico *
                {reset_passwordFalse && (
                  <p className="text-red-500 text-xs">
                    Comprueba que el correo electrónico sea válido
                  </p>
                )}
                {reset_passwordTrue && (
                  <>
                    <p className="text-green-500 text-xs">
                      ¡Se ha enviado la recuperación de la contraseña
                      correctamente!
                    </p>
                  </>
                )}
              </label>
              <input
                type="email"
                className={`form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 ${
                  reset_passwordFalse && "border-red-500"
                }`}
                required
                placeholder="MiCorreo@gmail.com"
                name="email"
                onChange={(e) => onChange(e)}
              />
            </div>
            {reset_passwordTrue && (
              <>
                <p className="text-xs font-semibold mb-2">
                  En caso de que no se haya enviado a tu correo, verifica que el
                  correo electrónico sea el tuyo
                </p>
              </>
            )}
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {reset_passwordLoading ? "Enviando..." : "Recuperar Contraseña"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
