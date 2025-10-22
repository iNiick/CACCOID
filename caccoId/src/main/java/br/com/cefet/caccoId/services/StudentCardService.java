package br.com.cefet.caccoId.services;

import br.com.cefet.caccoId.dtos.StudentCardDTO;
import br.com.cefet.caccoId.mappers.StudentCardMapper;
import br.com.cefet.caccoId.models.Student;
import br.com.cefet.caccoId.models.StudentCard;
import br.com.cefet.caccoId.models.Solicitation;
import br.com.cefet.caccoId.repositories.StudentCardRepository;
import br.com.cefet.caccoId.repositories.StudentRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.com.cefet.caccoId.services.SolicitationService;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import br.com.cefet.caccoId.repositories.SolicitationRepository;
import br.com.cefet.caccoId.models.enums.SolicitationStatus;

@Service
public class StudentCardService {
    @Autowired
    private SolicitationService solicitationService;
    @Autowired
    private StudentCardRepository studentCardRepository;
    @Autowired
    private SolicitationRepository solicitationRepository;
    @Autowired
    private StudentRepository studentRepository;

    public StudentCardDTO getStudentCardByToken(String token) {
        StudentCard card = studentCardRepository.findByValidityToken(token)
                .orElseThrow(() -> new EntityNotFoundException("Carteirinha não encontrada"));
        return StudentCardMapper.toDTO(card);
    }

    public StudentCardDTO createStudentCard(Long solicitationId) {
        Solicitation solicitation = solicitationRepository.findById(solicitationId)
                .orElseThrow(() -> new EntityNotFoundException("Solicitação não encontrada"));

        Student student = solicitation.getStudent();
        if (student == null) {
            throw new EntityNotFoundException("Solicitação não está associada a um estudante");
        }

        LocalDate today = LocalDate.now();

        List<StudentCard> cards = studentCardRepository.findAllBySolicitation_Student_Id(student.getId());

        for (StudentCard c : cards) {
            if (c.isCurrentCard() && c.getValidity().isBefore(today)) {
                c.setCurrentCard(false);
                studentCardRepository.save(c);
            }
        }

        boolean hasActive = cards.stream().anyMatch(StudentCard::isCurrentCard);
        if (hasActive) {
            throw new IllegalStateException("Já existe uma carteirinha ativa para este estudante");
        }
        byte[] studentPhotoBytes = solicitation.getStudentPhoto();

        StudentCard newCard = StudentCard.builder()
                .solicitation(solicitation)
                .name(student.getName())
                .institution(student.getInstitution())
                .program(student.getProgram())
                .enrollmentNumber(student.getEnrollmentNumber())
                .dateOfBirth(student.getDateOfBirth())
                .educationLevel(student.getEducationLevel())
                .validity(LocalDate.of(today.getYear() + 1, 3, 31)) // validade até 31/03 do próximo ano
                .emissionDateTime(LocalDateTime.now())
                .isCurrentCard(true)
                .studentPhoto(studentPhotoBytes)
                .validityToken(UUID.randomUUID().toString())
                .build();

        StudentCard saved = studentCardRepository.save(newCard);

        solicitationService.updateStatus(
                (short) SolicitationStatus.ISSUED.getCode(),
                solicitation.getId()
        );


// Atualiza status da solicitação para EMITIDA apenas se for diferente
        Short statusIssuedCode = (short) SolicitationStatus.ISSUED.getCode();
        if (solicitation.getStatus().getCode() != statusIssuedCode) {
            solicitationService.updateStatus(statusIssuedCode, solicitation.getId());
        }
        return StudentCardMapper.toDTO(saved);
    }
    public StudentCard getStudentCardById(Long id) {
        return studentCardRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Carteirinha não encontrada"));
    }
}
