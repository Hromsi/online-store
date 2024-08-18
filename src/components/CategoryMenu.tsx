'use client';

import React, { useId } from 'react'
import Select from 'react-select'
import { ICategory, ISelectItem } from '../../types';
import axios from 'axios';
import { FormControl, FormLabel, FormControlProps } from '@chakra-ui/react';
import { useQuery } from 'react-query';

async function fetchCategories() {
    const response = await axios.get(`https://dummyjson.com/products/categories`);
    const dataCategoryOptions: ISelectItem[] = response.data.map((it: ICategory) => ({ label: it.name, value: it.slug }));

    return dataCategoryOptions;
}

export default function CategoryMenu({ 
    setCurCategory, 
    setCurPage, 
    ...props 
}: { 
    setCurCategory: (newValue: string) => void;
    setCurPage: (newValue: number) => void;
} & FormControlProps) {

    const { data: categoryOptions, isLoading } = useQuery(
		['categories'],
		() => fetchCategories(),
	);

    return (
        <FormControl {...props}>
            <FormLabel>Change category</FormLabel>
            <Select 
                instanceId={useId()}
                isLoading={isLoading}
                options={categoryOptions}
                onChange={(event) => {
                    setCurCategory(event?.value ?? '');
                    setCurPage(0);
                }}
            />
        </FormControl>
    );
} 