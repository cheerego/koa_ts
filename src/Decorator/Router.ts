/**
 * Created by placeless on 17/3/21.
 */

import * as route  from 'koa-router';

interface Config{
    prefix:string
}

class Router {
    public config:Config
    constructor() {
        this.config = {prefix:''};
    }


}
export default new Router;