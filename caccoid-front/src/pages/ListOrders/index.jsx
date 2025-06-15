import * as S from './styles';
import Loading from '../../components/Loading';
import openIcon from '../../assets/open-icon.svg';
import deleteIcon from '../../assets/red-delete-icon.svg';

export const ListOrders = ({ status, data, loading, error, selectedOrders, setSelectedOrders }) => {
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedOrders(data); 

    } else {
      setSelectedOrders([]); 
    }
  };

  const handleSelectOne = (order) => {
    if (selectedOrders.some(o => o.matricula === order.matricula)) {
      setSelectedOrders(selectedOrders.filter(o => o.matricula !== order.matricula));

    } else {
      setSelectedOrders([...selectedOrders, order]);
    }
  };

  const allSelected = data.length > 0 && selectedOrders.length === data.length;
  
  if (loading) {
    return <Loading />;
  }

  if (error || (data.length === 0 && !loading)) {
    return (
      <S.Container>
        <S.ContainerInfo>
          <S.NoContentTitle>
            Não há solicitações para o status selecionado.
          </S.NoContentTitle>
        </S.ContainerInfo>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Table>
        <S.TableHeader>
          <S.TableRow>
            {status === 'AUTORIZADAS' ? ( 
              <S.TableHeaderCell>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <S.CheckBox
                    checked={allSelected}
                    onChange={handleSelectAll}
                  />
                  <span>Todos</span>
                </div>
              </S.TableHeaderCell> 
              ) : (
              <S.TableHeaderCell></S.TableHeaderCell>
            )}
            <S.TableHeaderCell>Foto</S.TableHeaderCell>
            <S.TableHeaderCell>Nome</S.TableHeaderCell>
            <S.TableHeaderCell>CPF</S.TableHeaderCell>
            <S.TableHeaderCell>Email</S.TableHeaderCell>
            <S.TableHeaderCell>Matrícula</S.TableHeaderCell>
            <S.TableHeaderCell>Data</S.TableHeaderCell>
            <S.TableHeaderCell></S.TableHeaderCell>
          </S.TableRow>
        </S.TableHeader>

        <S.TableBody>
          {data?.map((order, index) => (
            <S.TableRow key={index}>
              <S.TableDataCell>
                {status === 'AUTORIZADAS' && (
                  <S.CheckBox
                    checked={selectedOrders.some(o => o.matricula === order.matricula)}
                    onChange={() => handleSelectOne(order)}
                  />
                )}
              </S.TableDataCell>
              <S.TableDataCell>
                <S.PhotoMini src={order.src} alt={order.nome} />
              </S.TableDataCell>
              <S.TableDataCell>{order.nome}</S.TableDataCell>
              <S.TableDataCell>{order.cpf}</S.TableDataCell>
              <S.TableDataCell>{order.email}</S.TableDataCell>
              <S.TableDataCell>{order.matricula}</S.TableDataCell>
              <S.TableDataCell>{order.data}</S.TableDataCell>
              <S.TableDataCell>
                <S.ButtonIcon>
                  <img src={openIcon} />
                </S.ButtonIcon>
                {status !== 'AUTORIZADAS' && 
                <S.ButtonIcon>
                  <img src={deleteIcon} />
                </S.ButtonIcon>}
              </S.TableDataCell>
            </S.TableRow>
          ))}
        </S.TableBody>
      </S.Table>
    </S.Container>
  );
};
