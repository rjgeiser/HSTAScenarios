
// === HSTA Constants (2025 Edition) ===

// GSA Per Diem Rates (Jan 2025)
export const CONUS_PER_DIEM = 168; // GSA FY2025
export const CONUS_MIE = {
  meals: 143,
  incidentals: 25
};

// Wardrobe Zones (DSSR 242.1 Example - Simplified)
export const WARDROBE_ZONES = {
  "Norway": 1,
  "Germany": 1,
  "USA": 1,
  "El Salvador": 2,
  "Peru": 2,
  "Dominican Republic": 3,
  "Afghanistan": 3,
  "Pakistan": 3
};

// Wardrobe Allowance (based on zone shift)
export function getWardrobeAllowance(fromZone, toZone = 1, hasEFMs = false) {
  const zoneShift = Math.abs(fromZone - toZone);
  if (zoneShift === 0) return 0;
  if (zoneShift === 1) return hasEFMs ? 700 : 350;
  if (zoneShift >= 2) return hasEFMs ? 1400 : 700;
  return 0;
}

// FS Base Salaries (2025 Estimates - Annual, Step 6 where applicable)
export const FS_SALARY_TABLE = {
  "FS-06": {1: 48225, 2: 49672, 3: 51162, 4: 52697, 5: 54278, 6: 55906, 7: 57583, 8: 59311, 9: 61090, 10: 62923, 11: 64810, 12: 66755, 13: 68757, 14: 70820},
  "FS-05": {1: 53945, 2: 55563, 3: 57230, 4: 58947, 5: 60716, 6: 62537, 7: 64413, 8: 66346, 9: 68336, 10: 70386, 11: 72498, 12: 74672, 13: 76913, 14: 79220},
  "FS-04": {1: 66574, 2: 68571, 3: 70628, 4: 72747, 5: 74930, 6: 77178, 7: 79493, 8: 81878, 9: 84334, 10: 86864, 11: 89470, 12: 92154, 13: 94919, 14: 97766},
  "FS-03": {1: 82160, 2: 84625, 3: 87164, 4: 89778, 5: 92472, 6: 95246, 7: 98103, 8: 101046, 9: 104078, 10: 107200, 11: 110416, 12: 113729, 13: 117141, 14: 120655},
  "FS-02": {1: 101395, 2: 104437, 3: 107570, 4: 110797, 5: 114121, 6: 117545, 7: 121071, 8: 124703, 9: 128444, 10: 132297, 11: 136266, 12: 140354, 13: 144565, 14: 148902},
  "FS-01": {1: 125133, 2: 128887, 3: 132754, 4: 136736, 5: 140838, 6: 145063, 7: 149415, 8: 153898, 9: 158515, 10: 162672, 11: 162672, 12: 162672, 13: 162672, 14: 162672}
};

// GS-13 Step 10 Hourly and Weekly
export const GS13_STEP10_HOURLY = 52.66; // 2025 GS-13/10 hourly rate
export const GS13_STEP10_WEEKLY = 2106.40; // 40 hours × 52.66

// Misc cap calculator
export function calculateItemizedMiscCap(fsGrade, hasEFMs) {
  const fsAnnual = FS_BASE_PAY[fsGrade] || 0;
  const fsHourly = fsAnnual / 2087;
  const fsWeekly = fsHourly * 40;
  const weeks = hasEFMs ? 2 : 1;
  const fsCap = fsWeekly * weeks;
  const gsCap = GS13_STEP10_WEEKLY * weeks;
  return Math.min(fsCap, gsCap);
}
