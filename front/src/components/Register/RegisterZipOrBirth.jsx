import React, { useState } from 'react';

const RegisterZipOrBirth = ({isZip}) => {
    const regex = new RegExp(/^(?:2A|2B|\d{2})\d{3}$/)
    const [isZipTrue, setIsZipTrue]=useState(false)

    const checkZip = (value)=>{
        //CHECK IF THIS INPUT GETS ZIPCODE VALUE
        if(isZip === true){
            if(regex.test(value)){
                setIsZipTrue(true)
                console.log(isZipTrue)
            }
            else{
                setIsZipTrue(false)
                console.log(isZipTrue)
            }
        }
    }
    const returnStr = ()=>{
        if(isZip === true)return "zipCode"
        if(isZip === false)return "birthYear"
    }
    return (
        <div className='register-zipCode'>
            <div className='register-container'>
                <div className='register-container__label'>
                    <label htmlFor={returnStr}>
                        {isZip === true ? "ZIP code: " : "Birth year: "} 
                    </label>
                </div>
                <input
                type="text"
                name={returnStr}
                id={returnStr}
                onChange={(e)=>checkZip(e.target.value)}
                />
            </div>
        </div>
    );
};

export default RegisterZipOrBirth;