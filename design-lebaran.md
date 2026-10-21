# design.md — Design System Website Souvenir & Gift Lebaran

**Tema:** hijau muda (mint/sage) lembut, motif **bulan sabit & bintang**, nuansa hangat, bersih, elegan.
**Basis:** Bootstrap 5.3 + CSS kustom (override via CSS variables). Tanpa framework tambahan.
Dokumen pendamping: `PRD-lebaran.md`.

---

## 1. Prinsip Desain
1. **Lembut & hangat:** hijau muda sebagai suasana, bukan hijau pekat yang berat.
2. **Berkah, bukan ramai:** motif bulan-bintang dipakai hemat sebagai aksen; ruang kosong lega.
3. **Konversi jelas:** tombol WhatsApp selalu mudah ditemukan.
4. **Mobile-first:** mayoritas pengunjung dari ponsel.
5. **Aksesibel:** kontras AA, fokus terlihat, gerak bisa dimatikan.

---

## 2. Design Tokens

### 2.1 Warna
| Token | Hex | Kegunaan |
|---|---|---|
| `--c-primary` | `#2E7D5B` | Tombol utama, link, ikon penting |
| `--c-primary-dark` | `#1F5C42` | Hover, teks di atas mint |
| `--c-ink` | `#16372A` | Teks utama, heading |
| `--c-mint-50` | `#F2FBF6` | Latar halaman |
| `--c-mint-100` | `#DFF3E8` | Latar section, kartu |
| `--c-mint-200` | `#C3E6D2` | Border, divider, badge |
| `--c-sage-300` | `#A8D5BA` | Ilustrasi, dekorasi |
| `--c-gold` | `#C9A23F` | Aksen bulan/bintang, highlight |
| `--c-gold-soft` | `#F3E5B5` | Latar badge promo |
| `--c-cream` | `#FFF9EC` | Latar kartu hangat, hero alternatif |
| `--c-text-muted` | `#4F6B5E` | Teks sekunder (kontras ≥ 4,5:1 di atas putih/mint-50) |
| `--c-wa` | `#25D366` | Khusus ikon/tombol WhatsApp |
| `--c-wa-dark` | `#128C4A` | Hover WA & teks pada latar terang |
| `--c-danger` | `#B3261E` | Error form |

**Aturan kontras**
- Teks putih hanya di atas `--c-primary` atau `--c-primary-dark`.
- Teks di atas mint/cream memakai `--c-ink` atau `--c-primary-dark`.
- Emas (`--c-gold`) **tidak** dipakai sebagai warna teks kecil di atas putih; hanya ornamen, garis, atau teks besar di atas hijau tua.
- Tombol WA: latar `--c-wa-dark` + teks putih (kontras terjaga), ikon boleh `--c-wa`.

### 2.2 Tipografi
| Peran | Font | Fallback | Bobot |
|---|---|---|---|
| Heading | **Fraunces** (serif lembut) | `Georgia, serif` | 600, 700 |
| Body & UI | **Plus Jakarta Sans** | `system-ui, -apple-system, Segoe UI, sans-serif` | 400, 500, 600 |
| Aksen Arab/kaligrafi (opsional, dekoratif) | Amiri | `serif` | 400 |

Self-host WOFF2, `font-display: swap`, subset Latin, preload font body.

| Level | Mobile | Desktop | Line-height |
|---|---|---|---|
| Display (H1 hero) | 2,25rem | 3,5rem | 1,15 |
| H2 | 1,75rem | 2,5rem | 1,2 |
| H3 | 1,375rem | 1,75rem | 1,3 |
| Body | 1rem | 1,0625rem | 1,65 |
| Small | 0,875rem | 0,875rem | 1,5 |

Gunakan `clamp()` untuk skala fluid, mis. `font-size: clamp(2.25rem, 1.6rem + 3vw, 3.5rem)`.

