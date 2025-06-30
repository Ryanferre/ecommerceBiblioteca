import axios from "axios"
import { useEffect, useContext, useState } from "react"
import DataCostum from "../../Settings/Custum"

//o edpoint "getcart" retorna dois arrays de objetos
// um com os produtos e outros com objetos de relacionamento entre
//o usuario e o item que deseja comprar

//produtos
type itensJson = {
    id            :  number, 
    emailUser     :  string,
    nameAutorBook :  string,
    titleBook     :  string,
    priceBook     :  number,
    descriptionBook: string,
    imgBook        : string
}

//objeto de relacionamento
type itensinfor ={
    id              : number,
    emailUser       : string,
    product_id      : number
}


//componente de interface do carrinho
const Cart= ()=>{
    const [itensUser, setItens] =useState <itensJson []>([])// armazena os prdutos
    const [cartInforItens, setInfor]= useState<itensinfor []>([])// armazena os objetos de relacionamento
    const {EmailUser}= useContext(DataCostum)//pega o email que foi armazenando em uma chave no context

    useEffect(()=>{
         if(EmailUser != ''){//verifica se o meil existe se sim, e feito uma requisicao passando o email
            axios.get(`http://localhost:3000/getcart?email=${EmailUser}`).then((response)=>{
            setItens(response.data[0])
            setInfor(response.data[1])
            }).catch((err)=>{
                console.error(err)
            })
         }
    }, [EmailUser])

    //deletar item
    const deleteitenincart= (id: number)=>{

        //esse for faz uma comparacao entre o id do item que deseja deletar e o 
        for(let i=0; i < cartInforItens.length; i++){
            if(cartInforItens[i].product_id == id){

                axios.post(`http://localhost:3000/deletitencart?idDelete=${cartInforItens[i].id}`).then((response)=>{
                if(response){
                    axios.get(`http://localhost:3000/getcart?email=${EmailUser}`).then((response)=>{
                    setItens(response.data[0])})
                }
                }).catch((err)=>{
                    console.error(err)
                })
            }
        }
    
    }
    
    return(
        <section>
            <ul className={`grid grid-cols-2 lg:flex lg:flex-row overflow-scroll w-full py-10 px-15 gap-3`}>
            {itensUser !== undefined && itensUser.length > 0 ? itensUser.map((itensinfor)=>(
                <li className="flex flex-col gap-3 w-40" key={itensinfor.id}>
                    <img className="w-25 lg:w-40 mx-auto lg:mx-0" src={itensinfor.imgBook}/>
                    <h2>{itensinfor.nameAutorBook}</h2>
                    <div className="flex flex-col gap-2">
                        <h2 className="text-[.7em] lg:text-[.9em] font-bold">{itensinfor.titleBook}</h2>
                        <p className="text-[1em] text-[#bbbbbb] font-semibold">${itensinfor.priceBook}</p>
                    </div>
                    <button onClick={()=> deleteitenincart(itensinfor.id)} className="w-max px-6 lg:px-8 py-[.2em] lg:py-[.4em] font-bold text-white rounded-3xl bg-[#00ccbe] hover:bg-[#00ccbe]/50 cursor-pointer">Excluir</button>
                </li>
            )) : <p>Carrinho vasio</p>}
            </ul>
        </section>
    )
}

export default Cart