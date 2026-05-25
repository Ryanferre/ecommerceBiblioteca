import { z } from 'zod';
import prisma from '../../lib/prisma.js';


//verifica se os dados estão corretos e normaliza os preços(eles podem vir numeros ou string)
const amazonBookSchema = z.object({
  asin: z.string().min(1),
  product_title: z.string().min(1),
  product_main_image_url: z.string().url().nullable().optional(),
  product_price: z.preprocess((val) => {
    if (typeof val === 'string') {
     // 1. O Regex /\D/g remove absolutamente tudo o que não for númer
      let cleanValue = val.replace(/[^0-9,]/g, '');

      const excludNotNumber= Number(cleanValue.replace(',', '.'));

      console.log("preço com desconto: ", excludNotNumber)
      
      // 2. Transforma a string de números limpa em um Number puro
      return excludNotNumber ? excludNotNumber : 0;
    }
    
    // Se já for um número ou outro tipo, deixa passar para o Zod barrar ou processar
    return val;
  }, z.number()),
  product_original_price: z.preprocess((val) => {
    if (typeof val === 'string') {
      // 1. O Regex /\D/g remove absolutamente tudo o que não for número
      let cleanValue = val.replace(/[^0-9,]/g, '');

      const excludNotNumber= Number(cleanValue.replace(',', '.'));

      console.log("numero formado no preço original: ", excludNotNumber)
      
      // 2. Transforma a string de números limpa em um Number puro
      return excludNotNumber ? excludNotNumber : 0;
    }
    
    // Se já for um número ou outro tipo, deixa passar para o Zod barrar ou processar
    return val;
  }, z.number()),
  product_photo: z.string(),
  delivery: z.string(),
  product_byline: z.string(),
  product_url: z.string(),
  product_star_rating: z.string(),
  product_num_ratings: z.number(),
  book_format: z.string()
});

//limpar dados e coloca/atualiza o BD
export async function cleanBookingAmazonData(data: any){

    //livros regeitados
    const regectBook= []
    for(let i = 0; i < data.length; i++){
        const parseResult = amazonBookSchema.safeParse(data[i])

         console.log("verificação do parse: ", parseResult)

        //livros regeitados vai para a fila de regeição
        if (!parseResult.success) {
            regectBook.push({ asin: data[i].asin, erros: parseResult.error.format() });
            continue; // Pula para o próximo livro
        }

        //preços dos livros ou preço geral
        const ogirinPrice = parseResult.data.product_original_price || parseResult.data.product_price;

        const BookInBD = await prisma.book.findUnique({ where: { asin: parseResult.data.asin } });

        await prisma.book.upsert({
            where: { asin: parseResult.data.asin },
            update: {
                preco_original: ogirinPrice,
                preco_desconto: parseResult.data.product_price
            },
            create: {
                asin: parseResult.data.asin,
                titulo: parseResult.data.product_title,
                autor: parseResult.data.product_byline || "Desconhecido",
                preco_original: ogirinPrice,
                preco_desconto: parseResult.data.product_price,
                url_capa: parseResult.data.product_photo,
                product_url: parseResult.data.product_url,
                product_star_rating: parseResult.data.product_star_rating,
                product_num_ratings: parseResult.data.product_star_rating,
                book_format: parseResult.data.book_format,
                delivery: parseResult.data.delivery,
                sellerId: "01_Amazon", // Vincule à vendedora do seu banco
            }
            });

            if (BookInBD && parseResult.data.product_price < Number(BookInBD.preco_desconto)) {
                await prisma.alert.upsert({
                    where: { bookId: BookInBD.id },
                        update: {
                        mensagem: `Otimas noticias!!! O livro "${parseResult.data.product_title}" que você favoritou baixou de preço! Corra!`
                    },
                    create: {
                        bookId: BookInBD.id,
                        mensagem: `Otimas noticias!!! O livro "${parseResult.data.product_title}" que você favoritou baixou de preço! Corra!`
                    }
                });
            }
    }
}