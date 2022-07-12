import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { store } from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter basename='/fortnite-api-shop'>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>
);
