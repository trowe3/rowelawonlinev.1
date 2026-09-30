export interface NavigationLink { label: string; href: string; }
export const practiceAreas: readonly NavigationLink[] = [
  { label: 'Family Law & Divorce', href: '/legal-services/divorce-family-law' },
  { label: 'Custody & Placement', href: '/legal-services/custody-placement' },
  { label: 'Guardian ad Litem', href: '/legal-services/guardian-ad-litem' },
  { label: 'Guardianships', href: '/legal-services/guardianships' },
  { label: 'TPR & Adoption', href: '/legal-services/tpr-adoption' },
  { label: 'Estate & Medicaid Planning', href: '/legal-services/estate-medicaid-planning' },
  { label: 'Business Succession', href: '/legal-services/business-succession' },
  { label: 'Real Estate Transactions', href: '/legal-services/real-estate' },
];
export const mainLinks: readonly NavigationLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Wisconsin Legal Services', href: '/legal-services' },
  { label: 'Virtual Mediation (WI & FL)', href: '/mediation' },
  { label: 'About Patrick Rowe', href: '/about' },
  { label: 'Contact & Intake', href: '/contact' },
];
export function isCurrent(pathname: string, href: string): boolean {
  return (pathname.replace(/\/$/, '') || '/') === href;
}
