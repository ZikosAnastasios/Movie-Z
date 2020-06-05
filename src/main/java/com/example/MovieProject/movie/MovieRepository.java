package com.example.MovieProject.movie;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MovieRepository extends CrudRepository<Movie, String> {
    public List<Movie> findByUsersId(int userId);
}