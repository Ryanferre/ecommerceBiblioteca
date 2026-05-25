import { getBookInAmazon } from "../../Api/BdGerenSystem.js";
export default {
    method: "GET",
    url: "/getstartpromotions",
    config: {
        rateLimit: { max: 3, timeWindow: '1 minute' } //limite de um minuto a cada requisição
    },
    handler: getBookInAmazon, //funcao para pegar dados nos parceiros
    schema: {
        response: {
            200: {
                type: "object",
                properties: {
                    information: { type: "boolean" }
                }
            },
            500: {
                type: "object",
                properties: {
                    information: { type: "boolean" },
                    erro: { type: "string" }
                }
            }
        }
    }
};
