import { useContext } from 'react'
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/clerk-react'
import DataCostum from '../../../Settings/Custum'
import LikinForUser from './searchLikin'


const NavFromHeader= ()=>{
  const {MoveModalMenu, ModalViewMenu}= useContext(DataCostum)

  const ModalMenuVisibleOurNone= ()=>{
        if(ModalViewMenu == 'top-12'){
            MoveModalMenu('-top-90')
        }else{
            MoveModalMenu('top-12')
        }
    }
    return(
        <nav className="flex flex-row w-max lg:w-full justify-between items-center">
            <ul className="hidden lg:flex flex-row gap-5">
                <LikinForUser />
            </ul>
            <div className="w-max hidden lg:flex flex-row gap-3">
              <SignedIn>
                <UserButton/>
              </SignedIn>
              <SignedOut>
               <SignInButton>
                <button className="px-5 py-[.4em] font-bold text-[#bbbbbb] hover:text-white rounded-3xl hover:bg-[#00ccbe]/50 cursor-pointer">
                  Login
                </button>
               </SignInButton>
              </SignedOut>
              <SignedOut>
              <SignInButton>
                <button className="px-5 py-[.4em] font-bold text-[#bbbbbb] hover:text-white rounded-3xl hover:bg-[#00ccbe]/50 cursor-pointer">
                  Login
                </button>
              </SignInButton>
              </SignedOut>
            </div>
            <button className="flex lg:hidden z-30 cursor-pointer" onClick={ModalMenuVisibleOurNone}>
              <img className="w-[2em]" src='https://i.postimg.cc/25nWkh0S/menu-aberto.png'/>
            </button>
        </nav>
    )
}

export default NavFromHeader