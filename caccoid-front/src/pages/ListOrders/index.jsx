import { useListOrders } from '../../hooks/useListOrders';
import * as S from './styles';
import Loading from '../../components/Loading';
import openIcon from '../../assets/open-icon.svg';
import deleteIcon from '../../assets/red-delete-icon.svg';

export const ListOrders = ({ status }) => {
  const { data, loading, error } = useListOrders({ status });

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
            <S.TableHeaderCell></S.TableHeaderCell>
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
                <S.ButtonIcon>
                  <img src={deleteIcon} />
                </S.ButtonIcon>
              </S.TableDataCell>
            </S.TableRow>
          ))}
        </S.TableBody>
      </S.Table>
    </S.Container>
  );
};
