package br.com.cefet.caccoId.infra.security;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class KeepAliveBackend {

    private static final Logger logger = LoggerFactory.getLogger(KeepAliveBackend.class);
    private final RestTemplate restTemplate = new RestTemplate();

    // URL do backend
    private final String backendUrl = "https://caccoid-backend.onrender.com/health";

    // Executa a cada 10 minutos (600000 ms)
    @Scheduled(fixedRate = 10 * 60 * 1000)
    public void pingBackend() {
        try {
            String response = restTemplate.getForObject(backendUrl, String.class);
            logger.info("Ping do backend realizado com sucesso: {}", response);
        } catch (Exception e) {
            logger.error("Falha ao pingar backend: {}", e.getMessage());
        }
    }
}
