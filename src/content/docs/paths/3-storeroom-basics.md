---
title: '3. Storeroom basics'
pathName: '3. Storeroom basics'
pathSlug: '3-storeroom-basics'
stepCount: 18
steps:
  - step: 1
    term: 'Item'
    slug: 'item'
    definition: 'A part or material the organization buys, stocks or uses, like a bearing, filter or gallon of oil. The item is the catalog entry; actual stock lives in storerooms.'
  - step: 2
    term: 'Item Master'
    slug: 'item-master'
    definition: 'The application and catalog where items are defined once for an item set, with description, order and issue units, commodity group and whether they are rotating, lotted and so on.'
  - step: 3
    term: 'Storeroom'
    slug: 'storeroom'
    definition: 'A location of type STOREROOM that holds stock. Each storeroom keeps its own balances, costs, bins and reorder settings for the items it carries.'
  - step: 4
    term: 'Inventory (Inventory Record)'
    slug: 'inventory-inventory-record'
    definition: 'The record of an item in a specific storeroom, holding the balance, cost, bins and reorder details.'
  - step: 5
    term: 'Bin'
    slug: 'bin'
    definition: 'A specific shelf, drawer or spot inside a storeroom where stock is kept.'
  - step: 6
    term: 'Current Balance / Available / Reserved'
    slug: 'current-balance-available-reserved'
    definition: 'Current balance is what is physically on the shelf. Reserved is what is set aside for planned work. Available is roughly what is left for everyone else.'
  - step: 7
    term: 'Issue'
    slug: 'issue'
    definition: 'Taking stock out of a storeroom and charging it to a work order, asset, location or GL account.'
  - step: 8
    term: 'Return'
    slug: 'return'
    definition: 'Putting unused stock back into a storeroom and crediting the work order or account it was charged to.'
  - step: 9
    term: 'Transfer'
    slug: 'transfer'
    definition: 'Moving stock from one storeroom to another, either directly or through shipping and receiving.'
  - step: 10
    term: 'Reorder Point'
    slug: 'reorder-point'
    definition: 'The stock level at which Maximo should suggest ordering more.'
  - step: 11
    term: 'Economic Order Quantity (EOQ)'
    slug: 'economic-order-quantity-eoq'
    definition: 'How much to order each time stock is replenished. Maximo can use a set quantity on the inventory record.'
  - step: 12
    term: 'Safety Stock'
    slug: 'safety-stock'
    definition: 'Extra stock kept to protect against delays or demand spikes.'
  - step: 13
    term: 'Reorder (Process)'
    slug: 'reorder-process'
    definition: 'Maximo checks storerooms against reorder points and creates purchase requisitions or orders for what needs replenishing, either manually or by cron task.'
  - step: 14
    term: 'Purchase Requisition (PR)'
    slug: 'purchase-requisition-pr'
    definition: 'An internal request to buy something. Once approved, it becomes a purchase order sent to a vendor.'
  - step: 15
    term: 'Purchase Order (PO)'
    slug: 'purchase-order-po'
    definition: 'The official order sent to a vendor to buy items or services. It commits spending and is what receipts and invoices are matched against.'
  - step: 16
    term: 'Receiving'
    slug: 'receiving'
    definition: 'Recording that ordered goods or services have arrived. Receiving updates stock, work order costs and the PO.'
  - step: 17
    term: 'Physical Count / Cycle Count'
    slug: 'physical-count-cycle-count'
    definition: 'Checking actual stock on the shelf against Maximo''s balance and adjusting it. Cycle counting does this in rotation, often more often for high-value or critical items.'
  - step: 18
    term: 'ABC Type'
    slug: 'abc-type'
    definition: 'A classification of inventory by value or importance, where A items are the most valuable and need the closest control.'
template: doc
---
