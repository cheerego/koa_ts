import {get,prefix} from '../Router';

@prefix('123')
class HomeController {
    @get('/456')
    public index(ctx: any) {
        ctx.body = 456;
    }
};



export {HomeController}