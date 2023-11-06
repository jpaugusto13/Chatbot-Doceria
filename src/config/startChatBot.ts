import { Message, Whatsapp } from 'venom-bot';

import saudacoes from '../messages/saudacoes';
import pix from '../messages/pix';
import messageProdutos from '../messages/messageProdutos';

function startChatbot(client : Whatsapp) {
  setInterval(() => {
    const date = new Date();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    if(hour == 10 && minutes == 0 && seconds == 0) {
      client.sendText("120363180369706429@g.us", "Olá bom dia! Hoje temos 3 Kits").then((result) => console.log('Result: ', result))
      return "";
    }
  }, 800)

  client.onMessage(async (message : Message) => {
    if (message.type == "image" || message.type == "ptt" || message.isGroupMsg === true) return "";

    let text : string = message.body.toLowerCase()
    text = text.replace("ç","c");

    if(text.includes("contato")) {
      client.sendContactVcard(message.from, '558586169028@c.us', 'Doceria').then((result) => console.log('Result: ', result))
    }

    if(text.includes("endereco") || text.includes("localizacão")) {
      client.sendText(message.from, 'Rua 11 N° 131 \nJereissati 1 - Maracanaú \n(Referência: Drummond Noivas) ').then((result) => console.log('Result: ', result))
      client.sendLocation(message.from, '-13.6561589', '-69.7309264', 'Brasil').then((result) => console.log('Result: ', result))
      return "";
    }

    if (text.includes("bom dia") || text.includes("boa tarde") || text.includes("boa noite")) {
      saudacoes(message, client);
      return "";
    }
    
    if(text.includes("encomenda")) {
      await client.sendImage(message.from,"https://zildjian.com/cdn/shop/articles/aaron_spears_profile_1.png?v=1684240723", "" ,"")
      .then((result) => console.log('Result: ', result))
      return "";
    }

    
    if (text.includes("pix")) {
      pix(message, client);
      return "";  
    }

    if(text.includes("produtos") || text.includes("servicos") || text.includes("tem bolo")) {
      messageProdutos(message, client);
      return "";
    }
  });
}

export default startChatbot;