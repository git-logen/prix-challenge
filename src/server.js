import express, { json } from 'express';
import cors from 'cors';
import 'dotenv/config';

import routes from './routes.js';
import errorHandler from './middlewares/errorMiddleware.js';

export class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        
        // Middlewares
        this.middlewares();

        // Routes of my app
        this.routes();

        // Error middleware
        this.errorMiddleware();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(json());
        this.app.use(express.urlencoded({ extended: true, strict: false, }));
    }

    routes() {
        this.app.use('/api', routes)
    }

    errorMiddleware() {
        this.app.use(errorHandler)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port: ', this.port);
        });
    }
}
