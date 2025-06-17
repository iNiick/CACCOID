import { useState, useEffect } from 'react';
// import { useAPI } from './useAPI';
import { solicitationStatusConverter } from '../utils/solicitationStatusConverter';

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
      status: 1
    },
    {
      nome: 'Carlos Silva',
      cpf: '987.654.321-00',
      email: 'carlos.silva@email.com',
      matricula: '7654321DEF',
      data: '2024-06-10',
      src: 'https://randomuser.me/api/portraits/men/2.jpg',
      status: 1
    },
    {
      nome: 'Maria Souza',
      cpf: '111.222.333-44',
      email: 'maria.souza@email.com',
      matricula: '1122334GHI',
      data: '2024-06-09',
      src: 'https://randomuser.me/api/portraits/women/3.jpg',
      status: 1
    },
    {
      nome: 'Corno da Silva',
      cpf: '253.930.700-04',
      email: 'corno.silva@email.com',
      matricula: '21723357JKL',
      data: '2024-06-11',
      src: 'https://randomuser.me/api/portraits/men/5.jpg',
      status: 3
    },
    {
      nome: 'Vagabundo da Silva',
      cpf: '599.794.540-59',
      email: 'vagabundo.silva@email.com',
      matricula: '8357121DPM',
      data: '2024-06-10',
      src: 'https://randomuser.me/api/portraits/men/10.jpg',
      status: 3
    },
    {
      nome: 'Fubanga de Almeida',
      cpf: '020.822.280-45',
      email: 'fubanga.almeida@email.com',
      matricula: '1745334LZI',
      data: '2024-06-09',
      src: 'https://randomuser.me/api/portraits/women/10.jpg',
      status: 3
    },
    {
      nome: 'Jaburu Pinheiro',
      cpf: '794.862.160-10',
      email: 'jaburu.pinheiro@email.com',
      matricula: '1914867ABS',
      data: '2024-06-11',
      src: 'https://randomuser.me/api/portraits/women/6.jpg',
      status: 9
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // const response = await api.get('/solicitation');
        const filteredSolicitations = mockSolicitations.filter((solicitation) => solicitationStatusConverter(solicitation.status) === status);
        setData(filteredSolicitations);

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
