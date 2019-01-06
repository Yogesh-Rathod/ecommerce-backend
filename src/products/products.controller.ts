import * as exp from 'express';
import * as fs from 'fs';
import * as util from 'util';

import Controller from '../interfaces/controller.interface';
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
    }

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
