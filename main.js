
// main.js

// === HSTA Constants (2025 Edition) ===

// GSA Per Diem Rates (Jan 2025)
const CONUS_PER_DIEM = 168; // GSA FY2025
const CONUS_MIE = {
  meals: 143,
  incidentals: 25
};

// Wardrobe Zones (DSSR 242.1 Example - Simplified)
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

// Wardrobe Allowance (based on zone shift)
function getWardrobeAllowance(fromZone, toZone = 1, hasEFMs = false) {
  const zoneShift = Math.abs(fromZone - toZone);
  if (zoneShift === 0) return 0;
  if (zoneShift === 1) return hasEFMs ? 700 : 350;
  if (zoneShift === 2) return hasEFMs ? 1400 : 700;
  return 0;
}

// FS Base Salaries (2025 Estimates - Annual, Step 6 where applicable)
const FS_SALARY_TABLE = {
  "FS-06": {1: 48225, 2: 49672, 3: 51162, 4: 52697, 5: 54278, 6: 55906, 7: 57583, 8: 59311, 9: 61090, 10: 62923, 11: 64810, 12: 66755, 13: 68757, 14: 70820},
  "FS-05": {1: 53945, 2: 55563, 3: 57230, 4: 58947, 5: 60716, 6: 62537, 7: 64413, 8: 66346, 9: 68336, 10: 70386, 11: 72498, 12: 74672, 13: 76913, 14: 79220},
  "FS-04": {1: 66574, 2: 68571, 3: 70628, 4: 72747, 5: 74930, 6: 77178, 7: 79493, 8: 81878, 9: 84334, 10: 86864, 11: 89470, 12: 92154, 13: 94919, 14: 97766},
  "FS-03": {1: 82160, 2: 84625, 3: 87164, 4: 89778, 5: 92472, 6: 95246, 7: 98103, 8: 101046, 9: 104078, 10: 107200, 11: 110416, 12: 113729, 13: 117141, 14: 120655},
  "FS-02": {1: 101395, 2: 104437, 3: 107570, 4: 110797, 5: 114121, 6: 117545, 7: 121071, 8: 124703, 9: 128444, 10: 132297, 11: 136266, 12: 140354, 13: 144565, 14: 148902},
  "FS-01": {1: 125133, 2: 128887, 3: 132754, 4: 136736, 5: 140838, 6: 145063, 7: 149415, 8: 153898, 9: 158515, 10: 162672, 11: 162672, 12: 162672, 13: 162672, 14: 162672}
};

// GS-13 Step 10 Hourly and Weekly
const GS13_STEP10_HOURLY = 52.66; // 2025 GS-13/10 hourly rate
const GS13_STEP10_WEEKLY = 2106.40; // 40 hours × 52.66

// Misc cap calculator
function calculateItemizedMiscCap(fsGrade, hasEFMs) {
  const fsAnnual = FS_BASE_PAY[fsGrade] || 0;
  const fsHourly = fsAnnual / 2087;
  const fsWeekly = fsHourly * 40;
  const weeks = hasEFMs ? 2 : 1;
  const fsCap = fsWeekly * weeks;
  const gsCap = GS13_STEP10_WEEKLY * weeks;
  return Math.min(fsCap, gsCap);
}

// Form

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');

  // Handle Modify, Reset, and Print Form Button
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
    window.location.reload(); // Full page reload to completely clear
  });
}

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

const errorDiv = document.getElementById('form-errors');
errorDiv.style.display = 'none'; // Always clear errors at form start

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
    errorDiv.innerHTML = `<ul>${errors.map(e => `<li>${e}</li>`).join('')}</ul>`;
    errorDiv.style.display = 'block';
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
        <li><strong>Car Rental Claimed:</strong> ${formData.rentingCar ? 'Yes' : 'No'}${formData.rentingCar && formData.carRentalEstimate ? ` (${formData.carRentalEstimate.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })})` : ''}</li>
      </ul>
    </div>
  </div>
`;

// Calculate eligible days (departure to separation date)
const MS_PER_DAY = 1000 * 60 * 60 * 24;
const daysBetween = Math.floor((formData.separationDate - formData.departureDate) / MS_PER_DAY);
const eligibleDays = Math.min(60, Math.max(0, daysBetween));

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

// Wardrobe Allowance
const wardrobeAllowance = formData.hasFamily ? 1400 : 700;

// Pet Shipment capped at $4,000
const petShipment = formData.shippingPet ? 4000 : 0;

// Salary-based Miscellaneous cap calculation
let salaryHourly = 0;
if (FS_SALARY_TABLE?.[formData.fsGrade]?.[formData.fsStep]) {
  salaryHourly = FS_SALARY_TABLE[formData.fsGrade][formData.fsStep] / 2087;
}
const weeklySalaryCap = salaryHourly * (formData.hasFamily ? 80 : 40);
const gs13WeeklyCap = GS13_STEP10_HOURLY * (formData.hasFamily ? 80 : 40);
const finalCap = Math.min(weeklySalaryCap, gs13WeeklyCap);

// USAID vs State Miscellaneous difference
const extraClaims = (formData.techEstimate || 0) + (formData.batteryEstimate || 0) + (formData.carRentalEstimate || 0);

// USAID: includes tech, car rental, battery
const usaidMiscTotal = Math.min(finalCap, extraClaims);

// State: does NOT include extras
const stateMiscTotal = 0; // State version strictly sticks to cap without user extras

// FINAL TOTALS
const usaidTotal = actualSubsistence + usaidMiscTotal + wardrobeAllowance + petShipment;
const stateTotal = actualSubsistence + stateMiscTotal + wardrobeAllowance + petShipment;

// Output Results
document.getElementById('usaid-breakdown').innerHTML = `
  <p><strong>Subsistence Allowance:</strong> ${actualSubsistence.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}</p>
  <p><strong>Miscellaneous (Itemized with Tech/Car/Battery):</strong> ${usaidMiscTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}</p>
  <p><strong>Wardrobe Allowance:</strong> ${wardrobeAllowance.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}</p>
  <p><strong>Pet Shipment:</strong> ${petShipment.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}</p>
  <hr>
  <p><strong>Total USAID Estimate:</strong> ${usaidTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}</p>
`;

document.getElementById('state-breakdown').innerHTML = `
  <p><strong>Subsistence Allowance:</strong> ${actualSubsistence.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}</p>
  <p><strong>Miscellaneous (Strict DSSR - No Extras):</strong> ${stateMiscTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}</p>
  <p><strong>Wardrobe Allowance:</strong> ${wardrobeAllowance.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}</p>
  <p><strong>Pet Shipment:</strong> ${petShipment.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}</p>
  <hr>
  <p><strong>Total State Estimate:</strong> ${stateTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}</p>
`;

document.getElementById('recommendation').innerHTML = `
  ${usaidTotal > stateTotal
    ? "Under USAID RIF guidance, including technology and rental car expenses could result in a higher allowance."
    : "State Department calculations may offer a simpler but lower allowance without optional claims."
  }
`;

// Hide form and show results
document.getElementById('hsta-form').style.display = 'none';
document.getElementById('results-section').style.display = 'block';
  });
});
