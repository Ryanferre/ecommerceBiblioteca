import { addedDescription } from "../../Api/BdGerenSystem.js";
export default {
    method: "GET",
    url: "/getdescription",
    config: {
        rateLimit: { max: 3, timeWindow: '1 minute' } //limite de um minuto a cada requisição
    },
    handler: addedDescription, //funcao para pegar descrição do livro
    schema: {
        response: {
            200: {
                type: "object",
                properties: {
                    informationDescription: { type: "string" }
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
