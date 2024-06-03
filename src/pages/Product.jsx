import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { EditText } from 'react-edit-text';
import 'react-edit-text/dist/index.css';

const Product = () => {
  const [product, setProduct] = useState({
    product_id: "",
    name: "",
    description: "",
    price: "",
    stock: 0,
    image_url: "",
  });
  // Temporary Product Data (while changes isn't saved. idk if it's the best way to do it but it's just for now)
  // const [tempProductData, setTempProductData] = useState({
  //   product_id: "",
  //   name: "",
  //   description: "",
  //   price: "",
  //   stock: "",
  //   image_url: "",
  // });

  const [hasData, setHasData] = useState(false);
  const [isDeleteProduct, setIsDeleteProduct] = useState(false);
  // const [isFieldReadOnly, setisFieldReadOnly] = useState(true);
  // Current Product
  const location = useLocation();
  const product_id = location.pathname.split("/").pop();

  // Navigate to Pages
  const navigate = useNavigate()

  // Get Product
  const getProduct = async () => {
    const axiosInstance = axios.create({
      // baseURL: "http://localhost:3001",
      baseURL: "https://grocery-app-express-app.netlify.app/.netlify/functions/index",
      method: "GET",
    });
    const productData = [];

    try {
      const response = await axiosInstance(`/products/${product_id}`);
      console.log(response.data);
      productData.push(...response.data);

      // Add Product to the product state
      // I think these setters are the reason why it doubles the console log thing in the browser, maybe it triggers the useEffect again since a state has changed, find a way to fix it to avoid unnecessary rendering. same as in the Home.jsx
      setProduct(productData[0]);
      // setTempProductData(productData[0]);
      setHasData(true);
    } catch (error) {
      console.log(`Error fetching data: ${error.message}`);
      setHasData(false);
    }
  };

  // Handle text field changes
  const handleTextChange = e => {
    const { name, value } = e.target;
     // 20 characters only (for name)
     if (name === "name" && value.length > 20) {
      return;
    }
    // 35 characters only (for description) 
    else if (name === "description" && value.length > 35) {
      return;
    }
    // 0 min value (price)
    if(name === "price" && +value < 0) {
      return;
    }
    // 100 million (price max value)
    if ((name === "price") && +value > 1000000000) {
      return;
    }
    setProduct(prevValue => ({
      ...prevValue,
      [name]: value,
    }));
  };

  // Handle text field saving changes
  // const handleTextSave = (fieldName, value) => {
  //   setTempProductData(prevValue => ({
  //     ...prevValue,
  //     [fieldName]: value,
  //   }));
  // };

  // Update Product Info
  // const updateProduct = async () => {
  //   if(!isFieldReadOnly) {
  //     // If user cancelled the update
  //     setisFieldReadOnly(true); 
  //     // Fix later, the product info must revert back to changes whenever user pressed the cancel button instead of reloading the page
  //     // setProduct(product);
  //   } else {
  //     // Identify modified fields
  //     const modifiedFields = Object.keys(tempProductData).filter(
  //       key => tempProductData[key] !== product[key]
  //     );
  
  //     // Update the Product Data via Temporary Product Data
  //     setProduct(tempProductData);
  
  //     // Create FormData with only modified fields
  //     const formData = new FormData();
  //     modifiedFields.forEach(fieldName => {
  //       formData.append(fieldName, product[fieldName]);
  //     });
  
  //     try {
  //       const response = await axios.put(
  //         `https://grocery-app-express-app.netlify.app/.netlify/functions/index/products/${product_id}`,
  //         formData
  //       );
  //       console.log(response.data);
  //       // Fields will be Read Only after Saving Data to the database
  //       setisFieldReadOnly(true);
  //     } catch (error) {
  //       console.log(`Error fetching data: ${error.message}`);
  //     }
  //   }
  // };

  // Update Product Info
  const updateProduct = async (fieldName) => {
    const formData = new FormData();
    formData.append(fieldName, product[fieldName]);

    try {
      const response = await axios.put(
        `https://grocery-app-express-app.netlify.app/.netlify/functions/index/products/${product_id}`,
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.log(`Error fetching data: ${error.message}`);
    }
  };

  // Delete the Product (must go to Home page after product deletion)
  const deleteProduct = async () => {
    setIsDeleteProduct(true);
    try {
      const response = await axios.delete(
        `https://grocery-app-express-app.netlify.app/.netlify/functions/index/products/${product_id}`
      );
      console.log(response.data);
      // Go to Home Page
      navigate("/");
    } catch (error) {
      console.log(`Error fetching data: ${error.message}`);
    }
  };

  // Pre-fetch the Specific Product
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      {hasData ? (
        <>
          {/* Delete Button */}
          <div className="flex justify-end items-center px-4 pt-3 gap-4">
            {/* <button type="button" className="p-3 bg-red-500 hover:bg-red-700 text-slate-200 rounded-lg shadow-md" onClick={deleteProduct}>Delete Product</button> */}
            <button type="button" className="p-3 bg-red-500 hover:bg-red-700 text-slate-200 rounded-lg shadow-md" disabled={true}>Delete Product</button>
          </div>
          
          {!isDeleteProduct ? (
            <>
              {/* Product Content */}
              {/* <button type="button" className="" onClick={() => setisFieldReadOnly(false)}>Edit</button> */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 mt-10 mx-10 mb-9 items-center" key={product.product_id}>
                <div className="bg-cover bg-center min-h-[380px] min-w-[300px] rounded-sm" style={{backgroundImage: `url('${product.image_url}')`}}></div>

                <div className="flex flex-col ml-3 text-xl" >
                  <EditText 
                    value={product.name}
                    name="name"
                    className="font-bold text-3xl mt-3"
                    // readonly={isFieldReadOnly}
                    onChange={handleTextChange}  
                    // onSave={({ name, value }) => handleTextSave(name, value)}
                    onSave={({ name }) => updateProduct(name)}
                  />
                  <EditText 
                    value={product.description}
                    name="description"
                    // readonly={isFieldReadOnly}
                    onChange={handleTextChange}  
                    // onSave={({ name, value }) => handleTextSave(name, value)}
                    onSave={({ name }) => updateProduct(name)}
                  />
                  <div className="flex flex-row items-center">
                    <div className="font-bold">$</div>
                    <EditText 
                      value={`${product.price}`}
                      name="price"
                      type="number"
                      className="font-bold"
                      // readonly={isFieldReadOnly}
                      onChange={handleTextChange}  
                      // onSave={({ name, value }) => handleTextSave(name, value)}
                      onSave={({ name }) => updateProduct(name)}
                    />
                  </div>
                  <EditText 
                    value={`${product.stock.toString()} left`}
                    name="stock"
                    type="number"
                    className={`mb-4 font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}
                    readonly={true}
                  />
                </div>
              </div>
    
              {/* Show the Cancel & Save Button */}
              {/* {!isFieldReadOnly && (
                <div className="">
                  <button type="button" className="" onClick={updateProduct}>Cancel</button>
                  <button type="button" className="" onClick={updateProduct}>Save</button>
                </div>
              )} */}
            </>
          ) : (
            <div className="flex flex-col justify-center items-center h-[60vh]">
              Deleting Product...
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col justify-center items-center h-[80vh]">
          Product not Found
        </div>
      )}
    </>
  );
};

export default Product;
