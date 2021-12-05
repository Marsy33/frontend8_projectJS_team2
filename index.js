const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const resultsEl = document.getElementById('results');

document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById("results__wrapper").style.display = "none"; 
});

searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    document.getElementById("results__wrapper").style.display = ""; 
    document.getElementById("home").style.display = "none"; 

    const q = searchInput.value;

    if (q != '' && q != ' ') {
        document.getElementById("swiper-wrapper").style.display = "none"; 
        document.getElementById("swiper-pagination").style.display = "none"; 
        search(q);
    }
});

function search(q) {
    document.getElementById("results").style.background='#000000'; 
    fetch(`https://imdb8.p.rapidapi.com/auto-complete?q=${q}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "imdb8.p.rapidapi.com",
		"x-rapidapi-key": "9aeb1c2dddmshbff0c6008d1f587p11a219jsne7dbd0f14ad2"
	}
})
.then(response => response.json())
.then(data => {
    document.querySelector(".results").innerHTML = "";
    const list = data.d;
    console.log(data.d);
    list.map((item) => {
        const name = item.l;
        const poster = item.i.imageUrl;
        const year = item.y;
        const movie = `<a href="#linktodescription">
        <img src="${poster}"> 
        <h2 class = "name">${name}</h2>`+ ((year == undefined) ? ``: `<h2 class = "year">${year}</h2> `) +
        `</a>`
        document.querySelector('.results').innerHTML += movie;
    })
})
.catch(err => {
	console.error(err);
});
}

// Menu
let menuBtn = document.querySelector('.menu-btn');
let menu = document.querySelector('.menu__body');

menuBtn.addEventListener('click', function(){
    document.body.classList.toggle('lock');
	menuBtn.classList.toggle('active');
	menu.classList.toggle('active');
})