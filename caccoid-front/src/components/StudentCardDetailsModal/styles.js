import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalContainer = styled.div`
  background: var(--white);
  border-radius: 8px;
  width: 70%;
  height: 73%;
  position: relative;
  padding: 2rem;
  font-family: var(--font-regular);
  display: flex;
  flex-direction: column;
`;


export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--dark-grey);
  cursor: pointer;
`;

export const ModalContent = styled.div`
  display: flex;
  gap: 2rem;
  flex: 1;
  overflow: auto;
`;


export const Photo = styled.img`
  width: 300px;
  border: 2px solid var(--light-grey);
  align-self: center;
`;

export const RightContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 70%;
`;

export const Tabs = styled.div`
  display: flex;
  margin-bottom: 1rem;
  gap: 1rem;
  width: 100%;
`;

export const Tab = styled.button`
  display: flex;
  width: 100%;
  margin-bottom: 1rem;
  background: none;
  border: none;
  font-family: var(--font-title);
  font-size: 1.5rem;
  color: ${({ active }) => (active ? 'var(--medium-blue)' : 'var(--light-grey)')};
  border-bottom: 3px solid ${({ active }) => (active ? 'var(--medium-blue)' : 'var(--lightest-grey)')};
  cursor: pointer;

  &:hover {
    color: var(--dark-blue);
  }
`;

export const GridTwoThirdsOneThird = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
`;

export const GridThreeEqual = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

export const GridTwoEqual = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

export const GridSingleColumn = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

export const DeleteButtonIcon = styled.button`
  background: var(--dark-red);
  border: var(--dark-red);
  border-radius: 10%;
  padding: 0.5rem;
  cursor: pointer;

  img {
    width: 18px;
    height: 18px;
  }

  &:hover {
    opacity: 0.8;
  }
`;

export const OpenButtonIcon = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
  }

  &:hover {
    opacity: 0.8;
  }
`;

export const DocumentDiv = styled.div`
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid var(--light-grey);
  margin-bottom: 1rem;
  font-family: var(--font-regular);
  display: flex;
  justify-content: space-between;
`;
