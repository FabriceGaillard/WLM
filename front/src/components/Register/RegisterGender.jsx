import React from 'react';

const RegisterGender = () => {
    const allGender = ["male", "female", "unbinary"]
    return (
        <div className='register-gender'>
            <div className='register-container'>
                <div className='register-container__label'>
                    <label htmlFor="gender">
                        Gender: 
                    </label>
                </div>
                <div className='register-container__radio'>
                    {allGender.map(elem=>(
                        <div key={elem} className='register-container__radio__gender'>
                            <input
                            type="radio"
                            name={elem}
                            id={elem}
                            value={elem}
                            />
                            <label htmlFor={elem}>{elem.charAt(0).toUpperCase() + elem.slice(1)}</label>
                        </div>
                    ))}
                    
                </div>
            </div>
        </div>
    );
};

export default RegisterGender;