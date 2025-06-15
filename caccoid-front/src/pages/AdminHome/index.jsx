import * as S from './styles';
import { ListOrders } from '../ListOrders';
import { Tabs } from '../Tabs';
import { useState } from 'react';

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
  ];
  const [selectedTab, setSelectedTab] = useState(tabsAdmin[0]);

  return (
    <S.Container>
      <Tabs
        tabs={tabsAdmin}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <ListOrders status={selectedTab}/>
    </S.Container>
  );
}
