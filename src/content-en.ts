export interface LocalizedService {
  title: string;
  card: string;
  hero: string;
  includes: [string, string][];
  steps: [string, string][];
  fragment: { title: string; rows: [string, string][] };
}

export const SERVICES_EN: Record<string, LocalizedService> = {
  storage: {
    title: 'Warehousing & Inventory Management',
    card: 'We store your products and record their movement, giving you clear visibility over available, reserved, and damaged stock.',
    hero: 'Send your inventory to our warehouse; we receive it, catalog it by bin and shelf, and keep every item’s status transparent to you.',
    includes: [
      ['Inbound Inspection Requests', 'Goods arrive via an inbound inventory request verified and checked before receiving.'],
      ['Storage Bin Records', 'Every SKU is assigned its precise warehouse slot for rapid, accurate order picking.'],
      ['Clear Movement Tracking', 'Track available, reserved, and damaged stock alongside historical movement logs.'],
    ],
    steps: [
      ['Register Store', 'Create your merchant account and await management review.'],
      ['Submit Inbound Request', 'Specify the SKUs and quantities you intend to deliver.'],
      ['We Receive & Catalog', 'Our team inspects the delivery and records items in the live inventory ledger.'],
      ['Monitor Balances', 'Access real-time available, reserved, and damaged counts on the Merchant Portal.'],
    ],
    fragment: {
      title: 'Inventory Ledger',
      rows: [['Available', 'Demo view'], ['Reserved', 'Demo view'], ['Damaged', 'Demo view']],
    },
  },
  'order-fulfilment': {
    title: 'Order Fulfilment & Packaging',
    card: 'We pick, pack, and prepare customer orders for immediate shipment dispatch.',
    hero: 'When an order arrives, we pick items from designated shelves, package them carefully, and update each stage until ready for carrier collection.',
    includes: [
      ['Order Item Picking', 'We pick items from verified warehouse locations for each customer order.'],
      ['Careful Packaging', 'We package goods securely through systematic preparation checkpoints.'],
      ['Inventory Deduction on Packing', 'The inventory ledger updates automatically once an order is packed.'],
    ],
    steps: [
      ['Order Received', 'The order appears on the Merchant Portal and fulfilment begins.'],
      ['In Preparation', 'Items are picked from assigned warehouse locations.'],
      ['Packaging', 'Goods are packed and inventory counts are updated.'],
      ['Ready for Pickup', 'The order is staged and ready for shipping handoff.'],
    ],
    fragment: {
      title: 'Order Stages',
      rows: [['In Preparation', 'Demo view'], ['Packaging', 'Demo view'], ['Ready for Pickup', 'Demo view']],
    },
  },
  shipping: {
    title: 'Shipping Coordination',
    card: 'Ship via our integrated platform rates, or attach your store’s own carrier waybills.',
    hero: 'You have two shipping paths: ship through our contracted platform carriers, or attach your own carrier waybill and we pack accordingly.',
    includes: [
      ['Platform Shipping', 'Choose platform-managed delivery, subject to standard platform delivery fees.'],
      ['Merchant Carrier Waybills', 'Attach your own shipping waybills without paying platform delivery fees.'],
      ['Clear Delivery Status', 'Monitor milestones and short national addresses in each order’s record.'],
    ],
    steps: [
      ['Select Shipping Path', 'Choose platform delivery or attach your carrier waybill.'],
      ['Order Staged', 'We package the order and apply verified shipping documents.'],
      ['Ready for Handover', 'Status updates to ready for pickup in the order ledger.'],
      ['Track Status', 'Monitor shipping milestones directly from the Merchant Portal.'],
    ],
    fragment: {
      title: 'Shipping Path',
      rows: [['Platform Shipping', 'Delivery fee applies'], ['Merchant Waybill', 'No platform delivery fee']],
    },
  },
  returns: {
    title: 'Returns Management',
    card: 'We receive customer returns, inspect goods, and record outcomes item by item.',
    hero: 'We receive returned parcels, inspect each item, record whether it returns to stock or is classified as damaged, and document liability and costs.',
    includes: [
      ['Intake Inspection', 'Every returned unit is inspected upon arrival at the warehouse.'],
      ['Restock or Damaged Classification', 'Outcomes are logged per SKU: return to shelf or record as damaged.'],
      ['Documented Costs & Liability', 'Party liability and handling costs are documented per return case.'],
    ],
    steps: [
      ['Return Received', 'We receive the returned package and log its intake.'],
      ['Item Inspection', 'Each item is checked individually by our team.'],
      ['Outcome Recorded', 'Classified as restocked to inventory or damaged.'],
      ['Ledger Review', 'Results, notes, and costs appear in your portal records.'],
    ],
    fragment: {
      title: 'Inspection Outcome',
      rows: [['Restocked to Inventory', 'Demo view'], ['Classified Damaged', 'Demo view']],
    },
  },
  'product-photography': {
    title: 'Product Photography',
    card: 'Additional service for professional product photography according to an approved service request.',
    hero: 'An additional service requested via the Merchant Portal after account approval, with scope and pricing basis defined in the approved service order.',
    includes: [
      ['Service Request', 'Submit your photography request via the Merchant Portal for review.'],
      ['Agreed Scope', 'The approved service order defines shots, angles, and deliverables.'],
      ['Structured Pricing', 'Pricing calculated based on the configured service unit.'],
    ],
    steps: [
      ['Register Store', 'Account approval is required first.'],
      ['Submit Request', 'Order the service from the Merchant Portal.'],
      ['Team Review', 'We confirm scope and pricing basis.'],
      ['Execution', 'Photography is performed according to the approved request.'],
    ],
    fragment: {
      title: 'Service Request',
      rows: [['Type', 'Product Photography'], ['Status', 'Demo view']],
    },
  },
  labelling: {
    title: 'Custom Product Labelling',
    card: 'Additional service for preparing and affixing SKU labels according to order needs.',
    hero: 'We prepare and apply labels to your products based on requirements, adhering to scope and pricing terms defined in the approved service order.',
    includes: [
      ['Team-Reviewed Request', 'Define your labelling needs and our team reviews before execution.'],
      ['Configured Scope', 'Scope follows agreed specifications and barcode formats.'],
      ['Transparent Unit Cost', 'Unit calculation method is clarified upon request approval.'],
    ],
    steps: [
      ['Register Store', 'Account approval is required first.'],
      ['Define Requirements', 'Submit specs via the Merchant Portal.'],
      ['Review & Confirm', 'We confirm label scope and pricing.'],
      ['Application', 'Labels are printed and applied per order.'],
    ],
    fragment: {
      title: 'Service Request',
      rows: [['Type', 'Product Labelling'], ['Status', 'Demo view']],
    },
  },
  repacking: {
    title: 'Repackaging Services',
    card: 'Repackaging and kitting products according to requested and approved service specifications.',
    hero: 'We repackage products according to scope you specify in your request and our team approves, with clear pricing terms in the service order.',
    includes: [
      ['Approved Service Order', 'Our team reviews and approves packaging specs before starting.'],
      ['Defined Packaging Scope', 'Agreed guidelines on cartons, inserts, and outer boxes.'],
      ['Service-Based Pricing', 'Pricing tied to service type and quantity calculation unit.'],
    ],
    steps: [
      ['Register Store', 'Account approval is required first.'],
      ['Submit Request', 'Order repackaging from the Merchant Portal.'],
      ['Scope Approval', 'Our team reviews and confirms the terms.'],
      ['Repackaging', 'Executed accurately per the approved order.'],
    ],
    fragment: {
      title: 'Service Request',
      rows: [['Type', 'Repackaging'], ['Status', 'Demo view']],
    },
  },
};

