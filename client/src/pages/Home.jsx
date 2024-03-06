import { useDispatch } from "react-redux";
import { logout } from "../reducers/auth";
import { useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../styles/index.css";
import { ContactForm } from "../components/ContactForm";

const Home = () => {
  const images = [
    {
      original: "/home/f1.jpg",
      thumbnail: "https://picsum.photos/id/866/1250/720/",
    },
    {
      original: "/home/f2.jpg",
      thumbnail: "https://picsum.photos/id/1020/1250/720/",
    },
    {
      original: "/home/f5.jpg",
      thumbnail: "https://picsum.photos/id/1018/1250/720/",
    },
  ];

  useEffect(() => {
    console.log(localStorage.getItem("user"));
  }, []);

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logout());
  };

  return (
    <>
      <div className="w-full h-full flex justify-center items-center relative fail">
        <div className="w-full mx-auto">
          <ImageGallery
            items={images}
            showPlayButton={false}
            showFullscreenButton={false}
            showBullets={false}
            autoPlay={true}
            slideInterval={5000}
            showThumbnails={false}
            slideDuration={1000}
            renderItem={(item) => (
              <div className="relative flex flex-col items-center justify-center">
                <img
                  src={item.original}
                  alt={item.originalAlt}
                  className="object-cover w-full sm:h-96 md:h-96 lg:h-128 xl:h-128 fail"
                />
                <div className="text-center absolute bottom-20">
                  <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl text-white">
                    Refresca tu viaje <br />
                    con nuestros productos
                  </h1>
                  <button className="bg-black shadow-lg shadow-gray-900 hover:bg-blue-800 text-white font-bold rounded px-10 py-5 mt-5">
                    Comprar
                  </button>
                </div>
              </div>
            )}
          />
        </div>
      </div>

      {/* Container */}
      <div className="min-h-screen items-center justify-center bg-gray-100 flex-col grid grid-cols-1 pb-20">
        <h1 className="mt-14 text-5xl text-center font-bold mb-20 text-gray-800">
          Los productos más destacados <br />
          de nosotros
        </h1>
        <div className="flex overflow-x-auto px-4">
          {/* Tarjeta 1 */}
          <div className="mx-2 my-2 flex-none max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md xl:max-w-md">
            <div className="cursor-pointer rounded-lg bg-white p-2 shadow duration-150 hover:scale-105 hover:shadow-md">
              <img
                className="w-full rounded-lg object-cover object-center"
                src="https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="product"
              />
              <p className="my-4 pl-4 font-bold text-gray-500">
                Filtro de aire
              </p>
              <p className="mb-4 ml-4 text-xl font-semibold text-gray-800">
                $50.000
              </p>
              <button className="bg-black hover:bg-gray-500 text-white font-bold rounded-full px-5 py-1 mb-2 ml-3">
                Comprar
              </button>
            </div>
          </div>

          {/* Tarjeta 2 */}
          <div className="mx-2 my-2 flex-none max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md xl:max-w-md">
            <div className="cursor-pointer rounded-lg bg-white p-2 shadow duration-150 hover:scale-105 hover:shadow-md">
              <img
                className="w-full rounded-lg object-cover object-center"
                src="https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="product"
              />
              <p className="my-4 pl-4 font-bold text-gray-500">Compresor</p>
              <p className="mb-4 ml-4 text-xl font-semibold text-gray-800">
                $1.800.000
              </p>
              <button className="bg-black hover:bg-gray-500 text-white font-bold rounded-full px-5 py-1 mb-2 ml-3">
                Comprar
              </button>
            </div>
          </div>

          {/* Tarjeta 3 */}
          <div className="mx-2 my-2 flex-none max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md xl:max-w-md">
            <div className="cursor-pointer rounded-lg bg-white p-2 shadow duration-150 hover:scale-105 hover:shadow-md">
              <img
                className="w-full rounded-lg object-cover object-center"
                src="https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="product"
              />
              <p className="my-4 pl-4 font-bold text-gray-500">Evaporador</p>
              <p className="mb-4 ml-4 text-xl font-semibold text-gray-800">
                $300.000
              </p>
              <button className="bg-black hover:bg-gray-500 text-white font-bold rounded-full px-5 py-1 mb-2 ml-3">
                Comprar
              </button>
            </div>
          </div>

          {/* Tarjeta 4 */}
          <div className="mx-2 my-2 flex-none max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md xl:max-w-md">
            <div className="cursor-pointer rounded-lg bg-white p-2 shadow duration-150 hover:scale-105 hover:shadow-md">
              <img
                className="w-full rounded-lg object-cover object-center"
                src="https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="product"
              />
              <p className="my-4 pl-4 font-bold text-gray-500">Compresor</p>
              <p className="mb-4 ml-4 text-xl font-semibold text-gray-800">
                $1.800.000
              </p>
              <button className="bg-black hover:bg-gray-500 text-white font-bold rounded-full px-5 py-1 mb-2 ml-3">
                Comprar
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End Container */}
      {/* Container */}
      <div className="min-h-screen flex items-center justify-center bg-gray-100 flex-col pb-20">
        <h1 className="mt-14 text-5xl text-center font-bold mb-20 text-gray-800">
          Compra ahora con <br />
          descuento
        </h1>
        <div className="container">
          <div className="flex flex-wrap justify-center">
            {/* Tarjeta 1 */}
            <div className="mx-16  max-w-md sm:max-w-md md:w-1/2 lg:w-1/3 xl:w-1/3">
              <div className="cursor-pointer rounded-lg bg-white p-2 shadow duration-150 hover:scale-105 hover:shadow-md relative">
                <img
                  className="rounded-lg object-cover object-center maximize-img"
                  src="https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="product"
                />
                <h1 className="absolute bottom-4 left-2 text-white text-3xl bg-opacity-50 px-2 py-1 rounded-md">
                  Hasta 15% de descuento en compresores
                </h1>
              </div>
            </div>

            {/* Tarjeta 2 */}
            <div className="mx-16  max-w-md sm:max-w-md md:w-1/2 lg:w-1/3 xl:w-1/3">
              <div className="cursor-pointer rounded-lg bg-white p-2 shadow duration-150 hover:scale-105 hover:shadow-md relative">
                <img
                  className="rounded-lg object-cover object-center maximize-img"
                  src="https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="product"
                />
                <h1 className="absolute bottom-4 left-2 text-white text-3xl bg-opacity-50 px-2 py-1 rounded-md">
                  Hasta 10% de descuento en filtros
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Container */}

      {/*  Container */}
      <div id="about" className="shop">
        <div className="container mx-auto px-4 my-8 rounded-lg">
          <div className="flex flex-col lg:flex-row items-center">
            {/* Columna de la imagen */}
            <div className="w-full lg:w-1/2 p-4">
              <div className="shop_img rounded-lg">
                <img
                  src="/home/ac2.jpg"
                  alt="Imagen principal"
                  className="w-full rounded-lg image-bestProducts"
                />
              </div>
            </div>
            {/* Columna del texto */}
            <div className="w-full lg:w-1/2 bg-black text-white rounded-lg image-bestProducts lg:ml-4 mt-4 lg:mt-0 p-10">
              <div className="max-w-xl mx-auto p-4 lg:p-8">
                <div className="titlepage">
                  <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                    Los mejores productos del mercado
                  </h1>
                  <p className="text-base lg:text-lg mb-6">
                    En AirDC, nos enorgullece ofrecer productos de calidad y
                    soluciones de climatización confiables para tu automóvil.
                    Explora nuestra gama de productos y encuentra la solución
                    perfecta para mantener tu comodidad en carretera. Nuestra
                    misión es asegurarnos de que tu viaje sea siempre fresco y
                    agradable.
                  </p>
                  <a
                    href="#"
                    className="text-lg font-bold text-blue-600 hover:text-blue-800"
                  >
                    Productos
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Container */}

      {/* Container */}
      <ContactForm />
    </>
  );
};

export default Home;
