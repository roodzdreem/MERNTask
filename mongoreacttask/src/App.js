import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import MessageInputBox from "./Components/Input/MessageInputBox";
import MyButton from './Components/Buttons/MyButton';
import BoxList from "./Components/BoxList";
import './styles/App.css';
import UserBoxList from "./Components/UserBoxes/UserBoxList";
 import handleFiles  from "./Components/CSVfiles/handlefiles";
import ReactFileReader from 'react-file-reader';
import exportFromJSON from "export-from-json";
import * as Urls from './Components/Urls'


function App() {
    const bodyInputRef = [useRef(),useRef(),useRef(),useRef(),useRef(),useRef()];
    const [inputs, setInputs] = useState(Array(6).fill(''));
    const [idDelete, setIdDelete] = useState('');
    const [passwordtosearch, setpasswordtosearch] = useState('');
    const [idUpdate, setidUpdate] = useState('');
    const [usersList, setusersList] = useState([]);
    
    const exportToCsv= async () => {
        const response = await fetch(Urls.Url+Urls.UrlGet)
        const responseData = await response.json()
        let _data = []
        for (var i = 0; i<responseData.length; i++){
            _data.push(
            {
                name: responseData[i].name,
                password : responseData[i].password,
                comment: responseData[i].comment,
            })
        }
        const filename ='csvfile'
        const exporttype = exportFromJSON.types.csv
        exportFromJSON({data:_data, fileName: filename, exportType: exporttype})
    }
    useEffect(() => {
        axios.get(Urls.Url + Urls.UrlGet).then((resp) => {
        const allUsers = resp.data;
        setusersList(allUsers);
        });
    }, [setusersList]);


    async function pullJson() {
        const response = await fetch(Urls.Url+Urls.UrlGet)
        const responseData = await response.json()
        setusersList(responseData)
        setpasswordtosearch('')
        console.log(responseData)
    }

    async function createUser(){
        const user = {id: Date.now(),name: bodyInputRef[0].current.value, password: bodyInputRef[1].current.value, comment:' ', changed: 'No'};
        await usersList.push(user);
        const rawResponse = await fetch(Urls.Url+Urls.UrlPost, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
        });
        const content = await rawResponse.json();
        console.log(content);
        setusersList(usersList);
        inputClear();  
    }

    async function deleteUser(){
        setusersList(usersList.filter(u => u.id !== Number(idDelete)))
        await fetch(Urls.Url+Urls.UrlDelete + idDelete, {
            method: 'DELETE',
        }, setIdDelete(''));
        
    }

    async function updateUser(){
        try{
            for (let i = 2; i< 4;i++)
            {
                if (bodyInputRef[i].current.value === '')
                {
                console.log('ddd')
                    
                    return console.log('Одно из полей не заполнено')
                } 
            }
        const index =usersList.findIndex(function(o) { return o.id === Number(idUpdate) })
        const user = {id: usersList[index].id, name: bodyInputRef[2].current.value, 
            password: bodyInputRef[3].current.value, comment:bodyInputRef[4].current.value, changed: 'Yes'};
        usersList[index] = user;
        const rawResponse = await fetch(Urls.Url+Urls.UrlUpdate + idUpdate, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        },inputClear(),setidUpdate(''));
        const content = await rawResponse.json();
        setusersList(usersList);
        console.log(content);
    }
    catch (err) {
      console.log('Не удалось обновить пользователя');
      
    }
        
        
    }

    async function filterPasswords(){
        try {
        setusersList(usersList.filter(u => u.password.search(passwordtosearch)  !== -1 ))
        }
        catch{
            console.log('filter error')
        }
    }

    const inputChangedHandler = (e, index) => {
        const inputsUpdated = inputs.map((input, i) => {
        if (i === index) {
            return e.target.value;
        } else {
            return input;
        }
    });
    setInputs(inputsUpdated);
  };

  const inputClear = () => {
    const inputsUpdated = inputs.map(() => {
        return '';
        });
        setInputs(inputsUpdated);
    };

    
  return (

        <div>
            <div className="form-group">
                    <BoxList 
                    i={0}
                    value ={inputs[0]} 
                    refbody= {bodyInputRef[0]} 
                    changeHandler ={inputChangedHandler} 
                    placeholdertext ="Введите имя пользователя"
                    text ="Имя пользователя" />
                    <BoxList 
                    i={1}
                    value ={inputs[1]} 
                    refbody= {bodyInputRef[1]} 
                    changeHandler ={inputChangedHandler} 
                    placeholdertext ="Введите пароль"
                    text ="Пароль" />
                <MyButton onClick={createUser}>Сохранить</MyButton>

                   
                    <div>
                    <mat-label  htmlFor="name"> Удалить пользователя </mat-label>
                <MessageInputBox  
                        value={idDelete} 
                        onChange={e => setIdDelete(e.target.value)}
                        type="text" 
                        placeholder="Введите ID пользователя"  />
                <MyButton onClick={deleteUser}>Удалить</MyButton>
            </div>
            <div>
                <div>
                <mat-label  htmlFor="name"> Изменить пользователя </mat-label>
                <MessageInputBox  
                    className="inputbox"
                    value={idUpdate} 
                    onChange={e => setidUpdate(e.target.value)}
                    type="text" 
                    placeholder="Введите ID пользователя"  />
                </div>
                <BoxList 
                    i={2}
                    value ={inputs[2]} 
                    refbody= {bodyInputRef[2]} 
                    changeHandler ={inputChangedHandler} 
                    placeholdertext ="Введите имя пользователя"
                    text ="Новое имя пользователя" />
                <BoxList 
                    i={3}
                    value ={inputs[3]} 
                    refbody= {bodyInputRef[3]} 
                    changeHandler ={inputChangedHandler} 
                    placeholdertext ="Введите пароль"
                    text ="Новый пароль" />
                <BoxList 
                    i={4}
                    value ={inputs[4]} 
                    refbody= {bodyInputRef[4]} 
                    changeHandler ={inputChangedHandler} 
                    placeholdertext ="Введите комментарий"
                    text ="Комментарий" />
                <MyButton onClick={updateUser}>Обновить</MyButton>
            </div>
            </div>
            <div>
            <mat-label  htmlFor="name"> Загрузить данные из файла (чтобы обновить пользователей нажмите кнопку "Обновить") </mat-label>

            <ReactFileReader handleFiles={handleFiles} fileTypes={'.csv'}>
                <MyButton className='btn'>Загрузить</MyButton>
            </ReactFileReader>
            <div>
                <button onClick={exportToCsv} >Скачать csv файл</button>
            </div>
            </div>
            <mat-label  htmlFor="name"> Найти пароль </mat-label>
            <MessageInputBox  
                    className="inputbox"
                    value={passwordtosearch} 
                    onChange={e => setpasswordtosearch(e.target.value)}
                    type="text" 
                    placeholder="Введите пароль"  />
                <MyButton onClick={pullJson}> Обновить </MyButton>
                <MyButton onClick={filterPasswords}> Поиск пароля </MyButton>
            <div>
               <UserBoxList users ={usersList}/>
            </div>
        </div>
          
    
    );
    
}

export default App;
 