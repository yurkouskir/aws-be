export class ApiError extends Error {
    public statusCode: number;
    public error?: any;

    constructor(error, message: string = '', statusCode: number = 400) {
        super(message);
        this.statusCode = statusCode;
        this.error = error;
    }
}