export const FAQS_EN = [
  {
    group: 'Account & Registration',
    q: 'What services does Leading Support provide?',
    a: 'We provide warehousing, inventory management, order picking and packing, shipping coordination, and returns handling, as well as additional services such as product photography, custom labelling, and repackaging.',
  },
  {
    group: 'Account & Registration',
    q: 'What happens after submitting the store registration?',
    a: 'Your store account is created and submitted to management for review. Operational access to warehouse services and inventory shipments becomes available once the account is approved.',
  },
  {
    group: 'Inventory & Orders',
    q: 'Do products remain the property of my store?',
    a: 'Yes. All inventory remains the exclusive property of your store while in the warehouse. Leading Support acts as your fulfilment and storage operator.',
  },
  {
    group: 'Shipping & Returns',
    q: 'Can I use my store’s own shipping carrier waybills?',
    a: 'Yes. You can choose platform shipping or attach your store’s own carrier waybills. Platform delivery fees apply only when using platform shipping.',
  },
  {
    group: 'Inventory & Orders',
    q: 'How do I monitor inventory levels and orders?',
    a: 'Through the Merchant Portal, you can inspect available, reserved, and damaged stock counts in real time, and follow order preparation milestones and transaction records.',
  },
  {
    group: 'Shipping & Returns',
    q: 'How are customer returns handled?',
    a: 'Returned parcels are received, inspected item by item, and categorized as either restocked to inventory or damaged, with handling costs and liability recorded per case.',
  },
  {
    group: 'Pricing & Services',
    q: 'How are service costs and fees calculated?',
    a: 'Fees depend on your store’s agreement and used services. They include commission on completed orders, platform shipping fees, storage above agreed allowances, and additional services when requested.',
  },
  {
    group: 'Pricing & Services',
    q: 'Are additional services available on subscription?',
    a: 'Additional services may be one-off or recurring based on service type and configuration. The scope and unit calculation method are clarified in the approved service order.',
  },
];

export const STEPS_EN: [string, string][] = [
  ['Register Your Store', 'Submit your store details and send your account for management review.'],
  ['Send Stock After Approval', 'Coordinate inbound inventory delivery to be received and cataloged.'],
  ['Leave Fulfilment to Us', 'We pick and pack orders with platform shipping or your attached waybills.'],
  ['Monitor from One Portal', 'Track live stock, orders, returns, and financial invoices from one place.'],
];
