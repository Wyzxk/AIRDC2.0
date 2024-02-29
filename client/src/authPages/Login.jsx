import { useEffect, useState } from "react";
import { Link, redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { login } from "../reducers/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.auth);

  const { loading, error, isAuthenticate, user } = state;
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = formData;
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData)).then((result) => {
      if (result.payload) {
        setFormData({
          username: "",
          password: "",
        });
        navigate("/");
      } else {
      }
    });
  };

  useEffect(() => {
    if (isAuthenticate && user) {
      navigate("/");
    }
  }, [isAuthenticate, user]);

  return user ? (
    <h1>You already has been authenticate</h1>
  ) : (
    <div className="max-w-md mx-auto">
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          type="text"
          placeholder="Nombre de usuario"
          // Add "value" at object data
          className="bg-slate-700 rounded-lg block w-full mb-3 p-2"
          value={username}
          name="username"
          onChange={(e) => onChange(e)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="bg-slate-700 rounded-lg block w-full mb-3 p-2"
          name="password"
          value={password}
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

export default Login;