### 2.3 Spasi, Radius, Bayangan
- Skala spasi: 4, 8, 12, 16, 24, 32, 48, 64, 96 px.
- Section padding: 64 px (mobile) / 96 px (desktop).
- Radius: `--r-sm: 8px`, `--r-md: 16px`, `--r-lg: 24px`, `--r-pill: 999px`.
- Bayangan: `--sh-sm: 0 2px 8px rgba(22,55,42,.06)`, `--sh-md: 0 8px 24px rgba(22,55,42,.10)`.
- Container: Bootstrap `.container` (max 1140 px), gutter 24 px.

### 2.4 Breakpoint (Bootstrap)
`sm 576` · `md 768` · `lg 992` · `xl 1200` · `xxl 1400`.

### 2.5 Kode `tokens.css`
```css
:root{
  --c-primary:#2E7D5B; --c-primary-dark:#1F5C42; --c-ink:#16372A;
  --c-mint-50:#F2FBF6; --c-mint-100:#DFF3E8; --c-mint-200:#C3E6D2; --c-sage-300:#A8D5BA;
  --c-gold:#C9A23F; --c-gold-soft:#F3E5B5; --c-cream:#FFF9EC;
  --c-text-muted:#4F6B5E; --c-wa:#25D366; --c-wa-dark:#128C4A; --c-danger:#B3261E;

  --font-head:"Fraunces",Georgia,serif;
  --font-body:"Plus Jakarta Sans",system-ui,-apple-system,"Segoe UI",sans-serif;

  --r-sm:8px; --r-md:16px; --r-lg:24px; --r-pill:999px;
  --sh-sm:0 2px 8px rgba(22,55,42,.06); --sh-md:0 8px 24px rgba(22,55,42,.10);

  /* Override Bootstrap */
  --bs-primary:#2E7D5B; --bs-primary-rgb:46,125,91;
  --bs-body-bg:var(--c-mint-50); --bs-body-color:var(--c-ink);
  --bs-body-font-family:var(--font-body); --bs-link-color:var(--c-primary);
  --bs-link-hover-color:var(--c-primary-dark); --bs-border-radius:var(--r-md);
}
body{line-height:1.65}
h1,h2,h3,h4{font-family:var(--font-head);color:var(--c-ink)}
:focus-visible{outline:3px solid var(--c-gold);outline-offset:2px}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
```

---

## 3. Motif & Ilustrasi

### 3.1 Elemen
- **Bulan sabit** (crescent) + **bintang 5 atau 8 sudut** (khatam/rub el hizb) sebagai logo-motif.
- **Lampion/fanous** dan **ketupat** sebagai ilustrasi sekunder (garis sederhana, hindari detail berat).
- **Pola geometris Islami** halus (opacity 6–10%) untuk latar section.
- Gaya: garis tipis 1,5–2 px, sudut membulat, flat, dua tone hijau + emas.

### 3.2 SVG Siap Pakai (inline, `aria-hidden="true"`)
**Bulan sabit + bintang**
```html
<svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true" focusable="false">
  <path d="M40 8a24 24 0 1 0 0 48 20 20 0 0 1 0-48z" fill="currentColor"/>
  <path d="M48 20l2.6 5.4 5.9.8-4.3 4.1 1 5.9L48 33.4l-5.2 2.8 1-5.9-4.3-4.1 5.9-.8z" fill="#C9A23F"/>
</svg>
```
**Bintang kecil (pemisah/aksen)**
```html
<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="#C9A23F" d="M12 2l2.4 6.2L21 9l-5 4.3L17.6 20 12 16.6 6.4 20 8 13.3 3 9l6.6-.8z"/></svg>
```
**Pola latar (CSS, bintang & titik)**
```css
.bg-pattern{
  background-color:var(--c-mint-50);
  background-image:
    radial-gradient(circle at 20px 20px, rgba(46,125,91,.08) 2px, transparent 3px),
    radial-gradient(circle at 60px 60px, rgba(201,162,63,.12) 2px, transparent 3px);
  background-size:80px 80px;
}
```

### 3.3 Penempatan Motif
| Area | Motif |
|---|---|
| Hero | Bulan sabit besar semi-transparan di kanan atas, bintang kecil tersebar, lampion menggantung (opsional) |
| Pemisah section | Garis tipis + bintang emas di tengah; atau gelombang lembut hijau mint |
| Kartu paket | Ikon bulan-bintang kecil di sudut badge |
| Footer | Siluet masjid/kubah sederhana + pola bintang di latar hijau tua |
| Favicon/logo | Bulan sabit + bintang dalam lingkaran hijau |

