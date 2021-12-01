const input = document.getElementById('search');
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
            <div> ${list.results[i].title} </div>
            </div>`;
            console.log(imageNode)
            
        }
        grid.innerHTML = imageNode;
    }

    )
        
    }

function removeImages(){
    grid.innerHTML = '';
}