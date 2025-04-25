
import {
  CONUS_PER_DIEM,
  CONUS_MIE,
  WARDROBE_ZONES,
  getWardrobeAllowance,
  calculateItemizedMiscCap
} from './constants.js';

document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
  });

  const form = document.getElementById('hsta-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
      departureDate: new Date(document.getElementById('departure-date').value),
      separationDate: new Date(document.getElementById('separation-date').value),
      hasFamily: document.getElementById('has-family').value === 'yes',
      numEFMs: parseInt(document.getElementById('num-efms')?.value || 0),
      numChildren: parseInt(document.getElementById('num-children')?.value || 0),
      fsGrade: document.getElementById('fs-grade').value,
      fsStep: parseInt(document.getElementById('fs-step').value),
      permHousing: document.getElementById('perm-housing').value === 'yes',
      moveInDate: document.getElementById('move-in-date').value
        ? new Date(document.getElementById('move-in-date').value)
        : null,
      shippingCar: document.getElementById('shipping-car').value === 'yes',
      shippingPet: document.getElementById('shipping-pet').value === 'yes',
      departureCountry: document.getElementById('departure-country').value.trim(),
      techIssues: document.getElementById('tech-issues').value === 'yes',
      lithiumRemoval: document.getElementById('lithium-removal').value === 'yes',
      techEstimate: parseFloat(document.getElementById('tech-estimate')?.value || 0),
      carRentalEstimate: parseFloat(document.getElementById('car-estimate')?.value || 0),
      batteryEstimate: parseFloat(document.getElementById('battery-estimate')?.value || 0)
    };

    // === Estimation Logic ===
    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    const daysBetween = Math.floor((formData.separationDate - formData.departureDate) / MS_PER_DAY);
    const eligibleDays = Math.min(60, Math.max(0, daysBetween));
    const fixedDays = Math.min(eligibleDays, 30);

    const adultEFMs = formData.numEFMs - formData.numChildren;
    const childEFMs = formData.numChildren;

    // Subsistence - Fixed
    const fixedSubsistence =
      CONUS_PER_DIEM * fixedDays *
      (0.75 + 0.25 * formData.numEFMs);

    // Subsistence - Actual
    let actualSubsistence = 0;
    for (let i = 1; i <= eligibleDays; i++) {
      const isFirst30 = i <= 30;
      const empRate = isFirst30 ? 1.0 : 0.75;
      const efmAdultRate = isFirst30 ? 0.75 : 0.5;
      const efmChildRate = isFirst30 ? 0.5 : 0.4;

      actualSubsistence += CONUS_PER_DIEM * empRate;
      actualSubsistence += CONUS_PER_DIEM * efmAdultRate * adultEFMs;
      actualSubsistence += CONUS_PER_DIEM * efmChildRate * childEFMs;
    }

    // Perm Qtrs M&IE
    const permMIE = formData.permHousing ? CONUS_PER_DIEM * Math.min(90, eligibleDays) : 0;

    // Misc
    const standardMisc = formData.hasFamily ? 1500 : 750;
    const itemizedMiscCap = calculateItemizedMiscCap(formData.fsGrade, formData.hasFamily);

    // Wardrobe
    const fromZone = WARDROBE_ZONES[formData.departureCountry] || 1;
    const wardrobe = getWardrobeAllowance(fromZone, 1, formData.hasFamily);

    // Pet
    const petShipment = formData.shippingPet ? 4000 : 0;

    // Actual-specific estimates
    const carRental = formData.shippingCar ? (formData.carRentalEstimate || 0) : 0;
    const tech = formData.techIssues ? (formData.techEstimate || 0) : 0;
    const battery = formData.lithiumRemoval ? (formData.batteryEstimate || 0) : 0;

    // Totals
    const fixedTotal = fixedSubsistence + standardMisc + wardrobe + petShipment;
    const actualTotal = actualSubsistence + permMIE + itemizedMiscCap + wardrobe + petShipment + carRental + tech + battery;

    console.log("Fixed Total:", fixedTotal.toFixed(2));
    console.log("Actual Total:", actualTotal.toFixed(2));

    // Final Output (To be connected to display logic)
    alert(`Fixed: $${fixedTotal.toFixed(2)}\nActual: $${actualTotal.toFixed(2)}\n(See console for breakdown)`);
  });
});
