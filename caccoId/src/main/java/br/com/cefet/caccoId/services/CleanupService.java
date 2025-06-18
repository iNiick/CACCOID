package br.com.cefet.caccoId.services;

import br.com.cefet.caccoId.repositories.SolicitationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class CleanupService {
    private static final Logger log = LoggerFactory.getLogger(CleanupService.class);
    private final SolicitationRepository solicitationRepository;

    public CleanupService(SolicitationRepository solicitationRepository) {
        this.solicitationRepository = solicitationRepository;
    }

    @Scheduled(cron = "0 0 2 * * *")
    public void deleteOldRejections() {
        log.info("Iniciando deleção de carteirinhas rejeitadas.");
        try {
            int quantity = solicitationRepository.deleteOldRejectedSolicitations();
            log.info("{} carteirinhas foram deletadas.", quantity);
        }catch (Exception e){
            System.out.print(e.getMessage());
            log.error("Erro ao efeturar remoção de carteirinhas rejeitadas: {}", e.getMessage());
        }
    }
}
