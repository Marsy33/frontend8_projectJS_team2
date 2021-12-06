const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const resultsEl = document.getElementById('results');

document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById("results__wrapper").style.display = "none";
});

searchForm.addEventListener('submit', function (event) {
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
    document.getElementById("results").style.background = '#000000';
    fetch(`https://imdb8.p.rapidapi.com/auto-complete?q=${q}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "imdb8.p.rapidapi.com",
                "x-rapidapi-key": "0855a7dc2bmshbb15d878b7beaecp14d139jsn47534f3194df"
            }
        })
        .then(response => response.json())
        .then(data => {
            document.querySelector(".results").innerHTML = "";
            const list = data.d;
            console.log(data.d);
            list.map((item) => {
                const imdbID = item.id;
                const name = item.l;
                const poster = item.i.imageUrl;
                const year = item.y;
                const movie = `<a href="#">
        <img src="${poster}" onclick="movieSelected('${imdbID}')" > 
        <h2 class = "name">${name}</h2>` + ((year == undefined) ? `` : `<h2 class = "year">${year}</h2> `) +
                    `</a>`
                document.querySelector('.results').innerHTML += movie;
            })
        })
        .catch(err => {
            console.error(err);
        });
}

function movieSelected(id) { // adds movie id to the session storage to link pages with each other
    sessionStorage.setItem('movieID', id);
    window.location = 'film_page.html';
    return false;
}

function getMovie() { // displays film info on a page
    let movieID = sessionStorage.getItem('movieID');

    fetch(`https://movies-tvshows-data-imdb.p.rapidapi.com/?type=get-movie-details&imdb=${movieID}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "movies-tvshows-data-imdb.p.rapidapi.com",
                "x-rapidapi-key": "0855a7dc2bmshbb15d878b7beaecp14d139jsn47534f3194df"
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            document.querySelector(".description__decription-text").innerHTML = data.description;
            document.querySelector(".rate-container__rate-number").innerHTML = data.imdb_rating;
            document.querySelector(".film-title").innerHTML = data.title;
            document.querySelector(".trailer").src = `https://www.youtube.com/embed/${data.youtube_trailer_key}`
        })
        .catch(err => {
            console.error(err);
        });

    fetch(`https://movies-tvshows-data-imdb.p.rapidapi.com/?type=get-movies-images-by-imdb&imdb=${movieID}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "movies-tvshows-data-imdb.p.rapidapi.com",
                "x-rapidapi-key": "0855a7dc2bmshbb15d878b7beaecp14d139jsn47534f3194df"
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.fanart);
            document.querySelector('.banner-container').style.backgroundImage = `url(${data.fanart})`;
            document.querySelector(".poster-image").src = data.poster;
        })
        .catch(err => {
            console.error(err);
        });
}