import { useState } from 'react';
import * as S from './styles';
import LabeledInput from '../LabeledInput';
import { ActionButton } from '../ActionButton';
import deleteIcon from '../../assets/white-delete-icon.svg';
import openIcon from '../../assets/open-icon.svg';
import { dateFormatter } from '../../utils/dateFormatter';
import { toast } from 'react-toastify';
import { useAPI } from '../../hooks/useAPI';

const StudentIdModal = ({ data, onClose }) => {
  const [activeTab, setActiveTab] = useState('dados');
  const [formData, setFormData] = useState({ ...data });

  const api = useAPI();
  
  if (!data) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  
  const handleSolicitationAuthorization = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put('/solicitation/authorize/' + formData.id, {});
      toast.success(response.data?.message);
      onClose();
      
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erro ao autorizar solicitação');
    }
  };

  return (
    <S.Overlay>
      <S.ModalContainer>
        <S.CloseButton onClick={onClose}>×</S.CloseButton>
        <S.ModalContent>
          <S.Photo src={formData.studentPhoto} alt={formData.nome} />
          <S.RightContent>
            <S.Tabs>
              <S.Tab
                active={activeTab === 'dados'}
                onClick={() => setActiveTab('dados')}
              >
                DADOS
              </S.Tab>
              <S.Tab
                active={activeTab === 'entrega'}
                onClick={() => setActiveTab('entrega')}
              >
                ENTREGA
              </S.Tab>
              <S.Tab
                active={activeTab === 'documentos'}
                onClick={() => setActiveTab('documentos')}
              >
                DOCUMENTOS
              </S.Tab>
            </S.Tabs>

            {activeTab === 'dados' && (
              <>
                <S.GridThreeEqual>
                  <LabeledInput
                    title="E-mail"
                    type="email"
                    value={formData.student.email}
                    onChange={(v) => handleChange('email', v)}
                  />
                  <LabeledInput
                    title="Telefone"
                    value={formData.student.telephone}
                    onChange={(v) => handleChange('telefone', v)}
                  />
                  <LabeledInput
                    title="Data do pedido"
                    value={dateFormatter(formData.requestDate)}
                    onChange={(v) => handleChange('data', v)}
                  />
                </S.GridThreeEqual>
                <S.GridThreeEqual>
                  <LabeledInput
                    title="Nome"
                    value={formData.student.name}
                    onChange={(v) => handleChange('nome', v)}
                  />
                  <LabeledInput
                    title="RG"
                    value={formData.student.rg}
                    onChange={(v) => handleChange('rg', v)}
                  />
                  <LabeledInput
                    title="CPF"
                    value={formData.student.cpf}
                    onChange={(v) => handleChange('cpf', v)}
                  />
                </S.GridThreeEqual>
                <S.GridThreeEqual>
                  <LabeledInput
                    title="Matrícula"
                    value={formData.student.enrollmentNumber}
                    onChange={(v) => handleChange('matricula', v)}
                  />
                  <LabeledInput
                    title="Curso"
                    value={formData.student.program}
                    onChange={(v) => handleChange('curso', v)}
                  />
                  <LabeledInput
                    title="Instituição"
                    value={formData.student.institution}
                    onChange={(v) => handleChange('instituicao', v)}
                  />
                </S.GridThreeEqual>
              </>
            )}

            {activeTab === 'entrega' && (
              <>
                <S.GridSingleColumn>
                  <LabeledInput
                    title="Modalidade"
                    value={formData.modalidade}
                    onChange={(v) => handleChange('modalidade', v)}
                  />
                </S.GridSingleColumn>
                <S.GridTwoThirdsOneThird>
                  <LabeledInput
                    title="Lougradouro"
                    value={formData.lougradouro}
                    onChange={(v) => handleChange('lougradouro', v)}
                  />
                  <LabeledInput
                    title="Número"
                    value={formData.numero}
                    onChange={(v) => handleChange('numero', v)}
                  />
                </S.GridTwoThirdsOneThird>
                <S.GridTwoThirdsOneThird>
                  <LabeledInput
                    title="Complemento"
                    value={formData.complemento}
                    onChange={(v) => handleChange('complemento', v)}
                  />
                  <LabeledInput
                    title="CEP"
                    value={formData.cep}
                    onChange={(v) => handleChange('cep', v)}
                  />
                </S.GridTwoThirdsOneThird>
                <S.GridThreeEqual>
                  <LabeledInput
                    title="Bairro"
                    value={formData.bairro}
                    onChange={(v) => handleChange('bairro', v)}
                  />
                  <LabeledInput
                    title="Estado"
                    value={formData.estado}
                    onChange={(v) => handleChange('estado', v)}
                  />
                  <LabeledInput
                    title="Cidade"
                    value={formData.cidade}
                    onChange={(v) => handleChange('cidade', v)}
                  />
                </S.GridThreeEqual>
              </>
            )}
            {activeTab === 'documentos' && (
              <>
                <S.DocumentDiv>
                  Compovante de Matrícula
                  <S.OpenButtonIcon>
                    <a
                      href={formData.enrollmentProof} 
                      download={`comprovante_matricula.${formData.enrollmentProof.substring(formData.enrollmentProof.indexOf('/') + 1, formData.enrollmentProof.indexOf(';'))}`}
                    >
                      <img src={openIcon} style={{cursor: "pointer"}}/>
                    </a>
                  </S.OpenButtonIcon>
                </S.DocumentDiv>
                <S.DocumentDiv>
                  Compovante de Pagamento{' '}
                  <S.OpenButtonIcon>
                    <a
                      href={formData.paymentProof} 
                      download={`comprovante_pagamento.${formData.paymentProof.substring(formData.paymentProof.indexOf('/') + 1, formData.paymentProof.indexOf(';'))}`}
                    >
                      <img src={openIcon} style={{cursor: "pointer"}}/>
                    </a>
                  </S.OpenButtonIcon>
                </S.DocumentDiv>
                <S.DocumentDiv>
                  Documento de Identificação - Frente{' '}
                  <S.OpenButtonIcon>
                    <a
                      href={formData.identityDocumentFront} 
                      download={`identidade_frente.${formData.identityDocumentFront.substring(formData.identityDocumentFront.indexOf('/') + 1, formData.identityDocumentFront.indexOf(';'))}`}
                    >
                      <img src={openIcon} style={{cursor: "pointer"}}/>
                    </a>
                  </S.OpenButtonIcon>
                </S.DocumentDiv>
                <S.DocumentDiv>
                  Documento de Identificação - Verso{' '}
                  <S.OpenButtonIcon>
                    <a
                      href={formData.identityDocumentBack} 
                      download={`identidade_verso.${formData.identityDocumentBack.substring(formData.identityDocumentBack.indexOf('/') + 1, formData.identityDocumentBack.indexOf(';'))}`}
                    >
                      <img src={openIcon} style={{cursor: "pointer"}}/>
                    </a>
                  </S.OpenButtonIcon>
                </S.DocumentDiv>
              </>
            )}
          </S.RightContent>
        </S.ModalContent>
        <S.Actions>
          <S.DeleteButtonIcon>
            <img src={deleteIcon} />
          </S.DeleteButtonIcon>
          <ActionButton variant="quaternary">SOLICITAR MUDANÇA</ActionButton>
          <ActionButton variant="primary" onClick={handleSolicitationAuthorization}>AUTORIZAR</ActionButton>
        </S.Actions>
      </S.ModalContainer>
    </S.Overlay>
  );
};

export default StudentIdModal;
