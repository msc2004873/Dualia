// DUALIA HEALING CENTER - Complete Data Layer

// === PATIENTS (8 records with full treatment history) ===
export const patients = [
  {
    id: 'P001',
    name: 'Alexandra Bennett',
    idNumber: '108423791',
    email: 'alexandra.bennett@email.com',
    phone: '+506 8834-2291',
    birthDate: '1984-03-15',
    age: 41,
    lastVisit: '2026-05-28',
    totalSpent: 4820,
    membership: 'Monthly Pass',
    medicalConditions: ['Chronic fatigue', 'Vitamin D deficiency', 'Mild anxiety'],
    treatmentHistory: [
      { date: '2026-05-28', service: 'NAD+ 1g IV', dose: '1000mg IV', cost: 570, nurse: 'Sara Chavez', notes: 'Tolerated well. No nausea. 2-hour infusion.' },
      { date: '2026-05-14', service: 'Immune Mega IV', dose: 'Vitamin C 75g + Zinc + Glutathione 600mg', cost: 295, nurse: 'Sara Chavez', notes: 'Immune boost pre-travel. Excellent energy post-treatment.' },
      { date: '2026-04-30', service: 'Hydration IV', dose: '1L Lactated Ringer + Electrolytes', cost: 124, nurse: 'Daniela Chaves', notes: 'Stress rehydration. No complications.' },
      { date: '2026-04-16', service: 'B12 Shot + Glutathione Shot', dose: '1000mcg IM + 600mg IV push', cost: 70, nurse: 'Sara Chavez', notes: 'Glowing skin, exceptional energy next day.' },
    ]
  },
  {
    id: 'P002',
    name: 'Charles Morrison',
    idNumber: '107654382',
    email: 'charles.morrison@company.com',
    phone: '+506 7023-8812',
    birthDate: '1978-09-22',
    age: 47,
    lastVisit: '2026-05-30',
    totalSpent: 8340,
    membership: 'Monthly Pass',
    medicalConditions: ['Active biohacker', 'Executive with frequent jet lag', 'Controlled hypertension'],
    treatmentHistory: [
      { date: '2026-05-30', service: 'NAD+ 2g IV', dose: '2000mg IV', cost: 930, nurse: 'Sara Chavez', notes: 'Second NAD+ session. Mild flush first hour. Completed smoothly.' },
      { date: '2026-05-15', service: 'NAD+ 2g IV', dose: '2000mg IV', cost: 930, nurse: 'Sara Chavez', notes: 'NAD+ protocol start. Light initial discomfort, then excellent.' },
      { date: '2026-04-22', service: 'Methylene Blue IV', dose: '0.5mg/kg IV', cost: 150, nurse: 'Daniela Chaves', notes: 'Cognitive protocol. No adverse effects. Very satisfied.' },
      { date: '2026-04-08', service: 'Immune Inter IV + B12 Shot', dose: 'Vitamin C 50g + B12 1000mcg', cost: 260, nurse: 'Sara Chavez', notes: 'Post-European travel. Quick recovery.' },
    ]
  },
  {
    id: 'P003',
    name: 'Sophia Hartley',
    idNumber: '205341927',
    email: 'sophia.hartley@email.com',
    phone: '+506 8612-5503',
    birthDate: '1992-06-08',
    age: 33,
    lastVisit: '2026-05-25',
    totalSpent: 2190,
    membership: '8-visit Pass',
    medicalConditions: ['Amateur athlete (triathlon)', 'Irritable bowel syndrome', 'Occasional insomnia'],
    treatmentHistory: [
      { date: '2026-05-25', service: 'Recovery IV + Lymphatic 40min', dose: 'Amino acids + Magnesium + Vitamin C + Zinc + drainage', cost: 255, nurse: 'Daniela Chaves', notes: 'Post-triathlon recovery. Excellent musculoskeletal relief.' },
      { date: '2026-05-11', service: 'Recovery IV', dose: 'Amino acids + Magnesium + Vitamin C + Zinc', cost: 205, nurse: 'Daniela Chaves', notes: 'Competition week. Recovery combo very effective.' },
      { date: '2026-04-27', service: 'Immune Intro IV', dose: 'Vitamin C 25g + Zinc', cost: 195, nurse: 'Sara Chavez', notes: 'Pre-rainy season prevention. No symptoms.' },
    ]
  },
  {
    id: 'P004',
    name: 'Richard Caldwell',
    idNumber: '309217654',
    email: 'richard.caldwell@business.com',
    phone: '+506 8801-1234',
    birthDate: '1968-11-30',
    age: 57,
    lastVisit: '2026-05-20',
    totalSpent: 12650,
    membership: 'Monthly Pass',
    medicalConditions: ['Type 2 Diabetes (controlled)', 'Adrenal fatigue', 'Anti-aging protocol interest'],
    treatmentHistory: [
      { date: '2026-05-20', service: 'NAD+ 3g IV', dose: '3000mg IV', cost: 1290, nurse: 'Sara Chavez', notes: 'Fourth monthly NAD+ session. Excellent tolerance. Reduced coffee intake.' },
      { date: '2026-04-22', service: 'NAD+ 3g IV', dose: '3000mg IV', cost: 1290, nurse: 'Sara Chavez', notes: 'Third session. Better sleep quality and libido reported.' },
      { date: '2026-04-01', service: 'Stem Cells Consultation + HRT Consult', dose: 'Consultation protocol review', cost: 1300, nurse: 'Medical Director', notes: 'Evaluation for cellular therapy. Ideal candidate.' },
      { date: '2026-03-18', service: 'NAD+ 2g IV', dose: '2000mg IV', cost: 930, nurse: 'Sara Chavez', notes: 'Second session. Controlled flush. Excellent response.' },
    ]
  },
  {
    id: 'P005',
    name: 'Natalie Cooper',
    idNumber: '401873356',
    email: 'natalie.cooper@startup.com',
    phone: '+506 7756-9921',
    birthDate: '1995-02-14',
    age: 31,
    lastVisit: '2026-06-01',
    totalSpent: 1430,
    membership: '4-visit Pass',
    medicalConditions: ['High work stress (entrepreneur)', 'Sensitive skin', 'Mild iron deficiency'],
    treatmentHistory: [
      { date: '2026-06-01', service: 'Psychadelica Advanced IV', dose: 'Advanced stress-relief formula', cost: 190, nurse: 'Sara Chavez', notes: 'First advanced session. Deep relaxation. No adverse effects. Impressed.' },
      { date: '2026-05-15', service: 'Naranja Intro IV + Glutathione Shot', dose: 'Vitamin C 12.5g + Glutathione 600mg', cost: 210, nurse: 'Daniela Chaves', notes: 'Glowing skin visible in 48 hours. Wants regular regime.' },
      { date: '2026-04-28', service: 'B12 Shot + Lymphatic 20min', dose: 'B12 1000mcg IM + facial drainage', cost: 45, nurse: 'Daniela Chaves', notes: 'Initial consultation. Decides to begin pass.' },
    ]
  },
  {
    id: 'P006',
    name: 'Michael Sanders',
    idNumber: '110345678',
    email: 'michael.sanders@email.com',
    phone: '+506 8234-7890',
    birthDate: '1982-07-19',
    age: 43,
    lastVisit: '2026-05-18',
    totalSpent: 3280,
    membership: '12-visit Pass',
    medicalConditions: ['Chronic migraines', 'Cervical muscle tension', 'Ex-smoker'],
    treatmentHistory: [
      { date: '2026-05-18', service: 'Immune Inter IV + Methylene Blue', dose: 'Vitamin C 50g + Methylene Blue 0.5mg/kg', cost: 395, nurse: 'Valeria Soto', notes: 'Neurological inflammation combo. Reduced migraine frequency reported.' },
      { date: '2026-05-04', service: 'Hydration IV + Lymphatic 40min', dose: '1L Lactated Ringer + Magnesium + cervical drainage', cost: 174, nurse: 'Daniela Chaves', notes: 'Recent migraine crisis. Immediate relief with Mg IV.' },
      { date: '2026-04-20', service: 'Recovery IV', dose: 'Magnesium + Amino acids + Zinc', cost: 205, nurse: 'Daniela Chaves', notes: 'Muscle tension protocol. Excellent response.' },
    ]
  },
  {
    id: 'P007',
    name: 'Andrea Walsh',
    idNumber: '503982211',
    email: 'andrea.walsh@email.com',
    phone: '+506 8567-4432',
    birthDate: '1988-12-03',
    age: 37,
    lastVisit: '2026-05-29',
    totalSpent: 5910,
    membership: 'Monthly Pass',
    medicalConditions: ["Hashimoto's thyroiditis", 'Severe Vitamin D deficiency', 'PMS'],
    treatmentHistory: [
      { date: '2026-05-29', service: 'Immune Mega IV + B12 Shot', dose: 'Vitamin C 75g + Zinc + Glutathione 1200mg + B12', cost: 310, nurse: 'Sara Chavez', notes: 'Monthly Hashimoto protocol. Thyroid stable. TSH improved vs last month.' },
      { date: '2026-05-13', service: 'NAD+ 1g IV', dose: '1000mg IV', cost: 570, nurse: 'Sara Chavez', notes: 'Cellular energy for autoimmune. Optimal response.' },
      { date: '2026-04-29', service: 'Genetic Testing', dose: 'Complete genetic panel', cost: 1200, nurse: 'Lab Technician', notes: 'MTHFR heterozygous detected. B vitamin protocol adjusted.' },
      { date: '2026-04-15', service: 'Immune Inter IV', dose: 'Vitamin C 50g + Zinc + B6', cost: 245, nurse: 'Daniela Chaves', notes: 'Post-cold recovery. 2 days vs usual 7-10 day recovery.' },
    ]
  },
  {
    id: 'P008',
    name: 'Henry Vickers',
    idNumber: '607128843',
    email: 'henry.vickers@investments.com',
    phone: '+506 8900-3345',
    birthDate: '1973-04-25',
    age: 53,
    lastVisit: '2026-05-22',
    totalSpent: 9780,
    membership: 'Monthly Pass',
    medicalConditions: ['Active longevity protocol', 'Early rheumatoid arthritis', 'HRT (testosterone)'],
    treatmentHistory: [
      { date: '2026-05-22', service: 'NAD+ 4g IV', dose: '4000mg IV (6-hour session)', cost: 1650, nurse: 'Sara Chavez', notes: 'Premium longevity protocol 6th session. Excellent tolerance. Reports \"years younger.\"' },
      { date: '2026-05-08', service: 'NAD+ 3g IV + Methylene Blue', dose: '3000mg + 0.5mg/kg MB', cost: 1440, nurse: 'Sara Chavez', notes: 'Cognitive-longevity combo. Very active in business, needs sharp mental clarity.' },
      { date: '2026-04-24', service: 'Stem Cells Consultation + HRT Consult', dose: 'Physician consultation', cost: 1100, nurse: 'Medical Director', notes: 'Stem cells candidate. Personalized protocol under study.' },
      { date: '2026-04-10', service: 'Immune Mega IV + Hydrogen 60min', dose: 'Vitamin C 75g + Glutathione + H2 60min', cost: 355, nurse: 'Daniela Chaves', notes: 'Systemic anti-inflammatory. Joint improvement noted.' },
    ]
  },
];

