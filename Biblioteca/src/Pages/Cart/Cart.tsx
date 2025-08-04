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

type CepData= {
    cep: string,
    regiao: string,
    logradouro: string,
    localidade: string,
    estado: string,
    uf: string
}

//componente de interface do carrinho
const Cart= ()=>{
    const [itensUser, setItens] =useState <itensJson []>([])// armazena os produtos
    const [cartInforItens, setInfor]= useState<itensinfor []>([])// armazena os objetos de relacionamento
    const {EmailUser}= useContext(DataCostum)//pega o email que foi armazenando em uma chave no context
    const [ResApi, SetRes]= useState<CepData>({ cep: "", regiao: "", logradouro: "", localidade: "", estado: "", uf: ""})
    const [Qrcode, setQR]= useState<any>([''])
    const [Price, setPrice]= useState(0)
    const [Pricefrete, setPriceFrete]= useState(0)
    const [Cep, setCep]= useState("")

    useEffect(()=>{
         const requisitionServer= async ()=>{
            if(EmailUser != ''){//verifica se o email existe se sim, e feito uma requisicao passando o email
                axios.get(`https://ecommercebiblioteca.onrender.com/getcart?email=${EmailUser}`).then((response)=>{
                setItens(response.data[0])
                setInfor(response.data[1])
                }).catch((err)=>{
                    console.error(err)
                })

                const getQR= await axios.get('https://qrcode-5bpy.onrender.com/codeqrgenerate')
                    setQR([getQR.data])
            }
         }

         requisitionServer()

    }, [EmailUser])

    useEffect(()=>{
        if(itensUser){
            const SomPrice= itensUser.reduce((Ac, atual)=> Ac + atual.priceBook, 0)
            setPrice(SomPrice)
        }
    }, [itensUser])

    //deletar item
    const deleteitenincart= (id: number)=>{
        const itemdeleted = cartInforItens.find(item => item.product_id === id)
            if(itemdeleted){
                axios.post(`https://ecommercebiblioteca.onrender.com/deletitencart?idDelete=${itemdeleted.id}`).then((response)=>{
                    if(response){
                        axios.get(`https://ecommercebiblioteca.onrender.com/getcart?email=${EmailUser}`).then((response)=>{
                        setItens(response.data[0])
                        setInfor(response.data[1])
                    })
                    }
                }).catch((err)=>{
                    console.error(err)
                })
            }
    
    }

    const cepRequerid= /^[0-9]{8}$/

    const validCep= (e: any)=>{
        const cepDigit= e.target.value
        if(cepRequerid.test(cepDigit)){
            setCep(e.target.value)
        }
    }

    //se estiver tudo ok com o cep, verifique e puxe informacoes do viacep
    useEffect(()=>{
        const getCep= async ()=>{
            await axios.get(`https://viacep.com.br/ws/${Cep}/json/`).then(
                (e)=>{
                    SetRes(e.data)
                    console.log(e.data)
                }
            ).catch((err)=>{
                console.log(err)
            })
        }
        getCep()
    }, [Cep])

    //recebeu as informacoes de cep, envie para verificacao de frete no back-end
    useEffect(()=>{
      const sendData= async ()=>{
           await axios.post('https://api-frete-furniro.onrender.com/checkout?',{
          location: ResApi.localidade,
          state: ResApi.estado,
          cep: ResApi.cep
          }).then(
            (e)=>{
              setPriceFrete(e.data)
            }
          ).catch((error)=>{
            console.log(error)
          })
      }
      sendData()
    }, [ResApi.cep])
    
    return(
        <section className="flex flex-col lg:flex-row px-5 lg:px-10 py-10">
            <ul className={`grid grid-cols-2 lg:flex lg:flex-row overflow-scroll w-full py-10 px-0 lg:px-15 gap-3`}>
            {itensUser !== undefined && itensUser.length > 0 ? itensUser.map((itensinfor)=>(
                <li className="flex flex-col gap-3 w-40" key={itensinfor.id}>
                    <img className="w-25 lg:w-40 mx-auto lg:mx-0" src={itensinfor.imgBook}/>
                    <h2 className="text-center">{itensinfor.nameAutorBook}</h2>
                    <div className="flex flex-col gap-2">
                        <h2 className="text-[.7em] lg:text-[.9em] text-center font-bold">{itensinfor.titleBook}</h2>
                        <p className="text-[1em] text-[#bbbbbb] text-center font-semibold">R${itensinfor.priceBook}</p>
                    </div>
                    <button onClick={()=> deleteitenincart(itensinfor.id)} className="w-max mx-auto px-6 lg:px-8 py-[.2em] lg:py-[.4em] font-bold text-white rounded-3xl bg-[#00ccbe] hover:bg-[#00ccbe]/50 cursor-pointer">Delete</button>
                </li>
            )) : <p className="text-[1em] text-[#bbbbbb] font-semibold mx-auto my-auto">Empty cart</p>}
            </ul>
         <div className="w-max px-5 lg:px-10 py-4 h-max flex flex-row lg:flex-col lg:items-center justify-center m-auto gap-4 lg:gap-9 rounded-[15px]">
           <div className="flex flex-row justify-between rounded-[5px] w-34 lg:w-50">
            <ul>
                <li><p className="text-[1em] text-[#bbbbbb] font-semibold">Total</p></li>
                <li><p className="text-[1em] text-[#bbbbbb] font-semibold">Quant</p></li>
                <li><p className="text-[1em] text-[#bbbbbb] font-semibold">Freight</p></li>
            </ul>
            <ul>
                <li><p className="text-[1em] text-[#bbbbbb] font-semibold">R${Price}</p></li>
                <li><p className="text-[1em] text-[#bbbbbb] font-semibold">{itensUser !== undefined ? itensUser.length : 0}</p></li>
                <li><p className="text-[1em] text-[#bbbbbb] font-semibold">{Pricefrete}</p></li>
            </ul>
           </div>
           <div className="flex flex-col items-center gap-2">
            <label className="flex flex-row gap-5">
             <p className="text-[1em] text-[#bbbbbb] font-semibold">Cep</p>
             <input className="border h-8 rounded-[5px] border-[#bbbbbb] w-38 pl-[6px] outline-none" type="text" onChange={validCep} />
            </label>
            <h1 className="text-[20px] text-center w-full h-max text-[#00ccbe] font-bold">Payment via pix</h1>
            <img src={Qrcode} />
           </div>
         </div>
        </section>
    )
}

export default Cart