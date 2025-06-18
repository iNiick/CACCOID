package br.com.cefet.caccoId.services;

import br.com.cefet.caccoId.models.Solicitation;
import br.com.cefet.caccoId.models.User;
import br.com.cefet.caccoId.models.enums.SolicitationStatus;
import br.com.cefet.caccoId.repositories.SolicitationRepository;
import jakarta.persistence.EntityNotFoundException;
import org.apache.tika.Tika;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Base64;
import java.util.Map;

@Service
public class SolicitationService {
    @Autowired
    private SolicitationRepository solicitationRepository;

    public Solicitation getSolicitation(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();
        return solicitationRepository.getSolicitationStatusByLoggedUser(user.getId());
    }

    public Map<String, ?> formatSolicitation(Solicitation solicitation){
        var requestDate = solicitation.getRequestDate();

        var requestDateFormated = String.format("%02d/%02d/%d",
                requestDate.getDayOfMonth(),
                requestDate.getMonthValue(),
                requestDate.getYear());

        byte[] photoBytes = solicitation.getStudentPhoto();
        Tika tika = new Tika();
        String mimeType = tika.detect(photoBytes);
        String base64 = Base64.getEncoder().encodeToString(photoBytes);
        return Map.of(
                "studentName", solicitation.getStudent().getName(),
                "requestDate", requestDateFormated,
                "status", solicitation.getStatus().getStatus(),
                "photo", "data:" + mimeType + ";base64," + base64,
                "rejected", solicitation.getRejected(),
                "pendingEdit", solicitation.getPendingEdit());
    }



    public Solicitation updateStatus(Short newStatus){
        SolicitationStatus[] statuses = SolicitationStatus.values();

        if (newStatus < 0 || newStatus >= statuses.length) {
            throw new IllegalArgumentException("Status inválido.");
        }

        var solicitation = this.getSolicitation();
        SolicitationStatus updatedStatus = statuses[newStatus];

        if (solicitation.getStatus().equals(updatedStatus)) {
            throw new IllegalArgumentException("O estado passado como parâmetro é o estado atual.");
        }

        if(!(this.finalStatusReached(solicitation.getStatus()))){
            solicitation.setStatus(updatedStatus);
            solicitationRepository.save(solicitation);
        }
        return solicitation;
    }

    public Solicitation setSolicitationInitialValues(Solicitation solicitation){
        solicitation.setStatus(SolicitationStatus.UNDER_REVIEW);
        solicitation.setPaid(false);
        solicitation.setNeedsCorrection(false);
        solicitation.setCorrected(false);
        solicitation.setAdminNote("");
        if(solicitation.isVirtualOnly()) {
            solicitation.setPickupLocation("");
        }
        ZonedDateTime zonedNow = ZonedDateTime.now(ZoneId.of("America/Sao_Paulo"));
        solicitation.setRequestDate(zonedNow.toLocalDateTime());
        solicitation.setPendingEdit(false);
        solicitation.setRejected(false);
        return solicitation;
    }

    public boolean finalStatusReached(SolicitationStatus solicitationStatus){
        return solicitationStatus == SolicitationStatus.AUTHORIZED;
    }

    public void rejectById(Long id){
        Solicitation solicitation = solicitationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Solicitação não encontrada."));

        solicitation.setRejected(true);
        solicitation.setRejectedAt(LocalDateTime.now());
        solicitationRepository.save(solicitation);
    }
}
