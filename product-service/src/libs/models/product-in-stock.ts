import { Product } from '@libs/models/product';

export class ProductInStock extends Product {
    public count: number;
    constructor(init?: ProductInStock) {
        super();
        this.initialize(init);
    }
}
