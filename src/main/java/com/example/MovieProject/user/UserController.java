package com.example.MovieProject.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class UserController {



    @Autowired
    private UserRepository userRepository;



   /* @RequestMapping(method = {RequestMethod.POST, RequestMethod.GET}, value ="/registration")
    public @ResponseBody String register(@RequestParam("mail") String mail, @RequestParam("password") String password, @RequestParam("passwordConfirm") String passwordConfirm){
        User newuser = userRepository.findByMail(mail);
        if(password.equals(passwordConfirm) && newuser==null){
            User user = new User();
            user.setUsername(mail);
            user.setPassword(password);
            user.setPasswordConfirm(passwordConfirm);
            userRepository.save(user);
            return "index";
        }else{
            return "register" ;
        }
    }*/

     @RequestMapping(method = RequestMethod.POST, value ="/registration")
    public @ResponseBody String register(@RequestBody User user){
         String email = user.getMail();
         String password = user.getPassword();
         String passwordConfirm = user.getPasswordConfirm();
         User newUser = userRepository.findByMail(email);
         //return (user.getMail() + " " + password + " " + passwordConfirm);

        if(password.equals(passwordConfirm) && newUser==null && email!=null){
            User registeredUser = user;
            userRepository.save(registeredUser);
            return "index";
        }else{
            return "register" ;
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


    /*
    @RequestMapping("/registration")
    public String registration(Model model) {
        model.addAttribute("registrationForm", new User());

        return "registration";
    }

    @RequestMapping( method = RequestMethod.POST, value="/registration")
    public String register(@ModelAttribute("registrationForm") User user, BindingResult bindingResult) {

        userService.register(user);



        return "redirect:/welcome";
    }

    @RequestMapping("/login")
    public String login(Model model, String error, String logout) {
        if (error != null)
            model.addAttribute("error", "Your username or password is invalid.");

        if (logout != null)
            model.addAttribute("message", "You have been logged out successfully.");

        return "login";
    }

    @RequestMapping({"/", "/welcome"})
    public String welcome(Model model) {
        return "welcome";
    }

     */
}