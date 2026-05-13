const axios = require('axios');
const { apiTotvs } = require('../.env');

function agrupaParcelaPorCliente(array, key) {
    return array.reduce((acc, item) => {
        if (!acc[item[key]]) acc[item[key]] = []
        acc[item[key]].push(item)
        return acc
    }, {})
}

function montaHTMLTabelaDeParcelas(parcelas) {
    var tabela = '';
    for (const parcela of parcelas) {
        tabela += '<tr>';
        tabela += `<td>${parcela.ALUNO}</td>`;
        tabela += `<td>${parcela.CODCONTRATO}</td>`;
        tabela += `<td>${parcela.SERVICO}</td>`;
        tabela += `<td>${parcela.PARCELA}</td>`;
        tabela += `<td>${parcela.VENCIMENTO}</td>`;
        tabela += `<td>${parcela.VALOR}</td>`;
        tabela += '</tr>';
    }
    return tabela;
}

function retornaValorTotalDeParcelas(parcelas) {
    var total = 0;
    for (const parcela of parcelas) {
        total += parcela.VALOR;
    }
    return parseFloat(total).toFixed(2);
}

async function consultaParcelas() {
    const dados = await axios.get(apiTotvs.url, {
        auth: {
            username: apiTotvs.username,
            password: apiTotvs.password
        }
    })
    if (dados.data.lenght === 0) {
        return [];
    }
    return agrupaParcelaPorCliente(dados.data, 'CODCFO')
}

module.exports = {
    consultaParcelas,
    retornaValorTotalDeParcelas,
    montaHTMLTabelaDeParcelas
}