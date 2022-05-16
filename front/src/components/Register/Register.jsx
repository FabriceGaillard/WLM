import React, {useState} from 'react';
import {RegisterMail, 
    RegisterPassword, 
    RegisterIdentity,
    RegisterCountry,
    RegisterRegion,
    RegisterZipOrBirth,
    RegisterGender,
    RegisterCaptcha
} from "./register_components"

const Register = () => {
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
                <RegisterRegion/>
                <RegisterZipOrBirth isZip={true}/>
                <RegisterGender/>
                <RegisterZipOrBirth isZip={false}/>
                <RegisterCaptcha/>
            </form>
        </div>
    );
};

export default Register;