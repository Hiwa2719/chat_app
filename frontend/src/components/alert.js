import React from "react";


const Alert = ({alertType, children}) => {
    return (
        <div className={`alert alert-${alertType}`}>
            {children}
        </div>
    )
}

export default Alert
