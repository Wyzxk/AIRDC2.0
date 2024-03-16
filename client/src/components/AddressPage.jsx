import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  insertUserAddress,
  getUserAddress,
  editUserAddress,
} from "../Api/UserAddress";

export function AddressPage() {
  // Using useSelector hook to access the Redux store state
  const state = useSelector((state) => state.auth);
  const { user } = state;
  const [userAddress, setUserAddress] = useState({}); // State to store user's address data
  const [addresState, setAddresState] = useState(""); // State to manage address submission status

  useEffect(() => {
    // Fetch user's address data when component mounts
    getUserAddress(user.id).then((response) => {
      // Extract address data from the response and update state
      const {
        city,
        department,
        aditionalInfo,
        cPostal,
        neighborhood,
        numberStreet,
        street,
      } = response.data[0];
      setUserAddress({
        ...userAddress,
        city,
        department,
        aditionalInfo,
        cPostal,
        neighborhood,
        numberStreet,
        street,
        exists: "Si",
      });
    });
  }, []);

  // Using useState hook to manage form data state
  const [dataForm, setDataForm] = useState([]);

  // onChange event handler to update form data state
  const onChange = (e) => {
    const { name, value } = e.target;
    setDataForm({
      ...dataForm,
      user: state.user.id,
      [name]: value,
    });
  };

  // onSubmit event handler to handle form submission
  const onSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    setAddresState("Enviando...");
    if (userAddress.exists) {
      // If user address exists, update the address
      editUserAddress(dataForm)
        .then((response) => {
          setAddresState("Enviado Correctamente");
        })
        .catch((error) => {
          // Handle errors during update
          if (dataForm.length === 0) {
            setAddresState("No has realizado ningun cambio");
          } else {
            setAddresState("No se ha podido enviar, verifica los datos");
            setAddresState(error.response.data);
          }
        });
    } else {
      // If user address doesn't exist, insert a new address
      insertUserAddress(dataForm)
        .then((response) => {
          setAddresState("Enviado Correctamente");
        })
        .catch((error) => {
          // Handle errors during insertion
          if (dataForm.length === 0) {
            setAddresState("No has realizado ningun cambio");
          } else {
            setAddresState("No se ha podido enviar, verifica los datos");
            setAddresState(error.response.data);
          }
        });
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1  md:grid-cols-1 xl:grid-cols-2 gap-4">
          {/* departament */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Departamento *
              {addresState.department && (
                <p className="text-red-500 text-xs font-semibold mt-2">
                  Introduce el departamento
                </p>
              )}
            </label>
            <input
              onChange={onChange}
              type="text"
              className="form-input  px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              // required
              name="department"
              minLength={3}
              maxLength={20}
              defaultValue={userAddress.department}
            />
          </div>
          {/* city */}
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Ciudad *
              {addresState.city && (
                <p className="text-red-500 text-xs font-semibold mt-2">
                  Introduce la ciudad
                </p>
              )}
            </label>
            <input
              type="text"
              className="form-input  px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              // required
              name="city"
              onChange={onChange}
              defaultValue={userAddress.city}
              minLength={3}
              maxLength={20}
            />
          </div>
          {/* neighborhood */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Barrio *
              {addresState.neighborhood && (
                <p className="text-red-500 text-xs font-semibold mt-2">
                  Introduce el barrio
                </p>
              )}
            </label>
            <input
              type="text"
              className="form-input  px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              // required
              name="neighborhood"
              onChange={onChange}
              defaultValue={userAddress.neighborhood}
              minLength={3}
              maxLength={20}
            />
          </div>
          {/* cPostal */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Codigo Postal *
              {addresState.cPostal && (
                <p className="text-red-500 text-xs font-semibold mt-2">
                  Introduce el codigo postal
                </p>
              )}
            </label>
            <input
              type="text"
              className="form-input  px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              // required
              name="cPostal"
              onChange={onChange}
              defaultValue={userAddress.cPostal}
              minLength={3}
              maxLength={10}
            />
          </div>
          {/* street */}
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Calle *
              {addresState.street && (
                <p className="text-red-500 text-xs font-semibold mt-2">
                  Introduce la calle
                </p>
              )}
            </label>
            <input
              type="text"
              className="form-input  px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              // required
              name="street"
              onChange={onChange}
              defaultValue={userAddress.street}
              minLength={3}
              maxLength={10}
            />
          </div>
          {/* numberStreet */}
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              # Calle *
              {addresState.numberStreet && (
                <p className="text-red-500 text-xs font-semibold mt-2">
                  Introduce el número de la calle
                </p>
              )}
            </label>
            <input
              type="text"
              className="form-input  px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              // required
              name="numberStreet"
              onChange={onChange}
              defaultValue={userAddress.numberStreet}
              minLength={3}
              maxLength={10}
            />
          </div>
          {/* aditionalInfo */}
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Información adicional *
              {addresState.aditionalInfo && (
                <p className="text-red-500 text-xs font-semibold mt-2">
                  Introduce algo de información adicional
                </p>
              )}
            </label>
            <input
              type="text"
              className="form-input  px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              // required
              name="aditionalInfo"
              onChange={onChange}
              defaultValue={userAddress.aditionalInfo}
              maxLength={255}
            />
          </div>
          <div className="mt-4">
            {" "}
            <button
              type="submit"
              className="bg-black text-white px-20 py-2 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {addresState === "Enviando..." ? addresState : "Enviar"}
            </button>
            {addresState === "Enviado Correctamente" && (
              <p className="text-green-500 text-xs font-semibold mt-2">
                {addresState}
              </p>
            )}
            {(addresState === "No se ha podido enviar, verifica los datos" ||
              addresState === "No has realizado ningun cambio") && (
              <p className="text-red-500 text-xs font-semibold mt-2">
                {addresState}
              </p>
            )}
          </div>
        </div>
      </form>
    </>
  );
}