// === TODAY'S SCHEDULE (7 appointments, June 2, 2026) ===
export const appointments = [
  { id: 'A001', time: '08:00', endTime: '10:00', patientId: 'P002', patientName: 'Charles Morrison', service: 'NAD+ 2g IV', nurse: 'Sara Chavez', room: 'Ceiba Suite', status: 'completed', notes: 'Ambient music. VIP client.' },
  { id: 'A002', time: '09:30', endTime: '10:30', patientId: 'P005', patientName: 'Natalie Cooper', service: 'Psychadelica Advanced IV', nurse: 'Sara Chavez', room: 'Guanacaste Room', status: 'in-progress', notes: 'Second Psychadelica session. Dose adjusted and confirmed.' },
  { id: 'A003', time: '10:00', endTime: '11:00', patientId: 'P003', patientName: 'Sophia Hartley', service: 'Recovery IV + Lymphatic 40min', nurse: 'Daniela Chaves', room: 'Sarapiquí Room', status: 'in-progress', notes: 'Post 10K race yesterday in Heredia.' },
  { id: 'A004', time: '11:30', endTime: '12:00', patientId: 'P006', patientName: 'Michael Sanders', service: 'Hydration IV + B12 Shot', nurse: 'Daniela Chaves', room: 'Sarapiquí Room', status: 'confirmed', notes: '' },
  { id: 'A005', time: '14:00', endTime: '16:00', patientId: 'P008', patientName: 'Henry Vickers', service: 'NAD+ 4g IV', nurse: 'Dr. Alan Inman', room: 'Ceiba Suite', status: 'confirmed', notes: 'VIP Suite. Organic snack prepared. Movie available.' },
  { id: 'A006', time: '15:00', endTime: '16:00', patientId: 'P007', patientName: 'Andrea Walsh', service: 'Immune Mega IV', nurse: 'Sara Chavez', room: 'Guanacaste Room', status: 'confirmed', notes: 'Hashimoto protocol. Bring TSH form.' },
  { id: 'A007', time: '17:00', endTime: '18:00', patientId: 'P001', patientName: 'Alexandra Bennett', service: 'Naranja Mega IV + Glutathione Shot', nurse: 'Dr. Alan Inman', room: 'Ceiba Suite', status: 'pending', notes: 'WhatsApp confirmation pending.' },
];

