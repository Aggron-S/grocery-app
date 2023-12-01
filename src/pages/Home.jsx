import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [hasData, setHasData] = useState(false);
  const [isDeleteAllProducts, setIsDeleteAllProducts] = useState(false);

  // Get Products
  const getProducts = async () => {
    const axiosInstance = axios.create({
      // baseURL: "http://localhost:3001",
      baseURL: "https://grocery-app-express-app.netlify.app/.netlify/functions/index",
      method: "GET",
      // Other Axios configuration options
    });
    const productsData = [];

    try {
      const response = await axiosInstance("/products");
      console.log(response.data);
      productsData.push(...response.data);

      // Add Products to the products state
      setProducts(productsData);
    } catch (error) {
      console.log(`Error fetching data: ${error.message}`);
      setProducts([]);
      setHasData(false);
    }
  };

   // Delete All Products
   const deleteProducts = async () => {
    setIsDeleteAllProducts(true);
    try {
      const response = await axios.delete(
        "https://grocery-app-express-app.netlify.app/.netlify/functions/index/products"
      );
      console.log(response.data);
    } catch (error) {
      console.log(`Error fetching data: ${error.message}`);
    } finally {
      setIsDeleteAllProducts(false);
      setProducts([]); // Clear products
      setHasData(false);
      getProducts(); // Fetch products again
    }
  };

  // Pre-fetch the Products from my express server
  useEffect(() => {
    getProducts();
  }, []);

  // Watch for changes in the products state
  useEffect(() => {
    // Check if products array is not empty
    setHasData(products.length > 0);
  }, [products]);


  return (
    <>
      {/* Create / Delete Product  */}
      <div className="flex justify-end items-center px-4 pt-3 gap-4">
        <Link to={"/create-product"} className={`p-3 bg-green-600 hover:bg-green-800 text-slate-200 rounded-lg shadow-md`}>Add Product</Link>
        <button type="button" className={`p-3 bg-red-500 hover:bg-red-700 text-slate-200 rounded-lg shadow-md ${hasData === false ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={hasData === false} onClick={deleteProducts}>Delete All Products</button>
      </div>
      {products.length > 0 ? (
        <>

          {!isDeleteAllProducts ? (
            <>
              {/* Products Content */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center mt-7">
                {products.map(productInfo => (
                  <div className="mb-10 border border-gray-300 shadow-md" key={productInfo.product_id}>
                    <Link to={`/products/${productInfo.product_id}`}>
                      <div className="bg-cover bg-center min-h-[150px] min-w-[300px] rounded-sm" style={{backgroundImage: `url('${productInfo.image_url}')`}}></div>
                      
                      {/* Product Info */}
                      <div className="flex flex-col gap-y-3 ml-3">
                        <div className="font-bold text-xl mt-3">{productInfo.name}</div>
                        <div>{productInfo.description}</div>
                        <div className="font-bold">${productInfo.price}</div>
                        <div className={`mb-4 font-semibold ${productInfo.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                          {productInfo.stock} left
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col justify-center items-center h-[60vh]">
              Deleting All Products...
            </div>
          )}
        </>
      ) : (hasData ? (
        <div className="flex flex-col justify-center items-center h-[80vh]">
          Loading...
        </div>
      ) : (
        <div className={`flex flex-col justify-center items-center h-[60vh]`}>
          No Products Available
        </div>
      ))}
    </>
  );
};

export default Home;
