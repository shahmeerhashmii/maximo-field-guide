---
title: 'Riverbend Water Authority (fictional): the one organization used in every example'
description: The fictional utility used in every example throughout this guide.
template: doc
---

A mid-sized municipal water utility. Keep these names consistent across the whole site so readers follow one asset through every concept.

Riverbend Water Authority (RWA) is the fictional utility used in every example throughout this guide. Every asset, work order, location and person you see in these pages belongs to RWA. Using one consistent organization means you can follow the same records through every concept, from Foundations to Work Management to Inventory.

## Asset Hierarchy

<div class="rb-tree">
  <div class="rb-node rb-org">
    <span class="rb-label">Organization</span>
    <span class="rb-id">RWA</span>
    <div class="rb-children">
      <div class="rb-node rb-site">
        <span class="rb-label">Site</span>
        <span class="rb-id">TP1</span>
        <div class="rb-children">
          <div class="rb-node rb-loc">
            <span class="rb-label">Location</span>
            <span class="rb-id">TP1-INTAKE</span>
            <div class="rb-children">
              <div class="rb-node rb-loc">
                <span class="rb-label">Location</span>
                <span class="rb-id">TP1-INTAKE-PS</span>
                <div class="rb-children">
                  <div class="rb-node rb-asset">
                    <span class="rb-label">Asset</span>
                    <span class="rb-id">P-101</span>
                    <span class="rb-desc">Intake Pump 101</span>
                    <div class="rb-children">
                      <div class="rb-node rb-asset">
                        <span class="rb-label">Child Asset</span>
                        <span class="rb-id">M-101</span>
                        <span class="rb-desc">Motor for P-101</span>
                      </div>
                      <div class="rb-node rb-asset">
                        <span class="rb-label">Child Asset</span>
                        <span class="rb-id">C-101</span>
                        <span class="rb-desc">Controller for P-101</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

## Reference Records

| Record Type | ID / Name | Description | Parent / Belongs To | Used In (Modules) |
| --- | --- | --- | --- | --- |
| Organization | RWA | Riverbend Water Authority. Base currency CAD. |  | 01, 08 |
| Site | TP1 | Riverbend Treatment Plant | RWA | All |
| Site | DIST | Distribution Network (mains, valves, pump stations, hydrants) | RWA | 02, 13 |
| Site | FLEET | Fleet Yard (40 service trucks and equipment) | RWA | 13 |
| Item Set | RWAITEMS | Shared item catalog for all RWA sites | RWA | 01, 05 |
| Location System | PROCESS | Primary system at TP1, follows the water treatment process | TP1 | 02 |
| Location System | ELECTRICAL | Secondary system at TP1, follows the power feeds | TP1 | 02 |
| Location | TP1-INTAKE | Raw water intake area | TP1 (PROCESS) | 02 |
| Location | TP1-INTAKE-PS | Raw water intake pump position (where P-101 sits) | TP1-INTAKE | 02, 03 |
| Location | TP1-FILT | Filtration building | TP1 (PROCESS) | 02, 04 |
| Location | TP1-CHEM | Chemical feed room (chlorine hazard) | TP1 (PROCESS) | 04 |
| Location | CENTRAL | Main storeroom at TP1 (type STOREROOM) | TP1 | 05, 06 |
| Location | DIST-STORE | Distribution yard storeroom (type STOREROOM) | DIST | 05 |
| Location | REPAIR-SHOP | Motor and pump repair area (type REPAIR) | TP1 | 02 |
| Asset | P-101 | Raw water intake pump, 250 HP horizontal split case centrifugal, installed 2014. Priority 1. The star of the site. | TP1-INTAKE-PS | 02, 03, 04, 12, 14 |
| Asset | P-102 | Twin of P-101, much healthier. Used for comparisons. | TP1-INTAKE | 12, 14 |
| Asset | M-101 | Motor on P-101 (rotating asset) | P-101 | 02, 05 |
| Asset | M-117 | Spare motor, under 2-year warranty, swapped in for M-101 | CENTRAL / P-101 | 02, 06 |
| Asset | C-101 | Coupling on P-101 | P-101 | 02 |
| Asset | CL2-AN-01 | Chlorine analyzer, calibrated monthly | TP1-CHEM | 04, 13 |
| Asset | WM-0450 | Water main, 2.3 km linear asset | DIST | 02, 13 |
| Asset | TRK-14 | Service truck | FLEET | 13 |
| Meter | RUNHOURS | Continuous meter, drives meter-based PMs | P-101 | 02, 04 |
| Meter | VIBRATION | Gauge meter in mm/s, condition monitoring limit 7.1 | P-101 | 02, 12 |
| Meter | OIL-CONDITION | Characteristic meter: CLEAR, CLOUDY, DARK | P-101 | 02 |
| Item | 1001-SEAL | Mechanical seal kit (kit item), average cost $310 | RWAITEMS / CENTRAL | 05, 06 |
| Item | 2040 | Pump bearing | RWAITEMS / CENTRAL | 05 |
| Job Plan | JP-SEAL-CENT | Replace mechanical seal on centrifugal pump |  | 04 |
| Job Plan | JP-INSP-PUMP | Quarterly pump inspection |  | 04 |
| Job Plan | JP-LOTO-PUMP | Lockout steps, nested in other pump job plans |  | 04 |
| PM | PM-P101-QTR | Quarterly inspection of P-101, 14-day lead time | P-101 | 04 |
| PM | PM-P101-LUBE | Lubrication every 500 run hours | P-101 | 04 |
| Route | RT-TP1-DAILY | Daily operator round: intake, filters, chemical feed, clearwell | TP1 | 04 |
| Safety Plan | SP-PUMP-LOTO | Rotating equipment, stored energy and confined space hazards |  | 04 |
| Work Order | 50231 | Replace seal on P-101 (CM, priority 1). The main example work order. | P-101 | 03, 05, 08 |
| Work Order | 50400 | TP1 annual shutdown (parent with 37 children) | TP1 | 03, 07 |
| Service Request | 3412 | Water pooling under P-101, reported by an operator | P-101 | 03 |
| Purchase Order | 22014 | 4 x 1001-SEAL from Northshore Pump Supply | CENTRAL | 06 |
| Company | Northshore Pump Supply | Main parts vendor | Company set | 06 |
| Company | Apex Pumps | Manufacturer of P-101 and M-117 | Company set | 06 |
| Craft | MECH / ELEC / INST / OPER | Mechanic, electrician, instrument tech, operator |  | 07 |
| Person / Labor | Dev Patel (DPATEL) | Journeyman mechanic, does most example jobs | MECH | 03, 07 |
| Person | Ana Moreau | Maintenance planner at TP1 |  | 01, 03, 07 |
| Person Group | TP1-SUPV | Shift supervisors at TP1 |  | 07, 09 |
