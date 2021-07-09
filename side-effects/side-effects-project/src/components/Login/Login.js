import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

// Reducer function can be created outside the component scope because we dont
// need any data from this component.
// all the info needed by useReducer function will be generated automatically by react

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  //we will combine the value and the validity into one state managed by useReducer.

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  // after meeting the validity requiements for ex password exceeds 6 chars when we add more chars
  // the function checks for validity again thats the case we dont want. we will use object destructuring technique
  // to pull out certain props from an object

  // this is alice assignment because its a part of object dest syntax
  const { isValid: emailIsValid } = emailState
  const { isValid: passwordIsValid} = passwordState

 // USE EFFECT SECTION
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking for validity')
      setFormIsValid(
        // emailState.isValid && passwordState.isValid

        // at this approach this function will excute only if the validity status changes
        emailIsValid && passwordIsValid
      )
    }, 500)

  //   // before useEffect function excution this clean up function will run except the first excution
    return () => {
      clearTimeout(identifier)
    }

    }
    , [emailIsValid, passwordIsValid])

  // in dependencies we added what we are using inside our useEffect function
  // the function is excuted only if the dependencies are changed
  // id we set [] in dependencies the function will excute onl on the first rendering page

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);

    dispatchEmail({
      type: "USER_INPUT",
      val: event.target.value,
    });

    // in setFormIsValid we still dependent on the state value comes from the reducer function
    // son its not optimal to make a state which depends on another state

    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.trim().length > 6
    // )
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);

    dispatchPassword({ type: "USER_INPUT", val: event.target.value });

    // when we use useState on a state that depends on two other states
    // we may face an issue related to the state ordering.
    // in some cases maybe this state will run before enteredPassword state
    // which is an senario we want to avoid. here useReducers comes to work.
    // or and we use useReduce hook when we have redundancy between states.
    // like what we have above (enteredEmail state and validation state are related)

    // in setFormIsValid we still dependent on the state value comes from the reducer function
    // son its not optimal to make a state which depends on another state.
    // so we return to useEffect to make sure that these states will run at the latest version

    // setFormIsValid(
    //   emailState.isValid && event.target.value.trim().length > 6
    // )
  };

  const validateEmailHandler = () => {
    // we are updating this state by looking at another state thats something we must not do
    // because enteredEmail state may not be updated yet

    // if we use a function option to get the latest state it wont work properly here
    // because we will get the latest version of setEmailIsValid not the enteredEmail state

    // useReducers coming handy in theses situations which needs to update a state
    // according to another state by merging them into a one state.

    // Replacing enteredEmail by emailState.value

    // setEmailIsValid(emailState.isValid);

    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
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
