import React,{useState} from 'react';

const RegisterMail = ({label, user, setUser}) => {
    const [emailError, setEmailError]=useState({})
    const newUser = [...user]
    const checkEmail = (target)=>{ 
        //STORED VALIDITY OBJECT TO GET TYPEMISMATCH PROPERTY
        const check = target.validity
        if(label === "first"){
            setEmailError({})
            if(target.value){
                if(check.typeMismatch === true){
                    setEmailError({[`${label}`] : "Votre email principal ne respecte pas le format requis"})
                }else if(check.typeMismatch === false){
                    if(newUser[0].alternateEmail != target.value){
                        newUser[0].email = target.value
                        setUser(()=>newUser)
                        setEmailError({})
                    }else if(newUser[0].alternateEmail == target.value){
                        setEmailError({[`${label}`] : "Votre email principal doit être différent de l'email secondaire"})
                    }
                }
            }
            else{
                setEmailError({[`${label}`] : "Vous devez renseigner un email principal"})
            } 
        }
        if(label === "alternate"){
            setEmailError({})
            if(target.value){
                if(check.typeMismatch === true){
                    setEmailError({[`${label}`] : "Votre email secondaire ne respecte pas le format requis"})
                }else if(check.typeMismatch === false){
                    if(newUser[0].email != target.value){
                        newUser[0].alternateEmail = target.value
                        setUser(()=>newUser)
                        setEmailError({})
                    } else if(newUser[0].email === target.value){
                        setEmailError({[`${label}`] : "Votre email secondaire doit être différent de l'email principal"})
                    }
                    if(newUser[0].email === ""){
                        setEmailError({})
                        setEmailError({[`${label}`] : "Renseignez un email principal en premier"})
                    }
                }
            }
            else{
                setEmailError({})
                setEmailError({[`${label}`] : "Vous devez renseigner un email secondaire"})
            }
        }
    }
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
                maxLength="255"
                onBlur={(e)=>checkEmail(e.target)}
                required
                />
            </div>
            {label === "first" && <span>{emailError.first}</span>}
            {label === "alternate" && <span>{emailError.alternate}</span>}
        </div>
    );
};

export default RegisterMail;