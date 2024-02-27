import React from 'react';
import './Buttons.css'


const ChooseMessangerButton = ({ children,...props}) => {
    return (
        <button {...props} className="msgBtn" >
            {children}
        </button>
    )
}
export default ChooseMessangerButton;