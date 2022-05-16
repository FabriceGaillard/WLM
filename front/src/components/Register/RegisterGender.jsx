import React from 'react';

const RegisterGender = () => {
    return (
        <div className='register-gender'>
            <div className='register-container'>
                <div className='register-container__label'>
                    <label htmlFor="gender">
                        Gender : 
                    </label>
                </div>
                <div className='register-container__radio'>
                    <div className='register-container__radio__gender'>
                        <input
                        type="radio"
                        name="male"
                        id="male"
                        value="male"
                        />
                        <label htmlFor="male">Male</label>
                    </div>
                    <div className='register-container__radio__gender'>
                        <input
                        type="radio"
                        name="female"
                        id="female"
                        value="female"
                        />
                        <label htmlFor="female">Female</label>
                    </div>
                    <div className='register-container__radio__gender'>
                        <input
                        type="radio"
                        name="unbinary"
                        id="unbinary"
                        value="unbinary"
                        />
                        <label htmlFor="unbinary">Unbinary</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterGender;