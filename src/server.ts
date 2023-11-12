import prisma from "./Database/data-source.js";
import createServer from "./app.js";


const port = process.env.PORT;
export const app = createServer()



app.listen(port, async () => {
    await prisma.$connect();
    console.log("App is running on port " + port);
});

