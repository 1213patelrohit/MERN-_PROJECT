import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("");
  const [company, setcompany] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  const getProductDetails = async () => {
    let result = await fetch(`http://localhost:5000/product/${params.id}`);
    result = await result.json();
    setname(result.name);
    setprice(result.price);
    setcategory(result.category);
    setcompany(result.company);
  };
  const updateProduct = async () => {
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: "PUT",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    navigate('/')
  };
  useEffect(() => {
    getProductDetails();
  }, []);

  return (
    <div className="Product">
      <h1>Update Product</h1>
      <input
        type="text"
        placeholder="Enter PRoduct"
        onChange={(e) => setname(e.target.value)}
        className="inputBox"
        value={name}
      />

      <input
        type="text"
        onChange={(e) => setprice(e.target.value)}
        placeholder="Enter price"
        className="inputBox"
        value={price}
      />
      <input
        type="text"
        onChange={(e) => setcategory(e.target.value)}
        placeholder="Enter category"
        className="inputBox"
        value={category}
      />

      <input
        type="text"
        placeholder="Enter company"
        onChange={(e) => setcompany(e.target.value)}
        className="inputBox"
        value={company}
      />

      <button onClick={updateProduct} className="signUpbutton" type="button">
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
