import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import Regoister from './pages/Regoister';
import Login from './pages/Login';
import PrivateRoute from './Routes/PrivateRoute';
import AdminRoutes from './Routes/AdminRoutes';
import AdminDashboard from './admin/AdminDashboard';
import CreateCategory from './admin/CreateBrand';
import User from './admin/AdminUser';
import UserDashboard from './user/UserDashboard';
import UserOrder from './user/UserOrder';
import UserProfile from './user/UserProfile';
import CreateCar from './admin/CreateCar';
import UpdateCar from './admin/UpdateCar';
import Cars from './admin/Cars';
import './main.css'
import CarView from './smallcomponents/CarView';
import Cart from './pages/Cart';

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/car/:slug' element={<CarView/>} />
          <Route path='/dashboard' element={<PrivateRoute/>}>
            <Route path='user' element={<UserDashboard/>} />
            <Route path='user/order' element={<UserOrder/>} />
            <Route path='user/profile' element={<UserProfile/>} />
          </Route>
          <Route path='/dashboard' element={<AdminRoutes/>}>
            <Route path='admin' element={<AdminDashboard/>} />
            <Route path='admin/create-category' element={<CreateCategory/>} />
            <Route path='admin/create-product' element={<CreateCar/>} />
            <Route path='admin/car/:slug' element={<UpdateCar/>} />
            <Route path='admin/cars' element={<Cars/>} />
            <Route path='admin/user' element={<User/>} />
          </Route>
          <Route path='/register' element={<Regoister/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/*' element={<NotFound/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
