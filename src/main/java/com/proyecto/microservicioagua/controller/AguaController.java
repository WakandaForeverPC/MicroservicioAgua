package com.proyecto.microservicioagua.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AguaController {

    @GetMapping("/agua")
    public String showCity() {
        return "board-agua";
    }
}