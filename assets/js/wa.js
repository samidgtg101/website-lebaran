/**
 * wa.js — WhatsApp Integration & Dynamic Lead Routing
 * Target Number: 6282211221909
 */

const WA_CONFIG = {
  phone: '6282211221909',
  brandName: 'Saka Souvenir Lebaran',
  defaultText: 'Halo Saka Souvenir Lebaran, saya ingin tanya souvenir/hampers Lebaran 2027.'
};

/**
 * Builds a direct wa.me link with encoded message
 */
function buildWaUrl(message) {
  const text = message || WA_CONFIG.defaultText;
  return `https://wa.me/${WA_CONFIG.phone}?text=${encodeURIComponent(text.trim())}`;
}

/**
 * Dispatches GA4 analytics event for WhatsApp conversion
 */
function trackWaClick(placement, packageName) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'click_whatsapp', {
      placement: placement || 'unspecified',
      package: packageName || 'none',
      page: window.location.pathname
    });
  }
  // Console logging for debugging and verification
  console.log(`[WA Lead] Click recorded: placement=${placement}, package=${packageName}`);
}

/**
 * Initialize all WhatsApp interactive triggers
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Bind all data-wa-text links
  const waButtons = document.querySelectorAll('[data-wa-text]');
  waButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const customText = btn.getAttribute('data-wa-text');
      const placement = btn.getAttribute('data-wa-placement') || 'button';
      const packageName = btn.getAttribute('data-wa-package') || '';
      
      trackWaClick(placement, packageName);
      
      // If href is not yet set or wants programmatic URL
      if (!btn.getAttribute('href') || btn.getAttribute('href') === '#') {
        e.preventDefault();
        window.open(buildWaUrl(customText), '_blank', 'noopener,noreferrer');
      }
    });
  });

  // 2. Custom Brief Form Handler
  const customForm = document.getElementById('custom-brief-form');
  if (customForm) {
    customForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nama = document.getElementById('form-nama')?.value || '-';
      const perusahaan = document.getElementById('form-perusahaan')?.value || '-';
      const jumlah = document.getElementById('form-jumlah')?.value || '-';
      const budget = document.getElementById('form-budget')?.value || '-';
      const tanggal = document.getElementById('form-tanggal')?.value || '-';
      const catatan = document.getElementById('form-catatan')?.value || '-';

      const briefMessage = `Halo ${WA_CONFIG.brandName}, saya ingin konsultasi pemesanan Paket Custom Lebaran:\n\n` +
        `👤 Nama: ${nama}\n` +
        `🏢 Perusahaan / Instansi: ${perusahaan}\n` +
        `📦 Perkiraan Jumlah: ${jumlah} pcs\n` +
        `💰 Estimasi Budget: ${budget}\n` +
        `📅 Tanggal Dibutuhkan: ${tanggal}\n` +
        `📝 Request Khusus / Catatan:\n${catatan}\n\n` +
        `Mohon info ketersediaan slot & katalog rekomendasinya. Terima kasih!`;

      trackWaClick('custom_form', 'custom_package');

      const waUrl = buildWaUrl(briefMessage);
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    });
  }
});
