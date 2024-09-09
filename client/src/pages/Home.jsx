import { useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../styles/index.css";
import { ContactForm } from "../components/ContactForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Product from "../pages/Product";
import { changeCategory } from "../reducers/auth";

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
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { user, isAuthenticate, isStaff, loading } = state;
  const navigate = useNavigate();
  useEffect(() => {
    if (isStaff) {
      console.log("staff");
      navigate("/manageproducts");
    }
    console.log(localStorage.getItem("user"));
  }, [isStaff]);

  return (
    <>
      <Navbar />
      <div className="w-full h-full relative mt-16" id="Home">
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
                  className="object-cover w-full custom-height"
                />
                {/* Capa superpuesta */}
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
                <div className="text-center absolute bottom-30 z-10">
                  <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl text-white">
                    Compra los productos de calidad <br></br>y eficiencia en el
                    aire acondicionado automotríz
                  </h1>
                  <button className=" bg-gray-900 dark:bg-gray-600 text-white py-6 px-14 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700 mt-8">
                    <a href="#ProductPage">Ver productos</a>
                  </button>
                </div>
              </div>
            )}
          />
        </div>
      </div>

      {/* Container */}
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center justify-center pb-20">
          <h1 className="mt-14 text-5xl text-center font-bold mb-20 text-gray-800">
            Los productos más destacados <br />
            de nosotros
          </h1>
          {/* scroll aqui overflow x */}
          <div className="flex overflow-x-auto px-4">
            {/* Tarjeta 1 */}
            <div className="mx-auto my-2 flex-none max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md xl:max-w-md p-2">
              <div className="cursor-pointer rounded-lg bg-white p-2 shadow duration-150 hover:scale-105 hover:shadow-md">
                <img
                  className="w-full rounded-lg object-cover object-center"
                  src="/home/filtro.jpg"
                  alt="product"
                />
                <div className="my-4 pl-4 font-bold text-gray-700 text-center">
                  {" "}
                  {/* Alineación horizontal centrada */}
                  Filtros de aire
                </div>
                <div className="flex justify-center">
                  {" "}
                  {/* Alineación horizontal centrada */}
                  <button
                    onClick={() => {
                      dispatch(changeCategory(4));
                    }}
                    className="bg-gray-900 dark:bg-gray-600 text-white py-2 px-20 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <a href="#ProductPage">Ver más</a>
                  </button>
                </div>
              </div>
            </div>

            {/* Tarjeta 2 */}
            <div className="mx-auto my-2 flex-none max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md xl:max-w-md p-2">
              <div className="cursor-pointer rounded-lg bg-white p-2 shadow duration-150 hover:scale-105 hover:shadow-md">
                <img
                  className="w-full rounded-lg object-cover object-center"
                  src="/home/compresor.png"
                  alt="product"
                />
                <div className="my-4 pl-4 font-bold text-gray-700 text-center">
                  {" "}
                  {/* Alineación horizontal centrada */}
                  Compresores
                </div>
                <div className="flex justify-center">
                  {" "}
                  {/* Alineación horizontal centrada */}
                  <button
                    onClick={() => {
                      dispatch(changeCategory(1));
                    }}
                    className="bg-gray-900 dark:bg-gray-600 text-white py-2 px-20 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <a href="#ProductPage">Ver más</a>
                  </button>
                </div>
              </div>
            </div>

            {/* Tarjeta 3 */}
            <div className="mx-auto my-2 flex-none max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md xl:max-w-md p-2">
              <div className="cursor-pointer rounded-lg bg-white p-2 shadow duration-150 hover:scale-105 hover:shadow-md">
                <img
                  className="w-full rounded-lg object-cover object-center"
                  src="/home/Evaporador.jpg"
                  alt="product"
                />
                <div className="my-4 pl-4 font-bold text-gray-700 text-center">
                  {" "}
                  {/* Alineación horizontal centrada */}
                  Evaporadores
                </div>
                <div className="flex justify-center">
                  {" "}
                  {/* Alineación horizontal centrada */}
                  <button
                    onClick={() => {
                      dispatch(changeCategory(2));
                    }}
                    className="bg-gray-900 dark:bg-gray-600 text-white py-2 px-20 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <a href="#ProductPage">Ver más</a>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Container */}
      <div id="ProductPage" className="mt-5">
        <br></br>
        <br></br>
        <br></br>
        <Product />
      </div>
      {/* Container */}
      <div className="min-h-screen flex items-center justify-center bg-gray-100 flex-col pb-20">
        <h1 className="mt-14 text-5xl text-center font-bold mb-20 text-gray-800">
          Compra ahora con <br />
          descuento
        </h1>
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center">
            {/* Tarjeta 1 */}
            <div className="mx-4 max-w-md sm:max-w-md md:w-1/2 lg:w-1/3 xl:w-1/3">
              <h1 className="text-center text-black text-3xl backdrop-filter backdrop-blur-lg bg-opacity-50 px-2 py-1 rounded-md mt-2">
                Hasta 15% de descuento en compresores
              </h1>
              <div className="cursor-pointer rounded-lg bg-white p-2 shadow duration-150 hover:scale-105 hover:shadow-md relative">
                <img
                  style={{ height: "450px" }} // Establecer una altura fija para las imágenes
                  className="rounded-lg object-cover object-center w-full"
                  src="/home/CompresorTwo.jpg"
                  alt="product"
                />
              </div>
            </div>

            {/* Tarjeta 2 */}
            <div className="mx-4 max-w-md sm:max-w-md md:w-1/2 lg:w-1/3 xl:w-1/3">
              <h1 className="text-center text-black text-3xl backdrop-filter backdrop-blur-lg bg-opacity-50 px-2 py-1 rounded-md mt-2">
                Hasta 10% de descuento en filtros
              </h1>
              <div className="cursor-pointer rounded-lg bg-white p-2 shadow duration-150 hover:scale-105 hover:shadow-md relative">
                <img
                  style={{ height: "450px" }} // Establecer la misma altura para las imágenes
                  className="rounded-lg object-cover object-center w-full"
                  src="/home/filtro2.jpg"
                  alt="product"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* End Container */}

      {/*  Container */}
      <div id="AboutPage" className="shop">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Container */}

      {/* Container */}
      <div id="ContactPage" className="relative">
        <div className="relative z-10">
          <br />
          <ContactForm />
        </div>
      </div>
z
      <Footer />
    </>
  );
};

export default Home;
