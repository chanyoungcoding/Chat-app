import { Link } from "react-router-dom";
import styled from "styled-components";

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 10px;
  background-color: black;
  a {
    text-decoration: none;
    color: white;
    margin: 0 20px;
  }
`

const Navbar = () => {
  return (
    <NavbarContainer>
      <Link to="/">ChatApp</Link>
      <div>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </NavbarContainer>
  )
}

export default Navbar