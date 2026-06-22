const KategoriComponent = {
  name: 'Kategori',
  template: `
  <div class="min-h-screen bg-surface-50 flex">
    <!-- SIDEBAR -->
    <aside class="w-64 min-h-screen bg-primary-900 fixed left-0 top-0 z-30 flex flex-col">
      <div class="flex items-center gap-3 px-6 py-5 border-b border-white/10">
        <div class="w-8 h-8 bg-accent-500 rounded-lg flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        </div>
        <div>
          <div class="text-white font-bold text-base">E-Report</div>
          <div class="text-primary-400 text-xs">Admin Panel</div>
        </div>
      </div>
      <div class="px-6 py-4 border-b border-white/10">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-full bg-primary-700 flex items-center justify-center">
            <span class="text-white font-bold text-sm">{{ adminInitial }}</span>
          </div>
          <div>
            <div class="text-white text-sm font-medium">{{ adminNama }}</div>
            <div class="text-primary-400 text-xs">Administrator</div>
          </div>
        </div>
      </div>
      <nav class="flex-1 px-4 py-5 space-y-1">
        <router-link to="/dashboard" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-primary-300 hover:bg-white/5 hover:text-white transition-all">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
          Dashboard
        </router-link>
        <router-link to="/laporan" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-primary-300 hover:bg-white/5 hover:text-white transition-all">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          Data Laporan
        </router-link>
        <router-link to="/kategori" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium bg-white/10 text-white">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>
          Kategori Aduan
        </router-link>
      </nav>
      <div class="px-4 py-5 border-t border-white/10">
        <button @click="doLogout" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
          Logout
        </button>
      </div>
    </aside>

    <!-- MAIN -->
    <main class="ml-64 flex-1 p-8">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Kategori Aduan</h1>
          <p class="text-gray-500 text-sm mt-1">Kelola kategori pengaduan masyarakat</p>
        </div>
        <button @click="openModal()"
          class="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-primary-500/20">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
          Tambah Kategori
        </button>
      </div>

      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div v-for="i in 3" :key="i" class="bg-white rounded-2xl border border-surface-200 p-6 animate-pulse">
          <div class="h-6 bg-gray-200 rounded mb-3 w-2/3"></div>
          <div class="h-4 bg-gray-100 rounded w-full"></div>
        </div>
      </div>

      <div v-else-if="dataKategori.length === 0"
        class="bg-white rounded-2xl border border-surface-200 p-12 text-center text-gray-400">
        Belum ada kategori. Tambahkan kategori pertama.
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div v-for="item in dataKategori" :key="item.id"
          class="bg-white rounded-2xl border border-surface-200 shadow-sm p-6 hover:shadow-md transition-shadow">
          <div class="flex items-start justify-between mb-3">
            <div class="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
              <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>
            </div>
            <div class="flex gap-1">
              <button @click="openModal(item)" class="p-1.5 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
              </button>
              <button @click="deleteKategori(item.id)" class="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </div>
          </div>
          <h3 class="font-bold text-gray-900 text-base mb-1">{{ item.nama_kategori }}</h3>
          <p class="text-gray-500 text-sm leading-relaxed">{{ item.deskripsi || 'Tidak ada deskripsi.' }}</p>
          <div class="mt-4 pt-4 border-t border-surface-100">
            <span class="text-xs text-gray-400">Dibuat: {{ formatDate(item.created_at) }}</span>
          </div>
        </div>
      </div>
    </main>

    <!-- MODAL -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay" style="background:rgba(0,0,0,0.5)">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div class="flex items-center justify-between px-6 py-4 border-b border-surface-200">
          <h3 class="font-bold text-gray-900 text-lg">{{ editMode ? 'Edit Kategori' : 'Tambah Kategori Baru' }}</h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <div v-if="modalError" class="mx-6 mt-4 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{{ modalError }}</div>
        <div class="px-6 py-5 space-y-4">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Nama Kategori <span class="text-red-500">*</span></label>
            <input v-model="form.nama_kategori" type="text" placeholder="contoh: Infrastruktur"
              class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"/>
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Deskripsi</label>
            <textarea v-model="form.deskripsi" rows="3" placeholder="Deskripsi singkat kategori ini..."
              class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"></textarea>
          </div>
        </div>
        <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-surface-200">
          <button @click="closeModal" class="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-surface-100 hover:bg-surface-200 rounded-xl transition-all">Batal</button>
          <button @click="saveKategori" :disabled="saving"
            class="px-5 py-2.5 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 rounded-xl transition-all flex items-center gap-2">
            <svg v-if="saving" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            {{ saving ? 'Menyimpan...' : (editMode ? 'Simpan Perubahan' : 'Tambah Kategori') }}
          </button>
        </div>
      </div>
    </div>
  </div>
  `,
  data() {
    return {
      adminNama: localStorage.getItem('adminNama') || 'Admin',
      dataKategori: [], loading: true,
      showModal: false, editMode: false, editId: null,
      saving: false, modalError: '',
      form: { nama_kategori:'', deskripsi:'' },
    };
  },
  computed: {
    adminInitial() { return this.adminNama.charAt(0).toUpperCase(); },
  },
  async mounted() { await this.fetchKategori(); },
  methods: {
    async fetchKategori() {
      this.loading = true;
      try { const res = await window.$api.get('/api/kategori'); this.dataKategori = res.data.data; }
      catch (e) { console.error(e); } finally { this.loading = false; }
    },
    openModal(item = null) {
      this.modalError = '';
      if (item) { this.editMode = true; this.editId = item.id; this.form = { nama_kategori:item.nama_kategori, deskripsi:item.deskripsi||'' }; }
      else { this.editMode = false; this.editId = null; this.form = { nama_kategori:'', deskripsi:'' }; }
      this.showModal = true;
    },
    closeModal() { this.showModal = false; this.modalError = ''; },
    async saveKategori() {
      this.modalError = '';
      if (!this.form.nama_kategori.trim()) { this.modalError = 'Nama kategori wajib diisi.'; return; }
      this.saving = true;
      try {
        if (this.editMode) {
          await window.$api.put(`/api/kategori/update/${this.editId}`, this.form, { headers:{ 'Content-Type':'application/json' } });
        } else {
          const fd = new FormData();
          fd.append('nama_kategori', this.form.nama_kategori);
          fd.append('deskripsi', this.form.deskripsi);
          await window.$api.post('/api/kategori/create', fd);
        }
        await this.fetchKategori(); this.closeModal();
      } catch (err) {
        const msg = err.response?.data?.message || 'Terjadi kesalahan saat menyimpan.';
        this.modalError = typeof msg === 'object' ? Object.values(msg).join('. ') : msg;
      } finally { this.saving = false; }
    },
    async deleteKategori(id) {
      if (!confirm('Yakin hapus kategori ini? Semua laporan terkait juga akan terhapus.')) return;
      try { await window.$api.delete(`/api/kategori/delete/${id}`); await this.fetchKategori(); }
      catch (err) { alert(err.response?.data?.message || 'Gagal menghapus kategori.'); }
    },
    async doLogout() {
      if (!confirm('Yakin ingin logout?')) return;
      try { await window.$api.post('/api/auth/logout'); } catch (_) {}
      localStorage.clear(); this.$router.push('/login');
    },
    formatDate(d) {
      if (!d) return '-';
      return new Date(d).toLocaleDateString('id-ID', { day:'numeric', month:'short', year:'numeric' });
    },
  },
};