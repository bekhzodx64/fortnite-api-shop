import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

const NotFound = () => {
	return (
		<div className='container mt-auto space-y-5'>
			<h1 className='text-center text-3xl'>Страница не найдено</h1>
			<div className='flex justify-center'>
				<Link to='/' className='flex items-center space-x-2 text-gray-500'>
					<BsArrowLeft className='text-xl'/>
					<span>Вернуться на главную</span>
				</Link>
			</div>
		</div>
	);
};

export default NotFound;