### 3.4 Foto
- Produk dengan latar krem/mint, pencahayaan hangat, props: kurma, kain batik, ketupat kertas.
- Rasio konsisten: kartu paket 4:3, portofolio 1:1 atau 4:5, hero 16:9 / 4:5 mobile.
- Hindari foto stok generik; prioritaskan foto produk sendiri.

---

## 4. Layout & Komponen

### 4.1 Navbar
- Sticky top, tinggi 72 px (desktop), 60 px (mobile); latar `--c-cream` dengan border bawah `--c-mint-200`; bayangan muncul saat scroll.
- Kiri: logo (SVG bulan-bintang + wordmark). Tengah/kanan: **Beranda · Tentang · Paket ▾ · Portofolio · Blog**. Kanan: tombol **"Pesan via WA"** (pill, `--c-wa-dark`).
- **Dropdown Paket:** panel putih, radius 16, bayangan md, item dengan ikon kecil + deskripsi satu baris (opsional); item aktif berlatar `--c-mint-100`.
- **Mobile:** hamburger → offcanvas dari kanan; Paket berupa accordion; tombol WA di bagian bawah offcanvas.
- Link aktif: teks `--c-primary-dark` + garis bawah emas 2 px.

```html
<nav class="navbar navbar-expand-lg sticky-top navbar-lebaran" aria-label="Navigasi utama">
  <div class="container">
    <a class="navbar-brand" href="/">[Logo] [Nama Brand]</a>
    <button class="navbar-toggler" data-bs-toggle="offcanvas" data-bs-target="#menu" aria-controls="menu" aria-label="Buka menu">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="offcanvas offcanvas-end" id="menu" tabindex="-1">
      <div class="offcanvas-body">
        <ul class="navbar-nav ms-auto align-items-lg-center gap-lg-2">
          <li class="nav-item"><a class="nav-link active" aria-current="page" href="/">Beranda</a></li>
          <li class="nav-item"><a class="nav-link" href="/tentang/">Tentang</a></li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="/paket/" role="button" data-bs-toggle="dropdown" aria-expanded="false">Paket</a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="/paket/hemat/">Paket Hemat</a></li>
              <li><a class="dropdown-item" href="/paket/reguler/">Paket Reguler</a></li>
              <li><a class="dropdown-item" href="/paket/premium/">Paket Premium</a></li>
              <li><a class="dropdown-item" href="/paket/hampers-corporate/">Hampers Corporate</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="/paket/custom/">Custom / Request Khusus</a></li>
            </ul>
          </li>
          <li class="nav-item"><a class="nav-link" href="/portofolio/">Portofolio</a></li>
          <li class="nav-item"><a class="nav-link" href="/blog/">Blog</a></li>
          <li class="nav-item ms-lg-3">
            <a class="btn btn-wa" target="_blank" rel="noopener noreferrer"
               href="https://wa.me/6282211221909?text=Halo%20%5BNama%20Brand%5D%2C%20saya%20ingin%20tanya%20souvenir%20Lebaran."
               data-wa-placement="navbar">Pesan via WA</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav>
```

### 4.2 Tombol
| Varian | Gaya |
|---|---|
| `.btn-primary` | Latar `--c-primary`, teks putih, radius pill, padding 12×24, hover `--c-primary-dark` + naik 1 px |
| `.btn-outline-lebaran` | Border 2 px `--c-primary`, teks `--c-primary`, hover isi hijau |
| `.btn-wa` | Latar `--c-wa-dark`, teks putih, ikon WhatsApp kiri |
| `.btn-gold` (promo) | Latar `--c-gold-soft`, teks `--c-ink`, border `--c-gold` |
Ukuran minimum 44 px tinggi; fokus: outline emas 3 px.

