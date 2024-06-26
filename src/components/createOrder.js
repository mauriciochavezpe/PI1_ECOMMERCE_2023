import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import {
  changeQuanty,
  createOrder,
  createPreference,
} from "../store/slice/sliceOrder";
const urlpublic = process.env.REACT_APP_API_MERCADO_PAGO_PUBLIC_KEY;

const OrderCreate = () => {
  initMercadoPago(urlpublic, {
    locale: "es-PE",
  });

  const { orderItemsSelected, preference, preferenceId } = useSelector(
    (state) => state.orderSlice
  );

  const [valueId, setValueId] = useState(
    "1860116897-40b0a1b8-d11b-409f-9ae6-586daee177c0"
  );
  // const [formData, setFormData] = useState({
  //   name: "Raul Penilla",
  //   email: "rpenilla00@gmail.com",
  //   address: "av. lima - Magdalena",
  //   paymentMethod: "Credit card",
  // });
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };
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
    let arrItems = [];

    // let objProd = orderItemsSelected.map((e) => ({
    //   id: e.id,
    //   quantity: e.qtySelect,
    //   subTotal: e.price,
    // }));

    // let totalPrice = orderItemsSelected
    //   .reduce((total, item) => total + item.qtySelect * item.price, 0)
    //   .toFixed(2);

    // let objPay = {
    //   totalPrice: Number(totalPrice),
    //   products: [...objProd],
    // };
    orderItemsSelected.map((e) => {
      arrItems.push({
        title: e.name,
        quantity: e.qtySelect,
        unitPrice: e.price,
        // currency_id: "PEN",
      });
    });

    let obj2 = { items: arrItems };
    console.log(obj2);

    // dispatch(createOrder(objPay));

    dispatch(createPreference(obj2));
  };

  useEffect(() => {
    // dispatch(listProducts());
  }, [preferenceId]);

  return (
    <>
      <Container>
        <Row className="justify-content-center mt-3">
          <Col md={3} className="p-2">
            <h2 className="mb-4">Crear Orden</h2>
            <Form onSubmit={handleSubmit} className="order-form">
              <Form.Control
                type="text"
                value={valueId}
                onChange={(e) => setValueId(e.target.value)}
              />
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
              {preferenceId && (
                <Wallet
                  initialization={{
                    preferenceId: preferenceId,
                  }}
                  customization={{ texts: { valueProp: "smart_option" } }}
                />
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default OrderCreate;
