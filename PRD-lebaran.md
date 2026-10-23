# PRD — Website Souvenir & Gift Lebaran

**Versi:** 1.0 | **Tanggal:** 21 Oktober 2026 | **Target rilis:** sebelum musim pre-order Ramadan 2027 | **Bahasa:** Indonesia (id-ID)
**Stack:** HTML5 + Bootstrap 5.3 (CSS) + CSS kustom + JS vanilla minimal. Tanpa framework lain.
**Warna:** hijau muda (mint/sage), motif bulan sabit & bintang. Detail di `design-lebaran.md`.

> Placeholder yang harus diganti sebelum rilis: `[Nama Brand]`, `https://namadomain.com`, `[Kota]`, alamat, harga, testimoni asli.
> Aturan SEO/AI-search cepat berubah. Verifikasi ulang spesifikasi schema & user-agent crawler di dokumentasi resmi tiap penyedia sebelum rilis.
> Jangan memasang rating, ulasan, atau statistik palsu di halaman maupun schema.

---

## 1. Ringkasan Produk

Website company profile + katalog + konversi WhatsApp untuk bisnis souvenir, hampers, dan gift Lebaran (parsel, kue kering kemasan, goodie bag, sajadah/mukena, tasbih, kartu ucapan, dll). Tidak ada keranjang/checkout. **Semua konversi diarahkan ke WhatsApp.**

### 1.1 Tujuan Bisnis
1. Menghasilkan lead WhatsApp (target ≥ 4% sesi klik WA).
2. Muncul di Google, Google Maps, AI Overviews/AI Mode, ChatGPT, Perplexity, Gemini, Copilot untuk kata kunci souvenir/hampers Lebaran.
3. Membangun kepercayaan lewat portofolio, testimoni asli, dan proses kerja transparan.
4. Melayani B2C (keluarga/individu) dan B2B (kantor, instansi, komunitas, sekolah).

### 1.2 Target Pengguna
| Persona | Kebutuhan | Pemicu |
|---|---|---|
| HRD/Purchasing | Hampers massal 50–1000 pcs, logo, invoice | Budget THR/kantor |
| Pemilik usaha/UMKM | Souvenir untuk pelanggan/mitra | Relasi bisnis |
| Keluarga/individu | Parsel, kado, bingkisan | Silaturahmi |
| Panitia (sekolah, masjid, komunitas) | Souvenir buka puasa bersama/santunan | Event Ramadan |

### 1.3 Metrik Sukses
- Klik WA / sesi ≥ 4%
- Organic traffic +50% dalam 90 hari pasca rilis
- Lighthouse Mobile: Performance ≥ 90, SEO 100, Accessibility ≥ 95, Best Practices ≥ 95
- Core Web Vitals "Good": LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1
- Muncul sebagai sitasi di jawaban AI untuk ≥ 10 query target dalam 6 bulan (dipantau manual)

---

## 2. Ruang Lingkup

**In scope:** 5 menu utama + halaman pendukung, redirect WhatsApp, SEO/AEO/GEO, schema, Open Graph, analytics, sitemap, robots, llms.txt.
**Out of scope (fase 2):** checkout/payment, login, CMS dinamis, multi-bahasa.

---

## 3. Navigasi & Sitemap

```
Navbar:  [Logo]  Beranda | Tentang | Paket ▾ | Portofolio | Blog      [Pesan via WA]
                                     ├─ Paket Hemat
                                     ├─ Paket Reguler
                                     ├─ Paket Premium
                                     ├─ Hampers Corporate
                                     └─ Custom / Request Khusus
```

