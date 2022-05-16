import React from 'react';

const RegisterZipOrBirth = ({isZip}) => {
    const returnStr = ()=>{
        if(isZip === true)return "zipCode"
        if(isZip === false)return "birthYear"
    }
    return (
        <div className='register-zipCode'>
            <div className='register-container'>
                <div className='register-container__label'>
                    <label htmlFor={returnStr}>
                        {isZip === true ? "ZIP code : " : "Birth year : "} 
                    </label>
                </div>
                <input
                type="text"
                name={returnStr}
                id={returnStr}
                />
            </div>
        </div>
    );
};

export default RegisterZipOrBirth;