import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { verify } from "../reducers/auth";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const Activate = () => {
  // Get URL parameters
  const params = useParams();
  const dispatch = useDispatch(); // Get dispatch function for Redux actions
  const navigate = useNavigate(); // Navigate between routes
  const state = useSelector((state) => state.auth); // Get state from Redux store

  // Destructure state variables
  const {
    user,
    isAuthenticate,
    verifyState,
    verifyLoading,
    verifyStateRejected,
  } = state;

  // State to manage activation tokens
  const [tokensForm, setTokensForm] = useState({
    uid: "",
    token: "",
  });

  // Handle form submission for token verification
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(tokensForm);
    dispatch(verify(tokensForm)); // Dispatch verify action with tokens
  };

  // Redirect user to home page if already authenticated
  useEffect(() => {
    if (isAuthenticate && user) {
      navigate("/");
    }
  }, [isAuthenticate, user]);

  // Set tokens from URL parameters
  useEffect(() => {
    if (params.uid && params.token !== "") {
      setTokensForm({
        uid: params.uid,
        token: params.token,
      });
    }
  }, []);

  // Conditional rendering based on verification state
  return user ? (
    <h1 className="text-center text-2xl my-32">Ya estás registrado</h1>
  ) : verifyState ? (
    // Display activation success message
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
            ¡Listo!, tu cuenta ha sido activada correctamente.
            <br /> <br />
            Ahora solo tienes que iniciar sesión.
          </p>
          {/* Display error message if verification is rejected */}
          {verifyStateRejected ? (
            <p className="text-red-500 text-center mb-4">
              Ha ocurrido un error, vuelve a intentarlo desde el email
            </p>
          ) : (
            <></>
          )}
          {/* Button to navigate to login */}
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
    // Display activation form
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
            Activa tu cuenta haciendo click en el siguiente botón
          </p>
          {/* Display error message if verification is rejected */}
          {verifyStateRejected ? (
            <p className="text-red-500 text-center mb-4">
              Ha ocurrido un error, vuelve a intentarlo desde el email
            </p>
          ) : (
            <></>
          )}
          {/* Button to submit activation form */}
          <div className="flex justify-center items-center">
            <button
              onClick={(e) => onSubmit(e)}
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {verifyLoading ? "Verificando cuenta..." : "Activar cuenta"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Activate;
