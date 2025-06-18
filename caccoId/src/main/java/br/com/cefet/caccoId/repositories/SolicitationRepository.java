package br.com.cefet.caccoId.repositories;

import br.com.cefet.caccoId.models.Solicitation;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

public interface SolicitationRepository extends JpaRepository<Solicitation, Long> {
    @Query(value = """
            SELECT s.*
            FROM solicitation s
            JOIN student st ON s.student_id = st.id
            WHERE st.user_id = :userId
            """, nativeQuery = true)
    Solicitation getSolicitationStatusByLoggedUser(Long userId);

    @Modifying
    @Transactional
    @Query(value = """
        DELETE FROM solicitation
        WHERE rejected = true
          AND rejected_at IS NOT NULL
          AND rejected_at < NOW() - INTERVAL 7 DAY
        """, nativeQuery = true)
    int deleteOldRejectedSolicitations();
}
