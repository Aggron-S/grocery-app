import React from "react";
import { Routes, Route } from "react-router-dom";
import { Header, Home, Product, About } from "./imports";
const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* Dynamic route for specific product based on its id on the database (product_id) */}
        <Route path="/products/:product-id" element={<Product />} />
      </Routes>
    </>
  );
};

export default App;
