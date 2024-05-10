import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { addProduct, editProduct } from "../../Api/ManageProducts";
import { getIdProducts } from "../../Api/Products";
import { useParams } from "react-router-dom";

// Import additional API functions and components
import { getCategory } from "../../Api/ManageCategory";

// Define the FormProduct component
export function FormProduct() {
  // Retrieve user authentication state from Redux store
  const state = useSelector((state) => state.auth);
  const { user } = state;

  // Get URL parameters using React Router
  const params = useParams();

  // Initialize state variables using useState hooks
  const [message, setMessage] = useState("");
  const [dataForm, setDataForm] = useState({});
  const [productData, setProductData] = useState([{ productCategory: true }]);
  const [categorySelect, setCategorySelect] = useState("");
  const [category, setCategory] = useState({});
  const [stock, setStock] = useState(0);

  // useEffect hook to set the value of the option
  useEffect(() => {
    if (params.id) {
      if (productData[0].productCategory) {
        Object.keys(category).forEach((key) => {
          if (category[key].id === productData[0].productCategory) {
            setCategorySelect(category[key].id);
          }
        });
      }
    }
  }, [productData]);
  // useEffect hook to fetch category data from the API and update state
  useEffect(() => {
    getCategory()
      .then((response) => {
        setCategory(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // Fetch product data if an ID is provided in the URL params
    if (params.id) {
      getIdProducts(params.id)
        .then((response) => {
          setProductData(response.data);
          setStock(response.data[0].productStock);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  // see something
  const ver = () => {};

  // Event handler to update form data on input change
  const onChange = (e) => {
    const { name, value } = e.target;
    setDataForm({
      ...dataForm,
      [name]: value,
      productStatus: true,
    });
  };

  // Event handler to submit the form data
  const onSubmit = (e) => {
    e.preventDefault();
    setMessage("Enviando...");
    if (params.id) {
      console.log(params.id);
      const myElement = document.getElementById("formularioP");
      let f = new FormData(myElement);
      f.append("productStatus", true);
      f.append("id", params.id);
      const img = f.get("productImageUrl");
      if (img.name === "") {
        f.delete("productImageUrl");
      }
      editProduct(f)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          console.log(f.values);
        });
    } else {
      const myElement = document.getElementById("formularioP");
      let f = new FormData(myElement);
      f.append("productStatus", true);
      addProduct(f)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          setMessage(error.response.data);
        });
      console.log(f);
    }
  };
  // Event handler to update the selected category
  const handleCategoryChange = (e) => {
    setCategorySelect(e.target.value);
  };
  return (
    <>
      {/* Form for adding/editing product */}
      <form id="formularioP" onSubmit={onSubmit} encType="multipart/form-data">
        {/* Container for form fields */}
        <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-4">
          {/* Input field for product name */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Nombre *{/* Error message for invalid name input */}
              {message.productName && (
                <p className="text-red-500 text-xs font-semibold mt-2">
                  Introduce el nombre correctamente
                </p>
              )}
            </label>
            {/* Input field for product name */}
            <input
              defaultValue={productData[0] && productData[0].productName}
              minLength={3}
              maxLength={50}
              onChange={onChange}
              type="text"
              className="form-input px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              name="productName"
              placeholder="Nombre del producto"
            />
          </div>
          {/* Input field for product code */}
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Codigo *{/* Error message for invalid code input */}
              {message.productCode && (
                <p className="text-red-500 text-xs font-semibold mt-2">
                  Introduce el código correctamente
                </p>
              )}
            </label>
            {/* Input field for product code */}
            <input
              defaultValue={productData[0] && productData[0].productCode}
              minLength={3}
              maxLength={50}
              onChange={onChange}
              type="number"
              className="form-input px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              placeholder="Código del producto"
              name="productCode"
            />
          </div>
          {/* Input field for product description */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Descripción *{/* Error message for invalid description input */}
              {message.productDescription && (
                <p className="text-red-500 text-xs font-semibold mt-2">
                  Introduce la descripción correctamente
                </p>
              )}
            </label>
            {/* Input field for product description */}
            <input
              defaultValue={productData[0] && productData[0].productDescription}
              onChange={onChange}
              type="text"
              placeholder="Descripción del producto"
              className="form-input px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              name="productDescription"
            />
          </div>
          {/* Input field for product price */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Precio
              {/* Error message for invalid price input */}
              {message.productPrice && (
                <p className="text-red-500 text-xs font-semibold mt-2">
                  Introduce el precio correctamente
                </p>
              )}
            </label>
            {/* Input field for product price */}
            <input
              defaultValue={productData[0] && productData[0].productPrice}
              maxLength={20}
              onChange={onChange}
              min="0"
              type="number"
              placeholder="Precio del producto"
              className="form-input px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              name="productPrice"
            />
          </div>
          {/* Select field for product category */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Categoria
              {/* Error message for invalid category input */}
              {message.productCategory && (
                <p className="text-red-500 text-xs font-semibold mt-2">
                  Introduce la categoria correctamente
                </p>
              )}
            </label>
            {/* Dropdown select for product category */}
            <select
              value={categorySelect}
              name="productCategory"
              onChange={handleCategoryChange}
              className="form-select px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
            >
              {/* Default option for category selection */}
              <option value="" disabled={params.id ? true : false} hidden>
                Categoria del producto
              </option>
              {/* Iterate over categories to populate dropdown options */}
              {Object.keys(category).map((key) => {
                // Render active category option
                if (category[key].categoryStatus === true) {
                  return (
                    <option
                      key={category[key].id}
                      value={category[key].id}
                      className="bg-black border-black"
                    >
                      {category[key].categoryName}
                    </option>
                  );
                }
                // Render inactive category option
                else if (category[key].categoryStatus === false) {
                  return (
                    <option
                      key={category[key].id}
                      value={category[key].id}
                      className="bg-black border-black"
                    >
                      {category[key].categoryName} (Inactivo)
                    </option>
                  );
                }
                // Return null for categories with unknown status
                return null;
              })}
            </select>
          </div>
          {/* input number */}
          <div className="custom-number-input h-10 w-32 mb-6">
            <label
              htmlFor="custom-input-number"
              className="w-full text-gray-700 text-sm font-semibold"
            >
              En stock
            </label>
            {/* Error message for invalid category input */}
            {message.productStock && (
              <p className="text-red-500 text-xs font-semibold mt-2">
                Introduce el stock correctamente
              </p>
            )}
            <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setStock(stock > 0 ? stock - 1 : 0);
                }}
                className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
              >
                <span className="m-auto text-2xl font-thin">−</span>
              </button>
              <input
                type="text"
                className=" focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black md:text-base cursor-default flex items-center text-gray-700  outline-none"
                name="productStock"
                value={stock}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setStock(stock + 1);
                }}
                className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
              >
                <span className="m-auto text-2xl font-thin">+</span>
              </button>
            </div>
          </div>

          {/* Input field for product image */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Imagen del producto
              {/* Error message for file upload error */}
              {message.productImageUrl && (
                <p className="text-red-500 text-xs font-semibold mt-2">
                  Error al subir el archivo
                </p>
              )}
            </label>
            {/* Input field for product image */}
            <input
              onChange={onChange}
              type="file"
              accept="image/*"
              className="form-input px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              name="productImageUrl"
            />
          </div>
          {/* Submit button for form */}
          <div className="mt-5">
            <button
              type="submit"
              className="mt-3 bg-black text-white px-20 py-2 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {/* Display appropriate button text based on message state */}
              {message === "Enviando..." ? message : "Enviar"}
            </button>
            {/* Display success/error message based on message state */}
            {message === "Se han enviado los datos correctamente" && (
              <p className="text-green-500 text-xs font-semibold mt-2">
                {message}
              </p>
            )}
            {(message === "No se ha podido enviar, verifica los datos" ||
              message === "No has realizado ningun cambio") && (
              <p className="text-red-500 text-xs font-semibold mt-2">
                {message}
              </p>
            )}
          </div>
        </div>
      </form>
    </>
  );
}
