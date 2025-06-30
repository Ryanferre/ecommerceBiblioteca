import { Link } from "react-router-dom"


//esse componente apresenta o banner e leva a interface que apresenta os produtos
const BannerFromHome= ()=>{
    return(
        <section className="w-full hidden lg:grid grid-cols-2 pt-10 items-center px-20 gap-40">
            <div className="flex flex-col gap-5">
                <h1 className="text-5xl font-bold">Explore a world of knowledge without leaving home</h1>
                <p className="text-[1em] text-[#bbbbbb] font-semibold">Buy and advertise new or used books with ease. Find great stories at low prices.</p>
                <Link to="/Allproducts" ><button className="w-max px-5 py-[.4em] font-bold text-white rounded-3xl bg-[#00ccbe] hover:bg-[#00ccbe]/50 cursor-pointer">Explore More</button></Link>
            </div>
            <img className="w-110" src="https://i.postimg.cc/9XsDnh92/Banner.png"/>
        </section>
    )
}

export default BannerFromHome