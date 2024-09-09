import { changeCategory } from "../reducers/auth";
import { useSelector, useDispatch } from "react-redux";
import { getCategoryAct } from "../Api/ManageCategory";
import { useState, useEffect } from "react";

function Select() {
  const [categoryData, setCategoryData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    getCategoryAct(true)
      .then((response) => {
        setCategoryData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const ver = () => {
    console.log(categoryData);
  };
  return (
    <>
      <div className="container">
        <div className="flex justify-center p-4">
          <h1 className="text-xl text-black">Categorias</h1>
        </div>
        <div className="flex justify-center">
          <div className="bg-gray-200 shadow-xl rounded-lg md:w-3/4 p-4">
            {" "}
            {/* Ajuste de tamaño de contenedor */}
            <ul className="divide-y divide-gray-300">
              {categoryData.map((category) => (
                <>
                  <li
                    className="p-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      dispatch(changeCategory(category.id));
                    }}
                  >
                    {category.categoryName}
                  </li>{" "}
                </>
              ))}
              <li
                className="p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => {
                  dispatch(changeCategory(null));
                }}
              >
                Ver todo
              </li>{" "}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Select;
