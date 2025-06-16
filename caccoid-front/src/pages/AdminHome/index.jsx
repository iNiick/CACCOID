import { useState } from 'react';
import * as S from './styles';
import { useListOrders } from '../../hooks/useListOrders';
import { ListOrders } from '../ListOrders';
import { Tabs } from '../Tabs';

export default function AdminHome() {
  const tabsAdmin = [
    'SOLICITADAS',
    'PENDENTES',
    'AUTORIZADAS',
    'EMITIDAS',
    'PRODUÇÃO',
    'ENVIADAS',
    'ENTREGUES',
    'REJEITADAS',
    'EXCLUIDAS'
  ];
  const [selectedTab, setSelectedTab] = useState(tabsAdmin[0]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const { data, loading, error } = useListOrders({ status: selectedTab });


  return (
    <S.Container>
      <Tabs
        tabs={tabsAdmin}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <ListOrders 
        status={selectedTab}
        data={data}
        loading={loading}
        error={error}
        selectedOrders={selectedOrders}
        setSelectedOrders={setSelectedOrders}
      />
      <S.RightAlign>
        {selectedTab === 'AUTORIZADAS' && <S.AuthTabButton>Reverter</S.AuthTabButton>}
        {selectedTab === 'AUTORIZADAS' && <S.AuthTabButton onClick={() => console.log(selectedOrders)} isEmitButton={true}>Enviar Virtual</S.AuthTabButton>}
        {selectedTab === 'EXCLUIDAS' && <p>Todas as carteirinhas na lixeira são excluídas em 1 semana</p>}
      </S.RightAlign>

    </S.Container>
  );
}
