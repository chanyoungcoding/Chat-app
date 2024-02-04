import { Navigate, Route, Routes } from 'react-router-dom';

import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Common from './pages/Common';

function App() {

  return (
    <>
    <Routes>
      <Route element={<Common/>}>
        <Route path='/' element={<Chat/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/*' element={<Navigate to="/"/>}/>         
      </Route>
    </Routes>
    </>
  )
}

export default App
