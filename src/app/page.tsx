'use client';

import Card from "@/components/Card";
import { Flex, Grid } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import type { IProduct } from "../../types";
import Paginator from "@/components/Paginator";
import Container from "@/components/blocks/Container";
import CategoryMenu from "@/components/CategoryMenu";

const PAGE_SIZE = 8;

export default function Home() {
	const [products, setProducts] = useState<IProduct[]>([]);
	const [curPage, setCurPage] = useState<number>(0);
	const [pagesQuantity, setPagesQuantity] = useState(1);
	const [curCategory, setCurCategory] = useState<string>('');

	const handlePageChange = (page: number) => {
		setCurPage(page);
	};

	const fetchProducts = () => {
		const url = `https://dummyjson.com/products${curCategory ? `/category/${curCategory}` : ''}?limit=${PAGE_SIZE}&skip=${PAGE_SIZE * curPage}`;

		axios.get(url)
			.then(function (response) {
				const { products: dataProducts, total } = response.data;
				setProducts(dataProducts);
				setPagesQuantity(Math.ceil(total / PAGE_SIZE));
				console.log('response :>> ', response.data);
		});
	}

	useEffect(() => {
		fetchProducts();
	}, [curPage, curCategory, pagesQuantity]);

	return (
	<main>
		<Container pt={10} pb={10}>
			<CategoryMenu 
				maxW={['100%', '300px']}
				mb={8}
				setCurCategory={setCurCategory}
				setCurPage={setCurPage}
			/>
			<Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']} gap="25px" mb="25px">
				{products.map((product) => (
					<Card 
						key={product.id}
						id={product.id}
						brand={product.brand}
						stock={product.stock}
						description={product.description}
						images={product.images}
						thumbnail={product.thumbnail}
						title={product.title}
						price={product.price}
					/>
				))}
			</Grid>
			<Flex justifyContent="center" mb="25px">
				<Paginator
					pagesQuantity={pagesQuantity}
					handlePageChange={handlePageChange}
				/>
			</Flex>
		</Container>
	</main>
	);
}
