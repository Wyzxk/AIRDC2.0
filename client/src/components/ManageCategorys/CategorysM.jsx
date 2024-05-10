import { useNavigate, useParams } from "react-router-dom";
import { getCategory, deleteCategory } from "../../Api/ManageCategory";
import { useEffect, useState } from "react";
export function CategorysM() {
  const [categoryData, setCategoryData] = useState([]);
  const [message, setMessage] = useState(null);

  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getCategory()
      .then((response) => {
        setCategoryData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      {params.id ? (
        <h1>{params.id}</h1>
      ) : (
        <>
          <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 overflow-x-auto">
            <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                    Nombre categoria
                  </th>

                  <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                    Descripción categoria
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-4 font-medium text-gray-900"
                  ></th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 border-t border-gray-100">
                {categoryData.map((category) => (
                  <tr class="hover:bg-gray-50">
                    <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
                      <div class="text-sm">
                        <div class="font-medium text-gray-700">
                          {category.categoryName}
                        </div>
                      </div>
                    </th>

                    <td class="px-6 py-4">
                      <div class="flex gap-2">
                        <span class="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                          {category.categoryDescription}
                        </span>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex justify-end gap-4">
                        <a
                          x-data="{ tooltip: 'Delete' }"
                          href="#"
                          onClick={() => {
                            let data = { id: category.id };
                            deleteCategory(data)
                              .then(() => {
                                window.location.reload();
                              })
                              .catch((error) => {
                                console.log(error);
                              });
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="h-6 w-6"
                            x-tooltip="tooltip"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </a>
                        <a
                          x-data="{ tooltip: 'Edite' }"
                          href="#"
                          onClick={() => {
                            navigate(`/manageproducts/${category.id}`);
                            localStorage.setItem("page", "formCategory");
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="h-6 w-6"
                            x-tooltip="tooltip"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                            />
                          </svg>
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}
