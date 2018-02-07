import * as Koa from "koa";

export default class Server {
    private port: number;
    private app: Koa;
    private count: number;


    public constructor(port: number) {
        this.port = port;
        this.app = new Koa();
        this.count = 0;
    }

    public start() {


        this.registerRoutes(this.router);
        this.app.listen(this.port, () => {
            console.log(`Server process: ${process.pid} listen on port ${this.port}`);
        });

        this.app.on("error", (e) => console.log(`SEVERE ERROR: ${e.message}`) );
    }


    public registerRoutes(router: any) {
        this.app.use(router.routes());
        this.app.use(router.allowedMethods());
    }

    get router() {
        return 12;
    }
}
