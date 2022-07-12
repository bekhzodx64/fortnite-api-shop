import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import SkinCard from '../../components/skin-card/skin-card';
import Loader from '../../components/templates/loader';

const AllSkins = () => {
	const { skins, isLoading } = useSelector((state) => state.skin);

	const [currentItems, setCurrentItems] = useState([]);
	const [pageCount, setPageCount] = useState(0);
	const [itemOffset, setItemOffset] = useState(0);
	const itemsPerPage = 30;

	useEffect(() => {
		const endOffset = itemOffset + itemsPerPage;
		setCurrentItems(skins.slice(itemOffset, endOffset));
		setPageCount(Math.ceil(skins.length / itemsPerPage));
	}, [itemOffset, itemsPerPage, skins]);

	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % skins.length;
		setItemOffset(newOffset);
	};

	return (
		<div className='container'>
			<h2 className='text-center py-5 font-bold text-2xl uppercase'>
				все скины
			</h2>
			{isLoading ? (
				<Loader />
			) : (
				<div className='grid grid-cols-5 place-items-center gap-10 py-5'>
					{currentItems.map((skin) => (
						<SkinCard key={skin.id} skin={skin} />
					))}
				</div>
			)}

			<ReactPaginate
				breakLabel='...'
				nextLabel='След стр.'
				onPageChange={handlePageClick}
				pageRangeDisplayed={3}
				pageCount={pageCount}
				previousLabel='Пред стр.'
				renderOnZeroPageCount={null}
				containerClassName='pagination'
				pageLinkClassName='pagination-num'
				previousLinkClassName='pagination-nav'
				nextLinkClassName='pagination-nav'
				activeLinkClassName='pagination-active'
				disabledClassName='pagination-disabled'
				eventListener={window.scrollTo(0, 0)}
				breakClassName='pagination-num'
			/>
		</div>
	);

	// return (
	// 	<div className='container'>
	// 		<h2 className='text-center py-5 font-bold text-2xl uppercase'>
	// 			все скины
	// 		</h2>

	// 		{isLoading ? (
	// 			<Loader />
	// 		) : (
	// 			<div className='grid grid-cols-5 place-items-center gap-10 py-5'>
	// 				{skins
	// 					.filter((_, index) => index < 5)
	// 					.map((skin) => (
	// 						<SkinCard key={skin.id} skin={skin} />
	// 					))}
	// 			</div>
	// 		)}
	// 	</div>
	// );
};

export default AllSkins;
