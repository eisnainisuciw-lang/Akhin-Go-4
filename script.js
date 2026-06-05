/* ============================================================
   script.js - AKHIN.GO Landing Page
   
   Berisi:
   1. Hamburger menu (buka/tutup menu mobile)
   2. Navbar berubah saat di-scroll
   3. Smooth scroll saat klik link navbar
   4. Animasi fade-in saat section muncul di layar
   5. Penanganan gambar yang gagal dimuat
   ============================================================ */


// ===== 1. HAMBURGER MENU =====
// Saat tombol hamburger diklik, menu mobile dibuka atau ditutup

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', function () {
  // Toggle class 'open' pada hamburger dan menu
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
});

// Tutup menu saat link diklik (untuk navigasi yang mulus)
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
  });
});


// ===== 2. NAVBAR SCROLL EFFECT =====
// Navbar berubah tampilan (lebih solid) saat halaman di-scroll ke bawah

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function () {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


// ===== 3. ACTIVE NAV LINK =====
// Tandai link navbar yang sedang aktif berdasarkan posisi scroll

const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', function () {
  const scrollPos = window.scrollY + 100; // Offset sedikit

  sections.forEach(function (section) {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector('.nav-link[href="#' + id + '"]');

    if (scrollPos >= top && scrollPos < bottom) {
      // Hapus kelas aktif dari semua link
      navLinks.forEach(function (l) { l.classList.remove('active'); });
      // Tambahkan kelas aktif ke link yang sesuai
      if (link) link.classList.add('active');
    }
  });
});


// ===== 4. ANIMASI FADE-IN SAAT SCROLL =====
// Elemen dengan kelas 'fade-in' akan muncul dengan animasi saat masuk ke layar

const fadeElements = document.querySelectorAll('.fade-in');

// Gunakan IntersectionObserver untuk mendeteksi elemen yang masuk viewport
const observer = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // Tambahkan kelas 'visible' agar animasi CSS berjalan
        entry.target.classList.add('visible');
        // Hentikan pengamatan setelah animasi berjalan (hemat performa)
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,    // Mulai animasi saat 10% elemen terlihat
    rootMargin: '0px 0px -40px 0px' // Sedikit offset dari bawah
  }
);

// Daftarkan semua elemen fade-in ke observer
fadeElements.forEach(function (el) {
  observer.observe(el);
});


// ===== 5. PENANGANAN GAMBAR GAGAL DIMUAT =====
// Jika gambar tidak bisa dimuat, tampilkan placeholder sederhana

const allImages = document.querySelectorAll('img');

allImages.forEach(function (img) {
  img.addEventListener('error', function () {
    // Sembunyikan gambar yang rusak
    this.style.display = 'none';

    // Tambahkan teks fallback pada wrapper gambar jika ada
    const wrapper = this.parentElement;
    if (wrapper && !wrapper.querySelector('.fallback-text')) {
      const fallback = document.createElement('p');
      fallback.className = 'fallback-text';
      fallback.textContent = '🖼️ Gambar belum ditambahkan';
      fallback.style.cssText = 'color: #6b9ab8; font-size: 13px; padding: 20px; text-align: center;';
      wrapper.appendChild(fallback);
    }
  });
});


// ===== 6. SMOOTH SCROLL MANUAL (fallback) =====
// Untuk browser lama yang tidak mendukung scroll-behavior CSS

document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    const targetEl = document.querySelector(targetId);

    if (targetEl) {
      e.preventDefault();
      const offset = 70; // Tinggi navbar agar konten tidak tertutup
      const top = targetEl.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  });
});


// ===== INISIALISASI =====
// Jalankan saat halaman selesai dimuat

document.addEventListener('DOMContentLoaded', function () {
  console.log('AKHIN.GO Landing Page siap! 🚀');
});