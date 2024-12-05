import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    let result = await fetch("http://localhost:5000/products",{
      headers:{
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
      }
    });
    result = await result.json();
    console.log(result);
    setProduct(result);
  };
  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "Delete",
    });
    result = await result.json();
    if (result) {
      getProduct();
    }
  };
  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`,{
        headers:{
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
        }
      });
      result = await result.json();
      if (result) {
        setProduct(result);
      }
    } else {
      getProduct();
    }
  };

  return (
    <>
      <div className="product-List">
        <h3>ProductList</h3>
        <input
          type="text"
          placeholder="Search"
          className="search-product-box"
          onChange={searchHandle}
        />
        <ul>
          <li>S.No</li>
          <li> Name</li>
          <li>Price</li>
          <li> Category</li>
          <li> Company</li>
          <li> Opration</li>
        </ul>
        {product.length> 0 ? product.map((item, index) => (
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li> {item.name}</li>
            <li>₹{item.price}</li>
            <li> {item.category}</li>
            <li>{item.company}</li>
            <li>
              <button onClick={() => deleteProduct(item._id)}>Delete</button>
              <button>
                <Link to={"/update/" + item._id}>Update</Link>
              </button>
            </li>
          </ul>
        )):
        <h1>No Record Found</h1>}
      </div>
    </>
  );
};

export default ProductList;
