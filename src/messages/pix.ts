import { Message, Whatsapp } from "venom-bot";

const pix = async (message: Message, client: Whatsapp) => {  
  await client.sendText(message.from, 'A nossa chave pix é: *50.804.948/0001-78*\nDoceria Tássia Augusto - C6 Bank \n\nPara confirmar seu pedido/encomenda é necessário o envio do comprovante ao final do pagamento!').then((result) => console.log('Result: ', result));
};

export default pix;