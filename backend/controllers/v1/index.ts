import express, {Express, Router} from 'express'
import * as dotenv from 'dotenv';

import shipment_controller from './shipment_controller';
import itemController from './ItemController';
import * as bodyParser from 'body-parser';


const v1Router: Router = express.Router();




v1Router.use("/shipments",shipment_controller);
v1Router.use('/items', itemController)

export default v1Router;
