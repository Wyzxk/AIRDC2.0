import { useEffect, useState } from "react";
import { Link, redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { login } from "../reducers/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // Initialize Redux dispatch and navigation
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch authentication state from Redux store
  const state = useSelector((state) => state.auth);
  const { loading, error, isAuthenticate, user } = state;

  // Initialize form data state
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = formData;

  // Handle form input changes
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const onSubmit = (e) => {
    e.preventDefault();
    // Convert the username to lowercase
    const user = username.toLocaleLowerCase();

    // Create a new form data object by spreading the existing form data
    // and updating the username field with the lowercase version
    const newFormData = {
      ...formData,
      username: user,
    };
    dispatch(login(newFormData)).then((result) => {
      if (result.payload) {
        // Reset form data and navigate if successful
        setFormData({
          username: "",
          password: "",
        });
        navigate("/");
      }
    });
  };

  // Redirect user if already authenticated
  useEffect(() => {
    if (isAuthenticate && user) {
      navigate("/");
    }
  }, [isAuthenticate, user]);

  // Conditional rendering based on authentication state
  return user ? (
    <h1>You already has been authenticate</h1>
  ) : (
    <>
      {/* Login Form */}
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="m-4 bg-white p-8 rounded-lg shadow-lg w-full md:w-[410px]">
          {" "}
          {/* Adjust width */}
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
            Ingresa tus credenciales para iniciar sesión
          </p>
          <form onSubmit={(e) => onSubmit(e)}>
            {/* Username Input */}
            <div className="mb-3">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Usuario *
              </label>
              <input
                type="text"
                className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                required
                placeholder="James301"
                value={username}
                name="username"
                onChange={(e) => onChange(e)}
              />
            </div>
            {/* Password Input */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Contraseña *
              </label>
              <input
                type="password"
                className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                required
                placeholder="••••••••"
                name="password"
                value={password}
                onChange={(e) => onChange(e)}
                minLength="6"
              />
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {loading ? "Entrando..." : "Iniciar Sesión"}
            </button>
            {/* Display Error Message */}
            {error && (
              <p className="text-red-500 text-xs text-center mt-2 font-semibold">
                {error}
              </p>
            )}
            {/* Signup Option */}
            <p className="mt-4 text-center">
              ¿Aún no tienes cuenta?
              <Link to="/signup"> Registrate</Link>
            </p>
            {/* Reset Password Option */}
            <p className="text-center">
              <Link to="/reset-password"> ¿Olvidaste tu contraseña?</Link>
            </p>
            {/* Terms and Conditions */}
            <p className="text-gray-600 text-xs text-center mt-4">
              By clicking Register, you agree to accept Apex Financial's
              <a href="#" className="text-blue-500 hover:underline">
                Terms and Conditions
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
