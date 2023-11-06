import { create } from 'venom-bot';
import startChatbot from './config/startChatBot';
import { writeFile } from 'fs';
import express, { Request, Response } from 'express';

const app = express();
const port: number = 8068;

let statusApp: string;
let qrCodeBase64: string | undefined;

async function createSession() {
  create(
    'docariatassiaaugusto',
    (base64Qr: string, asciiQR: string) => {
      console.log(asciiQR);
      var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      var response: { type?: string; data?: Buffer } = {};
  
      if (matches == null) return;
  
      if (matches.length !== 3) {
        return new Error('Invalid input string');
      }
  
      response.type = matches[1];
      response.data = Buffer.from(matches[2], 'base64');
  
      if (response.data) {
        writeFile(
          './src/imgs/qrcode/out.png',
          response.data,
          'binary',
          (err: NodeJS.ErrnoException | null) => {
            if (err != null) {
              console.log(err);
            }
          }
        );
      }
  
      qrCodeBase64 = base64Qr;
    },
    (statusGet: string, session: string) => {
      statusApp = statusGet;
    },
    { logQR: false }
  ).then((client) => {
    startChatbot(client);
  });
}

createSession();

app.get("/session", async (req: Request, res: Response) => {
  try{
    await createSession();
    res.status(200).json({message: "Ok"})
  } catch(e) {}
})

app.get('/', (req: Request, res: Response) => {
  if (qrCodeBase64) {
    res.json({ qrCode: qrCodeBase64, status: statusApp });
  } else {
    res.json({ status: statusApp });
  }
});


app.listen(port, () => {
  console.log('http://localhost:' + port);
});
