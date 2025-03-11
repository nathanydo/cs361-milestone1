import React, {useEffect, useState} from 'react';
import { LuCheck } from 'react-icons/lu';
import { MdDeleteOutline, MdOutlinePushPin } from 'react-icons/md';
import { subscribeToToasts } from '../../utils/toastService'

const Toast = () => {
    const [isShown, setIsShown] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('')

    useEffect(() => {
      const unsubscribe = subscribeToToasts(({ message, type }) => {
        setMessage(message);
        setType(type);
        setIsShown(true);
        setTimeout(() => {
            setIsShown(false);
        }, 3000);
      });

      return () => {
        unsubscribe();
      };
    },[]);
    
    return (
        <div className={`absolute top-25 right-5 transition-all duration-400 ${
            isShown ? "opacity-100" : "opacity-0"}`}
            >
            <div 
                className={`min-w-52 bg-white border shadow-lg rounded-lg after:w-[5px] after:h-full ${
                    type === "delete" ? ("after:bg-red-500") : type === "update" ? ("after:bg-yellow-500") : ("after:bg-lime-500")}
                after:absolute after:left-0 after:top-0 after:rounded-l-lg`}>
            
            <div className="flex items-center gap-3 py-2 px-4">
                <div className={`w-10 h-10 flex items-center justify-center rounded-full ${
                    type === "delete" ? ("bg-red-200/75") : type === "update" ? ("bg-yellow-200/75") : ("bg-lime-200/75")}`}>
                    {type === "delete" ? (<MdDeleteOutline className = "text-xl text-red-500"/>) : type === "update" ? (<MdOutlinePushPin className="text-xl text-yellow-500"/>) : (<LuCheck className="text-xl text-lime-600"/>)}
                </div>
                <p className="text-sm text-slate-800">{message}</p>
            </div>
        </div>
    </div>
    )
}

export default Toast;