import { Message, Whatsapp } from "venom-bot";
import api from "../services/api";


type TypeProduto = {
  nome: string
  preco: number
  quantidade: number;
}

const messageProdutos = async (message: Message, client: Whatsapp) => {
  const produtos = await api.get("client/produtos").then(({ data }) => data.produtos);
  
  let produtosText : string = ""
  
  produtos.forEach(({nome, preco, quantidade} : TypeProduto) => {
    if(quantidade != 0) produtosText += `${nome} R$ ${Number(preco).toFixed(2).replace(".",",")}\n`
  })

  await client.sendText(message.from, `Cardápio do dia \n\n${produtosText == "" ? "Estamos sem estoque no momento" : produtosText}`)
  .then((result) => {
    console.log('Result: ', result);
  })
};

export default messageProdutos;