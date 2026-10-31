import type { IconType } from "react-icons";
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

// One list for the hero and the footer so they never drift apart
export const SOCIAL_LINKS: { label: string; href: string; Icon: IconType }[] = [
  { label: "GitHub", href: "https://github.com/mohammad-al-asad", Icon: FaGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mohammad-al-asad", Icon: FaLinkedinIn },
  { label: "Instagram", href: "https://www.instagram.com/maasad11914", Icon: FaInstagram },
  { label: "Facebook", href: "https://www.facebook.com/maasad11914", Icon: FaFacebookF },
  { label: "X", href: "https://x.com/maasad11914", Icon: FaXTwitter },
];
