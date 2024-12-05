import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <div>
      <img className="logo" src="https://marketplace.canva.com/EAFvDRwEHHg/1/0/1600w/canva-colorful-abstract-online-shop-free-logo-cpI8ixEpis8.jpg"/>
      {auth ? (
        <ul className=" nav-ul">
          <li><Link to="/">Product</Link></li>
          <li><Link to="/addProduct">Add Product</Link></li>
          <li><Link to="/Profile">Profile</Link></li>
          <li><Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</Link></li>
        </ul>
      ) : ( 
        <ul className=" nav-ul nav-right">
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default NavBar;
