import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { ValuContext } from "../context/ValuContext";
import { api } from "../api/axiosConfig";

export const Confirmation = () => {
  const location = useLocation();
  const [purchaseData, setPurchaseData] = useState({});
  const [carrito, setCarrito] = useState({});
  const { usuario } = useContext(ValuContext);
  const [isApproved, setIsApproved] = useState(false)

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const data = {};

    queryParams.forEach((value, key) => {
      data[key] = decodeURIComponent(value);
    });

    setPurchaseData(data);
  }, [location.search]);

  useEffect(() => {
    if (!usuario) return;
    const fetchCarrito = async () => {
      try {
        const response = await api.get(`/carrito/get/${usuario.id}`, {});
        setCarrito(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCarrito();
  }, [usuario]);

  const calcularTotal = () => {
    if (!carrito) return 0;
    return carrito.items.reduce(
      (total, { cantidad, producto }) => total + cantidad * producto.precio,
      0
    );
  };

  useEffect(() => {
    setIsApproved(purchaseData.lapTransactionState === "APPROVED")
  }, [purchaseData.lapTransactionState]);

  useEffect(() => {
    if (!isApproved || !carrito) return;
    const deleteCart = async () => {
      try {
        const pedidoResponse = await api.post("/pedidos/create/", {
          usuario: usuario.id,
          total: calcularTotal(),
        });

        const { id: pedidoId } = pedidoResponse.data;
        const items = carrito.items;
        const itemsData = items.map((item) => ({
          pedido: pedidoId,
          producto: item.producto.id,
          cantidad: item.cantidad,
          precio: item.producto.precio * item.cantidad,
        }));
        await api.post("/detalles_pedido/create/", itemsData);
        await api.delete(`/items_carrito/delete/${usuario.id}/`);
      } catch (error) {
        console.error("Error al procesar el pedido:", error);
      }
    };

    if (isApproved) {
      deleteCart();
    }
  }, [isApproved, carrito]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 p-6">
      <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-2xl ">
        {isApproved ? (
          <FaCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        ) : (
          <FaTimesCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        )}
        <h1
          className={`text-3xl font-bold ${
            isApproved ? "text-pink-600" : "text-red-600"
          } mb-4`}
        >
          {isApproved ? "¡Compra Aprobada!" : "Compra Rechazada"}
        </h1>
        <p className="text-gray-700 mb-6">
          {isApproved
            ? "Gracias por tu compra. Estamos procesando tu pedido y lo recibirás pronto."
            : "Lamentablemente, tu compra no se pudo procesar. Por favor, intenta nuevamente o contacta con soporte."}
        </p>

        <div className="bg-pink-100 rounded-lg p-6 mb-4">
          <p className="text-lg font-semibold text-pink-600 mb-4">
            Detalles de la Transacción:
          </p>
          <table className="w-full text-left">
            <tbody>
              <tr>
                <td className="font-semibold text-pink-700 py-2">
                  Descripción:
                </td>
                <td className="text-gray-700">
                  {purchaseData.description || "N/A"}
                </td>
              </tr>
              <tr>
                <td className="font-semibold text-pink-700 py-2">
                  Valor Total:
                </td>
                <td className="text-gray-700">
                  {purchaseData.TX_VALUE} {purchaseData.currency || "N/A"}
                </td>
              </tr>
              <tr>
                <td className="font-semibold text-pink-700 py-2">
                  Código de Referencia:
                </td>
                <td className="text-gray-700">
                  {purchaseData.referenceCode || "N/A"}
                </td>
              </tr>
              <tr>
                <td className="font-semibold text-pink-700 py-2">
                  ID de Transacción:
                </td>
                <td className="text-gray-700">
                  {purchaseData.transactionId || "N/A"}
                </td>
              </tr>
              <tr>
                <td className="font-semibold text-pink-700 py-2">
                  Método de Pago:
                </td>
                <td className="text-gray-700">
                  {purchaseData.lapPaymentMethod || "N/A"}
                </td>
              </tr>
              <tr>
                <td className="font-semibold text-pink-700 py-2">Fecha:</td>
                <td className="text-gray-700">
                  {purchaseData.processingDate || "N/A"}
                </td>
              </tr>
              <tr>
                <td className="font-semibold text-pink-700 py-2">
                  Email del Comprador:
                </td>
                <td className="text-gray-700">
                  {purchaseData.buyerEmail || "N/A"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-gray-500 text-sm mb-6">
          {isApproved
            ? "Si tienes alguna pregunta, no dudes en contactarnos."
            : "Por favor, intenta realizar la compra nuevamente o contáctanos para recibir ayuda."}
        </p>

        <button
          onClick={() => (window.location.href = "/productos")}
          className="bg-pink-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-pink-600 transition duration-300"
        >
          Volver a Productos
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
