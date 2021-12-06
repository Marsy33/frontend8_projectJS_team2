const input = document.getElementById('search-input');
const grid = document.getElementsByClassName('grid')[0];

input.addEventListener('keydown', function(event){
    if(event.key === 'Enter'){
        loadImg();
    }
})
function loadImg(){
    removeImages();
    const url = "https://imdb-api.com/en/API/SearchSeries/k_frzi7nll/" + input.value;
    fetch(url)
    .then(response =>response.json())
    .then(list => {
        const imageNode = [];
        for( let i = 0; i < list.results.length; i++){
            imageNode[i] = `<div class='imgTitle'>
            <img src = ${list.results[i].image} class='imgSer'>
            <div class='title'> ${list.results[i].title} </div>
            </div>`;
            //console.log(imageNode)
            
        }
        grid.innerHTML = imageNode;
    }

    )
        
    }

function removeImages(){
    grid.innerHTML = '';
}

document.addEventListener("DOMContentLoaded", function(event){
    const url = 'https://imdb-api.com/en/API/MostPopularTVs/k_frzi7nll';
    fetch(url)
    .then(response =>response.json())
    .then(list => {
        console.log(list)
        const imageNode = [];
        for( let i = 0; i < list.items.length; i++){
            imageNode[i] = `<div class='imgTitle'>
            <img src = ${list.items[i].image} class='imgSer'>
            <div class='title'> ${list.items[i].title} </div>
            <div class='year'>${list.items[i].year}</div>
            </div>`;
            //console.log(imageNode)
            
        }
        grid.innerHTML = imageNode;
    })
})
    
     

