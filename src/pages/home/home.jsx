import { useSelector } from 'react-redux';
import SkinCard from '../../components/skin-card/skin-card';

const Home = () => {
	const { skins, isLoading } = useSelector((state) => state.skin);

	return (
		<div className='container my-auto'>
			<h2 className='text-center py-5 font-bold text-2xl uppercase'>
				новые скины
			</h2>

			<div className='grid grid-cols-5 place-items-center gap-10 py-5'>
				{isLoading ? (
					<span>Loading...</span>
				) : (
					skins
						.filter((_, index) => index < 5)
						.map((skin) => <SkinCard key={skin.mainId} skin={skin} />)
				)}
			</div>
		</div>
	);
};

export default Home;
