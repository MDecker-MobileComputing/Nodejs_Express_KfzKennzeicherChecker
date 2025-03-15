import logging from "logging";

import { checkKfzKennzeichen } from "./service.js";

const logger = logging.default( "controller" );

const prefixFuerRouten = "/v1/kfzKennzeichen/";


/**
 * Routen für REST-API registrieren.
 * 
 * @param {*} app Express.js-Objekt 
 */
export function routenRegistrieren( app ) {

    const route1 = prefixFuerRouten + "check/:kennzeichen";
    app.get( route1, getCheckKennzeichen );
    logger.info( "Route registriert: " + route1 );
}


/**
 * REST-Endpunkt für KFZ-Kennzeichen-Check.
 * 
 * @param {*} req HTTP-Request mit Pfad-Parameter `kennzeichen`

 * @param {*} res HTTP-Response
 */
function getCheckKennzeichen( req, res ) {

    const kennzeichen = decodeURIComponent( req.params.kennzeichen );

    logger.info( `Request für Check von KFZ-Kennzeichen erhalten: ${kennzeichen}` );

    const ergebnis = checkKfzKennzeichen( kennzeichen );

    const httpStatusCode = ergebnis.gueltig ? 200 : 404;

    logger.info( `Check-Ergebnis: ${JSON.stringify( ergebnis )}` );

    res.status( httpStatusCode )
       .send( ergebnis );
}