| URL | Halaman | Prioritas |
|---|---|---|
| `/` | Beranda | P0 |
| `/tentang/` | Tentang | P0 |
| `/paket/` | Hub paket (induk dropdown) | P0 |
| `/paket/hemat/` | Paket Hemat | P0 |
| `/paket/reguler/` | Paket Reguler | P0 |
| `/paket/premium/` | Paket Premium | P0 |
| `/paket/hampers-corporate/` | Hampers Corporate (B2B) | P0 |
| `/paket/custom/` | Custom / Request Khusus | P1 |
| `/portofolio/` + `/portofolio/[slug]/` | Portofolio & studi kasus | P0 |
| `/blog/` + `/blog/[slug]/` | Blog | P0 |
| `/faq/`, `/kontak/` (link di footer) | Pendukung | P1 |
| `/kebijakan-privasi/`, `/syarat-ketentuan/` | Legal | P1 |
| `/404.html` | Error | P1 |
| `/sitemap.xml`, `/robots.txt`, `/llms.txt` | Teknis | P0 |

- Desktop: dropdown via hover/klik. Mobile: offcanvas Bootstrap, dropdown berupa accordion.
- Dropdown dapat diakses keyboard (`aria-expanded`, Esc menutup).
- Item menu aktif ditandai `aria-current="page"`.

---

## 4. Integrasi WhatsApp (Wajib)

**Nomor:** `6282131087971` (format internasional tanpa `+`/`0`).
**Format URL:** `https://wa.me/6282131087971?text=<pesan ter-encode>`

| Lokasi tombol | Pesan prefilled |
|---|---|
| Navbar / Hero | Halo [Nama Brand], saya ingin tanya souvenir/hampers Lebaran. |
| Paket Hemat | Halo, saya tertarik *Paket Hemat*. Mohon info harga & minimal order. |
| Paket Reguler | Halo, saya tertarik *Paket Reguler*. Mohon info detail isi paket. |
| Paket Premium | Halo, saya tertarik *Paket Premium*. Mohon katalog & ketersediaan. |
| Hampers Corporate | Halo, saya dari [perusahaan]. Butuh hampers … pcs dengan logo. |
| Custom | Halo, saya ingin request paket custom, budget … jumlah … |
| Portofolio | Halo, saya suka proyek *[nama proyek]*. Bisa dibuatkan yang serupa? |
| Artikel blog | Halo, saya baca artikel *[judul]* dan ingin konsultasi paket. |

Contoh: `https://wa.me/6282131087971?text=Halo%20%5BNama%20Brand%5D%2C%20saya%20ingin%20tanya%20souvenir%20Lebaran.`

**Persyaratan teknis**
- Semua link WA: `target="_blank" rel="noopener noreferrer"` + `aria-label` deskriptif.
- Floating WA button kanan-bawah, aman dari safe-area iOS, tidak menutup footer/CTA lain.
- Form brief di `/paket/custom/` (nama, jumlah, budget, tanggal butuh, catatan) → JS menyusun teks → `encodeURIComponent` → buka `wa.me`. Tanpa backend.
- Event GA4 `click_whatsapp` (parameter `placement`, `package`, `page`), tandai sebagai key event.
- Fallback: tampilkan nomor `0822-1122-1909` di footer & kontak (`tel:+6282131087971`).
- Atribut data: `data-wa-text="..."` pada elemen; satu skrip `wa.js` membangun URL.

---

## 5. Isi Halaman Lengkap

### 5.1 Beranda (`/`)
1. **Hero:** H1 berisi keyword utama (mis. *"Souvenir & Hampers Lebaran Eksklusif untuk Silaturahmi Penuh Berkah"*), subjudul 1–2 kalimat, CTA utama "Pesan via WhatsApp", CTA sekunder "Lihat Paket", ilustrasi bulan-bintang, badge (Pre-Order Lebaran 2027, Bisa Custom Logo).
2. **Trust bar:** hanya angka/logo yang benar (jumlah pesanan, tahun berdiri, izin usaha, logo klien dengan izin).
3. **Paket unggulan:** 4 kartu + harga "mulai dari" + CTA.
4. **Kenapa memilih kami (USP):** kualitas, kemasan, custom, tepat waktu, pengiriman, garansi.
5. **Cara pesan (4 langkah):** Pilih paket → Chat WA → Konfirmasi desain & DP → Produksi & kirim.
6. **Portofolio pilihan:** 6 foto proyek.
7. **Testimoni:** 3–6 testimoni asli (nama, kota/perusahaan, foto bila ada).
8. **Preview blog:** 3 artikel terbaru.
9. **FAQ ringkas:** 5 pertanyaan.
10. **CTA penutup:** banner hijau + info batas pre-order + tombol WA.
11. **Footer** (lihat 5.8).

