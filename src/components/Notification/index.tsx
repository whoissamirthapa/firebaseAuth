import React from "react"

const Notification: React.FC<{title?: string, message?: string}> = ({title= "", message= ""})=>{
    return(
        <>
        {
        <section className="absolute bg-[#3b3b3b] top-2 w-full sm:w-[400px] p-3 pb-5 sm:min-w-[400px] left-[50%] -translate-x-1/2 rounded">
            <div className="text-start text-white">{title}</div>
            <div className="text-sm text-gray-400 text-start">{message}</div>
        </section>
        }
        
        </>
    )
}

export default Notification;