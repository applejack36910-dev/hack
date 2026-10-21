package com.example.hackathon;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

@GetMapping("/hello")
public String sayHello() {
    return "Hello! My Spring Boot application is working!";
}


}
