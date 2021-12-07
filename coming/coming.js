document.addEventListener("DOMContentLoaded", function (event) {
    showMovies();
});

let oneMovie = document.getElementById("comingsoon");


function showMovies() {
    fetch('https://imdb-api.com/en/API/ComingSoon/k_23ftiwll')
    .then(response => response.json())
    .then(movielist => {
        let moviesContainer = document.getElementById('comingsoon');
        for (let i = 0; i < movielist.items.length; i++) {
            if (!movielist.items[i]) continue;
            let info = movielist.items[i];
            if (info.title && info.releaseState && info.year) {
                let poster = '';
                if (info.image) {
                    poster = info.image;
                }
                let movieElement = document.createElement('div');
                movieElement.innerHTML =
                    `<div class="movie__content">
                        <figure>
                            <img class="movie__image" alt="" src="${poster}">
                            <figcaption class="movie__data">
                                <div class="movie__title">${info.title}</div>
                                <div class="movie__release">${info.releaseState}</div>
                                <div class="movie__year">${info.year}</div>
                            </figcaption>
                        </figure>
                    </div>`;
                movieElement.movieInfo = info;
                movieElement.onclick = function () {
                    showMovieInfoPopup(this.movieInfo);
                };
                moviesContainer.appendChild(movieElement);
            }
        }
        $('.movies-carousel').slick({
            dots: false,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 5000,
            slidesToShow: 4,
            slidesToScroll: 1,
            responsive: [{
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1,
                            infinite: true,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 400,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        });
}

function showMovieInfoPopup(info) {
    let popup = document.createElement('div');
    popup.id = 'movie-info-view';
    popup.className = 'modal opened';
    let description = info.plot;
    if (!description) {
        description = `Sorry, there's no description for this movie.`
    }
    popup.innerHTML = `
        <div id="openModal" class="modal opened">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">${info.title}</h3>
                    <a href="#close" title="Close" class="close">×</a>
                </div>
                <div class="modal-body">    
                    <p>${description}</p>
                </div>
                </div>
            </div>
        </div>`;
    popup.getElementsByClassName('close')[0].onclick = function () {
        document.getElementById('movie-info-view').remove();
    }
    document.body.appendChild(popup);
}