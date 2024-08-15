export interface IProduct {
    id: string;
    brand: string;
    stock: number;
    description: string;
    images: string[];
    thumbnail: string;
    title: string;
    price: number;
};

export interface ICategory {
    slug: string;
    name: string;
    url: string;
};

export interface ISelectItem {
    label: string;
    value: string;
};