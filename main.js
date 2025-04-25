// main.js

import {
  FS_SALARY_TABLE,
  GS13_STEP10_HOURLY,
  GS13_STEP10_WEEKLY
} from './constants.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');

  // Set up dynamic show/hide for conditional fields
  const setupToggle = (id, targetId) => {
    const input = document.getElementById(id);
    const target = document.getElementById(targetId);
    if (input && target) {
      input.addEventListener('change', (e) => {
        target.style.display = e.target.value === 'yes' ? 'block' : 'none';
      });
    }
  };

  setupToggle('has-family', 'family-details');
  setupToggle('perm-housing', 'perm-housing-date');
  setupToggle('tech-issues', 'tech-cost-section');
  setupToggle('lithium-removal', 'battery-cost-section');
  setupToggle('renting-car', 'car-rental-cost-section');

  const form = document.getElementById('hsta-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Form submitted.');

    const formData = {
      departureDate: new Date(document.getElementById('departure-date').value),
      separationDate: new Date(document.getElementById('separation-date').value),
      hasFamily: document.getElementById('has-family').value === 'yes',
      numEFMs: parseInt(document.getElementById('num-efms')?.value || 0),
      numChildren: parseInt(document.getElementById('num-children')?.value || 0),
      fsGrade: document.getElementById('fs-grade').value,
      fsStep: parseInt(document.getElementById('fs-step').value),
      permHousing: document.getElementById('perm-housing').value === 'yes',
      moveInDate: document.getElementById('move-in-date').value ? new Date(document.getElementById('move-in-date').value) : null,
      shippingCar: document.getElementById('shipping-car').value === 'yes',
      shippingPet: document.getElementById('shipping-pet').value === 'yes',
      departureCountry: document.getElementById('departure-country').value.trim(),
      techIssues: document.getElementById('tech-issues').value === 'yes',
      lithiumRemoval: document.getElementById('lithium-removal').value === 'yes',
      rentingCar: document.getElementById('renting-car').value === 'yes',
      techEstimate: parseFloat(document.getElementById('tech-estimate')?.value || 0),
      carRentalEstimate: parseFloat(document.getElementById('car-estimate')?.value || 0),
      batteryEstimate: parseFloat(document.getElementById('battery-estimate')?.value || 0)
    };

    // Dark Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
      });
    }

    // Calculate eligible days (departure to separation date)
    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    const daysBetween = Math.floor((formData.separationDate - formData.departureDate) / MS_PER_DAY);
    const eligibleDays = Math.min(60, Math.max(0, daysBetween));
    const fixedDays = Math.min(eligibleDays, 30);

    // Subsistence - Fixed
    const fixedSubsistence = 168 * fixedDays * (0.75 + 0.25 * formData.numEFMs);

    // Subsistence - Actual
    let actualSubsistence = 0;
    const adultEFMs = formData.numEFMs - formData.numChildren;
    const childEFMs = formData.numChildren;
    for (let i = 1; i <= eligibleDays; i++) {
      const isFirst30 = i <= 30;
      const empRate = isFirst30 ? 1.0 : 0.75;
      const efmAdultRate = isFirst30 ? 0.75 : 0.5;
      const efmChildRate = isFirst30 ? 0.5 : 0.4;

      actualSubsistence += 168 * empRate;
      actualSubsistence += 168 * efmAdultRate * adultEFMs;
      actualSubsistence += 168 * efmChildRate * childEFMs;
    }

    const permMIE = formData.permHousing ? 168 * Math.min(90, eligibleDays) : 0;

    // Wardrobe Allowance (simplified for now)
    const wardrobeAllowance = formData.hasFamily ? 1400 : 700;

    // Pet Shipment
    const petShipment = formData.shippingPet ? 4000 : 0;

    // Car Rental, Tech, Battery
    const carRental = formData.rentingCar ? (formData.carRentalEstimate || 0) : 0;
    const tech = formData.techIssues ? (formData.techEstimate || 0) : 0;
    const battery = formData.lithiumRemoval ? (formData.batteryEstimate || 0) : 0;

    // Miscellaneous - Itemized Cap logic
    let miscCap = 0;
    let miscCapExplanation = '';

    if (formData.fsGrade.startsWith('SFS')) {
      miscCap = GS13_STEP10_WEEKLY;
      miscCapExplanation = "(Capped by GS-13 Step 10 rate)";
    } else {
      const fsSalary = FS_SALARY_TABLE?.[formData.fsGrade]?.[formData.fsStep] || 0;
      const hourlyRate = fsSalary / 2087;
      const weeklyPay = hourlyRate * 40;
      miscCap = Math.min(weeklyPay, GS13_STEP10_WEEKLY);
      miscCapExplanation = (weeklyPay > GS13_STEP10_WEEKLY)
        ? "(Capped by GS-13 Step 10 rate)"
        : "(Capped by your FS salary)";
    }

    const standardMisc = formData.hasFamily ? 1500 : 750;

    // Totals
    const fixedTotal = fixedSubsistence + standardMisc + wardrobeAllowance + petShipment;
    const actualTotal = actualSubsistence + permMIE + miscCap + wardrobeAllowance + petShipment + carRental + tech + battery;

    // Results Display
    document.getElementById('fixed-breakdown').innerHTML = `
      <p><strong>Subsistence (30 days):</strong> $${fixedSubsistence.toFixed(2)}<br><small>(DSSR 251.2(a))</small></p>
      <p><strong>Miscellaneous (Standard):</strong> $${standardMisc.toFixed(2)}<br><small>(DSSR 252.1(a))</small></p>
      <p><strong>Wardrobe Allowance:</strong> $${wardrobeAllowance.toFixed(2)}<br><small>(DSSR 242.1)</small></p>
      <p><strong>Pet Shipment:</strong> $${petShipment.toFixed(2)}<br><small>(14 FAM 615.3)</small></p>
      <hr>
      <p><strong>Total Fixed Estimate:</strong> $${fixedTotal.toFixed(2)}</p>
    `;

    document.getElementById('actual-breakdown').innerHTML = `
      <p><strong>Subsistence (${eligibleDays} days):</strong> $${actualSubsistence.toFixed(2)}<br><small>(DSSR 251.2(a))</small></p>
      <p><strong>Perm Qtrs M&IE:</strong> $${permMIE.toFixed(2)}<br><small>(DSSR 251.2(b))</small></p>
      <p><strong>Miscellaneous (Itemized):</strong> $${miscCap.toFixed(2)} ${miscCapExplanation}<br><small>(DSSR 252.1(b))</small></p>
      <p><strong>Wardrobe Allowance:</strong> $${wardrobeAllowance.toFixed(2)}<br><small>(DSSR 242.1)</small></p>
      <p><strong>Pet Shipment:</strong> $${petShipment.toFixed(2)}<br><small>(14 FAM 615.3)</small></p>
      <p><strong>Car Rental:</strong> $${carRental.toFixed(2)}<br><small>(DSSR 252.1(b)(3)(i))</small></p>
      <p><strong>Tech Replacement:</strong> $${tech.toFixed(2)}<br><small>(DSSR 252.1(b)(3)(ii))</small></p>
      <p><strong>Lithium Battery:</strong> $${battery.toFixed(2)}<br><small>(DSSR 252.1(b)(3)(iii))</small></p>
      <hr>
      <p><strong>Total Actual Estimate:</strong> $${actualTotal.toFixed(2)}</p>
    `;

    const recommendation = document.getElementById('recommendation');
    recommendation.innerHTML = (actualTotal > fixedTotal)
      ? `We recommend pursuing the <strong>Actual HSTA option</strong> for a potentially higher allowance (~$${(actualTotal - fixedTotal).toFixed(2)} more).`
      : `We recommend considering the <strong>Fixed HSTA option</strong> for simplicity and comparable benefit.`;

    document.getElementById('results-section').style.display = 'block';
    document.querySelector('.container').classList.add('show-results');
  });
});
