import { Initializable } from '@libs/Initializable';

export class Product extends Initializable<Product>{
    public id: string;
    public title: string;
    public price: number;
    public description: string;
}
