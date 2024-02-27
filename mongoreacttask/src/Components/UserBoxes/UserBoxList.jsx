import React from 'react';
import './userbox.css'
const UserBoxList = (props) => {
    let users = props.users;
    if (!users || users.length <=0 ) return <p>Нет данных.</p>

    return (
        <div>
            {users.map((user) =>
               <div className='userBox' key = {user.id}>
                    <p>ID: {user.id}</p>
                    <p>Имя: {user.name}</p>
                    <p>Пароль: {user.password}</p>
                    <p>Обновлялся: {user.changed}</p>
                    <p>Комментарий: {user.comment}</p>
                </div>
            )
        }          
      </div>
    )
}

export default UserBoxList;