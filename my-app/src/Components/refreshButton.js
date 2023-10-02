//axios call to api to get songs of user from input time stamp forward
import React, { useState, useEffect } from "react";

function refreshButton(props) {

    const handleButtonClick = () => {
        console.log(`User ID is: ${props.userId} from button click`);
    
    };

    return (
        <button onClick={handleButtonClick}>
            Refresh Data
        </button>
    );
}

export default refreshButton;