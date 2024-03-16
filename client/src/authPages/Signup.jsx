import { useEffect, useState } from "react";
import { Link, redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { signup } from "../reducers/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  // Initialize Redux dispatch and navigation
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch authentication state from Redux store
  const state = useSelector((state) => state.auth);
  const [err, setErr] = useState([]); // Initialize error state

  // Destructure authentication state
  const { loading, error, isAuthenticate, user, signupState, signupStateLoad } =
    state;

  // Redirect user if already authenticated
  useEffect(() => {
    if (isAuthenticate && user) {
      navigate("/");
    }
  }, [isAuthenticate, user]);

  // Initialize form data state
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    re_password: "",
  });
  const { username, email, password, re_password } = formData;

  // Handle username change
  const onChangeUser = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.toLowerCase(),
      [e.target.email]: e.target.value.toLowerCase(),
    });
  };

  // Handle form input changes
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const onSubmit = (e) => {
    e.preventDefault();
    if (password === re_password) {
      dispatch(signup(formData)).then((result) => {
        if (result.payload.username) {
          setErr({
            username: "Este nombre de usuario ya existe",
          });
        } else if (result.payload.email) {
          setErr({
            email: "Comprueba que el correo electrónico sea valido",
          });
        }
      });
    } else {
      setErr({
        password: "Las contraseñas no coinciden",
      });
    }
  };

  // Conditional rendering based on signup state
  return signupState === true ? (
    <>
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="m-4 bg-white p-8 rounded-lg shadow-lg w-full md:w-[410px]">
          {" "}
          {/* Ajuste de ancho */}
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
            Por tu seguridad y la de nosotros verifica tu cuenta desde el correo
            electrónico registrado
          </p>
          <p className="text-center font-semibold">
            {formData.email &&
              formData.email.charAt(0).toUpperCase() + formData.email.slice(1)}
          </p>
        </div>
      </div>
    </>
  ) : (
    <>
      {/* Signup Form */}
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
            Ingresa tus credenciales para registrarte
          </p>
          <form onSubmit={(e) => onSubmit(e)}>
            {/* Username */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Usuario *
                <p className="text-gray-600 text-xs">
                  Recuerda el usuario, ingresarás con él
                </p>
                {err.username && (
                  <p className="text-red-500 text-xs">{err.username}</p>
                )}
              </label>
              <input
                minLength="6"
                type="text"
                className={`form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 ${
                  err.username && "border-red-500"
                }`}
                required
                placeholder="James301"
                name="username"
                onChange={(e) => onChangeUser(e)}
              />
            </div>
            {/* Email */}
            <div className="mb-3">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Correo Electrónico *
                {err.email && (
                  <p className="text-red-500 text-xs">{err.email}</p>
                )}
              </label>
              <input
                type="email"
                className={`form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 ${
                  err.email && "border-red-500"
                }`}
                required
                placeholder="MiCorreo@gmail.com"
                name="email"
                onChange={(e) => onChangeUser(e)}
              />
            </div>
            {/* Password */}
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
                name="password"
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
                name="re_password"
                onChange={(e) => onChange(e)}
                minLength="6"
              />
            </div>
            {/* Signup Button */}
            <button
              type="submit"
              className="w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {signupStateLoad ? "Verificando datos..." : "Registrarse"}
            </button>
            {/* Signup Option */}
            <p className="mt-4 text-center">
              ¿Ya tienes una cuenta?
              <Link to="/login"> Inicia Sesión</Link>
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

export default Signup;
