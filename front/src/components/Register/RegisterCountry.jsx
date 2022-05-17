import React from 'react';

const RegisterCountry = () => {
    return (
        <div className='register-country'>
            <div className='register-container'>
                <div className='register-container__label'>
                    <label htmlFor="country">
                        Country: 
                    </label>
                </div>
                <input
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