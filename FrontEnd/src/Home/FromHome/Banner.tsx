import { Link } from "react-router-dom"


//esse componente apresenta o banner e leva a interface que apresenta os produtos
const BannerFromHome= ()=>{
    return(
        <section className="w-full hidden lg:grid grid-cols-2 pt-10 items-center px-20 gap-40">
            <div className="flex flex-col gap-5">
                <h1 className="text-5xl font-bold">Explore um mundo de conhecimento sem sair de casa</h1>
                <p className="text-[1em] text-[#bbbbbb] font-semibold">Monte o seu carrinho perfeito. Unimos os estoques mais confiáveis do Brasil para garantir frete grátis e promoções exclusivas para a sua estante.</p>
                <Link to="/Allproducts" ><button className="w-max px-5 py-[.4em] font-bold text-white rounded-3xl bg-[#00ccbe] hover:bg-[#00ccbe]/50 cursor-pointer">Explore Mais</button></Link>
            </div>
            <img className="w-110" src="https://i.postimg.cc/9XsDnh92/Banner.png"/>
        </section>
    )
}

export default BannerFromHome