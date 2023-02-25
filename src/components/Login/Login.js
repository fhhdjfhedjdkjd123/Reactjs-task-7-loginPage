import React, { useState,useEffect,useReducer,useContext} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input.js';

const emailReducer=(state,action)=>{
  if(action.type === "USER_EMAIL_INPUT"){
    
    return {value:action.val, isValid:action.val.includes("@")}
  }
  if(action.type === "INPUT_BLUR"){
    return {value:state.value, isValid:state.value.includes("@")}

  }
  return {value:"", isValid:false}
}

const passwordReducer =(state,action)=>{
  if(action.type === "USER_INPUT"){
    return {value:action.val, isValid:action.val.trim().length>6}
  }
  if(action.type === "INPUT_BLUR"){
    return {value:state.value, isValid:state.value.trim().length>6}
  }
  return{ value:"",isValid:false}
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();

  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();

  const [enteredCollegeName, setEnteredCollegeName] = useState('');
  const [collegeNameIsValid, setCollegeNameIsValid] = useState();

  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState,dispatchEmail]=useReducer(emailReducer, {
    value:"", 
    isValid:null
  });

  const [passwordState, dispatchPassword]= useReducer(passwordReducer,{
    value:"",
    isValid:null
  });

  const {isValid:emailIsValid} = emailState;
  const {isValid:passwordIsValid} = passwordState;
  const ctx = useContext(AuthContext);
  // useEffect(()=>{
  //   const identifier = setTimeout(()=>{
  //   console.log("checking");
  //     setFormIsValid(
  //       emailState.isValid && passwordState.isValid > 6 && enteredCollegeName.trim().length>0
  //     );  
  //   },1000)
  //   return(()=>{
  //     console.log("Cleaned");
  //     clearTimeout(identifier)
  //   })
  // },[emailState,passwordState,enteredCollegeName])

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({type:"USER_EMAIL_INPUT", val:event.target.value});

      setFormIsValid(
        event.target.value.includes('@') && passwordIsValid > 6 && enteredCollegeName.trim().length>0
      );  

  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({type:"USER_INPUT", val:event.target.value});
          
    setFormIsValid(
      emailIsValid && event.target.value.trim().length > 6 && enteredCollegeName.trim().length>0
      );  
  };
  const collegeNameChangeHandler = (event)=>{
    setEnteredCollegeName(event.target.value);

        setFormIsValid(
        emailIsValid && passwordIsValid && event.target.value.trim().length>0
      );  
  }

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({type:"INPUT_BLUR"})
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(passwordState.isValid);
    dispatchPassword({type:"INPUT_BLUR"})

  };

  const validateCollegeNameHandler =()=>{
    setCollegeNameIsValid(enteredCollegeName.trim().length>0)
  }

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(emailState.value, passwordState.value,enteredCollegeName);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input 
          id="email"
          type="email"
          label="E-mail"
          value={emailState.value}
          isvalid={emailIsValid}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <div
          className={`${classes.control} ${
            collegeNameIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="collegename">College name</label>
          <input
            type="text"
            id="collegename"
            value={enteredCollegeName}
            onChange={collegeNameChangeHandler}
            onBlur={validateCollegeNameHandler}
          />
        </div>
        <Input 
          id="password"
          type="password"
          label="Password"
          value={passwordState.value}
          isvalid={passwordIsValid}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
