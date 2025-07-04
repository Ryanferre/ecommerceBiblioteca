import axios from "axios"
import { useEffect, useState, useContext } from "react"
import DataCostum from "../../Settings/Custum"


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

    //faz uma requisicao para o edpoint geral para pegar o produtos
    useEffect(()=>{
        axios.get(`http://localhost:3000/`).then((response)=>{
            setItens(response.data[0])
        }).catch((err)=>{
            console.error(err)
        })
    }, [])//vai ser acionando na entrada da rota


    //adiciona ao carrinho se o usuario estiver cadastrado caso contrario e apresentado uma mensagem de "usuario nao cadastrado"
    const AddinCart= async (id: number)=>{
        if(EmailUser !== ''){
            axios.post(`http://localhost:3000/addincart`, {product_id: id, emailUser: EmailUser}).then((response)=>{
            console.warn(response)
            }).catch((err)=>{
                console.error(err)
            })
        }else{
            alert('Usuario nao cadastrado!')
        }
    }
    
    return(
        <ul className={`grid grid-cols-4 gap-3 items-center px-20 py-10`}>
            {itens.map((itensinfor)=>(
                <li className="flex flex-col gap-3 w-40" key={itensinfor.id}>
                    <img className="w-25 lg:w-40 mx-auto lg:mx-0" src={itensinfor.imgBook}/>
                    <h2>{itensinfor.nameAutorBook}</h2>
                    <div className="flex flex-col gap-2">
                        <h2 className="text-[.7em] lg:text-[.9em] font-bold">{itensinfor.titleBook}</h2>
                        <p className="text-[1em] text-[#bbbbbb] font-semibold">${itensinfor.priceBook}</p>
                    </div>
                    <button onClick={()=> AddinCart(itensinfor.id)} className="w-max px-6 lg:px-8 py-[.2em] lg:py-[.4em] font-bold text-white rounded-3xl bg-[#00ccbe] hover:bg-[#00ccbe]/50 cursor-pointer">ADD cart</button>
                </li>
            ))}
        </ul>
    )
}

export default Allproducts