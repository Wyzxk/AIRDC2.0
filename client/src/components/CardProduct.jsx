export function CardProduct({ name, price, index }) {
  return (
    <>
      {/* Card */}
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2">
        <div className="cursor-pointer rounded-lg bg-white p-4 shadow duration-150 hover:scale-105 hover:shadow-md">
          <img
            className="w-full h-48 rounded-lg object-cover object-center"
            src="https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="product"
          />
          <p className="my-2 pl-2 font-bold text-gray-500">{name}</p>
          <p className="mb-2 ml-2 text-xl font-semibold text-gray-800">
            {price}
          </p>
          <p className="mb-2 ml-2 text-xl font-semibold text-gray-800">
            {index}
          </p>
          <button className="bg-black hover:bg-gray-500 text-white font-bold rounded-full px-5 py-1 mb-2 ml-3">
            Comprar
          </button>
        </div>
      </div>
    </>
  );
}
