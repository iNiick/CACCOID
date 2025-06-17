import alertIcon from '../../assets/alert-red-icon.svg';
import * as S from './styles';
import { ActionButton } from '../ActionButton';
export const DeletionConfirmationModal = ({ onClose }) => {
  return (
    <S.Overlay>
      <S.ModalContainer>
        <S.CloseButton onClick={onClose}>×</S.CloseButton>
        <S.Icon>
          <img src={alertIcon} alt="alert-icon" />
        </S.Icon>
        <S.Text>Tem certeza que deseja apagar essa solicitação? </S.Text>
        <S.Warning>Essa ação não pode ser desfeita.</S.Warning>
        <S.Actions>
          <ActionButton variant="danger">Apagar</ActionButton>
          <ActionButton variant="quaternary" onClick={onClose}>
            Manter Solicitação
          </ActionButton>
        </S.Actions>
      </S.ModalContainer>
    </S.Overlay>
  );
};

export default DeletionConfirmationModal;
