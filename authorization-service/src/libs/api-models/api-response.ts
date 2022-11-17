import { Initializable } from '@libs/Initializable';

export class ApiResponse<T> extends Initializable<ApiResponse<T>> {
    public data: T;
}
