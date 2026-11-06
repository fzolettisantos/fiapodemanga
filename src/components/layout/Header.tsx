import Link from "next/link";
import { getI18n } from "@/i18n/server";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { ButtonLink } from "@/components/ui/Button";
import { DesktopNavigation } from "@/components/navigation/DesktopNavigation";
import { MobileNavigation } from "@/components/navigation/MobileNavigation";
import { ThemeToggle } from "@/components/navigation/ThemeToggle";
import { LanguageSwitcher } from "@/components/navigation/LanguageSwitcher";

export async function Header() {
  const { locale, t, href } = await getI18n();
  const items = t.nav.items.map((item) => ({ label: item.label, href: href(item.href) }));
  const contact = { label: t.nav.contact.label, href: href(t.nav.contact.href) };
  const themeLabels = { toggle: t.ui.themeToggle, toLight: t.ui.themeToLight, toDark: t.ui.themeToDark };
  const languageLabels = { label: t.ui.language, currentLabel: t.ui.languageCurrent };

  return (
    <header className="site-header sticky top-0 z-40 h-20 border-b border-line bg-bg">
      {/* No topo: barra completa. Ao rolar: pílula flutuante (ícone + CTA + menu) — ver globals.css */}
      <div className="site-header__bar container-site flex h-20 items-center justify-between gap-6 lg:grid lg:grid-cols-[1fr_auto_1fr]">
        <Link
          href={href("/")}
          aria-label={t.ui.homeAria}
          className="header-logo inline-flex min-h-11 items-center justify-self-start"
        >
          <span className="header-logo-full">
            <BrandLogo height={38} />
          </span>
          <span className="header-logo-icon">
            <BrandLogo variant="symbol" height={34} />
          </span>
        </Link>

        <div className="header-full-only">
          <DesktopNavigation items={items} label={t.ui.mainNavigation} />
        </div>

        <div className="flex items-center gap-2 justify-self-end">
          <div className="header-full-only hidden items-center gap-2 lg:flex">
            <LanguageSwitcher locale={locale} {...languageLabels} />
          </div>
          <span className="header-cta">
            <ButtonLink href={t.nav.contact.href} variant="primary">
              {t.nav.contact.label}
            </ButtonLink>
          </span>
          <div className="header-full-only hidden lg:flex">
            <ThemeToggle labels={themeLabels} />
          </div>
          <MobileNavigation
            locale={locale}
            items={[...items, contact]}
            homeHref={href("/")}
            labels={{
              menu: t.ui.menu,
              close: t.ui.close,
              navigation: t.ui.menuNavigation,
              homeAria: t.ui.homeAria,
              tagline: t.site.tagline,
              ...languageLabels,
            }}
            themeLabels={themeLabels}
          />
        </div>
      </div>
    </header>
  );
}
