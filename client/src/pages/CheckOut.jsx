import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { ContactForm } from "../components/ContactForm";
import { changeUser, insertInfo, getInfo, putInfo } from "../Api/ProfilePage";
import { sendDataToRedirect } from "../Api/Delivery";
import { useSelector, useDispatch } from "react-redux";
import {
  insertUserAddress,
  getUserAddress,
  editUserAddress,
} from "../Api/UserAddress";
import { getIdProducts } from "../Api/Products";

import { sendPayment } from "../reducers/auth";
import { addDelivery } from "../Api/Delivery";
import { useNavigate, useParams } from "react-router-dom";
const CheckOut = () => {
  const state = useSelector((state) => state.auth);
  const { user, payment } = state;
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({});
  const [paymentInfo, setPaymentInfo] = useState([]);
  const [total, setTotal] = useState("");
  const [descript, setDescript] = useState("");
  const [userAddress, setUserAddress] = useState({}); // State to store user's address data
  const [dataForm, setDataForm] = useState({});
  const navigate = useNavigate();
  const params = useParams();
  // Effect hook to fetch user information on component mount
  useEffect(() => {
    dispatch(sendPayment());
    if (params.id) {
      getIdProducts(params.id).then((response) => {
        setPaymentInfo(response.data);
      });
    } else if (payment) {
      setPaymentInfo(payment);
      if (payment.length <= 0) {
        navigate("/");
      }
    }

    if (user) {
      getInfo(user.id)
        .then((response) => {
          console.log(response);
          const { names, lastNames, phone, residenceCity, typeId, numberId } =
            response.data[0];
          // Updating userInfo state with fetched data
          setUserInfo({
            ...userInfo,
            names: names + " " + lastNames,
            phone,
            residenceCity,
            typeId,
            numberId,
            email: user.email,
            exists: "Si",
          });
        })
        .catch((error) => {
          navigate("/profile");
          localStorage.setItem(
            "userNot",
            "Tienes que rellenar el formulario de usuario"
          );
        });
      // Fetch user's address data when component mounts
      getUserAddress(user.id)
        .then((response) => {
          localStorage.removeItem("userANot");
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
        })
        .catch((error) => {
          navigate("/profile");
          localStorage.setItem(
            "userANot",
            "Tienes que rellenar el formulario de dirección"
          );
        });
    }
  }, [user, params.id]);
  useEffect(() => {
    if (params.id) {
      if (paymentInfo[0]) {
        alert("si");
        setTotal(paymentInfo[0].productPrice);
        setDescript(paymentInfo[0].productName);
      }
    } else if (payment && payment.length > 0) {
      let totalAmount = 0;
      let descriptData = "";

      // Calcular el total usando un bucle for...in
      for (const index in payment) {
        totalAmount += payment[index].total;
        descriptData += payment[index].productName + ", ";
      }

      // Establecer el estado del total
      setTotal(totalAmount);
      setDescript(descriptData);
      // Establecer el estado de paymentInfo si es necesario
      setPaymentInfo(payment);
    }
  }, [payment]);
  const handler = window.ePayco.checkout.configure({
    key: "fe4948f42e61a8c969b6c6a8f302adfc", // Reemplaza con tu clave pública
    test: true, // Cambia a false para producción
  });
  // Datos de la transacción

  // Abrir el checkout cuando sea necesario, por ejemplo, en un evento de click
  const openCheckout = () => {
    const randomInvoiceNumber = Math.floor(Math.random() * 9000) + 1000;
    const invoiceNumber = `FAC-${randomInvoiceNumber}`;
    const data = {
      // Parámetros obligatorios
      name: "Pago AIRDC",
      description: descript,
      invoice: invoiceNumber,
      currency: "COP",
      amount: total,
      country: "CO",
      lang: "es",
      external: false, // Puedes ajustar según tus necesidades

      // Atributos opcionales
      confirmation: `https://Jhon123456.pythonanywhere.com/${
        user.id
      }/${invoiceNumber}/"${true}"`,
      acepted: `https://Jhon123456.pythonanywhere.com/${
        user.id
      }/${invoiceNumber}/${true}`,
      rejected: `https://Jhon123456.pythonanywhere.com/${
        user.id
      }/${invoiceNumber}/${true}`,
      // pending: `https://delicate-melba-b47259.netlify.app`,
      response: `https://Jhon123456.pythonanywhere.com/${
        user.id
      }/${invoiceNumber}/${true}`,

      // Atributos cliente
      name_billing: userInfo.names,
      address_billing:
        userAddress.city +
        " " +
        userAddress.department +
        " " +
        userAddress.aditionalInfo +
        " " +
        userAddress.cPostal +
        " " +
        userAddress.neighborhood +
        " " +
        userAddress.numberStreet +
        " " +
        userAddress.street,
      type_doc_billing: userInfo.typeId.toLowerCase(),
      mobilephone_billing: userInfo.phone,
      number_doc_billing: userInfo.numberId,
      email_billing: userInfo.email,
      methodsDisable: ["CASH", "SP"],
      // Deshabilitar métodos de pago
    };
    const newData = {
      descript: data.description,
      idUser: user.id,
      amount: data.amount,
      doctype: data.type_doc_billing,
      phone: data.mobilephone_billing,
      docNumber: data.number_doc_billing,
      email: data.email_billing,
      address: data.address_billing,
      transaction: data.invoice,
      paymentStatus: "Pendiente",
    };
    localStorage.setItem("transaction", data.invoice);
    addDelivery(newData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    handler.open(data);
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };
  const ver = () => {
    console.log(total);
    console.log(paymentInfo[0].productPrice);
    const data = {
      idUser: "10",
      idPedido: "FAC-6470",
      status: true,
    };

    // Construir la URL con los parámetros de consulta
    const url = `http://localhost:3000/${data.idUser}/${data.idPedido}/${data.status}`;

    // Redirigir a la nueva URL
    window.location.href = url;
  };
  return (
    <>
      <Navbar />
      <div className="min-w-screen min-h-screen bg-gray-50 py-5 mt-10">
        {/* <button onClick={() => ver()}>ver pues</button> */}

        <button onClick={ver}>ver</button>
        <div className="w-full bg-white border-t border-b border-gray-200 px-5 py-10 text-gray-800">
          <div className="w-full">
            <div className="-mx-3 md:flex items-start">
              <div className="px-3 md:w-7/12 lg:pr-10">
                <div className="max-h-52 overflow-y-auto">
                  {params.id && paymentInfo[0] ? (
                    <>
                      {" "}
                      <div className="w-full mx-auto text-gray-800 font-light mb-6 border-b border-gray-200 pb-6">
                        <div className="w-full flex items-center">
                          <div className="overflow-hidden rounded-lg w-16 h-16 bg-gray-50 border border-gray-200">
                            <img
                              src={paymentInfo[0].productImageUrl}
                              alt=""
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div className="flex-grow pl-3">
                            <h6 className="font-semibold uppercase text-gray-600">
                              {paymentInfo[0].productName}
                            </h6>
                            <p className="text-gray-400">x 1</p>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-600 text-xl">
                              ${paymentInfo[0].productPrice.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {paymentInfo.map((product, index) => (
                        <div
                          key={index}
                          className="w-full mx-auto text-gray-800 font-light mb-6 border-b border-gray-200 pb-6"
                        >
                          <div className="w-full flex items-center">
                            <div className="overflow-hidden rounded-lg w-16 h-16 bg-gray-50 border border-gray-200">
                              <img
                                src={product.productImageUrl}
                                alt=""
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <div className="flex-grow pl-3">
                              <h6 className="font-semibold uppercase text-gray-600">
                                {product.productName}
                              </h6>
                              <p className="text-gray-400">
                                x {product.quantity}
                              </p>
                            </div>
                            <div>
                              <span className="font-semibold text-gray-600 text-xl">
                                $
                                {product.total &&
                                  product.total.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
                <form>
                  <div className="mb-6 pb-6 border-b border-gray-200 text-gray-800">
                    <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 text-gray-800 font-light mb-6">
                      <div className="w-full p-3 border-b border-gray-200">
                        <div className="mb-5">
                          <label
                            htmlFor="type1"
                            className="flex items-center cursor-pointer"
                          >
                            <img
                              src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png"
                              className="h-6 ml-3"
                              alt=""
                            />
                          </label>
                        </div>
                        <div>
                          <div className="mb-3">
                            <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">
                              Nombres
                            </label>
                            <div>
                              <input
                                onChange={(e) => handleOnChange(e)}
                                defaultValue={userInfo && userInfo.names}
                                className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                                placeholder="John Smith"
                                type="text"
                              />
                            </div>
                          </div>
                          <div className="mb-3 flex items-end">
                            <div className="flex flex-wrap">
                              <div className="w-full sm:w-1/3 px-2 mb-4">
                                <label className="text-gray-600 font-semibold text-sm mb-2 ml-1 block">
                                  Departamento
                                </label>
                                <input
                                  onChange={(e) => handleOnChange(e)}
                                  defaultValue={userAddress.department}
                                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                                  placeholder="Ingrese Departamento"
                                  type="text"
                                />
                              </div>
                              <div className="w-full sm:w-1/3 px-2 mb-4">
                                <label className="text-gray-600 font-semibold text-sm mb-2 ml-1 block">
                                  Ciudad
                                </label>
                                <input
                                  onChange={(e) => handleOnChange(e)}
                                  defaultValue={userAddress.city}
                                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                                  placeholder="Ingrese Ciudad"
                                  type="text"
                                />
                              </div>
                              <div className="w-full sm:w-1/3 px-2 mb-4">
                                <label className="text-gray-600 font-semibold text-sm mb-2 ml-1 block">
                                  Barrio
                                </label>
                                <input
                                  onChange={(e) => handleOnChange(e)}
                                  defaultValue={userAddress.neighborhood}
                                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                                  placeholder="Ingrese Barrio"
                                  type="text"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mb-3 flex items-end">
                            <div className="flex flex-wrap">
                              <div className="w-full sm:w-1/3 px-2 mb-4">
                                <label className="text-gray-600 font-semibold text-sm mb-2 ml-1 block">
                                  Codigo Postal
                                </label>
                                <input
                                  onChange={(e) => handleOnChange(e)}
                                  defaultValue={userAddress.cPostal}
                                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                                  placeholder="Ingrese Codigo Postal"
                                  type="text"
                                />
                              </div>
                              <div className="w-full sm:w-1/3 px-2 mb-4">
                                <label className="text-gray-600 font-semibold text-sm mb-2 ml-1 block">
                                  Calle
                                </label>
                                <input
                                  onChange={(e) => handleOnChange(e)}
                                  defaultValue={userAddress.street}
                                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                                  placeholder="Ingrese Calle"
                                  type="text"
                                />
                              </div>
                              <div className="w-full sm:w-1/3 px-2 mb-4">
                                <label className="text-gray-600 font-semibold text-sm mb-2 ml-1 block">
                                  Número de Calle
                                </label>
                                <input
                                  onChange={(e) => handleOnChange(e)}
                                  defaultValue={userAddress.numberStreet}
                                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                                  placeholder="Ingrese Número de Calle"
                                  type="text"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mb-3 flex items-end">
                            <div className="flex flex-wrap w-full">
                              <div className="w-full sm:w-1/3 px-2 mb-4">
                                <label className="text-gray-600 font-semibold text-sm mb-2 ml-1 block">
                                  Información adicional
                                </label>
                                <input
                                  onChange={(e) => handleOnChange(e)}
                                  defaultValue={userAddress.aditionalInfo}
                                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                                  placeholder="Ingrese Información adicional"
                                  type="text"
                                />
                              </div>
                              <div className="w-full sm:w-2/3 px-2 mb-4">
                                <label className="text-gray-600 font-semibold text-sm mb-2 ml-1 block">
                                  Correo Electrónico
                                </label>
                                <input
                                  onChange={(e) => handleOnChange(e)}
                                  defaultValue={userInfo.email}
                                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                                  placeholder="JohnSmith@gmail.com"
                                  type="text"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mb-3 -mx-2 flex items-end">
                            <div className="w-full sm:w-1/3 px-2 mb-4">
                              <label className="text-gray-600 font-semibold text-sm mb-2 ml-1 block">
                                Tipo de Identificación
                              </label>
                              <div>
                                <select
                                  onChange={(e) => handleOnChange(e)}
                                  name="typeId"
                                  className="form-select w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                                >
                                  <option value="">
                                    {/* Mostrar tipo de ID seleccionado */}
                                    {userInfo.typeId === "Cc"
                                      ? "Cédula de Ciudadanía (CC)"
                                      : userInfo.typeId === "Ti"
                                      ? "Tarjeta de Identidad (TI)"
                                      : userInfo.typeId === "Ce"
                                      ? "Cédula de Extranjería (CE)"
                                      : "Seleccionar tipo de ID"}
                                  </option>
                                  {/* Opciones para seleccionar tipo de ID */}
                                  <option value="Cc">
                                    Cédula de Ciudadanía (CC)
                                  </option>
                                  <option value="Ti">
                                    Tarjeta de Identidad (TI)
                                  </option>
                                  <option value="Ce">
                                    Cédula de Extranjería (CE)
                                  </option>
                                  {/* Agregar más opciones según sea necesario */}
                                </select>
                              </div>
                            </div>
                            <div className="w-full sm:w-2/3 px-2 mb-4">
                              <label className="text-gray-600 font-semibold text-sm mb-2 ml-1 block">
                                Número de Identificación
                              </label>
                              <div>
                                <input
                                  onChange={(e) => handleOnChange(e)}
                                  defaultValue={userInfo.numberId}
                                  className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                                  placeholder="0000000"
                                  type="text"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="px-3 md:w-5/12">
                <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-3 text-gray-800 font-light mb-6">
                  <div className="w-full flex mb-3 items-center">
                    <div className="w-32">
                      <span className="text-gray-600 font-semibold">
                        Contactanos
                      </span>
                    </div>
                    <div className="flex-grow pl-3">
                      <span>302-502-0202</span>
                    </div>
                  </div>
                  <div className="w-full flex items-center">
                    <div className="w-32">
                      <span className="text-gray-600 font-semibold">
                        Dirección
                      </span>
                    </div>
                    <div className="flex-grow pl-3">
                      <span>Calle 58 #30-31</span>
                    </div>
                  </div>
                  <div className="w-full flex items-center">
                    <div className="w-32">
                      <span className="text-gray-600 font-semibold">
                        Facturación
                      </span>
                    </div>
                    <div className="flex-grow pl-3">
                      <span>
                        La factura se te enviará automáticamente al correo
                      </span>
                    </div>
                  </div>
                </div>
                {/* <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 text-gray-800 font-light mb-6">
                  <div className="w-full flex mb-3 items-center">
                    <div className="flex-grow">
                      <span className="text-gray-600">Subtotal</span>
                    </div>
                    <div className="pl-3">
                      <span className="font-semibold">$190.91</span>
                    </div>
                  </div>
                  <div className="w-full flex items-center">
                    <div className="flex-grow">
                      <span className="text-gray-600">Taxes (GST)</span>
                    </div>
                    <div className="pl-3">
                      <span className="font-semibold">$19.09</span>
                    </div>
                  </div>
                </div> */}
                <div>
                  <div className="mb-6 pb-6 border-b border-gray-200 md:border-none text-gray-800 text-xl">
                    <div className="w-full flex items-center">
                      <div className="flex-grow">
                        <span className="text-gray-600">
                          <b>Total</b>
                        </span>
                      </div>
                      <div className="pl-3">
                        <span className="font-semibold text-gray-400 text-sm">
                          COP
                        </span>{" "}
                        <span className="font-semibold">
                          $
                          {params.id && paymentInfo[0]
                            ? paymentInfo[0].productPrice.toLocaleString()
                            : total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-center mb-2">
                    Pagos seguros y encriptados con ePayco
                  </p>
                  <button
                    onClick={openCheckout}
                    className="block max-w-xs mx-auto bg-gray-900 hover:bg-gray-700 focus:bg-gray-700 text-white rounded-lg px-3 py-2 font-semibold"
                  >
                    <img src="https://multimedia.epayco.co/dashboard/btns/btn3.png" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckOut;
