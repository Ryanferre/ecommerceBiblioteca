import { useContext } from "react"
import DataCostum from "../../Settings/Custum"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

type TypeObjectBook= {
    emailUser     :  string | null;
    nameAutorBook :  string;
    titleBook     :  string;
    priceBook     :  number | null;
    descriptionBook: string;
    imgBook        : string
}

//Componente para anunciar um novo produto
const Anuncio= ()=>{
    const {EmailUser, GetMensageInfor}= useContext(DataCostum)//pega o email do usuario no context
    const navigate = useNavigate()//hook para sair da rota apos determinada acao
    const [isLoading, setLoading]= useState(false)
    const [objectBook, setObject]= useState<TypeObjectBook | undefined>()

    //class que representa o produto
    class objectDataProduct{
        emailUser     :  string | null;
        nameAutorBook :  string;
        titleBook     :  string;
        priceBook     :  number | null;
        descriptionBook: string;
        imgBook        : string

        constructor( emailUser: '', nameAutorBook: '', titleBook: '', priceBook: null, descriptionBook: '', imgBook: ''){
            this.emailUser= emailUser,
            this.nameAutorBook= nameAutorBook,
            this.titleBook= titleBook,
            this.priceBook= priceBook,
            this.descriptionBook= descriptionBook,
            this.imgBook= imgBook

        }
    }


    useEffect(()=>{
        //instancia da classe
        const objectProduct= new objectDataProduct('', '', '', null, '', '')
        setObject(objectProduct)
    }, [])

    //pega o nome do altor
    const validNameAutor=(e: any)=>{
        if(objectBook != undefined){
            objectBook.nameAutorBook= e.target.value
        }
    }

    //pega o titulo do livro
    const validTituloBook= (e: any)=>{
        if(objectBook != undefined){
            objectBook.titleBook= e.target.value
        }
    }

    const Price= /^\d+(\.\d{1,2})?$/


    //pega o preco do livro
    const validPriceBook= (e: any)=>{
        if(Price.test(e.target.value) && objectBook != undefined){
            objectBook.priceBook= e.target.value
        }else{
            GetMensageInfor([<p className="text-[#bbbbbb]">Preco Invalido!</p>])
        }
    }


    //pega a descricao
    const validDescriptionBook= (e: any)=>{
        if(objectBook != undefined){
            objectBook.descriptionBook= e.target.value
        }
    }


    //pega a url da imagem do livro
    const validimgBook= (e: any)=>{
        if(objectBook != undefined){
            objectBook.imgBook= e.target.value
        }
    }

    //botao para adicionar o email a chave "email" no objeto e envia-lo para o back-end
    const BtnSend= async ()=>{

        if(objectBook != undefined && objectBook.descriptionBook !== "" && objectBook.titleBook !== "" && objectBook.priceBook !== null && objectBook.nameAutorBook !== "" && objectBook.imgBook !== ""){
            objectBook.emailUser= EmailUser
            setLoading(true)
            try {
            const res = await axios.post('https://ecommercebiblioteca.onrender.com/postProduto', objectBook);
            if(res){
                navigate('/')//sai da rota em direcao a interface "Home"
            }
            } catch (erro) {
                console.error('Erro ao cadastrar:', erro)
                setLoading(false)
                GetMensageInfor([<p className="text-[#bbbbbb]">Deu algo de errado. Não se preocupe, não é você, sou eu...</p>])
            }
        }else{
            GetMensageInfor([<p className="text-[#bbbbbb]">Algo deu errado com os campos. Revise!</p>])
            console.log(objectBook)
        }
    }

    return(
        <section className="shadow-2xl rounded-2xl w-max mx-auto my-5 py-5 px-10 flex flex-col gap-5">
            {isLoading != true ?
            <>  
                <ul className="w-100">
                    <li>
                        <p className="font-medium text-[#bbbbbb]">Author's name</p>
                        <input className="outline-none w-full border-b-1 border-[#bbbbbb]" onChange={(e)=> validNameAutor(e)} type="text"/>
                    </li>
                    <li>
                        <p className="font-medium text-[#bbbbbb]">Book title</p>
                        <input className="outline-none w-full border-b-1 border-[#bbbbbb]" onChange={(e)=> validTituloBook(e)} type="text"/>
                    </li>
                    <li>
                        <p className="font-medium text-[#bbbbbb]">Book price</p>
                        <input className="outline-none w-full border-b-1 border-[#bbbbbb]" onChange={(e)=> validPriceBook(e)} type="text"/>
                    </li>
                    <li>
                        <p className="font-medium text-[#bbbbbb]">Enter a description</p>
                        <textarea className="outline-none w-full h-50 border-1 rounded-[.4em] border-[#bbbbbb]" onChange={(e)=> validDescriptionBook(e)}/>
                    </li> 
                    <li>
                        <p className="font-medium text-[#bbbbbb]">Add a link to the image (<a className="text-blue-600 font-bold" href="https://postimages.org/">Don't have the link? Host the image here!</a>)</p>
                        <input className="outline-none w-full border-b-1 border-[#bbbbbb]" onChange={(e)=> validimgBook(e)} type="text"/>
                    </li>
                </ul>
                <button onClick={BtnSend} className="w-max px-6 lg:px-8 py-[.2em] lg:py-[.4em] font-bold text-white rounded-3xl bg-[#00ccbe] hover:bg-[#00ccbe]/50 cursor-pointer">send</button>
            </> :
             <div className="w-100 flex flex-col justify-center items-center h-80">
                <img className="w-30" src="https://i.postimg.cc/kMsYQcRQ/geografia-1.gif"/>
             </div>}
        </section>
    )
}

export default Anuncio