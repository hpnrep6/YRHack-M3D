var b2 = document.getElementById('2d');
var b3 = document.getElementById('3d');

var f2 = document.getElementById('image');
var f3 = document.getElementById('model');

var url;

b2.addEventListener('click', (e) => {
    f3.style.visibility = 'hidden'
})

b3.addEventListener('click', (e) => {
    f3.style.visibility = 'visible'
    window.open(url).focus()
})

let id = window.location.href.split('/').pop();
let ar = window.location.href.split('/');
let ad = ar[0] + ar[1] + ar[2];

var info;

fetch('../product/get/' + id, {
    method : "GET"
}).then(response => 
    response.json()
).then(json => { 
    info = json;
    document.getElementById('name').innerHTML = json.name;
    document.getElementById('price').innerHTML = '$' + json.price;
    document.getElementById('desc').innerHTML = json.description;
    url = json.model;
    document.getElementById('image').src = json.image;
})

document.getElementById('buy').addEventListener('click', (e) => {
    document.getElementById('contact').innerHTML = 'Seller contact info: <br>' + info.user;
})