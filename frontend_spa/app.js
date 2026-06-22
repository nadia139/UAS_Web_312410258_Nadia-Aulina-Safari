// Konfigurasi Axios
axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Axios Interceptor untuk Token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Axios Interceptor untuk 401 Unauthorized
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      window.location.href = '#/login';
    }
    return Promise.reject(error);
  }
);

// Vue Router
const routes = [
  { path: '/', component: HomeComponent },
  { path: '/login', component: LoginComponent },
  { path: '/dashboard', component: DashboardComponent, meta: { requiresAuth: true } },
  { path: '/laporan', component: LaporanListComponent, meta: { requiresAuth: true } },
  { path: '/laporan/create', component: LaporanFormComponent, meta: { requiresAuth: true } },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) {
    alert('Akses ditolak! Silakan login terlebih dahulu.');
    next('/login');
  } else {
    next();
  }
});

// Mount App
const app = Vue.createApp({
  data() {
    return {
      isLoggedIn: localStorage.getItem('isLoggedIn') === 'true'
    };
  },
  methods: {
    logout() {
      if (confirm('Apakah Anda yakin ingin keluar?')) {
        localStorage.clear();
        this.isLoggedIn = false;
        this.$router.push('/login');
      }
    }
  }
});

app.use(router);
app.mount('#app');