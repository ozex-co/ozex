<template>
  <div class="finance-dashboard">
    <!-- العنوان الرئيسي -->
    <h1 class="dashboard-title">
      <span class="title-text">Financial Dashboard</span>
      <span class="title-currency">(USD)</span>
    </h1>

    <!-- بطاقات الإحصائيات -->
    <div class="stats-grid">
      <div class="stat-card balance">
        <div class="stat-header">
          <span class="stat-icon">💰</span>
          <h3>Current Balance</h3>
        </div>
        <div class="stat-value">{{ formatCurrency(overview.current_balance) }}</div>
      </div>

      <div class="stat-card income">
        <div class="stat-header">
          <span class="stat-icon">📈</span>
          <h3>Total Income</h3>
        </div>
        <div class="stat-value">{{ formatCurrency(overview.total_income) }}</div>
      </div>

      <div class="stat-card expense">
        <div class="stat-header">
          <span class="stat-icon">📉</span>
          <h3>Total Expenses</h3>
        </div>
        <div class="stat-value">{{ formatCurrency(overview.total_expense) }}</div>
      </div>

      <div class="stat-card profit">
        <div class="stat-header">
          <span class="stat-icon">💹</span>
          <h3>Net Profit</h3>
        </div>
        <div
          class="stat-value"
          :class="overview.net_profit >= 0 ? 'positive' : 'negative'"
        >
          {{ formatCurrency(overview.net_profit) }}
        </div>
      </div>
    </div>

    <!-- الرسوم البيانية -->
   <div class="charts-container">
      <div class="chart-wrapper">
        <h3>التدفق الشهري</h3>
        <div class="chart-container">
          <canvas ref="monthlyChart"></canvas>
        </div>
      </div>
      <div class="chart-wrapper">
        <h3>التدفق اليومي</h3>
        <div class="chart-container">
          <canvas ref="dailyChart"></canvas>
        </div>
      </div>
    </div>

    <!-- جدول المعاملات -->
    <div class="transactions-section">
      <div class="section-header">
        <h3>Transaction History</h3>
        <button
          class="add-button"
          @click="openTransactionForm(null)"
        >
          <span class="plus-icon">+</span> New Transaction
        </button>
      </div>

      <div class="table-container">
        <table class="transactions-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="tx in transactions" :key="tx.id">
              <td>
                <span
                  class="type-badge"
                  :class="tx.type"
                >
                  {{ tx.type.toUpperCase() }}
                </span>
              </td>
              <td :class="tx.type">{{ formatCurrency(tx.amount) }}</td>
              <td class="description">{{ tx.description || '-' }}</td>
              <td>{{ formatDate(tx.created_at) }}</td>
              <td>
                <div class="actions">
                  <button
                    class="edit-button"
                    @click="openTransactionForm(tx)"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    class="delete-button"
                    @click="confirmDelete(tx.id)"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- نموذج إضافة/تعديل المعاملة -->
    <div v-if="showForm" class="modal-overlay">
      <div class="transaction-form">
        <div class="form-header">
          <h3>{{ formData.id ? 'Edit Transaction' : 'New Transaction' }}</h3>
          <button class="close-button" @click="closeForm">×</button>
        </div>

        <div class="form-body">
          <div class="form-group">
            <label>Transaction Type</label>
            <div class="type-selector">
              <button
                class="type-option income"
                :class="{ active: formData.type === 'income' }"
                @click="formData.type = 'income'"
              >
                Income
              </button>
              <button
                class="type-option expense"
                :class="{ active: formData.type === 'expense' }"
                @click="formData.type = 'expense'"
              >
                Expense
              </button>
            </div>
          </div>

          <div class="form-group">
            <label>Amount</label>
            <input
              type="number"
              v-model.number="formData.amount"
              class="amount-input"
              placeholder="0.00"
              step="0.01"
              min="0"
            >
          </div>

          <div class="form-group">
            <label>Description (Optional)</label>
            <textarea
              v-model="formData.description"
              class="description-input"
              rows="3"
              placeholder="Add transaction details..."
            ></textarea>
          </div>

          <div class="form-actions">
            <button class="cancel-button" @click="closeForm">
              Cancel
            </button>
            <button
              class="save-button"
              @click="saveTransaction"
              :disabled="!isFormValid"
            >
              {{ formData.id ? 'Update' : 'Save' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- حالة التحميل -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loader"></div>
    </div>

    <!-- إشعارات الأخطاء -->
    <div v-if="error" class="error-notification">
      ⚠️ {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import axios from 'axios'
import Chart from 'chart.js/auto'
import { nextTick } from 'vue'


// بيانات الرسم البياني
const monthlyChart = ref(null)
const dailyChart = ref(null)
let monthlyChartInstance = null
let dailyChartInstance = null

// بيانات التطبيق
const overview = ref({
  current_balance: 0,
  total_income: 0,
  total_expense: 0,
  net_profit: 0
})

const transactions = ref([])
const monthlyData = ref([])
const dailyData = ref([])
const showForm = ref(false)
const isLoading = ref(false)
const error = ref(null)

const formData = ref({
  id: null,
  type: 'income',
  amount: null,
  description: ''
})

// التحقق من صحة النموذج
const isFormValid = computed(() => {
  return formData.value.amount > 0 && formData.value.type
})

// إعدادات Axios الافتراضية
const api = axios.create({
  baseURL: 'https://api.ozex.site/api/finance' // ← إضافة المسار الأساسي الصحيح
})

// Interceptor لإضافة التوكن والرول تلقائيًا
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  if (role) {
    config.headers['User-Role'] = role
  }

  return config
})

// إدارة الأخطاء
const handleError = (error) => {
  console.error(error)

  if (error.response) {
    switch(error.response.status) {
      case 401:
        error.value = 'انتهت الجلسة، يرجى تسجيل الدخول مرة أخرى'
        localStorage.clear()
        window.location.href = '/login'
        break

      case 403:
        error.value = 'غير مصرح لك بهذا الإجراء'
        break

      default:
        error.value = error.response.data?.error || 'حدث خطأ غير متوقع'
    }
  } else {
    error.value = 'اتصال بالإنترنت غير مستقر'
  }
}

// جلب البيانات
const fetchData = async () => {
  try {
    isLoading.value = true
    error.value = null

    const [overviewRes, transactionsRes, monthlyRes, dailyRes] = await Promise.all([
      api.get('/overview'),
      api.get('/transactions'),
      api.get('/monthly'),
      api.get('/daily')
    ])

    overview.value = overviewRes.data
    transactions.value = transactionsRes.data
    monthlyData.value = monthlyRes.data
    dailyData.value = dailyRes.data

    renderCharts()
  } catch (err) {
    handleError(err)
  } finally {
    isLoading.value = false
  }
}

// إدارة النموذج
const openTransactionForm = (transaction) => {
  if (transaction) {
    formData.value = { ...transaction }
  } else {
    formData.value = { id: null, type: 'income', amount: null, description: '' }
  }
  showForm.value = true
}

const closeForm = () => {
  showForm.value = false
  formData.value = { id: null, type: 'income', amount: null, description: '' }
}

const saveTransaction = async () => {
  try {
    isLoading.value = true
    error.value = null

    if (formData.value.id) {
      // استخدام PUT للتحديث
      await api.put(`/transactions/${formData.value.id}`, formData.value)
    } else {
      // استخدام POST للإضافة
      await api.post('/transactions', formData.value)
    }

    await fetchData()
    closeForm()
  } catch (err) {
    handleError(err)
  } finally {
    isLoading.value = false
  }
}

const confirmDelete = async (id) => {
  if (!confirm('هل أنت متأكد من حذف هذه المعاملة؟')) return

  try {
    isLoading.value = true
    await api.delete(`/transactions/${id}`)
    await fetchData()
  } catch (err) {
    handleError(err)
  } finally {
    isLoading.value = false
  }
}

const renderCharts = () => {
  destroyCharts()

  // Monthly Chart
  const monthlyCtx = monthlyChart.value.getContext('2d')
  monthlyChartInstance = new Chart(monthlyCtx, {
    type: 'bar',
    data: {
      labels: monthlyData.value.map(m => m.month),
      datasets: [
        {
          label: 'Income',
          data: monthlyData.value.map(m => m.income),
          backgroundColor: 'rgba(76, 175, 80, 0.3)',
          borderColor: '#4CAF50',
          borderWidth: 2
        },
        {
          label: 'Expenses',
          data: monthlyData.value.map(m => m.expense),
          backgroundColor: 'rgba(244, 67, 54, 0.3)',
          borderColor: '#F44336',
          borderWidth: 2
        }
      ]
    },
    options: getChartOptions('Monthly Financial Overview')
  })

  // Daily Chart
  const dailyCtx = dailyChart.value.getContext('2d')
  dailyChartInstance = new Chart(dailyCtx, {
    type: 'line',
    data: {
      labels: dailyData.value.map(d => d.minute),
      datasets: [{
        label: 'Net Flow',
        data: dailyData.value.map(d => d.income - d.expense),
        borderColor: '#2196F3',
        backgroundColor: 'rgba(33, 150, 243, 0.1)',
        tension: 0.4,
        fill: true
      }]
    },
    options: getChartOptions('Daily Transaction Flow')
  })
}

const destroyCharts = () => {
  if (monthlyChartInstance) {
    monthlyChartInstance.destroy()
    monthlyChartInstance = null
  }
  if (dailyChartInstance) {
    dailyChartInstance.destroy()
    dailyChartInstance = null
  }
}

const getChartOptions = (title) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: { color: '#fff' }
    },
    title: {
      display: true,
      text: title,
      color: '#fff',
      font: { size: 16 }
    }
  },
  scales: {
    x: {
      grid: { color: 'rgba(255, 255, 255, 0.1)' },
      ticks: { color: '#fff' }
    },
    y: {
      grid: { color: 'rgba(255, 255, 255, 0.1)' },
      ticks: {
        color: '#fff',
        callback: (value) => '$' + value
      }
    }
  }
})

