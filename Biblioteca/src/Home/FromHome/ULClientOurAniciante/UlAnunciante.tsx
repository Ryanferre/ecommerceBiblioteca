import axios from "axios"
import { useEffect, useState, useContext } from "react"
import DataCostum from "../../../Settings/Custum"

//tipagem do objetos recebido na requisicao
type itensJson = {
    id            :  number, 
    emailUser     :  string,
    nameAutorBook :  string,
    titleBook     :  string,
    priceBook     :  number,
    descriptionBook: string,
    imgBook        : string
}


//esse componente e apresentado somente ao usuarios cadastrado e que contem anuncios. Ele apresenta os produtos anunciado
const UlAnuciante= ()=>{
    const [itens, setItens] =useState <itensJson []>([])//guarda o array com os objetos
    const {EmailUser}= useContext(DataCostum)

    useEffect(()=>{
        axios.get(`http://localhost:3000/`).then((response)=>{
            setItens(response.data[0])
        }).catch((err)=>{
            console.error(err)
        })
    }, [])//vai ser acionando na entrada da pagina


    const AddinCart= async (id: number)=>{
        // verifica se contem registro de usuario cadastrado. string vasia significa que nao tem usuario cadastrado
         if(EmailUser !== ''){// se tiver, faz uma requisicao dos produtos cadastrado com o email do usuario
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
        <ul className={`grid grid-cols-2 lg:flex lg:flex-row overflow-scroll justify-around w-full py-10 px-15 gap-3 lg:gap-0`}>
            {itens.slice(0, 4).map((itensinfor)=>(
                <li className="flex flex-col gap-3" key={itensinfor.id}>
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

export default UlAnuciante