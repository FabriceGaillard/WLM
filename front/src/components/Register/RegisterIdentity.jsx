import React from 'react';

const RegisterIdentity = ({whichOne}) => {
    const returnStr = ()=> {
        if(whichOne === "firstName")return "firstName"
        if(whichOne === "lastName")return "lastName"
    }
    return (
        <div className='register-identity'>
            <div className='register-container'>
                <div className='register-container__label'>
                    <label htmlFor={`identity-${returnStr}`}>
                        {whichOne === "firstName" ? "First name: " : "Last name: "}
                    </label>
                </div>
                <input
                type="text"
                name={`identity-${returnStr}`}
                id={`identity-${returnStr}`}
                required
                />
            </div>
        </div>
    );
};

export default RegisterIdentity;