### 5.2 Tentang (`/tentang/`)
- Cerita brand & misi (berbagi, silaturahmi, nuansa Ramadan).
- Visi-misi & nilai (amanah, rapi, tepat waktu).
- **Tim/pemilik** dengan nama & foto asli (sinyal E-E-A-T) + bio penulis blog (`#penulis`).
- Proses produksi & kontrol kualitas, sumber bahan/vendor.
- Legalitas: NIB, alamat usaha, jam operasional; PIRT/halal/BPOM hanya bila ada, cantumkan nomor asli.
- Area layanan & pengiriman.
- Tautan Google Business Profile & sosial media (juga untuk `sameAs`).
- CTA WA.

### 5.3 Paket (`/paket/` + 5 sub-halaman)
**Hub:** tabel perbandingan paket (isi, kisaran harga, min. order, lead time, custom logo), panduan memilih paket, CTA.

**Template tiap halaman paket**
- H1 `Paket [Nama] — Souvenir Lebaran` + ringkasan jawaban 40–60 kata.
- Galeri 3–6 foto (WebP/AVIF, alt deskriptif).
- Isi paket (daftar item), ukuran, bahan, kemasan.
- Harga "mulai dari" + tabel tier jumlah (mis. 10–49, 50–99, 100+).
- Min. order, lead time, area kirim, opsi custom (logo, kartu ucapan, warna).
- Cocok untuk siapa.
- Proses order, pembayaran (DP/pelunasan), kebijakan revisi/pembatalan.
- FAQ khusus paket (3–5).
- Paket terkait (internal link).
- CTA WA sticky di mobile.

| Halaman | Fokus |
|---|---|
| Hemat | Terjangkau, massal/komunitas/sekolah |
| Reguler | Paling banyak dipilih, harga & kualitas seimbang |
| Premium | Kemasan mewah, item eksklusif, VIP/keluarga |
| Hampers Corporate | Branding logo, invoice/faktur, multi-alamat, PO, PIC khusus |
| Custom | Form brief, galeri inspirasi, alur desain, estimasi waktu |

### 5.4 Portofolio (`/portofolio/`)
- Filter kategori (Corporate, Keluarga, Komunitas, Premium) — vanilla JS ringan.
- Kartu proyek: foto, klien (izin tertulis), jumlah pcs, tahun, jenis paket.
- **Studi kasus:** tantangan → solusi → hasil, detail item, foto proses, kutipan klien.
- CTA "Buat yang seperti ini".

### 5.5 Blog (`/blog/`)
- Kategori: Ide Hampers, Tips Memilih, Tradisi Lebaran, Panduan Corporate, Kemasan & Etika Berbagi.
- Kartu artikel: gambar, judul, ringkasan, tanggal, penulis, waktu baca.
- Pagination, pencarian client-side (opsional), RSS `/blog/feed.xml`.
- **Template artikel:** H1, byline penulis (nama, bio, tautan), tanggal terbit & diperbarui, daftar isi, blok "Jawaban Singkat" 40–60 kata, H2/H3 berformat pertanyaan, tabel/daftar, gambar beralt, FAQ akhir, sumber rujukan, artikel terkait, CTA WA.
- **Topik awal (10 artikel):**
  1. Ide souvenir Lebaran untuk kantor (budget 50rb–200rb)
  2. Cara memilih hampers Lebaran yang berkesan
  3. Kapan sebaiknya pre-order hampers Lebaran?
  4. Beda souvenir, hampers, dan parsel
  5. Isi hampers Lebaran yang disukai penerima
  6. Panduan hampers corporate untuk HRD
  7. Etika memberi hadiah Lebaran ke atasan/kolega
  8. Tren kemasan hampers ramah lingkungan
  9. Ide souvenir buka puasa bersama
  10. Cara custom logo pada hampers

