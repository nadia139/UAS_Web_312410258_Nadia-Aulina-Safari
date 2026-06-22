const DashboardComponent = {
    template: `
        <div class="fade-in">
            <!-- Welcome Banner -->
            <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 mb-8 text-white shadow-xl">
                <div class="flex justify-between items-center">
                    <div>
                        <h2 class="text-2xl font-bold">Selamat Datang kembali, {{ adminName }}! 👋</h2>
                        <p class="text-blue-100 mt-1">Ini adalah dashboard monitoring laporan masyarakat</p>
                    </div>
                    <div class="text-right">
                        <div class="text-4xl">📊</div>
                        <p class="text-sm text-blue-100 mt-1">{{ currentDate }}</p>
                    </div>
                </div>
            </div>
            
            <!-- Stats Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div class="card-hover bg-white rounded-2xl shadow-md p-6 border-l-4 border-blue-500">
                    <div class="flex justify-between items-start">
                        <div>
                            <p class="text-gray-500 text-sm">Total Laporan</p>
                            <p class="text-3xl font-bold text-gray-800">{{ stats.total_laporan || 0 }}</p>
                        </div>
                        <div class="text-3xl">📋</div>
                    </div>
                    <div class="mt-4 text-xs text-gray-400">Semua laporan masuk</div>
                </div>
                
                <div class="card-hover bg-white rounded-2xl shadow-md p-6 border-l-4 border-yellow-500">
                    <div class="flex justify-between items-start">
                        <div>
                            <p class="text-gray-500 text-sm">Menunggu</p>
                            <p class="text-3xl font-bold text-yellow-600">{{ stats.menunggu || 0 }}</p>
                        </div>
                        <div class="text-3xl">⏳</div>
                    </div>
                    <div class="mt-4 text-xs text-gray-400">Belum diproses</div>
                </div>
                
                <div class="card-hover bg-white rounded-2xl shadow-md p-6 border-l-4 border-orange-500">
                    <div class="flex justify-between items-start">
                        <div>
                            <p class="text-gray-500 text-sm">Diproses</p>
                            <p class="text-3xl font-bold text-orange-600">{{ stats.diproses || 0 }}</p>
                        </div>
                        <div class="text-3xl">🔄</div>
                    </div>
                    <div class="mt-4 text-xs text-gray-400">Sedang ditangani</div>
                </div>
                
                <div class="card-hover bg-white rounded-2xl shadow-md p-6 border-l-4 border-green-500">
                    <div class="flex justify-between items-start">
                        <div>
                            <p class="text-gray-500 text-sm">Selesai</p>
                            <p class="text-3xl font-bold text-green-600">{{ stats.selesai || 0 }}</p>
                        </div>
                        <div class="text-3xl">✅</div>
                    </div>
                    <div class="mt-4 text-xs text-gray-400">Telah diselesaikan</div>
                </div>
            </div>
            
            <!-- Recent Reports -->
            <div class="bg-white rounded-2xl shadow-md overflow-hidden">
                <div class="bg-gray-50 px-6 py-4 border-b">
                    <h3 class="text-xl font-bold text-gray-800">📰 Laporan Terbaru</h3>
                </div>
                <div v-if="loading" class="p-8 text-center">
                    <div class="spinner mx-auto"></div>
                    <p class="text-gray-500 mt-2">Memuat data...</p>
                </div>
                <div v-else-if="!stats.laporan_terbaru || stats.laporan_terbaru.length === 0" class="p-8 text-center text-gray-500">
                    <div class="text-5xl mb-2">📭</div>
                    <p>Belum ada laporan</p>
                </div>
                <div v-else>
                    <div v-for="laporan in stats.laporan_terbaru" :key="laporan.id" 
                        class="table-row-hover border-b last:border-b-0 p-4 cursor-pointer transition-smooth"
                        @click="viewDetail(laporan.id)">
                        <div class="flex justify-between items-start">
                            <div class="flex-1">
                                <div class="flex items-center gap-2 mb-1">
                                    <span class="font-semibold text-gray-800">{{ laporan.judul_laporan }}</span>
                                    <span :class="statusClass(laporan.status)" class="badge px-2 py-0.5 rounded-full text-xs font-medium">
                                        {{ laporan.status }}
                                    </span>
                                </div>
                                <p class="text-sm text-gray-600">👤 {{ laporan.nama_pelapor }} | 📅 {{ formatDate(laporan.created_at) }}</p>
                            </div>
                            <div class="text-gray-400 text-sm">
                                {{ laporan.nama_kategori }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            stats: {},
            loading: true,
            adminName: localStorage.getItem('adminNama') || 'Admin'
        };
    },
    computed: {
        currentDate() {
            const now = new Date();
            return now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        }
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
        formatDate(date) {
            if (!date) return '-';
            const d = new Date(date);
            return d.toLocaleDateString('id-ID');
        },
        viewDetail(id) {
            alert('📋 Detail laporan ID: ' + id + '\n(Fitur akan segera hadir)');
        }
    },
    async mounted() {
        this.loading = true;
        try {
            const res = await axios.get('/api/stats');
            if (res.data.status === 200) {
                this.stats = res.data.data;
            }
        } catch (err) {
            console.error(err);
        } finally {
            this.loading = false;
        }
    }
};