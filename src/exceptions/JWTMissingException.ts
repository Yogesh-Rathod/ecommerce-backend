import HttpException from './HttpException';

class JWTMissingException extends HttpException {
    constructor() {
        super(401, 'Authentication token missing');
    }
}

export default JWTMissingException;