### 5.6 Halaman Pendukung
- **FAQ** (≥ 20 Q&A, dikelompokkan: Pemesanan, Pembayaran, Custom, Pengiriman, Kualitas).
- **Kontak:** WA, telepon, email, alamat, peta (embed lazy), jam buka, sosial media.
- **Legal:** privasi, syarat & ketentuan, kebijakan pengembalian/revisi.
- **404:** ramah, tautan ke paket & WA.

### 5.7 Komponen Global
Navbar sticky, breadcrumb (selain Beranda), floating WA, back-to-top, banner pengumuman (mis. "Pre-order dibuka"), notice analytics/cookie ringan, skip link.

### 5.8 Footer
Logo + deskripsi 1 kalimat, menu cepat, daftar paket, kontak (WA, telepon, email, alamat), jam operasional, sosial media, metode pembayaran, tautan legal, © tahun otomatis.

### 5.9 Microcopy
Gunakan natural: "Lebaran", "Idul Fitri", "hampers", "parsel", "souvenir", "gift", nama kota, "custom logo", "pre-order". Tanpa keyword stuffing.

---

## 6. SEO Teknis & On-Page

### 6.1 Meta per halaman (unik)
- `<title>` 50–60 karakter: `Keyword Utama | [Nama Brand]`
- `<meta name="description">` 140–160 karakter + CTA
- `<link rel="canonical">` absolut, self-referencing
- `<html lang="id">`; `hreflang="id-ID"` + `x-default`
- `<meta name="viewport" content="width=device-width, initial-scale=1">`
- `<meta name="theme-color" content="#2E7D5B">`
- `<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">`
- Favicon: `.ico`, SVG, apple-touch-icon 180 px, manifest 192/512 px

**Contoh Beranda**
- Title: `Souvenir & Hampers Lebaran Custom | [Nama Brand]`
- Description: `Pesan souvenir, hampers & gift Lebaran eksklusif, bisa custom logo. Paket hemat hingga premium, kirim ke seluruh Indonesia. Pesan via WhatsApp.`

### 6.2 Struktur konten
- Satu H1 per halaman, hierarki H2→H3 berurutan.
- URL pendek, huruf kecil, tanda hubung, tanpa parameter.
- Internal link: hub ↔ paket ↔ blog ↔ portofolio dengan anchor deskriptif.
- Gambar: `width`/`height` eksplisit, `alt` deskriptif, nama file bermakna, `loading="lazy"` (kecuali LCP), `fetchpriority="high"` untuk gambar LCP, AVIF/WebP + fallback, `srcset/sizes`.
- Halaman inti ≥ 300 kata unik; artikel blog 1.000–2.000 kata; hindari duplikat.

### 6.3 Performa
- Self-host font (maks 2 keluarga, `font-display: swap`, preload font utama).
- Bootstrap minified, `defer` untuk script; CSS kritis inline untuk hero.
- Halaman < 1,5 MB; gambar LCP < 150 KB.
- HTTPS, HTTP/2 atau 3, Brotli/gzip, cache panjang untuk aset ber-hash, CDN.
- Cegah layout shift (ruang gambar & embed ber-dimensi).

