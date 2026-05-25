import { getBooks } from "../../Api/ApiUser.js"

export default {
    method: "GET",
    url: "/",
    handler: getBooks, 
    schema: {
        response: {
            200: {
                type: "object",
                properties: {
                    connectBD: { 
                        type: "array",
                        items: {
                            properties: {
                                id: { type: "string" },
                                asin: { type: "string" },
                                titulo: { type: "string" },
                                autor: { type: "string" },
                                product_star_rating: { type: "string" },
                                product_num_ratings: { type: "string" },
                                book_format: { type: "string" },
                                product_url: { type: "string" },
                                delivery: { type: "string" },
                                preco_original: { type: "number" },
                                preco_desconto: { type: "number" },
                                description: {type: "string"},
                                url_capa: { type: "string" },
                                createdAt: { type: "string", format: "date-time" },
                                sellerId: { type: "string" }
                            }
                        }
                    }
                }
            },
            400: {
                type: "object",
                properties: {
                    information: { type: "boolean" }
                }
            },
            401: {
                type: "object",
                properties: {
                    information: { type: "string" }
                }
            }
        }
    }
}