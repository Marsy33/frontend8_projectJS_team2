fetch("https://imdb-api.com/API/Top250Movies/k_xz986m1x")

.then(response => response.json())
.then (data => {
    const list = data.items;
    list.map((item)=>{
        const name = item.fullTitle;
        const poster = item.image;
        const movie = `<li><img src="${poster}"> <h2>${name}</h2></li>`
	document.querySelector('.movies').innerHTML += movie
    })
})
.catch(err => {
	console.error(err);
});
