var n = document.getElementById('name');
var d = document.getElementById('desc');
var p = document.getElementById('price');
var i = document.getElementById('image');
var m = document.getElementById('model');

document.getElementById('post').addEventListener('click', async () =>{
    if(m.files.length > 0) {
        var form = new FormData();
        form.append('model', m.files[0])
        
        var request = new XMLHttpRequest();
        request.open('POST', '../model/add')
        request.send(form);
        document.getElementById('info').innerHTML = 'Uploading Model... Please wait';
        request.onload = (e) => {
            upload(e.target.response.url);
        }
    } else upload();
})

function upload(url) {
    let token = document.cookie.substring(6);

    document.getElementById('info').innerHTML = 'Model Uploaded... Uploading product information...'
    
    fetch('../product/add', {
        method : "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            name: n.value,
            description: d.value,
            price: p.value,
            image: i.value,
            model: url,
            token: token
        })
    }).then(response => {
        response.json()
        console.log() // this makes this work somehow
    }
    ).then(json => { 
        document.getElementById('info').innerHTML = 'Product Uploaded';
    })
}