import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Form, Container, Button } from "react-bootstrap";
import Product from "../components/Product";
import { getAllProducts, addProduct,changeLoadingModal } from "../store/slice/sliceProduct";
import  Modal from "../components/Modal";
import TodoModal from "../components/TodoModal";
import Spinner from "../components/layout/Spinner";
import ProductCarousel from "../components/ProductCarousel";
import FilterHome from "../components/Filter";
import { oauth2 } from "../util/oAuth";


const HomeScreen = ({  history }) => {
  const dispatch = useDispatch();
  const { loading, loadingModal, products, error } = useSelector(
    (state) => state.productSlice
  );
 const { isLogin,userData } = useSelector((state) => state.userLogin);

 

  const onToggle = (id) => {
    dispatch(changeLoadingModal(id));

  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <>
      <ListGroup>
        <ProductCarousel />
      </ListGroup>
      <Container>
        <Row>
          <FilterHome></FilterHome>
        </Row>
      </Container>

      {loading ? (
        <Spinner />
      ) : error ? (
        <Spinner />
      ) : (
        <>
          <Container>
            <Row>
              {products.length > 0 ? (
                products.map((product) => (
                  <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                    <Product
                      product={product}
                      onToggle={()=>{onToggle(product.id)}}
                      isOpen={loadingModal}
                    />
                  </Col>
                ))
              ) : (
                <>
                  <h3 className="mr-3">
                    <span
                      style={{ color: "#AAAAAA" }}
                      className="link"
                      onClick={() => history.push("/")}
                    ></span>
                  </h3>
                </>
              )}
            </Row>
          </Container>
          {loadingModal && (
            <Modal>
              <TodoModal onToggle={onToggle} isOpen={loadingModal} ></TodoModal>
            </Modal>
          )}
          
        </>
      )}
    </>
  );
};

export default HomeScreen;
