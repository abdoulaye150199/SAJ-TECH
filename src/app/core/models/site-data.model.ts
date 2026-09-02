export interface NavigationItem {
  label: string;
  target: string;
}

export interface ServiceItem {
  index: string;
  icon: 'code' | 'layers' | 'pen' | 'server' | 'play' | 'share';
  title: string;
  description: string;
  tags: string[];
}

export interface TeamMember {
  index: string;
  name: string;
  role: string;
  position: string;
  photo: string;
}

export interface Testimonial {
  client: string;
  company: string;
  service: string;
  location: string;
  quote: string;
}

export interface ContactPhone {
  label: string;
  href: string;
}

export interface ContactData {
  email: string;
  phones: ContactPhone[];
}

export interface BrandData {
  name: string;
  tagline: string;
  locations: string[];
}

export interface SiteData {
  brand: BrandData;
  navigation: NavigationItem[];
  services: ServiceItem[];
  team: TeamMember[];
  testimonials: Testimonial[];
  contact: ContactData;
}