// === SERVICES MENU ===
export const services = {
  ivTherapy: [
    { id: 'IV-HYD', name: 'Hydration IV', price: 124, category: 'IV Therapy', description: 'Lactated Ringer or NS 1L + electrolytes' },
    { id: 'IV-NAI', name: 'Naranja Intro IV', price: 155, category: 'IV Therapy', description: 'Vitamin C 12.5g + Myers cocktail' },
    { id: 'IV-NAM', name: 'Naranja Mega IV', price: 199, category: 'IV Therapy', description: 'Vitamin C 25g + Myers cocktail complete' },
    { id: 'IV-IMI', name: 'Immune Intro IV', price: 195, category: 'IV Therapy', description: 'Vitamin C 25g + Zinc + Selenium' },
    { id: 'IV-IMN', name: 'Immune Inter IV', price: 245, category: 'IV Therapy', description: 'Vitamin C 50g + Zinc + B6 + Selenium' },
    { id: 'IV-IMM', name: 'Immune Mega IV', price: 295, category: 'IV Therapy', description: 'Vitamin C 75g + Zinc + Glutathione 1200mg' },
    { id: 'IV-PSB', name: 'Psychadelica Beginner IV', price: 150, category: 'IV Therapy', description: 'Vitamin C + Niacinamide + Taurine + L-Carnitine' },
    { id: 'IV-PSA', name: 'Psychadelica Advanced IV', price: 190, category: 'IV Therapy', description: 'Advanced stress-relief + adaptogens' },
    { id: 'IV-REC', name: 'Recovery IV', price: 205, category: 'IV Therapy', description: 'Amino acids + Magnesium + Vitamin C + Zinc' },
    { id: 'IV-MB', name: 'Methylene Blue IV', price: 150, category: 'IV Therapy', description: 'Methylene Blue 0.5mg/kg — cognitive + mitochondrial' },
    { id: 'IV-NAD1', name: 'NAD+ 1g IV', price: 570, category: 'IV Therapy', description: 'Nicotinamide adenine dinucleotide 1000mg (2h)' },
    { id: 'IV-NAD2', name: 'NAD+ 2g IV', price: 930, category: 'IV Therapy', description: 'NAD+ 2000mg (4h) — longevity + cellular energy' },
    { id: 'IV-NAD3', name: 'NAD+ 3g IV', price: 1290, category: 'IV Therapy', description: 'NAD+ 3000mg (5h) — advanced protocol' },
    { id: 'IV-NAD4', name: 'NAD+ 4g IV', price: 1650, category: 'IV Therapy', description: 'NAD+ 4000mg (6h) — premium longevity protocol' },
    { id: 'IV-SC', name: 'Stem Cells Consultation', price: null, category: 'IV Therapy', description: 'Cellular therapy — price by consultation' },
  ],
  bathHouse: [
    { id: 'BH-S', name: 'Bath House Single', price: 35, category: 'Bath House', description: 'Individual access to thermal pools + saunas + cold plunge' },
    { id: 'BH-4', name: 'Bath House 4-visit Pass', price: 120, category: 'Bath House', description: 'Package of 4 visits' },
    { id: 'BH-8', name: 'Bath House 8-visit Pass', price: 200, category: 'Bath House', description: 'Package of 8 visits' },
    { id: 'BH-12', name: 'Bath House 12-visit Pass', price: 240, category: 'Bath House', description: 'Package of 12 visits' },
    { id: 'BH-M', name: 'Bath House Monthly Pass', price: 300, category: 'Bath House', description: 'Unlimited monthly access' },
  ],
  addons: [
    { id: 'AD-HRT', name: 'HRT Consultation', price: 100, category: 'Add-on', description: 'Hormone replacement therapy consultation' },
    { id: 'AD-GEN', name: 'Genetic Testing', price: 1200, category: 'Add-on', description: 'Complete genetic panel — MTHFR, APOE, etc.' },
    { id: 'AD-H30', name: 'Hydrogen 30min', price: 30, category: 'Add-on', description: 'Molecular hydrogen inhalation 30min' },
    { id: 'AD-H60', name: 'Hydrogen 60min', price: 60, category: 'Add-on', description: 'Molecular hydrogen inhalation 60min' },
    { id: 'AD-L20', name: 'Lymphatic Drainage 20min', price: 30, category: 'Add-on', description: 'Manual lymphatic drainage 20min' },
    { id: 'AD-L40', name: 'Lymphatic Drainage 40min', price: 50, category: 'Add-on', description: 'Manual lymphatic drainage 40min' },
    { id: 'AD-B12', name: 'B12 Shot', price: 15, category: 'Add-on', description: 'Vitamin B12 1000mcg IM' },
    { id: 'AD-GLU', name: 'Glutathione Shot', price: 55, category: 'Add-on', description: 'Glutathione 600mg IV push — antioxidant' },
  ],
};

