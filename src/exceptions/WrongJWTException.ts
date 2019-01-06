import HttpException from './HttpException';

class WrongJWTException extends HttpException {
    constructor() {
        super(401, 'Wrong authentication token');
    }
}

export default WrongJWTException;
