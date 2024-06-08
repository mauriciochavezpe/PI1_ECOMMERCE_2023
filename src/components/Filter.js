import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Row, Col, ListGroup, Form, Container, Button } from "react-bootstrap";
// import { listProducts } from "../actions/productActions";
import { getAllProducts } from "../store/slice/sliceProduct";

import { getMyUser } from "../store/slice/sliceUserLogin";

const FilterHome = () => {
  const dispatch = useDispatch();
  // const categoryList = useSelector((state) => state.categoryList); //sacado del store.js

  // var { loadingModal } = useSelector((state) => state.productSlice);
  // var { categories, marcas } = useSelector((state) => state.utilSlice);

  const [filter, setFilter] = useState({
    name: "",
    brand: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  const  categories=[
    "",
    "Periféricos",
    "Monitores",
    "Laptops",
    "Case (Cajas de PC)",
    "Mouse",
    "Teclados",
    "Procesadores (CPUs)",
    "Placas Base (Motherboards)",
    "Memoria RAM",
    "Almacenamiento",
    "Tarjetas Gráficas (GPUs)",
    "Fuentes de Alimentación (PSUs)",
    "Sistemas de Refrigeración",
    "Tarjetas de Expansión",
    "Accesorios y Cables",
    "Unidades Ópticas",
    "Software",
    "Redes",
    "Impresoras y Escáneres",
    "Componentes y Repuestos",
    "Almacenamiento Externo"
  ];
  const marcas=[
    "",
    "Intel",
    "AMD",
    "NVIDIA",
    "ASUS",
    "MSI",
    "Gigabyte",
    "Corsair",
    "G.SKILL",
    "Crucial",
    "Kingston",
    "Western Digital",
    "Seagate",
    "Samsung",
    "Cooler Master",
    "Thermaltake",
    "EVGA",
    "NZXT",
    "Logitech",
    "Razer",
    "HP",
    "Dell",
    "Acer",
    "Lenovo",
    "Apple",
    "Microsoft",
    "BenQ",
    "LG",
    "AOC",
    "Philips",
    "SteelSeries",
    "HyperX",
    "Toshiba",
    "ADATA",
    "Be Quiet!",
    "Noctua",
    "Fractal Design",
    "Rosewill",
    "Asrock",
    "Patriot",
    "Alienware",
    "Sapphire",
    "XFX",
    "Zotac",
    "PNY",
    "ViewSonic",
    "Roccat",
    "Mad Catz",
    "Redragon",
    "Cougar",
    "Thermaltake",
    "Biostar",
    "Lian Li",
    "SilverStone",
    "Enermax"
  ]

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const handleSubmit1 = (e) => {
    e.preventDefault();
    let arr = Object.keys(filter);
    let obj = {};
    arr.map((e) => {
      if (filter[e] != "") {
        obj[e] = filter[e];
      }
    });

    //añadimos un filtro como obj
    dispatch(getAllProducts(obj));
  };
  return (
    <>
      <h2>Filtros</h2>
      <Form onSubmit={handleSubmit1}>
        <Row className="dFalign">
          <Col>
            <Form.Group controlId="categoria">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={filter.category}
                // onChange={(e)=>handleInputChange(e)}
                onChange={handleInputChange}
              >
                {categories.map((e, i) => {
                  return (
                    <option key={i} value={e}>
                      {e}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="brand">
              <Form.Label>Marca</Form.Label>
              <Form.Control
                as="select"
                name="brand"
                value={filter.brand}

                  // onChange={(e)=>handleInputChange(e)}
                onChange={handleInputChange}>
                {/* Opciones de categoría */}
                {/* {categoryList.brands.map((e, i) => { */}

                {marcas.map((e, i) => {
                  return (
                    <option key={i} value={e}>
                      {e}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="name">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={filter.name}
                name="name"
                   // onChange={(e)=>handleInputChange(e)}
                   onChange={handleInputChange}
                placeholder="Nombre"
                defaultValue={filter.name}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="price">
              <Form.Label>Precio</Form.Label>
              <div className="d">
                <Form.Control
                  className="w-10"
                  type="number"
                  name="minPrice"
                  placeholder="min"
                  value={filter.minPrice}
                  // onChange={(e)=>handleInputChange(e)}
                  onChange={handleInputChange}

                />
                -
                <Form.Control
                  className="w-10"
                  type="number"
                  name="maxPrice"
                  placeholder="max"
                  value={filter.maxPrice}
                    // onChange={(e)=>handleInputChange(e)}
                    onChange={handleInputChange}

/>
              </div>
            </Form.Group>
          </Col>
          <Col className="h100">
            <Button className="bheight" variant="primary" type="submit">
              Aplicar
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default FilterHome;
