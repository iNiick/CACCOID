import { useState } from 'react';
import * as S from './styles';
import LabeledInput from '../LabeledInput';
import { ActionButton } from '../ActionButton';
import deleteIcon from '../../assets/white-delete-icon.svg';
import openIcon from '../../assets/open-icon.svg';

const StudentIdModal = ({ data, onClose }) => {
  const [activeTab, setActiveTab] = useState('dados');
  const [formData, setFormData] = useState({ ...data });

  if (!data) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <S.Overlay>
      <S.ModalContainer>
        <S.CloseButton onClick={onClose}>×</S.CloseButton>
        <S.ModalContent>
          <S.Photo src={formData.src} alt={formData.nome} />
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
                <S.GridTwoThirdsOneThird>
                  <LabeledInput
                    title="Protocolo"
                    value={formData.protocolo}
                    onChange={(v) => handleChange('protocolo', v)}
                  />
                  <LabeledInput
                    title="Data do pedido"
                    value={formData.data}
                    onChange={(v) => handleChange('data', v)}
                  />
                </S.GridTwoThirdsOneThird>
                <S.GridSingleColumn>
                  <LabeledInput
                    title="Nome"
                    value={formData.nome}
                    onChange={(v) => handleChange('nome', v)}
                  />
                </S.GridSingleColumn>
                <S.GridThreeEqual>
                  <LabeledInput
                    title="RG"
                    value={formData.rg}
                    onChange={(v) => handleChange('rg', v)}
                  />
                  <LabeledInput
                    title="CPF"
                    value={formData.cpf}
                    onChange={(v) => handleChange('cpf', v)}
                  />
                  <LabeledInput
                    title="Matrícula"
                    value={formData.matricula}
                    onChange={(v) => handleChange('matricula', v)}
                  />
                </S.GridThreeEqual>
                <S.GridTwoEqual>
                  <LabeledInput
                    title="Curso"
                    value={formData.curso}
                    onChange={(v) => handleChange('curso', v)}
                  />
                  <LabeledInput
                    title="Instituição"
                    value={formData.instituicao}
                    onChange={(v) => handleChange('instituicao', v)}
                  />
                </S.GridTwoEqual>
                <S.GridTwoEqual>
                  <LabeledInput
                    title="E-mail"
                    type="email"
                    value={formData.email}
                    onChange={(v) => handleChange('email', v)}
                  />
                  <LabeledInput
                    title="Telefone"
                    value={formData.telefone}
                    onChange={(v) => handleChange('telefone', v)}
                  />
                </S.GridTwoEqual>
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
                    <img src={openIcon} />
                  </S.OpenButtonIcon>
                </S.DocumentDiv>
                <S.DocumentDiv>
                  Compovante de Pagamento{' '}
                  <S.OpenButtonIcon>
                    <img src={openIcon} />
                  </S.OpenButtonIcon>
                </S.DocumentDiv>
                <S.DocumentDiv>
                  Documento de Identificação - Frente{' '}
                  <S.OpenButtonIcon>
                    <img src={openIcon} />
                  </S.OpenButtonIcon>
                </S.DocumentDiv>
                <S.DocumentDiv>
                  Documento de Identificação - Verso{' '}
                  <S.OpenButtonIcon>
                    <img src={openIcon} />
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
          <ActionButton variant="primary">AUTORIZAR</ActionButton>
        </S.Actions>
      </S.ModalContainer>
    </S.Overlay>
  );
};

export default StudentIdModal;
