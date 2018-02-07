import Server from './Bootstrap/server';
import app from './Http/Kernel';

const server = new Server(app, 3000);
server.start();

