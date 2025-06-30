import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import cors from '@fastify/cors';
const prisma = new PrismaClient();
const ServeAtivos = Fastify({ logger: true }); //Servidor e status de execulcao
await ServeAtivos.register(cors, {
    origin: "*"
});
ServeAtivos.get("/", async (req, res) => {
    try {
        const { email } = req.query;
        console.log(email);
        if (!email) {
            const dataUser = await prisma.inforbook.findMany();
            res.send([dataUser]);
        }
        else {
            const dataUser = await prisma.inforbook.findMany({ where: { emailUser: String(email) } });
            res.send([dataUser]);
        }
    }
    catch (error) {
        res.send(error);
    }
});
ServeAtivos.post("/postProduto", async (req, res) => {
    const { emailUser, nameAutorBook, titleBook, priceBook, descriptionBook, imgBook } = req.body;
    try {
        const createclient = await prisma.inforbook.create({ data: { emailUser, nameAutorBook, titleBook, priceBook, descriptionBook, imgBook } });
        res.send(createclient);
    }
    catch (error) {
        res.send(error);
    }
});
ServeAtivos.post("/EditeProduct", async (req, res) => {
    try {
        const { id } = req.query;
        const { whatchInfor } = req.query;
        const { information } = req.query;
        switch (whatchInfor) {
            case 'nameAutor':
                const UpdateOnlynameAutor = await prisma.inforbook.update({ where: { id: Number(id) }, data: { nameAutorBook: information } });
                res.send(UpdateOnlynameAutor);
                break;
            case 'titleBook':
                const UpdateOnlytitleBook = await prisma.inforbook.update({ where: { id: Number(id) }, data: { titleBook: information } });
                res.send(UpdateOnlytitleBook);
                break;
            case 'priceBook':
                const UpdateOnlypriceBook = await prisma.inforbook.update({ where: { id: Number(id) }, data: { priceBook: information } });
                res.send(UpdateOnlypriceBook);
                break;
            case 'descriptionBook':
                const UpdateOnlydescriptionBook = await prisma.inforbook.update({ where: { id: Number(id) }, data: { descriptionBook: information } });
                res.send(UpdateOnlydescriptionBook);
                break;
            case 'imgBook':
                const UpdateOnlyimgBook = await prisma.inforbook.update({ where: { id: Number(id) }, data: { imgBook: information } });
                res.send(UpdateOnlyimgBook);
                break;
            case 'deleteItem':
                const DeleteItem = await prisma.inforbook.delete({ where: { id: Number(id) } });
                res.send(DeleteItem);
                break;
            default:
                break;
        }
    }
    catch (error) {
    }
});
ServeAtivos.post('/addincart', async (req, res) => {
    const { product_id, emailUser } = req.body;
    console.log(req.body);
    const productExists = await prisma.inforbook.findUnique({
        where: { id: product_id }
    });
    console.log(productExists);
    try {
        const addincart = await prisma.cart.create({ data: { emailUser, product_id } });
        res.send(addincart);
    }
    catch (error) {
        res.send(error);
    }
});
ServeAtivos.get('/getcart', async (req, res) => {
    const { email } = req.query;
    console.log('o email e: ' + email);
    try {
        const dataUser = await prisma.cart.findMany({ where: { emailUser: String(email) } });
        let arrwithitesn = [];
        for (let i = 0; i < dataUser.length; i++) {
            const getitensofuser = await prisma.inforbook.findUnique({ where: { id: Number(dataUser[i].product_id) } });
            arrwithitesn.push(getitensofuser);
        }
        if (arrwithitesn.length > 0) {
            res.send([arrwithitesn, dataUser]);
        }
    }
    catch (error) {
        res.send(error);
    }
});
ServeAtivos.post('/deletitencart', async (req, res) => {
    const { idDelete } = req.query;
    const toNumberId = Number(idDelete);
    console.log(toNumberId);
    try {
        const deletItenInBd = await prisma.cart.delete({ where: { id: toNumberId } });
        res.send(deletItenInBd);
    }
    catch (error) {
        res.send(error);
    }
});
const port = Number(process.env.PORT) || 3000; //3000(padrao para debug ou manutancao) ou utilize qualquer uma do servidor
ServeAtivos.listen({ port }, () => {
    console.warn('rodando na porta: ' + port);
});
