import { Initializable } from '@libs/Initializable';

export class Product extends Initializable<Product>{
    public title: string;
    public price: number;
    public description: string;
}
