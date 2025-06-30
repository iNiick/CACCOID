package br.com.cefet.caccoId.models.enums;

import lombok.Getter;

@Getter
public enum SolicitationStatus {
    UNDER_REVIEW("EM_ANALISE"),
    PENDING("PENDENTE"),
    AUTHORIZED("AUTORIZADA");

    private final String status;

    SolicitationStatus(String status) {
        this.status = status;
    }

    public SolicitationStatus next() {
        return switch (this) {
            case UNDER_REVIEW -> PENDING;
            case PENDING, AUTHORIZED -> AUTHORIZED;
        };
    }

    public static SolicitationStatus fromString(String status) {
        for (SolicitationStatus s : values()) {
            if (s.getStatus().equalsIgnoreCase(status)) {
                return s;
            }
        }
        throw new IllegalArgumentException("Status inválido: " + status);
    }
}
