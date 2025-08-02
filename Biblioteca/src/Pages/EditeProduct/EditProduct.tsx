import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//esse componente e da interface de edicao do produto
const EditBook= ()=>{
    const location = useLocation()//hook para navegacao
    const { itensinfor } = location.state || {}//as informacoes sao passadas na url. quando o usuario clica em editar, as informacoes vai para a ulr e quando a rota muda para a interface de edicao, essa interface captura as informacoes e adiciona nesse objeto
    const navigate = useNavigate()//hook de navegacao quando determinada acao for finalizada

    //class que representa o produto e armazena novas as informacoes do proprio produto
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

    //instancia o objeto para utilizalo nos botoes e atualizar as informacoes
    const objectProduct= new objectDataProduct(null, '', '', '', null, '', '')

    //atualiza o nome do autor
    const validNameAutor=(e: any)=>{
        objectProduct.nameAutorBook= e.target.value
    }

    //atualiza o tituli do livro
    const validTituloBook= (e: any)=>{
        objectProduct.titleBook= e.target.value
    }

    //atualiza o preco do livro
    const validPriceBook= (e: any)=>{
        objectProduct.priceBook= e.target.value
    }

    //atualiza a descricao do livro
    const validDescriptionBook= (e: any)=>{
        objectProduct.descriptionBook= e.target.value
    }

    //atualiza a imagem do livro
    const validimgBook= (e: any)=>{
        objectProduct.imgBook= e.target.value
    }


    //apos as informacoes serem atualizada e colocada em sua perspectiva chave valor no objeto, e feita uma comunicacao
    //como a api enviado ao edpoint o id do produto, a acao a ser feita e o dado a ser atualizado.
    const sendInformation= async (e: any, dataUpdate : any)=>{//o dataUpdate e o valor na chave passada como argumento e "e" e o tipo de acao a ser feita na api
        axios.post(`http://localhost:3000/EditeProduct?id=${itensinfor.id}&whatchInfor=${e}&information=${dataUpdate}`).then((response)=>{
            console.warn(response)
        }).catch((err)=>{
            console.error(err)
        })
    }

    //deletar item. Assim como na edicao para deletar e precisa enviar o id e a acao a ser feita. Porem nem um dado 
    //de edicao e enviado, ao invez disso e enviado id do produto no "information" para respeitar a ordem da api
    //e deletar o item 
    const deleteitemannounced= (infor: string, id: number | null)=>{
            axios.post(`http://localhost:3000/EditeProduct?id=${itensinfor.id}&whatchInfor=${infor}&information=${id}`).then((response)=>{
                console.warn(response)
                navigate('/')//assim que o item for deletado a inteface e modificada para a interface de 'Home'
            })
    
    }

    return(
        <section className="shadow-2xl rounded-2xl w-max mx-auto my-30 py-5 px-10 flex flex-col gap-5">
            <ul>
                <li className="flex flex-col gap-4">
                    <p className="font-medium text-[#bbbbbb]">Nome do autor: {itensinfor.nameAutorBook}</p>
                    <input className="outline-none border-b-1 border-[#bbbbbb]" onChange={(e)=> validNameAutor(e)} type="text"/>
                    <button onClick={()=> sendInformation('nameAutor', objectProduct.nameAutorBook)} className="w-max px-6 lg:px-8 py-[.2em] lg:py-[.4em] font-bold text-white rounded-3xl bg-[#00ccbe] hover:bg-[#00ccbe]/50 cursor-pointer">send</button>
                </li>
                <li className="flex flex-col gap-4">
                    <p className="font-medium text-[#bbbbbb]">Titulo do livro: {itensinfor.titleBook}</p>
                    <input className="outline-none border-b-1 border-[#bbbbbb]" onChange={(e)=> validTituloBook(e)} type="text"/>
                    <button onClick={()=> sendInformation('titleBook', objectProduct.titleBook)} className="w-max px-6 lg:px-8 py-[.2em] lg:py-[.4em] font-bold text-white rounded-3xl bg-[#00ccbe] hover:bg-[#00ccbe]/50 cursor-pointer">send</button>
                </li>
                <li className="flex flex-col gap-4">
                    <p className="font-medium text-[#bbbbbb]">Preco do livro: {itensinfor.priceBook}</p>
                    <input className="outline-none border-b-1 border-[#bbbbbb]" onChange={(e)=> validPriceBook(e)} type="text"/>
                    <button onClick={()=> sendInformation('priceBook', objectProduct.priceBook)} className="w-max px-6 lg:px-8 py-[.2em] lg:py-[.4em] font-bold text-white rounded-3xl bg-[#00ccbe] hover:bg-[#00ccbe]/50 cursor-pointer">send</button>
                </li>
                <li className="flex flex-col gap-4">
                    <p className="font-medium text-[#bbbbbb]">Insira uma descricao</p>
                    <textarea className="outline-none border-1 h-50 rounded-[.4em] border-[#bbbbbb]" onChange={(e)=> validDescriptionBook(e)}/>
                    <button onClick={()=> sendInformation('descriptionBook', objectProduct.descriptionBook)} className="w-max px-6 lg:px-8 py-[.2em] lg:py-[.4em] font-bold text-white rounded-3xl bg-[#00ccbe] hover:bg-[#00ccbe]/50 cursor-pointer">send</button>
                </li>
                <li className="flex flex-col gap-4">
                    <p className="font-medium text-[#bbbbbb]">Adicione um link da imagem: {itensinfor.imgBook}</p>
                    <input className="outline-none border-b-1 border-[#bbbbbb]" onChange={(e)=> validimgBook(e)} type="text"/>
                    <button onClick={()=> sendInformation('imgBook', objectProduct.imgBook)} className="w-max px-6 lg:px-8 py-[.2em] lg:py-[.4em] font-bold text-white rounded-3xl bg-[#00ccbe] hover:bg-[#00ccbe]/50 cursor-pointer">send</button>
                </li>
            </ul>
            <button onClick={()=> deleteitemannounced('deleteItem', objectProduct.id)} className="w-max px-6 lg:px-8 py-[.2em] lg:py-[.4em] font-bold text-white rounded-3xl bg-[#00ccbe] hover:bg-[#00ccbe]/50 cursor-pointer">Exluir Item</button>
        </section>
    )
}

export default EditBook