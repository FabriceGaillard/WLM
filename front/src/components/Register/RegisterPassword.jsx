import React from 'react';

const RegisterPaswword = ({whichOne}) => {
    const returnStr = ()=>{
        if(whichOne === "create")return "create"
        if(whichOne === "reType")return "reType"
    }
    return (
        <div className='register-password'>
            <div className='register-container'>
                <div className='register-container__label'>
                    <label htmlFor={`password-${returnStr}`}>
                        {whichOne === "create" ? "Create a password : " : "Retype password : "}
                    </label>
                </div>
                <input
                type="password"
                name={`password-${returnStr}`}
                id={`password-${returnStr}`}
                />
            </div>
        </div>
    );
};

export default RegisterPaswword;