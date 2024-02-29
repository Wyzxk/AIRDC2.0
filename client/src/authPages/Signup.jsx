import { useEffect, useState } from "react";
import { Link, redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { signup } from "../reducers/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.auth);
  const { loading, error, isAuthenticate, user } = state;

  // useEffect(() => {
  //   if (isAuthenticate && user) {
  //     navigate("/");
  //   }
  // }, [isAuthenticate, user]);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    re_password: "",
  });
  const { username, email, password, re_password } = formData;
  const onChangeUser = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.toLowerCase(),
    });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      email: username,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password === re_password) {
      dispatch(signup(formData)).then((result) => {
        if (result.payload) {
          setFormData({
            email: "",
            password: "",
          });
          navigate("/signup");
        } else {
        }
      });
    } else {
      console.log("contraseña incorrecta");
    }
  };

  // useEffect(() => {
  //   if (isAuthenticate && user) {
  //     navigate("/");
  //   }
  // }, [isAuthenticate, user]);

  return localStorage.getItem("user") ? (
    <h1>
      Por favor confirma tu cuenta con el correo: {localStorage.getItem("user")}
    </h1>
  ) : (
    <div className="max-w-md mx-auto">
      <form onSubmit={(e) => onSubmit(e)}>
        {/* <input
          type="email"
          placeholder="Correo Electrónico"
          // Add "value" at object data
          className="bg-slate-700 rounded-lg block w-full mb-3 p-2"
          value={email}
          name="email"
          onChange={(e) => onChange(e)}
        /> */}
        <input
          type="text"
          placeholder="Nombre"
          // Add "value" at object data
          className="bg-slate-700 rounded-lg block w-full mb-3 p-2"
          // value={username}
          name="username"
          onChange={(e) => onChangeUser(e)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="bg-slate-700 rounded-lg block w-full mb-3 p-2"
          name="password"
          // value={password}
          onChange={(e) => onChange(e)}
          minLength="6"
          required
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          className="bg-slate-700 rounded-lg block w-full mb-3 p-2"
          name="re_password"
          // value={re_password}
          onChange={(e) => onChange(e)}
          minLength="6"
          required
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 rounded-lg block w-full mb-3 p-2"
        >
          {loading ? "loading..." : "login"}
        </button>
        {error && <div>{error}</div>}
      </form>
      <p>
        ¿Aún no tienes cuenta?
        <Link to="/singup"> Registrate</Link>
      </p>
      <p>
        <Link to="/reset-password"> ¿Olvidaste tu contraseña?</Link>
      </p>
    </div>
  );
};

export default Signup;
