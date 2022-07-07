import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Footer from '../footer/footer';
import Header from '../header/header';

const Layout = () => {
	return (
		<Fragment>
			<ToastContainer
				limit={3}
				newestOnTop
				position='bottom-right'
				autoClose={2000}
			/>
			<Header />
			<Outlet />
			<Footer />
		</Fragment>
	);
};

export default Layout;