// التنسيقات
const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// دورة الحياة
onMounted(() => {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  if (!token || role !== 'admin') {
    window.location.href = '/login'
  } else {
    nextTick(() => {
      fetchData()
    })
  }
})

onBeforeUnmount(destroyCharts)
</script>

<style scoped>
.chart-container {
  position: relative;
  margin: 20px 0;
  min-height: 300px; /* تحديد حد أدنى للارتفاع */
  max-width: 100%; /* منع التمدد خارج الحاوية */
  overflow-x: auto; /* إضافة scroll عند الحاجة */
}
.finance-dashboard {
  background: #0a0a0a;
  color: #ffffff;
  min-height: 100vh;
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
}

.dashboard-title {
  color: #00ff88;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
}

.title-text {
  text-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
}

.title-currency {
  font-size: 1.2rem;
  color: #888;
  margin-left: 0.5rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: #1a1a1a;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #2d2d2d;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.stat-header {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1rem;
}

.stat-icon {
  font-size: 1.8rem;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
}

.positive { color: #4CAF50; }
.negative { color: #F44336; }

.charts-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.chart-wrapper {
  background: #1a1a1a;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #2d2d2d;
}

.chart-title {
  color: #00ff88;
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
}

.chart {
  height: 400px;
}

.transactions-section {
  background: #1a1a1a;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #2d2d2d;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.add-button {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}

.add-button:hover {
  background: #45a049;
}

.transactions-table {
  width: 100%;
  border-collapse: collapse;
}

.transactions-table th {
  background: #2d2d2d;
  padding: 1rem;
  text-align: left;
}

.transactions-table td {
  padding: 1rem;
  border-bottom: 1px solid #2d2d2d;
}

.type-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
}

.type-badge.income {
  background: rgba(76, 175, 80, 0.2);
  color: #4CAF50;
}

.type-badge.expense {
  background: rgba(244, 67, 54, 0.2);
  color: #F44336;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.edit-button {
  background: rgba(255, 193, 7, 0.2);
  color: #FFC107;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}

.delete-button {
  background: rgba(244, 67, 54, 0.2);
  color: #F44336;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.transaction-form {
  background: #1a1a1a;
  width: 500px;
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid #2d2d2d;
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.close-button {
  background: none;
  border: none;
  color: #888;
  font-size: 1.5rem;
  cursor: pointer;
}

.form-body {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.type-selector {
  display: flex;
  gap: 1rem;
}

.type-option {
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: #2d2d2d;
  color: #888;
  transition: 0.3s;
}

.type-option.active {
  background: #4CAF50;
  color: white;
}

.type-option.expense.active {
  background: #F44336;
}

.amount-input,
.description-input {
  width: 100%;
  padding: 0.8rem;
  background: #2d2d2d;
  border: 1px solid #3d3d3d;
  border-radius: 8px;
  color: white;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.save-button {
  background: #4CAF50;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.cancel-button {
  background: #F44336;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #4CAF50;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #F44336;
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
</style>
