import React, { useState } from 'react';

const MessageInputBox = React.forwardRef((props,ref) => {
    return (
        <input className='inputbox' ref={ref}  {...props}/>
    )
})
export default MessageInputBox;