import { Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import SkinDetail from './components/skin-detail/skin-detail';
import Layout from './components/templates/layout';
import AllSkins from './pages/all-skins/all-skins';
import Cart from './pages/cart/cart';
import Home from './pages/home/home';
import NotFound from './pages/not-found/not-found';

const App = () => {
	return (
		<div className='min-h-screen flex flex-col'>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Home />} />
					<Route path='all-products' element={<AllSkins />} />
					<Route path='all-products/:id' element={<SkinDetail />} />
					<Route path='cart' element={<Cart />} />
					<Route path='*' element={<NotFound />} />
				</Route>
			</Routes>
		</div>
	);
};

export default App;
