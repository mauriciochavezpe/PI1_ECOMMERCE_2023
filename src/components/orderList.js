import React from "react";
import { Table, Badge, Button } from "react-bootstrap";

const formatDate = (dateString) => {
  const date = new Date(dateString);

  date.setHours(date.getHours() - 5);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

const formatterBadge = (sText) => {
  let obj = {
    pending: "secondary",
    canceled: "danger",
    // "pending":"primary",
  };
  return obj[sText] || "primary";
};
const OrderList = ({ orders, handleShowDetail, handleCancelOrder }) => {
  return (
    <div>
      <h3>Lista de Órdenes</h3>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Estado</th>
            <th>Email</th>
            <th>Total</th>
            <th>Estado de Pago</th>
            <th>Fecha de Creación</th>
            <th>Fecha de Actualización</th>
            <th>acciones </th>
          </tr>
        </thead>
        <tbody>
          {
          orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>
                <Badge bg={formatterBadge(order.status)}>{order.status}</Badge>
              </td>
              <td>{order.email}</td>
              <td>S/. {order.totalPrice}</td>
              <td>{order.paymentStatus}</td>
              <td>{formatDate(order.createdAt)}</td>
              <td>{formatDate(order.updatedAt)}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => handleShowDetail(order)}
                >
                  Ver Detalle
                </Button>
                {order.status == "pending" && (
                  <Button
                    variant="danger"
                    onClick={() => handleCancelOrder(order)}
                  >
                    Cancelar
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default OrderList;
