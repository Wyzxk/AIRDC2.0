import { useEffect, useState } from "react";
import { Link, redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { reset_password } from "../reducers/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.auth);

  const { user, isAuthenticate } = state;

  const [formData, setFormData] = useState({
    email: "",
  });
  const { email } = formData;

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(reset_password(formData)).then((result) => {
      if (result.payload) {
        setFormData({
          email: "",
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
          type="email"
          placeholder="Correo Electrónico"
          // Add "value" at object data
          className="bg-slate-700 rounded-lg block w-full mb-3 p-2"
          value={email}
          name="email"
          onChange={(e) => onChange(e)}
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 rounded-lg block w-full mb-3 p-2"
        >
          Reset password
        </button>
        {/* {error && <div>{error}</div>} */}
      </form>
    </div>
  );
};

export default ResetPassword;
