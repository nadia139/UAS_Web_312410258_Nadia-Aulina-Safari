E-Report Sistem Pelaporan Pengaduan Layanan Masyarakat
Proyek Ujian Akhir Semester (UAS) Mata Kuliah Pemrograman Web 2.

E-Report adalah sistem informasi berbasis web yang memudahkan masyarakat dalam menyampaikan pengaduan terkait layanan publik, seperti kerusakan infrastruktur, gangguan keamanan, kebersihan lingkungan, pelayanan publik, hingga bencana alam. Sistem ini dibangun dengan Decoupled Architecture, memisahkan secara penuh antara server (backend) dan klien (frontend).

Admin dapat mengelola data pelapor, kategori aduan, isi laporan, gambar bukti, serta memantau dan memperbarui status penanganan setiap aduan yang masuk.

Teknologi yang Digunakan

Komponen - Teknologi
Backend Engine - PHP Framework CodeIgniter 4 (RESTful API Server, Resource Controller)
Frontend Engine - Vue.js 3 + Vue Router (CDN, Single Page Application)
UI Framework - TailwindCSS (CDN)
Data Transfer - Axios (HTTP Client)
Basis Data - MySQL / MariaDB


<img width="236" height="124" alt="image" src="https://github.com/user-attachments/assets/b4aaa3b2-9b5f-4f76-9b14-a2db6b85dbb5" />



Database Designer phpMyAdmin

<img width="146" height="83" alt="image" src="https://github.com/user-attachments/assets/e4db55c6-60d9-4f7b-bc3c-5b9d9e5ddc9d" />



Uji Coba Keamanan API (Postman)

Percobaan mengakses endpoint manipulasi data tanpa menyertakan token Authorization akan menghasilkan response 401 Unauthorized, membuktikan bahwa filter proteksi token bekerja dengan baik.

<img width="1600" height="711" alt="WhatsApp Image 2026-06-22 at 10 54 03" src="https://github.com/user-attachments/assets/4becbff9-f1f4-4d0e-9e66-c2194790a5d7" />



Tampilan Antarmuka

<img width="959" height="479" alt="image" src="https://github.com/user-attachments/assets/72da02ab-fc95-4fe7-9cbe-7a690d6dc7fc" />



<img width="959" height="509" alt="image" src="https://github.com/user-attachments/assets/f23e9d5a-bc92-4ddb-b83b-1829da494087" />



<img width="956" height="381" alt="image" src="https://github.com/user-attachments/assets/38b48cb2-4491-4882-b776-9e613f7bd7ea" />



<img width="959" height="419" alt="image" src="https://github.com/user-attachments/assets/68f2cec3-91dd-4049-9e29-a84441296354" />

Setup Frontend (Vue.js SPA)

bashcd frontend-spa


Buka file index.html melalui browser, atau jalankan lewat Apache (XAMPP)
Sesuaikan konstanta SERVER_ROOT di dalam index.html agar mengarah ke URL backend yang sesuai

Akun Default Admin

Email    : admin@ereport.id
Password : admin123


Link Demo: https://drive.google.com/file/d/1P7oFgXEpbloEAK7ah3qC2OCxnNXGg5Jm/view?usp=sharing

Link Video Presentasi (YouTube): https://youtu.be/kwDhBjCCdDQ?si=3zpnrH9cg4o6qyNB
