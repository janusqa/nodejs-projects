export class CustomAPIError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

const createCustomAPIError = (msg, statusCode) =>
    new CustomAPIError(msg, statusCode);

export default createCustomAPIError;
