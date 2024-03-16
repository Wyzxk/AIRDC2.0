import { useState } from "react";
import { sendEmailMessage } from "../Api/Contact"; // Importing the function to send email messages

export function ContactForm() {
  // Component states
  const [message, setMessage] = useState(""); // Message to display
  const [isSent, setIsSent] = useState(false); // Form submission status
  const [dataForm, setDataForm] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
  });

  // Form submission handler
  const onSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    setMessage("Enviando...");
    console.log(dataForm);
    // Sending the message using the sendEmailMessage function
    sendEmailMessage(dataForm)
      .then((response) => {
        // Promise resolved
        // Set success message
        setMessage(
          "Los datos se han enviado correctamente, esperamos pronto contactarnos contigo"
        );
        setIsSent(true); // Set submission status to true
      })
      .catch((error) => {
        // Promise rejected
        console.log(error.response.data.error); // Log error to console
        setMessage(error.response.data.error); // Set error message
      });

    console.log(dataForm); // Log form data to console
  };

  // Form field change handler
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  return (
    <>
      {isSent ? ( // If the form is successfully submitted
        <>
          <div className="bg-gray-100 flex items-center justify-center">
            <div className="m-14 bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
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
                ¡Listo!, hemos recibido tu mensaje correctamente.
                <br /> <br />
                Esperamos pronto contactarnos contigo
              </p>
              <div className="flex justify-center items-center">
                <a href="/">
                  <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Volver al inicio
                  </button>
                </a>
              </div>
            </div>
          </div>
        </>
      ) : (
        // If the form is not submitted or there is an error
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
              <h2 className="text-2xl font-semibold text-center mb-4">
                Contactanos
              </h2>
              <p className="text-gray-600 text-center mb-6">
                Envíanos un mensaje con tus dudas e inquietudes.
              </p>
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-5">
                  <label
                    htmlFor="fullName"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    className="form-input w-full px-4 py-2 border rounded-md text-gray-700 focus:border-[#6A64F1] focus:ring-[#6A64F1]"
                    required
                    placeholder="(Máximo 30 caracteres)"
                    onChange={(e) => handleOnChange(e)}
                    name="name"
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-input w-full px-4 py-2 border rounded-md text-gray-700 focus:border-[#6A64F1] focus:ring-[#6A64F1]"
                    required
                    placeholder="TuCorreoElectronico@gmail.com"
                    onChange={(e) => handleOnChange(e)}
                    name="email"
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="subject"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Tema *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="form-input w-full px-4 py-2 border rounded-md text-gray-700 focus:border-[#6A64F1] focus:ring-[#6A64F1]"
                    required
                    placeholder="(Máximo 30 caracteres)"
                    onChange={(e) => handleOnChange(e)}
                    name="topic"
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="message"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Mensaje *
                  </label>
                  <textarea
                    rows="4"
                    id="message"
                    className="form-textarea w-full px-4 py-2 border rounded-md text-gray-700 focus:border-[#6A64F1] focus:ring-[#6A64F1]"
                    required
                    placeholder="Escribenos tu mensaje!"
                    onChange={(e) => handleOnChange(e)}
                    name="message"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    {message === "Enviando..." ? message : "Enviar"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}
