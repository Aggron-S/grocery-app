import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [productFormData, setProductFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    product_image: null,
  });
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);

  // File Upload Handler
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProductFormData((prevData) => ({
      ...prevData,
      product_image: file,
    }));
  };

  // Handle text field changes
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setProductFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Create a Product
  const createProduct = async (e) => {
    e.preventDefault();
    setIsCreatingProduct(true);
    const formData = new FormData();
    formData.append("name", productFormData.name);
    formData.append("description", productFormData.description);
    formData.append("price", productFormData.price.toString());
    formData.append("stock", productFormData.stock.toString());
    formData.append("product_image", productFormData.product_image);
    try {
      const response = await axios.post(
        "http://localhost:8888/.netlify/functions/index/products",
        formData
      );
      console.log(response.data);
      // Go to Home Page
      navigate("/");
    } catch (error) {
      console.log(`Error creating product: ${error.message}`);
    } finally {
      setIsCreatingProduct(false);
    }
  };

  return (
    <>
      {!isCreatingProduct ? (
        <form encType="multipart/form-data" onSubmit={createProduct}>
          <div className="grid place-items-center h-[80vh]">
            <div className="flex flex-col gap-y-4">
              <div className="flex items-center">
                <label className="text-gray-700 text-md font-bold mr-2" htmlFor="name">
                  Product Name
                </label>
                <input
                  type="text"
                  className="bg-gray-100 outline-none"
                  placeholder="Product Name"
                  name="name"
                  required={true}
                  maxLength={20} // 20 characters only
                  onChange={handleTextChange}
                />
              </div>
              <div className="flex items-center">
                <label className="text-gray-700 text-md font-bold mr-2" htmlFor="description">
                  Description
                </label>
                <input
                  type="text"
                  className="bg-gray-100 outline-none"
                  placeholder="Description"
                  name="description"
                  required={true}
                  maxLength={35} // 35 characters only
                  onChange={handleTextChange}
                />
              </div>
              <div className="flex items-center">
                <label className="text-gray-700 text-md font-bold mr-2" htmlFor="price">
                  Price
                </label>
                <input
                  type="number"
                  className="bg-gray-100 outline-none"
                  placeholder="Price"
                  name="price"
                  required={true}
                  min={1}
                  max={100000000} // 100 million
                  onChange={handleTextChange}
                />
              </div>
              <div className="flex items-center">
                <label className="text-gray-700 text-md font-bold mr-2" htmlFor="stock">
                  Stock
                </label>
                <input
                  type="number"
                  className="bg-gray-100 outline-none"
                  placeholder="Stock"
                  name="stock"
                  required={true}
                  min={1}
                  max={100000000} // 100 million
                  onChange={handleTextChange}
                />
              </div>
              <div className="flex items-center">
                <label className="text-gray-700 text-md font-bold mr-2" htmlFor="product_image">
                  Product Image
                </label>
                <input
                  type="file"
                  className=""
                  name="product_image"
                  accept="image/png, image/jpeg"
                  required={true}
                  onChange={handleFileChange}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="py-2 px-4 bg-green-600 hover:bg-green-800 text-slate-200 rounded-lg shadow-md"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="flex flex-col justify-center items-center h-[80vh]">
          Creating Product...
        </div>
      )}
    </>
  );
};

export default CreateProduct;
