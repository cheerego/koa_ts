import * as Koa from 'koa';
import * as path from 'path';
import * as Router from 'koa-router';

const app: Koa = new Koa();

Object.assign(app, {}, {
    get HTTP_PATH(): string {

        return path.resolve(__dirname);
    },

    get CONTROLLER_PATH(): string {
        return path.resolve(this.HTTP_PATH, 'Controller');
    },
    get GET_PATH(): string {
        return path.resolve(this.HTTP_PATH, '..');
    }

});


const _: Router = new Router();

export {app, _};

