import * as exp from 'express';
import * as fs from 'fs';
import * as util from 'util';
import * as jwt from 'jsonwebtoken';

import Controller from '../interfaces/controller.interface';
import CartDto from './cart.dto';
import validationMiddleware from '../middlewares/validation.middleware';
import DataInToken from 'interfaces/dataInToken';
import query from '../utils/database';
import addToCartException from '../exceptions/addToCartException';
import authMiddleware from '../middlewares/auth.middleware';

const readFile = util.promisify(fs.readFile);

class ProductsController implements Controller {
    public path = '/products';
    public router = exp.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/getBanners`, this.getBanners);
        this.router.get(`${this.path}/getCategories`, this.getCategories);
        this.router.get(`${this.path}/getRecents`, this.getRecents);
        this.router.get(`${this.path}/getTop20`, this.getTop20);
        this.router.post(
            `${this.path}/cart`,
            authMiddleware,
            validationMiddleware(CartDto),
            this.addToCart
        );
    }

    private addToCart = async (
        req: exp.Request,
        res: exp.Response,
        next: exp.NextFunction
    ) => {
        const cartData: CartDto = req.body,
            headers: any = req.headers,
            secret = process.env.JWT_SECRET;
        try {
            const verificationResponse = jwt.verify(
                headers.authorization,
                secret
            ) as DataInToken;
            if (verificationResponse.id) {
                const queryString = `UPDATE users SET cartinfo=jsonb_set(cartinfo, '{cartItems}', $1, TRUE) WHERE id='${
                        verificationResponse.id
                    }' RETURNING cartinfo`,
                    values = [JSON.stringify(cartData)],
                    { rows } = await query(queryString, values);
                res.status(200).send(rows);
            } else {
                next(new addToCartException('User not found!'));
            }
        } catch (error) {
            next(new addToCartException(error));
        }
    };

    private getBanners = async (req: exp.Request, res: exp.Response) => {
        const banners = await readFile(`${__dirname}/jsonData/banners.json`);
        res.send(banners);
    };

    private getCategories = async (req: exp.Request, res: exp.Response) => {
        const categories = await readFile(
            `${__dirname}/jsonData/categories.json`
        );
        res.send(categories);
    };

    private getRecents = async (req: exp.Request, res: exp.Response) => {
        const recents = await readFile(`${__dirname}/jsonData/recents.json`);
        res.send(recents);
    };

    private getTop20 = async (req: exp.Request, res: exp.Response) => {
        const top20 = await readFile(`${__dirname}/jsonData/top20.json`);
        res.send(top20);
    };
}

export default ProductsController;
