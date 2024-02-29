const Contact = () => {
  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          type="text"
          placeholder="Correo electrónico"
          // Add "value" at object data
          className="bg-slate-700 rounded-lg block w-full mb-3 p-2"
          name="username"
          onChange={(e) => onChange(e)}
        />
        <input
          type="password"
          placeholder="Cuentanos acerca de tus dudas aquí"
          className="bg-slate-700 rounded-lg block w-full mb-3 p-2"
          name="password"
          onChange={(e) => onChange(e)}
          minLength="6"
          required
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 rounded-lg block w-full mb-3 p-2"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Contact;