// === INVENTORY (18 items) ===
export const inventory = [
  { id: 'INV-001', name: 'IV Bags 1L (Lactated Ringer)', unit: 'unit', currentStock: 48, minStock: 20, alertStock: 30, unitCost: 3.50, supplier: 'MedSupply CR' },
  { id: 'INV-002', name: 'IV Bags 1L (NS 0.9%)', unit: 'unit', currentStock: 31, minStock: 20, alertStock: 30, unitCost: 3.20, supplier: 'MedSupply CR' },
  { id: 'INV-003', name: 'Vitamin C Powder (1g sachets)', unit: 'gram', currentStock: 820, minStock: 200, alertStock: 350, unitCost: 0.18, supplier: 'NutriPharma LAC' },
  { id: 'INV-004', name: 'Glutathione (reduced powder)', unit: 'gram', currentStock: 42, minStock: 20, alertStock: 35, unitCost: 8.50, supplier: 'NutriPharma LAC' },
  { id: 'INV-005', name: 'NAD+ (sterile powder)', unit: 'gram', currentStock: 18, minStock: 10, alertStock: 20, unitCost: 45.00, supplier: 'BioLife Import' },
  { id: 'INV-006', name: 'Methylene Blue USP 1%', unit: 'vial 10ml', currentStock: 12, minStock: 6, alertStock: 10, unitCost: 22.00, supplier: 'BioLife Import' },
  { id: 'INV-007', name: 'Zinc Sulfate (amp 10mg/ml)', unit: 'ampule', currentStock: 88, minStock: 30, alertStock: 50, unitCost: 1.80, supplier: 'Farmacéutica Caro' },
  { id: 'INV-008', name: 'Vitamin B12 (amp 1000mcg)', unit: 'ampule', currentStock: 95, minStock: 40, alertStock: 60, unitCost: 1.20, supplier: 'Farmacéutica Caro' },
  { id: 'INV-009', name: '60ml Luer-Lock Syringes', unit: 'unit', currentStock: 67, minStock: 30, alertStock: 50, unitCost: 0.95, supplier: 'MedSupply CR' },
  { id: 'INV-010', name: '18G Needles x 1.5"', unit: 'unit', currentStock: 142, minStock: 50, alertStock: 80, unitCost: 0.25, supplier: 'MedSupply CR' },
  { id: 'INV-011', name: '20G Needles x 1"', unit: 'unit', currentStock: 28, minStock: 30, alertStock: 50, unitCost: 0.22, supplier: 'MedSupply CR' },
  { id: 'INV-012', name: 'Isopropyl Alcohol 70% (1L)', unit: 'liter', currentStock: 6, minStock: 4, alertStock: 8, unitCost: 4.50, supplier: 'CleanMed CR' },
  { id: 'INV-013', name: 'Sterile Gauze 4x4"', unit: 'pack x100', currentStock: 22, minStock: 10, alertStock: 18, unitCost: 6.80, supplier: 'MedSupply CR' },
  { id: 'INV-014', name: 'Nitrile Gloves Size L', unit: 'box x100', currentStock: 8, minStock: 5, alertStock: 10, unitCost: 18.50, supplier: 'CleanMed CR' },
  { id: 'INV-015', name: 'Nitrile Gloves Size M', unit: 'box x100', currentStock: 11, minStock: 5, alertStock: 10, unitCost: 18.50, supplier: 'CleanMed CR' },
  { id: 'INV-016', name: 'Alcohol Swabs (individual)', unit: 'pack x200', currentStock: 14, minStock: 6, alertStock: 10, unitCost: 5.20, supplier: 'CleanMed CR' },
  { id: 'INV-017', name: 'Premium Disposable Towels', unit: 'pack x50', currentStock: 19, minStock: 8, alertStock: 12, unitCost: 12.00, supplier: 'EcoSpa Supply' },
  { id: 'INV-018', name: 'Magnesium Sulfate (amp 50%)', unit: 'ampule', currentStock: 34, minStock: 15, alertStock: 25, unitCost: 2.10, supplier: 'Farmacéutica Caro' },
];

