const HomeComponent = {
    template: `
        <div class="fade-in">
            <!-- Hero Section -->
            <div class="animated-bg rounded-3xl text-white p-12 mb-12 text-center shadow-2xl">
                <div class="text-6xl mb-4 pulse">📋</div>
                <h1 class="text-5xl font-extrabold mb-4">E-Report</h1>
                <p class="text-xl mb-6 text-blue-100">Sistem Pengaduan Layanan Masyarakat</p>
                <div class="flex justify-center gap-4">
                    <router-link to="/login" class="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl">
                        🔐 Login Admin
                    </router-link>
                </div>
            </div>
            
            <!-- Features -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div class="card-hover bg-white rounded-2xl shadow-lg p-8 text-center">
                    <div class="text-5xl mb-4">📝</div>
                    <h3 class="text-xl font-bold text-gray-800 mb-2">Laporkan</h3>
                    <p class="text-gray-600">Sampaikan aduan Anda dengan mudah melalui formulir online</p>
                </div>
                
                <div class="card-hover bg-white rounded-2xl shadow-lg p-8 text-center">
                    <div class="text-5xl mb-4">⚡</div>
                    <h3 class="text-xl font-bold text-gray-800 mb-2">Tindak Lanjut</h3>
                    <p class="text-gray-600">Laporan akan segera diproses oleh petugas kami</p>
                </div>
                
                <div class="card-hover bg-white rounded-2xl shadow-lg p-8 text-center">
                    <div class="text-5xl mb-4">✅</div>
                    <h3 class="text-xl font-bold text-gray-800 mb-2">Selesai</h3>
                    <p class="text-gray-600">Pantau status laporan Anda secara real-time</p>
                </div>
            </div>
            
            <!-- Stats -->
            <div class="bg-white rounded-2xl shadow-lg p-8 text-center">
                <h3 class="text-2xl font-bold text-gray-800 mb-6">📊 Statistik Cepat</h3>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                        <div class="text-3xl font-bold text-blue-600">{{ stats.total_laporan || 0 }}</div>
                        <div class="text-sm text-gray-500">Total Laporan</div>
                    </div>
                    <div>
                        <div class="text-3xl font-bold text-yellow-600">{{ stats.menunggu || 0 }}</div>
                        <div class="text-sm text-gray-500">Menunggu</div>
                    </div>
                    <div>
                        <div class="text-3xl font-bold text-orange-600">{{ stats.diproses || 0 }}</div>
                        <div class="text-sm text-gray-500">Diproses</div>
                    </div>
                    <div>
                        <div class="text-3xl font-bold text-green-600">{{ stats.selesai || 0 }}</div>
                        <div class="text-sm text-gray-500">Selesai</div>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            stats: {}
        };
    },
    async mounted() {
        try {
            const res = await axios.get('/api/stats');
            if (res.data.status === 200) {
                this.stats = res.data.data;
            }
        } catch (err) {
            console.error(err);
        }
    }
};