import { config } from "dotenv";
//Kør config(), så den kan læse din env fil. Config importeres ^
config();


import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});


export default prisma