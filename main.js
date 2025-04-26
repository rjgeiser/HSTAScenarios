
// main.js

import {
  FS_SALARY_TABLE,
  GS13_STEP10_HOURLY,
  GS13_STEP10_WEEKLY
} from './constants.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');

  // Handle Reset Form Button
const resetButton = document.getElementById('reset-form');
if (resetButton) {
  resetButton.addEventListener('click', () => {
    document.getElementById('results-section').style.display = 'none';
    document.querySelector('.container').classList.remove('show-results');
    console.log('Form and results reset.');
  });
}

// Handle Print Results Button
const printButton = document.getElementById('print-results');
if (printButton) {
  printButton.addEventListener('click', () => {
    window.print();
  });
}
  
    // Dark Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
      });
    }

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

    // Validation checks
  const errors = [];
  
  // Date validations
  if (formData.separationDate <= formData.departureDate) {
    errors.push("Separation Date must be after Departure Date.");
  }
  if (formData.moveInDate && formData.moveInDate <= formData.departureDate) {
    errors.push("Move-in Date must be after Departure Date.");
  }
  
  // Family/children validations
  if (formData.hasFamily && formData.numChildren > formData.numEFMs) {
    errors.push("Number of children cannot exceed total number of accompanying family members.");
  }
  
  // Handle errors if any
  if (errors.length > 0) {
    alert(errors.join("\\n"));
    return; // Stop form processing if invalid
  }

    // Build Scenario Summary Output
const scenarioSummary = document.getElementById('scenario-summary');
scenarioSummary.innerHTML = ''; // Clear previous

scenarioSummary.innerHTML = `
  <h3>Scenario Summary</h3>
  <div class="summary-grid">
    <div>
      <h4>Travel Information</h4>
      <ul>
        <li><strong>Departure Date:</strong> ${formData.departureDate.toLocaleDateString()}</li>
        <li><strong>Separation Date:</strong> ${formData.separationDate.toLocaleDateString()}</li>
        <li><strong>Departure Country:</strong> ${formData.departureCountry}</li>
      </ul>
    </div>
    <div>
      <h4>Family Information</h4>
      <ul>
        <li><strong>Number of EFMs:</strong> ${formData.numEFMs} (${formData.numChildren} under age 12)</li>
        <li><strong>FS Grade and Step:</strong> ${formData.fsGrade} Step ${formData.fsStep}</li>
      </ul>
    </div>
    <div>
  <h4>Allowance Information</h4>
      <ul>
        <li><strong>Permanent Housing Planned:</strong> ${formData.permHousing ? 'Yes' : 'No'}</li>
        <li><strong>Shipping POV:</strong> ${formData.shippingCar ? 'Yes' : 'No'}</li>
        <li><strong>Shipping Pet:</strong> ${formData.shippingPet ? 'Yes' : 'No'}</li>
        <li><strong>Tech Replacement Claimed:</strong> ${formData.techIssues ? 'Yes' : 'No'}</li>
        <li><strong>Lithium Battery Replacement Claimed:</strong> ${formData.lithiumRemoval ? 'Yes' : 'No'}</li>
        <li><strong>Car Rental Claimed:</strong> ${formData.rentingCar ? 'Yes' : 'No'}${formData.rentingCar && formData.carRentalEstimate ? ` ($${formData.carRentalEstimate.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })})` : ''}</li>
      </ul>
    </div>
  </div>
`;

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
      <p><strong>Subsistence (30 days):</strong> $${fixedSubsistence.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}<br><small>(DSSR 251.2(a))</small></p>
      <p><strong>Miscellaneous (Standard):</strong> $${standardMisc.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}<br><small>(DSSR 252.1(a))</small></p>
      <p><strong>Wardrobe Allowance:</strong> $${wardrobeAllowance.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}<br><small>(DSSR 242.1)</small></p>
      <p><strong>Pet Shipment:</strong> $${petShipment.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}<br><small>(14 FAM 615.3)</small></p>
      <hr>
      <p><strong>Total Fixed Estimate:</strong> $${fixedTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}</p>
    `;

    document.getElementById('actual-breakdown').innerHTML = `
      <p><strong>Subsistence (${eligibleDays} days):</strong> $${actualSubsistence.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}<br><small>(DSSR 251.2(a))</small></p>
      <p><strong>Perm Qtrs M&IE:</strong> $${permMIE.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}<br><small>(DSSR 251.2(b))</small></p>
      <p><strong>Miscellaneous (Itemized):</strong> $${miscCap.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })} ${miscCapExplanation}<br><small>(DSSR 252.1(b))</small></p>
      <p><strong>Wardrobe Allowance:</strong> $${wardrobeAllowance.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}<br><small>(DSSR 242.1)</small></p>
      <p><strong>Pet Shipment:</strong> $${petShipment.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}<br><small>(14 FAM 615.3)</small></p>
      <p><strong>Car Rental:</strong> $${carRental.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}<br><small>(DSSR 252.1(b)(3)(i))</small></p>
      <p><strong>Tech Replacement:</strong> $${tech.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}<br><small>(DSSR 252.1(b)(3)(ii))</small></p>
      <p><strong>Lithium Battery:</strong> $${battery.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}<br><small>(DSSR 252.1(b)(3)(iii))</small></p>
      <hr>
      <p><strong>Total Actual Estimate:</strong> $${actualTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}</p>
    `;

    const recommendation = document.getElementById('recommendation');
    recommendation.innerHTML = (actualTotal > fixedTotal)
      ? `We recommend pursuing the <strong>Actual HSTA option</strong> for a potentially higher allowance (~$${(actualTotal - fixedTotal).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })} more).`
      : `We recommend considering the <strong>Fixed HSTA option</strong> for simplicity and comparable benefit.`;

    document.getElementById('results-section').style.display = 'block';
    document.querySelector('.container').classList.add('show-results');
  });
});
