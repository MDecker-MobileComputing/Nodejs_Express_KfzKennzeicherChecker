
/**
 * Klasse für Objekte die als Ergebnis des Checks vom REST-Endpunkt
 * im JSON-Format zurückgegeben werden.
 */
export class KfzCheckErgebnis {

    /**
     * Neues Objekt mit Ergebnis KFZ-Kennzeichen-Check erstellen.
     * 
     * @param {string}  kennzeichen Normiertes KFZ-Kennzeichen, das überprüft wurde 
     * 
     * @param {boolean} gueltig `true`, wenn das Kennzeichen gültig ist
     * 
     * @param {string}  nachricht, z.B. mit detaillierter Fehlermeldung
     */
    constructor( kennzeichen, gueltig, nachricht ) {

        this.kennzeichen = kennzeichen;
        this.gueltig     = gueltig;
        this.nachricht   = nachricht
    }

}