import axios from "axios"
import { useEffect, useState, useContext } from "react"
import DataCostum from "../../../Settings/Custum"
import { Link } from "react-router-dom"

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


// esse componente so e apresentado aos clientes ou visitantes
const UlCliente= ()=>{
    const [itens, setItens] =useState <itensJson []>([])// guarda o array com os objetos
    const {EmailUser}= useContext(DataCostum)

    useEffect(()=>{
        if(EmailUser != ''){
            axios.get(`http://localhost:3000/?email=${EmailUser}`).then((response)=>{
            setItens(response.data[0])//pega o primeiro array(que contem os produtos)
            }).catch((err)=>{
                console.error(err)
            })
        }else{
            console.error('error')
        }
    }, [])//vai ser acionando na entrada da pagina
    
    return(
        <ul className={`grid grid-cols-2 lg:flex lg:flex-row overflow-scroll w-full py-10 px-15 gap-3`}>
            {itens.slice(0, 4).map((itensinfor)=>(
                <li className="flex flex-col gap-3 w-40" key={itensinfor.id}>
                    <img className="w-25 lg:w-40 mx-auto lg:mx-0" src={itensinfor.imgBook}/>
                    <h2>{itensinfor.nameAutorBook}</h2>
                    <div className="flex flex-col gap-2">
                        <h2 className="text-[.7em] lg:text-[.9em] font-bold w-full h-20">{itensinfor.titleBook}</h2>
                        <p className="text-[1em] text-[#bbbbbb] font-semibold">${itensinfor.priceBook}</p>
                    </div>
                    <Link to="/Edite" state={{itensinfor}}><button className="w-max px-6 lg:px-8 py-[.2em] lg:py-[.4em] font-bold text-white rounded-3xl bg-[#00ccbe] hover:bg-[#00ccbe]/50 cursor-pointer">Editar</button></Link>
                </li>
            ))}
        </ul>
    )
}

export default UlCliente