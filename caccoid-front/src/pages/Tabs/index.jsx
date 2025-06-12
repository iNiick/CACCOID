import * as S from './styles';

export const Tabs = ({ tabs, selectedTab, setSelectedTab }) => {
  return (
    <S.ContainerTabs>
      {tabs?.map((tab, index) => (
        <S.TabItem
          key={index}
          onClick={() => setSelectedTab(tab)}
          isSelected={selectedTab === tab}
        >
          {tab}
        </S.TabItem>
      ))}
    </S.ContainerTabs>
  );
};
