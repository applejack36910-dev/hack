package com.example.hackathon.controller;

import com.example.hackathon.entity.Participant;
import com.example.hackathon.repository.ParticipantRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/participants")
public class ParticipantController {


private final ParticipantRepository participantRepository;

public ParticipantController(ParticipantRepository participantRepository) {
    this.participantRepository = participantRepository;
}

@PostMapping
@ResponseStatus(HttpStatus.CREATED)
public Participant createParticipant(@RequestBody Participant participant) {
    return participantRepository.save(participant);
}

@GetMapping
public List<Participant> getAllParticipants() {
    return participantRepository.findAll();
}

@GetMapping("/{id}")
public Participant getParticipantById(@PathVariable Long id) {
    return participantRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Participant not found"));
}

@PutMapping("/{id}")
public Participant updateParticipant(
        @PathVariable Long id,
        @RequestBody Participant updatedParticipant) {

    Participant participant = participantRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Participant not found"));

    participant.setName(updatedParticipant.getName());
    participant.setEmail(updatedParticipant.getEmail());
    participant.setTeamName(updatedParticipant.getTeamName());

    return participantRepository.save(participant);
}

@DeleteMapping("/{id}")
@ResponseStatus(HttpStatus.NO_CONTENT)
public void deleteParticipant(@PathVariable Long id) {
    if (!participantRepository.existsById(id)) {
        throw new RuntimeException("Participant not found");
    }

    participantRepository.deleteById(id);
}


}
