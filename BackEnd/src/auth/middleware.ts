import fp from "fastify-plugin";
import { FastifyPluginAsync } from "fastify";
import { authenticateClerck } from "./acessToken.js";


const authPlugin: FastifyPluginAsync = async (fastify) => {
  fastify.addHook("preHandler", async (request: any, reply: any) => {

    console.log("identificação do preflight: ", request.method);
    // libera OPTIONS (CORS preflight)
    if (request.method === "OPTIONS") {
      console.log("passando pelo options");
      return;
    }

    console.log("midlleware chamado com a rota: ", request.url)

    const cronSecret = request.headers['x-cron-secret'];

    if(request.url == "/getstartpromotions" && cronSecret === process.env.CRON_SECRET_KEY){

      console.log("dados da url /getstartpromotions: ", cronSecret)
      return
    }

    const auth = request.headers?.authorization;

    if (!auth?.startsWith("Bearer ")) {
      return reply.status(401).send({ error: "Missing service token" });
    }

    const token = auth.split(" ")[1];

    try {

      const payload = await authenticateClerck(token);

      request.service = payload;

      return;
    } catch(error) {
      console.log("erro ao verificar token: ", error)
      return reply.status(403).send({ error: "Invalid service token" });
    }
  });
};

// 🔑 O `fp()` garante que o plugin funcione globalmente
export default fp(authPlugin);