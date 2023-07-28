import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  const handleLogout = () => {
    localStorage.removeItem("user");
    // navigate("/login");
  };

  return (
    <header>
      <div className="container">
        <Link>NOTE TAKER</Link>

        <nav>
          {user?.token ? (
            <>
              <Link to="/mynotes">My notes</Link>
              <Link>{user?.user?.fullname}</Link>
              <Link to="/login" onClick={handleLogout}>
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
