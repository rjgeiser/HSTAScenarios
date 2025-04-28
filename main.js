// === FULL main.js START ===

// Salary Constants
const FS_SALARY_TABLE = {
  "FS-06": {1: 48225, 2: 49672, 3: 51162, 4: 52697, 5: 54278, 6: 55906, 7: 57583, 8: 59311, 9: 61090, 10: 62923, 11: 64810, 12: 66755, 13: 68757, 14: 70820},
  "FS-05": {1: 53945, 2: 55563, 3: 57230, 4: 58947, 5: 60716, 6: 62537, 7: 64413, 8: 66346, 9: 68336, 10: 70386, 11: 72498, 12: 74672, 13: 76913, 14: 79220},
  "FS-04": {1: 66574, 2: 68571, 3: 70628, 4: 72747, 5: 74930, 6: 77178, 7: 79493, 8: 81878, 9: 84334, 10: 86864, 11: 89470, 12: 92154, 13: 94919, 14: 97766},
  "FS-03": {1: 82160, 2: 84625, 3: 87164, 4: 89778, 5: 92472, 6: 95246, 7: 98103, 8: 101046, 9: 104078, 10: 107200, 11: 110416, 12: 113729, 13: 117141, 14: 120655},
  "FS-02": {1: 101395, 2: 104437, 3: 107570, 4: 110797, 5: 114121, 6: 117545, 7: 121071, 8: 124703, 9: 128444, 10: 132297, 11: 136266, 12: 140354, 13: 144565, 14: 148902},
  "FS-01": {1: 125133, 2: 128887, 3: 132754, 4: 136736, 5: 140838, 6: 145063, 7: 149415, 8: 153898, 9: 158515, 10: 162672, 11: 162672, 12: 162672, 13: 162672, 14: 162672}
};

const GS13_STEP10_HOURLY = 52.66;
const GS13_STEP10_WEEKLY = 2106.40;

// Wardrobe Zone Mapping
const WARDROBE_ZONE_TABLE = {
  "Afghanistan": 1, "Albania": 1, "Algeria": 2,
  // ... include full mapping you have (I will continue in next message if necessary due to space)
};

// === DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  
  // Dark Mode Toggle
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
    });
  }

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

    const errorDiv = document.getElementById('form-errors');
    errorDiv.innerHTML = '';
    errorDiv.style.display = 'none';

    const errors = [];
    if (formData.separationDate <= formData.departureDate) {
      errors.push("Separation Date must be after Departure Date.");
    }
    if (formData.moveInDate && formData.moveInDate <= formData.departureDate) {
      errors.push("Move-in Date must be after Departure Date.");
    }
    if (formData.hasFamily && formData.numChildren > formData.numEFMs) {
      errors.push("Number of children cannot exceed total number of accompanying EFMs.");
    }
    if (errors.length > 0) {
      errorDiv.innerHTML = `<ul>${errors.map(e => `<li>${e}</li>`).join('')}</ul>`;
      errorDiv.style.display = 'block';
      return;
    }

        // Constants
    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    const CONUS_RATE = 168;

    const daysBetween = Math.floor((formData.separationDate - formData.departureDate) / MS_PER_DAY);
    const eligibleDays = Math.min(60, Math.max(0, daysBetween));
    const fixedDays = Math.min(30, eligibleDays);

    // Fixed HSTA Calculation
    const fixedSubsistence = CONUS_RATE * fixedDays * (0.75 + (formData.numEFMs * 0.25));
    const fixedMisc = formData.hasFamily ? 1500 : 750;
    const fixedWardrobe = getWardrobeAllowance(formData.departureCountry, 1, formData.hasFamily);
    const fixedPet = formData.shippingPet ? 4000 : 0;
    const fixedTotal = fixedSubsistence + fixedMisc + fixedWardrobe + fixedPet;

    // Actual (Itemized) HSTA Calculation
    let actualSubsistence = 0;
    const adultEFMs = formData.numEFMs - formData.numChildren;
    const childEFMs = formData.numChildren;
    for (let i = 1; i <= eligibleDays; i++) {
      const isFirst30 = i <= 30;
      actualSubsistence += CONUS_RATE * (isFirst30 ? 1.0 : 0.75);
      actualSubsistence += CONUS_RATE * (isFirst30 ? 0.75 : 0.5) * adultEFMs;
      actualSubsistence += CONUS_RATE * (isFirst30 ? 0.5 : 0.4) * childEFMs;
    }

    const salaryHourly = FS_SALARY_TABLE?.[formData.fsGrade]?.[formData.fsStep] 
      ? FS_SALARY_TABLE[formData.fsGrade][formData.fsStep] / 2087
      : 0;
    const weeklySalaryCap = salaryHourly * (formData.hasFamily ? 80 : 40);
    const gs13WeeklyCap = GS13_STEP10_HOURLY * (formData.hasFamily ? 80 : 40);
    const finalMiscCap = Math.min(weeklySalaryCap, gs13WeeklyCap);

    const extraClaims = (formData.techEstimate || 0) + (formData.batteryEstimate || 0) + (formData.carRentalEstimate || 0);
    const actualMisc = Math.min(finalMiscCap, extraClaims);

    const actualWardrobe = getWardrobeAllowance(formData.departureCountry, 1, formData.hasFamily);
    const actualPet = formData.shippingPet ? 4000 : 0;
    const actualTotal = actualSubsistence + actualMisc + actualWardrobe + actualPet;

    // === Scenario Summary
    const scenarioSummary = document.getElementById('scenario-summary');
    scenarioSummary.innerHTML = `
      <div class="summary-grid">
        <div><h4>Travel Information</h4><ul>
          <li><strong>Departure Date:</strong> ${formData.departureDate.toLocaleDateString()}</li>
          <li><strong>Separation Date:</strong> ${formData.separationDate.toLocaleDateString()}</li>
          <li><strong>Departure Country:</strong> ${formData.departureCountry}</li>
        </ul></div>
        <div><h4>Family Information</h4><ul>
          <li><strong>Number of EFMs:</strong> ${formData.numEFMs} (${formData.numChildren} under 12)</li>
          <li><strong>FS Grade/Step:</strong> ${formData.fsGrade} Step ${formData.fsStep}</li>
        </ul></div>
        <div><h4>Allowance Information</h4><ul>
          <li><strong>Permanent Housing Planned:</strong> ${formData.permHousing ? 'Yes' : 'No'}</li>
          <li><strong>Shipping POV:</strong> ${formData.shippingCar ? 'Yes' : 'No'}</li>
          <li><strong>Shipping Pet:</strong> ${formData.shippingPet ? 'Yes' : 'No'}</li>
          <li><strong>Tech Replacement Claimed:</strong> ${formData.techIssues ? 'Yes' : 'No'}</li>
          <li><strong>Lithium Battery Claimed:</strong> ${formData.lithiumRemoval ? 'Yes' : 'No'}</li>
          <li><strong>Car Rental Claimed:</strong> ${formData.rentingCar ? 'Yes' : 'No'}</li>
        </ul></div>
      </div>
    `;

    // === Fixed vs Actual HSTA Outputs
    document.getElementById('fixed-breakdown').innerHTML = `
      <p><strong>Subsistence (30 days):</strong> ${fixedSubsistence.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}</p>
      <p><strong>Miscellaneous:</strong> ${fixedMisc.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}</p>
      <p><strong>Wardrobe Allowance:</strong> ${fixedWardrobe.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}</p>
      <p><strong>Pet Shipment:</strong> ${fixedPet.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}</p>
      <hr><p><strong>Total Fixed Estimate:</strong> ${fixedTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}</p>
    `;

    document.getElementById('actual-breakdown').innerHTML = `
      <p><strong>Subsistence (${eligibleDays} days):</strong> ${actualSubsistence.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}</p>
      <p><strong>Miscellaneous (Itemized):</strong> ${actualMisc.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}</p>
      <p><strong>Wardrobe Allowance:</strong> ${actualWardrobe.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}</p>
      <p><strong>Pet Shipment:</strong> ${actualPet.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}</p>
      <hr><p><strong>Total Actual Estimate:</strong> ${actualTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}</p>
    `;

    // === Fixed vs Actual Recommendation
    const fixedActualRecommendation = document.getElementById('fixed-actual-recommendation');
    fixedActualRecommendation.innerHTML = actualTotal > fixedTotal
      ? `<p>We recommend pursuing the <strong>Actual HSTA option</strong> based on your inputs (~${(actualTotal - fixedTotal).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })} more).</p>`
      : `<p>We recommend pursuing the <strong>Fixed HSTA option</strong> based on your inputs (higher or comparable benefit).</p>`;

    // === USAID vs State Miscellaneous Clarification
    const usaidMiscTotal = Math.min(finalMiscCap, extraClaims);
    const stateMiscTotal = 0;

    document.getElementById('usaid-breakdown').innerHTML = `
      <p><strong>Miscellaneous (Itemized w/ Tech/Car/Battery):</strong> ${usaidMiscTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}</p>
    `;

    document.getElementById('state-breakdown').innerHTML = `
      <p><strong>Miscellaneous (Strict DSSR, No Extras):</strong> ${stateMiscTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}</p>
    `;

    // Show Results
    document.getElementById('results-section').style.display = 'block';
    document.getElementById('hsta-form').style.display = 'none';
  });

  // === Buttons (Reset / Modify Inputs / Print)
  const modifyInputs = document.getElementById('modify-inputs');
  if (modifyInputs) {
    modifyInputs.addEventListener('click', () => {
      document.getElementById('results-section').style.display = 'none';
      document.getElementById('hsta-form').style.display = 'block';
    });
  }

  const resetButton = document.getElementById('reset-form');
  if (resetButton) {
    resetButton.addEventListener('click', () => {
      window.location.reload();
    });
  }

  const printButton = document.getElementById('print-results');
  if (printButton) {
    printButton.addEventListener('click', () => {
      window.print();
    });
  }
});

// === FULL main.js END ===
