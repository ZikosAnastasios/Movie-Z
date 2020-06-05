package com.example.MovieProject.movie;

import com.example.MovieProject.user.User;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import java.util.List;

@Entity
public class Movie{

    @Id
    private String movieId;

    @ManyToMany
    List <User> users;

    //Empty constructor
    public Movie() {}

    //Constructor
    public Movie(String movieId, int userId) {
        super();
        this.movieId = movieId;
        this.users = (List<User>) new User(userId, "","","");
    }

    public String getMovieId() {
        return movieId;
    }

    public void setMovieId(String movieId) {
        this.movieId = movieId;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> user) {
        this.users = user;
    }

    public void addUser(int userId){
        User user = new User(userId,"", "","");
        this.users.add(user);
    }

}