import React from "react";
import axios from "axios";
import { useEffect } from "react";

const Product = () => {
  // Fix this, only specific product should be returned
  const getProduct = async () => {
    const axiosInstance = axios.create({
      baseURL: "http://localhost:3001",
      method: "GET",
      // Other Axios configuration options
    });
    try {
      const response = await axiosInstance("/products");
      console.log(response.data);
    } catch (error) {
      console.log(`Error fetching data: ${error.statusText}`);
    }
  };

  // Update Product Info
  const updateProduct = async () => {
    const axiosInstance = axios.create({
      baseURL: "http://localhost:3001",
      method: "PUT",
      // Other Axios configuration options
    });
    try {
      const response = await axiosInstance("/products");
      console.log(response.data);
    } catch (error) {
      console.log(`Error fetching data: ${error.statusText}`);
    }
  }

  // Delete the Product (must go to Home page after product deletion)
  const deleteProduct = async () => {
    const axiosInstance = axios.create({
      baseURL: "http://localhost:3001",
      method: "DELETE",
      // Other Axios configuration options
    });
    try {
      const response = await axiosInstance("/products");
      console.log(response.data);
    } catch (error) {
      console.log(`Error fetching data: ${error.statusText}`);
    }
  }

  // Pre-fetch the Specific Product
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-[80vh]">
      <div>This is Specific Product Page</div>
      <button onClick={updateProduct}>Update Product Data</button>
      <button onClick={deleteProduct}>Delete Product Data</button>
    </div>
  );
};

export default Product;
