**Hallo Nils und Arne**,

Hier ist meine Lösung zu eurer Aufgabe.
Die eingegebene URL muss mit dem Format „https://www.“ beginnen. Danach könnt ihr beliebigen Text eintippen. Nach jeder Eingabe im Input-Feld wird die URL innerhalb von **300 Millisekunden** überprüft (mit Throttling).

Zuerst kontrolliere ich die Eingabe mit Formik und Yup, um sicherzustellen, dass die URL korrekt formatiert ist, mit **https://www.** beginnt, wie eine typische Webadresse.

Sobald dieser Anfang vorhanden ist, könnt ihr beliebige Buchstaben eingeben. Die URL wird automatisch mit einer Mock-Funktion simuliert. Anschließend wird dem Nutzer angezeigt, ob die URL existiert oder nicht.

Die vollständige Lösung findet ihr in meinem url-checker folder.

**Liebe Grüße :)**
**Özgür**