```css
.btn-wa{background:var(--c-wa-dark);color:#fff;border-radius:var(--r-pill);padding:.7rem 1.4rem;font-weight:600}
.btn-wa:hover{background:#0F7A40;color:#fff}
.wa-float{position:fixed;right:max(16px,env(safe-area-inset-right));bottom:max(16px,env(safe-area-inset-bottom));
  width:56px;height:56px;border-radius:50%;background:var(--c-wa-dark);color:#fff;display:grid;place-items:center;
  box-shadow:var(--sh-md);z-index:1030}
```

### 4.3 Hero
- Latar gradasi `--c-mint-100 → --c-cream`, pola bintang halus, bulan sabit besar di kanan.
- Kiri: badge ("Pre-Order Lebaran 2027"), H1, paragraf 2 baris, dua tombol, tiga poin singkat (Custom logo · Kemasan rapi · Kirim ke seluruh Indonesia).
- Kanan: foto hampers dalam bingkai berbentuk lengkung/kubah (`border-radius: 200px 200px 24px 24px`) dengan hiasan bintang.
- Mobile: foto di atas teks atau disembunyikan sebagian; tinggi hero ≤ 90vh.

### 4.4 Kartu Paket
- Latar putih, border `--c-mint-200`, radius 24, bayangan sm; hover naik 4 px + bayangan md.
- Isi: foto 4:3, badge ("Terlaris", "Premium"), judul H3, harga "mulai dari Rp…", 3 poin isi, tombol "Detail" + ikon WA.
- Badge: pill `--c-gold-soft`, teks `--c-ink`, ikon bintang.

### 4.5 Section "Kenapa Kami" (USP)
Grid 3–4 kolom; ikon garis dalam lingkaran `--c-mint-100`; judul + 1–2 kalimat.

### 4.6 Langkah Pemesanan
4 langkah horizontal (desktop) / vertikal (mobile); angka dalam lingkaran bergaya bintang 8 sudut; garis putus-putus penghubung.

### 4.7 Portofolio
Grid masonry/rapi (2 kolom mobile, 3–4 desktop); overlay gradasi hijau saat hover berisi judul + jumlah pcs; lightbox ringan (dialog native `<dialog>`); filter berupa pill.

### 4.8 Testimoni
Kartu krem dengan tanda kutip dekoratif, nama, asal, foto bulat 48 px. **Hanya testimoni asli.**

### 4.9 Blog
- Kartu: gambar 16:9, kategori (pill), judul H3, ringkasan 2 baris, meta (tanggal · waktu baca).
- Halaman artikel: lebar konten 720 px, daftar isi sticky di desktop, blok "Jawaban Singkat" (latar mint-100, border kiri emas 4 px), kotak CTA WA di tengah & akhir artikel.

### 4.10 FAQ
Accordion Bootstrap; item berlatar putih, ikon plus/minus; jawaban singkat & langsung.

### 4.11 Tabel Perbandingan Paket
Tabel responsif (`.table-responsive`), kolom "Reguler" disorot (latar mint-100, badge "Terlaris"); header hijau `--c-primary` teks putih.

### 4.12 Form Custom (ke WA)
Input radius 12, border mint-200, fokus border `--c-primary` + ring emas; label di atas; pesan error `--c-danger` dengan ikon; tombol "Kirim lewat WhatsApp".

### 4.13 Breadcrumb
Teks kecil `--c-text-muted`, pemisah bintang kecil; JSON-LD `BreadcrumbList` harus sama dengan tampilan.

### 4.14 Footer
Latar `--c-primary-dark`, teks `--c-mint-100`, tautan putih; 4 kolom (Brand+deskripsi · Menu · Paket · Kontak); siluet kubah masjid di atas footer; baris bawah © + legal. Kontras teks footer ≥ 4,5:1.

### 4.15 Banner Pengumuman
Strip tipis di atas navbar: latar `--c-gold-soft`, teks `--c-ink`, bintang di kiri-kanan, bisa ditutup (state disimpan di `sessionStorage`).

---

## 5. Pola Halaman (Wireframe Teks)

