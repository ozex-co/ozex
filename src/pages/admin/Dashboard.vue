<template>
  <div class="dashboard-container">
    <!-- العنوان الرئيسي مع تأثير التوهج -->
    <h1 class="glowing-title">لوحة التحليل التفصيلية 📊</h1>

    <!-- بطاقات الملخص الإحصائي -->
    <div class="summary-grid">
      <div class="stat-card bg-gradient-cyan">
        <div class="stat-icon">👥</div>
        <div class="stat-content">
          <h3>إجمالي الزيارات</h3>
          <p>{{ extendedAnalytics.total_visits }}</p>
        </div>
      </div>

      <div class="stat-card bg-gradient-purple">
        <div class="stat-icon">⏳</div>
        <div class="stat-content">
          <h3>متوسط المدة</h3>
          <p>{{ formatTime(extendedAnalytics.average_duration) }}</p>
        </div>
      </div>

      <div class="stat-card bg-gradient-orange">
        <div class="stat-icon">🚀</div>
        <div class="stat-content">
          <h3>سرعة التحميل</h3>
          <p>{{ formatLoadTime(extendedAnalytics.average_load_time) }}</p>
        </div>
      </div>

      <div class="stat-card bg-gradient-pink">
        <div class="stat-icon">📉</div>
        <div class="stat-content">
          <h3>معدل الارتداد</h3>
          <p>{{ extendedAnalytics.bounce_rate.toFixed(2) }}%</p>
        </div>
      </div>
    </div>

    <!-- قسم الرسوم البيانية -->
    <div class="analytics-section">
      <div class="chart-card">
        <div class="chart-header">
          <h2>📅 الزيارات الشهرية</h2>
          <div class="chart-legend">
            <span class="legend-item primary"></span>
            <span>الزيارات</span>
          </div>
        </div>
        <canvas ref="monthlyChartCanvas"></canvas>
      </div>

      <div class="chart-card">
        <div class="chart-header">
          <h2>🌍 التوزيع الجغرافي</h2>
          <div class="chart-legend">
            <span v-for="(color, index) in countryColors"
                   :key="index"
                   :style="{backgroundColor: color}"
                   class="legend-item"></span>
          </div>
        </div>
        <canvas ref="countryChartCanvas"></canvas>
      </div>

      <div class="chart-card">
        <div class="chart-header">
          <h2>📱 الأجهزة المستخدمة</h2>
          <div class="chart-legend">
            <span v-for="(color, index) in deviceColors"
                   :key="index"
                   :style="{backgroundColor: color}"
                   class="legend-item"></span>
          </div>
        </div>
        <canvas ref="deviceChartCanvas"></canvas>
      </div>

      <div class="chart-card full-width">
        <div class="chart-header">
          <h2>🔗 مصادر الزيارات</h2>
          <div class="chart-legend">
            <span v-for="(color, index) in referrerColors"
                   :key="index"
                   :style="{backgroundColor: color}"
                   class="legend-item"></span>
          </div>
        </div>
        <canvas ref="referrerChartCanvas"></canvas>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';

// البيانات التفصيلية من endpoints
const extendedAnalytics = ref({
  total_visits: 0,
  total_time_spent: 0,
  average_duration: 0,
  average_load_time: 0,
  bounce_rate: 0,
  device_stats: [],
  referrer_stats: []
});
const basicAnalytics = ref({
  total_visitors: 0,
  total_time_spent: 0,
  country_stats: [],
  monthly_stats: []
});
const actionsRank = ref([]);

// مراجع لعناصر canvas
const monthlyChartCanvas = ref(null);
const countryChartCanvas = ref(null);
const deviceChartCanvas = ref(null);
const referrerChartCanvas = ref(null);
const actionsChartCanvas = ref(null);
const countryColors = ['#4dc9f6', '#f67019', '#f53794', '#537bc4'];
const deviceColors = ['#00d25b', '#ffab00', '#fc424a'];
const referrerColors = ['#ff7d47', '#716aca', '#3d8bf2', '#4fd69c'];
// متغيرات لتخزين نسخ الرسوم البيانية
let monthlyChart, countryChart, deviceChart, referrerChart, actionsChart;

// دوال جلب البيانات من API
async function fetchExtendedAnalytics() {
  try {
    const res = await fetch('https://tracking.ozex.site/extended-analytics');
    const data = await res.json();
    extendedAnalytics.value = data;
  } catch (error) {
    console.error('Error fetching extended analytics:', error);
  }
}

async function fetchBasicAnalytics() {
  try {
    const res = await fetch('https://tracking.ozex.site/analytics');
    const data = await res.json();
    basicAnalytics.value = data;
  } catch (error) {
    console.error('Error fetching basic analytics:', error);
  }
}

async function fetchActionsRank() {
  try {
    const res = await fetch('https://tracking.ozex.site/actions-rank');
    const data = await res.json();
    actionsRank.value = data;
  } catch (error) {
    console.error('Error fetching actions rank:', error);
  }
}

// دوال رسم الرسوم البيانية باستخدام Chart.js
function renderMonthlyChart() {
  if (monthlyChartCanvas.value) {
    const ctx = monthlyChartCanvas.value.getContext('2d');
    const labels = basicAnalytics.value.monthly_stats.map(item => item.month);
    const visits = basicAnalytics.value.monthly_stats.map(item => item.visits);
    monthlyChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Monthly Visits',
          data: visits,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: { y: { beginAtZero: true } }
      }
    });
  }
}