### 6.4 File teknis
**robots.txt**
```
User-agent: *
Allow: /
Disallow: /admin/

# Crawler AI search (izinkan untuk visibilitas GEO)
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: Claude-SearchBot
Allow: /
User-agent: PerplexityBot
Allow: /

# Crawler pelatihan model (keputusan bisnis: Allow atau Disallow)
User-agent: GPTBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: Applebot-Extended
Allow: /

Sitemap: https://namadomain.com/sitemap.xml
```
> Bila tidak ingin konten dipakai melatih model, ubah 4 bot pelatihan menjadi `Disallow: /` dan biarkan bot *search* tetap diizinkan. Cek nama user-agent terbaru di dokumentasi penyedia.

**sitemap.xml:** semua URL kanonik, `<lastmod>` akurat (ISO 8601). Kirim ke Google Search Console & Bing Webmaster Tools. Aktifkan **IndexNow** untuk pembaruan cepat.

**llms.txt** (standar usulan, belum dijamin dipakai mesin pencari; murah dibuat):
```
# [Nama Brand]
> Penyedia souvenir, hampers, dan gift Lebaran custom di [Kota], melayani pengiriman seluruh Indonesia.

## Halaman Utama
- [Paket Hemat](https://namadomain.com/paket/hemat/): paket terjangkau untuk jumlah besar
- [Paket Premium](https://namadomain.com/paket/premium/): hampers eksklusif
- [Hampers Corporate](https://namadomain.com/paket/hampers-corporate/): branding logo untuk perusahaan
- [FAQ](https://namadomain.com/faq/): pemesanan, pembayaran, pengiriman

## Kontak
- WhatsApp: https://wa.me/6282131087971
```

### 6.5 SEO lokal
- Google Business Profile terverifikasi (kategori Gift Shop/Toko Hampers), foto rutin, produk, Q&A.
- NAP konsisten di web, GBP, sosial media, direktori.
- Bing Places, Apple Business Connect, direktori UMKM lokal.
- Halaman area layanan hanya bila isinya unik.

### 6.6 Keyword awal (validasi ulang dengan Search Console/Keyword Planner)
`souvenir lebaran`, `hampers lebaran`, `parsel lebaran`, `hampers lebaran custom logo`, `hampers corporate lebaran`, `gift lebaran kantor`, `souvenir idul fitri`, `hampers lebaran murah`, `hampers lebaran premium`, `souvenir buka puasa bersama` + varian `[kota]`.

---

## 7. AEO (Answer Engine Optimization)

Tujuan: dikutip sebagai jawaban langsung (featured snippet, AI Overviews, voice, chatbot).
1. H2 berbentuk pertanyaan + jawaban 40–60 kata, baru elaborasi.
2. Blok "Jawaban Singkat" di awal halaman paket & artikel.
3. Tabel perbandingan & daftar bernomor untuk konten komparatif/proses.
4. FAQ di halaman utama + `FAQPage` schema. Rich result FAQ di Google sudah dibatasi, tetapi markup tetap membantu pemahaman mesin lain; isi wajib terlihat di halaman.
5. Definisi eksplisit entitas ("Hampers adalah …").
6. Fakta spesifik (harga mulai, min. order, lead time, area kirim) tertulis di HTML, bukan hanya di gambar/JS.
7. Kalimat pendek, satu ide per paragraf.
8. Pertanyaan target: *Berapa harga hampers Lebaran? Kapan pre-order dibuka? Apa isi hampers yang bagus? Bisa custom logo?*

---

## 8. GEO (Generative Engine Optimization)

