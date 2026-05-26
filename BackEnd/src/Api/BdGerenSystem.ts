
import 'dotenv'
import prisma from '../lib/prisma.js';
import { cleanBookingAmazonData } from './funções_de_interacoes/cleanDataAmazon.js';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function pagnetBookAmazon(quant: number){

    const url = new URL('https://real-time-amazon-data.p.rapidapi.com/search?query=livros&page=1&country=BR&sort_by=LOWEST_PRICE&product_condition=ALL&is_prime=false&deals_and_discounts=NONE');


     // Faz a requisição HTTP usando o fetch nativo
            const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                // Coloque a sua chave da RapidAPI aqui
                'x-rapidapi-key': process.env.amazon_searchAPI,
                'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
            }
            });

            // Verifica se a resposta foi bem-sucedida (status 200-299)

            // Converte a resposta em JSON
            const data: any = await response.json();
            return data.data.products;
}

export async function getBookInAmazon(request: any, reply: any){

    console.log("chamada na getBookInAmazon")
        // Construção da URL com os parâmetros de busca
        try {
           
            let quantPageAmazon= 1

            while(quantPageAmazon <= 10){
                const BookinFromAmazon= await pagnetBookAmazon(quantPageAmazon)

                console.log("dados retorado ao se conectar a amazon: ", BookinFromAmazon)

                cleanBookingAmazonData(BookinFromAmazon)

                quantPageAmazon++

                await sleep(2000);
            }

            if(quantPageAmazon == 10){
                
            }

            return {
                information: true
            };

        } catch (error: any) {
            return reply.code(500).send({
            information: false,
            erro: `Falha no servidor ao buscar os dados na amazon. File: BdGerenSystem.ts, Function: getBooKInAmazon ${error}`
        });
        }
}

//busca e adicionamento de descrição
export async function addedDescription(request: any, reply: any){
    const { asin } = request.query

    // Construção da URL com os parâmetros de busca
        const url = new URL(`https://amazon-online-data-api.p.rapidapi.com/product?asins=${asin}&geo=BR`);

            try {
                // Faz a requisição HTTP usando o fetch nativo
                const response = await fetch(url.toString(), {
                method: 'GET',
                headers: {
                    // Coloque a sua chave da RapidAPI aqui
                    'x-rapidapi-key': process.env.amazon_searchAPI,
                    'x-rapidapi-host': 'amazon-online-data-api.p.rapidapi.com'
                }
                });

                // Verifica se a resposta foi bem-sucedida (status 200-299)
                if (!response.ok) {
                throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
                }

                // Converte a resposta em JSON
                const data: any = await response.json();
                const BookinFromAmazon = data.results[0];

                console.log("dados de descrição: ", BookinFromAmazon)

                await prisma.book.update({
                where: { asin: BookinFromAmazon.asin },
                data: {
                    description: BookinFromAmazon.description
                }})

                return reply.code(200).send({
                    informationDescription: BookinFromAmazon.description
                });

            } catch (error: any) {
                return reply.code(500).send({
                information: false,
                erro: 'Falha no servidor ao buscar os dados na amazon. File: BdGerenSystem.ts, Function: addedDescription'
            });
            }
}