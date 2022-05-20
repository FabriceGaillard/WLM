import React, {useState} from 'react';

const RegisterPaswword = ({whichOne, user, setUser, isPassConfirmed}) => {
    const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[\w\W]{12,}$/)
    const [passwordError, setPasswordError]=useState({})

    const storePassword = (value)=>{
        //GLOBAL STATE WHERE ALL USER INFOS ARE STORED
        let newUser = [...user]
        //STATE TO STORE VALUE OF PASSWORD INPUT
        //IN ORDER TO COMPARE BOTH CREATE AND RETYPE INPUT
        //BEFORE TO STORE THE RIGHT VALUE TO THE GLOBAL STATE
        let passCheck = [...isPassConfirmed]
        setPasswordError({})
        //CREATE PASSWORD INPUT
        if(whichOne === "create"){
            setPasswordError({})
            //IF CREATE PASSWORD VALUE DOES MATCH REGEX
            if(regex.test(value)){    
                setPasswordError({})
                passCheck[0].create = value
            }
            else{
                setPasswordError({0 : "Le mot de passe ne respecte pas le format requis"})
            }
        }
        //RETYPE PASSWORD INPUT
        if(whichOne === "reType"){
            setPasswordError({})
            if(passCheck[0].create === ""){
                setPasswordError({1 : "Aucun mot de passe renseigné au préalable"})
            }else if(passCheck[0].create != ""){
                if(passCheck[0].create === value){
                    newUser[0].password = passCheck[0].create
                    setUser(()=>newUser)
                }
                else{
                    setPasswordError({1 : "Le mot de passe doit correspondre au premier champ au dessus"})
                }
            }
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
                onChange={(e)=>storePassword(e.target.value)}
                required
                />
            </div>
            {whichOne === "create" && 
                (<>
                    {passwordError[0] && <span>{passwordError[0]}</span>}
                </>) 
            }
            {whichOne === "reType" && 
                (<>
                    {passwordError[1] && <span>{passwordError[1]}</span>}
                </>) 
            }
        </div>
    );
};

export default RegisterPaswword;