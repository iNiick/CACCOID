package br.com.cefet.caccoId.services;

import br.com.cefet.caccoId.dtos.StudentCardDTO;
import br.com.cefet.caccoId.mappers.StudentCardMapper;
import br.com.cefet.caccoId.models.Student;
import br.com.cefet.caccoId.models.StudentCard;
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
import br.com.cefet.caccoId.models.Solicitation;

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

    public StudentCardDTO getStudentCardByStudentId(Long StudentId) {
        StudentCard card = studentCardRepository.findByStudentId(StudentId)
                .orElseThrow(() -> new EntityNotFoundException("Carteirinha não encontrada"));
        return StudentCardMapper.toDTO(card);
    }

    public StudentCardDTO createStudentCard(Long studentId) {
        // Busca estudante
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new EntityNotFoundException("Estudante não encontrado"));

        LocalDate today = LocalDate.now();

        // Busca todas as carteirinhas do estudante
        List<StudentCard> cards = studentCardRepository.findAllByStudentId(studentId);

        // Desativa carteirinhas expiradas -- CONFERIR O ENUM SolicitationStatus

        Short statusCode = (short) SolicitationStatus.fromString("AUTORIZADA").getCode();
        SolicitationStatus status = SolicitationStatus.fromCode(statusCode);

        boolean exists = solicitationRepository.existsByStudentIdAndStatus(studentId, status);
        // por exemplo, status 2

        boolean hasActive = false;
        if (exists) {
            statusCode = 1;
        }
        for (StudentCard c : cards) {
            if (c.isCurrentCard() && c.getValidity().isBefore(today)) {
                c.setCurrentCard(false);
                studentCardRepository.save(c);
                solicitationService.updateStatus(statusCode, studentId);
                // Status "Autorizada"

            }
            if (c.isCurrentCard()) {
                hasActive = true;
            }
        }

        // Impede criação se já existir carteirinha ativa
        if (hasActive) {
            throw new IllegalStateException("Já existe uma carteirinha ativa para este estudante");
        }

        // Cria nova carteirinha
        StudentCard newCard = StudentCard.builder()
                .student(student)
                .name(student.getName())
                .institution(student.getInstitution())
                .program(student.getProgram())
                .enrollmentNumber(student.getEnrollmentNumber())
                .dateOfBirth(student.getDateOfBirth())
                .educationLevel(student.getEducationLevel())
                // Validade sempre 31/03 do ano seguinte
                .validity(LocalDate.of(today.getYear() + 1, 3, 31))
                .emissionDateTime(LocalDateTime.now())
                .isCurrentCard(true)
                .validityToken(UUID.randomUUID().toString()) // placeholder
                .build();

        StudentCard saved = studentCardRepository.save(newCard);
        statusCode = (short) 3; // Status "EMITIDA"
        solicitationService.updateStatus(statusCode,studentId);
        return StudentCardMapper.toDTO(saved);
    }
}
