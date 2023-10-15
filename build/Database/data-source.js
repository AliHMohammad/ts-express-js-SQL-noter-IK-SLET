import "reflect-metadata";
import { DataSource } from "typeorm";
import { Artists } from "../Model/Artists.js";
import { Albums } from "../Model/Albums.js";
import { Tracks } from "../Model/Tracks.js";
import { config } from "dotenv";
config();
export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.MYSQL_HOST,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: 3306,
    synchronize: true,
    logging: true,
    entities: [Artists, Albums, Tracks],
});
