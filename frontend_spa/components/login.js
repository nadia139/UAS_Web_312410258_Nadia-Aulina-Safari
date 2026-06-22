const LoginComponent = {
    template: `
        <div class="min-h-screen flex items-center justify-center py-12 px-4">
            <div class="max-w-md w-full fade-in">
                <div class="text-center mb-8">
                    <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl mb-4 pulse">
                        <span class="text-3xl">📋</span>
                    </div>
                    <h1 class="text-4xl font-extrabold gradient-text">E-Report</h1>
                    <p class="text-gray-500 mt-2">Sistem Pengaduan Layanan Masyarakat</p>
                </div>

                <div class="glass-card rounded-2xl shadow-2xl p-8">
                    <div class="text-center mb-6">
                        <h2 class="text-2xl font-bold text-gray-800">Login Admin</h2>
                        <p class="text-gray-500 text-sm mt-1">Masukkan kredensial Anda</p>
                    </div>
                    
                    <div v-if="errorMsg" class="bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg px-4 py-3 mb-5 text-sm shadow-md">
                        <div class="flex items-center">
                            <span class="text-xl mr-2">⚠️</span>
                            {{ errorMsg }}
                        </div>
                    </div>
                    
                    <form @submit.prevent="doLogin">
                        <div class="mb-5">
                            <label class="block text-gray-700 font-semibold mb-2">📧 Email Address</label>
                            <input type="email" v-model="form.email" placeholder="admin@ereport.id" 
                                class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-smooth"
                                required>
                        </div>
                        
                        <div class="mb-6">
                            <label class="block text-gray-700 font-semibold mb-2">🔒 Password</label>
                            <div class="relative">
                                <input :type="showPass ? 'text' : 'password'" v-model="form.password" placeholder="••••••••" 
                                    class="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-smooth"
                                    required>
                                <button type="button" @click="showPass = !showPass" class="absolute right-3 top-3 text-gray-500 hover:text-gray-700">
                                    {{ showPass ? '🙈' : '👁️' }}
                                </button>
                            </div>
                        </div>
                        
                        <button type="submit" :disabled="loading" 
                            class="btn-ripple w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg">
                            <span v-if="loading" class="spinner"></span>
                            {{ loading ? 'Memverifikasi...' : '🚀 Masuk ke Dashboard' }}
                        </button>
                    </form>
                    
                    <div class="mt-6 pt-4 border-t text-center">
                        <p class="text-gray-400 text-xs">🔐 Default: <span class="font-mono bg-gray-100 px-2 py-1 rounded">admin@ereport.id</span> / <span class="font-mono bg-gray-100 px-2 py-1 rounded">admin123</span></p>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() { 
        return { 
            form: { email: '', password: '' }, 
            errorMsg: '', 
            loading: false, 
            showPass: false 
        }; 
    },
    methods: {
        async doLogin() {
            this.errorMsg = '';
            if (!this.form.email || !this.form.password) { 
                this.errorMsg = 'Email dan password wajib diisi.'; 
                return; 
            }
            this.loading = true;
            try {
                const response = await axios.post('/api/auth/login', {
                    email: this.form.email,
                    password: this.form.password
                });
                
                if (response.data.status === 200) {
                    const { token, nama } = response.data.data;
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('token', token);
                    localStorage.setItem('adminNama', nama);
                    this.$router.push('/dashboard');
                }
            } catch (err) {
                const msg = err.response?.data?.message || 'Login gagal. Periksa kembali kredensial Anda.';
                this.errorMsg = typeof msg === 'object' ? Object.values(msg).join(', ') : msg;
            } finally { 
                this.loading = false; 
            }
        },
    },
};