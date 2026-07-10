package com.wellnessos.dto;

public class OtpRequest {
    private String email;
    private String name;
    private boolean signUp;

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public boolean isSignUp() { return signUp; }
    public void setSignUp(boolean signUp) { this.signUp = signUp; }
}
