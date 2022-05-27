import React, {useState} from 'react';

const RegisterPaswword = ({whichOne, user, setUser, isPassConfirmed}) => {
    const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[\w\W]{12,}$/)
    //COPY OF GLOBAL STATE WHERE ALL USER INFOS ARE STORED
    let newUser = [...user]
    //STATE TO STORE CREATE PASSWORD INPUT
    //THE PURPOSE IS TO COMPARE RETYPE PASSWORD INPUT VALUE
    let passCheck = [...isPassConfirmed]
    //STATE TO STORE ERROR MESSAGES
    const [passwordError, setPasswordError]=useState({})

    const storePassword = (value)=>{       
        setPasswordError({})
        //CREATE PASSWORD INPUT
        if(whichOne === "create"){
            setPasswordError({})
            if(value){
                //IF CREATE PASSWORD VALUE DOES MATCH REGEX
                if(regex.test(value)){    
                    setPasswordError({})
                    passCheck[0].create = value
                }
                else{
                    setPasswordError({0 : "Le mot de passe ne respecte pas le format requis"})
                }
            }
            //IF NO VALUE FROM THE CREATE PASS INPUT
            else{
                setPasswordError({0 : "Vous devez créer un mot de passe"})
            }
        }
        //RETYPE PASSWORD INPUT
        if(whichOne === "reType"){
            setPasswordError({})
            if(passCheck[0].create === ""){
                setPasswordError({1 : "Veuillez créer un mot de passe au dessus"})
            }else if(passCheck[0].create != ""){
                if(passCheck[0].create === value){
                    newUser[0].password = passCheck[0].create
                    newUser[0].passwordConfirmation = passCheck[0].create
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
                    <label htmlFor={`password-${returnStr}`} className='register-label'>
                        {whichOne === "create" ? "Create a password:" : "Retype password:"}
                    </label>
                </div>
                <input
                className='input-width'
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