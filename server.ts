import express, { Request, Response } from 'express';
import cors from 'cors';

import { getSpecificVolumes } from './robotPressure';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

// e7
const systems: Record<string, string> = {
  navigation: 'NAV-01',
  communications: 'COM-02',
  life_support: 'LIFE-03',
  engines: 'ENG-04',
  deflector_shield: 'SHLD-05',
};

let damagedSystem: string | null = null;

//** @api {get} /status Get the status of the ship */
app.get('/status', (_: Request, res: Response) => {
  const systemKeys = Object.keys(systems);
  damagedSystem = systemKeys[Math.floor(Math.random() * systemKeys.length)];
  res.json({ damaged_system: damagedSystem });
});

//** @api {get} /repair-bay Repair the damaged system */
app.get('/repair-bay', (_: Request, res: Response) => {
  if (!damagedSystem) {
    res.status(400).send('No damaged system found');
  }

  const uniqueCode = systems[damagedSystem!];
  const htmlCont = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Repair</title>
    </head>
    <body>
    <div class="anchor-point">${uniqueCode}</div>
    </body>
    </html>
  `;
  res.send(htmlCont);
});

//** @api {post} /teapot I'm a teapot */
app.post('/teapot', (_: Request, res: Response) => {
  res.sendStatus(418);
});

// e9
//** @api {get} /phase-change-diagram Change diagram repair / */
app.get('/phase-change-diagram', (req: Request, res: Response) => {
  const pressure = req.query.pressure;
  const dataVolumen = getSpecificVolumes(Number(pressure));

  if (!dataVolumen) {
    return res
      .status(400)
      .send({ error: 'Invalid or missing pressure parameter' });
  }

  console.log(pressure);

  res.json(dataVolumen);
});

//** managing other endpoints */
app.use((_: Request, res: Response) => {
  res.status(404).send('Not Found');
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
