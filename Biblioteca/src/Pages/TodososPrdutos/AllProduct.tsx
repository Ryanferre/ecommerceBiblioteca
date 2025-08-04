import axios from "axios"
import { useEffect, useState, useContext } from "react"
import DataCostum from "../../Settings/Custum"
import { Link } from "react-router-dom"


//tipagem dos objetos que representam os produtos
type itensJson = {
    id            :  number, 
    emailUser     :  string,
    nameAutorBook :  string,
    titleBook     :  string,
    priceBook     :  number,
    descriptionBook: string,
    imgBook        : string
}

//interface que vai apresentar todos os produtos ao cliente ou visitante
const Allproducts= ()=>{
    const [itens, setItens] =useState <itensJson []>([])//armazena os produtos recebido na requisicao
    const {EmailUser}= useContext(DataCostum)//pega o email do usuario
    const [isLoading, setLoading]= useState(false)

    //faz uma requisicao para o edpoint geral para pegar o produtos
    useEffect(()=>{
        setLoading(true)
        axios.get(`https://ecommercebiblioteca.onrender.com/`).then((response)=>{
            if(response){
                setLoading(false)
                setItens(response.data[0])
            }
        }).catch((err)=>{
            console.error(err)
        })
    }, [])//vai ser acionando na entrada da rota


    //adiciona ao carrinho se o usuario estiver cadastrado caso contrario e apresentado uma mensagem de "usuario nao cadastrado"
    const AddinCart= async (id: number)=>{
        if(EmailUser !== ''){
            axios.post(`https://ecommercebiblioteca.onrender.com/addincart`, {product_id: id, emailUser: EmailUser}).then((response)=>{
            console.warn(response)
            }).catch((err)=>{
                console.error(err)
            })
        }else{
            alert('Usuario nao cadastrado!')
        }
    }
    
    return(
        <ul className={`grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-3 items-center overflow-y-auto px-10 lg:px-20 py-10`}>
            {isLoading != true ? itens.map((itensinfor)=>(
                <li className="flex flex-col gap-3 w-40" key={itensinfor.id}>
                    <Link to="/apress" state={{itensJson: itensinfor}}>
                    <img className="w-25 lg:w-40 mx-auto lg:mx-0" src={itensinfor.imgBook}/>
                    <h2 className="text-center text-[.8em] lg:text-[.9em] lg:text-start">{itensinfor.titleBook}</h2>
                    <div className="flex flex-col gap-2">
                        <h3 className="text-[.7em] text-center lg:text-start lg:text-[.9em] font-bold">{itensinfor.nameAutorBook}</h3>
                        <p className="text-[1em] text-center lg:text-start text-[#bbbbbb] font-semibold">${itensinfor.priceBook}</p>
                    </div>
                    </Link>
                    <button onClick={()=> AddinCart(itensinfor.id)} className="w-max mx-auto lg:mx-0 px-6 lg:px-8 py-[.2em] lg:py-[.4em] font-bold text-white rounded-3xl bg-[#00ccbe] hover:bg-[#00ccbe]/50 cursor-pointer">ADD cart</button>
                </li>
            )) : 
            <div className="w-full ml-20 flex flex-col justify-center items-center h-90">
             <img className="w-20" src="https://i.postimg.cc/kMsYQcRQ/geografia-1.gif"/>
            </div>}
        </ul>
    )
}

export default Allproducts