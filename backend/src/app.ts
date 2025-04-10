import express from 'express';
import { createServer, Server } from 'http';
import { Server as Io } from 'socket.io';
import routes from './routes';
import cors from 'cors';



class App {
    public app: express.Application;
    public server: Server;
    private socketIo: Io;

    constructor() {
        this.app = express();
        this.server = createServer(this.app);
        this.socketIo = new Io(this.server, {
            cors: {
                origin: '*',
            },
        });

        this.middlewares();

        this.routes();
    
    }

    
        private middlewares() {
            this.app.use(cors());
            this.app.use(express.json());
        }
    
        private routes() {
            this.app.use('/', routes);
        }
    
}

export default App;