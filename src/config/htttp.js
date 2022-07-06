import {createServer} from 'http';
import expressApp from '#Config/express.js';

/**
 * Vamos a pasarle el express
 para que el dia de mañana si le queremos pasar otra cosa 
 podemos hacerlo
 */

const httpServer = createServer(expressApp);

export default httpServer;