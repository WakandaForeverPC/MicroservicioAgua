package com.proyecto.microservicioagua.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/agua")
public class AguaController {

    @GetMapping
    public String obtenerAgua() {
        // Lógica para obtener información de agua
        return "Información de agua";
    }

    @PostMapping
    public String crearAgua(@RequestBody String nuevaAgua) {
        // Lógica para crear nueva información de agua
        return "Nueva agua creada";
    }
}