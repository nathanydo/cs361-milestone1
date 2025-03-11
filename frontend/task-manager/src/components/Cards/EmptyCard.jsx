import React from 'react';
import tripleBamboo from '../../assets/images/triple_bamboo.webp'

const EmptyCard = ({message, button }) => {
    return (
        <div>
            <div className="flex items-center justify-center relative right-19">
                <div className="text-center max-w-2xl h-70 w-100 p-5 bg-white shadow-lg rounded-md">
                    <img src={tripleBamboo} alt="empty_card" className="h-30 w-30 mx-auto"/>
                    <span className="m-2 text-gray-600 text-base block">{message}</span>
                    {button}
                </div>
            </div>
        </div>
    )
}

export default EmptyCard;