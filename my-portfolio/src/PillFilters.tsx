import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

export type PillFilterItem = {
  label: string;
  value: string; // unique id for filter state
  href?: string; // optional navigation fallback (keeps backwards compatibility)
  ariaLabel?: string;
  onClick?: () => void; // optional per-item filter handler
};

export interface PillFilterProps {
  logo: string;
  logoAlt?: string;
  items: PillFilterItem[];
  activeValue?: string; // currently active filter value (controlled)
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  onMobileMenuClick?: () => void;
  initialLoadAnimation?: boolean;
  onFilter?: (value?: string) => void; // parent-level handler when a filter is applied or cleared
}

const PillFilters: React.FC<PillFilterProps> = ({
  logo,
  logoAlt = 'Logo',
  items,
  activeValue,
  className = '',
  ease = 'power3.easeOut',
  baseColor = '#fff',
  pillColor = '#060010',
  hoveredPillTextColor = '#060010',
  pillTextColor,
  // onMobileMenuClick,
  initialLoadAnimation = true,
  onFilter
}) => {
  const resolvedPillTextColor = pillTextColor ?? baseColor;

  // state that tracks whether the filter panel is visible (mobile + desktop)
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);

  // uncontrolled selected value (only used when activeValue prop is not passed)
  const [selected, setSelected] = useState<string | undefined>(activeValue);

  // keep controlled prop in sync if provided
  useEffect(() => {
    if (typeof activeValue !== 'undefined') setSelected(activeValue);
  }, [activeValue]);

  // Refs & GSAP timelines for current pill hover behavior (kept intact)
  const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const tlRefs = useRef<Array<gsap.core.Timeline | null>>([]);
  const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([]);
  const logoImgRef = useRef<HTMLImageElement | null>(null);
  const logoTweenRef = useRef<gsap.core.Tween | null>(null);

  // new refs for containers we animate show/hide
  const navItemsRef = useRef<HTMLDivElement | null>(null); // desktop pills container
  const mobileMenuRef = useRef<HTMLDivElement | null>(null); // mobile dropdown

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach(circle => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement as HTMLElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`
        });

        const label = pill.querySelector<HTMLElement>('.pill-label');
        const white = pill.querySelector<HTMLElement>('.pill-label-hover');

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        const index = circleRefs.current.indexOf(circle);
        if (index === -1) return;

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: 'auto' }, 0);

        if (label) {
          tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0);
        }

        if (white) {
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(white, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0);
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();
    const onResize = () => layout();
    window.addEventListener('resize', onResize);
    if (document.fonts) {
      document.fonts.ready.then(layout).catch(() => {});
    }

    // initial load show animation for desktop nav (if requested)
    if (initialLoadAnimation && navItemsRef.current) {
      gsap.set(navItemsRef.current, { xPercent: isFiltersOpen ? 0 : -110, opacity: isFiltersOpen ? 1 : 0, overflow: 'hidden' });
      gsap.to(navItemsRef.current, { xPercent: isFiltersOpen ? 0 : -110, opacity: isFiltersOpen ? 1 : 0, duration: 0.6, ease });
    }

    // hide mobile menu at start
    const mobile = mobileMenuRef.current;
    if (mobile) gsap.set(mobile, { visibility: 'hidden', opacity: 0, y: 6 });

    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, initialLoadAnimation]);

  // animate show/hide of panels when toggling isFiltersOpen
  useEffect(() => {
    const nav = navItemsRef.current;
    const mobile = mobileMenuRef.current;

    // Desktop: animate navItemsRef sliding in/out (only meaningful on md+ where it's visible)
    if (nav) {
      if (isFiltersOpen) {
        gsap.killTweensOf(nav);
        gsap.set(nav, { visibility: 'visible' });
        gsap.fromTo(nav, { xPercent: -110, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.35, ease });
      } else {
        gsap.killTweensOf(nav);
        gsap.to(nav, {
          xPercent: -110,
          opacity: 0,
          duration: 0.28,
          ease,
          onComplete: () => {
            // keep it hidden visually but maintain layout if you want; set visibility hidden so it doesn't capture pointer
            gsap.set(nav, { visibility: 'hidden' });
          }
        });
      }
    }

    // Mobile: animate mobile menu down/up under logo
    if (mobile) {
      if (isFiltersOpen) {
        gsap.killTweensOf(mobile);
        gsap.set(mobile, { visibility: 'visible' });
        gsap.fromTo(mobile, { y: -6, opacity: 0 }, { y: 0, opacity: 1, duration: 0.28, ease });
      } else {
        gsap.killTweensOf(mobile);
        gsap.to(mobile, {
          y: -6,
          opacity: 0,
          duration: 0.2,
          ease,
          onComplete: () => {
            gsap.set(mobile, { visibility: 'hidden' });
          }
        });
      }
    }
  }, [isFiltersOpen, ease]);

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: 'auto'
    });
  };

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: 'auto'
    });
  };

  const handleLogoEnter = () => {
    const img = logoImgRef.current;
    if (!img) return;
    logoTweenRef.current?.kill();
    gsap.set(img, { rotate: 0 });
    logoTweenRef.current = gsap.to(img, {
      rotate: 360,
      duration: 0.2,
      ease,
      overwrite: 'auto'
    });
  };

  const isExternalLink = (href: string) =>
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('//') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('#');

  const isRouterLink = (href?: string) => href && !isExternalLink(href);

  // click a filter item: call its onClick, parent onFilter, and update selected state (single active)
  const handleItemClick = (item: PillFilterItem) => {
    const wasActive = selected === item.value;

    // call item handler
    item.onClick?.();

    // if controlled via prop, parent should update; we still call onFilter
    if (wasActive) {
      // clicking same item toggles it off
      onFilter?.(undefined);
      if (typeof activeValue === 'undefined') setSelected(undefined);
    } else {
      onFilter?.(item.value);
      if (typeof activeValue === 'undefined') setSelected(item.value);
    }

    // On mobile auto-close after selection (common UX)
    // If you prefer not to auto-close on mobile, remove this
    const mobileQuery = window.matchMedia('(max-width: 767px)');
    if (mobileQuery.matches) setIsFiltersOpen(false);
  };

  const cssVars = {
    ['--base']: baseColor,
    ['--pill-bg']: pillColor,
    ['--hover-text']: hoveredPillTextColor,
    ['--pill-text']: resolvedPillTextColor,
    ['--nav-h']: '42px',
    ['--logo']: '36px',
    ['--pill-pad-x']: '18px',
    ['--pill-gap']: '3px'
  } as React.CSSProperties;

  // Logo background color: green when filters shown, white when hidden (matches your request)
  const logoBackground = isFiltersOpen ? '#4ee1a0' : '#ffffff';

  return (
    <div className="relative top-[1em] z-[1000] w-full left-0 md:w-auto md:left-auto">
      <nav
        className={`w-full md:w-max flex items-center justify-between md:justify-start box-border px-4 md:px-0 ${className}`}
        aria-label="Primary"
        style={cssVars}
      >
        {/* Logo acts as toggle button (mobile + desktop) */}
        <button
          type="button"
          aria-label="Toggle filters"
          onMouseEnter={handleLogoEnter}
          onClick={() => setIsFiltersOpen(s => !s)}
          ref={el => {
            // store for the logo interactions
            logoImgRef.current = logoImgRef.current ?? (el?.querySelector('img') as HTMLImageElement | null);
          }}
          className="rounded-full p-2 inline-flex items-center justify-center overflow-hidden"
          style={{
            width: 'var(--nav-h)',
            height: 'var(--nav-h)',
            background: logoBackground
          }}
        >
          <img src={logo} alt={logoAlt} className="w-full h-full object-cover block" />
        </button>

        {/* DESKTOP pills container — visible md+ and animated in/out */}
        <div
          ref={navItemsRef}
          className="relative items-center rounded-full hidden md:flex ml-2"
          style={{
            height: 'var(--nav-h)',
            background: 'var(--base, #000)',
            // ensure transform is used
            transform: 'translate3d(0,0,0)'
          }}
        >
          <ul role="menubar" className="list-none flex items-stretch m-0 p-[3px] h-full" style={{ gap: 'var(--pill-gap)' }}>
            {items.map((item, i) => {
              const isActive = selected === item.value;

              const pillStyle: React.CSSProperties = {
                background: 'var(--pill-bg, #fff)',
                color: 'var(--pill-text, var(--base, #000))',
                paddingLeft: 'var(--pill-pad-x)',
                paddingRight: 'var(--pill-pad-x)'
              };

              const PillContent = (
                <>
                  <span
                    className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                    style={{
                      background: 'var(--base, #000)',
                      willChange: 'transform'
                    }}
                    aria-hidden="true"
                    ref={el => {
                      circleRefs.current[i] = el;
                    }}
                  />
                  <span className="label-stack relative inline-block leading-[1] z-[2]">
                    <span className="pill-label relative z-[2] inline-block leading-[1]" style={{ willChange: 'transform' }}>
                      {item.label}
                    </span>
                    <span
                      className="pill-label-hover absolute left-0 top-0 z-[3] inline-block"
                      style={{
                        color: 'var(--hover-text, #fff)',
                        willChange: 'transform, opacity'
                      }}
                      aria-hidden="true"
                    >
                      {item.label}
                    </span>
                  </span>
                  {isActive && (
                    <span className="absolute left-1/2 -bottom-[6px] -translate-x-1/2 w-3 h-3 rounded-full z-[4]" style={{ background: 'var(--base, #000)' }} aria-hidden="true" />
                  )}
                </>
              );

              const basePillClasses =
                'relative overflow-hidden inline-flex items-center justify-center h-full no-underline rounded-full box-border font-semibold text-[16px] leading-[0] uppercase tracking-[0.2px] whitespace-nowrap cursor-pointer px-0';

              const key = item.value || item.href || i.toString();

              // Render as button (filters) or links (backwards compatibility)
              if (item.href) {
                if (isRouterLink(item.href)) {
                  return (
                    <li key={key} role="none" className="flex h-full">
                      <Link
                        role="menuitem"
                        to={item.href}
                        className={basePillClasses}
                        style={pillStyle}
                        aria-label={item.ariaLabel || item.label}
                        onMouseEnter={() => handleEnter(i)}
                        onMouseLeave={() => handleLeave(i)}
                        onClick={() => handleItemClick(item)}
                      >
                        {PillContent}
                      </Link>
                    </li>
                  );
                } else {
                  return (
                    <li key={key} role="none" className="flex h-full">
                      <a
                        role="menuitem"
                        href={item.href}
                        className={basePillClasses}
                        style={pillStyle}
                        aria-label={item.ariaLabel || item.label}
                        onMouseEnter={() => handleEnter(i)}
                        onMouseLeave={() => handleLeave(i)}
                        onClick={() => {
                          handleItemClick(item);
                        }}
                      >
                        {PillContent}
                      </a>
                    </li>
                  );
                }
              }

              return (
                <li key={key} role="none" className="flex h-full">
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => handleItemClick(item)}
                    className={basePillClasses}
                    style={{
                      ...pillStyle,
                      // indicate active state visually (optional)
                      boxShadow: selected === item.value ? 'inset 0 0 0 2px rgba(0,0,0,0.06)' : undefined
                    }}
                    aria-pressed={selected === item.value}
                    aria-label={item.ariaLabel || item.label}
                    onMouseEnter={() => handleEnter(i)}
                    onMouseLeave={() => handleLeave(i)}
                  >
                    {PillContent}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* NOTE: removed hamburger; logo is the toggle now */}
      </nav>

      {/* MOBILE dropdown (opens under logo). Buttons inside are full width */}
      <div
        ref={mobileMenuRef}
        className="md:hidden absolute left-4 right-4 rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] z-[998] origin-top"
        style={{
          ...cssVars,
          // place right under nav by using calc(var(--nav-h) + 0.25rem)
          top: 'calc(var(--nav-h) + 0.5rem)',
          background: 'var(--base, #f0f0f0)',
          // keep transform GPU-accelerated
          transform: 'translate3d(0,0,0)'
        }}
      >
        <ul className="list-none m-0 p-[6px] flex flex-col gap-[6px]">
          {items.map(item => {
            const defaultStyle: React.CSSProperties = {
              background: 'var(--pill-bg, #fff)',
              color: 'var(--pill-text, #000)',
              width: '100%'
            };

            const hoverIn = (e: React.MouseEvent<HTMLElement>) => {
              (e.currentTarget as HTMLElement).style.background = 'var(--base)';
              (e.currentTarget as HTMLElement).style.color = 'var(--hover-text, #fff)';
            };
            const hoverOut = (e: React.MouseEvent<HTMLElement>) => {
              (e.currentTarget as HTMLElement).style.background = 'var(--pill-bg, #fff)';
              (e.currentTarget as HTMLElement).style.color = 'var(--pill-text, #000)';
            };

            // full width link/button classes
            const linkClasses =
              'block w-full text-center py-3 px-4 text-[16px] font-medium rounded-[10px] transition-all duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)]';

            const key = item.value || item.href || item.label;

            if (item.href) {
              if (isRouterLink(item.href)) {
                return (
                  <li key={key}>
                    <Link
                      to={item.href}
                      className={linkClasses}
                      style={defaultStyle}
                      onMouseEnter={hoverIn}
                      onMouseLeave={hoverOut}
                      onClick={() => {
                        handleItemClick(item);
                      }}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              } else {
                return (
                  <li key={key}>
                    <a
                      href={item.href}
                      className={linkClasses}
                      style={defaultStyle}
                      onMouseEnter={hoverIn}
                      onMouseLeave={hoverOut}
                      onClick={() => {
                        handleItemClick(item);
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              }
            }

            return (
              <li key={key}>
                <button
                  type="button"
                  className={linkClasses}
                  style={defaultStyle}
                  onMouseEnter={hoverIn}
                  onMouseLeave={hoverOut}
                  onClick={() => {
                    handleItemClick(item);
                  }}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default PillFilters;
