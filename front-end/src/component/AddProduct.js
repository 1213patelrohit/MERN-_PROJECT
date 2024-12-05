import React, { useState } from "react";

const AddProduct = () => {
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("");
  const [company, setcompany] = useState("");
  const [error, seterror] = useState("");

  const addproduct = async () => {
    if (!name || !price || !category || !company) {
      seterror(true);
      return false;
    }
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:5000/add-product", {
      method: "POST",
      body: JSON.stringify({
        name,
        price,
        category,
        company,
        userId,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    result = await result.json();
  };
  return (
    <div className="Product">
      <h1>Add Product</h1>
      <input
        type="text"
        placeholder="Enter PRoduct"
        onChange={(e) => setname(e.target.value)}
        className="inputBox"
        value={name}
      />
      {error && !name && <span className="invalidinput">Enter Valid name</span>}

      <input
        type="text"
        onChange={(e) => setprice(e.target.value)}
        placeholder="Enter price"
        className="inputBox"
        value={price}
      />
         {error && !price && <span className="invalidinput">Enter Valid name</span>}
      <input
        type="text"
        onChange={(e) => setcategory(e.target.value)}
        placeholder="Enter category"
        className="inputBox"
        value={category}
      />
         {error && !category && <span className="invalidinput">Enter Valid name</span>}
      <input
        type="text"
        placeholder="Enter company"
        onChange={(e) => setcompany(e.target.value)}
        className="inputBox"
        value={company}
      />
         {error && !company && <span className="invalidinput">Enter Valid name</span>}
      <button onClick={addproduct} className="signUpbutton" type="button">
        AddProduct
      </button>
    </div>
  );
};

export default AddProduct;
