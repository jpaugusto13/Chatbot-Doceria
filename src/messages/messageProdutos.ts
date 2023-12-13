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
  let sizeArray = produtos.length;
  
  produtos.forEach((produto : TypeProduto, index: number) => {
    console.log(index+++":"+sizeArray)
    if(produto.quantidade != 0) produtosText += `${produto.nome} R$ ${Number(produto.preco).toFixed(2).replace(".",",")}${index++ != sizeArray ? "\n" : ""}`
  })

  await client.sendText(message.from, `Cardápio do dia \n\n${produtosText == "" ? "Estamos sem estoque no momento" : produtosText}`)
  .then((result) => console.log('Result: ', result))};

export default messageProdutos;