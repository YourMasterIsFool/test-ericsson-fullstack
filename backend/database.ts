import { Prisma, PrismaClient } from "@prisma/client";



const database: PrismaClient = new PrismaClient();

database.$use(async(params, next) => {

    
    if(params.model == "Shipment" && params.action == "create") {
       
        let result =  await next(params);
        params.action = 'update'
        params.args = {
            where: {
                id: result.id
            },
            data: {
                shipment_id : "SHP"+ Number(result.id).toString().padStart(3, "0")
            }
        }

    }

   
    return next(params)
})


async function main() {
    await database.$connect();
  }

main()
  .then(async () => {
    await database.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await database.$disconnect()
    process.exit(1)
  })


export default database;