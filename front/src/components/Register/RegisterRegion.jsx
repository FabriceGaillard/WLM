import React from 'react';

const RegisterRegion = () => {
    return (
        <div className='register-region'>
            <div className='register-container'>
                <div className='register-container__label'>
                    <label htmlFor="region">
                        Department : 
                    </label>
                </div>
                <select name='region' id="region">
                    <option value="loire">Loire</option>
                    <option value="drôme">Drôme</option>
                    <option value="ardèche">Ardèche</option>
                    <option value="isère">Isère</option>
                </select>
            </div>
        </div>
    );
};

export default RegisterRegion;