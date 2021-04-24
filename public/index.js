var url = window.location.href;

var catDiv = document.getElementById('cat')

fetch(url + 'product/getall', {
    method : "GET"
}).then(response => 
    response.json()
).then(json => { 
    console.log(json)
        for(let i = 0; i < json.length; i++) {

            let str = '' + json[i]._id
            const item = `
                <div class="block">
                                    <div class="item">
                                        <a href="` + url + 'show/' + str + `">
                                            <img src="` + json[i].image + `" alt="item">
                                            <div class="item_info">
                                                <div class="item_price">
                                                    $` + json[i].price + `&nbsp
                                                </div>
                                                <div class="item_name">
                                                    ` + json[i].name + `
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                `;
            catDiv.innerHTML += item;
        }
    }
);

function scrollDown() {
    window.location.href = url;
    window.scrollTo(0,700);
    
    return false;
}

if(document.cookie) {
    document.getElementById('log').innerHTML = 'Log out'
    document.getElementById('log').href =''
    document.getElementById('upload').href = url + 'upload'
} else {
    document.getElementById('upload').innerHTML = '';
}

document.getElementById('log').addEventListener('click', ()=> {
    console.log(document.cookie)
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
})