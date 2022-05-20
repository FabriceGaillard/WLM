import React, { useState } from 'react';
const RegisterRegion = ({allDepartments, user, setUser}) => {
    const[stateMissing, setStateMissing]=useState("")
    //FUNCTION THAT STORE OPTION VALUE
    //THAT IS TO SAY DEPARTMENT NAME
    const storeDepartment = (value)=>{
        setStateMissing("")
        let newUser = [...user]
        newUser[0].state = value
        setUser(()=>newUser)
    }
    const checkState = ()=>{
        setStateMissing("")
        if(user[0].state === ""){
            setStateMissing("Vous devez choisir un département")
        }
    }
    return (
        <div className='register-region'>
            <div className='register-container'>
                <div className='register-container__label'>
                    <label htmlFor="region">
                        Department: 
                    </label>
                </div>
                <select 
                name='region' 
                id="region"
                onClick={(e)=>storeDepartment(e.target.value)}
                onBlur={checkState}
                >
                    <option value="">Choose your department</option>
                    {allDepartments.map(item=>(
                        <option 
                        key={item[0]} 
                        value={item[1]}
                        >
                            {item[1]} - {`(${item[0]})`}
                        </option>
                    ))}
                </select>
            </div>
            {stateMissing != "" && <span>{stateMissing}</span>}
        </div>
    );
};

export default RegisterRegion;