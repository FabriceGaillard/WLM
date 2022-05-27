import React, { useState } from 'react';

const RegisterGender = ({user, setUser}) => {
    const allGender = ["male", "female", "unbinary"]
    let newUser = [...user]
    const [genderError, setGenderError]=useState("")

    const onBlurRadio = ()=>{
        setGenderError("")
        if(user[0].gender === ""){
            setGenderError("Vous devez choisir un genre")
        }
    }
    const checkGender = (value)=>{
        setGenderError("")
        if(value){
            newUser[0].gender = value
            setUser(newUser)
        }
    }
    return (
        <div className='register-gender'>
            <div className='register-container'>
                <div className='register-container__label'>
                    <div className='register-label'>
                        Gender: 
                    </div>
                </div>
                <div className='register-container__radio'>
                    {allGender.map(elem=>(
                        <div key={elem} className='register-container__radio__gender'>
                            <input
                            type="radio"
                            name={elem}
                            id={elem}
                            value={elem}
                            onChange={(e)=>checkGender(e.target.value)}
                            onBlur={onBlurRadio}
                            checked={user.some(item => item.gender === elem)}
                            />
                            <label htmlFor={elem} className="label-gender">
                                <div className='label-gender__radio'>
                                    <div className='gender-dot'></div>
                                </div>
                            </label>
                            <div className="writing-gender">{elem.charAt(0).toUpperCase() + elem.slice(1)}</div>
                        </div>
                    ))}
                </div>
            </div>
            {genderError != "" && <span className='mesk'>{genderError}</span>}
        </div>
    );
};

export default RegisterGender;