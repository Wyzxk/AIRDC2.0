import { getAllProducts } from "../Api/Products";
import { CardProduct } from "../components/CardProduct";
import { Pagination } from "../components/Pagination";

import { useState, useEffect } from "react";

function Product({ categories, selectedCategory, onSelectCategory }) {
  const [productsQT, setProductsQT] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const indexEnd = currentPage * productsQT;
  const indexStart = indexEnd - productsQT;
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function chargeProducts() {
      const response = await getAllProducts();
      setProducts(response.data);
    }
    chargeProducts();
    console.log(products);
  }, []);

  const searcher = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };

  const results = !search
    ? products
    : products.filter((product) =>
        product.productName.toLowerCase().includes(search.toLowerCase())
      );
  const nPages = Math.ceil(results.length / productsQT);

  const showProducts = results.slice(indexStart, indexEnd);

  return (
    <>
      <div class="max-w-sm mx-auto">
        <form>
          <div class="relative">
            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              value={search}
              type="search"
              id="default-search"
              class="block p-2 pl-8 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Buscar productos..."
              required
              onChange={searcher}
            />
          </div>
        </form>
      </div>

      {/* Cards de Productos */}
      <div className="w-4/4 p-4 flex flex-wrap">
        {showProducts.map((product, index) => (
          <CardProduct
            key={index}
            index={product.id}
            name={product.productName}
            price={product.productPrice}
          />
        ))}
      </div>
      {/* pagination */}
      <Pagination
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        nPages={nPages}
      />
    </>
  );
}
export default Product;
