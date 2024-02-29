export function CardProduct({ name, price }) {
  return (
    <>
      {/* Tarjeta 1 */}
      <div className="mx-2 my-2 flex-none max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md xl:max-w-md">
        <div className="cursor-pointer rounded-lg bg-white p-2 shadow duration-150 hover:scale-105 hover:shadow-md">
          <img
            className="w-full rounded-lg object-cover object-center"
            src="https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="product"
          />
          <p className="my-4 pl-4 font-bold text-gray-500">Filtro de aire</p>
          <p className="mb-4 ml-4 text-xl font-semibold text-gray-800">
            $50.000
          </p>
          <button className="bg-black hover:bg-gray-500 text-white font-bold rounded-full px-5 py-1 mb-2 ml-3">
            Comprar
          </button>
        </div>
      </div>
    </>
  );
}