Tujuan: disebut/dikutip ChatGPT, Gemini, Perplexity, Copilot, Claude, Google AI Mode.
1. **E-E-A-T nyata:** nama & bio penulis, foto tim, alamat fisik, nomor legal, testimoni asli, studi kasus bernomor.
2. **Konsistensi entitas:** nama, deskripsi, logo identik di web, GBP, sosial, direktori; `sameAs` lengkap.
3. **Konten layak kutip:** data orisinal (jumlah pesanan nyata), harga, panduan, checklist; tampilkan tanggal terbit/diperbarui.
4. **HTML statis/server-rendered:** konten penting tidak bergantung JavaScript.
5. **Izinkan crawler AI search** dan pastikan WAF/CDN tidak memblokirnya.
6. **Sumber tepercaya** dirujuk dan ditautkan dalam artikel.
7. **Brand mention & backlink:** media lokal, komunitas, influencer, direktori UMKM, ulasan Google/marketplace.
8. **Kesegaran:** perbarui artikel & harga tiap musim (target sebelum 1 Syaban).
9. **Pemantauan:** uji prompt rutin (mis. "rekomendasi hampers lebaran custom di [kota]") di berbagai AI; catat sitasi.
10. **GA4:** buat channel khusus referrer AI (`chatgpt.com`, `perplexity.ai`, `gemini.google.com`, `copilot.microsoft.com`, `claude.ai`).

---

## 9. Structured Data (JSON-LD)

Gunakan `<script type="application/ld+json">` di `<head>`, satu `@graph` per halaman dengan `@id` saling terhubung. Validasi dengan Rich Results Test & Schema Markup Validator.

| Halaman | Schema |
|---|---|
| Semua | `Organization`/`LocalBusiness`(+`GiftShop`), `WebSite`, `WebPage`, `BreadcrumbList` |
| Beranda | `WebSite`, `OfferCatalog`, `ItemList` paket, `FAQPage` |
| Tentang | `AboutPage`, `Organization` + `founder` (`Person`), `ContactPoint` |
| Hub paket | `CollectionPage`, `ItemList` |
| Detail paket | `Product` + `Offer`/`AggregateOffer`, `FAQPage` |
| Portofolio | `CollectionPage`, `CreativeWork`/`ImageObject` |
| Blog daftar | `Blog`, `CollectionPage` |
| Artikel | `BlogPosting`, `Person`, `FAQPage`, `ImageObject` |
| Kontak | `ContactPage`, `LocalBusiness` + `openingHoursSpecification`, `geo` |

> `Review`/`AggregateRating` hanya bila ulasan nyata dan terlihat di halaman.

### 9.1 `@graph` Beranda
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness", "GiftShop"],
      "@id": "https://namadomain.com/#organization",
      "name": "[Nama Brand]",
      "url": "https://namadomain.com/",
      "logo": { "@type": "ImageObject", "url": "https://namadomain.com/assets/img/logo-512.png", "width": 512, "height": 512 },
      "image": "https://namadomain.com/assets/img/og-default.jpg",
      "description": "Souvenir, hampers, dan gift Lebaran custom dengan pengiriman ke seluruh Indonesia.",
      "telephone": "+6282131087971",
      "email": "halo@namadomain.com",
      "priceRange": "Rp50.000 - Rp1.000.000",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "[Alamat]",
        "addressLocality": "[Kota]",
        "addressRegion": "[Provinsi]",
        "postalCode": "[Kode Pos]",
        "addressCountry": "ID"
      },
      "geo": { "@type": "GeoCoordinates", "latitude": 0.0, "longitude": 0.0 },
      "openingHoursSpecification": [{
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
        "opens": "08:00", "closes": "17:00"
      }],
      "areaServed": { "@type": "Country", "name": "Indonesia" },
      "contactPoint": [{
        "@type": "ContactPoint",
        "telephone": "+6282131087971",
        "contactType": "customer service",
        "availableLanguage": ["id"],
        "url": "https://wa.me/6282131087971"
      }],
      "sameAs": [
        "https://www.instagram.com/[akun]",
        "https://www.tiktok.com/@[akun]",
        "https://www.facebook.com/[akun]",
        "https://maps.google.com/?cid=[ID]"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://namadomain.com/#website",
      "url": "https://namadomain.com/",
      "name": "[Nama Brand]",
      "inLanguage": "id-ID",
      "publisher": { "@id": "https://namadomain.com/#organization" }
    },
    {
      "@type": "WebPage",
      "@id": "https://namadomain.com/#webpage",
      "url": "https://namadomain.com/",
      "name": "Souvenir & Hampers Lebaran Custom | [Nama Brand]",
      "isPartOf": { "@id": "https://namadomain.com/#website" },
      "about": { "@id": "https://namadomain.com/#organization" },
      "inLanguage": "id-ID",
      "dateModified": "2026-10-21"
    }
  ]
}
```

### 9.2 Product (halaman paket)
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Paket Premium Hampers Lebaran",
  "description": "Hampers Lebaran premium dengan kemasan mewah dan opsi custom logo.",
  "image": ["https://namadomain.com/assets/img/paket-premium-1.webp"],
  "brand": { "@type": "Brand", "name": "[Nama Brand]" },
  "category": "Hampers Lebaran",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "IDR",
    "lowPrice": "250000",
    "highPrice": "750000",
    "offerCount": "3",
    "availability": "https://schema.org/PreOrder",
    "url": "https://namadomain.com/paket/premium/",
    "seller": { "@id": "https://namadomain.com/#organization" }
  }
}
```

