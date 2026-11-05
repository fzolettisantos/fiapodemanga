import Link from "next/link";
import { contactNavItem, siteConfig } from "@/config/site";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { ButtonLink } from "@/components/ui/Button";
import { DesktopNavigation } from "@/components/navigation/DesktopNavigation";
import { MobileNavigation } from "@/components/navigation/MobileNavigation";
import { ThemeToggle } from "@/components/navigation/ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg transition-colors duration-300">
      <div className="container-site flex h-20 items-center justify-between gap-6 lg:grid lg:grid-cols-[1fr_auto_1fr]">
        <Link
          href="/"
          aria-label={`${siteConfig.name} — página inicial`}
          className="inline-flex min-h-11 items-center justify-self-start"
        >
          <BrandLogo height={34} priority />
        </Link>

        <DesktopNavigation />

        <div className="flex items-center gap-2 justify-self-end">
          <div className="hidden items-center gap-2 lg:flex">
            <ButtonLink href={contactNavItem.href} variant="primary">
              {contactNavItem.label}
            </ButtonLink>
            <ThemeToggle />
          </div>
          <MobileNavigation />
        </div>
      </div>
    </header>
  );
}
