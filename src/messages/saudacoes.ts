import { Message, Whatsapp } from "venom-bot";

const saudacao = "Bem-vindo à Doceria Tássia Augusto!\nDelivery: *13:00* as *19:00*";

const getGreeting = async (hour : number) => {
  if(hour >= 12 && hour < 13) {
    return `Olá, boa tarde! ${saudacao}\n\nEstamos em horário de almoço`;
  }
  else if (hour >= 13 && hour < 18) {
    return `Olá, boa tarde! ${saudacao}`;
  } 
  else if (hour >= 18 && hour < 19) {
    return `Olá, boa noite! ${saudacao}\n\n`;
  } 
  else if(hour >= 19) {
    return `Olá, boa noite! ${saudacao}\n\nNosso delivery encerra as 19:00, no momento estamos fechado, estamos apenas recebendo encomendas de Kit festa!`;
  }
  else {
    return `Olá, bom dia! ${saudacao}\n\nEstamos em produção, deixe agendado seu pedido!`;
  }
};

const saudacoes = async (message: Message, client: Whatsapp) => {
  const date = new Date();
  const hour = date.getHours();
  const day = date.getDay();

  const greeting = await getGreeting(hour);
  const messageText = `${greeting}`;

  if(day != 3) {
    await client.sendText(message.from, messageText).then((result) => console.log('Result: ', result))
  } else {
    await client.sendText(message.from, `${saudacao}\n\nQuarta-feira não funcionamos!`).then((result) => console.log('Result: ', result))
  }
};

export default saudacoes;
