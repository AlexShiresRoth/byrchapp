import Link from "next/link";
import { ReactNode } from "react";

const Footer = () => {
  return (
    <footer className="flex w-full justify-center bg-black py-12">
      <div className="flex w-3/4 justify-between gap-4">
        <div className="flex flex-col gap-2">
          <FooterHeading>Explore</FooterHeading>
          <FooterLink slug="about">About</FooterLink>
          <FooterLink slug="about">About</FooterLink>
          <FooterLink slug="about">About</FooterLink>
          <FooterLink slug="about">About</FooterLink>
        </div>
        <div className="flex flex-col gap-2">
          <FooterHeading>Explore</FooterHeading>
          <FooterLink slug="about">About</FooterLink>
          <FooterLink slug="about">About</FooterLink>
          <FooterLink slug="about">About</FooterLink>
          <FooterLink slug="about">About</FooterLink>
        </div>
        <div className="flex flex-col gap-2">
          <FooterHeading>Explore</FooterHeading>
          <FooterLink slug="about">About</FooterLink>
          <FooterLink slug="about">About</FooterLink>
          <FooterLink slug="about">About</FooterLink>
          <FooterLink slug="about">About</FooterLink>
        </div>
        <div className="flex flex-col gap-2">
          <FooterHeading>Explore</FooterHeading>
          <FooterLink slug="about">About</FooterLink>
          <FooterLink slug="about">About</FooterLink>
          <FooterLink slug="about">About</FooterLink>
          <FooterLink slug="about">About</FooterLink>
        </div>
      </div>
    </footer>
  );
};

type Props = {
  children: ReactNode;
};
const FooterHeading = ({ children }: Props) => (
  <h3 className="mb-4 text-xl font-bold text-white">{children}</h3>
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
