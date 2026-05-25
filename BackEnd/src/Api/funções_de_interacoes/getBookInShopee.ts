import crypto from 'crypto';
import 'dotenv'

const APP_ID = "SEU_APP_ID_AQUI";
const APP_SECRET = "SEU_APP_SECRET_AQUI";
const URL_BASE_SHOPEE = "https://open-api.affiliate.shopee.com.br/graphql";

function gerarHeadersShopee(queryGraphQL: any) {
  const timestamp = Math.floor(Date.now() / 1000); 
  const stringParaAssinar = APP_ID + timestamp + queryGraphQL + APP_SECRET;
  const signature = crypto.createHash('sha256').update(stringParaAssinar).digest('hex');

  return {
    "Content-Type": "application/json",
    "Authorization": `SHA256 Authorization=${signature}, AppKey=${APP_ID}, Timestamp=${timestamp}`
  };
}

/**
 * Puxa uma lista de livros da Shopee baseado em um termo de busca (Ex: "Ficção Científica")
 * @param {string} termoBusca - O nicho/livro que você quer buscar
 * @param {number} pagina - Controle de paginação para o seu crawler (começa em 1)
 */
export async function puxarCatalogoLivros(termoBusca: any, pagina = 1) {
  // Query GraphQL oficial para listagem e raspagem de produtos
  const queryGraphQL = `query {
    searchProducts(input: {
      keyword: "${termoBusca}",
      page: ${pagina},
      limit: 20,
      sort: PRICE_ASC // Traz do mais barato para o mais caro
    }) {
      nodes {
        itemId
        productName
        productLink
        imageUrl
        price
        priceMin
        sales
      }
      pageInfo {
        hasNextPage
      }
    }
  }`;

  try {
    const headers = gerarHeadersShopee(queryGraphQL);

    const response = await fetch(URL_BASE_SHOPEE, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ query: queryGraphQL })
    });

    const json: any = await response.json();

    if (json.errors) {
      console.error("Erro no GraphQL ao buscar catálogo:", json.errors);
      return [];
    }

    // Retorna a lista de livros encontrados prontos para você tratar
    return json.data.searchProducts.nodes;

  } catch (error) {
    console.error("Erro ao puxar dados da Shopee:", error);
    return [];
  }
}