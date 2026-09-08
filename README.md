# Tourposter

Radtour-Poster (A3, 300 dpi) aus FIT/GPX/TCX-Dateien und Fotos – **komplett im Browser**. Es gibt keinen Server: Tourdaten und Fotos verlassen den Rechner nicht. Einzige Netzwerkzugriffe sind die Kartenkacheln (OpenFreeMap, sieht nur die Region) und die Schrift Montserrat (Google Fonts).

**Live:** `https://<user>.github.io/tourposter/` (GitHub Pages, siehe unten) – oder `index.html` herunterladen und doppelklicken.

## Funktionen

- FIT / GPX / TCX hineinziehen, mehrere Dateien = Etappen; Kennzahlen (km, Höhenmeter, Etappen) und Datumszeile automatisch.
- Karte: MapLibre GL mit dunklen Vektorkacheln, Route, Marker für Start/Ziel/Übernachtungen; verschieben/zoomen, „auf Route einpassen“.
- Ortsnamen für Start, Ziel und Übernachtungen automatisch aus den Kartendaten (Detail-Kachel Zoom 12; Städte bevorzugt); ziehen = verschieben, Doppelklick = Text ändern.
- Fotos hineinziehen: Ort (genauer Ort aus den Kartendaten) und Datum aus EXIF, Nummern-Pins auf der Route. Ziehen mit Einrasten an Kanten/gleichen Abständen, vier Ecken zum Skalieren (Shift = Seitenverhältnis), Mehrfachauswahl + Ausrichten, Bildausschnitt mit Zoom/Verschieben (Doppelklick, Mausrad, Slider).
- Titel, Untertitel, Kennzahlen direkt im Poster tippen. Hoch- und Querformat, Papiergröße A4 / A3 / A2 (300 dpi).
- Höhenprofil mit Etappengrenzen.
- Export PNG und PDF (A3, 300 dpi). Layout im Browser speichern oder als JSON sichern/laden (Fotos danach wieder hinzufügen, Zuordnung per Dateiname).

## Entwicklung

    npm install
    npm run build      # src/app.html + Bibliotheken -> index.html

`src/app.html` ist die App (HTML/CSS/JS), `src/entry.js` listet die gebündelten Bibliotheken (fit-file-parser, exifr, maplibre-gl, jspdf, @mapbox/vector-tile, pbf). `tools-mkfit.mjs` erzeugt eine Test-FIT-Datei.

## GitHub Pages

Repo-Einstellungen → Pages → Source „Deploy from a branch“, Branch `main`, Ordner `/ (root)`. Danach ist `index.html` unter `https://<user>.github.io/<repo>/` erreichbar.

## Lizenz

MIT. Karten © OpenFreeMap / OpenMapTiles / OpenStreetMap-Mitwirkende.
