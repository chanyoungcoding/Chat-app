import { Link} from "react-router-dom";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { userData } from "../recoil/Auth";

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 10px;
  background-color: #212429;
  h1 {
    color: #97814D;
  }
  h2 {
    cursor: pointer;
  }
  a {
    text-decoration: none;
    color: white;
    margin: 0 20px;
  }
`

const Navbar = () => {
  const username = useRecoilValue(userData)[0]?.name

  const logoutUser = () => {
    localStorage.removeItem("user")
    window.location.href = "/login"
  }

  return (
    <NavbarContainer>
      <Link to="/">ChatApp</Link>
      <h1>Logged in as {username ?? "none"}</h1>
      <div>
        {username ? (
          <>
            <Link to="/login" onClick={logoutUser}>Logout</Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </NavbarContainer>
  )
}

export default Navbar