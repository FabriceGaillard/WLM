import React, { useState } from 'react';

const RegisterZipOrBirth = ({isZip, user, setUser}) => {
    //COPY OF GLOBAL STATE
    let newUser = [...user]
    //REGEX TO FILTER ZIPCODE VALUE
    const regexZip = new RegExp(/^(?:2A|2B|\d{2})\d{3}$/)
    const regexBirth = new RegExp(/^[\d]{4}$/)
    //STATE TO ALLOW TO DISPLAY ERROR MESSAGE
    const [zipError, setZipError]=useState("")
    const [birthError, setBirthError]=useState("")

    const checkZip = (value)=>{
        //CHECK IF THIS INPUT GETS ZIPCODE VALUE
        //OR BIRTH YEAR VALUE
        if(value){
            setZipError("")
            setBirthError("")
            if(isZip === true){
                if(regexZip.test(value)){
                    newUser[0].zipCode = value
                    setUser(()=>newUser)
                }
                else{
                    setZipError("Le code postal ne respecte pas le format requis")
                }
            }
            else{
                setBirthError("")
                if(regexBirth.test(value)){
                    newUser[0].birthYear = value
                    setUser(()=>newUser)
                }
                else{
                    setBirthError("L'année de naissance ne respecte pas le format requis")
                }
            }
        }
        else{
            if(isZip === true){
                setZipError("Vous devez renseigner un code postal")
            } else if(isZip === false){
                setBirthError("Vous devez renseigner une année de naissance")
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
                required
                />
            </div>
            {zipError != "" && <span>{zipError}</span>}
            {birthError != "" && <span>{birthError}</span>}
        </div>
    );
};

export default RegisterZipOrBirth;