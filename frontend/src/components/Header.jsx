import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { ShoppingBag, X, Search as SearchIcon } from 'lucide-react';

const NAV_LEFT = [
  { to: '/collection', label: 'Collections' },
  { to: '/journal',    label: 'Journal'     },
  { to: '/about',      label: 'About'       },
  { to: '/contact',    label: 'Contact'     },
];

const SERIF = { fontFamily: "'Cormorant Garamond', serif" };

const NAV = {
  fontFamily: "'Inter', sans-serif",
  fontSize: '10px',
  fontWeight: 400,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  cursor: 'pointer',
  background: 'none',
  border: 'none',
  padding: 0,
  WebkitTapHighlightColor: 'transparent',
};

export const Header = ({ onMenuOpen, onCartOpen, isMenuOpen }) => {
  const itemCount  = useCartStore((s) => s.getTotalItems());
  const location   = useLocation();
  const headerRef  = useRef(null);
  const isHidden   = useRef(false);

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => { setSearchOpen(false); setSearchValue(''); }, [location]);

  // Instant & responsive scroll direction logic
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleVisibility = () => {
      // Always hide header if menu or search is open
      if (isMenuOpen || searchOpen) {
        if (!isHidden.current) {
          el.classList.add('header-hidden');
          isHidden.current = true;
        }
        return;
      }

      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;
      
      // A small threshold to keep header visible at the very top
      const AT_TOP_THRESHOLD = 10;
      // A minimal delta to confirm scroll direction and avoid jitter
      const SCROLL_DELTA_THRESHOLD = 0.5;

      // Hide on a small scroll down, but only after passing the top threshold
      if (scrollDelta > SCROLL_DELTA_THRESHOLD && currentScrollY > AT_TOP_THRESHOLD) {
        if (!isHidden.current) {
          el.classList.add('header-hidden');
          isHidden.current = true;
        }
      } 
      // Show on a small scroll up, or if we are at the very top
      else if (scrollDelta < -SCROLL_DELTA_THRESHOLD || currentScrollY <= AT_TOP_THRESHOLD) {
        if (isHidden.current) {
          el.classList.remove('header-hidden');
          isHidden.current = false;
        }
      }
      
      lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleVisibility();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Set initial state
    handleVisibility();

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isMenuOpen, searchOpen]);


  const isActive = (path) => location.pathname === path;

  return (
    <>
      <style>{`
        .floating-header {
          position: fixed;
          top: 16px;
          left: 24px;
          right: 24px;
          z-index: 80;
          background: rgba(10, 10, 10, 0.85);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 9999px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 
                      0 2px 8px rgba(0, 0, 0, 0.2),
                      inset 0 1px 0 rgba(255, 255, 255, 0.05);
          transition: transform 0.2s ease, opacity 0.2s ease;
          will-change: transform, opacity;
        }
        .header-hidden {
          transform: translateY(-150%);
          opacity: 0;
        }
        .nav-link { 
          transition: color 0.15s ease; 
        }
        .nav-link:hover { 
          color: #fff !important; 
        }
        .nav-link.active { 
          color: #fff !important; 
        }
        
        @media (min-width: 1024px) {
          .floating-header {
            left: 48px;
            right: 48px;
          }
        }
      `}</style>

      <header ref={headerRef} className="floating-header">
        {/* ══ DESKTOP ═══════════════════════════════════════════════ */}
        <div className="hidden lg:flex" style={{
          height: '56px',
          alignItems: 'center',
          paddingLeft: '32px',
          paddingRight: '32px',
        }}>
          {/* LEFT — Nav links */}
          <nav style={{ display:'flex', alignItems:'center', gap:'32px', flex:1 }}>
            {NAV_LEFT.map(({ to, label }) => (
              <Link
                key={to} to={to}
                className={`nav-link ${isActive(to) ? 'active' : ''}`}
                style={{
                  ...NAV,
                  color: isActive(to) ? '#fff' : 'rgba(255,255,255,0.6)',
                  position: 'relative',
                }}
              >
                {label}
                {isActive(to) && (
                  <span style={{
                    position: 'absolute', bottom: '-2px', left: '50%',
                    transform: 'translateX(-50%)',
                    width: '4px', height: '4px', borderRadius: '50%',
                    background: '#dc2626',
                  }} />
                )}
              </Link>
            ))}
          </nav>

          {/* CENTER — Logo */}
          <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex', alignItems: 'center',
            pointerEvents: 'none', zIndex: 2,
          }}>
            <Link to="/" style={{ textDecoration:'none', pointerEvents:'all' }}>
              <span style={{
                ...SERIF,
                fontSize: '18px',
                fontWeight: 300,
                letterSpacing: '0.5em',
                textTransform: 'uppercase',
                color: '#fff',
                userSelect: 'none',
              }}>
                NEVO
              </span>
            </Link>
          </div>

          {/* RIGHT — Search / Account / Bag */}
          <div style={{
            display: 'flex', alignItems: 'center',
            gap: '24px', marginLeft: 'auto',
          }}>
            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="nav-link"
              style={{ ...NAV, color: searchOpen ? '#fff' : 'rgba(255,255,255,0.6)', display:'flex', alignItems:'center', gap:'6px' }}
            >
              <SearchIcon style={{ width:'14px', height:'14px', strokeWidth:1.5 }} />
              <span>Search</span>
            </button>

            {/* Divider */}
            <span style={{ width:'1px', height:'12px', background:'rgba(255,255,255,0.15)' }} />

            {/* Account */}
            <Link
              to="/account"
              className="nav-link"
              style={{ ...NAV, color:'rgba(255,255,255,0.6)' }}
            >
              Account
            </Link>

            {/* Bag */}
            <button
              onClick={onCartOpen}
              className="nav-link"
              style={{ ...NAV, color:'rgba(255,255,255,0.6)', display:'flex', alignItems:'center', gap:'6px', position:'relative' }}
            >
              <ShoppingBag style={{ width:'15px', height:'15px', strokeWidth:1.2 }} />
              <span>Bag</span>
              {itemCount > 0 && (
                <span style={{
                  background: '#dc2626', color: '#fff',
                  fontSize: '7px', fontWeight: 700,
                  width: '16px', height: '16px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'absolute', top: '-8px', right: '-8px',
                }}>
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ══ MOBILE ════════════════════════════════════════════════ */}
        <div className="relative flex lg:hidden" style={{
          height:'52px', alignItems:'center',
          justifyContent:'space-between',
          paddingLeft:'20px', paddingRight:'20px',
        }}>
          {/* Hamburger */}
          <button onClick={onMenuOpen} style={{ ...NAV, display:'flex', flexDirection:'column', gap:'5px', zIndex:50 }}>
            {[
              { w:'20px', t: isMenuOpen ? 'translateY(6px) rotate(45deg)' : 'none' },
              { w:'12px', o: isMenuOpen ? 0 : 1 },
              { w:'20px', t: isMenuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none' },
            ].map((s, i) => (
              <span key={i} style={{
                display:'block', height:'1px', background:'#fff',
                width:s.w, transition:'all 0.2s ease',
                transform:s.t, opacity:s.o ?? 1,
              }} />
            ))}
          </button>

          {/* Logo */}
          <Link to="/" style={{ textDecoration:'none', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
            <span style={{
              ...SERIF, fontSize:'16px', fontWeight:300,
              letterSpacing:'0.4em', textTransform:'uppercase',
              color:'#fff',
            }}>
              NEVO
            </span>
          </Link>

          {/* Icons */}
          <div style={{ display:'flex', alignItems:'center', gap:'16px', zIndex:50, marginLeft: 'auto' }}>
            <button onClick={() => setSearchOpen(true)} style={{ ...NAV, color:'rgba(255,255,255,0.7)' }}>
              <SearchIcon style={{ width:'16px', height:'16px', strokeWidth:1.5 }} />
            </button>
            <button onClick={onCartOpen} style={{ ...NAV, color:'rgba(255,255,255,0.7)', position:'relative' }}>
              <ShoppingBag style={{ width:'17px', height:'17px', strokeWidth:1.2 }} />
              {itemCount > 0 && (
                <span style={{
                  position:'absolute', top:'-6px', right:'-6px',
                  background:'#dc2626', color:'#fff',
                  fontSize:'7px', fontWeight:700,
                  width:'14px', height:'14px', borderRadius:'50%',
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}>
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ── SEARCH OVERLAY (Mobile) ───────────────────────────────── */}
      {searchOpen && (
        <div className="lg:hidden" style={{
          position:'fixed', inset:0, zIndex:200,
          background:'rgba(3,3,3,0.98)', backdropFilter:'blur(20px)',
          flexDirection:'column', alignItems:'center',
          justifyContent:'flex-start',
          paddingTop:'120px', paddingLeft:'24px', paddingRight:'24px',
        }}>
          <button
            onClick={() => { setSearchOpen(false); setSearchValue(''); }}
            style={{ ...NAV, position:'absolute', top:'24px', right:'24px', color:'rgba(255,255,255,0.4)' }}
          >
            <X style={{ width:'22px', height:'22px', strokeWidth:1.2 }} />
          </button>

          <p style={{ ...NAV, fontSize:'8px', color:'rgba(255,255,255,0.25)', marginBottom:'32px', letterSpacing:'0.3em' }}>
            SEARCH
          </p>

          <div style={{ width:'100%', maxWidth:'480px' }}>
            <input
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              onKeyDown={e => e.key === 'Escape' && setSearchOpen(false)}
              autoFocus
              placeholder="Enter keyword..."
              style={{
                width:'100%', background:'rgba(255,255,255,0.03)',
                border:'1px solid rgba(255,255,255,0.1)',
                borderRadius:'12px',
                outline:'none', color:'#fff',
                padding:'16px 20px',
                ...SERIF, fontSize:'20px', fontWeight:300,
                boxSizing:'border-box',
              }}
            />
          </div>
        </div>
      )}

      {/* ── SEARCH OVERLAY (Desktop - Modal) ──────────────────────── */}
      {searchOpen && (
        <div className="hidden lg:block" style={{
          position:'fixed', inset:0, zIndex:200,
          background:'rgba(3,3,3,0.96)', backdropFilter:'blur(20px)',
          flexDirection:'column', alignItems:'center',
          justifyContent:'center',
        }}>
          <button
            onClick={() => { setSearchOpen(false); setSearchValue(''); }}
            style={{ ...NAV, position:'absolute', top:'32px', right:'40px', color:'rgba(255,255,255,0.4)' }}
          >
            <X style={{ width:'24px', height:'24px', strokeWidth:1.2 }} />
          </button>

          <p style={{ ...NAV, fontSize:'9px', color:'rgba(255,255,255,0.25)', marginBottom:'40px', letterSpacing:'0.4em' }}>
            ENTER KEYWORD
          </p>

          <div style={{ width:'100%', maxWidth:'640px', paddingHorizontal:'40px' }}>
            <input
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              onKeyDown={e => e.key === 'Escape' && setSearchOpen(false)}
              autoFocus
              placeholder="Search products, collections..."
              style={{
                width:'100%', background:'rgba(255,255,255,0.03)',
                border:'1px solid rgba(255,255,255,0.12)',
                borderRadius:'16px',
                outline:'none', color:'#fff',
                padding:'20px 28px',
                ...SERIF, fontSize:'24px', fontWeight:300,
                boxSizing:'border-box',
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};
