import express from 'express';
import { createServer, Server } from 'http';
import { Server as Io } from 'socket.io';
import routes from './routes';
import cors from 'cors';
import errorMiddleware from './middlewares/errorMiddleware';



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

        this.app.get('/', (req, res) => {res.json({ ok: true })});
        this.app.use(routes);

    
    }


    
    private middlewares() {
            this.app.use(cors());
            this.app.use(express.json());
    }
    
    public start(PORT: string | number): void {
        this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
      }
    
}

export default App;