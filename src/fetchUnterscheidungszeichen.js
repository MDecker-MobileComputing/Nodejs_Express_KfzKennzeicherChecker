import axios   from "axios";
import logging from "logging";


const logger = logging.default( "externe-api" );

/** An diese URL ist das abzufragende Unterscheidungszeichen anzuhängen */
const BASIS_URL = "http://localhost:8080/kfzkennzeichen/v1/unterscheidungszeichen/";


/**
 * HTTP-REST-Call an externen Service, um Unterscheidungszeichen aufzulösen bzw.
 * auf Existenz zu prüfen.
 * 
 * @param {string} uz Unterscheidungszeichen (1-3 Großbuchstaben), z.B. "KA" 
 * 
 * @return {Promise<string>} Bedeutung des Unterscheidungszeichens (z.B. "Stuttgart (BW)")
 *                           oder leerer String, wenn Unterscheidungszeichen nicht bekannt
 */
export async function fetchUnterscheidungszeichen( uz ) {

    const url = BASIS_URL + uz;
    logger.info( "URL für Request an externen Microservice: " + url );

    try {

        const antwort = await axios.get( url );

        const bedeutung = antwort.data.unterscheidungszeichen.bedeutung;
        const kategorie = antwort.data.unterscheidungszeichen.kategorie;
        
        return `${bedeutung} (${kategorie})`;

    } catch ( fehler ) { // 4xx und 5xx als Response-Code

        logger.error( `Fehler bei der Abfrage von Unterscheidungszeichen "${uz}": `, 
                      fehler.message );
        return "";
    }
}
