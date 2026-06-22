import LaporanForm from './LaporanForm.js';

const LaporanList = {
    components: {
        LaporanForm
    },
    template: `
        <div class="p-6 max-w-7xl mx-auto">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-gray-800">📋 Manajemen Pengaduan (E-Report)</h2>
                <button @click="bukaModalTambah" class="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition shadow">
                    <span>+ Tambah Laporan</span>
                </button>
            </div>

            <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-gray-50 text-gray-600 border-b border-gray-100 text-sm font-semibold">
                            <th class="p-4">ID</th>
                            <th class="p-4">Pelapor</th>
                            <th class="p-4">Judul Aduan</th>
                            <th class="p-4">Foto Bukti</th>
                            <th class="p-4">Status</th>
                            <th class="p-4 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100 text-sm">
                        <tr v-for="row in listLaporan" :key="row.id" class="hover:bg-gray-50/70 transition">
                            <td class="p-4 font-semibold text-gray-700">{{ row.id }}</td>
                            <td class="p-4 text-gray-700">{{ row.pelapor }}</td>
                            <td class="p-4 text-gray-600 font-medium">{{ row.judul }}</td>
                            <td class="p-4">
                                <img :src="'http://localhost:8080/uploads/' + row.gambar_bukti" class="w-16 h-12 object-cover rounded-md border bg-gray-100" alt="bukti">
                            </td>
                            <td class="p-4">
                                <span :class="{
                                    'bg-amber-100 text-amber-800': row.status === 'menunggu',
                                    'bg-blue-100 text-blue-800': row.status === 'diproses',
                                    'bg-emerald-100 text-emerald-800': row.status === 'selesai'
                                }" class="px-2.5 py-1 text-xs font-bold rounded-full capitalize">
                                    {{ row.status }}
                                </span>
                            </td>
                            <td class="p-4 text-center space-x-2">
                                <button @click="bukaModalEdit(row)" class="bg-amber-500 hover:bg-amber-600 text-white text-xs px-3 py-1.5 rounded font-medium transition">
                                    ✏️ Edit
                                </button>
                                <button @click="hapusLaporan(row.id)" class="bg-rose-500 hover:bg-rose-600 text-white text-xs px-3 py-1.5 rounded font-medium transition">
                                    🗑️ Hapus
                                </button>
                            </td>
                        </tr>
                        <tr v-if="listLaporan.length === 0">
                            <td colspan="6" class="text-center p-8 text-gray-400">Belum ada data laporan masuk.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <LaporanForm 
                :isOpen="isModalOpen" 
                :mode="modalMode" 
                :selectedData="currentData" 
                @close="tutupModal" 
                @refresh="getLaporan" 
            />
        </div>
    `,
    data() {
        return {
            listLaporan: [],
            isModalOpen: false,
            modalMode: 'tambah',
            currentData: null
        }
    },
    methods: {
        getLaporan() {
            axios.get('http://localhost:8080/api/laporan')
                .then(res => { this.listLaporan = res.data; })
                .catch(err => console.error(err));
        },
        bukaModalTambah() {
            this.modalMode = 'tambah';
            this.currentData = null;
            this.isModalOpen = true;
        },
        bukaModalEdit(row) {
            this.modalMode = 'edit';
            this.currentData = row;
            this.isModalOpen = true;
        },
        tutupModal() {
            this.isModalOpen = false;
        },
        hapusLaporan(id) {
            if (confirm('Apakah Anda yakin ingin menghapus data pengaduan ini secara permanen?')) {
                axios.delete(`http://localhost:8080/api/laporan/${id}`)
                    .then(() => {
                        alert('Laporan terhapus dari sistem.');
                        this.getLaporan();
                    });
            }
        }
    },
    mounted() {
        this.getLaporan();
    }
};

export default LaporanList;