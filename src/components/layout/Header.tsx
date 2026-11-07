"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Mail, Menu, Phone, X } from "lucide-react";
import { mainNav, offices, site } from "@/config/site";
import { practiceAreas } from "@/content/practice-areas";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close menus whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenuOpen(false);
    setDropdownOpen(false);
  }

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrolled(window.scrollY > 24));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Mobile menu: lock scroll, trap Escape, return focus.
  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusables = [
          menuButtonRef.current,
          ...panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
        ].filter(Boolean) as HTMLElement[];
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const closeDropdown = useCallback(() => setDropdownOpen(false), []);

  const solid = scrolled && !menuOpen;
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  const linkColour = solid ? "text-navy-900" : "text-white";

  return (
    <header
      className={`fixed inset-x-0 top-0 ${menuOpen ? "z-[60]" : "z-50"} transition-[background-color,box-shadow,padding] duration-500 ${
        solid
          ? "bg-white/95 shadow-[0_1px_0_rgba(5,17,72,0.08),0_12px_32px_-18px_rgba(5,17,72,0.25)] backdrop-blur"
          : "bg-transparent"
      }`}
    >
      <div
        className={`container-page flex items-center justify-between transition-[height] duration-500 ${
          solid ? "h-[4.25rem]" : "h-20 lg:h-24"
        }`}
      >
        <Link href="/" aria-label={`${site.name}, home`} className="relative block shrink-0">
          <Image
            src="/images/logo-white.png"
            alt=""
            width={626}
            height={145}
            priority
            className={`h-10 w-auto transition-opacity duration-500 lg:h-11 ${solid ? "opacity-0" : "opacity-100"}`}
          />
          <Image
            src="/images/logo.png"
            alt=""
            width={626}
            height={145}
            aria-hidden="true"
            className={`absolute inset-0 h-10 w-auto transition-opacity duration-500 lg:h-11 ${solid ? "opacity-100" : "opacity-0"}`}
          />
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => {
            const active = isActive(item.href);
            if (item.href === "/practice-areas") {
              return (
                <div
                  key={item.href}
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={closeDropdown}
                  onKeyDown={(e) => e.key === "Escape" && closeDropdown()}
                  onBlur={(e) => {
                    if (!dropdownRef.current?.contains(e.relatedTarget as Node)) closeDropdown();
                  }}
                >
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`navlink ${linkColour} ${active ? "is-active" : ""}`}
                    >
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      aria-label="Show practice areas"
                      aria-expanded={dropdownOpen}
                      aria-controls="practice-menu"
                      onClick={() => setDropdownOpen((v) => !v)}
                      className={`grid h-10 w-8 place-items-center ${linkColour}`}
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`}
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                  <div
                    id="practice-menu"
                    className={`absolute left-1/2 top-full w-[26rem] -translate-x-1/2 pt-3 transition-all duration-300 ${
                      dropdownOpen
                        ? "visible translate-y-0 opacity-100"
                        : "invisible -translate-y-2 opacity-0"
                    }`}
                  >
                    <ul className="border-t-2 border-navy-900 bg-white p-2 shadow-[0_30px_60px_-20px_rgba(5,17,72,0.35)]">
                      {practiceAreas.map((a) => (
                        <li key={a.slug}>
                          <Link
                            href={`/practice-areas/${a.slug}`}
                            tabIndex={dropdownOpen ? 0 : -1}
                            className="group flex items-baseline gap-4 px-4 py-3 text-navy-900 transition-colors hover:bg-navy-50 focus-visible:bg-navy-50"
                          >
                            <span className="w-6 text-xs font-bold text-brand-grey">{a.number}</span>
                            <span className="text-sm font-semibold">{a.shortTitle}</span>
                          </Link>
                        </li>
                      ))}
                      <li className="mt-1 border-t border-line">
                        <Link
                          href="/practice-areas#additional-services"
                          tabIndex={dropdownOpen ? 0 : -1}
                          className="block px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-navy-700 hover:bg-navy-50"
                        >
                          Additional services
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`navlink ${linkColour} ${active ? "is-active" : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/contact#consultation"
            className={`btn ml-4 !min-h-11 !px-5 !py-2.5 ${solid ? "btn-solid" : "btn-light"}`}
          >
            Request a consultation
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className={`relative z-[60] grid h-11 w-11 place-items-center lg:hidden ${menuOpen || !solid ? "text-white" : "text-navy-900"}`}
        >
          {menuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </div>

      {menuOpen &&
        createPortal(
          <div
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="on-dark fixed inset-x-0 top-0 z-[55] h-dvh touch-pan-y overflow-y-scroll overscroll-y-contain bg-navy-950 px-6 pb-10 pt-20 text-white lg:hidden"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <nav aria-label="Mobile">
              <ul className="space-y-1">
                {mainNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={`block border-b border-white/10 py-3.5 text-2xl font-light tracking-tight ${isActive(item.href) ? "font-semibold" : ""}`}
                    >
                      {item.label}
                    </Link>
                    {item.href === "/practice-areas" && (
                      <ul className="mb-3 grid grid-cols-1 gap-x-6 py-2 sm:grid-cols-2">
                        {practiceAreas.map((a) => (
                          <li key={a.slug}>
                            <Link
                              href={`/practice-areas/${a.slug}`}
                              className="flex gap-3 py-2 text-sm text-white/75 hover:text-white"
                            >
                              <span className="font-bold text-white/40">{a.number}</span>
                              {a.shortTitle}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <Link href="/contact#consultation" className="btn btn-light mt-8 w-full">
              Request a consultation
            </Link>

            <div className="mt-8 space-y-3 text-sm">
              {offices.map((o) => (
                <a
                  key={o.id}
                  href={`tel:${o.phones[0].tel}`}
                  className="flex items-center gap-3 border border-white/20 px-4 py-3 text-white"
                >
                  <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>
                    <span className="block text-xs uppercase tracking-[0.14em] text-white/60">
                      {o.name}
                    </span>
                    {o.phones[0].display}
                  </span>
                </a>
              ))}
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 border border-white/20 px-4 py-3 text-white"
              >
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                {site.email}
              </a>
            </div>
          </div>,
          document.body,
        )}

      <style>{`
        .navlink{position:relative;padding:.6rem .85rem;font-size:.8125rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;transition:opacity .3s}
        .navlink::after{content:"";position:absolute;left:.85rem;right:.85rem;bottom:.2rem;height:2px;background:currentColor;transform:scaleX(0);transform-origin:left;transition:transform .45s var(--ease-out-expo)}
        .navlink:hover::after,.navlink.is-active::after{transform:scaleX(1)}
      `}</style>
    </header>
  );
}
