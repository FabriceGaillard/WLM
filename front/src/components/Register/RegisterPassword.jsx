import React, {useState} from 'react';

const RegisterPaswword = ({whichOne, user, setUser}) => {
    const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[a-zA-Z\d\W]{12,}$/)
    const [passwordError, setPasswordError]=useState({})
    const storePassword = (value)=>{
        let newUser = [...user]
        if(whichOne === "create" && newUser[0].password === ""){
            if(regex.test(value)){
                newUser[0].password = value
                setUser(()=>newUser)
                setPasswordError({})
            }
            else{
                setPasswordError({0 : "Le mot de passe ne respecte pas le format requis"})
            }
        }
        if(whichOne === "reType" && newUser[0].password !== ""){
            if(regex.test(value) && value === newUser[0].password){
                setPasswordError({})
            }
            else{
                setPasswordError({1 : "Le mot de passe doit correspondre au premier champ au dessus"})
            }
        }else if(whichOne === "reType" && newUser[0].password === ""){
            setPasswordError({1 : "Aucun mot de passe renseingé dans le champ de création"})
        }

    }
    const returnStr = ()=>{
        if(whichOne === "create")return "create"
        if(whichOne === "reType")return "reType"
    }
    return (
        <div className='register-password'>
            <div className='register-container'>
                <div className='register-container__label'>
                    <label htmlFor={`password-${returnStr}`}>
                        {whichOne === "create" ? "Create a password:" : "Retype password:"}
                    </label>
                </div>
                <input
                type="password"
                name={`password-${returnStr}`}
                id={`password-${returnStr}`}
                maxLength="180"
                onBlur={(e)=>storePassword(e.target.value)}
                required
                />
            </div>
            {whichOne === "create" && 
                (<>
                    {passwordError !== {} && <span>{passwordError[0]}</span>}
                </>) 
            }
            {whichOne === "reType" && 
                (<>
                    {passwordError !== {} && <span>{passwordError[1]}</span>}
                </>) 
            }
        </div>
    );
};

export default RegisterPaswword;