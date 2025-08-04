import Fastify from 'fastify'
import { PrismaClient } from '@prisma/client';
import cors from '@fastify/cors'

const prisma = new PrismaClient();
const ServeBifly= Fastify({logger: true})//Servidor e status de execulcao
const main = async()=>{
  await ServeBifly.register(cors, {
   origin: "*",
   methods: ['GET', 'POST', 'PUT', 'DELETE']
  })
}

main()

//edipoint geral: esse edpoint e carregado na entrada do site para pegar os itens e exibir tanto para visitantes quanto para usuarios cadastrados
//porem ela pode enviar os itens que o anunciante cadastrou no banco de dados pelo email, uma vez que cada item e cadastrado com o em email do usuario
ServeBifly.get("/", async (req: any, res)=>{ 
    
    try {
        const {email}= req.query//captura o email do usuario

        if(!email){// se na requisicao nao vinher o email, significa que e para enviar todos os itens e que o usuario nao esta altenticado
    
                const dataUser= await prisma.inforbook.findMany()
                res.send([dataUser])
        }else{// se vinher um email significa que e para pegar os itens referente a esse email
                const dataUser= await prisma.inforbook.findMany({where: { emailUser: String(email) }})
                res.send([dataUser])
        }
    } catch (error) {
        res.send(error)
    }

    })

    //edpoint de cadastro: Esse edpoint serve para o usuario anunciar um item. recebe todos os itens referente ao produto e cadastra ao banco de dados
    ServeBifly.post("/postProduto", async (req: any, res)=>{
        const {emailUser, nameAutorBook, titleBook, priceBook, descriptionBook, imgBook}= req.body as { emailUser: string, nameAutorBook: string, titleBook: string, priceBook: number, descriptionBook: string, imgBook: string}

        try{
                const createclient= await prisma.inforbook.create({data: {emailUser, nameAutorBook, titleBook, priceBook, descriptionBook, imgBook}})
                res.send(createclient)
        } catch (error) {
                res.send(error)
        }
    })

    //edpoit de edicao de produto ou delecao: esse edpoint serve para o usuario editar o produto que foi anunciado como preco, titulo, autor, ou imagem. Ou deletar o produto
    ServeBifly.post("/EditeProduct", async (req, res)=>{
        try {

            //para que a edicao seja feita e preciso de tres dado do usuario: o id referente ao produto, qual acao a ser feita e o novo dado do produto
            const {id}: any= req.query// id referente ao produto
            const {whatchInfor}: any= req.query// qual a acao a ser feita
            const {information}: any= req.query// novo dado da tabela

            switch (whatchInfor) {
                case 'nameAutor':// caso seja o nome do altor a ser editado
                    const UpdateOnlynameAutor= await prisma.inforbook.update({where: {id: Number(id)}, data:{nameAutorBook: information}})
                    res.send(UpdateOnlynameAutor)
                    break;
                case 'titleBook':// caso seja o titulo do produto a ser editado
                    const UpdateOnlytitleBook= await prisma.inforbook.update({where: {id: Number(id)}, data:{titleBook: information}})
                    res.send(UpdateOnlytitleBook)
                    break;
                case 'priceBook':// caso seja o preco do produto a ser editado
                    const UpdateOnlypriceBook= await prisma.inforbook.update({where: {id: Number(id)}, data:{priceBook: information}})
                    res.send(UpdateOnlypriceBook)
                    break;
                case 'descriptionBook':// caso seja a descricao do produto a ser editado
                    const UpdateOnlydescriptionBook= await prisma.inforbook.update({where: {id: Number(id)}, data:{descriptionBook: information}})
                    res.send(UpdateOnlydescriptionBook)
                    break;
                case 'imgBook':// caso seja a imagem a ser editada
                    const UpdateOnlyimgBook= await prisma.inforbook.update({where: {id: Number(id)}, data:{imgBook: information}})
                    res.send(UpdateOnlyimgBook)
                    break;
                case 'deleteItem': // caso seja um pedido de delecao do produto
                    const DeleteItem= await prisma.inforbook.delete({where: {id: Number(id)}})
                    res.send(DeleteItem)
                    break;
                default:
                    break;
            }
        } catch (error) {
            
        }
    })

    //edpoint para adicionar itens ao carrinho: esse edpoint serve para adicionar itens ao carrinho. ele recebe o email do usuario que quer adicionar o item e o id do item
    //ela uni o usuario aos items que ele deseja atravez de chave estrangeira
    ServeBifly.post('/addincart', async (req, res)=>{
          const {product_id, emailUser}= req.body as { product_id: number, emailUser: string}//recebe o id do produto e o email do usuario para identificar a tabela(carrinho) do usuario que sera criada
          //ATENCAO: Cada item adicionado sera uma tabela criada

        try {//cria a tabela e adiciona o email e o id referente ao item
            const addincart= await prisma.cart.create({data: {emailUser, product_id}})
            res.send(addincart)// envia uma resposta ao front-end
        } catch (error) {
            res.send(error)
        }
    })

    //pega as itens que o usuario quer comprar
    ServeBifly.get('/getcart', async (req, res)=>{
        const {email}: any= req.query//pega o email na requisicao
        try {

            //para pegar os itens e necessario pegar as tabelas criadas que liga os itens ao usuario
            const dataUser= await prisma.cart.findMany({where: { emailUser: String(email) }})// isso retorna um array com as tabelas

            let arrwithitesn: any= []// esse array armazena os itens

            //percorre o array com as tabelas e compara a chave estrangeira com o id dos itens
            for(let i=0; i < dataUser.length; i++){
                // a cada item do array e feito uma requisicao ao banco de dados passando a chave estrageira
                const getitensofuser= await prisma.inforbook.findUnique({where: { id: Number(dataUser[i].product_id) }})
                arrwithitesn.push(getitensofuser)// a cada item encontrado e passado para o array que armazena os items
            }

            if(arrwithitesn.length > 0){// verifica se o array esta vasio, se nao ele envia os dois arrays: um com os items do carrinho e o outro com as tabelas do corrinho para o front-end como reposta
                res.send([arrwithitesn, dataUser])//
            }
        } catch (error) {
            res.send(error)
        }
    })

    //endponit para deletar produto anunciado: Esse edpoint deleta o item anunciado pelo usuario
    //como os itens a serem deletados sao os mesmo retornado no edpoint de chamada geral e so os usuario altenticado e com email cadastrado em cada tabela
    //nao e necessario fazer verificacao de email
    ServeBifly.post('/deletitencart', async(req, res)=>{
        const {idDelete}: any= req.query// pega o id do item(ele vem como string)

        const toNumberId= Number(idDelete)// transforma a string em number

        try {
            const deletItenInBd= await prisma.cart.delete({where: {id: toNumberId}})// faz a delecao do item
            res.send(deletItenInBd)// envia uma resposta ao front-end
        } catch (error) {
            res.send(error)
        }
    })

const Port=  Number(process.env.PORT) || 3000//3000(padrao para debug ou manutancao) ou utilize qualquer uma do servidor

ServeBifly.listen({ port: Port, host: '0.0.0.0' }, ()=>{
    console.warn('rodando na porta: ' + Port)
})