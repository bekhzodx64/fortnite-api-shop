import { Routes, Route } from 'react-router-dom';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Home from './pages/home/home';
import SkinDetail from './components/skin-detail/skin-detail';
import Cart from './pages/cart/cart';
import AllSkins from './pages/all-skins/all-skins';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
	return (
		<div className='min-h-screen flex flex-col'>
			<ToastContainer
				limit={3}
				newestOnTop
				position='bottom-right'
				autoClose={2000}
			/>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/cart' element={<Cart />} />
				<Route path='/all-skins' element={<AllSkins />} />
				<Route path=':skinId' element={<SkinDetail />} />
			</Routes>
			<Footer />
		</div>
	);
};

export default App;
