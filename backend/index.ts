/* eslint-disable import/first */
import * as dotenv from 'dotenv';
import { FindMyPet } from './src/app/app';
import { routingOptions } from './src/app/config/routing';

dotenv.config();

const app = FindMyPet.initialiseApplication(routingOptions);

app.listen(process.env.PORT_NUMBER, async () => {
  console.log(`Server is listening on port ${process.env.PORT_NUMBER}`);
});