import HttpException from './HttpException';

class addToCartException extends HttpException {
    constructor(error) {
        super(501, error);
    }
}

export default addToCartException;
