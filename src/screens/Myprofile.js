import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { updateMyuserData, updateMyUser, getMyUser } from "../store/slice/sliceUserLogin";
import Spinner from "../components/layout/Spinner";

const Myprofile = () => {
  const dispatch = useDispatch();
  // Obtener la URL actual
  const [edit, setEdit] = useState(true);
  const { userData, loading } = useSelector((state) => state.userLogin);
  const { departamento_list, tipodocumentos } = useSelector(
    (state) => state.utilSlice
  );


  useEffect(() => {
    // setProduct(obj.product);
    dispatch(getMyUser());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateMyuserData({ key: name, value }));
  };

  const actualizarDatos = (e) => {
    // e.preventDefault();
    let objTemp = {...userData};

    console.log(userData);
    delete objTemp.updatedAt;
    delete objTemp.createdAt;
    delete objTemp.group;
    delete objTemp.isDeactivated;
    delete objTemp.email;
    dispatch(updateMyUser(objTemp));
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Container>
          {/* <Form onSubmit={handleSubmit}> */}
          <Row>
            <Col sm={6}>
              <Form.Group controlId="name">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  disabled={edit}
                />
              </Form.Group>
              <Form.Group controlId="name">
                <Form.Label>Apellido Paterno</Form.Label>
                <Form.Control
                  type="text"
                  name="lastname"
                  value={userData.lastname}
                  onChange={handleChange}
                  disabled={edit}
                />
              </Form.Group>
              <Form.Group controlId="name">
                <Form.Label>Apellido Materno</Form.Label>
                <Form.Control
                  type="text"
                  name="motherLastname"
                  value={userData.motherLastname}
                  onChange={handleChange}
                  disabled={edit}
                />
              </Form.Group>
              <Form.Group controlId="name">
                <Form.Label>Documento</Form.Label>
                <Form.Control
                  type="text"
                  name="documentType"
                  value={userData.documentType}
                  onChange={handleChange}
                  disabled={edit}
                >
                     {tipodocumentos.map((e, i) => {
                    return (
                      <option key={i} value={e}>
                        {e}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="name">
                <Form.Label>Nro documento</Form.Label>
                <Form.Control
                  type="text"
                  name="documentId"
                  value={userData.documentId}
                  onChange={handleChange}
                  disabled={edit}
                />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group controlId="name">
                <Form.Label>Departamento</Form.Label>
                <Form.Control
                  type="text"
                  name="department"
                  value={userData.department}
                  onChange={handleChange}
                  disabled={edit}
                >
                  {departamento_list.map((e, i) => {
                    return (
                      <option key={i} value={e}>
                        {e}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="name">
                <Form.Label>Provincia</Form.Label>
                <Form.Control
                  type="text"
                  name="province"
                  value={userData.province}
                  onChange={handleChange}
                  disabled={edit}
                />
              </Form.Group>
              <Form.Group controlId="name">
                <Form.Label>Distrito</Form.Label>
                <Form.Control
                  type="text"
                  name="district"
                  value={userData.district}
                  onChange={handleChange}
                  disabled={edit}
                />
              </Form.Group>
              <Form.Group controlId="name">
                <Form.Label>dirección</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={userData.address}
                  onChange={handleChange}
                  disabled={edit}
                />
              </Form.Group>
              <Form.Group controlId="name">
                <Form.Label>Referencia</Form.Label>
                <Form.Control
                  type="text"
                  name="addressReference"
                  value={userData.addressReference}
                  onChange={handleChange}
                  disabled={edit}
                />
              </Form.Group>
            </Col>
          </Row>

          <Button
            variant="primary"
            onClick={() => {
              actualizarDatos();
            }}
          >
            Guardar
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setEdit(!edit);
            }}
          >
            {edit ? "Editar" : "Cancelar"}
          </Button>
          <Button
           className="ml-2"
            variant="danger"
            onClick={() => {
              setEdit(!edit);
            }}
          >
            Eliminar usuario
          </Button>
          {/* </Form> */}
        </Container>
      )}
    </>
  );
};

export default Myprofile;
