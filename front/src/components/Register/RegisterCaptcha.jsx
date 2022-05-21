import React, { useEffect, useState, useRef } from "react";
import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';
const RegisterCaptcha = () => {
    let value = ""
    //CHECK IF USER GENERATE A NEW CAPTCHA
    const[isChanged, setIsChanged]=useState(false)
    //FOCUS ON INPUT VALUE
    const inputElement = useRef()
    //LISTEN TO IS CHANGED STATE
    useEffect(()=>{
        value = faker.random.alphaNumeric(5)
        inputElement.current.value = value
        setIsChanged(false)
    },[isChanged])
    //LISTEN CLICK ON GENERATE NEW CAPTCHA BUTTON
    const changeCaptcha = ()=>{
        setIsChanged(true)
    }
    return (
        <div className='register-captcha'>
            <div className="register-container">
                <input 
                type="text" 
                style={{backgroundColor: "grey", textDecorationLine: "line-through"}}
                ref={inputElement}
                />    
                <input type="button" value="Générer captcha" onClick={changeCaptcha}/>
            </div>
        </div>
    );
};

export default RegisterCaptcha;