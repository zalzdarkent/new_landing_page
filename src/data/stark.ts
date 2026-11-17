export interface ArmorMark {
  id: string;
  mark: string;
  codename: string;
  alloy: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  coreShape: 'circle' | 'triangle' | 'hex' | 'nano';
  powerOutput: string;
  machRating: string;
}

export const ARMOR_GENERATIONS: ArmorMark[] = [
  {
    id: 'mk-1',
    mark: 'MARK I',
    codename: 'CAVE PROTOTYPE',
    alloy: 'HAMMERED IRON',
    primaryColor: '#525866',
    secondaryColor: '#2B303B',
    accentColor: '#94A3B8',
    coreShape: 'circle',
    powerOutput: '1.2 GJ/S',
    machRating: 'MACH 0.0',
  },
  {
    id: 'mk-3',
    mark: 'MARK III',
    codename: 'HOT ROD',
    alloy: 'GOLD-TITANIUM',
    primaryColor: '#B91C1C',
    secondaryColor: '#D4AF37',
    accentColor: '#38BDF8',
    coreShape: 'circle',
    powerOutput: '3.0 GJ/S',
    machRating: 'MACH 2.4',
  },
  {
    id: 'mk-7',
    mark: 'MARK VII',
    codename: 'TACTICAL POD',
    alloy: 'REINFORCED TITANIUM',
    primaryColor: '#991B1B',
    secondaryColor: '#C5A030',
    accentColor: '#7DD3FC',
    coreShape: 'circle',
    powerOutput: '8.0 GJ/S',
    machRating: 'MACH 3.2',
  },
  {
    id: 'mk-42',
    mark: 'MARK XLII',
    codename: 'PRODIGAL SON',
    alloy: 'MODULAR PREHENSILE',
    primaryColor: '#D4AF37',
    secondaryColor: '#991B1B',
    accentColor: '#38BDF8',
    coreShape: 'circle',
    powerOutput: '10.4 GJ/S',
    machRating: 'MACH 4.1',
  },
  {
    id: 'mk-50',
    mark: 'MARK L',
    codename: 'BLEEDING EDGE',
    alloy: 'NANOTECH MATRIX',
    primaryColor: '#C81E2B',
    secondaryColor: '#E5B842',
    accentColor: '#22D3EE',
    coreShape: 'triangle',
    powerOutput: '16.8 GJ/S',
    machRating: 'MACH 8.5',
  },
  {
    id: 'mk-85',
    mark: 'MARK LXXXV',
    codename: 'FINAL FORM',
    alloy: 'VIBRANIUM-NANO',
    primaryColor: '#E11D2E',
    secondaryColor: '#F5D061',
    accentColor: '#38BDF8',
    coreShape: 'hex',
    powerOutput: '24.0 GJ/S',
    machRating: 'MACH 12.0',
  },
];

export interface SuitSubsystem {
  id: string;
  code: string;
  label: string;
  metric: string;
  coords: { x: number; y: number };
  color: string;
}

export const SUIT_SUBSYSTEMS: SuitSubsystem[] = [
  {
    id: 'optic-hud',
    code: 'SYS-01',
    label: 'OPTIC HUD',
    metric: '0.02MS LOCK',
    coords: { x: 50, y: 15 },
    color: '#38BDF8',
  },
  {
    id: 'arc-core',
    code: 'SYS-02',
    label: 'ARC REACTOR',
    metric: '24.0 GJ/S',
    coords: { x: 50, y: 34 },
    color: '#E0F2FE',
  },
  {
    id: 'repulsor',
    code: 'SYS-03',
    label: 'REPULSOR',
    metric: '1.8 MW PULSE',
    coords: { x: 24, y: 52 },
    color: '#22D3EE',
  },
  {
    id: 'nano-shield',
    code: 'SYS-04',
    label: 'NANO-MATRIX',
    metric: '99.9% INTEGRITY',
    coords: { x: 74, y: 42 },
    color: '#F5D061',
  },
  {
    id: 'flight-thrusters',
    code: 'SYS-05',
    label: 'FLIGHT THRUST',
    metric: 'MACH 12.0',
    coords: { x: 50, y: 82 },
    color: '#E11D2E',
  },
];

export const CHAPTER_SECTIONS = [
  { id: 'awakening', code: '01', label: 'AWAKENING' },
  { id: 'core', code: '02', label: 'ARC CORE' },
  { id: 'helmet', code: '03', label: 'HELMET' },
  { id: 'armor', code: '04', label: 'MARK LXXXV' },
  { id: 'assembly', code: '05', label: 'ASSEMBLY' },
  { id: 'evolution', code: '06', label: 'EVOLUTION' },
  { id: 'technology', code: '07', label: 'SCHEMATICS' },
  { id: 'subsystem', code: '08', label: 'SYSTEMS' },
  { id: 'armory', code: '09', label: 'ARMORY' },
  { id: 'flight', code: '10', label: 'FLIGHT' },
  { id: 'stark', code: '11', label: 'J.A.R.V.I.S.' },
  { id: 'final', code: '12', label: 'FINAL FORM' },
];

