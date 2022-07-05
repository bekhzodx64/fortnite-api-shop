import { Routes, Route } from 'react-router-dom';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Home from './pages/home/home';
import AllSkins from './pages/all-skins/all-skins';
import SkinDetail from './components/skin-detail/skin-detail';

const App = () => {
	return (
		<div className='min-h-screen flex flex-col overflow-x-hidden'>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/all-skins' element={<AllSkins />} />
				<Route path=':skinId' element={<SkinDetail />} />
			</Routes>
			<Footer />
		</div>
	);
};

export default App;
