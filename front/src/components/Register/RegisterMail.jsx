import React,{useState} from 'react';

const RegisterMail = ({label, user, setUser}) => {
    //STATE TO DISPLAY ERROR MESSAGE ABOUT EMAIL AND ALTERNATE EMAIL
    const [emailError, setEmailError]=useState({})
    //FUNCTION TO CHECK EMAIL AND ALTERNATE EMAIL VALUES
    const checkEmail = (target)=>{
        //COPY OF USER STATE IN PARENT COMPONENT REGISTER
        const newUser = [...user]
        //STORED VALIDITY OBJECT TO GET TYPEMISMATCH PROPERTY
        const check = target.validity
        //ABOUT EMAIL INPUT
        if(label === "first" && check.typeMismatch === true){
            setEmailError({first : "Votre email ne respecte pas le format requis"})
        } else if(label === "first" && check.typeMismatch === false){
            setEmailError({})
            if(newUser[0].alternateEmail === ""){
                newUser[0].email = target.value
                setUser(()=>newUser)
            }
            if(newUser[0].alternateEmail === target.value){
                setEmailError({first : "Votre email principal doit être différent de l'email secondaire"})
            }
        }
        //ABOUT ALTERNATE EMAIL INPUT
        if(label === "alternate" && check.typeMismatch === true){
            setEmailError({alternate : "Votre email ne respecte pas le format requis"})
        }else if(label === "alternate" && check.typeMismatch === false){
            setEmailError({})
            if(newUser[0].email === ""){
                newUser[0].alternateEmail = target.value
                setUser(()=>newUser)
            }
            if(newUser[0].email === target.value){
                setEmailError({alternate : "Votre email secondaire doit être différent de l'email principal"})
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