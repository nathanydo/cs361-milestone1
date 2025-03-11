import React from 'react'
import { SideMenuData } from './SideMenuData'

const SideMenu = () => {
  return (
    <div className="bg-white border-2 rounded-lg border-lime-500 text-black w-48 h-auto mt-32 justify-center">
        <ul className="flex flex-col w-full">
      {SideMenuData.map((item, index) => {
        const isFirstItem = index === 0;
        const isLastItem = index === SideMenuData.length - 1;
        return (
                <li key={index} 
                    onClick={()=> {window.location.pathname = item.link}}
                    className={`p-4 cursor-pointer hover:bg-gray-200 ease-in-out transition-all ${isFirstItem ? "rounded-t-lg" : ''} ${isLastItem ? "rounded-b-lg" : ''}`}
                >
                    <div>{item.title}</div>
                </li>
        )
      })}
        </ul>
    </div>
  )
}

export default SideMenu
