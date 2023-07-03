window.onload = () => {
    getOriginals()
    getTrendingNow()
    getTopRated()
  }
  
  // ** Helper function that makes dynamic API calls **
  function fetchMovies(url, dom_element, path_type) {
    // Use Fetch with the url passed down 
   fetch(`${url}`)
   .then(response => {
    if(response.ok){
      return response.json()
    }else{
      throw new Error("something went wrong")
    }})
    .then(json => {
    showMovies(json, dom_element, path_type)
    }

   ).catch(error => console.log(error))
    // Within Fetch get the response and call showMovies() with the data , dom_element, and path type
  }
  
  //  ** Function that displays the movies to the DOM **
  showMovies = (movies, dom_element, path_type) => {
    
    // Create a variable that grabs id or class
   var ele = document.querySelector(dom_element)

   
    // Loop through object
    for(var movie of movies.results){

      let image = document.createElement("img")
      image.setAttribute('data-id', movie.id)
      image.src = `https://image.tmdb.org/t/p/original${movie.poster_path}`
      image.addEventListener('click', e => {
        handleMovieSelection(e)
      })
      // ele.innerHTML = `<img src="${item}.${path_type}" alt="">`
      ele.appendChild(image)
       
     }

    }
    function fetchMovies1(url, dom_element, path_type) {
      // Use Fetch with the url passed down 
     fetch(`${url}`)
     .then(response => {
      if(response.ok){
        return response.json()
      }else{
        throw new Error("something went wrong")
      }})
      .then(json => {
      showMovies1(json, dom_element, path_type)
      }
  
     ).catch(error => console.log(error))
      // Within Fetch get the response and call showMovies() with the data , dom_element, and path type
    }

    showMovies1 = (movies, dom_element, path_type) => {
    
      // Create a variable that grabs id or class
     var ele = document.querySelector(dom_element)
  
     
      // Loop through object
      for(var movie of movies.results){
  
        let image = document.createElement("img")
        image.setAttribute('data-id', movie.id)
        image.src = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        // ele.innerHTML = `<img src="${item}.${path_type}" alt="">`
        image.addEventListener('click', e => {
          handleMovieSelection(e)
        })

        ele.appendChild(image)
         
       }
  
      }
  
  
  // ** Function that fetches Netflix Originals **
  function getOriginals() {
    const url = 'https://api.themoviedb.org/3/discover/tv?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213'
    let elem = ".original__movies"
    fetchMovies(url, elem, "poster-path")
  }
  // ** Function that fetches Trending Movies **
  function getTrendingNow() {
    const url = 'https://api.themoviedb.org/3/trending/movie/week?api_key=19f84e11932abbc79e6d83f82d6d1045'
    
    fetchMovies1(url, "#trending", "backdrop_path")
  
  }
  // ** Function that fetches Top Rated Movies **
  function getTopRated() {
    const url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&page=1'
    fetchMovies1(url, "#top_rated", "backdrop_path")
  
  }
  
  // ** BONUS **
  
  async function getMovieTrailer(id) {
    var url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US`
    return await fetch(url).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('something went wrong')
      }
    })
  }
  
  const setTrailer = trailers => {
    const iframe = document.getElementById('movieTrailer')
    const movieNotFound = document.querySelector('.movieNotFound')
    if (trailers.length > 0) {
      movieNotFound.classList.add('d-none')
      iframe.classList.remove('d-none')
      iframe.src = `https://www.youtube.com/embed/${trailers[0].key}`
    } else {
      iframe.classList.add('d-none')
      movieNotFound.classList.remove('d-none')
    }
  }
  
  const handleMovieSelection = e => {
    const id = e.target.getAttribute('data-id')
    const iframe = document.getElementById('movieTrailer')
    // here we need the id of the movie
    getMovieTrailer(id).then(data => {
      const results = data.results
      const youtubeTrailers = results.filter(result => {
        if (result.site == 'YouTube' && result.type == 'Trailer') {
          return true
        } else {
          return false
        }
      })
      setTrailer(youtubeTrailers)
    })
  
    // open modal
    $('#trailerModal').modal('show')
    // we need to call the api with the ID
  }
  
  