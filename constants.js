
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
export const FS_BASE_PAY = {
  "FS-01": 124500,
  "FS-02": 105000,
  "FS-03": 86000,
  "FS-04": 70000
};

// GS-13 Step 10 Weekly Cap
export const GS13_STEP10_HOURLY = 52.66;
export const GS13_STEP10_WEEKLY = 52.66 * 40; // $2,106.40

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
