import logging from "logging";

import { KfzCheckErgebnis } from "./checkergebnis.js";

const logger = logging.default( "service" );


/**
 * Prüft ein KFZ-Kennzeichen auf Gültigkeit; hierbei wird
 * evtl. auch ein externer REST-Service (anderer Microservice) 
 * aufgerufen.
 * 
 * @param {string} kfzKennzeichen KFZ-Kennzeichen, das geprüft 
 *                                werden soll, z.B. "KA X 1234"
 *  
 * @return {KfzCheckErgebnis} Objekt mit Ergebnis des Checks 
 */
export function checkKfzKennzeichen( kfzKennzeichen ) {

    let kfzKennzeichenNormiert = kfzKennzeichen.trim().toUpperCase();

    const kompArray = kfzKennzeichenNormiert.replace(/ {2,}/g, " " ).split( " " );

    const anzahlKomponenten = kompArray.length;
    if ( anzahlKomponenten != 3 ) {

        return new KfzCheckErgebnis( kfzKennzeichenNormiert, false, 
                                     "KFZ-Kennzeichen besteht nicht aus genau drei Komponenten." );
    }

    const teil1 = kompArray[0];
    const teil2 = kompArray[1];
    const teil3 = kompArray[2];

    kfzKennzeichenNormiert = teil1 + " " + teil2 + " " + teil3;

    // Unterscheidungszeichen besteht aus 1-3 Buchstaben
    const isTeil1Valid = /^[A-Z]{1,3}$/.test( teil1 );
    if ( !isTeil1Valid ) {

        return new KfzCheckErgebnis( kfzKennzeichenNormiert, false, 
                                     "Unterscheidungszeichen besteht nicht aus 1 bis 3 Buchstaben." );
    }

    // Anfang von Erkennungsnummer besteht aus 1-2 Buchstaben
    const isTeil2Valid = /^[A-Z]{1,2}$/.test( teil2 );
    if ( !isTeil2Valid ) {

        return new KfzCheckErgebnis( kfzKennzeichenNormiert, false, 
                                     "Anfang von Erkennungsnummer besteht nicht aus 1 bis 2 Buchstaben." );
    }

    // Erkennungsnummer besteht aus 1-4 Ziffern
    const isTeil3Valid = /^[1-9][0-9]{0,3}$/.test( teil3 );
    if ( !isTeil3Valid ) {

        return new KfzCheckErgebnis( kfzKennzeichenNormiert, false, 
                                     "Keine Zahl 1-9999 am Ende" );
    }

    const summeZeichen = teil1.length + teil2.length + teil3.length;
    if ( summeZeichen > 8 ) {

        return new KfzCheckErgebnis( kfzKennzeichenNormiert, false, 
                                     "KFZ-Kennzeichen besteht aus mehr als 8 Zeichen." );
    }

    return new KfzCheckErgebnis( kfzKennzeichenNormiert, true, "KFZ-Kennzeichen ist syntaktisch korrekt" );
}
