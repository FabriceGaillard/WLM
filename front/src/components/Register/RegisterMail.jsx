import React from 'react';

const RegisterMail = ({label}) => {
    const returnStr = ()=>{
        if(label === "first")return "first"
        if(label === "alternate") return "alternate"
    }
    return (
        <div className='register-email'>
            <div className='register-container'>
                <div className='register-container__label'>
                    <label htmlFor={`email-${returnStr}`}>
                        {label === "first" ? "Email: " : "Alternate email: "}
                    </label>
                </div>
                <input
                type="email"
                name={`email-${returnStr}`}
                id={`email-${returnStr}`}
                placeholder='exemple@gmail.com'
                />
            </div>
        </div>
    );
};

export default RegisterMail;