import type { NavItem, SocialLink } from '../types';

export const navItems: NavItem[] = [
  { id: 'hero', label: 'Overview', href: '#hero' },
  { id: 'about', label: '01 The Story', href: '#about' },
  { id: 'capabilities', label: '02 Capabilities', href: '#capabilities' },
  { id: 'projects', label: '03 Builds', href: '#projects' },
  { id: 'vision', label: '04 VYROBYTE', href: '#vision' },
  { id: 'principles', label: '05 Principles', href: '#principles' },
  { id: 'contact', label: '06 Contact', href: '#contact' }
];

export interface ContactConfig {
  email: string;
  isEmailConfigured: boolean;
  location: string;
  timezone: string;
  availability: string;
  socials: SocialLink[];
}

export const contactConfig: ContactConfig = {
  email: 'contact@vyrobyte.com',
  isEmailConfigured: true,
  location: 'India',
  timezone: 'IST (UTC+5:30)',
  availability: 'Open for high-impact technical collaborations & visionary product builds',
  socials: [
    {
      platform: 'GitHub',
      label: 'GitHub Profile',
      url: 'https://github.com/NavinChaudhary',
      displayValue: 'github.com/NavinChaudhary',
      isConfigured: true
    },
    {
      platform: 'LinkedIn',
      label: 'LinkedIn Profile',
      url: 'https://linkedin.com/in/navin-chaudhary',
      displayValue: 'linkedin.com/in/navin-chaudhary',
      isConfigured: true
    },
    {
      platform: 'Startup',
      label: 'VYROBYTE Ventures',
      url: '#vision',
      displayValue: 'vyrobyte.internal',
      isConfigured: true
    }
  ]
};
