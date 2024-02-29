import { useEffect, useState } from "react";
import { Link, redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { reset_password_confirm } from "../reducers/auth";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const ResetPasswordConfirm = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.auth);

  const { user, isAuthenticate } = state;

  const [tokensForm, setTokensForm] = useState({
    uid: "",
    token: "",
  });

  const [formData, setFormData] = useState({
    new_password: "",
    new_password_confirm: "",
  });
  const { new_password, new_password_confirm } = formData;
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

  const onSubmit = (e) => {
    e.preventDefault();
    // setTokensForm({ ...tokensForm, uid: params.uid, token: params.token });
    console.log(formData);
    dispatch(reset_password_confirm(formData)).then((result) => {
      if (result.payload) {
        setFormData({
          new_password: "",
          new_password_confirm: "",
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
          type="password"
          placeholder="Contraseña nueva"
          className="bg-slate-700 rounded-lg block w-full mb-3 p-2"
          name="new_password"
          value={new_password}
          onChange={(e) => onChange(e)}
          minLength="6"
          required
        />
        <input
          type="password"
          placeholder="Confirmar contraseña nueva"
          className="bg-slate-700 rounded-lg block w-full mb-3 p-2"
          name="new_password_confirm"
          value={new_password_confirm}
          onChange={(e) => onChange(e)}
          minLength="6"
          required
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

export default ResetPasswordConfirm;
