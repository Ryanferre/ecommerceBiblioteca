import axios from "axios"
import { useEffect, useState, useContext } from "react"
import DataCostum from "../../../Settings/Custum"
import { Link } from "react-router-dom"

//tipagem do objetos recebido na requisicao
export type itensJson = {
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
    //guarda o array com os objetos
    const [itens, setItens] =useState <itensJson []>([])
    const {EmailUser}= useContext(DataCostum)
    const [isLoading, setLoading]= useState(false)

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
    }, [])//vai ser acionando na entrada da pagina


    const AddinCart= async (id: number)=>{
        // verifica se contem registro de usuario cadastrado. string vasia significa que nao tem usuario cadastrado
         if(EmailUser !== ''){// se tiver, faz uma requisicao dos produtos cadastrado com o email do usuario
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
        <section className="px-5 lg:px-20 py-5">
            <h3 className="text-[.7em] lg:text-[1.5em] font-bold">Highlight of the week</h3>
            <ul className={`grid grid-cols-2 lg:flex lg:flex-row overflow-scroll justify-between w-full py-10 px-5 lg:px-0 gap-3 lg:gap-0`}>
                {isLoading != true ? itens.slice(0, 4).map((itensinfor)=>(
                    <li className="flex flex-col w-40 lg:w-50 gap-3" key={itensinfor.id}>
                        <Link to="/apress" state={{itensJson: itensinfor}}>
                        <img className="w-25 lg:w-40 mx-auto lg:mx-0" src={itensinfor.imgBook}/>
                        <h2 className="text-center lg:text-start">{itensinfor.titleBook}</h2>
                        <div className="flex flex-col gap-2">
                            <h2 className="text-[.7em] lg:text-[.9em] text-center lg:text-start font-bold">{itensinfor.nameAutorBook}</h2>
                            <p className="text-[1em] text-[#bbbbbb] text-center lg:text-start font-semibold">${itensinfor.priceBook}</p>
                        </div>
                        </Link>
                        <button onClick={()=> AddinCart(itensinfor.id)} className="w-max text-[.8em] lg:text-[1em] mx-auto lg:mx-0 px-3 lg:px-8 py-[.2em] lg:py-[.4em] font-bold text-white rounded-3xl bg-[#00ccbe] hover:bg-[#00ccbe]/50 cursor-pointer">ADD cart</button>
                    </li>
                )) : 
                <div className="w-full ml-20 flex flex-col justify-center items-center h-80">
                 <img className="w-20" src="https://i.postimg.cc/kMsYQcRQ/geografia-1.gif"/>
                </div>}
            </ul>
            <section className="flex flex-col gap-3">
                <h4 className="text-[.7em] lg:text-[1.5em] font-bold">Renowned authors</h4>
                <ul className="flex flex-row overflow-x-scroll gap-5 lg:gap-15">
                    <li>
                        <div className="w-40 lg:w-70">
                            <img className="w-60" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtssegJhurAmHMk0rtqRmVpuHi0jyTWvRXKgrQOc37LCN4QqDLIgnGhwAFS4i9HjR1dxWIGZ7CgTsrS4R7IaDwgecRuJi5Pg"/>
                            <p className="text-[1em] text-[#bbbbbb] font-semibold">J. R. R. Tolkien</p>
                            <div className="flex flex-col lg:flex-row gap-0 lg:gap-2">
                                <p className="text-[1em] text-black font-semibold">successful work:</p>
                                <p className="text-[1em] text-[#bbbbbb] font-semibold">Lord of the Rings</p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="w-40 lg:w-70">
                            <img className="w-60 h-36 lg:h-53" src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTVkg-OAvrOVtUiIw_qzCV3gP_m04x6giIFa1V4mDtWqDKAO6y3D9hGYtOSTC8ARaPfhspsGMqI4621mEZ1aA8Gt9UYGtxGUw"/>
                            <p className="text-[1em] text-[#bbbbbb] font-semibold">Eduardo Spohr</p>
                            <div className="flex flex-col lg:flex-row gap-0 lg:gap-2">
                                <p className="text-[1em] text-black font-semibold">successful work:</p>
                                <p className="text-[1em] text-[#bbbbbb] font-semibold">Children of Eden</p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="w-40 lg:w-70">
                            <img className="w-60 h-36 lg:h-53" src="data:image/webp;base64,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"/>
                            <p className="text-[1em] text-[#bbbbbb] font-semibold">S. D. Perry</p>
                            <div className="flex flex-col lg:flex-row gap-0 lg:gap-2">
                                <p className="text-[1em] text-black font-semibold">successful work:</p>
                                <p className="text-[1em] text-[#bbbbbb] font-semibold">Resident Evil</p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="w-40 lg:w-70">
                            <img className="w-60 h-36 lg:h-53" src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRh1w6qc6Ln8PjySNZQ3cCPXxQaN3qTMAD1GQw9k7jTjMvvJh99mFKMQ7aA0o-joqRxVvTfn6wZnyUe-LdQ7ANsWSFzNxaUxXHpMBCL4yh4"/>
                            <p className="text-[1em] text-[#bbbbbb] font-semibold">J. K. Rowling</p>
                            <div className="flex flex-row gap-0 lg:gap-2">
                                <p className="text-[1em] text-black font-semibold">successful work:</p>
                                <p className="text-[1em] text-[#bbbbbb] font-semibold">Harry Potter</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </section>
        </section>
    )
}

export default UlAnuciante