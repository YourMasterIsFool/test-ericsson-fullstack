import * as dotenv from 'dotenv';

dotenv.config({
    path:"../.env"
})

const config: any = {
    APP_VERSION: process.env.APP_VERSION,    
    SERVER_HOST: process.env.SERVER_HOST,
    SERVER_PORT: process.env.SERVER_PORT,
    ROOT_PATH: __dirname

}

export  {
    config
}