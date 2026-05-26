import axios from "axios"
import { useEffect, useState, useContext } from "react"
import DataCostum from "../../Settings/Custum"
import { Link } from "react-router-dom"
import { useAuth } from "@clerk/clerk-react"


//tipagem dos objetos que representam os produtos
type itensJson = {
    id            :  number, 
    autor     :  string,
    asin      :  string
    nameAutorBook :  string,
    titulo     :  string,
    preco_original     :  number,
    preco_desconto: number,
    url_capa        : string,
    description     : string
}

//interface que vai apresentar todos os produtos ao cliente ou visitante
const Allproducts= ()=>{
    const [itens, setItens] =useState <itensJson []>([])//armazena os produtos recebido na requisicao
    const {EmailUser, GetMensageInfor}= useContext(DataCostum)//pega o email do usuario
    const [isLoading, setLoading]= useState(false)
    const { getToken } = useAuth()
    
        //pegar token de autenticação
        const getTokenClerck= async ()=>{
            const token: any = await getToken();
            console.log("lista: ", token)
            return token
        }

    
    //deconto de preços
    function calcularPorcentagemDesconto(precoBruto: number, precoBaixo: number) {
        // Proteção para evitar divisão por zero se o preço bruto não existir
        if (!precoBruto || precoBruto === 0) return 0;

        // Aplica a fórmula
        const desconto = ((precoBruto - precoBaixo) / precoBruto) * 100;

        // .toFixed(2) limita a duas casas decimais e o Number() garante que volte a ser um número
        return Number(desconto.toFixed(2));
        }
          

    //faz uma requisicao para o edpoint geral para pegar os produtos
    useEffect(()=>{
        const connect= async ()=>{
            try {
                const connectResponseDescription= await axios.get(`https://ecommercebiblioteca.onrender/`,
                    {
                        headers: {
                        Authorization: `Bearer ${await getTokenClerck()}`, // ⚡ envia o token
                        },
                    }
                );

                setItens(connectResponseDescription.data.connectBD)

                if(connectResponseDescription.data){
                    setLoading(false)
                }

                console.log("dados retornado pela sistema: ", connectResponseDescription)
            } catch (err) {
              console.warn("erro ao altenticar usuario: ", err);
            }
        }

        connect()
    }, [])//vai ser acionando na entrada da rota


    //adiciona ao carrinho se o usuario estiver cadastrado caso contrario e apresentado uma mensagem de "usuario nao cadastrado"
    const AddinCart= async (id: number)=>{
        if(EmailUser !== ''){
            axios.post(`https://ecommercebiblioteca.onrender.com/addincart`, {product_id: id, emailUser: EmailUser}).then((response)=>{
            GetMensageInfor([<p className="text-[#bbbbbb]">Item added to cart!</p>])
            }).catch((err)=>{
                console.error(err)
            })
        }else{
            GetMensageInfor([<p className="text-[#bbbbbb]">User not registered!</p>])
        }
    }
    
    return(
        <ul className={`grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-3 items-center overflow-y-auto px-10 lg:px-20 py-10`}>
            {isLoading != true ? itens.map((itensinfor)=>(
                <li className="flex flex-col w-40 lg:w-50 gap-3" key={itensinfor.id}>
                        <Link to="/apress" state={{itensJson: itensinfor}}>
                        <div>
                            <p className="absolute bg-red-400 text-white rounded-[50%] py-[.6em] px-[.4em]">{calcularPorcentagemDesconto(itensinfor.preco_original, itensinfor.preco_desconto).toFixed(0)}%</p>
                            <img className="w-25 lg:w-40 mx-auto lg:mx-0" src={itensinfor.url_capa}/>
                        </div>
                        <h2 className="text-center lg:text-start my-2 overflow-x-hidden h-7 w-full font-bold">{itensinfor.titulo}</h2>
                        <div className="flex flex-col gap-2">
                            <h2 className="text-[.7em] lg:text-[.9em] text-center lg:text-start">{itensinfor.autor}</h2>
                            <div>
                                <p className="text-[1.5em] text-black text-center lg:text-start font-semibold">${itensinfor.preco_desconto}</p>
                                <p className="text-[1.1em] text-[#bbbbbb] text-center lg:text-start font-semibold line-through">${itensinfor.preco_original}</p>
                            </div>
                        </div>
                        </Link>
                        <button onClick={()=> AddinCart(itensinfor.id)} className="w-max text-[.8em] lg:text-[1em] mx-auto lg:mx-0 px-3 lg:px-8 py-[.2em] lg:py-[.4em] font-bold text-white rounded-3xl bg-[#00ccbe] hover:bg-[#00ccbe]/50 cursor-pointer">ADD cart</button>
                </li>
            )) : 
            <div className="w-full ml-20 flex flex-col justify-center items-center h-90">
             <img className="w-20" src="https://i.postimg.cc/kMsYQcRQ/geografia-1.gif"/>
            </div>}
        </ul>
    )
}

export default Allproducts