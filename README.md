# HSTA Scenario Builder

This is an unofficial, browser-based tool to help departing Foreign Service Officers (FSOs) estimate their **Home Service Transfer Allowance (HSTA)** under both the **Fixed Rate** and **Actual Expense** pathways. Based on user inputs and official policy references (DSSR, FAM, and GSA), it recommends the more advantageous option and provides a printable breakdown useful for voucher preparation.

Live tool: [https://rjgeiser.github.io/HSTAScenarios](https://rjgeiser.github.io/HSTAScenarios)

---

## Features

- **Side-by-side comparison** of Fixed and Actual HSTA estimates
- Uses 2025 GSA per diem rates, FS salary caps, and DSSR guidelines
- Dynamically calculates:
  - Subsistence allowance (fixed or actual)
  - Miscellaneous expenses (standard or itemized cap)
  - Pet shipment, car rental, tech, and battery reimbursement estimates
  - Wardrobe allowance based on zone transfer
- **User-driven inputs**: departure/separation dates, FS grade/step, number of EFMs, and more
- Optional inputs for itemized reimbursement categories
- **Print/export ready summary** for voucher support
- **Responsive layout** for desktop, tablet, and mobile use
- **Dark mode toggle**
- **Open source** (MIT License)

---

## How It Works

1. Answer a short series of questions about your separation travel, family, and allowances.
2. The tool uses your data to estimate values under:
   - **Fixed HSTA**: 30-day flat allowance (no receipts required)
   - **Actual HSTA**: Up to 60 days of tiered subsistence, with optional reimbursements
3. You'll receive:
   - A total estimated amount for each option
   - A recommendation based on maximum value
   - A printable summary with references to DSSR and FAM sections

---

## Sample Use Case

A departing FSO with two EFMs, a pet, and plans to itemize tech and car rental costs can use this tool to estimate whether the **Actual Expenses** path will outweigh the Fixed Rate allowance—even before beginning a voucher in E2.

---

## Policy References

- **DSSR 250–252**: HSTA eligibility, allowance breakdowns, and subsistence rates
- **DSSR 242.1**: Wardrobe zone allowances
- **14 FAM 615.3**: Pet shipment reimbursement guidance
- **GSA Per Diem Rates**: [https://www.gsa.gov/travel/plan-book/per-diem-rates](https://www.gsa.gov/travel/plan-book/per-diem-rates)

---

## Limitations

- This tool is **unofficial** and for planning purposes only.
- Final reimbursement is subject to your official travel orders, receipts, policy limits, and EXO approval.
- The HSTA window is capped at **60 days or the separation date**, whichever comes first.

---

## Development Notes

- Based on 2025 FS base salary estimates and the GSA CONUS per diem rate ($168).
- Built using HTML, CSS, and JavaScript with no backend dependencies.
- Includes optional PWA-ready architecture for offline use in future versions.

---

## Contributing

Suggestions and improvements are welcome. Please open an issue or submit a pull request.

---

## License

MIT License © 2025 Roy Geiser

This project is not affiliated with or endorsed by the U.S. Government, USAID, the Department of State, or any federal agency.
