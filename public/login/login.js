var n = document.getElementById('name');
var p = document.getElementById('pass');
var c = document.getElementById('cont');

document.getElementById('submit').addEventListener('click', () =>{
    fetch('../user/login', {
        method : "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
        username: n.value,
        password: p.value
        })
    }).then(response => 
        response.json()
    ).then(json => { 
        document.cookie = 'token=' + json.token + ';path=/;';
        document.getElementById('info').innerHTML = json.message;
    })
})

document.getElementById('reg').addEventListener('click', () =>{
    fetch('../user/add', {
        method : "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
        username: n.value,
        password: p.value,
        contactInfo: c.value
        })
    }).then(response => 
        response.json()
    ).then(json => { 
        document.getElementById('info').innerHTML = 'Registered';
    })
})