import React from 'react';
import MessageInputBox from './Input/MessageInputBox';
const BoxList = (props) => {
    
    return (
        <div>
            <mat-label  htmlFor="name"> {props.text} </mat-label>
            <MessageInputBox
            
            onChange={e => props.changeHandler(e, props.i)} 
            value={props.value} 
            ref = {props.refbody} 
            type="text" 
            placeholder={props.placeholdertext}  />
        </div>


    )
}
export default BoxList;