import { getAllProductsClient, getCategoryProducts } from "../Api/Products";
import { getIdProducts } from "../Api/Products";
import { CardProduct } from "../components/CardProduct";
import { Pagination } from "../components/Pagination";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SeeProduct } from "../components/SeeProduct";
import { ProductInfo } from "../components/ProductInfo/ProductInfo";
import Select from "../components/Select";
import { changeCategory } from "../reducers/auth";
import toast, { Toaster } from "react-hot-toast";

function Product() {
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { category } = state;
  const [productsQT, setProductsQT] = useState(8); // Number of products per page
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const indexEnd = currentPage * productsQT; // Index of the last product to display
  const indexStart = indexEnd - productsQT; // Index of the first product to display
  const [products, setProducts] = useState([]); // Array of products
  const [search, setSearch] = useState(""); // Search query
  const params = useParams();
  const navigate = useNavigate();
  const notify = () => toast.success("Successfully toasted!");

  // Fetch products from the API when the component mounts
  useEffect(() => {
    if (params.id) {
      console.log(params.id);
      async function chargeIdProduct() {
        const response = await getIdProducts(params.id);
        setProducts(response.data);
      }
      chargeIdProduct();
    } else if (category) {
      getCategoryProducts(category)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      async function chargeProducts() {
        const response = await getAllProductsClient();
        setProducts(response.data);
      }
      chargeProducts();
    }
  }, [params.id, category]);
  // Handler for the search input
  const searcher = (e) => {
    setSearch(e.target.value);
  };

  // Filter products based on the search query
  const results = !search
    ? products
    : products.filter((product) =>
        product.productName.toLowerCase().includes(search.toLowerCase())
      );

  // Calculate the total number of pages based on the filtered results
  const nPages = Math.ceil(results.length / productsQT);

  // Slice the products array to display only those for the current page
  const showProducts = results.slice(indexStart, indexEnd);

  const see = () => {
    console.log(products);
  };

  return (
    <>
      {/* <Navbar /> */}

      {params.id ? (
        <>
          {products[0] && (
            <ProductInfo
              name={products[0].productName}
              price={products[0].productPrice}
              stock={products[0].productStock}
              description={products[0].productDescription}
              image={products[0].productImageUrl}
            />
          )}
        </>
      ) : (
        <>
          {/* Search Input */}
          <div className="max-w-sm mx-auto">
            <h1 className="text-center text-xl mb-2">Busca un producto</h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
                <input
                  value={search}
                  type="search"
                  id="default-search"
                  className="block p-2 pl-8 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Buscar productos..."
                  required
                  onChange={searcher}
                />
              </div>
            </form>
          </div>
          {/* Product Cards */}
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/4">
              <Select />
            </div>
            <div className="w-full md:w-3/4 flex flex-wrap">
              {showProducts.length === 0 && category ? (
                <>
                  <span className="p-32">
                    <p>
                      En esta categoria no se encuentra este producto, prueba
                      eliminando el filtrado
                    </p>
                    <b>
                      <button onClick={dispatch(changeCategory(null))}>
                        Click aquí
                      </button>
                    </b>
                  </span>
                </>
              ) : showProducts.length === 0 && category === null ? (
                <>No hay productos</>
              ) : null}
              {showProducts.map((product, index) => (
                <div
                  key={index}
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4"
                >
                  <CardProduct
                    index={product.id}
                    name={product.productName}
                    price={product.productPrice}
                    image={product.productImageUrl}
                    onClick={() => see(product.id)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <Pagination
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            nPages={nPages}
          />
        </>
      )}

      {/* <Footer /> */}
    </>
  );
}

export default Product;
