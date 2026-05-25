import prisma from "../lib/prisma.js";
import { createUserSchema } from "../zodVerify/verify.js";
//cria usuario
export async function Createuser(request, reply) {
    const { clerkUserId, nameUser, email } = request.query;
    const parseResult = createUserSchema.safeParse(request.query);
    if (!parseResult.success) {
        console.log("resultado da getclass: ");
        return reply.code(400).send({
            error: 'Dados inválidos ou inexistentes ao tentar pegar dados de classes',
            details: parseResult.error.flatten()
        });
    }
    else {
        try {
            console.log("dados do idUser: ", clerkUserId);
            const name = nameUser;
            //verifica se o usuario existe
            const verifyUser = await prisma.user.findMany({ where: { name: nameUser, clerkUserId: clerkUserId, email: email } });
            //usuario existe
            if (verifyUser.length > 0) {
                return reply.code(200).send({ information: true });
            }
            else {
                // cria usuário no banco
                const Createuser = await prisma.user.create({ data: { clerkUserId, name, email } });
                if (Createuser) {
                    return reply.code(200).send({ information: "Usuario criado com sucesso!" });
                }
            }
        }
        catch (error) {
            console.log("Erro ao cadastrar usuario: ", error);
        }
    }
}
//pegar todos os livros do banco de dados
export async function getBooks(request, reply) {
    try {
        const connectBD = await prisma.book.findMany();
        console.log("Books nobanco de dados: ", connectBD);
        // Retorna a lista para o front-end
        return reply.status(200).send({ connectBD });
    }
    catch (error) {
        console.log("Erro ao pegar livros no BD. file: ApiUser.ts, function: getBooks. ", error);
    }
}
