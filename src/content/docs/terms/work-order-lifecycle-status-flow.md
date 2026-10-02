---
title: 'Work Order Lifecycle / Status Flow'
termId: 'M03-005'
module: '03 Work Management'
moduleSlug: '03-work-management'
subarea: 'Work orders'
fieldCode: 'WOSTATUS'
definition: 'The path a work order follows from creation to closure. A common flow is WAPPR (waiting on approval) > APPR (approved) > INPRG (in progress) > COMP (complete) > CLOSE (closed). Other common values include WMATL (waiting on material), WSCH (waiting to be scheduled), WPCOND (waiting on plant conditions) and CAN (cancelled).'
whereInMaximo: 'Work Order Tracking, Change Status action'
riverbendExample: 'WO 50231 is created WAPPR, approved APPR, goes WMATL until the seal kit arrives, then INPRG, COMP and finally CLOSE.'
relatedTerms:
  - label: 'Status'
    slug: 'status'
  - label: 'Synonym Domain'
    slug: 'synonym-domain'
  - label: 'Work Order'
    slug: 'work-order'
commonMisconception: 'COMP and CLOSE are not the same. COMP means the work is done; CLOSE locks the record so costs and details can no longer change.'
difficulty: 'Beginner'
versionNote: ''
verifyIn: 'IBM Docs > Maximo Manage > Work management'
reviewStatus: 'Drafted'
reviewer: ''
reviewerNotes: ''
pageSlug: 'work-order-lifecycle-status-flow'
prev:
  link: /terms/work-order
  label: 'Work Order'
next:
  link: /terms/work-type
  label: 'Work Type'
template: doc
---
