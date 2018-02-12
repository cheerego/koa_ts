import * as Koa from "koa";

import {_} from '../Http/Kernel';
import * as fs from 'fs';
import * as util from 'util';
import * as Router from "koa-router";

export default class Server {
    private port: number;
    private app: Koa;
    private count: number;


    public constructor(app: Koa, port: number) {
        this.port = port;
        this.app = app;
        this.count = 0;
    }

    public start() {


        this.registerRoutes(this.router);
        this.app.listen(this.port, () => {
            console.log(`Server process: ${process.pid} listen on port ${this.port}`);
        });

        this.app.on("error", (e) => console.log(`SEVERE ERROR: ${e.message}`));
    }

    get router():Router {
        const readdir = util.promisify(fs.readdir);
        (async () => {
            (await readdir((this.app as any).CONTROLLER_PATH))
                .filter((item) => item.endsWith('.js'))
                .forEach(item => {
                    require(`${(this.app as any).CONTROLLER_PATH}/${item}`);
                })
            ;
        })();
        _.get('/123', (ctx: Koa.BaseContext) => {
            ctx.body = 123;
        });
        return _;
    }

    public registerRoutes(_:Router) {
        this.app.use(_.routes());
        this.app.use(_.allowedMethods());
    }


}
