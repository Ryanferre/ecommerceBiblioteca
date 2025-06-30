import { Link } from "react-router-dom"

//esse componente e uma vercao mobile do banner e tambem leva a interface com os produtos
const BannerFromHomeMobile= ()=>{
    return(
        <section className="w-full flex lg:hidden pt-10 bg-[url(https://i.postimg.cc/9XsDnh92/Banner.png)] bg-cover bg-top-5 items-center px-10">
            <div className="flex flex-col gap-5 pb-10">
                <h1 className="text-2xl font-bold">Explore a world of knowledge without leaving home</h1>
                <p className="text-[.8em] text-[#bbbbbb] font-semibold">Buy and advertise new or used books with ease. Find great stories at low prices.</p>
                <Link to="/Allproducts" ><button className="w-max px-5 py-[.4em] font-bold text-white rounded-3xl bg-[#00ccbe] hover:bg-[#00ccbe]/50 cursor-pointer">Explore More</button></Link>
            </div>
        </section>
    )
}

export default BannerFromHomeMobile