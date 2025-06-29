package br.com.cefet.caccoId.controllers;

import br.com.cefet.caccoId.dtos.ApiResponseDTO;
import br.com.cefet.caccoId.dtos.UpdateStatusDTO;
import br.com.cefet.caccoId.models.enums.SolicitationStatus;
import br.com.cefet.caccoId.services.SolicitationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.EntityNotFoundException;
import org.apache.tika.Tika;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Base64;
import java.util.Map;

@RestController
@RequestMapping("/solicitation")
@Tag(name = "Gerenciamento de Solicitações", description = "Endpoints para gerenciar solicitações")
public class SolicitationController {
    @Autowired
    private SolicitationService solicitationService;

    @GetMapping()
    @Operation(
            summary = "Retorna o status da solicitação do usuário",
            description = "Busca os dados da solicitação ativa do usuário autenticado e retorna formatado, se existir. Requer autenticação."
    )
    @SecurityRequirement(name = "bearerAuth")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Dados da solicitação retornados com sucesso",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiResponseDTO.class))
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Usuário não possui uma solicitação ativa",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiResponseDTO.class))
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Usuário não autenticado ou sem permissão",
                    content = @Content(mediaType = "application/json")
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Erro interno ao retornar dados da solicitação",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiResponseDTO.class))
            )
    })
    public ResponseEntity<ApiResponseDTO<?>> GetStatus(){
        try {
            var solicitation = solicitationService.getSolicitation();
            var body = solicitationService.formatSolicitation(solicitation);
            var response = new ApiResponseDTO<>(true, "Dados da solicitação retornados com sucesso.", body);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch(NullPointerException e){
            var response = new ApiResponseDTO<>(false, "Esse usuário não possui uma solicitação ativa.", null);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        catch (Exception e){
            var response = new ApiResponseDTO<>(false, "Falha ao retornar dados da solicitação: " + e.getMessage(), null);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @Operation(
            summary = "Atualiza o status da solicitação",
            description = "Atualiza o status da solicitação do usuário autenticado com base nos dados enviados no corpo da requisição. Requer autenticação."
    )
    @SecurityRequirement(name = "bearerAuth")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Status da solicitação atualizado com sucesso",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiResponseDTO.class))
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Requisição malformada ou status inválido",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiResponseDTO.class))
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Usuário não autenticado ou sem permissão",
                    content = @Content(mediaType = "application/json")
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Erro interno ao atualizar o status",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiResponseDTO.class))
            )
    })
    @PostMapping("/update")
    public ResponseEntity<ApiResponseDTO<?>> updateSolicitationStatus(@RequestBody UpdateStatusDTO updateStatusDTO){
        try {
            var solicitation = solicitationService.updateStatus(updateStatusDTO.getNewStatus());
            ApiResponseDTO<Map<String, Integer>> response;
            if (!(solicitationService.finalStatusReached(solicitation.getStatus()))) {
                response = new ApiResponseDTO<>(
                        true,
                        "Estado alterado com sucesso.",
                        Map.of("status", solicitation.getStatus().ordinal())
                );
            } else {
                response = new ApiResponseDTO<>(
                        true,
                        "Último estado alcançado.",
                        Map.of("status", solicitation.getStatus().ordinal())
                );
            }
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        catch (IllegalArgumentException e){
            var response = new ApiResponseDTO<>(false, e.getMessage(), null);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        catch (Exception e){
            var response = new ApiResponseDTO<>(false, "Falha ao retornar dados da solicitação: " + e.getMessage(), null);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @Operation(
            summary = "Rejeita uma solicitação por ID",
            description = "Rejeita a solicitação informada pelo ID, caso ela exista. Requer autenticação."
    )
    @SecurityRequirement(name = "bearerAuth")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Solicitação rejeitada com sucesso",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiResponseDTO.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Solicitação não encontrada",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiResponseDTO.class))
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Usuário não autenticado ou sem permissão",
                    content = @Content(mediaType = "application/json")
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Erro interno ao rejeitar a solicitação",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApiResponseDTO.class))
            )
    })
    @DeleteMapping("/reject/{id}")
    public ResponseEntity<ApiResponseDTO<?>> rejectSolicitation(@PathVariable Long id){
        try {
            solicitationService.rejectById(id);
            var response = new ApiResponseDTO<>(true, "Solicitação rejeitada com sucesso.", null);
            return ResponseEntity.ok(response);
        } catch (EntityNotFoundException e) {
            var response = new ApiResponseDTO<>(false, "Solicitação não encontrada.", null);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } catch (Exception e) {
            var response = new ApiResponseDTO<>(false, "Erro ao rejeitar solicitação.", null);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