// === MEMBERSHIPS (10 records) ===
export const memberships = [
  { id: 'M001', memberName: 'Charles Morrison', passType: 'Monthly Pass', price: 300, visitsUsed: null, visitsTotal: null, expiryDate: '2026-06-25', daysLeft: 23, status: 'active' },
  { id: 'M002', memberName: 'Alexandra Bennett', passType: 'Monthly Pass', price: 300, visitsUsed: null, visitsTotal: null, expiryDate: '2026-06-30', daysLeft: 28, status: 'active' },
  { id: 'M003', memberName: 'Richard Caldwell', passType: 'Monthly Pass', price: 300, visitsUsed: null, visitsTotal: null, expiryDate: '2026-06-15', daysLeft: 13, status: 'active' },
  { id: 'M004', memberName: 'Andrea Walsh', passType: 'Monthly Pass', price: 300, visitsUsed: null, visitsTotal: null, expiryDate: '2026-06-07', daysLeft: 5, status: 'active' },
  { id: 'M005', memberName: 'Henry Vickers', passType: 'Monthly Pass', price: 300, visitsUsed: null, visitsTotal: null, expiryDate: '2026-06-05', daysLeft: 3, status: 'active' },
  { id: 'M006', memberName: 'Sophia Hartley', passType: '8-visit Pass', price: 200, visitsUsed: 6, visitsTotal: 8, expiryDate: '2026-07-11', daysLeft: 39, status: 'active' },
  { id: 'M007', memberName: 'Michael Sanders', passType: '12-visit Pass', price: 240, visitsUsed: 4, visitsTotal: 12, expiryDate: '2026-09-01', daysLeft: 91, status: 'active' },
  { id: 'M008', memberName: 'Natalie Cooper', passType: '4-visit Pass', price: 120, visitsUsed: 3, visitsTotal: 4, expiryDate: '2026-06-28', daysLeft: 26, status: 'active' },
  { id: 'M009', memberName: 'Priscila Vargas', passType: '8-visit Pass', price: 200, visitsUsed: 8, visitsTotal: 8, expiryDate: '2026-05-30', daysLeft: -3, status: 'expired' },
  { id: 'M010', memberName: 'Luis Brenes', passType: '4-visit Pass', price: 120, visitsUsed: 2, visitsTotal: 4, expiryDate: '2026-06-04', daysLeft: 2, status: 'active' },
];

