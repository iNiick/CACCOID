package br.com.cefet.caccoId.mappers;

import br.com.cefet.caccoId.dtos.StudentCardDTO;
import br.com.cefet.caccoId.models.Solicitation;
import br.com.cefet.caccoId.models.StudentCard;
import java.util.Base64;

public class StudentCardMapper {

    public static StudentCardDTO toDTO(StudentCard studentCard) {
        if (studentCard == null) return null;
        var student = studentCard.getSolicitation() != null
                ? studentCard.getSolicitation().getStudent()
                : null;


        return StudentCardDTO.builder()
                .id(studentCard.getId())
                .name(studentCard.getName())
                .institution(studentCard.getInstitution())
                .program(studentCard.getProgram())
                .enrollmentNumber(studentCard.getEnrollmentNumber())
                .dateOfBirth(studentCard.getDateOfBirth())
                .educationLevel(studentCard.getEducationLevel())
                .validity(studentCard.getValidity())
                .emissionDateTime(studentCard.getEmissionDateTime())
                .validityToken(studentCard.getValidityToken())
                .isCurrentCard(studentCard.isCurrentCard())
                .studentId(student != null ? student.getId() : null)
                .studentPhotoBase64(studentCard.getStudentPhoto() != null ?
                        Base64.getEncoder().encodeToString(studentCard.getStudentPhoto()) : null)
                .cpf(student != null ? student.getCpf() : null)
                .rg(student != null ? student.getRg() : null)
                .build();
    }

    public static StudentCard toEntity(StudentCardDTO dto) {
        if (dto == null) return null;

        StudentCard.StudentCardBuilder builder = StudentCard.builder()
                .id(dto.getId())
                .name(dto.getName())
                .institution(dto.getInstitution())
                .program(dto.getProgram())
                .enrollmentNumber(dto.getEnrollmentNumber())
                .dateOfBirth(dto.getDateOfBirth())
                .educationLevel(dto.getEducationLevel())
                .validity(dto.getValidity())
                .emissionDateTime(dto.getEmissionDateTime())
                .validityToken(dto.getValidityToken())
                .isCurrentCard(dto.isCurrentCard())
                .studentPhoto(Base64.getDecoder().decode(dto.getStudentPhotoBase64()));

        if (dto.getSolicitationId() != null) {
            builder.solicitation(Solicitation.builder().id(dto.getSolicitationId()).build());
        }

        return builder.build();
    }
}
