import { Routes, Route,Navigate } from 'react-router-dom';
import Chat from '../pages/Chat'
import Register from '../pages/Register'
import Login from '../pages/Login'
import PrivateRoute from '../hoc/private';
import PublicRoute from '../hoc/public';



const Routers = () => (
    <Routes>
        <Route  element={<PrivateRoute/>}>
            <Route path='/' element={<Chat/>}/>
        </Route > 
        <Route element={<PublicRoute/>}>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
        </Route>
        <Route path='*' element={<Navigate to='/'/>}/>
   </Routes>
)

export default Routers;