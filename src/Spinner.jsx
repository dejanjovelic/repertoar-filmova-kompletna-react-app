import React from "react";
import "./style.scss"

const Spinner = () => {

    return (
            <div className="spinner-wrapper">
                <div className="spinner"></div>
                <div className="spinner-text">Loading...</div>
            </div>
    );
}

export default Spinner;