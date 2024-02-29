import { useEffect, useState } from "react";
import { Link, redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { verify } from "../reducers/auth";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const Activate = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.auth);

  const { user, isAuthenticate } = state;

  const [tokensForm, setTokensForm] = useState({
    uid: "",
    token: "",
  });
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(tokensForm);
    dispatch(verify(tokensForm));
  };

  useEffect(() => {
    if (isAuthenticate && user) {
      navigate("/");
    }
  }, [isAuthenticate, user]);

  useEffect(() => {
    if (params.uid && params.token != "") {
      setTokensForm({
        uid: params.uid,
        token: params.token,
      });
    }
  }, []);
  return user ? (
    <h1>You already has been authenticate</h1>
  ) : (
    <button type="submit" onClick={(e) => onSubmit(e)}>
      Send
    </button>
  );
};

export default Activate;
