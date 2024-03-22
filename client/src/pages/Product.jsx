import { getAllProducts } from "../Api/Products";
import { CardProduct } from "../components/CardProduct";
import { Pagination } from "../components/Pagination";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { SeeProduct } from "../components/SeeProduct";

function Product() {
  const [productsQT, setProductsQT] = useState(8); // Number of products per page
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const indexEnd = currentPage * productsQT; // Index of the last product to display
  const indexStart = indexEnd - productsQT; // Index of the first product to display
  const [products, setProducts] = useState([]); // Array of products
  const [search, setSearch] = useState(""); // Search query
  const params = useParams();
  const navigate = useNavigate();
  // Fetch products from the API when the component mounts
  useEffect(() => {
    async function chargeProducts() {
      const response = await getAllProducts();
      setProducts(response.data);
    }
    chargeProducts();
  }, []);

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

  const see = (id) => {
    console.log("hola");
    // navigate(`/productos/${id}`);
  };

  return (
    <>
      <Navbar />
      {params.id ? (
        <h1>{params.id}</h1>
      ) : (
        <>
          {/* Search Input */}
          <div className="max-w-sm mx-auto">
            <form>
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
          <div className="w-4/4 p-4 flex flex-wrap">
            {showProducts.map((product, index) => (
              <CardProduct
                key={index}
                index={product.id}
                name={product.productName}
                price={product.productPrice}
                onClick={() => see(product.id)}
              />
            ))}
          </div>
          {/* Pagination */}
          <Pagination
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            nPages={nPages}
          />
        </>
      )}

      <Footer />
    </>
  );
}

export default Product;
