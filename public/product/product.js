var b2 = document.getElementById('2d');
var b3 = document.getElementById('3d');

var f2 = document.getElementById('image');
var f3 = document.getElementById('model');

b2.addEventListener('click', (e) => {
    f2.style.visibility = 'visible'
})

b3.addEventListener('click', (e) => {
    f2.style.visibility = 'hidden'
})