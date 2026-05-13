const fs = require('fs');
const path = require('path');
const { mailConfig, smtpConfig } = require('../.env');
const nodemailer = require("nodemailer");
const { consultaParcelas, retornaValorTotalDeParcelas, montaHTMLTabelaDeParcelas } = require('./parcela');
const { models } = require('../config/db');

async function montaEMail(tabela, envio, total) {
    var templateEmail = fs.readFileSync(path.resolve(__dirname,'../templates/template_email.html'), 'utf-8');
    var propiedadesEmail = {};

    templateEmail = templateEmail.replace('$_$TABELA_TITULOS$_$', tabela);
    templateEmail = templateEmail.replace('$_$CLIENTE$_$', envio[0].CLIENTE);
    templateEmail = templateEmail.replace('$_$TOTAL$_$', total);

    propiedadesEmail.from = mailConfig.remetente;
    propiedadesEmail.to = envio[0].EMAILCLIENTE;
    propiedadesEmail.subject = mailConfig.assunto;
    propiedadesEmail.html = templateEmail;
    return propiedadesEmail
}

function criaTransporter() {
    return nodemailer.createTransport(smtpConfig);
}

async function salvaEnvio(email, mensagem, situacao) {
    const Envio = models.Envio;
    var envio = new Envio ({
        email: email,
        mensagem: mensagem,
        situacao: situacao
    })
    await envio.save();
}

async function enviarEmails() {
    
    var titulos = await consultaParcelas();

    if (titulos.lenght === 0) {
        return;// sem envios
    }

    for (const item of Object.keys(titulos)) {

        var total = retornaValorTotalDeParcelas(titulos[item]);
        var tabela = montaHTMLTabelaDeParcelas(titulos[item]);
        var email = await montaEMail(tabela, titulos[item], total);

        try{
            var enviar = await criaTransporter().sendMail(email);
            await salvaEnvio(JSON.stringify(email) , JSON.stringify(enviar), 'sucesso');

        }catch(e){
            await salvaEnvio(JSON.stringify(email), JSON.stringify(e), 'erro');
        }   
    }
}


module.exports = {
    montaEMail,
    salvaEnvio,
    enviarEmails
}

