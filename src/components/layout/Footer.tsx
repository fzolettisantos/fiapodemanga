import Link from "next/link";
import { contactNavItem, mainNavigation, siteConfig } from "@/config/site";
import { services } from "@/content/services";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { ButtonLink } from "@/components/ui/Button";

const institutional = [
  { label: "Insights", href: "/insights" },
  { label: contactNavItem.label, href: contactNavItem.href },
  { label: "Política de privacidade", href: "/politica-de-privacidade" },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  const id = `footer-${title.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <nav aria-labelledby={id}>
      <h2 id={id} className="eyebrow mb-5">
        {title}
      </h2>
      <ul className="space-y-1">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="inline-flex min-h-10 items-center text-[0.95rem] text-text transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer border-t border-line bg-bg">
      <div className="container-site py-16 md:py-24">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" aria-label={`${siteConfig.name} — página inicial`} className="luli-tilt inline-flex">
              <BrandLogo variant="luli" height={56} />
            </Link>
            <p className="type-subheading mt-8 max-w-md">{siteConfig.centralMessage}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ButtonLink href="/contato" variant="primary">
                {contactNavItem.label}
              </ButtonLink>
              {siteConfig.contactEmail ? (
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="link-underline text-[0.95rem] text-text"
                >
                  {siteConfig.contactEmail}
                </a>
              ) : null}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            <FooterColumn title="Navegação" links={mainNavigation} />
            <FooterColumn
              title="Especialidades"
              links={services.map((s) => ({ label: s.name, href: `/servicos/${s.slug}` }))}
            />
            <FooterColumn
              title="Institucional"
              links={[...institutional, ...siteConfig.social]}
            />
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-8 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {siteConfig.name}. Todos os direitos reservados.
          </p>
          <p>{siteConfig.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
