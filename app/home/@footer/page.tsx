import Link from "next/link";
import { ReactNode } from "react";

const Footer = () => {
  return (
    <footer className="flex w-full items-center justify-center border-t border-t-stone-200 bg-stone-100 py-4">
      <div className="flex w-3/4 items-center justify-between gap-4">
        <FooterHeading>Byrch.app</FooterHeading>
        <FooterLink slug="privacy">Privacy</FooterLink>
        <FooterLink slug="terms">Terms</FooterLink>
        <FooterLink slug="contact">Contact</FooterLink>
        <FooterLink slug="about">About</FooterLink>
      </div>
    </footer>
  );
};

type Props = {
  children: ReactNode;
};
const FooterHeading = ({ children }: Props) => (
  <h3 className="text-xl font-bold text-stone-600">{children}</h3>
);

type FooterLinkProps = {
  children: ReactNode;
  slug: string;
};

const FooterLink = ({ children, slug }: FooterLinkProps) => (
  <Link className="text-stone-300" href={`/${slug}`}>
    {children}
  </Link>
);

export default Footer;
