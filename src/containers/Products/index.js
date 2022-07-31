import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "../../components/Layout";

/**
 * @author
 * @function Products
 **/

const Products = (props) => {
  return (
    <Layout sidebar>
      <h1>Products</h1>
    </Layout>
  );
};

export default Products;
