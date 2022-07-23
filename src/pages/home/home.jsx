import { useSelector } from 'react-redux'
import SkinCard from '../../components/skin-card/skin-card'
import Loader from '../../components/templates/loader'

const Home = () => {
	const { skins, isLoading } = useSelector((state) => state.skin)

	return (
		<div className='container'>
			<h2 className='text-center py-5 font-bold text-2xl uppercase'>
				новые скины
			</h2>

			{isLoading ? (
				<Loader />
			) : (
				<div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  place-items-center gap-10 py-5'>
					{skins
						.filter((_, index) => index < 5)
						.map((skin) => (
							<SkinCard key={skin.id} skin={skin} />
						))}
				</div>
			)}
		</div>
	)
}

export default Home
