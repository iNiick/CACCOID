import { useState, useEffect } from 'react';
// import { useAPI } from './useAPI';

export const useListOrders = ({status}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //   const api = useAPI();
console.log('useListOrders', status);
  const mockSolicitations = [
    {
      nome: 'Ana Luiza Ventapane',
      cpf: '123.456.789-00',
      email: 'ana.luiza@email.com',
      matricula: '1234567ABC',
      data: '2024-06-11',
      src: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
      nome: 'Carlos Silva',
      cpf: '987.654.321-00',
      email: 'carlos.silva@email.com',
      matricula: '7654321DEF',
      data: '2024-06-10',
      src: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    {
      nome: 'Maria Souza',
      cpf: '111.222.333-44',
      email: 'maria.souza@email.com',
      matricula: '1122334GHI',
      data: '2024-06-09',
      src: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // const response = await api.get('/solicitation');
        if (status !== 'SOLICITADAS') {
          setData([]);
        } else {
          setData(mockSolicitations);
        }
      } catch (err) {
        console.error('Erro ao buscar dados:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return { data, loading, error };
};
