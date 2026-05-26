import 'dotenv';
// Função auxiliar para dar uma pausa entre as requisições (Evita ban/Rate Limit da API)
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function puxarLivrosAdmitad() {
    const ADMITAD_TOKEN = process.env.admitad_base64;
    const AD_SPACE_ID = process.env.admitad_ID;
    const CAMPAIGN_ID = 'ID_DA_CAMPANHA_SHOPEE_BR';
    const CATEGORIAS = [
        'livros romance',
        'livros ficção cientifica',
        'livros desenvolvimento pessoal',
        'livros tecnicos programação'
    ];
    console.log('🚀 Iniciando sincronização em background...');
    for (const termo of CATEGORIAS) {
        let paginaAtual = 1;
        let temMaisPaginas = true;
        while (temMaisPaginas && paginaAtual <= 10) {
            // Monta a URL dinâmica com os parâmetros usando a API nativa do JS
            const url = new URL('https://api.admitad.com/products/');
            url.searchParams.append('adspace_id', AD_SPACE_ID ? AD_SPACE_ID : '');
            url.searchParams.append('keyword', termo);
            url.searchParams.append('limit', '50');
            url.searchParams.append('page', paginaAtual.toString());
            url.searchParams.append('campaign_id', CAMPAIGN_ID);
            try {
                const response = await fetch(url.toString(), {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${ADMITAD_TOKEN}`,
                        'Accept': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error(`Erro HTTP: ${response.status}`);
                }
                const data = await response.json();
                const produtos = data.results || [];
                // Se a página vier vazia, quebra o loop deste termo e vai para o próximo
                if (produtos.length === 0) {
                    temMaisPaginas = false;
                    break;
                }
                // Loop para salvar cada livro no seu Banco de Dados
                for (const produto of produtos) {
                    const livroDados = {
                        titulo: produto.name,
                        preco: Number(produto.price),
                        linkAfiliado: produto.url,
                        imagem: produto.image,
                        categoria: termo,
                        atualizadoEm: new Date()
                    };
                    // ─── ALIMENTE O SEU BANCO DE DADOS AQUI ───
                    // Substitua a linha abaixo pelo método do seu ORM (ex: Prisma, Mongoose, etc.)
                    // Exemplo: await prisma.livro.upsert({ ... })
                    console.log(`💾 Integrando: ${livroDados.titulo.substring(0, 30)}...`);
                }
                paginaAtual++;
                await delay(1500); // Pausa de segurança
            }
            catch (error) {
                console.error(`❌ Falha na página ${paginaAtual} do termo "${termo}":`, error.message);
                await delay(5000); // Espera um pouco mais se der erro antes de tentar o próximo termo
                break;
            }
        }
    }
    console.log('✅ Catálogo de livros atualizado com sucesso!');
}
