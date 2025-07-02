import { useState } from 'react';
import * as S from './styles';
import { useListOrders } from '../../hooks/useListOrders';
import { ListOrders } from '../ListOrders';
import { Tabs } from '../Tabs';
import { toast } from 'react-toastify';
import { useAPI } from '../../hooks/useAPI';

export default function AdminHome() {
  const tabsAdmin = [
    'SOLICITADAS',
    'PENDENTES',
    'AUTORIZADAS',
    'EMITIDAS',
    'PRODUÇÃO',
    'ENVIADAS',
    'ENTREGUES',
    'EXCLUIDAS'
  ];

  const api = useAPI();

  const [selectedTab, setSelectedTab] = useState(tabsAdmin[0]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const { data, loading, error } = useListOrders({ status: selectedTab });

  const handleAuthorizationRevert = async (e) => {
    e.preventDefault();
    try {
      const selectedOrdersIds = selectedOrders.map(order => order.id);
      const response = await api.put('/solicitation/revert', selectedOrdersIds);
      toast.success(response.data?.message);
      
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erro ao reverter solicitações');
    }
  };

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
        {selectedTab === 'AUTORIZADAS' && <S.AuthTabButton onClick={handleAuthorizationRevert}>Reverter</S.AuthTabButton>}
        {selectedTab === 'AUTORIZADAS' && <S.AuthTabButton onClick={() => console.log(selectedOrders)} isEmitButton={true}>Enviar Virtual</S.AuthTabButton>}
        {selectedTab === 'EXCLUIDAS' && <p>Todas as carteirinhas na lixeira são excluídas em 1 semana</p>}
      </S.RightAlign>

    </S.Container>
  );
}