// === INVOICES (6 records) ===
export const invoices = [
  { id: 'INV-0047', number: 'INV-2026-0047', date: '2026-06-01', clientId: 'P005', clientName: 'Natalie Cooper', idNumber: '401873356', services: [{ id: 'IV-PSB', name: 'Psychadelica Beginner IV', qty: 1, unitPrice: 150, lineTotal: 150 }], subtotal: 150, tax13: 19.50, total: 169.50, paymentMethod: 'Credit Card', ccSurcharge: 4.24, grandTotal: 173.74, status: 'issued' },
  { id: 'INV-0046', number: 'INV-2026-0046', date: '2026-05-30', clientId: 'P002', clientName: 'Charles Morrison', idNumber: '107654382', services: [{ id: 'IV-NAD2', name: 'NAD+ 2g IV', qty: 1, unitPrice: 930, lineTotal: 930 }], subtotal: 930, tax13: 120.90, total: 1050.90, paymentMethod: 'Bank Transfer', ccSurcharge: 0, grandTotal: 1050.90, status: 'issued' },
  { id: 'INV-0045', number: 'INV-2026-0045', date: '2026-05-29', clientId: 'P007', clientName: 'Andrea Walsh', idNumber: '503982211', services: [{ id: 'IV-IMM', name: 'Immune Mega IV', qty: 1, unitPrice: 295, lineTotal: 295 }, { id: 'AD-B12', name: 'B12 Shot', qty: 1, unitPrice: 15, lineTotal: 15 }], subtotal: 310, tax13: 40.30, total: 350.30, paymentMethod: 'Debit Card', ccSurcharge: 0, grandTotal: 350.30, status: 'issued' },
  { id: 'INV-0044', number: 'INV-2026-0044', date: '2026-05-28', clientId: 'P001', clientName: 'Alexandra Bennett', idNumber: '108423791', services: [{ id: 'IV-NAD1', name: 'NAD+ 1g IV', qty: 1, unitPrice: 570, lineTotal: 570 }], subtotal: 570, tax13: 74.10, total: 644.10, paymentMethod: 'Credit Card', ccSurcharge: 16.10, grandTotal: 660.20, status: 'issued' },
  { id: 'INV-0043', number: 'INV-2026-0043', date: '2026-05-22', clientId: 'P008', clientName: 'Henry Vickers', idNumber: '607128843', services: [{ id: 'IV-NAD4', name: 'NAD+ 4g IV', qty: 1, unitPrice: 1650, lineTotal: 1650 }, { id: 'AD-H60', name: 'Hydrogen 60min', qty: 1, unitPrice: 60, lineTotal: 60 }], subtotal: 1710, tax13: 222.30, total: 1932.30, paymentMethod: 'Bank Transfer', ccSurcharge: 0, grandTotal: 1932.30, status: 'issued' },
  { id: 'INV-0042', number: 'INV-2026-0042', date: '2026-05-20', clientId: 'P004', clientName: 'Richard Caldwell', idNumber: '309217654', services: [{ id: 'IV-NAD3', name: 'NAD+ 3g IV', qty: 1, unitPrice: 1290, lineTotal: 1290 }, { id: 'AD-HRT', name: 'HRT Consultation', qty: 1, unitPrice: 100, lineTotal: 100 }], subtotal: 1390, tax13: 180.70, total: 1570.70, paymentMethod: 'Cash', ccSurcharge: 0, grandTotal: 1570.70, status: 'issued' },
];

