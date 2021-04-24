var url = window.location.href;

var catDiv = document.getElementById('cat')

fetch(url + 'product/get', {
    method : "GET"
}).then(response => 
    response.json()
).then(json => { 
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