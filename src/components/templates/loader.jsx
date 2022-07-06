import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Loader = () => {
	return (
		<div className='flex flex-col items-center space-y-3'>
			<div className='-translate-x-1'>
				<AiOutlineLoading3Quarters className='text-3xl animate-spin text-blue-600' />
			</div>
			<h2>Загрузка...</h2>
		</div>
	);
};

export default Loader;
