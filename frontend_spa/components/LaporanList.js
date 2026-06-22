const LaporanListComponent = {
    template: `
        <div class="fade-in">
            <div class="flex justify-between items-center mb-6 flex-wrap gap-4">
                <div>
                    <h2 class="text-2xl font-bold text-gray-800">📋 Daftar Laporan</h2>
                    <p class="text-gray-500 text-sm mt-1">Kelola semua pengaduan masyarakat</p>
                </div>
                <router-link to="/laporan/create" class="btn-ripple bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl transition-all flex items-center gap-2 shadow-md">
                    <span class="text-lg">+</span> Tambah Laporan
                </router-link>
            </div>
            
            <div class="bg-white rounded-2xl shadow-md overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="min-w-full">
                        <thead class="bg-gradient-to-r from-gray-100 to-gray-200">
                            <tr>
                                <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">ID</th>
                                <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Pelapor</th>
                                <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Judul</th>
                                <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Kategori</th>
                                <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                                <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Tanggal</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="loading">
                                <td colspan="6" class="text-center py-8">
                                    <div class="spinner mx-auto"></div>
                                    <p class="text-gray-500 mt-2">Memuat data...</p>
                                </td>
                            </tr>
                            <tr v-else-if="laporanList.length === 0">
                                <td colspan="6" class="text-center py-8 text-gray-500">
                                    <div class="text-5xl mb-2">📭</div>
                                    <p>Belum ada laporan</p>
                                </td>
                            </tr>
                            <tr v-for="laporan in laporanList" :key="laporan.id" 
                                class="table-row-hover border-t cursor-pointer transition-smooth"
                                @click="viewDetail(laporan.id)">
                                <td class="px-4 py-3 text-sm text-gray-600">{{ laporan.id }}</td>
                                <td class="px-4 py-3">
                                    <div class="font-medium text-gray-800">{{ laporan.nama_pelapor }}</div>
                                    <div class="text-xs text-gray-500">{{ laporan.email_pelapor || '-' }}</div>
                                </td>
                                <td class="px-4 py-3">
                                    <div class="font-medium text-gray-800">{{ laporan.judul_laporan }}</div>
                                    <div class="text-xs text-gray-500 line-clamp-1">{{ laporan.isi_laporan?.substring(0, 50) }}...</div>
                                </td>
                                <td class="px-4 py-3">
                                    <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                                        {{ laporan.nama_kategori }}
                                    </span>
                                </td>
                                <td class="px-4 py-3">
                                    <span :class="statusClass(laporan.status)" class="badge px-2 py-1 rounded-full text-xs font-medium">
                                        {{ statusIcon(laporan.status) }} {{ laporan.status }}
                                    </span>
                                </td>
                                <td class="px-4 py-3 text-sm text-gray-500">
                                    {{ formatDate(laporan.created_at) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            laporanList: [],
            loading: true
        };
    },
    methods: {
        statusClass(status) {
            const classes = {
                'menunggu': 'bg-yellow-100 text-yellow-800',
                'diproses': 'bg-blue-100 text-blue-800',
                'selesai': 'bg-green-100 text-green-800',
                'ditolak': 'bg-red-100 text-red-800'
            };
            return classes[status] || 'bg-gray-100 text-gray-800';
        },
        statusIcon(status) {
            const icons = {
                'menunggu': '⏳',
                'diproses': '🔄',
                'selesai': '✅',
                'ditolak': '❌'
            };
            return icons[status] || '📌';
        },
        formatDate(date) {
            if (!date) return '-';
            const d = new Date(date);
            return d.toLocaleDateString('id-ID');
        },
        viewDetail(id) {
            alert('📋 Detail laporan ID: ' + id + '\n(Fitur detail akan segera hadir)');
        }
    },
    async mounted() {
        this.loading = true;
        try {
            const res = await axios.get('/api/laporan');
            if (res.data.status === 200) {
                this.laporanList = res.data.data;
            }
        } catch (err) {
            console.error(err);
            alert('Gagal memuat data laporan');
        } finally {
            this.loading = false;
        }
    }
};