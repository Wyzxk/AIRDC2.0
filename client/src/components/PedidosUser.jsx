import { useEffect, useState } from "react";
import { getIdDeliveryData, updateDelivery } from "../Api/Delivery";
import { useSelector } from "react-redux";

export function PedidosUser() {
  const [deliveryData, setDeliveryData] = useState([]);
  const [message, setMessage] = useState(null);
  const [editing, setEditing] = useState(null);
  const [newAddress, setNewAddress] = useState("");
  const [status, setStatus] = useState("");

  const state = useSelector((state) => state.auth);
  const { user } = state;

  useEffect(() => {
    if (user.id) {
      getIdDeliveryData(user.id)
        .then((response) => {
          setDeliveryData(response.data);
        })
        .catch((error) => {
          console.log(error);
          setMessage("Error al cargar los pedidos");
        });
    }
  }, [user.id]);

  const handleEdit = (delivery) => {
    if (delivery.deliveryStatus === "Por enviar") {
      setEditing(delivery);
      setNewAddress(delivery.address);
    }
  };

  const handleSave = () => {
    alert(editing.transaction);
    if (editing) {
      updateDelivery({
        idUser: editing.idUser,
        idPedido: editing.transaction,
        address: newAddress,
      })
        .then((response) => {
          setDeliveryData(
            deliveryData.map((d) => (d.id === editing.id ? response.data : d))
          );
          setEditing(null);
          setNewAddress("");
          setStatus("");
        })
        .catch((error) => {
          console.log(error);
          setMessage("Error al actualizar el pedido");
        });
    }
  };

  return (
    <>
      <h1 className="text-4xl text-center p-10">Mis Pedidos</h1>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 overflow-x-auto">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 font-medium text-gray-900">
                Descripción
              </th>
              <th className="px-6 py-4 font-medium text-gray-900">Monto</th>
              <th className="px-6 py-4 font-medium text-gray-900">
                Estado del Envío
              </th>
              <th className="px-6 py-4 font-medium text-gray-900">Dirección</th>
              <th className="px-6 py-4 font-medium text-gray-900"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {deliveryData.length > 0 ? (
              deliveryData
                .filter((delivery) => delivery.deliveryStatus) // Filtra por estado del envío
                .map((delivery) => (
                  <tr className="hover:bg-gray-50" key={delivery.id}>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-700">
                        {delivery.descript}
                      </div>
                    </td>
                    <td className="px-6 py-4">{delivery.amount}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold text-gray-600">
                        {delivery.deliveryStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {editing?.id === delivery.id ? (
                        delivery.deliveryStatus === "Por enviar" ? (
                          <input
                            type="text"
                            value={newAddress}
                            onChange={(e) => setNewAddress(e.target.value)}
                            className="border p-1 rounded"
                          />
                        ) : (
                          delivery.address
                        )
                      ) : (
                        delivery.address
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-4">
                        {editing?.id === delivery.id ? (
                          <>
                            <button
                              onClick={handleSave}
                              className="text-blue-600"
                            >
                              Guardar
                            </button>
                            <button
                              onClick={() => setEditing(null)}
                              className="text-red-600"
                            >
                              Cancelar
                            </button>
                          </>
                        ) : (
                          <>
                            <a
                              href="#"
                              onClick={() => handleEdit(delivery)}
                              className={
                                delivery.deliveryStatus === "Por enviar"
                                  ? ""
                                  : "cursor-not-allowed opacity-50"
                              }
                            >
                              Editar
                            </a>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center px-6 py-4">
                  No hay pedidos disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
