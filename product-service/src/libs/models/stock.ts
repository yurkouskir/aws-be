import { Initializable } from '@libs/Initializable';

export class Stock extends Initializable<Stock> {
    public id: string;
    public count: number;
}
