import { useEffect, useState } from "react";
import { getAllDeliveryData, updateDelivery } from "../Api/Delivery"; // Importamos desde la carpeta API

export function DeliveryAdmin() {
  const [deliveryData, setDeliveryData] = useState([]); // Datos originales
  const [filteredData, setFilteredData] = useState([]); // Datos filtrados
  const [editing, setEditing] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [filterPaymentStatus, setFilterPaymentStatus] = useState(false); // Estado del checkbox para paymentStatus
  const [filterDeliveryStatus, setFilterDeliveryStatus] = useState(false); // Estado del checkbox para deliveryStatus
  const [nameFilter, setNameFilter] = useState(""); // Estado del filtro por nombre

  // Cargar los datos al iniciar el componente
  useEffect(() => {
    getAllDeliveryData()
      .then((response) => {
        setDeliveryData(response.data); // Guardamos todos los datos
        setFilteredData(response.data); // También los guardamos en el estado filtrado inicialmente
      })
      .catch((error) => {
        console.log("Error al cargar los datos de entregas:", error);
      });
  }, []);

  // Función que filtra los datos según los checkboxes y el nombre
  const handleFilter = (newPaymentStatus, newDeliveryStatus, nameFilter) => {
    let filtered = deliveryData;

    if (newPaymentStatus) {
      filtered = filtered.filter(
        (delivery) => delivery.paymentStatus === "true"
      );
    }
    if (newDeliveryStatus) {
      filtered = filtered.filter(
        (delivery) => delivery.deliveryStatus === "Por enviar"
      );
    }
    if (nameFilter) {
      filtered = filtered.filter((delivery) =>
        delivery.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    setFilteredData(filtered); // Actualizamos los datos filtrados
  };

  // Manejar cambios en el checkbox de paymentStatus
  const handlePaymentStatusChange = () => {
    const newStatus = !filterPaymentStatus;
    setFilterPaymentStatus(newStatus); // Actualiza el estado del checkbox
    handleFilter(newStatus, filterDeliveryStatus, nameFilter); // Llama a la función de filtrado con el nuevo valor
  };

  // Manejar cambios en el checkbox de deliveryStatus
  const handleDeliveryStatusChange = () => {
    const newStatus = !filterDeliveryStatus;
    setFilterDeliveryStatus(newStatus); // Actualiza el estado del checkbox
    handleFilter(filterPaymentStatus, newStatus, nameFilter); // Llama a la función de filtrado con el nuevo valor
  };

  // Manejar cambios en el filtro de nombre
  const handleNameFilterChange = (event) => {
    const newNameFilter = event.target.value;
    setNameFilter(newNameFilter);
    handleFilter(filterPaymentStatus, filterDeliveryStatus, newNameFilter); // Llama a la función de filtrado con el nuevo valor
  };

  const handleEdit = (delivery) => {
    setEditing(delivery);
    setNewStatus(delivery.deliveryStatus);
  };

  const handleSave = () => {
    if (editing) {
      updateDelivery({
        idUser: editing.idUser,
        idPedido: editing.transaction,
        statusDelivery: newStatus,
        address: editing.address,
      })
        .then((response) => {
          setDeliveryData(
            deliveryData.map((d) => (d.id === editing.id ? response.data : d))
          );
          setEditing(null);
          setNewStatus("");
        })
        .catch((error) => {
          console.error("Error al actualizar el estado de la entrega:", error);
        });
    }
  };

  return (
    <div>
      <h1 className="text-4xl text-center p-10">Administrar Entregas</h1>

      {/* Checkboxes para el filtrado */}
      <div className="flex justify-center space-x-5 mb-5">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="form-checkbox"
            checked={filterPaymentStatus}
            onChange={handlePaymentStatusChange} // Llama a la función de cambio
          />
          <span className="ml-2">Pagos Confirmados</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="form-checkbox"
            checked={filterDeliveryStatus}
            onChange={handleDeliveryStatusChange} // Llama a la función de cambio
          />
          <span className="ml-2">Por Enviar</span>
        </label>
      </div>

      {/* Input para el filtro por nombre */}
      <div className="flex justify-center mb-5">
        <input
          value={nameFilter}
          type="search"
          id="default-search"
          className="block p-2 pl-8  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Buscar por nombre..."
          required
          onChange={handleNameFilterChange}
        />
      </div>

      <div className="forTable overflow-x-auto max-w-full">
        <table className="min-w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4">Descripción</th>
              <th className="px-6 py-4">Monto</th>
              <th className="px-6 py-4">Tipo de Documento</th>
              <th className="px-6 py-4">Número de Documento</th>
              <th className="px-6 py-4">Teléfono</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Nombre</th>
              <th className="px-6 py-4">Dirección</th>
              <th className="px-6 py-4">Transacción</th>
              <th className="px-6 py-4">Estado del Pago</th>
              <th className="px-6 py-4">Estado de Entrega</th>
              <th className="px-6 py-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((delivery) => (
              <tr key={delivery.id}>
                <td className="px-6 py-4">{delivery.descript}</td>
                <td className="px-6 py-4">{delivery.amount}</td>
                <td className="px-6 py-4">{delivery.doctype}</td>
                <td className="px-6 py-4">{delivery.docNumber}</td>
                <td className="px-6 py-4">{delivery.phone}</td>
                <td className="px-6 py-4">{delivery.email}</td>
                <td className="px-6 py-4">{delivery.name}</td>
                <td className="px-6 py-4">{delivery.address}</td>
                <td className="px-6 py-4">{delivery.transaction}</td>
                <td className="px-6 py-4">
                  {delivery.paymentStatus === "true"
                    ? "Confirmado"
                    : delivery.paymentStatus}
                </td>
                <td className="px-6 py-4">
                  {editing?.id === delivery.id ? (
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="border p-1 rounded"
                    >
                      <option value="Por enviar">Por enviar</option>
                      <option value="Enviado">Entregado</option>
                      <option value="Entregado">Entregado</option>
                    </select>
                  ) : (
                    delivery.deliveryStatus
                  )}
                </td>
                <td className="px-6 py-4">
                  {editing?.id === delivery.id ? (
                    <div>
                      <button onClick={handleSave} className="text-blue-600">
                        Guardar
                      </button>
                      <button
                        onClick={() => setEditing(null)}
                        className="text-red-600"
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEdit(delivery)}
                      className="text-blue-600"
                    >
                      Editar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
