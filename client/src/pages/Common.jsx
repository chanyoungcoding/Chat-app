import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

const Common = () => {
  return (
    <>
      <Navbar/>
      <div className="container">
        <Outlet/>
      </div>
    </>
  )
}

export default Common