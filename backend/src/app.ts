import express from 'express';
import { createServer, Server } from 'http';
import { Server as Io, Socket } from 'socket.io';
import routes from './routes';
import cors from 'cors';
import errorMiddleware from './middlewares/errorMiddleware';



class App {
    public app: express.Application;
    public server: Server;
    public io: Io;

    constructor() {
        this.app = express();
        this.server = createServer(this.app);
        this.io = new Io(this.server, {
            cors: {
                origin: '*',
            },
        });

        this.middlewares();
        this.initializeSocket();
        this.app.get('/', (req, res) => {res.json({ ok: true })});
        this.app.use(routes);

    
    }


    
    private middlewares() {
            this.app.use(cors());
            this.app.use(express.json());
    }

    private initializeSocket(): void {
        this.io.on('connection', (socket: Socket) => {
          console.log('Cliente conectado:', socket.id);
    
          socket.on('disconnect', () => {
            console.log('Cliente desconectado:', socket.id);
          });
        });
      }
    
    
    public start(PORT: string | number): void {
        this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
      }
    
}

export default App;