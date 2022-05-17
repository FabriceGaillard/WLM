import React, { useState } from 'react';

const RegisterZipOrBirth = ({isZip, user, setUser}) => {
    //REGEX TO FILTER ZIPCODE VALUE
    const regex = new RegExp(/^(?:2A|2B|\d{2})\d{3}$/)
    //STATE TO ALLOW TO DISPLAY ERROR MESSAGE
    const [zipError, setZipError]=useState(false)

    const checkZip = (value)=>{
        //CHECK IF THIS INPUT GETS ZIPCODE VALUE
        //OR BIRTH YEAR VALUE
        if(isZip === true){
            if(regex.test(value)){
                setZipError(false)
                let newUser = [...user]
                newUser[0].zipCode = value
                setUser(()=>newUser)
            }
            else{
                setZipError(true)
            }
        }
    }
    //ALLOW TO BUILD 2 DIFFERENT COMPONENTS
    //ONE FOR GETTING ZIPCODE VALUE
    //ONE FOR GETTING BIRTH YEAR VALUE
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
                onBlur={(e)=>checkZip(e.target.value)}
                />
            </div>
            {zipError === true && <span>Veuillez inscrire un code postal valide</span>}
        </div>
    );
};

export default RegisterZipOrBirth;