import React, { useEffect, useState, useRef } from "react";
import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';
const RegisterCaptcha = ({captchaString, setCaptchaString, isCaptchaOk, setIsCaptchaOk}) => {
    const [captchaError, setCaptchaError]=useState("")
    // ---CHECK IF USER GENERATE A NEW CAPTCHA

    //CHECK IF USER GENERATE A NEW CAPTCHA
    const[isChanged, setIsChanged]=useState(false)
    //FOCUS ON INPUT VALUE
    const captchaInput = useRef()
    //LISTEN TO IS CHANGED STATE
    useEffect(()=>{
        setCaptchaError("")
        setCaptchaString("")
        captchaInput.current.value = faker.random.alphaNumeric(6)
    },[isChanged])
    //LISTEN CLICK ON GENERATE NEW CAPTCHA BUTTON
    const changeCaptcha = ()=>{
        setIsChanged((cv)=>!cv)
    }
    // ---CHECK VALUE USER PROVIDE IN RELATION TO CAPTCHA PROVIDED

    const storeCaptcha = (data)=>{
        setCaptchaError("")
        setCaptchaString(data)
    }
    const checkCaptchaValidity = ()=>{
        setCaptchaError("")
        if(captchaInput.current.value === captchaString){
            setIsCaptchaOk(true)
        }
        else{
            setIsCaptchaOk(false)
            setCaptchaError("Votre saisie doit être identique au captcha")
        }
    }

    return (
        <div className='register-captcha'>
            <div className="captcha-wrapper">
                <div className="captcha-wrapper__captcha">
                    <input
                    className="captcha-wrapper__captcha--text"
                    type="text" 
                    style={{backgroundColor: "grey", textDecorationLine: "line-through"}}
                    ref={captchaInput}
                    />    
                    <input type="button" value="Générer captcha" onClick={changeCaptcha}/>
                </div>
                <div className="captcha-wrapper__captcha">
                    <input
                    className="captcha-wrapper__captcha--write" 
                    type="text" 
                    onChange={(e)=>storeCaptcha(e.target.value)}
                    />
                    <input 
                    type="button" 
                    value="Vérifier" 
                    onClick={checkCaptchaValidity}
                    />
                </div>
                {captchaError != "" && <span>{captchaError}</span>}
            </div>
        </div>
    );
};

export default RegisterCaptcha;