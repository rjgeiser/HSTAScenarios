
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

    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    const daysBetween = Math.floor((formData.separationDate - formData.departureDate) / MS_PER_DAY);
    const eligibleDays = Math.min(60, Math.max(0, daysBetween));
    const fixedDays = Math.min(eligibleDays, 30);

    const adultEFMs = formData.numEFMs - formData.numChildren;
    const childEFMs = formData.numChildren;

    const fixedSubsistence =
      CONUS_PER_DIEM * fixedDays *
      (0.75 + 0.25 * formData.numEFMs);

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

    const permMIE = formData.permHousing ? CONUS_PER_DIEM * Math.min(90, eligibleDays) : 0;
    const standardMisc = formData.hasFamily ? 1500 : 750;
    const itemizedMiscCap = calculateItemizedMiscCap(formData.fsGrade, formData.hasFamily);
    const fromZone = WARDROBE_ZONES[formData.departureCountry] || 1;
    const wardrobe = getWardrobeAllowance(fromZone, 1, formData.hasFamily);
    const petShipment = formData.shippingPet ? 4000 : 0;
    const carRental = formData.shippingCar ? (formData.carRentalEstimate || 0) : 0;
    const tech = formData.techIssues ? (formData.techEstimate || 0) : 0;
    const battery = formData.lithiumRemoval ? (formData.batteryEstimate || 0) : 0;

    const fixedTotal = fixedSubsistence + standardMisc + wardrobe + petShipment;
    const actualTotal = actualSubsistence + permMIE + itemizedMiscCap + wardrobe + petShipment + carRental + tech + battery;

    // Format breakdowns
    const breakdown = (label, value, ref = '') => `<p><strong>${label}:</strong> $${value.toFixed(2)} ${ref ? `<br><small>(${ref})</small>` : ''}</p>`;

    // Populate report cards
    const fixedDiv = document.getElementById('fixed-breakdown');
    const actualDiv = document.getElementById('actual-breakdown');
    fixedDiv.innerHTML = '';
    actualDiv.innerHTML = '';

    fixedDiv.innerHTML += breakdown("Subsistence (30 days)", fixedSubsistence, "DSSR 251.2(a)");
    fixedDiv.innerHTML += breakdown("Miscellaneous (Standard)", standardMisc, "DSSR 252.1(a)");
    fixedDiv.innerHTML += breakdown("Wardrobe Allowance", wardrobe, "DSSR 242.1");
    fixedDiv.innerHTML += breakdown("Pet Shipment", petShipment, "14 FAM 615.3");
    fixedDiv.innerHTML += `<hr><p><strong>Total:</strong> $${fixedTotal.toFixed(2)}</p>`;

    actualDiv.innerHTML += breakdown("Subsistence (" + eligibleDays + " days)", actualSubsistence, "DSSR 251.2(a)");
    actualDiv.innerHTML += breakdown("Perm. Qtrs M&IE", permMIE, "DSSR 251.2(b)");
    actualDiv.innerHTML += breakdown("Miscellaneous (Itemized Cap)", itemizedMiscCap, "DSSR 252.1(b)");
    actualDiv.innerHTML += breakdown("Wardrobe Allowance", wardrobe, "DSSR 242.1");
    actualDiv.innerHTML += breakdown("Pet Shipment", petShipment, "14 FAM 615.3");
    actualDiv.innerHTML += breakdown("Car Rental", carRental, "DSSR 252.1(b)(3)(i)");
    actualDiv.innerHTML += breakdown("Tech Replacement", tech, "DSSR 252.1(b)(3)(ii)");
    actualDiv.innerHTML += breakdown("Lithium Battery", battery, "DSSR 252.1(b)(3)(iii)");
    actualDiv.innerHTML += `<hr><p><strong>Total:</strong> $${actualTotal.toFixed(2)}</p>`;

    // Show recommendation
    const recommendation = document.getElementById('recommendation');
    let message = '';
    if (actualTotal > fixedTotal && eligibleDays >= 30) {
      message = `We recommend pursuing the <strong>Actual HSTA option</strong>, which may yield approximately $${(actualTotal - fixedTotal).toFixed(2)} more than the Fixed Rate.`;
    } else {
      message = `We recommend the <strong>Fixed HSTA option</strong>, which may provide a higher or comparable benefit with less documentation.`;
    }
    if (eligibleDays < 30) {
      message += `<br><em>Note: Your actual HSTA is limited to ${eligibleDays} day(s) due to your separation timeline.</em>`;
    }
    recommendation.innerHTML = message;

    // Show results section
    document.getElementById('results-section').style.display = 'block';
  });
});
