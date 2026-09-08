import FitParser from 'fit-file-parser';
import * as exifr from 'exifr';
import maplibregl from 'maplibre-gl';
import { jsPDF } from 'jspdf';
import { VectorTile } from '@mapbox/vector-tile';
import Pbf from 'pbf';
window.FitParser = FitParser; window.exifr = exifr; window.maplibregl = maplibregl; window.jsPDF = jsPDF; window.VectorTile = VectorTile; window.Pbf = Pbf;
