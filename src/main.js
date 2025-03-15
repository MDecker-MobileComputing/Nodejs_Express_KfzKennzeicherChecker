
import express from "express";
import logging from "logging";

import { routenRegistrieren } from "./controller.js";

const logger = logging.default( "main" );
const app    = express();

routenRegistrieren( app );

app.use( express.static( "public" ) );

logger.info( "Express.js (Web-Server) konfiguriert.\n" );

const PORT_NUMMER = 9090;
app.listen( PORT_NUMMER,
            () => { logger.info( `Web-Server lauscht auf Port ${PORT_NUMMER}.\n` ); }
          );