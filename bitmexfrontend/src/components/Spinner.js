import { ClimbingBoxLoader } from 'react-spinners';
import React, { Component } from 'react';

const Spinner = () => {
    return (
        <div className="spinnercenter">
            <ClimbingBoxLoader sizeUnit={"px"} size={30} color={"#2185d0"} />
        </div>
    );
}

export default Spinner;