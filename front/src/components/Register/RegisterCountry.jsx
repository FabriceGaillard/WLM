import React from 'react';

const RegisterCountry = () => {
    return (
        <div className='register-country'>
            <div className='register-container'>
                <div className='register-container__label'>
                    <label htmlFor="country" className='register-label'>
                        Country: 
                    </label>
                </div>
                <input
                className='input-width'
                type="text"
                name="country"
                id="country"
                value="France"
                />
            </div>
        </div>
    );
};

export default RegisterCountry;