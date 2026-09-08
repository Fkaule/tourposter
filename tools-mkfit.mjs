import { FitEncoder, FitBaseType } from 'fit-file-parser';
import fs from 'fs';
const st = JSON.parse(fs.readFileSync('/home/claude/brocken/stages.json'))[0];
const enc = new FitEncoder();
// file_id (0): type(0)=4 activity, manufacturer(1)=1
enc.writeMessage(0, [{ number: 0, size: 1, baseType: FitBaseType.Enum, value: 4 }, { number: 1, size: 2, baseType: FitBaseType.Uint16, value: 1 }, { number: 4, size: 4, baseType: FitBaseType.Uint32, value: FitEncoder.toFitTimestamp(new Date('2024-06-16T06:00:00Z')) }], 0);
const t0 = new Date('2024-06-16T06:00:00Z').getTime(); let dist = 0; let prev = null;
const R = 6371000, d2r = Math.PI / 180; const hav = (a, b) => { const dl = (b[0] - a[0]) * d2r, dn = (b[1] - a[1]) * d2r; const h = Math.sin(dl / 2) ** 2 + Math.cos(a[0] * d2r) * Math.cos(b[0] * d2r) * Math.sin(dn / 2) ** 2; return 2 * R * Math.asin(Math.sqrt(h)); };
st.points.forEach((p, i) => {
  if (prev) dist += hav(prev, p); prev = p;
  const alt = 200 + 900 * Math.exp(-((i - 60) ** 2) / 400);
  // record (20): timestamp(253) u32, position_lat(0) s32, position_long(1) s32, altitude(2) u16 scale5 off500, distance(5) u32 scale100
  enc.writeMessage(20, [
    { number: 253, size: 4, baseType: FitBaseType.Uint32, value: FitEncoder.toFitTimestamp(new Date(t0 + i * 120000)) },
    { number: 0, size: 4, baseType: FitBaseType.Sint32, value: Math.round(p[0] / (180 / 2 ** 31)) },
    { number: 1, size: 4, baseType: FitBaseType.Sint32, value: Math.round(p[1] / (180 / 2 ** 31)) },
    { number: 2, size: 2, baseType: FitBaseType.Uint16, value: Math.round((alt + 500) * 5) },
    { number: 5, size: 4, baseType: FitBaseType.Uint32, value: Math.round(dist * 100) },
  ], 1);
});
// session (18): total_distance(9) u32 scale100, total_ascent(22) u16, total_timer_time(8) u32 scale1000
enc.writeMessage(18, [{ number: 253, size: 4, baseType: FitBaseType.Uint32, value: FitEncoder.toFitTimestamp(new Date(t0 + st.points.length * 120000)) }, { number: 9, size: 4, baseType: FitBaseType.Uint32, value: Math.round(dist * 100) }, { number: 22, size: 2, baseType: FitBaseType.Uint16, value: 2401 }, { number: 8, size: 4, baseType: FitBaseType.Uint32, value: 9 * 3600 * 1000 }], 2);
fs.writeFileSync('/tmp/brocken.fit', enc.close()); console.log('fit written', dist / 1000);
