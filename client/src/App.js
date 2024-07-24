import './App.css';
import Footer from './Home/Footer';
import HomeMain from './Home/HomeMain';
import Navbar from './Home/Navbar';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import AdminRoutes from './Routes/AdminRoutes';
import AdminDashboard from './admin/AdminDashboard';
import CreateCar from './admin/CreateCar';
import UpdateCar from './admin/UpdateCar';
import Cars from './admin/Cars';
import AdminOrders from './admin/AdminOrders';
import CreateBrands from './admin/CreateBrands';
import BrandsList from './admin/BrandsList';
import Brands from './Home/Brands';
import About from './Home/About';
import PrivateRoute from './Routes/PrivateRoute';
import UserDashboard from './common/UserDashboard';
import UserOrder from './common/UserOrder';
import UserProfile from './common/UserProfile';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import CarsFilterpage from './Home/CarsFilterpage';
import CarView from './pages/CarView';
import { Toaster } from 'react-hot-toast';
import CarInBrand from './pages/CarInBrand';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
      <Route path='/' element={<HomeMain />} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/brands' element={<Brands />} />
      <Route path='/about' element={<About />} />
      <Route path='/cars' element={<CarsFilterpage />} />
      <Route path='/car/:slug' element={<CarView/>} />
      <Route path='/brand/:slug' element={<CarInBrand/>} />
      <Route path='/*' element={<NotFound/>} />
      <Route path='/dashboard' element={<AdminRoutes/>}>
            <Route path='admin' element={<AdminDashboard/>} />
            <Route path='admin/allbrands' element={<BrandsList/>} />
            <Route path='admin/cars' element={<Cars/>} />
            <Route path='admin/create-brand' element={<CreateBrands/>} />
            <Route path='admin/create-product' element={<CreateCar/>} />
            <Route path='admin/car/:slug' element={<UpdateCar/>} />
            <Route path='admin/userorders' element={<AdminOrders/>} />
      </Route>
      <Route path='/dashboard' element={<PrivateRoute/>}>
            <Route path='user' element={<UserDashboard/>} />
            <Route path='user/order' element={<UserOrder/>} />
            <Route path='user/profile' element={<UserProfile/>} />
      </Route>
      </Routes>
      <Toaster containerStyle={{zIndex:'9999999'}} reverseOrder={true}/>
      <Footer/>
    </Router>
  );
}

export default App;
