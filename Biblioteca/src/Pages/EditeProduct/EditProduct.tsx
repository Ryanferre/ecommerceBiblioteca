import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditBook= ()=>{
    const location = useLocation();
    const { itensinfor } = location.state || {}
    const navigate = useNavigate()

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

    const objectProduct= new objectDataProduct(null, '', '', '', null, '', '')

    const validNameAutor=(e: any)=>{
        objectProduct.nameAutorBook= e.target.value
    }

    const validTituloBook= (e: any)=>{
        objectProduct.titleBook= e.target.value
    }

    const validPriceBook= (e: any)=>{
        objectProduct.priceBook= e.target.value
    }

    const validDescriptionBook= (e: any)=>{
        objectProduct.descriptionBook= e.target.value
    }

    const validimgBook= (e: any)=>{
        objectProduct.imgBook= e.target.value
    }


    const sendInformation= async (e: any, i : any)=>{
        axios.post(`http://localhost:3000/EditeProduct?id=${itensinfor.id}&whatchInfor=${e}&information=${i}`).then((response)=>{
            console.warn(response)
        }).catch((err)=>{
            console.error(err)
        })
    }

    //deletar item 
    const deleteitenincart= (infor: string, id: number | null)=>{
            axios.post(`http://localhost:3000/EditeProduct?id=${itensinfor.id}&whatchInfor=${infor}&information=${id}`).then((response)=>{
                console.warn(response)
                navigate('/')
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
            <button onClick={()=> deleteitenincart('deleteItem', objectProduct.id)} className="w-max px-6 lg:px-8 py-[.2em] lg:py-[.4em] font-bold text-white rounded-3xl bg-[#00ccbe] hover:bg-[#00ccbe]/50 cursor-pointer">Exluir Item</button>
        </section>
    )
}

export default EditBook