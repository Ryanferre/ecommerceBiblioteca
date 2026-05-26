import 'dotenv/config';
import Fastify from 'fastify';
import rateLimit from '@fastify/rate-limit';
import cors from '@fastify/cors';
import authPlugin from "./src/auth/middleware.js";
import getbooks from "./src/routes/routeUser/getBooks.js";
import decriptionFromBook from "./src/routes/routerlibrary/getDescription.js";
import routerUserCreate from "./src/routes/routeUser/createUser.js";
import routeDataBookGerenc from "./src/routes/routerlibrary/startGetBookInPartners.js";
const ServerMain = Fastify({ logger: true }); //Servidor e status de execulcao
const main = async () => {
    try {
        // CORS
        await ServerMain.register(cors, {
            origin: "*",
            methods: ["GET", "POST", "PUT", "DELETE"],
        });
        await ServerMain.register(rateLimit, {
            max: 100, // 100 requests
            timeWindow: "1 minute", // por minuto
        });
        // 🔐 AUTH (ANTES das rotas)
        await ServerMain.register(authPlugin);
        //rotas
        ServerMain.route(getbooks);
        ServerMain.route(routerUserCreate);
        ServerMain.route(routeDataBookGerenc);
        ServerMain.route(decriptionFromBook);
        const Port = Number(process.env.PORT) || 4000;
        await ServerMain.listen({ port: Port, host: "0.0.0.0" });
        console.log("Servidor rodando na porta: " + Port);
    }
    catch {
    }
};
main();
