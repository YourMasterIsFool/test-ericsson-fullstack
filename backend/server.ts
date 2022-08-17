import * as http from 'http';

import {config } from './settings';
import v1Router from './controllers/v1';
import express,{Express} from 'express';
import * as bodyParser from 'body-parser'
import cors from 'cors';

var app: Express = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// base config for app version
if(config.APP_VERSION == "v1") {
  app.use("/api/v1",v1Router)
}

const PORT = config.SERVER_PORT || 5001;
const HOST = config.SERVER_PORT || "localhost";

const server = http.createServer(app);


server.listen(PORT, () => {
  console.log("server has actived in port ", PORT)
})



