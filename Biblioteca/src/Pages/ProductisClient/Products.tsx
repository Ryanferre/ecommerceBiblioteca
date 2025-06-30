import { useContext } from "react"
import DataCostum from "../../Settings/Custum"
import axios from "axios"
import { useNavigate } from "react-router-dom"


//Componente para anunciar um novo produto
const Anuncio= ()=>{
    const {EmailUser}= useContext(DataCostum)//pega o email do usuario no context
    const navigate = useNavigate()//hook para sair da rota apos determinada acao

    //class que representa o produto
    class objectDataProduct{
        id            :  number | null;
        emailUser     :  string | null;
        nameAutorBook :  string;
        titleBook     :  string;
        priceBook     :  number | null;
        descriptionBook: string;
        imgBook        : string

        constructor(id: null, emailUser: '', nameAutorBook: '', titleBook: '', priceBook: null, descriptionBook: '', imgBook: ''){
            this.id= id,
            this.emailUser= emailUser,
            this.nameAutorBook= nameAutorBook,
            this.titleBook= titleBook,
            this.priceBook= priceBook,
            this.descriptionBook= descriptionBook,
            this.imgBook= imgBook

        }
    }

    //instancia da classe
    const objectProduct= new objectDataProduct(null, '', '', '', null, '', '')

    //pega o nome do altor
    const validNameAutor=(e: any)=>{
        objectProduct.nameAutorBook= e.target.value
    }

    //pega o titulo do livro
    const validTituloBook= (e: any)=>{
        objectProduct.titleBook= e.target.value
    }

    //pega o preco do livro
    const validPriceBook= (e: any)=>{
        objectProduct.priceBook= e.target.value
    }


    //pega a descricao
    const validDescriptionBook= (e: any)=>{
        objectProduct.descriptionBook= e.target.value
    }


    //pega a url da imagem do livro
    const validimgBook= (e: any)=>{
        objectProduct.imgBook= e.target.value
    }

    //botao para adicionar o email a chave "email" no objeto e envia-lo para o back-end
    const BtnSend= async ()=>{
        objectProduct.emailUser= EmailUser
         try {
            const res = await axios.post('http://localhost:3000/postProduto', objectProduct);
            if(res){
                navigate('/')//sai da rota em direcao a interface "Home"
            }
        } catch (erro) {
            console.error('Erro ao cadastrar:', erro);
        }
    }

    return(
        <section className="shadow-2xl rounded-2xl w-max mx-auto my-30 py-5 px-10 flex flex-col gap-5">
            <ul className="w-100">
                <li>
                    <p className="font-medium text-[#bbbbbb]">Nome do autor</p>
                    <input className="outline-none w-full border-b-1 border-[#bbbbbb]" onChange={(e)=> validNameAutor(e)} type="text"/>
                </li>
                <li>
                    <p className="font-medium text-[#bbbbbb]">Titulo do livro</p>
                    <input className="outline-none w-full border-b-1 border-[#bbbbbb]" onChange={(e)=> validTituloBook(e)} type="text"/>
                </li>
                <li>
                    <p className="font-medium text-[#bbbbbb]">Preco do livro</p>
                    <input className="outline-none w-full border-b-1 border-[#bbbbbb]" onChange={(e)=> validPriceBook(e)} type="text"/>
                </li>
                <li>
                    <p className="font-medium text-[#bbbbbb]">Insira uma descricao</p>
                    <textarea className="outline-none w-full h-100 border-1 rounded-[.4em] border-[#bbbbbb]" onChange={(e)=> validDescriptionBook(e)}/>
                </li> 
                <li>
                    <p className="font-medium text-[#bbbbbb]">Adicione um link para imagem (<a className="text-blue-600 font-bold" href="https://postimages.org/">Nao tem o link? Hopede a imagem aqui</a>)</p>
                    <input className="outline-none w-full border-b-1 border-[#bbbbbb]" onChange={(e)=> validimgBook(e)} type="text"/>
                </li>
            </ul>
            <button onClick={BtnSend} className="w-max px-6 lg:px-8 py-[.2em] lg:py-[.4em] font-bold text-white rounded-3xl bg-[#00ccbe] hover:bg-[#00ccbe]/50 cursor-pointer">send</button>
        </section>
    )
}

export default Anuncio