// === REPORTS DATA ===
export const reportsData = {
  today: {
    date: '2026-06-02',
    revenue: 2485,
    appointments: 7,
    completedAppointments: 2,
    inProgressAppointments: 2,
    confirmedAppointments: 2,
    pendingAppointments: 1,
    newPatients: 0,
    returningPatients: 7,
    topService: 'NAD+ 4g IV',
  },
  week: {
    startDate: '2026-05-27',
    endDate: '2026-06-02',
    revenue: 8320,
    appointments: 18,
    newPatients: 1,
    returningPatients: 14,
    barData: [
      { day: 'Mon', revenue: 930 },
      { day: 'Tue', revenue: 1545 },
      { day: 'Wed', revenue: 350 },
      { day: 'Thu', revenue: 1290 },
      { day: 'Fri', revenue: 1710 },
      { day: 'Sat', revenue: 2010 },
      { day: 'Sun', revenue: 485 },
    ],
  },
  month: {
    month: 'May 2026',
    revenue: 32480,
    appointments: 74,
    newPatients: 3,
    returningPatients: 38,
    barData: [
      { week: 'Week 1', revenue: 7200 },
      { week: 'Week 2', revenue: 8950 },
      { week: 'Week 3', revenue: 9340 },
      { week: 'Week 4', revenue: 6990 },
    ],
    topServices: [
      { name: 'NAD+ (all tiers)', revenue: 13200, percentage: 40.6 },
      { name: 'Immune IV (all)', revenue: 6860, percentage: 21.1 },
      { name: 'Recovery IV', revenue: 3280, percentage: 10.1 },
      { name: 'Methylene Blue', revenue: 2100, percentage: 6.5 },
      { name: 'Add-ons', revenue: 4820, percentage: 14.8 },
      { name: 'Other IV', revenue: 2220, percentage: 6.8 },
    ],
    categoryBreakdown: [
      { name: 'IV Therapy', value: 26280, color: '#2A7F6F' },
      { name: 'Add-ons', value: 4820, color: '#C4956A' },
      { name: 'Bath House', value: 880, color: '#8A9E9B' },
      { name: 'Consultations', value: 500, color: '#1B3330' },
    ],
    nurseActivity: [
      { name: 'Valeria Soto', appointments: 42, revenue: 24380 },
      { name: 'Daniela Chaves', appointments: 32, revenue: 8100 },
    ],
    expiringMemberships: [
      { memberName: 'Andrea Walsh', expiryDate: '2026-06-07', daysLeft: 5 },
      { memberName: 'Henry Vickers', expiryDate: '2026-06-05', daysLeft: 3 },
      { memberName: 'Luis Brenes', expiryDate: '2026-06-04', daysLeft: 2 },
    ],
  },
};

// === ALL SERVICES AS FLAT ARRAY (for dropdowns) ===
export const allServices = [
  ...services.ivTherapy,
  ...services.bathHouse,
  ...services.addons,
];

// Helper functions
export const getPatientById = (id) => patients.find(p => p.id === id);
export const getServiceById = (id) => allServices.find(s => s.id === id);
export const getInventoryById = (id) => inventory.find(i => i.id === id);
export const getMembershipById = (id) => memberships.find(m => m.id === id);
