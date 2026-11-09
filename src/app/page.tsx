'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { BRAND_CONFIG } from '@/lib/brand';

export default function HomePage() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [storyModalOpen, setStoryModalOpen] = useState(false);

  // Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // Counters State
  const [countersAnimated, setCountersAnimated] = useState(false);
  const [counts, setCounts] = useState({
    meals: 0,
    water: 0,
    volunteers: 0,
    aid: 0,
  });

  // Progress Bars State
  const [progressVisible, setProgressVisible] = useState(false);

  const impactRef = useRef<HTMLDivElement>(null);
  const causesRef = useRef<HTMLDivElement>(null);

  // Handle Scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 40);
      setShowScrollTop(scrollY > 420);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for Counters
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !countersAnimated) {
          setCountersAnimated(true);
          const duration = 1600;
          const steps = 40;
          const intervalTime = duration / steps;
          let currentStep = 0;

          const targets = {
            meals: 184000,
            water: 52300,
            volunteers: 3800,
            aid: 24800000000, // Rp 24,8 Miliar
          };

          const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            setCounts({
              meals: Math.round(targets.meals * progress),
              water: Math.round(targets.water * progress),
              volunteers: Math.round(targets.volunteers * progress),
              aid: Math.round(targets.aid * progress),
            });

            if (currentStep >= steps) {
              setCounts(targets);
              clearInterval(timer);
            }
          }, intervalTime);
        }
      },
      { threshold: 0.25 }
    );

    if (impactRef.current) {
      observer.observe(impactRef.current);
    }

    return () => observer.disconnect();
  }, [countersAnimated]);

  // Intersection Observer for Progress Bars
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setProgressVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (causesRef.current) {
      observer.observe(causesRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Scroll to Top Handler
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll to Section
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
    e.preventDefault();
    setNavOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Contact Form Submit Handler
  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setFormSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <>
      {/* ====================================================================
          NAVBAR — Clean Full-Width Desktop & Mobile Drawer
          ==================================================================== */}
      <nav className={`hj-nav ${scrolled ? 'hj-nav-scrolled' : ''}`}>
        <div className="hj-container hj-nav-inner">
          <a
            className="hj-logo"
            href="#home"
            onClick={(e) => scrollToSection(e, 'home')}
          >
            <span className="hj-logo-mark">
              <i className="bi bi-shield-check"></i>
            </span>
            <span>
              {BRAND_CONFIG.shortName}<span className="dot">.</span>
            </span>
          </a>

          <button
            className="hj-nav-toggle"
            id="hjNavToggle"
            aria-label="Buka menu navigasi"
            onClick={() => setNavOpen(!navOpen)}
          >
            <i className={`bi ${navOpen ? 'bi-x-lg' : 'bi-list'}`}></i>
          </button>

          <ul className={`hj-nav-links ${navOpen ? 'hj-open' : ''}`} id="hjNavLinks">
            <li>
              <a href="#home" onClick={(e) => scrollToSection(e, 'home')}>
                Beranda
              </a>
            </li>
            <li>
              <a href="#about" onClick={(e) => scrollToSection(e, 'about')}>
                Tentang
              </a>
            </li>
            <li>
              <a href="#causes" onClick={(e) => scrollToSection(e, 'causes')}>
                Inisiatif
              </a>
            </li>
            <li>
              <a href="#impact" onClick={(e) => scrollToSection(e, 'impact')}>
                Dampak
              </a>
            </li>
            <li>
              <a href="#volunteers" onClick={(e) => scrollToSection(e, 'volunteers')}>
                Relawan
              </a>
            </li>
            <li>
              <a href="#testimonials" onClick={(e) => scrollToSection(e, 'testimonials')}>
                Cerita
              </a>
            </li>
            <li>
              <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>
                Kontak
              </a>
            </li>
          </ul>

          <a
            href="#causes"
            className="hj-btn hj-btn-primary hj-nav-cta af-btn-coral"
            onClick={(e) => scrollToSection(e, 'causes')}
          >
            Donasi Sekarang <i className="bi bi-arrow-right"></i>
          </a>
        </div>
      </nav>

      {/* ====================================================================
          HERO — Mixed Full-Width Editorial Layout
          ==================================================================== */}
      <header className="hj-hero af-hero-wide" id="home">
        <div className="hj-container">
          <div className="hj-hero-grid">
            <div>
              <div className="d-flex align-items-center gap-3 mb-3 flex-wrap">
                <span className="hj-eyebrow">
                  <i className="bi bi-upc-scan"></i> No. Pelacakan AF-2026-04471
                </span>
                <span className="af-badge-demo">
                  <i className="bi bi-info-circle-fill"></i> DEMO SHOWCASE
                </span>
              </div>

              <h1 className="hj-h1 mt-3">
                Setiap bantuan dikirim dengan <em>bukti pengiriman.</em>
              </h1>

              <p className="hj-lede mt-3" style={{ color: 'var(--af-navy-soft)' }}>
                {BRAND_CONFIG.name} menghubungkan donatur langsung dengan inisiatif sosial dan kemanusiaan terverifikasi di lapangan — pangan, air bersih, pendidikan, dan kesehatan — lengkap dengan bukti tanda terima teraudit untuk setiap rupiah yang tersalurkan.
              </p>

              {/* 3-Step Manifest Route Line */}
              <div className="hj-route my-4">
                <div className="hj-route-stop">
                  <span className="hj-route-dot" style={{ background: 'var(--af-coral)' }}></span> Donasi Anda
                </div>
                <span className="hj-route-dash"></span>
                <div className="hj-route-stop">
                  <span className="hj-route-dot" style={{ background: 'var(--af-gold)' }}></span> Mitra Terverifikasi
                </div>
                <span className="hj-route-dash"></span>
                <div className="hj-route-stop">
                  <span className="hj-route-dot" style={{ background: 'var(--af-navy)' }}></span> Penerima Tervalidasi
                </div>
              </div>

              <div className="d-flex flex-wrap gap-3 align-items-center">
                <a
                  href="#causes"
                  className="hj-btn hj-btn-primary af-btn-coral"
                  id="hjHeroDonate"
                  onClick={(e) => scrollToSection(e, 'causes')}
                >
                  Donasi Sekarang <i className="bi bi-arrow-right"></i>
                </a>
                <button
                  type="button"
                  className="hj-btn hj-btn-outline"
                  onClick={() => setStoryModalOpen(true)}
                >
                  <i className="bi bi-play-circle text-danger"></i> Tonton Kisah Lapangan
                </button>
              </div>

              {/* Hero Stats */}
              <div className="hj-hero-stats mt-4 pt-2">
                <div className="hj-hero-stat">
                  <b style={{ color: 'var(--af-navy)' }}>12.600+</b>
                  <span>Donatur Terdaftar</span>
                </div>
                <div className="hj-hero-stat">
                  <b style={{ color: 'var(--af-navy)' }}>40</b>
                  <span>Wilayah Binaan</span>
                </div>
                <div className="hj-hero-stat">
                  <b style={{ color: 'var(--af-coral)' }}>100%</b>
                  <span>Bantuan Tervalidasi (DEMO)</span>
                </div>
              </div>
            </div>

            {/* Asymmetric Hero Manifest Card */}
            <div className="hj-hero-media">
              <div className="hj-manifest-card" style={{ borderColor: 'var(--af-line)' }}>
                <div className="hj-manifest-photo">
                  <img
                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900&h=1000&fit=crop&auto=format"
                    alt="Penerima manfaat program pangan Aurelia Foundation"
                    loading="lazy"
                  />
                </div>
                <div className="hj-postmark" style={{ borderColor: 'var(--af-coral)', color: 'var(--af-coral)' }}>
                  <i className="bi bi-patch-check-fill"></i>
                  Aurelia<br />Tervalidasi
                </div>
                <div className="hj-tracking-tag" style={{ borderLeft: '4px solid var(--af-coral)' }}>
                  <i className="bi bi-cup-hot-fill" style={{ color: 'var(--af-coral)' }}></i>
                  <div>
                    <div className="lbl">Disalurkan Hari Ini</div>
                    <div className="val">42.180 Porsi Makanan</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ====================================================================
          IMPACT COUNTERS — Wide Horizontal Contrast Strip (Mist Blue Band)
          ==================================================================== */}
      <section className="af-impact-strip" id="impact" ref={impactRef}>
        <div className="hj-container">
          <div className="hj-ledger">
            <div className="hj-ledger-item">
              <div className="hj-ledger-label" style={{ color: 'var(--af-gold)' }}>
                <i className="bi bi-box2-heart"></i> Porsi Makanan Disalurkan
              </div>
              <div className="hj-counter" data-target="184000">
                {counts.meals.toLocaleString('id-ID')}+
              </div>
              <div className="hj-ledger-sub">Distribusi pangan bergizi anak &amp; lansia</div>
            </div>

            <div className="hj-ledger-item">
              <div className="hj-ledger-label" style={{ color: 'var(--af-gold)' }}>
                <i className="bi bi-droplet-fill"></i> Akses Air Bersih (Jiwa)
              </div>
              <div className="hj-counter" data-target="52300">
                {counts.water.toLocaleString('id-ID')}+
              </div>
              <div className="hj-ledger-sub">Fasilitas sumur surya &amp; filter pipa</div>
            </div>

            <div className="hj-ledger-item">
              <div className="hj-ledger-label" style={{ color: 'var(--af-gold)' }}>
                <i className="bi bi-people-fill"></i> Jam Relawan Lapangan
              </div>
              <div className="hj-counter" data-target="3800">
                {counts.volunteers.toLocaleString('id-ID')}+
              </div>
              <div className="hj-ledger-sub">Koordinator &amp; tenaga medis tersertifikasi</div>
            </div>

            <div className="hj-ledger-item">
              <div className="hj-ledger-label" style={{ color: 'var(--af-gold)' }}>
                <i className="bi bi-shield-check"></i> Total Bantuan Tersalurkan
              </div>
              <div className="hj-counter" data-target="24800000000">
                Rp {(counts.aid / 1000000000).toFixed(1)} Miliar
              </div>
              <div className="hj-ledger-sub">Audit terbuka &amp; terverifikasi (DEMO)</div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          ABOUT — Controlled Editorial Container on Warm Ivory
          ==================================================================== */}
      <section className="hj-section af-bg-ivory" id="about">
        <div className="hj-container">
          <div className="hj-about-grid">
            <div className="hj-about-collage">
              <div className="hj-collage-main">
                <img
                  src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&h=650&fit=crop&auto=format"
                  alt="Tim relawan lapangan Aurelia Foundation menyalurkan bantuan"
                  loading="lazy"
                />
              </div>
              <div className="hj-collage-badge" style={{ borderColor: 'var(--af-line)' }}>
                <div className="ring" style={{ background: 'var(--af-coral)', color: '#fff' }}>13th</div>
                <div>
                  <div style={{ fontFamily: 'var(--hj-font-display)', fontWeight: 600 }}>
                    Inisiatif Terpercaya
                  </div>
                  <div style={{ color: 'var(--af-muted)', fontSize: '.8rem' }}>
                    Sejak 2013 · 40 Wilayah Binaan
                  </div>
                </div>
              </div>
            </div>

            <div>
              <span className="hj-eyebrow">
                <i className="bi bi-journal-check"></i> Jalur Transparansi &amp; Akuntabilitas
              </span>
              <h2 className="hj-h2 mt-3" style={{ color: 'var(--af-navy)' }}>
                Kebaikan lebih bermakna saat dapat dibuktikan.
              </h2>
              <p className="hj-lede mt-3" style={{ color: 'var(--af-navy-soft)' }}>
                {BRAND_CONFIG.name} berawal dari satu posko kesehatan darurat di pelosok dan berkembang menjadi jejaring filantropi modern di 40 wilayah binaan — tanpa pernah menghilangkan bukti catatan antara donatur dan pintu penerima manfaat.
              </p>
              <ul className="hj-checklist mt-4">
                <li>
                  <span className="box" style={{ background: 'var(--af-coral-light)', color: 'var(--af-coral)' }}>
                    <i className="bi bi-check-lg"></i>
                  </span>
                  <div>
                    <strong>Transparansi Radikal</strong>
                    <p>Lacak donasi Anda dari rekening pengirim, gudang logistik, hingga serah terima di lapangan.</p>
                  </div>
                </li>
                <li>
                  <span className="box" style={{ background: 'var(--af-coral-light)', color: 'var(--af-coral)' }}>
                    <i className="bi bi-check-lg"></i>
                  </span>
                  <div>
                    <strong>Mitra Lapangan Terakreditasi</strong>
                    <p>Setiap mitra komunitas melewati audit kelaikan kepatuhan dan integritas tahunan.</p>
                  </div>
                </li>
                <li>
                  <span className="box" style={{ background: 'var(--af-coral-light)', color: 'var(--af-coral)' }}>
                    <i className="bi bi-check-lg"></i>
                  </span>
                  <div>
                    <strong>Jangkauan Garis Depan Langsung</strong>
                    <p>Koordinator komunitas tinggal berdampingan dengan warga yang dilayani, bukan dari meja kantor yang jauh.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          CAUSES (OPEN MANIFESTS) — Dynamic Multi-Column Grid on White Canvas
          ==================================================================== */}
      <section
        className="hj-section af-causes-surface"
        id="causes"
        ref={causesRef}
      >
        <div className="hj-container">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '680px' }}>
            <div className="d-flex justify-content-center align-items-center gap-2 mb-2">
              <span className="hj-eyebrow">
                <i className="bi bi-mailbox2"></i> Manifest Terbuka — Inisiatif Aktif
              </span>
              <span className="af-badge-demo">SIMULASI</span>
            </div>
            <h2 className="hj-h2 mt-2" style={{ color: 'var(--af-navy)' }}>
              Inisiatif yang membutuhkan dukungan Anda
            </h2>
            <p className="hj-lede mx-auto mt-2" style={{ color: 'var(--af-muted)' }}>
              Setiap program di bawah ini diverifikasi secara independen dan diperbarui mingguan dengan catatan mutasi dan bukti serah terima di lapangan.
            </p>
          </div>

          <div className="row g-4">
            {/* Inisiatif 1 — Pangan */}
            <div className="col-md-6 col-lg-4">
              <div className="hj-postcard">
                <div className="hj-postcard-img">
                  <img
                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=420&fit=crop&auto=format"
                    alt="Paket Pangan Bergizi untuk 500 Anak Sekolah di Daerah Terluar"
                    loading="lazy"
                  />
                  <span className="hj-postcard-stamp" style={{ background: 'var(--af-navy)' }}>
                    Bantuan Pangan
                  </span>
                </div>
                <div className="hj-postcard-body">
                  <h5>Paket Pangan Bergizi untuk 500 Siswa</h5>
                  <p>Makan siang bernutrisi dan paket sembako untuk keluarga rentan di distrik terluar.</p>
                  <div className="hj-route-track">
                    <div
                      className="hj-route-fill"
                      style={{ width: progressVisible ? '78%' : '0%' }}
                    ></div>
                  </div>
                  <div className="hj-postcard-meta">
                    <span style={{ color: 'var(--af-coral)', fontWeight: 700 }}>Rp 234 Jt terkumpul</span>
                    <span>Target: Rp 300 Jt</span>
                  </div>
                  <button
                    className="hj-postcard-donate"
                    onClick={(e) => scrollToSection(e, 'contact')}
                  >
                    Salurkan Bantuan <i className="bi bi-arrow-right ms-1"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Inisiatif 2 — Air Bersih / Lingkungan */}
            <div className="col-md-6 col-lg-4">
              <div className="hj-postcard">
                <div className="hj-postcard-img">
                  <img
                    src="https://images.unsplash.com/photo-1541692641319-981cc79ee10a?w=600&h=420&fit=crop&auto=format"
                    alt="Sumur Bor Tenaga Surya untuk 12 Desa Kekeringan"
                    loading="lazy"
                  />
                  <span className="hj-postcard-stamp" style={{ background: 'var(--af-navy)' }}>
                    Lingkungan
                  </span>
                </div>
                <div className="hj-postcard-body">
                  <h5>Sumur Bor Surya untuk 12 Desa</h5>
                  <p>Pembangunan akses air bersih tenaga surya di kawasan rawan kekeringan musiman.</p>
                  <div className="hj-route-track">
                    <div
                      className="hj-route-fill"
                      style={{ width: progressVisible ? '55%' : '0%' }}
                    ></div>
                  </div>
                  <div className="hj-postcard-meta">
                    <span style={{ color: 'var(--af-coral)', fontWeight: 700 }}>Rp 165 Jt terkumpul</span>
                    <span>Target: Rp 300 Jt</span>
                  </div>
                  <button
                    className="hj-postcard-donate"
                    onClick={(e) => scrollToSection(e, 'contact')}
                  >
                    Salurkan Bantuan <i className="bi bi-arrow-right ms-1"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Inisiatif 3 — Pendidikan */}
            <div className="col-md-6 col-lg-4">
              <div className="hj-postcard">
                <div className="hj-postcard-img">
                  <img
                    src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=420&fit=crop&auto=format"
                    alt="Paket Buku Cerita & Seragam untuk 800 Siswa Pesisir"
                    loading="lazy"
                  />
                  <span className="hj-postcard-stamp" style={{ background: 'var(--af-navy)' }}>
                    Pendidikan
                  </span>
                </div>
                <div className="hj-postcard-body">
                  <h5>Buku &amp; Tas Sekolah untuk 800 Anak</h5>
                  <p>Paket seragam lengkap, buku cerita bergambar, dan modul belajar tahun ajaran baru.</p>
                  <div className="hj-route-track">
                    <div
                      className="hj-route-fill"
                      style={{ width: progressVisible ? '92%' : '0%' }}
                    ></div>
                  </div>
                  <div className="hj-postcard-meta">
                    <span style={{ color: 'var(--af-coral)', fontWeight: 700 }}>Rp 184 Jt terkumpul</span>
                    <span>Target: Rp 200 Jt</span>
                  </div>
                  <button
                    className="hj-postcard-donate"
                    onClick={(e) => scrollToSection(e, 'contact')}
                  >
                    Salurkan Bantuan <i className="bi bi-arrow-right ms-1"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Inisiatif 4 — Kesehatan */}
            <div className="col-md-6 col-lg-4">
              <div className="hj-postcard">
                <div className="hj-postcard-img">
                  <img
                    src="https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&h=420&fit=crop&auto=format"
                    alt="Klinik Bergerak & Pemeriksaan Medis Kepulauan"
                    loading="lazy"
                  />
                  <span className="hj-postcard-stamp" style={{ background: 'var(--af-navy)' }}>
                    Kesehatan
                  </span>
                </div>
                <div className="hj-postcard-body">
                  <h5>Klinik Keliling &amp; Nutrisi Ibu Hamil</h5>
                  <p>Pemeriksaan kesehatan gratis, USG portabel, dan suplemen mikronutrien rutin.</p>
                  <div className="hj-route-track">
                    <div
                      className="hj-route-fill"
                      style={{ width: progressVisible ? '41%' : '0%' }}
                    ></div>
                  </div>
                  <div className="hj-postcard-meta">
                    <span style={{ color: 'var(--af-coral)', fontWeight: 700 }}>Rp 123 Jt terkumpul</span>
                    <span>Target: Rp 300 Jt</span>
                  </div>
                  <button
                    className="hj-postcard-donate"
                    onClick={(e) => scrollToSection(e, 'contact')}
                  >
                    Salurkan Bantuan <i className="bi bi-arrow-right ms-1"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Inisiatif 5 — Tanggap Bencana */}
            <div className="col-md-6 col-lg-4">
              <div className="hj-postcard">
                <div className="hj-postcard-img">
                  <img
                    src="https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=600&h=420&fit=crop&auto=format"
                    alt="Dana Tanggap Darurat & Dapur Umum Banjir"
                    loading="lazy"
                  />
                  <span className="hj-postcard-stamp" style={{ background: 'var(--af-navy)' }}>
                    Tanggap Bencana
                  </span>
                </div>
                <div className="hj-postcard-body">
                  <h5>Dapur Darurat &amp; Logistik Pengungsi</h5>
                  <p>Tenda darurat, selimut higienis, dan dapur umum siap saji bagi korban bencana alam.</p>
                  <div className="hj-route-track">
                    <div
                      className="hj-route-fill"
                      style={{ width: progressVisible ? '66%' : '0%' }}
                    ></div>
                  </div>
                  <div className="hj-postcard-meta">
                    <span style={{ color: 'var(--af-coral)', fontWeight: 700 }}>Rp 198 Jt terkumpul</span>
                    <span>Target: Rp 300 Jt</span>
                  </div>
                  <button
                    className="hj-postcard-donate"
                    onClick={(e) => scrollToSection(e, 'contact')}
                  >
                    Salurkan Bantuan <i className="bi bi-arrow-right ms-1"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Inisiatif 6 — Pendidikan & Pelatihan Vokasi */}
            <div className="col-md-6 col-lg-4">
              <div className="hj-postcard">
                <div className="hj-postcard-img">
                  <img
                    src="https://images.unsplash.com/photo-1594708767771-a7502209ff51?w=600&h=420&fit=crop&auto=format"
                    alt="Beasiswa Keterampilan & Vokasi Pemuda Desa"
                    loading="lazy"
                  />
                  <span className="hj-postcard-stamp" style={{ background: 'var(--af-navy)' }}>
                    Pendidikan
                  </span>
                </div>
                <div className="hj-postcard-body">
                  <h5>Beasiswa Pelatihan Digital Pemuda</h5>
                  <p>Pelatihan teknis komputer, pemrograman dasar, dan pendampingan kerja mandiri.</p>
                  <div className="hj-route-track">
                    <div
                      className="hj-route-fill"
                      style={{ width: progressVisible ? '68%' : '0%' }}
                    ></div>
                  </div>
                  <div className="hj-postcard-meta">
                    <span style={{ color: 'var(--af-coral)', fontWeight: 700 }}>Rp 162 Jt terkumpul</span>
                    <span>Target: Rp 240 Jt</span>
                  </div>
                  <button
                    className="hj-postcard-donate"
                    onClick={(e) => scrollToSection(e, 'contact')}
                  >
                    Salurkan Bantuan <i className="bi bi-arrow-right ms-1"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          WHY AURELIA (STANDAR AUDIT) — Controlled Editorial Container
          ==================================================================== */}
      <section className="hj-section af-bg-ivory" id="why">
        <div className="hj-container">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '640px' }}>
            <span className="hj-eyebrow">
              <i className="bi bi-clipboard2-check"></i> Standar Audit Aurelia
            </span>
            <h2 className="hj-h2 mt-3" style={{ color: 'var(--af-navy)' }}>
              Filosofi akuntabilitas tanpa kompromi
            </h2>
            <p className="hj-lede mt-2" style={{ color: 'var(--af-muted)' }}>
              Setiap rupiah donasi memiliki rekam jejak digital yang dapat diaudit publik kapan saja.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-6 col-lg-4">
              <div className="hj-why-card" style={{ borderColor: 'var(--af-line)' }}>
                <div className="hj-why-ic" style={{ background: 'var(--af-coral-light)', color: 'var(--af-coral)' }}>
                  <i className="bi bi-eye-fill"></i>
                </div>
                <h5 style={{ color: 'var(--af-navy)' }}>Transparansi Real-Time</h5>
                <p>Pantau laporan pengeluaran terinci hingga struk terkecil secara terbuka di portal donatur.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="hj-why-card" style={{ borderColor: 'var(--af-line)' }}>
                <div className="hj-why-ic" style={{ background: 'var(--af-mist)', color: 'var(--af-navy)' }}>
                  <i className="bi bi-patch-check-fill"></i>
                </div>
                <h5 style={{ color: 'var(--af-navy)' }}>Mitra Terverifikasi</h5>
                <p>Setiap yayasan mitra lapangan melewati 5 tahap audit kepatuhan hukum dan uji integritas berkala.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="hj-why-card" style={{ borderColor: 'var(--af-line)' }}>
                <div className="hj-why-ic" style={{ background: 'var(--af-coral-light)', color: 'var(--af-coral)' }}>
                  <i className="bi bi-shield-lock-fill"></i>
                </div>
                <h5 style={{ color: 'var(--af-navy)' }}>Keamanan Enkripsi Bank</h5>
                <p>Pemrosesan transaksi terproteksi protokol keamanan tinggi dengan gateway pembayaran berlisensi.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="hj-why-card" style={{ borderColor: 'var(--af-line)' }}>
                <div className="hj-why-ic" style={{ background: 'var(--af-mist)', color: 'var(--af-navy)' }}>
                  <i className="bi bi-geo-alt-fill"></i>
                </div>
                <h5 style={{ color: 'var(--af-navy)' }}>Verifikasi Bukti Lapangan</h5>
                <p>Setiap serah terima didokumentasikan dengan koordinat GPS, stempel waktu, dan tanda terima warga.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="hj-why-card" style={{ borderColor: 'var(--af-line)' }}>
                <div className="hj-why-ic" style={{ background: 'var(--af-coral-light)', color: 'var(--af-coral)' }}>
                  <i className="bi bi-file-earmark-text-fill"></i>
                </div>
                <h5 style={{ color: 'var(--af-navy)' }}>Laporan Siap Unduh</h5>
                <p>Kuitansi donasi resmi dan bukti potong pajak instan dapat langsung diunduh secara otomatis.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="hj-why-card" style={{ borderColor: 'var(--af-line)' }}>
                <div className="hj-why-ic" style={{ background: 'var(--af-mist)', color: 'var(--af-navy)' }}>
                  <i className="bi bi-headset"></i>
                </div>
                <h5 style={{ color: 'var(--af-navy)' }}>Posko Layanan Responsif</h5>
                <p>Tim koordinasi kami siap menjawab pertanyaan operasional dan pelacakan donasi Anda kapan saja.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          HOW IT WORKS (ALUR PENYALURAN) — Wide Editorial Three-Step Layout
          ==================================================================== */}
      <section className="af-how-section" id="how">
        <div className="hj-container">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '780px' }}>
            <span className="hj-eyebrow">
              <i className="bi bi-signpost-split-fill"></i> Alur Penyaluran Tiga Langkah
            </span>
            <h2 className="hj-h2 mt-3" style={{ color: 'var(--af-navy)' }}>
              Dari tangan Anda hingga ke tangan penerima manfaat
            </h2>
            <p className="hj-lede mx-auto mt-2" style={{ color: 'var(--af-navy-soft)', maxWidth: '640px' }}>
              Setiap donasi melewati alur terverifikasi dengan penomoran manifest resmi, audit pergerakan logistik fisik, dan tanda terima langsung di lapangan.
            </p>
          </div>

          <div className="af-how-grid">
            {/* Step 1 */}
            <div className="af-how-card">
              <div className="af-how-card-header">
                <span className="af-how-num" style={{ color: 'var(--af-coral)' }}>01</span>
                <span className="af-how-stage">Tahap 01</span>
                <div className="af-how-icon-wrap" style={{ background: 'var(--af-coral-light)', color: 'var(--af-coral)' }}>
                  <i className="bi bi-box2-heart"></i>
                </div>
              </div>
              <h3 className="af-how-title">Pilih Inisiatif Terbuka</h3>
              <p className="af-how-desc">
                Tentukan program bantuan yang ingin Anda dukung melalui manifest terbuka terverifikasi. Transaksi tercatat seketika tanpa potongan tersembunyi.
              </p>
              <div className="af-how-footer">
                <i className="bi bi-shield-check text-success"></i>
                <span>Enkripsi Bank &amp; Kuitansi Resmi</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="af-how-card">
              <div className="af-how-card-header">
                <span className="af-how-num" style={{ color: 'var(--af-gold)' }}>02</span>
                <span className="af-how-stage">Tahap 02</span>
                <div className="af-how-icon-wrap" style={{ background: 'rgba(231, 184, 91, 0.16)', color: 'var(--af-gold-deep)' }}>
                  <i className="bi bi-truck"></i>
                </div>
              </div>
              <h3 className="af-how-title">Pantau Logistik Lapangan</h3>
              <p className="af-how-desc">
                Dapatkan ID pelacakan unik untuk memonitor pergerakan logistik bantuan, nota belanja grosir lokal, serta koordinat penugasan posko relawan.
              </p>
              <div className="af-how-footer">
                <i className="bi bi-geo-alt-fill text-danger"></i>
                <span>Pelacakan Koordinat &amp; Nota Belanja</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="af-how-card">
              <div className="af-how-card-header">
                <span className="af-how-num" style={{ color: 'var(--af-navy)' }}>03</span>
                <span className="af-how-stage">Tahap 03</span>
                <div className="af-how-icon-wrap" style={{ background: 'var(--af-mist-soft)', color: 'var(--af-navy)' }}>
                  <i className="bi bi-patch-check-fill"></i>
                </div>
              </div>
              <h3 className="af-how-title">Terima Bukti Digital</h3>
              <p className="af-how-desc">
                Terima laporan tuntas berisi dokumentasi foto serah terima berstempel waktu, tanda tangan penerima manfaat, dan ringkasan audit penutupan manifest.
              </p>
              <div className="af-how-footer">
                <i className="bi bi-file-earmark-pdf-fill text-primary"></i>
                <span>Laporan Teraudit &amp; Foto Serah Terima</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          VOLUNTEERS (TIM OPERASIONAL LAPANGAN) — Warm Ivory Surface
          ==================================================================== */}
      <section className="hj-section af-bg-ivory" id="volunteers">
        <div className="hj-container">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '640px' }}>
            <span className="hj-eyebrow">
              <i className="bi bi-person-badge-fill"></i> Tim Operasional Lapangan
            </span>
            <h2 className="hj-h2 mt-3" style={{ color: 'var(--af-navy)' }}>
              Wajah di balik setiap laporan terverifikasi
            </h2>
            <p className="hj-lede mx-auto mt-2" style={{ color: 'var(--af-muted)' }}>
              Koordinator wilayah kami adalah profesional sosial berdedikasi yang bekerja langsung bersama komunitas.
            </p>
          </div>

          <div className="row g-4">
            {/* Relawan 1 */}
            <div className="col-sm-6 col-lg-3">
              <div className="hj-id-card">
                <div className="hj-id-badge" style={{ background: 'var(--af-coral)' }}>Posko NTT · Koordinator</div>
                <div className="hj-id-photo">
                  <img
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=480&fit=crop&auto=format"
                    alt="Elena Vance — Koordinator Air Bersih"
                    loading="lazy"
                  />
                </div>
                <div className="hj-id-meta">
                  <div className="hj-id-name">Elena Vance</div>
                  <div className="hj-id-role">Koordinator Operasi Air Bersih</div>
                  <div className="hj-id-social">
                    <a href="#volunteers" aria-label="Profil Elena"><i className="bi bi-linkedin"></i></a>
                    <a href="#volunteers" aria-label="Email Elena"><i className="bi bi-envelope"></i></a>
                  </div>
                  <div className="hj-id-barcode">||| | |||| | ||| |||| |</div>
                </div>
              </div>
            </div>

            {/* Relawan 2 */}
            <div className="col-sm-6 col-lg-3">
              <div className="hj-id-card">
                <div className="hj-id-badge" style={{ background: 'var(--af-navy)' }}>Posko Sulawesi · Logistik</div>
                <div className="hj-id-photo">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=480&fit=crop&auto=format"
                    alt="Marcus Boyd — Logistik Rantai Pasok"
                    loading="lazy"
                  />
                </div>
                <div className="hj-id-meta">
                  <div className="hj-id-name">Marcus Boyd</div>
                  <div className="hj-id-role">Manajer Distribusi Logistik</div>
                  <div className="hj-id-social">
                    <a href="#volunteers" aria-label="Profil Marcus"><i className="bi bi-linkedin"></i></a>
                    <a href="#volunteers" aria-label="Email Marcus"><i className="bi bi-envelope"></i></a>
                  </div>
                  <div className="hj-id-barcode">|| | |||| || ||| |||| |</div>
                </div>
              </div>
            </div>

            {/* Relawan 3 */}
            <div className="col-sm-6 col-lg-3">
              <div className="hj-id-card">
                <div className="hj-id-badge" style={{ background: 'var(--af-coral)' }}>Posko Maluku · Medis</div>
                <div className="hj-id-photo">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=480&fit=crop&auto=format"
                    alt="dr. Sofia Morales — Dokter Penanggung Jawab"
                    loading="lazy"
                  />
                </div>
                <div className="hj-id-meta">
                  <div className="hj-id-name">dr. Sofia Morales</div>
                  <div className="hj-id-role">Dokter Penanggung Jawab Medis</div>
                  <div className="hj-id-social">
                    <a href="#volunteers" aria-label="Profil dr. Sofia"><i className="bi bi-linkedin"></i></a>
                    <a href="#volunteers" aria-label="Email dr. Sofia"><i className="bi bi-envelope"></i></a>
                  </div>
                  <div className="hj-id-barcode">|||| | || | ||| |||| ||</div>
                </div>
              </div>
            </div>

            {/* Relawan 4 */}
            <div className="col-sm-6 col-lg-3">
              <div className="hj-id-card">
                <div className="hj-id-badge" style={{ background: 'var(--af-navy)' }}>Kantor Audit · Pengawas</div>
                <div className="hj-id-photo">
                  <img
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=480&fit=crop&auto=format"
                    alt="David Sterling — Kepala Tim Audit"
                    loading="lazy"
                  />
                </div>
                <div className="hj-id-meta">
                  <div className="hj-id-name">David Sterling, CA</div>
                  <div className="hj-id-role">Kepala Tim Auditor Independen</div>
                  <div className="hj-id-social">
                    <a href="#volunteers" aria-label="Profil David"><i className="bi bi-linkedin"></i></a>
                    <a href="#volunteers" aria-label="Email David"><i className="bi bi-envelope"></i></a>
                  </div>
                  <div className="hj-id-barcode">||| |||| | ||| | |||| |</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          TESTIMONIALS — Wide Deep Ocean Navy Background
          ==================================================================== */}
      <section
        className="hj-section af-bg-navy"
        id="testimonials"
      >
        <div className="hj-container">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '640px' }}>
            <span className="hj-eyebrow hj-eyebrow-light" style={{ borderColor: 'rgba(255,255,255,.25)', color: 'var(--af-gold)' }}>
              <i className="bi bi-postcard-fill"></i> Kartu Pos &amp; Bukti Donatur
            </span>
            <h2 className="hj-h2 mt-3 text-white">
              Kisah nyata dari komunitas donatur Aurelia
            </h2>
          </div>

          <div className="row g-4 justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div className="hj-testi-card">
                <div className="hj-testi-stars" style={{ color: 'var(--af-gold)' }}>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                </div>
                <p className="hj-testi-quote">
                  &ldquo;Saya bisa melihat langsung foto sumur air bersih yang dibangun dari donasi saya, lengkap dengan titik koordinatnya. Pembuktian nyata ini membuat saya tenang.&rdquo;
                </p>
                <div className="hj-testi-person">
                  <img
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop&auto=format"
                    alt="Rachel Kuntoro"
                  />
                  <div>
                    <div className="hj-testi-name text-white">Rachel Kuntoro</div>
                    <div className="hj-testi-role" style={{ color: 'var(--af-mist)' }}>Donatur Rutin Bulanan</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="hj-testi-card">
                <div className="hj-testi-stars" style={{ color: 'var(--af-gold)' }}>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                </div>
                <p className="hj-testi-quote">
                  &ldquo;Proses donasinya praktis dan tidak berbelit. Nomor pelacakan manifest langsung dikirim ke email sebelum saya sempat menutup tab browser.&rdquo;
                </p>
                <div className="hj-testi-person">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&auto=format"
                    alt="Farhan Hartanto"
                  />
                  <div>
                    <div className="hj-testi-name text-white">Farhan Hartanto</div>
                    <div className="hj-testi-role" style={{ color: 'var(--af-mist)' }}>Donatur Inisiatif Tanggap Bencana</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 d-none d-lg-block">
              <div className="hj-testi-card">
                <div className="hj-testi-stars" style={{ color: 'var(--af-gold)' }}>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-half"></i>
                </div>
                <p className="hj-testi-quote">
                  &ldquo;Sebagai mitra penyalur di lapangan, proses validasi Aurelia sangat ketat dan adil. Standar inilah yang menjaga integritas penyaluran tetap tinggi.&rdquo;
                </p>
                <div className="hj-testi-person">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&auto=format"
                    alt="drg. Sarah Pramono"
                  />
                  <div>
                    <div className="hj-testi-name text-white">drg. Sarah Pramono</div>
                    <div className="hj-testi-role" style={{ color: 'var(--af-mist)' }}>Direktur Mitra Komunitas Lapangan</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          CTA BANNER — Contrasting Warm Ivory / Coral Banner
          ==================================================================== */}
      <section className="hj-section af-bg-ivory" id="cta">
        <div className="hj-container">
          <div className="hj-cta" style={{ borderColor: 'var(--af-coral)', background: '#fff' }}>
            <div className="hj-cta-stamp" style={{ borderColor: 'var(--af-coral)', color: 'var(--af-coral)' }}>
              <i className="bi bi-heart-fill"></i>
            </div>
            <h2 className="hj-h2" style={{ color: 'var(--af-navy)' }}>
              Seseorang di luar sana menanti uluran tangan dan kepedulian Anda.
            </h2>
            <p style={{ color: 'var(--af-navy-soft)', maxWidth: '600px', margin: '16px auto 0' }}>
              Setiap donasi, sekecil apa pun, menggerakkan kehidupan nyata hari ini — lengkap dengan nomor manifest dan bukti serah terima transparan.
            </p>
            <button
              className="hj-btn af-btn-coral mt-4"
              id="hjCtaDonate"
              onClick={(e) => scrollToSection(e, 'causes')}
            >
              <i className="bi bi-heart-fill"></i> Salurkan Donasi Sekarang
            </button>
          </div>
        </div>
      </section>

      {/* ====================================================================
          CONTACT & KONSULTASI SECTION — Soft Surface
          ==================================================================== */}
      <section
        className="hj-section af-contact-surface"
        id="contact"
      >
        <div className="hj-container">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '640px' }}>
            <span className="hj-eyebrow">
              <i className="bi bi-envelope-paper-fill"></i> Saluran Komunikasi &amp; Verifikasi
            </span>
            <h2 className="hj-h2 mt-3" style={{ color: 'var(--af-navy)' }}>
              Hubungi tim kami atau ajukan verifikasi
            </h2>
          </div>

          <div className="row g-5">
            <div className="col-lg-5">
              <div className="hj-contact-panel" style={{ background: '#fff', borderColor: 'var(--af-line)' }}>
                <div className="hj-contact-item">
                  <span className="ic" style={{ background: 'var(--af-coral-light)', color: 'var(--af-coral)' }}>
                    <i className="bi bi-geo-alt-fill"></i>
                  </span>
                  <div>
                    <strong style={{ color: 'var(--af-navy)' }}>Kantor Sekretariat Utama</strong>
                    <div className="sm">{BRAND_CONFIG.contact.address}</div>
                  </div>
                </div>

                <div className="hj-contact-item">
                  <span className="ic" style={{ background: 'var(--af-mist)', color: 'var(--af-navy)' }}>
                    <i className="bi bi-envelope-fill"></i>
                  </span>
                  <div>
                    <strong style={{ color: 'var(--af-navy)' }}>Surat Elektronik Resmi</strong>
                    <div className="sm">{BRAND_CONFIG.contact.email}</div>
                  </div>
                </div>

                <div className="hj-contact-item">
                  <span className="ic" style={{ background: 'var(--af-mist)', color: 'var(--af-navy)' }}>
                    <i className="bi bi-telephone-fill"></i>
                  </span>
                  <div>
                    <strong style={{ color: 'var(--af-navy)' }}>Telepon &amp; Saluran Bantuan</strong>
                    <div className="sm">{BRAND_CONFIG.contact.phone}</div>
                  </div>
                </div>

                <div className="hj-contact-item">
                  <span className="ic" style={{ background: 'var(--af-coral-light)', color: 'var(--af-coral)' }}>
                    <i className="bi bi-broadcast"></i>
                  </span>
                  <div>
                    <strong style={{ color: 'var(--af-navy)' }}>Meja Tanggap Darurat</strong>
                    <div className="sm">{BRAND_CONFIG.contact.emergencyDesk}</div>
                  </div>
                </div>

                <div className="hj-map-slot" style={{ background: 'var(--af-ivory)', color: 'var(--af-navy)', borderColor: 'var(--af-line)' }}>
                  <i className="bi bi-pin-map-fill me-2 text-danger"></i> {BRAND_CONFIG.contact.fieldPost}
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="hj-contact-panel" style={{ background: '#fff', borderColor: 'var(--af-line)' }}>
                <form id="hjContactForm" noValidate onSubmit={handleContactSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="hj-form-label" htmlFor="hj-name" style={{ color: 'var(--af-navy)' }}>
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        className="hj-form-control"
                        id="hj-name"
                        placeholder="Contoh: Budi Pratama"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="hj-form-label" htmlFor="hj-email" style={{ color: 'var(--af-navy)' }}>
                        Alamat Email
                      </label>
                      <input
                        type="email"
                        className="hj-form-control"
                        id="hj-email"
                        placeholder="nama@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label className="hj-form-label" htmlFor="hj-subject" style={{ color: 'var(--af-navy)' }}>
                        Subjek Pesan
                      </label>
                      <input
                        type="text"
                        className="hj-form-control"
                        id="hj-subject"
                        placeholder="Pertanyaan pelacakan, kemitraan, atau konfirmasi donasi"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      />
                    </div>

                    <div className="col-12">
                      <label className="hj-form-label" htmlFor="hj-message" style={{ color: 'var(--af-navy)' }}>
                        Isi Pesan
                      </label>
                      <textarea
                        className="hj-form-control"
                        id="hj-message"
                        rows={4}
                        placeholder="Tuliskan pesan atau pertanyaan Anda secara rinci…"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                      ></textarea>
                    </div>

                    <div className="col-12">
                      <button
                        type="submit"
                        className="hj-btn af-btn-coral w-100 justify-content-center"
                      >
                        Kirim Pesan <i className="bi bi-send ms-2"></i>
                      </button>
                    </div>

                    <div
                      className="col-12"
                      id="hjFormStatus"
                      role="status"
                      aria-live="polite"
                    >
                      {formSubmitted && (
                        <div
                          style={{
                            fontFamily: 'var(--hj-font-mono)',
                            fontSize: '0.85rem',
                            color: 'var(--af-navy)',
                            padding: '12px 16px',
                            background: 'var(--af-mist)',
                            borderRadius: '8px',
                            border: '1px solid var(--af-line)',
                          }}
                        >
                          <i className="bi bi-check-circle-fill me-2 text-success"></i>
                          Pesan telah dicap &amp; terkirim — tim operasional kami akan membalas dalam 24 jam.
                        </div>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          FOOTER — Generous Full-Width in Deep Ocean Navy (#173B4D)
          ==================================================================== */}
      <footer className="hj-footer af-bg-navy">
        <div className="hj-container">
          <div className="row g-4">
            <div className="col-lg-4 col-md-6">
              <a
                className="hj-logo"
                href="#home"
                style={{ color: '#fff' }}
                onClick={(e) => scrollToSection(e, 'home')}
              >
                <span className="hj-logo-mark" style={{ borderColor: 'var(--af-gold)', color: 'var(--af-gold)' }}>
                  <i className="bi bi-shield-check"></i>
                </span>
                <span>
                  {BRAND_CONFIG.shortName}<span className="dot" style={{ color: 'var(--af-coral)' }}>.</span>
                </span>
              </a>
              <p className="mt-3" style={{ color: 'var(--af-mist)', fontSize: '.88rem', lineHeight: '1.7' }}>
                Yayasan filantropi dengan transparansi radikal yang menghubungkan kepedulian Anda langsung ke inisiatif terverifikasi di lapangan sejak 2013. Setiap bantuan tercatat dari rekening hingga pintu penerima.
              </p>
              <div className="hj-footer-social">
                <a href={BRAND_CONFIG.social.facebook} aria-label="Facebook"><i className="bi bi-facebook"></i></a>
                <a href={BRAND_CONFIG.social.twitter} aria-label="Twitter / X"><i className="bi bi-twitter-x"></i></a>
                <a href={BRAND_CONFIG.social.instagram} aria-label="Instagram"><i className="bi bi-instagram"></i></a>
                <a href={BRAND_CONFIG.social.linkedin} aria-label="LinkedIn"><i className="bi bi-linkedin"></i></a>
                <a href={BRAND_CONFIG.social.youtube} aria-label="YouTube"><i className="bi bi-youtube"></i></a>
              </div>
            </div>

            <div className="col-6 col-md-3 col-lg-2">
              <h6 style={{ color: 'var(--af-gold)' }}>Tautan Cepat</h6>
              <ul>
                <li>
                  <a className="hj-footer-link" href="#about" onClick={(e) => scrollToSection(e, 'about')}>
                    <i className="bi bi-caret-right-fill"></i>Tentang Kami
                  </a>
                </li>
                <li>
                  <a className="hj-footer-link" href="#causes" onClick={(e) => scrollToSection(e, 'causes')}>
                    <i className="bi bi-caret-right-fill"></i>Inisiatif Aktif
                  </a>
                </li>
                <li>
                  <a className="hj-footer-link" href="#why" onClick={(e) => scrollToSection(e, 'why')}>
                    <i className="bi bi-caret-right-fill"></i>Standar Audit
                  </a>
                </li>
                <li>
                  <a className="hj-footer-link" href="#how" onClick={(e) => scrollToSection(e, 'how')}>
                    <i className="bi bi-caret-right-fill"></i>Alur Bantuan
                  </a>
                </li>
                <li>
                  <a className="hj-footer-link" href="#volunteers" onClick={(e) => scrollToSection(e, 'volunteers')}>
                    <i className="bi bi-caret-right-fill"></i>Relawan Lapangan
                  </a>
                </li>
                <li>
                  <a className="hj-footer-link" href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>
                    <i className="bi bi-caret-right-fill"></i>Hubungi Kami
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-6 col-md-3 col-lg-2">
              <h6 style={{ color: 'var(--af-gold)' }}>Kategori Program</h6>
              <ul>
                {BRAND_CONFIG.categories.map((cat, idx) => (
                  <li key={idx}>
                    <a className="hj-footer-link" href="#causes" onClick={(e) => scrollToSection(e, 'causes')}>
                      <i className="bi bi-caret-right-fill"></i>{cat}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-md-6 col-lg-4">
              <h6 style={{ color: 'var(--af-gold)' }}>Posko &amp; Kontak Resmi</h6>
              <div className="hj-footer-link mb-2" style={{ color: 'var(--af-mist)' }}>
                <i className="bi bi-geo-alt-fill text-danger me-2"></i> {BRAND_CONFIG.contact.address}
              </div>
              <div className="hj-footer-link mb-2" style={{ color: 'var(--af-mist)' }}>
                <i className="bi bi-envelope-fill text-warning me-2"></i> {BRAND_CONFIG.contact.email}
              </div>
              <div className="hj-footer-link mb-2" style={{ color: 'var(--af-mist)' }}>
                <i className="bi bi-telephone-fill text-info me-2"></i> {BRAND_CONFIG.contact.phone}
              </div>

              <h6 className="mt-4" style={{ color: 'var(--af-gold)' }}>Buletin Laporan Lapangan</h6>
              <div className="hj-newsletter">
                <input
                  type="email"
                  placeholder="Masukkan alamat email Anda"
                  aria-label="Email untuk buletin"
                />
                <button type="button" aria-label="Berlangganan" style={{ background: 'var(--af-coral)', color: '#fff' }}>
                  <i className="bi bi-arrow-right"></i>
                </button>
              </div>
              <div className="hj-footer-link mt-2" style={{ fontSize: '.76rem', color: 'var(--af-mist)' }}>
                <i className="bi bi-shield-check me-1"></i> Bebas spam. Berhenti berlangganan kapan saja.
              </div>
            </div>
          </div>

          <div className="hj-footer-divider" style={{ borderColor: 'rgba(255,255,255,.15)' }}></div>

          <div className="hj-footer-bottom">
            <div>
              <div>
                &copy; 2026 {BRAND_CONFIG.name}. Seluruh hak cipta dilindungi.
              </div>
              <div className="mt-2 text-warning small font-monospace">
                {BRAND_CONFIG.licenseNumber}
              </div>
              <div className="mt-2" style={{ color: 'var(--af-mist)', fontSize: '.8rem' }}>
                {BRAND_CONFIG.meta.disclaimer}
              </div>
            </div>
            <div className="text-md-end mt-3 mt-md-0">
              <div className="mb-2">
                <i className="bi bi-qr-code me-2" title="QRIS"></i>
                <i className="bi bi-credit-card-2-front me-2" title="Transfer Bank"></i>
                <i className="bi bi-wallet2 me-2" title="E-Wallet"></i>
                <i className="bi bi-shield-lock-fill" title="Enkripsi Aman"></i>
              </div>
              <div style={{ color: 'var(--af-gold)', fontFamily: 'var(--hj-font-mono)', fontSize: '.76rem' }}>
                Teraudit &bull; Transparan &bull; Tervalidasi Lapangan
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* ====================================================================
          MOBILE STICKY DONATE BAR
          ==================================================================== */}
      <div className="hj-mobile-bar">
        <a
          href="#causes"
          className="hj-btn hj-btn-primary af-btn-coral"
          onClick={(e) => scrollToSection(e, 'causes')}
        >
          Donasi Sekarang <i className="bi bi-heart-fill ms-1"></i>
        </a>
      </div>

      {/* ====================================================================
          SCROLL TO TOP BUTTON
          ==================================================================== */}
      {showScrollTop && (
        <div
          id="hj-scrolltop"
          className="hj-show"
          role="button"
          aria-label="Kembali ke atas"
          tabIndex={0}
          onClick={scrollToTop}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') scrollToTop();
          }}
          style={{ background: 'var(--af-coral)', color: '#fff' }}
        >
          <i className="bi bi-arrow-up"></i>
        </div>
      )}

      {/* ====================================================================
          WATCH STORY MODAL — Indonesian Copy & Clean Visuals
          ==================================================================== */}
      {storyModalOpen && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ backgroundColor: 'rgba(23, 59, 77, 0.85)' }}
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content" style={{ borderRadius: '20px', border: '1px solid var(--af-line)', background: 'var(--af-ivory)' }}>
              <div className="modal-header border-0 pb-0">
                <div>
                  <span className="af-badge-demo mb-1">DOKUMENTER LAPANGAN</span>
                  <h5
                    className="modal-title"
                    style={{ fontFamily: 'var(--hj-font-display)', fontWeight: 700, color: 'var(--af-navy)' }}
                  >
                    Kisah Nyata Lapangan — {BRAND_CONFIG.name}
                  </h5>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Tutup"
                  onClick={() => setStoryModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body pb-4">
                <div className="ratio ratio-16x9 rounded-4 overflow-hidden border">
                  <img
                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900&h=500&fit=crop&auto=format"
                    alt="Preview dokumenter Aurelia Foundation"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="mt-3 p-3 rounded-3" style={{ background: '#fff', border: '1px dashed var(--af-line)' }}>
                  <p className="mb-1" style={{ color: 'var(--af-navy)', fontWeight: 600 }}>
                    Menghubungkan Hati, Mengantarkan Harapan Nyata
                  </p>
                  <p className="mb-0 small" style={{ color: 'var(--af-muted)' }}>
                    Video preview simulasi — merekam dedikasi para relawan garis depan menyalurkan bantuan makanan bergizi dan fasilitas air bersih ke 40 wilayah binaan di seluruh pelosok.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
