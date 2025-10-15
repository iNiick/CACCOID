package br.com.cefet.caccoId.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.time.LocalDate;


@Entity
@Table(name = "student_card")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@EqualsAndHashCode(of = "id")

public class StudentCard{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String institution;

    @Column(nullable = false)
    private String program;

   @Column(nullable = false)
    private String enrollmentNumber;

   @Column(nullable = false)
    private LocalDate dateOfBirth;

    @Column(nullable = false)
    private String educationLevel;

    @Column(nullable = false)
    private LocalDate validity;
    
    @Column(nullable = false)
    private LocalDateTime emissionDateTime;

    @Column(nullable = false)
    private boolean isCurrentCard;

    @Column(nullable = false)
    private String validityToken;

    @Lob
    @Column(columnDefinition = "MEDIUMBLOB")
    private byte[] studentPhoto;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @PrePersist
    public void prePersist() {
        if (emissionDateTime == null) {
            emissionDateTime = LocalDateTime.now();
        }
    }
}