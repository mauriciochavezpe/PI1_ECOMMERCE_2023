import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import OrderList from "../components/orderList";
import { getAllOrders, getOrderbyID,cancelOrder } from "../store/slice/sliceOrder";
import Spinner from "../components/layout/Spinner";

const Orders = () => {
  const dispatch = useDispatch();
  // Obtener la URL actual
  const { orders, order, loading, value } = useSelector(
    (state) => state.orderSlice
  );
  console.log("loading", value);

  useEffect(() => {
    dispatch(getAllOrders());
    
  }, [dispatch]);

  const handleShowDetail = (item) => {
    dispatch(getOrderbyID(item.id));

    console.log(order);
  };
  
  const handleCancelOrder = (item) => {
    dispatch(cancelOrder(item.id));

    console.log(order);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <OrderList orders={orders} handleShowDetail={handleShowDetail} handleCancelOrder={handleCancelOrder} />
      )}
    </>
  );
};

export default Orders;
