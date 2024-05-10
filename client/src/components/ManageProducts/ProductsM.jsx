import { getAllProducts } from "../../Api/Products";
import { CardProduct } from "../CardProduct";
import { Pagination } from "../Pagination";
import { useParams, useNavigate } from "react-router-dom";
import { changeStatus } from "../../Api/ManageProducts";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useState, useEffect } from "react";
import { SeeProduct } from "../SeeProduct";

export function ProductsM() {
  const [productsQT, setProductsQT] = useState(8); // Number of products per page
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const indexEnd = currentPage * productsQT; // Index of the last product to display
  const indexStart = indexEnd - productsQT; // Index of the first product to display
  const [products, setProducts] = useState([]); // Array of products
  const [search, setSearch] = useState(""); // Search query
  const [checked, setChecked] = useState("Activo");
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

  const statusProducts = products.filter((product) => {
    if (checked === "Activo") {
      return product.productStatus === true;
    } else if (checked === "Inactivo") {
      return product.productStatus === false;
    }
  });
  // Filter products based on the search query
  const results = !search
    ? statusProducts
    : statusProducts.filter((product) =>
        product.productName.toLowerCase().includes(search.toLowerCase())
      );
  // Calculate the total number of pages based on the filtered results
  const nPages = Math.ceil(results.length / productsQT);

  // Slice the products array to display only those for the current page
  const showProducts = results.slice(indexStart, indexEnd);

  const handleCheck = (check) => {
    setChecked(check);
    console.log(statusProducts);
  };

  return (
    <>
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
          <div className="bg-gray-200">
            <div className="ml-6">
              <div className="flex flex-row">
                <label className="inline-flex items-center mt-3">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-gray-600"
                    checked={checked === "Activo"}
                    onChange={() => handleCheck("Activo")}
                  />
                  <span className="ml-2 text-gray-700">Activos</span>
                </label>
                <label className="inline-flex items-center mt-3 ml-5">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-gray-600"
                    checked={checked === "Inactivo"}
                    onChange={() => handleCheck("Inactivo")}
                  />
                  <span className="ml-2 text-gray-700">Inactivos</span>
                </label>
              </div>
            </div>
          </div>

          {/* Product Cards */}
          <div className="w-4/4 p-4 flex flex-wrap">
            {showProducts.map((product, index) => (
              <CardProduct
                key={index}
                index={product.id}
                name={product.productName}
                price={product.productPrice}
                edit={true}
                image={product.productImageUrl}
                data={product.productStatus}
                onClick={() => product.id}
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
    </>
  );
}