### 9.3 BlogPosting
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "10 Ide Souvenir Lebaran untuk Kantor",
  "description": "Rekomendasi souvenir Lebaran untuk karyawan dan klien sesuai budget.",
  "image": "https://namadomain.com/assets/img/blog/ide-souvenir-kantor.webp",
  "datePublished": "2026-10-21T08:00:00+07:00",
  "dateModified": "2026-10-21T08:00:00+07:00",
  "inLanguage": "id-ID",
  "mainEntityOfPage": "https://namadomain.com/blog/ide-souvenir-lebaran-kantor/",
  "author": { "@type": "Person", "name": "[Nama Penulis]", "url": "https://namadomain.com/tentang/#penulis" },
  "publisher": { "@id": "https://namadomain.com/#organization" }
}
```

### 9.4 FAQPage & BreadcrumbList
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      "mainEntity": [{
        "@type": "Question",
        "name": "Kapan sebaiknya memesan hampers Lebaran?",
        "acceptedAnswer": { "@type": "Answer", "text": "Disarankan 4–6 minggu sebelum Lebaran untuk jumlah besar atau custom logo agar produksi dan pengiriman tidak terburu-buru." }
      }]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Beranda", "item": "https://namadomain.com/" },
        { "@type": "ListItem", "position": 2, "name": "Paket", "item": "https://namadomain.com/paket/" },
        { "@type": "ListItem", "position": 3, "name": "Paket Premium" }
      ]
    }
  ]
}
```

---

## 10. Open Graph, Twitter Card & Meta Sosial

```html
<meta property="og:type" content="website">           <!-- article untuk blog -->
<meta property="og:site_name" content="[Nama Brand]">
<meta property="og:locale" content="id_ID">
<meta property="og:title" content="Souvenir & Hampers Lebaran Custom | [Nama Brand]">
<meta property="og:description" content="Pesan souvenir & hampers Lebaran eksklusif, bisa custom logo. Pesan via WhatsApp.">
<meta property="og:url" content="https://namadomain.com/">
<meta property="og:image" content="https://namadomain.com/assets/img/og-default.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Hampers Lebaran hijau dengan motif bulan dan bintang">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Souvenir & Hampers Lebaran Custom | [Nama Brand]">
<meta name="twitter:description" content="Pesan souvenir & hampers Lebaran eksklusif, bisa custom logo.">
<meta name="twitter:image" content="https://namadomain.com/assets/img/og-default.jpg">

<!-- Khusus artikel -->
<meta property="article:published_time" content="2026-10-21T08:00:00+07:00">
<meta property="article:modified_time" content="2026-10-21T08:00:00+07:00">
<meta property="article:author" content="https://namadomain.com/tentang/#penulis">
<meta property="article:section" content="Ide Hampers">
```
- Gambar OG 1200×630, < 300 KB, teks di area aman tengah; buat per halaman utama.
- Uji di Facebook Sharing Debugger, LinkedIn Post Inspector, dan pratinjau tautan WhatsApp (WA memakai OG).

