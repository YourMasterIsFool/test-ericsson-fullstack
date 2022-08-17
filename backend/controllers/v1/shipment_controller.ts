import express, { Request } from 'express';
import { PrismaClient } from '@prisma/client';
import database from '../../database';
import ShipmentModel from '../../models/ShipmentModel';
import moment from 'moment';
import { idText } from 'typescript';

const router: express.Router = express.Router();

const db: PrismaClient = database;


interface ShipmentBodyRequest extends Request {
    body: ShipmentModel
}

router.get("/", async (req, res) => {
    const shipments = await db.shipment.findMany({})
    return res.json(shipments);
});


router.post("/add", async(req, res) => {


    

    const shimpentSchema: ShipmentModel = req.body

   
    if(moment(req.body.tanggal_berangkat).isValid()) {
        shimpentSchema.tanggal_berangkat = moment(req.body.tanggal_berangkat).toDate()
    }

    
    if(moment(req.body.dibuat_pada).isValid()) {
        shimpentSchema.dibuat_pada = moment(req.body.dibuat_pada).toDate()
    }
   
    
    
    const createdShipment = await db.shipment.create({
        data: shimpentSchema
    })
    
    return res.json(createdShipment)
});



export default router;