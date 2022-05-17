import React from 'react';
const RegisterRegion = ({allDepartments}) => {
    return (
        <div className='register-region'>
            <div className='register-container'>
                <div className='register-container__label'>
                    <label htmlFor="region">
                        Department: 
                    </label>
                </div>
                <select name='region' id="region">
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
        </div>
    );
};

export default RegisterRegion;