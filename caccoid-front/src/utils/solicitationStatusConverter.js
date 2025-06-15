export const solicitationStatusConverter = (statusCode) => {
    return statusMap.find(item => item.value == statusCode).label;
}

const statusMap = [
    { label: 'SOLICITADAS', value: 1},
    { label: 'PENDENTES', value: 2 },
    { label: 'AUTORIZADAS', value: 3 },
    { label: 'EMITIDAS', value: 4 },
    { label: 'PRODUÇÃO', value: 5 },
    { label: 'ENVIADAS', value: 6 },
    { label: 'ENTREGUES', value: 7 },
    { label: 'REJEITADAS', value: 8 },
    { label: 'EXCLUIDAS', value: 9 },
]