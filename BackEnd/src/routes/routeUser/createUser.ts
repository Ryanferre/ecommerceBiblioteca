import { Createuser } from "../../Api/ApiUser.js"
export default {
    method: "POST",
    url: "/usercadres",
    handler: Createuser, //funcao de cadastro de usuario
    schema: {
        response:{
            200: {
                type: "object",
                properties: {
                    information: {type: "boolean"}
                }
            },
            400: {
                type: "object",
                properties: {
                    information: {type: "boolean"}
                }
            },
            401: {
                type: "object",
                properties: {
                    information: {type: "string"}
                }
            }
        }
    }
}