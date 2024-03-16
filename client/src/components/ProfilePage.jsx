import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeUser } from "../Api/ProfilePage";
export function ProfilePage() {
  const state = useSelector((state) => state.auth);
  const { user } = state;
  const [dataForm, setDataForm] = useState({});
  const [message, setMessage] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setDataForm({
      ...dataForm,
      [name]: value.toLowerCase(),
    });
  };
  const onSubmit = (e) => {
    e.preventDefault(e);
    setMessage("Enviando...");
    changeUser(dataForm)
      .then(() => {
        setMessage("El usuario se ha cambiado correctamente");
      })
      .catch((error) => {
        console.log(error);
        setMessage("Ha ocurrido un error");
      });
    console.log(dataForm);
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Usuario *
            <p className="text-gray-600 text-xs">
              Recuerda el usuario, ingresarás con él
            </p>
          </label>
          <input
            onChange={onChange}
            minLength="4"
            type="text"
            className="form-input  px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
            required
            placeholder={user ? user.username : ""}
            name="newUsername"
          />
        </div>
        <button
          type="submit"
          className="mb-4 bg-black text-white px-20 py-2 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {message === "Enviando..." ? message : "Enviar"}
        </button>
        {message === "El usuario se ha cambiado correctamente" && (
          <p className="text-green-500 text-xs font-semibold mt-2">{message}</p>
        )}
      </form>
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1  md:grid-cols-1 xl:grid-cols-2 gap-4">
          {/* Current Password */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Nombres
            </label>
            <input
              type="password"
              className="form-input  px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              // required
              name="password"
              placeholder="••••••••"
            />
          </div>
          {/* New Password */}
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Apellidos *
            </label>
            <input
              type="password"
              className="form-input  px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              // required
              placeholder="••••••••"
              name="newPassword"
            />
          </div>
          {/* New Password Confirm */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Teléfono *
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="form-input  px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              // required
              name="newPasswordConfirm"
            />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="bg-black text-white px-20 py-2 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              enviar
            </button>
          </div>
        </div>
      </form>
    </>
    // <>
    //   Username
    //   <div className="mb-4">
    //     <label className="block text-gray-700 text-sm font-semibold mb-2">
    //       Usuario *
    //       <p className="text-gray-600 text-xs">
    //         Recuerda el usuario, ingresarás con él
    //       </p>
    //     </label>
    //     <input
    //       minLength="6"
    //       type="text"
    //       className="form-input  px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
    //       required
    //       placeholder={user ? user.username : ""}
    //       name="username"
    //     />
    //   </div>
    //   {/* Email */}
    //   <div className="mb-3">
    //     <label className="block text-gray-700 text-sm font-semibold mb-2">
    //       Correo Electrónico *
    //     </label>
    //     <input
    //       type="email"
    //       className="form-input  px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
    //       required
    //       placeholder={user ? user.email : ""}
    //       name="email"
    //       onChange={(e) => onChangeUser(e)}
    //     />
    //   </div>
    //   {/* Password */}
    //   <div className="mb-6">
    //     <label className="block text-gray-700 text-sm font-semibold mb-2">
    //       Contraseña *
    //     </label>
    //     <input
    //       type="password"
    //       className="form-input  px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
    //       required
    //       placeholder="••••••••"
    //       name="password"
    //       minLength="6"
    //     />
    //   </div>

    //   {/* Confirm Password */}
    //   <div className="mb-6">
    //     <label className="block text-gray-700 text-sm font-semibold mb-2">
    //       Contraseña *
    //     </label>
    //     <input
    //       type="password"
    //       className="form-input  px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
    //       required
    //       placeholder="••••••••"
    //       name="re_password"
    //       minLength="6"
    //     />
    //   </div>
    // </>
  );
}
