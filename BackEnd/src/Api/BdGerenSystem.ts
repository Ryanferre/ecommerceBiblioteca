import 'dotenv'
import prisma from '../lib/prisma.js';
import { cleanBookingAmazonData } from './funções_de_interacoes/cleanDataAmazon.js';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// 1. Agora a função recebe o número real da página que deve buscar
async function pagnetBookAmazon(page: number) {
    // Injetamos a variável 'page' dinamicamente na string da URL
    const url = new URL(`https://real-time-amazon-data.p.rapidapi.com/search?query=livros&page=${page}&country=BR&sort_by=LOWEST_PRICE&product_condition=ALL&is_prime=false&deals_and_discounts=NONE`);

    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'x-rapidapi-key': process.env.amazon_searchAPI || '',
            'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
        }
    });

    // É crucial checar se a API não retornou erro (ex: Limite de requisições estourado)
    if (!response.ok) {
        throw new Error(`Erro na RapidAPI: ${response.status} ${response.statusText}`);
    }

    const data: any = await response.json();
    
    // Proteção caso a API mude a estrutura ou retorne vazio
    if (!data || !data.data || !data.data.products) {
        console.log(`Nenhum produto encontrado na página ${page}`);
        return [];
    }

    return data.data.products;
}

export async function getBookInAmazon(request: any, reply: any) {
    console.log("Chamada iniciada em getBookInAmazon");
    
    try {
        // Defina aqui a quantidade de páginas que você deseja raspar (ex: 3 páginas)
        const totalPagesToFetch = 3; 

        // O loop começa em 1 e vai até a quantidade de páginas desejada
        for (let i = 1; i <= totalPagesToFetch; i++) {
            console.log(`Iniciando busca na página: ${i}`);
            
            // Aguarda a resposta da API antes de continuar
            const bookInfoFromAmazon = await pagnetBookAmazon(i);

            console.log(`Dados retornados da página ${i}:`, bookInfoFromAmazon.length, "produtos encontrados.");

            if (bookInfoFromAmazon.length > 0) {
                // ⚠️ Se 'cleanBookingAmazonData' salva coisas no banco, adicione o 'await' aqui!
                // Exemplo: await cleanBookingAmazonData(bookInfoFromAmazon);
                await cleanBookingAmazonData(bookInfoFromAmazon);
            }

            // Espera 2 segundos antes de bater na API novamente para evitar block/rate limit
            console.log(`Aguardando 2 segundos para a próxima página...`);
            await sleep(2000);
        }

        return reply.code(200).send({
            information: true,
            message: "Raspagem concluída com sucesso."
        });

    } catch (error: any) {
        console.error("Erro capturado no fluxo:", error);
        return reply.code(500).send({
            information: false,
            erro: `Falha no servidor ao buscar os dados na amazon. File: BdGerenSystem.ts, Function: getBookInAmazon. Detalhes: ${error.message || error}`
        });
    }
}