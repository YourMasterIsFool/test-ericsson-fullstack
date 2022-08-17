import { Router } from 'express';
import readXlsxFile from 'read-excel-file/node'
import multer from 'multer';
import * as fs from 'fs'
import { config } from '../../settings';
const router: Router = Router()

import database from '../../database';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, config.ROOT_PATH +'/uploads/')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '_' + Date.now() + '_' + file.originalname.split(" ").join("_"))
    },
  })
  const uploadFile = multer({ storage: storage })
  
  

  router.post("/upload-file-item",uploadFile.single('file'), async(req,  res) => {
    const bulkQuery = await importFileToDb(config.ROOT_PATH+'/uploads/' + req.file?.filename)

    
    const importedFile = await database.$transaction(bulkQuery);
    
    return res.status(201).json({
      'success' : true,
      'message' : 'Successfully imported datas'
    },);
   
})
  async function importFileToDb(exFile:any) {
    // console.log("ex file", exFile)
    let bulkQuery  = [];

   const resultExcel = await readXlsxFile(exFile)
  let shipment_id = resultExcel[0].findIndex((item) => item == "shipment_id");
  let nama_item = resultExcel[0].findIndex((item) => item == "nama_item")
  let kuantitas = resultExcel[0].findIndex((item) => item == "kuantitas")
  

  //check name header
  if(shipment_id >= 0 || nama_item >= 0 || kuantitas >= 0 ) {

      // loop row data after header
                    for(let loop = 1; loop < resultExcel.length; loop++) {

                      // saving to bulk query
                        bulkQuery.push(database.item.create({
                          data: {
                            shipment_id: resultExcel[loop][shipment_id].toString(),
                                  nama_item: resultExcel[loop][nama_item].toString(),
                                  kuantitas: Number(resultExcel[loop][kuantitas])
                          }
                        }))
                    }
    }

    
    return bulkQuery ;
    
  }

  // get list data items

  router.get("/", async(req, res) => {
    const listItem = await database.item.findMany({});


    return res.json({
      'count': listItem.length,
      'data': listItem
    })
  })


  router.delete('/bulk-delete', async(req, res) => {
    const bulkDeleted  = await database.item.deleteMany();

    return res.json({
      'success': true,
      'message': 'Successfuly deleted all data'
    })

  })
export default router