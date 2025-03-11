import React from "react"

const PageDescription = () => {
    return (
       <div className="flex items-center justify-center m-8">
            <div className="text-center max-w-md bg-white m-2 p-3 rounded-md border border-emerald-700">
                <h2 className="text-2xl font-medium text-black">Welcome to ZenTask!</h2>
                <span className="m-2 text-gray-600 text-base block">Manage your tasks efficiently and get your day in order! 
                    ZenTask helps you stay organized and productive with easy-to-use task management features.
                    Sign up or log in to start managing your tasks today!</span>
            </div>
        </div>
    )
}

export default PageDescription;