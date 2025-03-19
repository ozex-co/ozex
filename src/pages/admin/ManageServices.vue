<template>
  <div class="p-6 bg-gray-900 min-h-screen">
    <!-- الهيدر المعدل -->
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
        إدارة المقالات
      </h1>

      <!-- فلتر البحث مع تأثيرات جديدة -->
      <div class="flex gap-4 mb-8 items-center bg-gray-800/50 backdrop-blur-sm p-4 rounded-2xl border border-gray-700">
        <div class="relative flex-1">
          <input
            v-model="searchQuery"
            placeholder="ابحث عن مقال..."
            class="w-full px-6 py-3 bg-gray-700 rounded-xl border border-gray-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-gray-100 placeholder-gray-400 transition-all"
          />
          <svg class="absolute left-4 top-4 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>

        <button
          @click="showAddModal = true"
          class="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 rounded-xl font-medium text-gray-900 transition-all hover:shadow-lg hover:shadow-cyan-500/20"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          إضافة مقال
        </button>
      </div>

      <!-- جدول المقالات المعدل -->
      <div class="overflow-hidden rounded-2xl border border-gray-700 shadow-2xl bg-gray-800/30 backdrop-blur-sm">
        <table class="w-full bg-gray-800/50 divide-y divide-gray-700">
          <thead class="bg-gray-700/50">
            <tr>
              <th class="px-6 py-4 text-right font-semibold text-cyan-400">#</th>
              <th class="px-6 py-4 text-right font-semibold text-cyan-400">العنوان</th>
              <th class="px-6 py-4 text-right font-semibold text-cyan-400">المحتوى</th>
              <th class="px-6 py-4 text-right font-semibold text-cyan-400">الإجراءات</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-700">
            <tr
              v-for="(article, index) in filteredArticles"
              :key="article.id"
              class="hover:bg-gray-700/20 transition-colors"
            >
              <td class="px-6 py-4 text-gray-300">{{ index + 1 }}</td>
              <td class="px-6 py-4 text-gray-100 font-medium">{{ article.title }}</td>
              <td class="px-6 py-4 text-gray-300">{{ article.content.substring(0, 50) }}...</td>
              <td class="px-6 py-4 space-x-3">
                <button
                  @click.stop="editArticle(article)"
                  class="text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                  </svg>
                </button>
                <button
                  @click.stop="deleteArticle(article.id)"
                  class="text-red-400 hover:text-red-300 transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- حالة عدم وجود نتائج -->
        <div
          v-if="!filteredArticles.length"
          class="p-12 text-center text-gray-400 bg-gray-800/20"
        >
          <svg class="mx-auto w-16 h-16 mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/>
          </svg>
          لا توجد مقالات مطابقة
        </div>
      </div>
    </div>

    <!-- مودال الإضافة/التعديل -->
    <div v-if="showAddModal" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="modal-content bg-gray-800 rounded-2xl border border-gray-700 w-full max-w-xl p-6 transform transition-all">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-cyan-400">{{ editingArticle ? "تعديل المقال" : "مقال جديد" }}</h2>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-200">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <form @submit.prevent="editingArticle ? updateArticle() : addArticle()" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">عنوان المقال</label>
            <input
              v-model="newArticle.title"
              required
              class="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-gray-100"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">المحتوى</label>
            <textarea
              v-model="newArticle.content"
              rows="5"
              class="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-gray-100"
            ></textarea>
          </div>

          <!-- أزرار التأكيد -->
          <div class="flex gap-3 justify-end pt-6">
            <button
              type="button"
              @click="closeModal"
              class="px-6 py-2 text-gray-300 hover:text-gray-100 transition-colors"
            >
              إغلاق
            </button>
            <button
              type="submit"
              class="px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-gray-900 rounded-lg font-medium transition-colors"
            >
              {{ editingArticle ? "تحديث" : "إضافة" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      articles: [],
      searchQuery: "",
      showAddModal: false,
      editingArticle: null,
      newArticle: {
        title: "",
        content: ""
      }
    };
  },
  computed: {
    filteredArticles() {
      return this.articles.filter(article =>
        article.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    async fetchArticles() {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://api.ozex.site/api/articles", {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.articles = res.data;
      } catch (error) {
        console.error("❌ خطأ في جلب المقالات:", error.response ? error.response.data : error.message);
      }
    },
    async addArticle() {
      try {
        const token = localStorage.getItem("token");
        await axios.post("https://api.ozex.site/api/articles", this.newArticle, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.closeModal();
        this.fetchArticles();
      } catch (error) {
        console.error("❌ خطأ أثناء إضافة المقال:", error.response ? error.response.data : error.message);
      }
    },
    async updateArticle() {
      try {
        const token = localStorage.getItem("token");
        await axios.put(`https://api.ozex.site/api/articles/${this.editingArticle.id}`, this.newArticle, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.closeModal();
        this.fetchArticles();
      } catch (error) {
        console.error("❌ خطأ أثناء تحديث المقال:", error.response ? error.response.data : error.message);
      }
    },
    async deleteArticle(articleId) {
      if (!confirm("❗ هل أنت متأكد من حذف المقال؟")) return;
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`https://api.ozex.site/api/articles/${articleId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.fetchArticles();
      } catch (error) {
        console.error("❌ خطأ أثناء حذف المقال:", error.response ? error.response.data : error.message);
      }
    },
    editArticle(article) {
      this.editingArticle = article;
      this.newArticle = { ...article };
      this.showAddModal = true;
    },
    closeModal() {
      this.showAddModal = false;
      this.editingArticle = null;
      this.newArticle = { title: "", content: "" };
    }
  },
  mounted() {
    this.fetchArticles();
  }
};
</script>

<style scoped>
.modal-content {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

/* تخصيص شريط التمرير */
::-webkit-scrollbar {
  width: 8px;
  background: #1a1a1a;
}

::-webkit-scrollbar-thumb {
  background: #374151;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #4b5563;
}
</style>
