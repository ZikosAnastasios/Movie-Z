package com.example.MovieProject.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;


    @RequestMapping(method = RequestMethod.POST, value ="/registration")
    public @ResponseBody String register(@RequestBody User user){
        String email = user.getMail();
        String password = user.getPassword();
        String passwordConfirm = user.getPasswordConfirm();
        User newUser = userRepository.findByMail(email);

        if(password.equals(passwordConfirm) && newUser==null && email!=null){
            User registeredUser = user;
            userRepository.save(registeredUser);
            return "index.html";
        }else{
            return "register.html" ;
        }
    }

    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public List<User> getUser(){
        List<User> users = new ArrayList<User>();
        userRepository.findAll().forEach(users::add);

        return users;
    }

    @RequestMapping(value = "/error", method = RequestMethod.POST)
    public String getError(Error e){
        return e.toString();
    }

    @RequestMapping(value ="/login" , method = RequestMethod.POST)
    public  @ResponseBody String login(@RequestBody User user){
         String mail = user.getMail();
         String password = user.getPassword();

         User member = userRepository.findByMail(mail);

         if(member!=null){
             String passCheck = member.getPassword();
             if(passCheck.equals(password)) {
                 return "SUCCESS";
             }
             return "Invalid password";
         }else {
             return "Invalid username";
         }
    }

}