import React from "react";
import axios from "axios";
import { useEffect } from "react";

const Home = () => {
  // Fix this if possible na isang instance lang, then magbabago yung method and other axios header config options, pero i think it will work as initiating http requests per user interaction unlike websocket protocol so maybe tama ito?
  // Get Products
  const getProducts = async () => {
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

  // Create a Product
  const createProduct = async () => {
    const axiosInstance = axios.create({
      baseURL: "http://localhost:3001",
      method: "POST",
      // Other Axios configuration options
    });
    try {
      const response = await axiosInstance("/products");
      console.log(response.data);
    } catch (error) {
      console.log(`Error fetching data: ${error.statusText}`);
    }
  }

  // Pre-fetch the Products from my express server
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-[80vh]">
      <div>This is Home Page</div>
    </div>
  );
};

export default Home;
