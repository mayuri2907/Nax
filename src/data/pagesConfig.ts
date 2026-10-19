export interface PageMeta {
  index: number;
  path: string;
  label: string;
  code: string;
  fullTitle: string;
}

export const PAGES_CONFIG: PageMeta[] = [
  { index: 0, path: '/', label: 'Overview', code: '00', fullTitle: '00 / OVERVIEW' },
  { index: 1, path: '/about', label: 'The Story', code: '01', fullTitle: '01 / THE STORY' },
  { index: 2, path: '/capabilities', label: 'The Craft', code: '02', fullTitle: '02 / THE CRAFT' },
  { index: 3, path: '/projects', label: 'Selected Builds', code: '03', fullTitle: '03 / SELECTED BUILDS' },
  { index: 4, path: '/vision', label: 'VYROBYTE Vision', code: '04', fullTitle: '04 / THE VISION' },
  { index: 5, path: '/principles', label: 'Principles', code: '05', fullTitle: '05 / THE PRINCIPLES' },
  { index: 6, path: '/contact', label: "Let's Build", code: '06', fullTitle: "06 / LET'S BUILD" }
];
