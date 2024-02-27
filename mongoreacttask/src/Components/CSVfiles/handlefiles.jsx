import * as Urls from '../Urls'


async function loadUser(_name, _password, _comment){
    
    const user = {id: Date.now(),name: _name, password: _password, comment:_comment, changed: 'No'};
    const rawResponse = await fetch(Urls.Url+Urls.UrlPost, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(user),
    });
    const content = await rawResponse.json();
    console.log(content);
}

const handleFiles = (files) => {
    var reader = new FileReader();
    reader.onload = async function(e) {
        var arr = reader.result.split(';').join(',').split('\r\n').join(',').split(',')
        
        for (var i = 3; i < arr.length-1; i+=3)
        {
            console.log(arr[i], arr[i+1],arr[i+2])
            await new Promise(r => setTimeout(r, 1000));
            loadUser(arr[i], arr[i+1],arr[i+2])
        }
        
    }
    reader.readAsText(files[0]);
    
}

export default handleFiles;
