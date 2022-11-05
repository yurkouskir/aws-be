export interface ProductPostBody {
    product: Product;
}

interface Product {
    id: string;
    title: string;
    price: number;
    description: string;
    count: number;
}
