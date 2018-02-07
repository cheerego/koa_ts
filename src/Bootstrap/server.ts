import * as Koa from "koa";
import * as Router from "koa-router";

export default class Server {
    private port: number;
    private app: Koa;
    private router: Router;
    private count: number;


    public constructor(port: number) {
        this.port = port;
        this.app = new Koa();
        this.router = new Router();
        this.count = 0;
    }

    public start() {
        this.router.get("/", async (ctx, next) => {
            this.count++;
            ctx.body = `This is server process : ${process.pid} and count: ${this.count}`;
            ctx.status = 200;
            await next();
        });

        this.router.get("/stop", async (ctx, next) => {
            console.log(`Stopping server process : ${process.pid}`);
            process.exit(1);
            await next();
        });


        this.app.use(this.router.routes());
        this.app.use(this.router.allowedMethods());

        const server = this.app.listen(this.port, () => {
            console.log(`Server process: ${process.pid} listen on port ${this.port}`);
        });

        this.app.on("error", (e) => console.log(`SEVERE ERROR: ${e.message}`) );
    }
}
