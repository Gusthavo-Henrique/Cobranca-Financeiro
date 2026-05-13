const { agendamentoEnvio } = require('../.env');
const {enviarEmails} = require('../lib/email');
var cron = require('node-cron');



//# ┌──────────── minute
//# │ ┌────────── hour
//# │ │ ┌──────── day of month
//# │ │ │ ┌────── month
//# │ │ │ │ ┌──── day of week
//# │ │ │ │ │
//# │ │ │ │ │
//# * * * * *

cron.schedule(`${agendamentoEnvio.minuto} ${agendamentoEnvio.hora} ${agendamentoEnvio.dia} * *`, () => {
    console.log('Enviando Emails');
    enviarEmails();
});