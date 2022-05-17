import React, {useState} from 'react';
//COMPONENTS
import {RegisterMail, 
    RegisterPassword, 
    RegisterIdentity,
    RegisterCountry,
    RegisterRegion,
    RegisterZipOrBirth,
    RegisterGender,
    RegisterCaptcha
} from "./register_components"
//DATA
import * as region from "../../data.js/french_departments"

const Register = () => {
    const allDepartments = Object.entries(region.departments)
    return (
        <div className='register-wrapper'>
            <form className='register'>
                <RegisterMail label={"first"}/>
                <RegisterPassword whichOne={"create"}/>
                <RegisterPassword whichOne={"reType"}/>
                <RegisterMail label={"alternate"}/>
                <RegisterIdentity whichOne={"firstName"}/>
                <RegisterIdentity whichOne={"lastName"}/>
                <RegisterCountry/>
                <RegisterRegion allDepartments={allDepartments}/>
                <RegisterZipOrBirth isZip={true}/>
                <RegisterGender/>
                <RegisterZipOrBirth isZip={false}/>
                <RegisterCaptcha/>
                <button type='submit' name="userInfos">Envoyer</button>
            </form>
        </div>
    );
};

export default Register;