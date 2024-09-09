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
          <h1 className="text-4xl text-center p-10">Categorias</h1>
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
                  <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                    Estado
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
                      <div class="flex gap-2">
                        <span class="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                          {category.categoryStatus ? (
                            <>Activo</>
                          ) : (
                            <>Inactivo</>
                          )}
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
                          {category.categoryStatus ? (
                            <>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 18"
                                stroke-width="0.8"
                                stroke="currentColor"
                                class="h-7 w-7"
                                x-tooltip="tooltip"
                              >
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                              </svg>
                            </>
                          ) : (
                            <>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 18"
                                stroke-width="0.8"
                                stroke="currentColor"
                                class="h-7 w-8"
                                x-tooltip="tooltip"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"
                                />
                                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
                              </svg>
                            </>
                          )}
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
