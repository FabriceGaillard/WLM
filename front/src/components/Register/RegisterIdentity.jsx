import React, { useState } from 'react';

const RegisterIdentity = ({whichOne, user, setUser}) => {
    const regex = new RegExp(/^(?:(?!×Þß÷þ)[A-zÀ-ÿ -])+$/)
    let newUser = [...user]
    const[identityError, setIdentityError]=useState("")
    const checkIdentity = (value)=>{ 
        setIdentityError("")
        if(value){
            if(regex.test(value)){
                newUser[0][whichOne] = value
                setUser(newUser)
            }
            else{
                setIdentityError(`Votre ${whichOne === "firstName" ? "prénom" : "nom"} doit correspondre au format requis`)
            }
        }
        else{
            setIdentityError(`Veuillez renseigner un ${whichOne === "firstName" ? "prénom" : "nom"}`)
        }
    }
    const returnStr = ()=> {
        if(whichOne === "firstName")return "firstName"
        if(whichOne === "lastName")return "lastName"
    }
    return (
        <div className='register-identity'>
            <div className='register-container'>
                <div className='register-container__label'>
                    <label htmlFor={`identity-${returnStr}`} className='register-label'>
                        {whichOne === "firstName" ? "First name: " : "Last name: "}
                    </label>
                </div>
                <input
                className='input-width'
                type="text"
                name={`identity-${returnStr}`}
                id={`identity-${returnStr}`}
                maxLength="255"
                onBlur={(e)=>checkIdentity(e.target.value)}
                required
                />
            </div>
            {identityError != "" && (<><span>{identityError}</span></>)}
        </div>
    );
};

export default RegisterIdentity;