import { Route, Routes } from 'react-router';
import { lazy } from 'react';
const MainPage = lazy(() => import("../MainPage/MainPage"))
const Login = lazy(() => import("../Login/Login"))
const Register = lazy(() => import("../Register/Register"))
const MainRouter = () => {
  return (
    <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/' element={<MainPage />}/>
    </Routes>
  )
}

export default MainRouter