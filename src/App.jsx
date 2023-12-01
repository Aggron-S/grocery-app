import React from "react";
import { Routes, Route } from "react-router-dom";
// User defined imports
import { Header, Home, Product, About, CreateProduct } from "./imports";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/create-product" element={<CreateProduct />} />
        {/* Dynamic route for specific product based on its id on the database (product_id) */}
        <Route path="/products/:product_id" element={<Product />} />
      </Routes>
    </>
  );
};

export default App;
