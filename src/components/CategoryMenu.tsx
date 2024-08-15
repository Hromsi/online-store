'use client';

import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { ICategory, ISelectItem } from '../../types';
import axios from 'axios';
import { FormControl, FormLabel, FormControlProps } from '@chakra-ui/react';

export default function CategoryMenu({ 
    setCurCategory, 
    setCurPage, 
    ...props 
}: { 
    setCurCategory: (newValue: string) => void;
    setCurPage: (newValue: number) => void;
} & FormControlProps) {
	const [categoryOptions, setCategoryOptions] = useState<ISelectItem[]>([]);

    const fetchCategories = () => {
		const url = `https://dummyjson.com/products/categories`;

		axios.get(url)
			.then(function (response) {
                const dataCategoryOptions = response.data.map((it: ICategory) => ({ label: it.name, value: it.slug }));
				setCategoryOptions(dataCategoryOptions);
        });
	}

    useEffect(() => {
		fetchCategories();
	}, []);

    return (
        <FormControl {...props}>
            <FormLabel>Change category</FormLabel>
            <Select 
                options={categoryOptions}
                onChange={(event) => {
                    setCurCategory(event?.value ?? '');
                    setCurPage(0);
                }}
            />
        </FormControl>
    );
} 