import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./component/nav";
import Footer from "./component/Footer";
import SignUp from "./component/SignUp";
import PrivateComponent from "./component/PrivateComponent";
import Login from "./component/Login";
import AddProduct from "./component/AddProduct";
import ProductList from "./component/ProductList"
import UpdateProduct from "./component/UpdateProduct";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route element={<PrivateComponent/>}>
          <Route path="/" element={<ProductList/>}/>
          <Route path="/addProduct" element={<AddProduct/>}/>
          <Route path="/update/:id" element={<UpdateProduct/>}/>
          <Route path="/Logout" element={<h1>Logout  Component</h1>}/>
          <Route path="/Profile" element={<h1>Profile  Component</h1>}/>
          </Route>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/login" element={<Login/>}/>
            
        </Routes>
      </BrowserRouter>
        <Footer/>
    </div>
  );
}

export default App;
