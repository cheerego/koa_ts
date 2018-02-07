import * as cluster from "cluster";
import {ServerRun} from "./server";

import {cpus} from "os";

const numCPUs = cpus().length;

if (cluster.isMaster) {
    console.log(`This machine has ${numCPUs} CPUs.`);
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on("online", (worker) => {
        console.log(`Worker ${worker.process.pid} is online`);
    });

    cluster.on("exit", (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died with code: ${code} and signal: ${signal}`);
        console.log("Starting a new worker...");
        cluster.fork();
    });

} else {
    const app = new ServerRun(3002);
    app.start();
}