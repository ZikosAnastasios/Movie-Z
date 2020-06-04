package com.example.MovieProject.movie;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.example.MovieProject.user.User;

import javax.websocket.server.PathParam;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class MovieController {



    @Autowired
    private MovieRepository movieRepository;


    @RequestMapping("/users/{userId}")
    public List<Movie> getBookmarks(@PathVariable("userId") int userId){
        return movieRepository.findByUsersId(userId);
    }


    @RequestMapping(method = RequestMethod.POST, value="/users/{userId}/bookmarks")
    public void addBookmark(@RequestParam("movieId") String movieId, @PathVariable("userId") int userId){
        Movie movie = new Movie();
        movie.setMovieId(movieId);
        List<User> users = new ArrayList<User>();
        users.add(new User(userId,"", "",""));
        movie.setUsers(users);
        movieRepository.save(movie);
    }
}