package com.example.MovieProject.user;

import javax.persistence.Transient;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String mail;
    private String password;


    @Transient
    private String passwordConfirm;

    //Empty constructor
    public User() {}

    //Constructor
    public User(int id, String mail, String password, String passwordConfirm) {
        super();
        this.id = id;
        this.mail = mail;
        this.password = password;
        this.passwordConfirm = passwordConfirm;
    }

    public int getId() {
        return id;
    }

    public String getMail() { return mail; }

    public String getPassword() {
        return password;
    }

    public String getPasswordConfirm() {
        return passwordConfirm;
    }

    public void setId(int userId) {
        this.id = userId;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setPasswordConfirm(String passwordConfirm) {
        this.passwordConfirm = passwordConfirm;
    }
}