# Portofolio — Ryan Hidayat Taylor

One-page portfolio: **Hospitality & Sales Professional**.
Static site, no build step, no framework. HTML + CSS + vanilla JS.

## Struktur

```
index.html   # semua konten (semantic HTML, meta OG, JSON-LD Person)
style.css    # tema dark: navy #0F172A, cream #F5F1E8, amber #F59E0B
script.js    # reveal on scroll, count-up, garis timeline
assets/
  foto-ray.webp                # 760×760, crop kepala–bahu dari foto studio terbaru
  Ryan-Hidayat-Taylor-CV.pdf   # file CV untuk tombol unduh
  og-image.png                 # 1200×630 untuk preview share
  favicon.svg
```

## Preview lokal

```bash
python -m http.server 8099
# buka http://127.0.0.1:8099
```

## Deploy ke Vercel

Static murni — tidak ada `package.json`, tidak ada build.

**Via dashboard:** Add New → Project → import repo ini → Framework Preset: **Other**,
Build Command: kosong, Output Directory: kosong (root). Deploy.

**Via CLI:** `npx vercel --prod` di folder ini.

## Yang perlu diganti sebelum tayang

1. **Layanan freelance** di kartu "Untuk Pemilik Usaha" (saat ini):
   landing page usaha, setup toko online, pendampingan service & upselling.
   Ganti sesuai paket yang benar-benar kamu tawarkan.
2. **Deskripsi konsultan King Dimsum (2023)** — dua poin di sana ditulis umum;
   kalau ada hasil konkret (mis. kenaikan penjualan), ganti dengan angka.
3. **Foto** — `assets/foto-ray.webp` = crop kepala–bahu (rasio 1:1, 760×760)
   dari foto studio full-body terbaru. Kalau ada foto close-up yang lebih baik,
   ganti dengan rasio 1:1 minimal 600×600.
4. **Domain** — setelah punya domain, tambahkan `canonical`, `og:url`, dan `sitemap.xml`.
   Saat ini sengaja belum dipasang karena domain belum ada.
5. **itsme-ray.vercel.app** — link portofolio lain di bagian kontak; hapus barisnya
   kalau tidak ingin dua portofolio tampil bersamaan.

## Catatan teknis

- Animasi: fade-in hero, cincin amber berputar, foto mengambang, glow bergerak,
  count-up angka, garis timeline, dot pop, kilau tombol, stagger reveal.
  Semua dimatikan total saat `prefers-reduced-motion: reduce`.
- Konten tetap terlihat walau JS gagal (state sembunyi hanya aktif setelah class `.js`).
- Kontras teks terendah 7.6:1 (target WCAG AA 4.5:1).
