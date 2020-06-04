$(document).ready(() => {
    console.log("I got here 1");

    $('#searchForm').keyup((e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });

   $('#registrationForm').submit(function(e){
        e.preventDefault();

        fire_submit();
    });

    $('#loginForm').submit(function(e){
        e.preventDefault();

        fire_login();
    });


    console.log("I got here 2");
});

function getMovies(searchText){
    axios.get('http://www.omdbapi.com?&apikey=75285fa6&s='+searchText)
        .then((response) => {
            console.log(response);
            let movies = response.data.Search;
            let output = '';
            $.each(movies, (index, movie) => {
                output += `
            <div>
              <img src="${movie.Poster}">
              <h3>${movie.Title}</h3>
              <div id='${movie.imdbID}' style='display: none;' class='vis'>
              </div>
              <button onclick="visibility('${movie.imdbID}')" href="#" class="${movie.imdbID}" class="smallBtn">Learn More </button>
              <button> Save </button>
            </div>
        `;
            });

            $('#movies').html(output);
        })
        .catch((err) => {
            console.log(err);
        });
}

function visibility(id){
  sessionStorage.setItem('movieId', id);
  var mId = id;
  console.log(mId);
  var vis = document.getElementById(mId);
  console.log(vis);
  var btnMovie = document.getElementsByClassName(mId);
  console.log(btnMovie);

  if (vis.style.display === "none") {
    getMovie(mId);
    vis.style.display = "inline";
    btnMovie.item(0).textContent = "Read less";
  } else {
    vis.style.display = "none";
    btnMovie.item(0).textContent = "Read more";
  }
  
  return false;
}

function getMovie(id){
  let movieId = sessionStorage.getItem('movieId');

  axios.get('http://www.omdbapi.com?&apikey=75285fa6&i='+movieId)
    .then((response) => {
      console.log(response);
      let movie = response.data;
      let output =`
      <ul>
            <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
            <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
            <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
            <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
            <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
            <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
            <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
        </ul>
        `
      console.log(movieId);
      document.getElementById(movieId).innerHTML =output;
      console.log($(movieId).html(output));
    })
    .catch((err) => {
      console.log(err);
    });

}

function fire_submit() {

    console.log("I got here 3");

    var userCredentials={}
    var email = $("#reg-email").val();
    var psw = $("#reg-psw").val();
    var pswRepeat = $("#psw-repeat").val();
    userCredentials["mail"]= email;
    userCredentials["password"]= psw;
    userCredentials["passwordConfirm"]= pswRepeat;

    $(".signupbtn").prop("disabled", true);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "registration",
        data: JSON.stringify(userCredentials),
        dataType: 'text',
        cache: false,
        timeout: 600000,
        success: function () {
            console.log("SUCCESS ");
            $(".signupbtn").prop("disabled", false);
            window.location.replace("index.html");
        },
        error: function (e) {
            console.log("ERROR : ", e);
            $(".signupbtn").prop("disabled", false);

        }
    });

}

function fire_login() {

    console.log("I got here 4");

    var userCredentials={}
    var email = $("#email").val();
    var psw = $("#psw").val();
    userCredentials["mail"]= email;
    userCredentials["password"]= psw;

    $(".signupbtn").prop("disabled", true);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "login",
        data: JSON.stringify(userCredentials),
        dataType: 'text',
        cache: false,
        timeout: 600000,
        success: function () {
            console.log("loggedIn ");
            $(".signinbtn").prop("disabled", false);
            //window.location.replace("index.html");
            sessionStorage.setItem('mail', email);
            console.log(sessionStorage.getItem("mail"));
        },
        error: function (e) {
            console.log("ERROR : ", e);
            $(".signinbtn").prop("disabled", false);

        }
    });

}

function logout() {
    console.log(this);
    sessionStorage.removeItem(this);
    for(var i=0; i<sessionStorage.length; i++){
        console.log(sessionStorage.getItem("mail"));
    }
}

function redirect() {
  window.location.replace("index.html");
}

function here() {
    console.log("here");
}

