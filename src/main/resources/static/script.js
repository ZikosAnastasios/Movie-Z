$(document).ready(() => {

    $('#searchForm').keyup((e) => {
        var searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
        $("body").removeClass("back_img");
        $(".header").css("background-color", " #4d036b");
    });

    $('#registrationForm').submit(function(e){
         e.preventDefault();

         fire_submit();
    });

    $('#loginForm').submit(function(e){
        e.preventDefault();
        fire_login();
    });

});

/*Get the movies by name */
function getMovies(searchText) {

    $.getJSON("https://www.omdbapi.com/?", { apikey: "75285fa6", s: searchText },function(movies){
        let output = '';
        $.each(movies.Search, function(index, movie){
            output += `
                <div>
                    <img src="${movie.Poster}">
                    <h3>${movie.Title}</h3>
                    <div id='${movie.imdbID}' style='display: none;' class='vis'>
                    </div>
                    <button onclick="visibility('${movie.imdbID}')" href="#" class="${movie.imdbID}" class="smallBtn">Learn More </button>
                    <button onclick="save('${movie.imdbID}')"> Save </button>
                </div>
            `;
        });

        $('#movies').html(output);
    })
}

/*Make movie's details visible or not depending on the button "Learn More"*/
function visibility(id){
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

/* Show movie's details when th button "Learn more" is clicked */
function getMovie(mId){
    $.getJSON("https://www.omdbapi.com/?", { apikey: "75285fa6", i: mId },function(movie){
    /*.then((response) => {*/
        console.log(movie);
        let output =`
        <ul>
              <li ><strong>Genre:</strong> ${movie.Genre}</li>
              <li ><strong>Released:</strong> ${movie.Released}</li>
              <li><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
              <li><strong>Director:</strong> ${movie.Director}</li>
              <li><strong>Plot:</strong> ${movie.Plot}</li>
              <li><strong>Actors:</strong> ${movie.Actors}</li>
          </ul>
          `
        console.log(mId);
        document.getElementById(mId).innerHTML =output;
        console.log($(mId).html(output));
    })

}

/* Function for user's registration */
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
            window.location.replace("login.html");
        },
        error: function (e) {
            console.log("ERROR : ", e);
            $(".signupbtn").prop("disabled", false);

        }
    });
}

/* Allows user to log out */
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
            window.location.replace("index.html");
            localStorage.setItem('mail', email);
            console.log(localStorage.getItem("mail"));
        },
        error: function (e) {
            console.log("ERROR : ", e);
            $(".signinbtn").prop("disabled", false);
        }
    });
}

/* Allows user to log out */
function logout() {

    localStorage.removeItem("mail");
    window.location.replace("index.html");

}

/* Here we save user's bookmarks */
function save(movieId) {
    console.log("I got here for save");

    var movies = {}
    var email = localStorage.getItem("mail");
    movies["movieId"] = movieId;

    console.log("users/" + email + "/bookmarks");
    if (email !== null) {
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "users/" + email + "/bookmarks",
            data: JSON.stringify(movies),
            dataType: 'text',
            cache: false,
            timeout: 600000,
            success: function () {
                console.log("saved ");
            },
            error: function (e) {
                console.log("ERROR : ", e);
            }
        });
    } else {
        window.alert("You must login or register!");
    }
}

/* The function called to display user's bookmarks*/
function displayResults(movieId) {
    console.log("display function");
    console.log(movieId);
    let output ="";
    $.getJSON("https://www.omdbapi.com/?", { apikey: "75285fa6", i: movieId },function(movie){
         output = `
            <div>
              <img src="${movie.Poster}">
              <h3>${movie.Title}</h3>
              <div id='${movie.imdbID}' style='display: none;' class='vis'>
              </div>
              <button onclick="visibility('${movie.imdbID}')" href="#" class="${movie.imdbID}" class="smallBtn">Learn More </button>
            </div>
         `;
         $('#movies').append(output);
    });
}

/* Get and display user's bookmarks */
function getBookmarks(){
    console.log("I got here for get");
    var email = localStorage.getItem("mail");
    var results;

    if(email!==null){
        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "users/"+email ,
            data: JSON.stringify(),
            dataType: 'text',
            cache: false,
            timeout: 600000,
            success: function (data) {
                console.log("displayed ");
                results =data;
                //window.location.replace("index.html");
                $.each(JSON.parse(results), function(i, movie) {
                    var movie = movie.movieId;
                    displayResults(movie);
                    console.log(movie);
                })
            },
            error: function (e) {
                console.log("ERROR : ", e);
            }
        });
    }else{
        window.alert("You must login or register!");
    }
}

/* Redirect to the home page */
function redirect() {
    window.location.replace("index.html");
}


