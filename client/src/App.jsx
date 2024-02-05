import { Navigate, Route, Routes } from 'react-router-dom';


import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Common from './pages/Common';
import { useRecoilValue } from 'recoil';
import { userData } from './recoil/Auth';

function App() {
  const user = useRecoilValue(userData)[0]?.name;
  return (
    <>
    <Routes>
      <Route element={<Common/>}>
        <Route path='/' element={ user ? <Chat/> : <Login/>}/>
        <Route path='/login' element={ user ? <Chat/> : <Login/>}/>
        <Route path='/register' element={ user ? <Chat/> : <Register/>}/>
        <Route path='/*' element={<Navigate to="/"/>}/>         
      </Route>
    </Routes>
    </>
  )
}

export default App
