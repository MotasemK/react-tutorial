// useImperativeHandle allow us avoid this error. Function components cannot be given refs.
// so its use an imperative handle instead of function
// For something like focusing inputs this can be very useful
// using imperativehandle and React.forwardRef we can expose functionality from a react component to 
// its parent component to then use your component in the parent component throw refs
// and trigger a certain functionalities.

import React, { useRef, useImperativeHandle } from 'react'

import classes from './input.module.css'

const Input = React.forwardRef((props, ref) => {
    const inputRef = useRef()

    const activate = () => {
        inputRef.current.focus()
    }

    useImperativeHandle(ref, () => {
        return {
            focus: activate
        }
    })

    return <div
    className={`${classes.control} ${
      props.isValid === false ? classes.invalid : ""
    }`}
  >
    <label htmlFor={props.id}>{props.label}</label>
    <input
    ref={inputRef}
      type={props.type}
      id={props.id}
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
    />
  </div>
})

export default Input