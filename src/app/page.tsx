'use client';

import Card from "@/components/Card";
import { Flex, Grid, Text, Box } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import type { IProduct } from "../../types";
import Paginator from "@/components/Paginator";
import Container from "@/components/blocks/Container";
import CategoryMenu from "@/components/CategoryMenu";
import { useQuery } from "react-query";

const PAGE_SIZE = 8;

async function fetchProducts(curPage: number, curCategory: string): Promise<any> {
	const url = `https://dummyjson.com/products${curCategory ? `/category/${curCategory}` : ''}?limit=${PAGE_SIZE}&skip=${PAGE_SIZE * curPage}`;
	const response = await axios.get(url);

	return response.data;
}

export default function Home() {
	const [curPage, setCurPage] = useState<number>(0);
	const [curCategory, setCurCategory] = useState<string>('');
	

	const { data: productsData, isLoading, isError } = useQuery(
		['products', curPage, curCategory],
		() => fetchProducts(curPage, curCategory),
		{
		  keepPreviousData: true,
		}
	);
	const pagesQuantity = productsData ? Math.ceil(productsData?.total / PAGE_SIZE) + 1 : 1;

	const handlePageChange = (page: number) => {
		setCurPage(page - 1);
	};

  	if (isError) return <div>Error occurred</div>;

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
				{isLoading ? (
					<Box>Loading...</Box>
				) : (
					productsData?.products?.length ? (productsData.products.map((product: IProduct) => (
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
					))) : (
						<Text as="span">Not found</Text>
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