function renderCountryChart() {
  if (countryChartCanvas.value) {
    const ctx = countryChartCanvas.value.getContext('2d');
    const labels = basicAnalytics.value.country_stats.map(item => item.country);
    const visits = basicAnalytics.value.country_stats.map(item => item.visits);
    countryChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels,
        datasets: [{
          label: 'Visits by Country',
          data: visits,
          backgroundColor: labels.map(() => `hsl(${Math.random() * 360}, 70%, 70%)`)
        }]
      },
      options: { responsive: true }
    });
  }
}

function renderDeviceChart() {
  if (deviceChartCanvas.value) {
    const ctx = deviceChartCanvas.value.getContext('2d');
    const labels = extendedAnalytics.value.device_stats.map(item => item.device);
    const visits = extendedAnalytics.value.device_stats.map(item => item.visits);
    deviceChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          label: 'Device Stats',
          data: visits,
          backgroundColor: labels.map(() => `hsl(${Math.random() * 360}, 70%, 70%)`)
        }]
      },
      options: { responsive: true }
    });
  }
}

function renderReferrerChart() {
  if (referrerChartCanvas.value) {
    const ctx = referrerChartCanvas.value.getContext('2d');
    const labels = extendedAnalytics.value.referrer_stats.map(item => item.referrer || 'Direct');
    const visits = extendedAnalytics.value.referrer_stats.map(item => item.visits);
    referrerChart = new Chart(ctx, {
      type: 'polarArea',
      data: {
        labels,
        datasets: [{
          label: 'Referrer Stats',
          data: visits,
          backgroundColor: labels.map(() => `hsl(${Math.random() * 360}, 70%, 70%)`)
        }]
      },
      options: { responsive: true }
    });
  }
}

function renderActionsChart() {
  if (actionsChartCanvas.value) {
    const ctx = actionsChartCanvas.value.getContext('2d');
    const labels = actionsRank.value.map(item => item.element);
    const clicks = actionsRank.value.map(item => item.clicks);
    actionsChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels,
        datasets: [{
          label: 'Actions Rank',
          data: clicks,
          backgroundColor: labels.map(() => `hsl(${Math.random() * 360}, 70%, 70%)`)
        }]
      },
      options: { responsive: true }
    });
  }
}

// دوال التحويل للوقت
function formatTime(ms) {
  if (ms >= 60000) {
    return `${(ms / 60000).toFixed(2)} min`;
  }
  return `${(ms / 1000).toFixed(2)} sec`;
}

function formatLoadTime(ms) {
  if (ms >= 1000) {
    if (ms >= 60000) {
      return `${(ms / 60000).toFixed(2)} min`;
    }
    return `${(ms / 1000).toFixed(2)} sec`;
  }
  return `${ms} ms`;
}

// عند تحميل المكون، يتم جلب البيانات ورسم الرسوم البيانية
onMounted(async () => {
  await Promise.all([fetchExtendedAnalytics(), fetchBasicAnalytics(), fetchActionsRank()]);
  renderMonthlyChart();
  renderCountryChart();
  renderDeviceChart();
  renderReferrerChart();
  renderActionsChart();
});
</script>

<style scoped>
.dashboard-container {
  max-width: 1400px;
  margin: 2rem auto;
  padding: 0 1.5rem;
  font-family: 'Tajawal', sans-serif;
}

.glowing-title {
  text-align: center;
  font-size: 2.75rem;
  color: #4fd69c;
  text-shadow: 0 0 15px rgba(79, 214, 156, 0.4);
  margin-bottom: 3rem;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  padding: 1.5rem;
  border-radius: 15px;
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-icon {
  font-size: 2.5rem;
  margin-right: 1.5rem;
}

.stat-content h3 {
  font-size: 1.1rem;
  color: #e0e0e0;
  margin-bottom: 0.5rem;
}

.stat-content p {
  font-size: 1.75rem;
  font-weight: 700;
  color: white;
}

/* تدرجات الألوان للبطاقات */
.bg-gradient-cyan { background: linear-gradient(45deg, #4dc9f6, #4fd69c); }
.bg-gradient-purple { background: linear-gradient(45deg, #716aca, #a66efa); }
.bg-gradient-orange { background: linear-gradient(45deg, #ffab00, #ff7d47); }
.bg-gradient-pink { background: linear-gradient(45deg, #f53794, #fc424a); }

.analytics-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

.chart-card {
  background: #1a1c2c;
  border-radius: 15px;
  padding: 1.5rem;
  border: 1px solid #2d3047;
  box-shadow: 0 10px 20px rgba(0,0,0,0.15);
}

.chart-card.full-width {
  grid-column: 1 / -1;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.chart-header h2 {
  font-size: 1.3rem;
  color: #dcdde4;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.chart-legend {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.legend-item {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

canvas {
  width: 100% !important;
  height: 350px !important;
}

@media (max-width: 768px) {
  .dashboard-container {
    padding: 0 1rem;
  }

  .glowing-title {
    font-size: 2rem;
  }

  .stat-content p {
    font-size: 1.5rem;
  }
}
</style>
