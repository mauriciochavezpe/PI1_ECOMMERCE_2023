import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import { changeQuanty, createOrder } from "../store/slice/sliceOrder";
const urlpublic = process.env.REACT_APP_API_MERCADO_PAGO_PUBLIC_KEY;
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
const formatterPay = () => {
  console.log("dasdadasda");
};

const OrderCreate = () => {
  initMercadoPago(urlpublic, {
    locale: "es-PE",
  });

  const { orderItemsSelected } = useSelector((state) => state.orderSlice);

  const [formData, setFormData] = useState({
    name: "Raul Penilla",
    email: "rpenilla00@gmail.com",
    address: "av. lima - Magdalena",
    paymentMethod: "Credit card",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const dispatch = useDispatch();
  // Obtener la URL actual

  const handleQuantityChange = (productId, e) => {
    const { value } = e.target;
    // Aquí puedes manejar el cambio de cantidad del producto en el carrito
    console.log(`Cambiando cantidad del producto ${productId} a ${value}`);
    dispatch(changeQuanty({ productId, quantity: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let objProd = orderItemsSelected.map((e) => ({
      id: e.id,
      quantity: e.qtySelect,
      subTotal: e.price,
    }));
    let totalPrice = orderItemsSelected
      .reduce((total, item) => total + item.qtySelect * item.price, 0)
      .toFixed(2);
    let objPay = {
      totalPrice: Number(totalPrice),
      products: [...objProd],
    };
    dispatch(createOrder(objPay));
  };
  return (
    <>
      <Container>
        <Row className="justify-content-center mt-3">
          <Col md={3} className="p-2">
            <h2 className="mb-4">Crear Orden</h2>
            <Form onSubmit={handleSubmit} className="order-form">
              <Table striped bordered className="product-table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItemsSelected.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>
                        <Form.Control
                          type="number"
                          value={item.qtySelect}
                          onChange={(e) => handleQuantityChange(item.id, e)}
                          min={1}
                        />
                      </td>
                      <td>{item.price}</td>
                      <td>{(item.qtySelect * item.price).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="text-right mb-3">
                <strong>Total a Pagar:</strong>{" "}
                {orderItemsSelected
                  .reduce(
                    (total, item) => total + item.qtySelect * item.price,
                    0
                  )
                  .toFixed(2)}
              </div>
              <Button variant="primary" type="submit" className="submit-btn">
                Crear Orden
              </Button>
              <Wallet
                initialization={{
                  preferenceId:
                    "1860116897-40b0a1b8-d11b-409f-9ae6-586daee177c0",
                }}
                customization={{ texts: { valueProp: "smart_option" } }}
              />
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default OrderCreate;
