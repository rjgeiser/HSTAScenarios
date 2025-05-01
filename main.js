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

// FY2025 GSA Standard CONUS Rates
const PER_DIEM_TOTAL = 178;   // Total daily per diem ($110 lodging + $68 M&IE)
const PER_DIEM_LODGING = 110; // Lodging component
const PER_DIEM_MIE = 68;      // Meals and Incidental Expenses component

// GS-13 Step 10 Weekly Cap for Miscellaneous Expenses (Approximate for 2025)
const GS13_STEP10_WEEKLY = 2243.20;

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
      hheDeliveryDate: document.getElementById('hhe-delivery-date')?.value ? new Date(document.getElementById('hhe-delivery-date').value) : null,
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

    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    const separationDate = formData.separationDate;
    const departureDate = formData.departureDate;
    const moveInDate = formData.moveInDate || new Date('9999-12-31');
    const hheDeliveryDate = formData.hheDeliveryDate || new Date('9999-12-31');
    
    // Lodging days end at the earlier of separation, move-in, or 60 days
    const lodgingCutoff = new Date(Math.min(
      separationDate.getTime(),
      moveInDate?.getTime() || new Date('9999-12-31').getTime(),
      departureDate.getTime() + 60 * 24 * 60 * 60 * 1000
    ));
    
    // M&IE days end at the earlier of separation, HHE delivery, or 60 days
    const mieCutoff = new Date(Math.min(
      separationDate.getTime(),
      hheDeliveryDate?.getTime() || new Date('9999-12-31').getTime(),
      departureDate.getTime() + 60 * 24 * 60 * 60 * 1000
    ));

    // Precalculate eligible days
    const lodgingDays = Math.max(0, Math.floor((lodgingCutoff - departureDate) / MS_PER_DAY));
    const mieDays = Math.max(0, Math.floor((mieCutoff - departureDate) / MS_PER_DAY));
    
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

    // === Private Lodging Validation
    if (formData.privateLodging) {
      if (!formData.privateStartDate || !formData.privateEndDate) {
        errors.push("Please enter both a Private Lodging Start Date and End Date.");
      } else {
        if (formData.privateStartDate < formData.departureDate) {
          errors.push("Private Lodging Start Date cannot be before Arrival Date.");
        }
        if (formData.privateEndDate < formData.privateStartDate) {
          errors.push("Private Lodging End Date cannot be before Private Lodging Start Date.");
        }
      }
    }

    // === Car Rental Validation
    if (formData.rentingCar && !formData.shippingCar) {
      errors.push("Car rental allowance is only reimbursable if a POV is being shipped through the U.S. Government.");
    }

    // ==== Calculations
    const CONUS_RATE = 168;
    const daysBetween = Math.floor((formData.separationDate - formData.departureDate) / MS_PER_DAY);
    const eligibleDays = Math.min(60, Math.max(0, daysBetween));

    // Fixed HSTA Subsistence Calculation
    const fixedDays = Math.min(30, eligibleDays); // Cap at 30 days
    const employeeFixedSubsistence = PER_DIEM_TOTAL * 0.75 * fixedDays;
    const efmFixedSubsistence = PER_DIEM_TOTAL * 0.25 * formData.numEFMs * fixedDays;
    const fixedSubsistence = employeeFixedSubsistence + efmFixedSubsistence;
    
    // Other HSTA Calculations
    const fixedMisc = formData.hasFamily ? 1500 : 750;
    const fixedWardrobe = getWardrobeAllowance(formData.departureCountry, 1, formData.hasFamily);
    const fixedPet = formData.shippingPet ? 4000 : 0;
    const fixedTotal = fixedSubsistence + fixedMisc + fixedWardrobe + fixedPet;

    // === Updated Actual Subsistence Calculation
    let actualSubsistence = 0;
    const adultEFMs = formData.numEFMs - formData.numChildren;
    const childEFMs = formData.numChildren;
    
    // Day counters for M&IE
    let empDaysFirst30 = 0, empDaysAfter30 = 0;
    let adultDaysFirst30 = 0, adultDaysAfter30 = 0;
    let childDaysFirst30 = 0, childDaysAfter30 = 0;
    
    // Day counters for Lodging
    let empLodgingFirst30 = 0, empLodgingAfter30 = 0;
    let adultLodgingFirst30 = 0, adultLodgingAfter30 = 0;
    let childLodgingFirst30 = 0, childLodgingAfter30 = 0;
    
    // Loop through each day
    for (let i = 0; i < Math.max(lodgingDays, mieDays); i++) {
      const currentDate = new Date(departureDate);
      currentDate.setDate(currentDate.getDate() + i);
      const isFirst30 = i < 30;
    
      const inPrivateLodging =
        formData.privateLodging &&
        formData.privateStartDate &&
        formData.privateEndDate &&
        currentDate >= formData.privateStartDate &&
        currentDate <= formData.privateEndDate;
    
      const lodgingEligible = i < lodgingDays;
      const mieEligible = i < mieDays;
    
      const eligible = mieEligible || lodgingEligible;
      if (!eligible || (mieEligible === false && lodgingEligible === false)) continue;
    
      // M&IE Tally
      if (mieEligible) {
        if (isFirst30) {
          empDaysFirst30++;
          adultDaysFirst30 += adultEFMs;
          childDaysFirst30 += childEFMs;
        } else {
          empDaysAfter30++;
          adultDaysAfter30 += adultEFMs;
          childDaysAfter30 += childEFMs;
        }
      }
    
      // Lodging Tally
      if (lodgingEligible && !inPrivateLodging) {
        if (isFirst30) {
          empLodgingFirst30++;
          adultLodgingFirst30 += adultEFMs;
          childLodgingFirst30 += childEFMs;
        } else {
          empLodgingAfter30++;
          adultLodgingAfter30 += adultEFMs;
          childLodgingAfter30 += childEFMs;
        }
      }
    }
    
    // === Compute Totals Using Sliding Rates
    const empMIE1 = empDaysFirst30 * PER_DIEM_MIE * 1.0;
    const empMIE2 = empDaysAfter30 * PER_DIEM_MIE * 0.75;
    const adultMIE1 = adultDaysFirst30 * PER_DIEM_MIE * 0.75;
    const adultMIE2 = adultDaysAfter30 * PER_DIEM_MIE * 0.5;
    const childMIE1 = childDaysFirst30 * PER_DIEM_MIE * 0.5;
    const childMIE2 = childDaysAfter30 * PER_DIEM_MIE * 0.4;
    
    const empLodging1 = empLodgingFirst30 * PER_DIEM_LODGING * 1.0;
    const empLodging2 = empLodgingAfter30 * PER_DIEM_LODGING * 0.75;
    const adultLodging1 = adultLodgingFirst30 * PER_DIEM_LODGING * 0.75;
    const adultLodging2 = adultLodgingAfter30 * PER_DIEM_LODGING * 0.5;
    const childLodging1 = childLodgingFirst30 * PER_DIEM_LODGING * 0.5;
    const childLodging2 = childLodgingAfter30 * PER_DIEM_LODGING * 0.4;
    
    const lodgingTotal =
      empLodging1 + empLodging2 +
      adultLodging1 + adultLodging2 +
      childLodging1 + childLodging2;
    
    const totalActualSubsistence =
      empMIE1 + empMIE2 +
      adultMIE1 + adultMIE2 +
      childMIE1 + childMIE2 +
      lodgingTotal;
    
    // Defining Lodging Reimbursable Days
    let lodgingReimbursableDays = 0;

    for (let i = 0; i < lodgingDays; i++) {
      const currentDate = new Date(departureDate);
      currentDate.setDate(currentDate.getDate() + i);
    
      const inPrivateLodging =
        formData.privateLodging &&
        formData.privateStartDate &&
        formData.privateEndDate &&
        currentDate >= formData.privateStartDate &&
        currentDate <= formData.privateEndDate;
    
      if (!inPrivateLodging) {
        lodgingReimbursableDays++;
      }
    }

    //Car Rental Maximum
    const rawCarRental = (formData.rentingCar && formData.shippingCar) ? (formData.carRentalEstimate || 0) : 0; 
    const maxCarRentalCap = eligibleDays * PER_DIEM_LODGING;
    const carRental = Math.min(rawCarRental, maxCarRentalCap);
    
    // Miscellaneous (Actual)
    const salaryHourly = FS_SALARY_TABLE?.[formData.fsGrade]?.[formData.fsStep] 
      ? FS_SALARY_TABLE[formData.fsGrade][formData.fsStep] / 2087
      : 0;
    const weeklySalaryCap = salaryHourly * (formData.hasFamily ? 80 : 40);
    const finalMiscCap = Math.min(weeklySalaryCap, formData.hasFamily ? 4486.40 : 2243.20)
    const extraClaims = (formData.techEstimate || 0) + (formData.batteryEstimate || 0) + (formData.carRentalEstimate || 0);
    const actualMisc = Math.min(finalMiscCap, extraClaims);

    const actualWardrobe = getWardrobeAllowance(formData.departureCountry, 1, formData.hasFamily);
    const actualPet = formData.shippingPet ? 4000 : 0;
    const actualTotal = totalActualSubsistence + actualMisc + actualWardrobe + actualPet;
    
    // Totals with Fixed and Itemized Miscellaneous
    const totalWithFixedMisc = totalActualSubsistence + actualWardrobe + actualPet + fixedMisc;
    const totalWithActualMisc = actualTotal; // actualMisc already included in actualTotal
    
    // === Scenario Summary
    const scenarioSummary = document.getElementById('scenario-summary');
    scenarioSummary.innerHTML = `
      <div class="summary-grid">
        <div><h4>Travel Information</h4><ul>
          <li><strong>Arrival Date to U.S.:</strong> ${formData.departureDate.toLocaleDateString()}</li>
          <li><strong>Separation Date:</strong> ${formData.separationDate.toLocaleDateString()}</li>
          <li><strong>Departure Country:</strong> ${formData.departureCountry}</li>
          <li><strong>HSTA Eligible Days:</strong> ${eligibleDays} day(s)</li>
            <ul>
              <li><strong>Eligbile Lodging Days:</strong> ${lodgingReimbursableDays} day(s)</li>
              <li><strong>Eligible M&IE Days:</strong> ${mieDays} day(s)</li>
            </ul>
        </ul></div>
        <div><h4>Family Information</h4><ul>
          <li><strong>Number of EFMs:</strong> ${formData.numEFMs} (${formData.numChildren} under 12)</li>
          <li><strong>FS Grade/Step:</strong> ${formData.fsGrade} Step ${formData.fsStep}</li>
        </ul></div>
        <div><h4>Allowance Information</h4><ul>
          <li><strong>Permanent Housing Planned:</strong> ${formData.permHousing ? 'Yes' : 'No'}</li>
          <li><strong>Shipping POV:</strong> ${formData.shippingCar ? 'Yes' : 'No'}</li>
          <li><strong>Shipping Pet:</strong> ${formData.shippingPet ? 'Yes' : 'No'}</li>
          <li><strong>Tech Device(s) Claimed:</strong> ${formData.techIssues ? 'Yes' : 'No'}</li>
          <li><strong>Lithium Battery Claimed:</strong> ${formData.lithiumRemoval ? 'Yes' : 'No'}</li>
          <li><strong>Car Rental Claimed:</strong> ${formData.rentingCar ? 'Yes' : 'No'}</li>
        </ul></div>
      </div>
    `;

     // === Shared Allowances: Lodging + M&IE + Wardrobe + Pet
    document.getElementById('actual-breakdown').innerHTML = `
      <p><strong>Subsistence (up to Separation Date or 60 days, whichever is earlier):</strong> ${Math.round(totalActualSubsistence).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })} <small>(DSSR 251.2(b))</small></p>
      <p><strong>Wardrobe Allowance:</strong> ${Math.round(actualWardrobe).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })} <small>(DSSR 242.1)</small></p>
      <p><strong>Pet Shipment:</strong> ${Math.round(actualPet).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })} <small>(14 FAM 615.3)</small></p>
    `;
    
    // === Recommendation Based on Miscellaneous
    const recommendationDiv = document.getElementById('fixed-actual-recommendation');
    recommendationDiv.innerHTML = totalWithActualMisc > totalWithFixedMisc
      ? `<p>We recommend selecting the <strong>Itemized Miscellaneous option</strong> (~${Math.round(totalWithActualMisc - totalWithFixedMisc).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })} more).</p>`
      : `<p>We recommend selecting the <strong>Fixed Miscellaneous option</strong> for simplicity and a comparable benefit (~${Math.round(totalWithFixedMisc - totalWithActualMisc).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })} more).</p>`
    
     // === Updated Actual HSTA Voucher Summary (Full Detail)
    const employeeFirst30Days = Math.min(30, eligibleDays);
    const employeeAfter30Days = Math.max(eligibleDays - 30, 0);
    
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
    const fullTotalActualSubsistence = employeeSubsistenceFirst30 + employeeSubsistenceAfter30 +
                                   adultEFMSubsistenceFirst30 + adultEFMSubsistenceAfter30 +
                                   childEFMSubsistenceFirst30 + childEFMSubsistenceAfter30;
    
    // === Fully DSSR-Compliant Misc Fixed Breakdown
    document.getElementById('misc-fixed-breakdown').innerHTML = `
      <h4>Summary for Fixed Misc HSTA Voucher</h4>
      <ul>
        <li><strong>Total Reimbursable Subsistence:</strong> ${Math.round(totalActualSubsistence).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0  })} (DSSR 251.2(b))</li>
        <ul>
          <li><strong>Subsistence Breakdown:</strong></li>
            <ul>
            <li><strong>Lodging:</strong> ${Math.round(lodgingTotal).toLocaleString('en-US', { style: 'currency', currency: 'USD',  minimumFractionDigits: 0, maximumFractionDigits: 0 })}</li>
            
            <ul>
              <li><strong>Employee:</strong></li>
                <ul>
                  <li>Employee: ${empLodgingFirst30} days × $${PER_DIEM_LODGING} × 100% = ${Math.round(empLodging1).toLocaleString('en-US', { style: 'currency', currency: 'USD',minimumFractionDigits: 0, maximumFractionDigits: 0 })}</li>
                  <li>Employee: ${empLodgingAfter30} days × $${PER_DIEM_LODGING} × 75% = ${Math.round(empLodging2).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</li>
                </ul>
  
              <li><strong>Adult EFM(s) (${adultEFMs}):</strong></li>
                <ul>
                  <li>Adult EFMs: ${adultLodgingFirst30} days × $${PER_DIEM_LODGING} × 75% x ${adultEFMs} = ${Math.round(adultLodging1).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</li>
                  <li>Adult EFMs: ${adultLodgingAfter30} days × $${PER_DIEM_LODGING} × 50% x ${adultEFMs} = ${Math.round(adultLodging2).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</li>
                </ul>
  
              <li><strong>Children (${childEFMs}):</strong></li>
                <ul>
                  <li>Children: ${childLodgingFirst30} days × $${PER_DIEM_LODGING} × 50% x ${childEFMs} = ${Math.round(childLodging1).toLocaleString('en-US', { style: 'currency', currency: 'USD',minimumFractionDigits: 0, maximumFractionDigits: 0 })}</li>
                  <li>Children: ${childLodgingAfter30} days × $${PER_DIEM_LODGING} × 40% x ${childEFMs} = ${Math.round(childLodging2).toLocaleString('en-US', { style: 'currency', currency: 'USD',minimumFractionDigits: 0, maximumFractionDigits: 0 })}</li>
                </ul>
              </ul>
            
            <li><strong>M&IE:</strong> ${Math.round(totalActualSubsistence-lodgingTotal).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</li>
  
              <ul>
              <li><strong>Employee:</strong></li>
                <ul>
                  <li>${empDaysFirst30} days × $${PER_DIEM_MIE} × 100% = ${Math.round(empMIE1).toLocaleString('en-US', { style: 'currency', currency: 'USD',minimumFractionDigits: 0, maximumFractionDigits: 0 })}</li>
                  <li>${empDaysAfter30} days × $${PER_DIEM_MIE} × 75% = ${Math.round(empMIE2).toLocaleString('en-US', { style: 'currency', currency: 'USD',minimumFractionDigits: 0, maximumFractionDigits: 0 })}</li>
                </ul>
        
              <li><strong>Adult EFM(s) (${adultEFMs}):</strong></li>
                <ul>
                  <li>${adultDaysFirst30} days × $${PER_DIEM_MIE} × 75% x ${adultEFMs} = ${Math.round(adultMIE1).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</li>
                  <li>${adultDaysAfter30} days × $${PER_DIEM_MIE} × 50% x ${adultEFMs} = ${Math.round(adultMIE2).toLocaleString('en-US', { style: 'currency', currency: 'USD',minimumFractionDigits: 0, maximumFractionDigits: 0 })}</li>
                </ul>
        
              <li><strong>M&IE — Children Under 12 (${childEFMs}):</strong></li>
                <ul>
                  <li>${childDaysFirst30} days × $${PER_DIEM_MIE} × 50% x ${childEFMs} = ${Math.round(childMIE1).toLocaleString('en-US', { style: 'currency', currency: 'USD',minimumFractionDigits: 0, maximumFractionDigits: 0 })}</li>
                  <li>${childDaysAfter30} days × $${PER_DIEM_MIE} × 40% x ${childEFMs} = ${Math.round(childMIE2).toLocaleString('en-US', { style: 'currency', currency: 'USD',minimumFractionDigits: 0, maximumFractionDigits: 0 })}</li>
                </ul>
            </ul>
          </ul>
    
        <li><strong>Wardrobe Allowance:</strong> ${Math.round(actualWardrobe).toLocaleString('en-US', { style: 'currency', currency: 'USD',minimumFractionDigits: 0, maximumFractionDigits: 0 })} (DSSR 242.1)</li>
        <li><strong>Pet Shipment:</strong> ${Math.round(actualPet).toLocaleString('en-US', { style: 'currency', currency: 'USD',minimumFractionDigits: 0, maximumFractionDigits: 0 })} (14 FAM 615.3)</li>
        <li><strong>Miscellaneous (Fixed):</strong> ${fixedMisc.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })} (DSSR 252.1(a))</li>
      </ul>
      <li><strong>Total with Fixed Misc HSTA Estimate:</strong> ${Math.round(totalWithFixedMisc).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</li>
    </ul>
    `;

    // === Updated Notes Section for Fixed
    document.getElementById('misc-fixed-summary').innerHTML = `
      <h4>Fixed Misc HSTA Notes</h4>
      <ul>
        <li>Subsistence reimbursable up to 60 days based on actual lodging and meals incurred after arrival in the U.S. (DSSR 253.2(a)).</li>
        <li>Lodging reimbursement under HSTA is calculated similar to M&IE (see below). Lodging receipts must be submitted. Lodging taxes reimbursed separately.</li>
        <li>During periods of Private Lodging (family/friends), no lodging reimbursement is authorized. M&IE remains reimbursable.</li>
        <li>Meals and Incidental Expenses (M&IE) are calculated separately for the employee and each eligible family member, using DSSR percentage rates based on age and time frame (first 30 days vs 31–60 days). No receipts are needed.</li>
          <ul>
          <li>Employee reimbursed 100% of $68/day for first 30 days, 75% thereafter; only $68/day (M&IE) reimbursed during private lodging periods.</li>
          <li>Adult EFMs reimbursed 75%/50% of applicable daily rate; children under 12 reimbursed 50%/40% of applicable daily rate.</li>
          </ul>        
        <li>Wardrobe allowance applies if transferring across climate zones (DSSR 242.1).</li>
        <li>Pet shipment allowance reimbursed up to $4,000 per employee, not pet (14 FAM 615.3).</li>
        <li>Miscellaneous expenses
      </ul>
    `;

    // === Fully DSSR-Compliant Misc Itemized Breakdown
    document.getElementById('misc-itemized-breakdown').innerHTML = `
      <h4>Summary for Itemized Misc HSTA Voucher</h4>
      <ul>
        <li><strong>Total Reimbursable Subsistence:</strong> ${Math.round(totalActualSubsistence).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0  })} (DSSR 251.2(b))</li>
        <ul>
          <li><strong>Subsistence Breakdown:</strong></li>
            <ul>
            <li><strong>Lodging:</strong> ${Math.round(lodgingTotal).toLocaleString('en-US', { style: 'currency', currency: 'USD',  minimumFractionDigits: 0, maximumFractionDigits: 0 })}</li>
            
            <ul>
              <li><strong>Employee:</strong></li>
                <ul>
                  <li>Employee: ${empLodgingFirst30} days × $${PER_DIEM_LODGING} × 100% = ${Math.round(empLodging1).toLocaleString('en-US', { style: 'currency', currency: 'USD',minimumFractionDigits: 0, maximumFractionDigits: 0 })}</li>
                  <li>Employee: ${empLodgingAfter30} days × $${PER_DIEM_LODGING} × 75% = ${Math.round(empLodging2).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</li>
                </ul>
  
              <li><strong>Adult EFM(s) (${adultEFMs}):</strong></li>
                <ul>
                  <li>Adult EFMs: ${adultLodgingFirst30} days × $${PER_DIEM_LODGING} × 75% x ${adultEFMs} = ${Math.round(adultLodging1).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</li>
                  <li>Adult EFMs: ${adultLodgingAfter30} days × $${PER_DIEM_LODGING} × 50% x ${adultEFMs} = ${Math.round(adultLodging2).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</li>
                </ul>
  
              <li><strong>Children (${childEFMs}:</strong></li>
                <ul>
                  <li>Children: ${childLodgingFirst30} days × $${PER_DIEM_LODGING} × 50% x ${childEFMs} = ${Math.round(childLodging1).toLocaleString('en-US', { style: 'currency', currency: 'USD',minimumFractionDigits: 0, maximumFractionDigits: 0 })}</li>
                <li>Children: ${childLodgingAfter30} days × $${PER_DIEM_LODGING} × 40% x ${childEFMs} = ${Math.round(childLodging2).toLocaleString('en-US', { style: 'currency', currency: 'USD',minimumFractionDigits: 0, maximumFractionDigits: 0 })}</li>
                </ul>
              </ul>
            
            <li><strong>M&IE:</strong> ${Math.round(totalActualSubsistence-lodgingTotal).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</li>
  
              <ul>
              <li><strong>Employee:</strong></li>
                <ul>
                  <li>${empDaysFirst30} days × $${PER_DIEM_MIE} × 100% = ${Math.round(empMIE1).toLocaleString('en-US', { style: 'currency', currency: 'USD',minimumFractionDigits: 0, maximumFractionDigits: 0 })}</li>
                  <li>${empDaysAfter30} days × $${PER_DIEM_MIE} × 75% = ${Math.round(empMIE2).toLocaleString('en-US', { style: 'currency', currency: 'USD',minimumFractionDigits: 0, maximumFractionDigits: 0 })}</li>
                </ul>
        
              <li><strong>Adult EFM(s) (${adultEFMs}):</strong></li>
                <ul>
                  <li>${adultDaysFirst30} days × $${PER_DIEM_MIE} × 75% x ${adultEFMs} = ${Math.round(adultMIE1).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</li>
                  <li>${adultDaysAfter30} days × $${PER_DIEM_MIE} × 50% x ${adultEFMs} = ${Math.round(adultMIE2).toLocaleString('en-US', { style: 'currency', currency: 'USD',minimumFractionDigits: 0, maximumFractionDigits: 0 })}</li>
                </ul>
        
              <li><strong>M&IE — Children Under 12 (${childEFMs}):</strong></li>
                <ul>
                  <li>${childDaysFirst30} days × $${PER_DIEM_MIE} × 50% x ${childEFMs} = ${Math.round(childMIE1).toLocaleString('en-US', { style: 'currency', currency: 'USD',minimumFractionDigits: 0, maximumFractionDigits: 0 })}</li>
                  <li>${childDaysAfter30} days × $${PER_DIEM_MIE} × 40% x ${childEFMs} = ${Math.round(childMIE2).toLocaleString('en-US', { style: 'currency', currency: 'USD',minimumFractionDigits: 0, maximumFractionDigits: 0 })}</li>
                </ul>
            </ul>
          </ul>
    
        <li><strong>Wardrobe Allowance:</strong> ${Math.round(actualWardrobe).toLocaleString('en-US', { style: 'currency', currency: 'USD',minimumFractionDigits: 0, maximumFractionDigits: 0 })} (DSSR 242.1)</li>
        <li><strong>Pet Shipment:</strong> ${Math.round(actualPet).toLocaleString('en-US', { style: 'currency', currency: 'USD',minimumFractionDigits: 0, maximumFractionDigits: 0 })} (14 FAM 615.3)</li>
        <li><strong>Miscellaneous (Itemized):</strong> ${Math.round(actualMisc).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })} (DSSR 252.1(b))</li>
      </ul>
      <li><strong>Total with Itemized Misc HSTA Estimate:</strong> ${Math.round(totalWithActualMisc).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</li>
      <ul>
        <li>Tech Device(s):  </li>
        <li>Lithium-Ion Batteries:  </li>
        <li>Car Rental:  </li>
    </ul>
    `;
    
    // === Updated Notes Section for Itemized
    document.getElementById('misc-itemized-summary').innerHTML = `
      <h4>Itemized Misc HSTA Notes</h4>
      <ul>
        <li>Subsistence reimbursable up to 60 days based on actual lodging and meals incurred after arrival in the U.S. (DSSR 253.2(a)).</li>
        <li>Lodging reimbursement under HSTA is calculated similar to M&IE (see below). Lodging receipts must be submitted. Lodging taxes reimbursed separately.</li>
        <li>During periods of Private Lodging (family/friends), no lodging reimbursement is authorized. M&IE remains reimbursable.</li>
        <li>Meals and Incidental Expenses (M&IE) are calculated separately for the employee and each eligible family member, using DSSR percentage rates based on age and time frame (first 30 days vs 31–60 days). No receipts are needed.</li>
          <ul>
          <li>Employee reimbursed 100% of $68/day for first 30 days, 75% thereafter; only $68/day (M&IE) reimbursed during private lodging periods.</li>
          <li>Adult EFMs reimbursed 75%/50% of applicable daily rate; children under 12 reimbursed 50%/40% of applicable daily rate.</li>
          </ul>        
        <li>Wardrobe allowance applies if transferring across climate zones (DSSR 242.1).</li>
        <li>Pet shipment allowance reimbursed up to $4,000 per employee, not pet (14 FAM 615.3).</li>
        <li>Miscellaneous expenses:
          <ul>
            <li>Capped for an employee without family - lesser of one week of employee's salary or one week's salary for an employee at GS-13, step 10 ($2,243.20); or</li>
            <li>Capped for an employee with family - lesser of  two weeks' salary for the employee or two weeks' salary for an employee at GS-13, step 10 ($4,486.40).</li>
            <li>Tech device(s) purchase and lithium reimbursements require self-certification and receipts dated no more than 30 days before departure or 30 days after arrival (or separation date, whichever is sooner). (DSSR 252.1(b))</li>
            <li>Car rental reimbursement (with receipt) is only allowable when the employee is shipping a POV. The rental must be for use during the HSTA period.</li>
          </ul>
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

// === Reset Form Button Handler (Full Page Reload)
const resetButton = document.getElementById('reset-form');
if (resetButton) {
  resetButton.addEventListener('click', () => {
    window.scrollTo(0, 0); // Optional: scroll user back to top
    window.location.reload(); // Reloads the page, clears all form fields, resets layout
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
