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

// Parse Local Date From Input (prevents UTC offset errors)
function parseLocalDate(inputId) {
  const input = document.getElementById(inputId).value;
  const [year, month, day] = input.split('-').map(Number);
  return new Date(year, month - 1, day);
}

// Wardrobe Zone Mapping
const WARDROBE_ZONE_TABLE = {
 "Afghanistan": 1,
 "Albania": 1,
 "Algeria": 2,
 "Angola": 2,
 "Argentina": 2,
 "Armenia": 1,
 "Australia": 2,
 "Austria": 1,
 "Azerbaijan": 1,
 "Bahamas": 2,
 "Bahrain": 2,
 "Bangladesh": 2,
 "Barbados": 2,
 "Belarus": 1,
 "Belgium": 1,
 "Belize": 2,
 "Benin": 2,
 "Bhutan": 2,
 "Bolivia": 2,
 "Bosnia and Herzegovina": 1,
 "Botswana": 2,
 "Brazil": 2,
 "Brunei": 2,
 "Bulgaria": 1,
 "Burkina Faso": 2,
 "Burundi": 2,
 "Cambodia": 2,
 "Cameroon": 2,
 "Canada": 1,
 "Cape Verde": 2,
 "Central African Republic": 2,
 "Chad": 2,
 "Chile": 2,
 "China": 1,
 "Colombia": 2,
 "Comoros": 2,
 "Costa Rica": 2,
 "Croatia": 1,
 "Cuba": 2,
 "Cyprus": 2,
 "Czech Republic": 1,
 "Democratic Republic of the Congo": 2,
 "Denmark": 1,
 "Djibouti": 2,
 "Dominican Republic": 2,
 "Ecuador": 2,
 "Egypt": 2,
 "El Salvador": 2,
 "Equatorial Guinea": 2,
 "Eritrea": 2,
 "Estonia": 1,
 "Eswatini": 2,
 "Ethiopia": 2,
 "Fiji": 2,
 "Finland": 1,
 "France": 1,
 "Gabon": 2,
 "Gambia": 2,
 "Georgia": 1,
 "Germany": 1,
 "Ghana": 2,
 "Greece": 1,
 "Grenada": 2,
 "Guatemala": 2,
 "Guinea": 2,
 "Guinea-Bissau": 2,
 "Guyana": 2,
 "Haiti": 2,
 "Honduras": 2,
 "Hungary": 1,
 "Iceland": 1,
 "India": 2,
 "Indonesia": 2,
 "Iran": 2,
 "Iraq": 2,
 "Ireland": 1,
 "Israel": 2,
 "Italy": 1,
 "Jamaica": 2,
 "Japan": 1,
 "Jordan": 2,
 "Kazakhstan": 1,
 "Kenya": 2,
 "Kiribati": 2,
 "Kuwait": 2,
 "Kyrgyzstan": 1,
 "Laos": 2,
 "Latvia": 1,
 "Lebanon": 2,
 "Lesotho": 2,
 "Liberia": 2,
 "Libya": 2,
 "Lithuania": 1,
 "Luxembourg": 1,
 "Madagascar": 2,
 "Malawi": 2,
 "Malaysia": 2,
 "Maldives": 2,
 "Mali": 2,
 "Malta": 1,
 "Marshall Islands": 2,
 "Mauritania": 2,
 "Mauritius": 2,
 "Mexico": 2,
 "Micronesia": 2,
 "Moldova": 1,
 "Monaco": 1,
 "Mongolia": 2,
 "Montenegro": 1,
 "Morocco": 2,
 "Mozambique": 2,
 "Myanmar": 2,
 "Namibia": 2,
 "Nepal": 2,
 "Netherlands": 1,
 "New Zealand": 2,
 "Nicaragua": 2,
 "Niger": 2,
 "Nigeria": 2,
 "North Macedonia": 1,
 "Norway": 1,
 "Oman": 2,
 "Pakistan": 2,
 "Palau": 2,
 "Panama": 2,
 "Papua New Guinea": 2,
 "Paraguay": 2,
 "Peru": 2,
 "Philippines": 2,
 "Poland": 1,
 "Portugal": 1,
 "Qatar": 2,
 "Republic of the Congo": 2,
 "Romania": 1,
 "Russia": 1,
 "Rwanda": 2,
 "Saint Kitts and Nevis": 2,
 "Saint Lucia": 2,
 "Saint Vincent and the Grenadines": 2,
 "Samoa": 2,
 "San Marino": 1,
 "Sao Tome and Principe": 2,
 "Saudi Arabia": 2,
 "Senegal": 2,
 "Serbia": 1,
 "Seychelles": 2,
 "Sierra Leone": 2,
 "Singapore": 2,
 "Slovakia": 1,
 "Slovenia": 1,
 "Solomon Islands": 2,
 "Somalia": 2,
 "South Africa": 2,
 "South Korea": 1,
 "Spain": 1,
 "Sri Lanka": 2,
 "Sudan": 2,
 "Suriname": 2,
 "Sweden": 1,
 "Switzerland": 1,
 "Syria": 2,
 "Taiwan": 1,
 "Tajikistan": 1,
 "Tanzania": 2,
 "Thailand": 2,
 "Timor-Leste": 2,
 "Togo": 2,
 "Tonga": 2,
 "Trinidad and Tobago": 2,
 "Tunisia": 2,
 "Turkey": 1,
 "Turkmenistan": 1,
 "Tuvalu": 2,
 "Uganda": 2,
 "Ukraine": 1,
 "United Arab Emirates": 2,
 "United Kingdom": 1,
 "United States": 1, 
 "Uruguay": 2,
 "Uzbekistan": 1,
 "Vanuatu": 2,
 "Vatican City": 1,
 "Venezuela": 2,
 "Vietnam": 2,
 "Yemen": 2,
 "Zambia": 2,
 "Zimbabwe": 2
};

