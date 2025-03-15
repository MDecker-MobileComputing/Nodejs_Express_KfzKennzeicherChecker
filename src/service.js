import logging from "logging";

import { KfzCheckErgebnis } from "./checkergebnis.js";

const logger = logging.default( "service" );


/**
 * Prüft ein KFZ-Kennzeichen auf Gültigkeit; hierbei wird
 * evtl. auch ein externer REST-Service (anderer Microservice) 
 * aufgerufen.
 * 
 * @param {string} kfzKennzeichen KFZ-Kennzeichen, das geprüft werden soll,
 *                                z.B. "KA X 1234"
 *  
 * @return {KfzCheckErgebnis} Objekt mit Ergebnis des Checks 
 */
export function checkKfzKennzeichen( kfzKennzeichen ) {

    const kfzKennzeichenNormiert = kfzKennzeichen.trim().toUpperCase();

    return new KfzCheckErgebnis( kfzKennzeichenNormiert, true, "Not implemented yet" );
}
