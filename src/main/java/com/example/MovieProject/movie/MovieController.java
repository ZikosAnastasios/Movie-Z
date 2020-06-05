package com.example.MovieProject.movie;

import com.example.MovieProject.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.MovieProject.user.User;
import java.util.ArrayList;
import java.util.List;


@RestController
public class MovieController {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private UserRepository userRepository;

    @RequestMapping("/users/{mail}")
    public List<Movie> getBookmarks(@PathVariable("mail") String mail) {
        User member = userRepository.findByMail(mail);
        int userId;
        if( member !=null ){
            userId = member.getId();
            return movieRepository.findByUsersId(userId);
        } else {
            return null;
        }
    }

    @RequestMapping(method = RequestMethod.POST, value="/users/{mail}/bookmarks")
    public void addBookmark(@RequestBody Movie movie, @PathVariable("mail") String mail){
        User member = userRepository.findByMail(mail);
        int userId;
        if( member !=null ){
            userId = member.getId();
        } else {
            return;
        }
        List<User> users = new ArrayList<User>();
        users.add(new User(userId,"", "",""));
        movie.setUsers(users);
        movieRepository.save(movie);
    }
}