---

## 11. Aksesibilitas (WCAG 2.2 AA)
- Kontras teks ≥ 4,5:1 (mint hanya sebagai latar, teks memakai hijau tua).
- Skip link, fokus terlihat, target sentuh ≥ 44×44 px.
- Landmark `header/nav/main/footer`, ARIA pada dropdown & ikon.
- Motif dekoratif `aria-hidden="true"`; hormati `prefers-reduced-motion`.
- Semua gambar informatif beralt; form berlabel.

## 12. Privasi & Kepatuhan
- Sesuai UU PDP: kebijakan privasi, pemberitahuan analytics; form tidak menyimpan data (diteruskan ke WA).
- Klaim halal/PIRT hanya dengan dokumen sah.
- Harga, stok, dan testimoni harus dapat dibuktikan.

## 13. Analytics
- GA4 + Google Search Console + Bing Webmaster Tools (+ Microsoft Clarity opsional).
- Event: `click_whatsapp`, `click_phone`, `view_package`, `scroll_75`, `submit_custom_brief`.
- Dasbor mingguan: impresi, klik, posisi, CWV, klik WA, referrer AI.

## 14. Struktur Folder
```
/
├─ index.html
├─ tentang/index.html
├─ paket/{index,hemat,reguler,premium,hampers-corporate,custom}/index.html
├─ portofolio/index.html
├─ blog/index.html  +  blog/[slug]/index.html
├─ faq/  kontak/  kebijakan-privasi/  syarat-ketentuan/
├─ 404.html  robots.txt  sitemap.xml  llms.txt  manifest.webmanifest
└─ assets/
   ├─ css/{tokens.css, base.css, components.css, pages.css}
   ├─ js/{main.js, wa.js}
   ├─ img/ (WebP/AVIF)   fonts/   icons/
```

## 15. Kriteria Penerimaan
- [ ] 5 menu utama + dropdown Paket berfungsi di desktop & mobile
- [ ] Semua tombol WA ke `6282131087971` dengan pesan sesuai konteks
- [ ] Tiap halaman punya title, description, canonical, OG, Twitter, JSON-LD valid
- [ ] Rich Results Test & Schema Validator tanpa error
- [ ] Lighthouse Mobile & CWV sesuai target
- [ ] robots.txt, sitemap.xml, llms.txt tersedia; sitemap terkirim ke Search Console
- [ ] ≥ 10 artikel blog, ≥ 6 proyek portofolio, ≥ 20 FAQ
- [ ] Audit aksesibilitas (axe/WAVE) tanpa isu kritis
- [ ] Link rusak = 0; redirect www/non-www & http→https (301)

## 16. Roadmap
| Fase | Isi |
|---|---|
| 1 (Minggu 1–2) | Design system, template, Beranda, Paket, WA |
| 2 (Minggu 3) | Tentang, Portofolio, Blog + 10 artikel, FAQ |
| 3 (Minggu 4) | SEO teknis, schema, OG, QA, performa |
| 4 (Pasca rilis) | GBP, backlink, pemantauan sitasi AI, update berkala |
| Fase 2 | CMS/static generator, multi-bahasa (EN/AR), katalog dinamis |

## 17. Risiko & Mitigasi
| Risiko | Mitigasi |
|---|---|
| Foto produk kurang | Jadwalkan sesi foto; mockup sementara |
| Konten tipis | Template konten + checklist editorial |
| Perubahan algoritma/AI search | Audit kuartalan, fokus kualitas & E-E-A-T |
| Lonjakan trafik musiman | CDN, aset statis, caching |
| Spam WA | Pesan prefilled ber-konteks, jam operasional jelas |
