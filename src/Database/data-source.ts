import { DataSource } from "typeorm";
import { Artists } from "../Model/Artists.js";
import { Albums } from "../Model/Albums.js";
import { Tracks } from "../Model/Tracks.js";

import "reflect-metadata";
//Importer "reflect-metadata"
import { config } from "dotenv";
//Kør config(), så den kan læse din env fil. Config importeres ^
config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.MYSQL_HOST,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: 3306, //PORT PÅ DATABASEN!!!!!
    synchronize: true,
    logging: true,
    entities: [Artists, Albums, Tracks], //Dine modeller, som du har auto-genereret.
});
