import { niches } from "@/content/niches";
import { listedServices } from "@/content/services";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getI18n } from "@/i18n/server";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { ButtonLink } from "@/components/ui/Button";

function FooterColumn({
  id,
  title,
  links,
}: {
  id: string;
  title: string;
  links: { label: string; href: string }[];
}) {
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

export async function Footer() {
  const { locale, t, href } = await getI18n();
  const year = new Date().getFullYear();
  const local = (links: { label: string; href: string }[]) =>
    links.map((l) => ({ label: l.label, href: href(l.href) }));
  const pt = locale === "pt";
  const institutional = local([
    { label: t.ui.footer.insights, href: "/insights" },
    ...(pt ? [{ label: "Perguntas frequentes", href: "/perguntas-frequentes" }] : []),
    { label: t.nav.contact.label, href: t.nav.contact.href },
    { label: t.ui.footer.privacy, href: "/politica-de-privacidade" },
  ]);
  // Atalhos por tipo de negócio em todas as páginas (só em português): links internos que ajudam a ser encontrado
  const nicheLinks = local([
    { label: "Todos os tipos de negócio", href: "/site-para" },
    ...niches.slice(0, 7).map((n) => ({ label: `Site para ${n.name}`, href: `/site-para/${n.slug}` })),
  ]);

  return (
    <footer className="site-footer border-t border-line bg-bg">
      <div className="container-site py-16 md:py-24">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href={href("/")} aria-label={t.ui.homeAria} className="luli-tilt inline-flex">
              <BrandLogo variant="luli" height={56} />
            </Link>
            <p className="type-subheading mt-8 max-w-md">{t.site.centralMessage}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ButtonLink href={t.nav.contact.href} variant="primary">
                {t.nav.contact.label}
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

          <div className={pt ? "grid gap-10 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-2 xl:grid-cols-4" : "grid gap-10 sm:grid-cols-3 lg:col-span-7"}>
            <FooterColumn id="footer-navegacao" title={t.ui.footer.navigation} links={local(t.nav.items)} />
            <FooterColumn
              id="footer-especialidades"
              title={t.ui.footer.specialties}
              links={local(listedServices(locale, t.services).map((s) => ({ label: s.name, href: `/servicos/${s.slug}` })))}
            />
            <FooterColumn
              id="footer-institucional"
              title={t.ui.footer.institutional}
              links={[...institutional, ...siteConfig.social]}
            />
            {pt ? <FooterColumn id="footer-nichos" title="Sites para" links={nicheLinks} /> : null}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-8 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {siteConfig.name}. {t.ui.footer.rights}
          </p>
          <p>{t.site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