**Beranda**
```
[Banner pengumuman]
[Navbar]
[Hero: teks + foto lengkung + bulan-bintang]
[Trust bar]
[Paket unggulan: 4 kartu]
[Kenapa kami: 4 ikon]
[Cara pesan: 4 langkah]
[Portofolio pilihan: 6 foto]
[Testimoni]
[Blog terbaru: 3 kartu]
[FAQ ringkas]
[CTA penutup hijau + WA]
[Footer]
```

**Halaman paket**
```
[Breadcrumb] [H1 + jawaban singkat + harga mulai + CTA WA]
[Galeri] [Isi paket | Spesifikasi | Tier harga]
[Cocok untuk siapa] [Proses order] [FAQ] [Paket terkait] [CTA sticky WA mobile]
```

**Portofolio:** judul + filter → grid → CTA. **Detail proyek:** hero foto → tantangan/solusi/hasil → galeri → CTA.
**Blog:** judul + kategori → artikel unggulan → grid → pagination. **Artikel:** byline → jawaban singkat → isi + TOC → FAQ → artikel terkait → CTA.
**Tentang:** cerita → nilai → tim → proses → legalitas → CTA.

---

## 6. Interaksi & Motion
- Durasi 150–250 ms, easing `ease-out`.
- Hover kartu: translateY(-4px). Fade-in section saat scroll (IntersectionObserver), **dimatikan** bila `prefers-reduced-motion`.
- Bintang berkelip lembut di hero (opacity 0,6↔1, 4–6 s) — opsional & dapat dimatikan.
- Tidak ada auto-play carousel; bila carousel dipakai, sediakan tombol jeda.
- Navbar: bayangan muncul setelah scroll > 8 px.

## 7. Aksesibilitas Desain
- Kontras AA seluruh pasangan warna (periksa dengan alat kontras sebelum rilis).
- Fokus terlihat (outline emas 3 px) di semua elemen interaktif.
- Target sentuh ≥ 44×44 px; jarak antar tombol ≥ 8 px.
- Jangan menyampaikan informasi hanya lewat warna.
- Teks tidak di atas foto tanpa overlay gradasi yang menjamin kontras.
- Ukuran teks bisa diperbesar 200% tanpa kehilangan fungsi.

## 8. Performa Desain
- Gambar responsif (`srcset`), AVIF/WebP, dimensi eksplisit.
- Ilustrasi berupa SVG inline/sprite; hindari GIF/video berat; hero tanpa video.
- Ikon: SVG sprite lokal (bukan icon font besar).
- Font: maks 2 keluarga, subset.
- CSS: pecah `tokens/base/components/pages`, minify, hapus kelas Bootstrap yang tidak dipakai (opsional via PurgeCSS).

## 9. Penamaan & Struktur CSS
- Prefiks komponen kustom: `.lb-` (mis. `.lb-card`, `.lb-hero`, `.lb-badge`) agar tidak bentrok dengan Bootstrap.
- Urutan: `tokens.css` → Bootstrap → `base.css` → `components.css` → `pages.css`.
- Hindari `!important` kecuali untuk reduced-motion.

## 10. Aset yang Diperlukan
- Logo (SVG, horizontal & ikon), favicon set, OG default 1200×630.
- Ilustrasi: bulan-bintang, lampion, ketupat, kubah masjid (SVG).
- Foto: hero, 5 paket × 4 foto, 6+ proyek portofolio, foto tim, foto proses produksi.
- Ikon: WhatsApp, telepon, email, lokasi, jam, centang, panah, sosial media (SVG).

## 11. Checklist QA Desain
- [ ] Palet hijau muda konsisten, aksen emas tidak berlebihan
- [ ] Motif bulan-bintang hadir di hero, pemisah, footer, favicon
- [ ] Navbar & dropdown rapi di 360 px hingga 1440 px
- [ ] Tombol WA terlihat di setiap layar tanpa menutup konten
- [ ] Kontras AA lolos; fokus keyboard terlihat
- [ ] Tidak ada layout shift (CLS ≤ 0,1)
- [ ] Gambar OG tampil benar saat tautan dibagikan di WhatsApp
- [ ] Mode reduced-motion berfungsi