// Calcuate Wardrobe Allowance based on zone shift
function getWardrobeAllowance(fromCountry, toZone = 1, hasEFMs = false) {
  const fromZone = WARDROBE_ZONE_TABLE[fromCountry] || 1;
  const zoneShift = Math.abs(fromZone - toZone);
  
  if (zoneShift === 0) return 0;
  if (zoneShift === 1) return hasEFMs ? 700 : 350;
  if (zoneShift >= 2) return hasEFMs ? 1400 : 700;
  return 0;
}

// === DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  
  // Dark Mode Toggle
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
    });
  }
  
  // Dynamic Field Toggles
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
  setupToggle('private-lodging', 'private-lodging-dates');

  // Form Submit Handling
  const form = document.getElementById('hsta-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    // Parse Form Data
    const formData = {
      departureDate: parseLocalDate('departure-date'),
      separationDate: parseLocalDate('separation-date'),
      hasFamily: document.getElementById('has-family').value === 'yes',
      numEFMs: parseInt(document.getElementById('num-efms')?.value || 0),
      numChildren: parseInt(document.getElementById('num-children')?.value || 0),
      fsGrade: document.getElementById('fs-grade').value,
      fsStep: parseInt(document.getElementById('fs-step').value),
      permHousing: document.getElementById('perm-housing').value === 'yes',
      moveInDate: document.getElementById('move-in-date').value ? parseLocalDate('move-in-date') : null,
      shippingCar: document.getElementById('shipping-car').value === 'yes',
      shippingPet: document.getElementById('shipping-pet').value === 'yes',
      departureCountry: document.getElementById('departure-country').value.trim(),
      techIssues: document.getElementById('tech-issues').value === 'yes',
      lithiumRemoval: document.getElementById('lithium-removal').value === 'yes',
      rentingCar: document.getElementById('renting-car').value === 'yes',
      techEstimate: parseFloat(document.getElementById('tech-estimate')?.value || 0),
      carRentalEstimate: parseFloat(document.getElementById('car-estimate')?.value || 0),
      batteryEstimate: parseFloat(document.getElementById('battery-estimate')?.value || 0),
      privateLodging: document.getElementById('private-lodging').value === 'yes',
      privateStartDate: document.getElementById('private-start-date').value ? parseLocalDate('private-start-date') : null,
      privateEndDate: document.getElementById('private-end-date').value ? parseLocalDate('private-end-date') : null,
    };

    // === Validation
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

    // ==== Calculations
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
    
    for (let i = 0; i < eligibleDays; i++) {
      const currentDate = new Date(formData.departureDate);
      currentDate.setDate(currentDate.getDate() + i);
    
      const isFirst30 = i < 30;
    
      const inPrivateLodging =
        formData.privateLodging &&
        formData.privateStartDate &&
        formData.privateEndDate &&
        currentDate >= formData.privateStartDate &&
        currentDate <= formData.privateEndDate;
    
      if (inPrivateLodging) {
        // Only M&IE portion allowed (no lodging)
        actualSubsistence += CONUS_RATE * (isFirst30 ? 0.75 : 0.75);
        actualSubsistence += CONUS_RATE * (isFirst30 ? 0.75 : 0.5) * adultEFMs;
        actualSubsistence += CONUS_RATE * (isFirst30 ? 0.5 : 0.4) * childEFMs;
      } else {
        // Full rate applies (lodging + M&IE)
        actualSubsistence += CONUS_RATE * (isFirst30 ? 1.0 : 0.75);
        actualSubsistence += CONUS_RATE * (isFirst30 ? 0.75 : 0.5) * adultEFMs;
        actualSubsistence += CONUS_RATE * (isFirst30 ? 0.5 : 0.4) * childEFMs;
      }
    }

    // Miscellaneous (Actual)
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
          <li><strong>Arrival Date to U.S.:</strong> ${formData.departureDate.toLocaleDateString()}</li>
          <li><strong>Separation Date:</strong> ${formData.separationDate.toLocaleDateString()}</li>
          <li><strong>Departure Country:</strong> ${formData.departureCountry}</li>
          <li><strong>Fixed HSTA Eligible Days:</strong> ${fixedDays} day(s)</li>
          <li><strong>Actual HSTA Eligible Days:</strong> ${eligibleDays} day(s)</li>
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

    // === Results: Fixed and Actual Breakdown + Citations
    document.getElementById('fixed-breakdown').innerHTML = `
      <p><strong>Subsistence (30 days max):</strong> ${fixedSubsistence.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })} <small>(DSSR 251.2(a))</small></p>
      <p><strong>Miscellaneous Expense:</strong> ${fixedMisc.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })} <small>(DSSR 252.1(a))</small></p>
      <p><strong>Wardrobe Allowance:</strong> ${fixedWardrobe.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })} <small>(DSSR 242.1)</small></p>
      <p><strong>Pet Shipment:</strong> ${fixedPet.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })} <small>(14 FAM 615.3)</small></p>
      <hr><p><strong>Total Fixed Estimate:</strong> ${fixedTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}</p>
    `;

    document.getElementById('actual-breakdown').innerHTML = `
      <p><strong>Subsistence (up to 60 days):</strong> ${actualSubsistence.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })} <small>(DSSR 251.2(a))</small></p>
      <p><strong>Miscellaneous Expense (Itemized):</strong> ${actualMisc.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })} <small>(DSSR 252.1(b))</small></p>
      <p><strong>Wardrobe Allowance:</strong> ${actualWardrobe.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })} <small>(DSSR 242.1)</small></p>
      <p><strong>Pet Shipment:</strong> ${actualPet.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })} <small>(14 FAM 615.3)</small></p>
      <hr><p><strong>Total Actual Estimate:</strong> ${actualTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}</p>
    `;

    // === Recommendation
    const fixedActualRecommendation = document.getElementById('fixed-actual-recommendation');
    fixedActualRecommendation.innerHTML = actualTotal > fixedTotal
      ? `<p>We recommend pursuing the <strong>Actual HSTA option</strong> based on your inputs (~${(actualTotal - fixedTotal).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })} more).</p>`
      : `<p>We recommend pursuing the <strong>Fixed HSTA option</strong> based on your inputs (higher or comparable benefit).</p>`;

    // === USAID vs State Clarifications
    const usaidMiscTotal = Math.min(finalMiscCap, extraClaims);
    const stateMiscTotal = 0; // State doesn't allow tech/car rental itemization

    document.getElementById('usaid-breakdown').innerHTML = `
      <p><strong>Miscellaneous (Itemized with Tech/Car/Battery):</strong> ${usaidMiscTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}</p>
    `;

    document.getElementById('state-breakdown').innerHTML = `
      <p><strong>Miscellaneous (Strict DSSR Interpretation):</strong> ${stateMiscTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}</p>
    `;

    // === Fixed HSTA Voucher Summary
    document.getElementById('fixed-summary').innerHTML = `
      <h4>Summary for HSTA Voucher (Fixed)</h4>
      <ul>
        <li>Subsistence: ${fixedDays} days × 75% M&IE rate of $168 = $${(168 * 0.75 * fixedDays).toLocaleString('en-US', {minimumFractionDigits: 0})} (DSSR 251.2(a))</li>
        <li>Miscellaneous Expense: Flat $${formData.hasFamily ? '1,500' : '750'} (DSSR 252.1(a))</li>
        <li>Wardrobe Allowance: ${fixedWardrobe.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })} (DSSR 242.1)</li>
        <li>Pet Shipment: ${fixedPet.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })} (14 FAM 615.3)</li>
        <li><strong>Total Fixed HSTA Estimate:</strong> ${fixedTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}</li>
      </ul>
    `;

    // === Updated Fixed HSTA Voucher Summary
    const employeeFixedSubsistence = 168 * 0.75 * fixedDays;
    const efmFixedSubsistence = 168 * 0.25 * formData.numEFMs * fixedDays;
    const totalFixedSubsistence = employeeFixedSubsistence + efmFixedSubsistence;
    
    document.getElementById('fixed-summary').innerHTML = `
      <h4>Summary for HSTA Voucher (Fixed)</h4>
      <ul>
        <li>Subsistence Allowance:</li>
        <ul>
          <li>Employee: ${fixedDays} days × 75% of $168 = ${employeeFixedSubsistence.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}</li>
          <li>EFMs (${formData.numEFMs}): ${fixedDays} days × 25% of $168 × ${formData.numEFMs} = ${efmFixedSubsistence.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}</li>
          <li><strong>Total Subsistence:</strong> ${totalFixedSubsistence.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })} (DSSR 251.2(a))</li>
        </ul>
        <li>Miscellaneous Expense: Flat $${formData.hasFamily ? '1,500' : '750'} — no receipts required, based on family status (DSSR 252.1(a))</li>
        <li>Wardrobe Allowance: ${fixedWardrobe.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })} (DSSR 242.1)</li>
        <li>Pet Shipment: ${fixedPet.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })} (14 FAM 615.3)</li>
        <li><strong>Total Fixed HSTA Estimate:</strong> ${fixedTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}</li>
      </ul>
    `;
    
    // === Notes Section for Fixed
    document.getElementById('fixed-notes').innerHTML = `
      <h4>Fixed HSTA Summary</h4>
      <ul>
        <li>Subsistence allowance based on 30 days maximum.</li>
        <li>75% of CONUS M&IE rate for employee, plus 25% for each eligible dependent.</li>
        <li>Miscellaneous expense allowance is fixed at $750 (single) or $1,500 (family).</li>
        <li>Wardrobe allowance applies if transferring across climate zones.</li>
        <li>Pet shipment allowance reimbursed up to $4,000.</li>
      </ul>
    `;
    
     // === Updated Actual HSTA Voucher Summary (Full Detail)
    const employeeFirst30Days = Math.min(30, eligibleDays);
    const employeeAfter30Days = Math.max(eligibleDays - 30, 0);
    
    const adultEFMs = formData.numEFMs - formData.numChildren;
    const childEFMs = formData.numChildren;
    
    // Employee Calculations
    const employeeSubsistenceFirst30 = 168 * 1.0 * employeeFirst30Days;
    const employeeSubsistenceAfter30 = 168 * 0.75 * employeeAfter30Days;
    
    // Adult EFM Calculations
    const adultEFMSubsistenceFirst30 = 168 * 0.75 * employeeFirst30Days * adultEFMs;
    const adultEFMSubsistenceAfter30 = 168 * 0.5 * employeeAfter30Days * adultEFMs;
    
    // Child EFM Calculations
    const childEFMSubsistenceFirst30 = 168 * 0.5 * employeeFirst30Days * childEFMs;
    const childEFMSubsistenceAfter30 = 168 * 0.4 * employeeAfter30Days * childEFMs;
    
    // Totals
    const totalActualSubsistence = employeeSubsistenceFirst30 + employeeSubsistenceAfter30 +
                                   adultEFMSubsistenceFirst30 + adultEFMSubsistenceAfter30 +
                                   childEFMSubsistenceFirst30 + childEFMSubsistenceAfter30;
    
    document.getElementById('actual-summary').innerHTML = `
      <h4>Summary for HSTA Voucher (Actual)</h4>
      <ul>
        <li>Subsistence Allowance:</li>
        <ul>
          <li>Employee:</li>
          <ul>
            <li>${employeeFirst30Days} days × 100% of $168 = ${employeeSubsistenceFirst30.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}</li>
            <li>${employeeAfter30Days} days × 75% of $168 = ${employeeSubsistenceAfter30.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}</li>
          </ul>
          <li>Adult EFMs (${adultEFMs}):</li>
          <ul>
            <li>${employeeFirst30Days} days × 75% of $168 × ${adultEFMs} = ${adultEFMSubsistenceFirst30.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}</li>
            <li>${employeeAfter30Days} days × 50% of $168 × ${adultEFMs} = ${adultEFMSubsistenceAfter30.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}</li>
          </ul>
          <li>Children Under 12 (${childEFMs}):</li>
          <ul>
            <li>${employeeFirst30Days} days × 50% of $168 × ${childEFMs} = ${childEFMSubsistenceFirst30.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}</li>
            <li>${employeeAfter30Days} days × 40% of $168 × ${childEFMs} = ${childEFMSubsistenceAfter30.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}</li>
          </ul>
          <li><strong>Total Subsistence:</strong> ${totalActualSubsistence.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })} (DSSR 251.2(a))</li>
        </ul>
        <li>Private Lodging Adjustment:</li>
        <ul>
          <li>Lodging not reimbursed from ${formData.privateStartDate ? formData.privateStartDate.toLocaleDateString() : ''} to ${formData.privateEndDate ? formData.privateEndDate.toLocaleDateString() : ''}.</li>
        </ul>
        <li>Miscellaneous Expense:</li>
          <ul>
            <li>Eligible up to one week of salary capped at GS-13 Step 10 weekly rate (~$2,106/week for 2025) (DSSR 252.1(b)).</li>
            <li>No receipts required for base miscellaneous allowance — employee attestation required unless claiming additional itemized expenses (tech replacement, car rental, lithium battery replacement).</li>
          </ul>
        <li>Wardrobe Allowance: ${actualWardrobe.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })} (DSSR 242.1)</li>
        <li>Pet Shipment: ${actualPet.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })} (14 FAM 615.3)</li>
        <li><strong>Total Actual HSTA Estimate:</strong> ${actualTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}</li>
      </ul>
    `;

    // === Show Results
    document.getElementById('results-section').style.display = 'block';
    document.getElementById('hsta-form').style.display = 'none';
  });

  // === Button Handlers
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

// === End of main.js ===
