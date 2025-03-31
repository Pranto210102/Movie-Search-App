const API_URL = "https://www.omdbapi.com/?i=tt3896198&apikey=1e2f9e44";
const searchInput=document.getElementById('search-input');
const searchBtn=document.getElementById('SearchBtn');
const movieResults = document.getElementById('movieResults');
let favorites = document.getElementById('favorites');
let favoritesMovie = JSON.parse(localStorage.getItem('favorites')) || [];

document.addEventListener('DOMContentLoaded', displayFavorite);




async function fetchMovies(query) {
    try{
        const response= await fetch(`${API_URL}&s=${query}`);
        const data= await response.json();
    
        if(data.Response === 'True'){
            console.log(data);
            displayMovies(data.Search);
        }else{
            showNoResultMessage(query);
        }
    } catch(error) {
       console.log(`Error Occured while fatching movies:${error}`);
    }
}

function displayMovies(movies){
    movieResults.innerHTML = ""; 
     movies.forEach(movie => {
        const movieCard = document.createElement('div');
        const PosterUrl=movie.Poster;
        if(PosterUrl=="N/A") return;
        movieCard.innerHTML = `
            <img src="${PosterUrl}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
           <button onclick="addToFavorites('${movie.imdbID}', '${movie.Title.replace("'", "\\" + "'")}', '${
      movie.Poster
    }', '${movie.Year}')">Add to Favorites</button>`

        movieCard.classList="movie-card";
        movieResults.appendChild(movieCard);
    });
}

searchBtn.addEventListener('click',()=>{
    const query = searchInput.value.trim();
    if(query){
        fetchMovies(query);
    }
});


 function showNoResultMessage(query) {
    movieResults.innerHTML="";
    const messageDiv=document.createElement('div');
    messageDiv.innerHTML=`
    <p style="color: red; font-size: 1.2rem; text-align: center">
    No Movies found for ${query}. Try another search.
    </p>`;

    movieResults.appendChild(messageDiv);
}

function addToFavorites(id, title, poster, year){
    if (!favoritesMovie.some((movie) => movie.id === id)) {
        favoritesMovie.push({ id, title, poster, year });
        localStorage.setItem("favorites", JSON.stringify(favoritesMovie));
        displayFavorite();
      }
}

function displayFavorite(){
    favorites.innerHTML = ""; 
    favoritesMovie.forEach(movie => {
       const movieCard = document.createElement('div');
       const PosterUrl=movie.poster;
       if(PosterUrl=="N/A") return;
       movieCard.innerHTML = `
           <img src="${PosterUrl}" alt="${movie.title}">
           <h3>${movie.title}</h3>
           <p>${movie.year}</p>
          <button onclick="removeFavorites('${movie.id}')">Remove</button>`

       movieCard.classList="movie-card";
       favorites.appendChild(movieCard);
   });
}

function removeFavorites(id){
    favoritesMovie=favoritesMovie.filter((movie)=> movie.id != id);
    localStorage.setItem("favorites", JSON.stringify(favoritesMovie));
    displayFavorite();
}
