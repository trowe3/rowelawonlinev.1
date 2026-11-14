export interface NavigationLink { label: string; href: string; }
export const practiceAreas: readonly NavigationLink[] = [
  { label: 'Family Law & Divorce', href: '/legal-services/divorce-family-law' },
  { label: 'Custody & Placement', href: '/legal-services/custody-placement' },
  { label: 'Guardian ad Litem', href: '/legal-services/guardian-ad-litem' },
  { label: 'Guardianships', href: '/legal-services/guardianships' },
  { label: 'TPR & Adoption', href: '/legal-services/tpr-adoption' },
  { label: 'Estate & Medicaid Planning', href: '/legal-services/estate-medicaid-planning' },
  { label: 'Business Succession', href: '/legal-services/business-succession' },
  { label: 'Real Estate', href: '/legal-services/real-estate' },
];
export const mainLinks: readonly NavigationLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Wisconsin Legal Services', href: '/legal-services' },
  { label: 'Virtual Mediation (WI & FL)', href: '/mediation' },
  { label: 'About Patrick Rowe', href: '/about' },
  { label: 'Contact & Intake', href: '/contact' },
  { label: 'Blog', href: '/blog' },
];
/** Firm phone number shared by the footer and contact page. */
export const officePhone = { display: '715-564-4245', href: 'tel:+17155644245' } as const;

/**
 * Mediation intake Google Form.
 * TODO: replace with the real Google Form URL once it exists. Until then,
 * mediation buttons fall back to the on-site contact page.
 */
export const mediationFormUrl: string = '/contact';
export const mediationFormIsExternal: boolean = /^https:\/\//.test(mediationFormUrl);

export function isCurrent(pathname: string, href: string): boolean {
  return (pathname.replace(/\/$/, '') || '/') === href;
}
