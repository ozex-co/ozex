(function() {
  // شرط لاستبعاد صفحات الإدارة من التتبع
  if (window.location.pathname.indexOf("/admin") !== -1) {
    console.log("تم اكتشاف صفحة الإدارة؛ تم تعطيل التتبع.");
    return; // عدم تنفيذ باقي الكود
  }

  // إنشاء session_id وتخزينه في localStorage إذا لم يكن موجودًا
  const storedSessionId = localStorage.getItem('session_id');
  const session_id = storedSessionId || (Date.now() + '-' + Math.random().toString(36).substr(2, 9));
  localStorage.setItem('session_id', session_id);

  const startTime = Date.now();
  let visit_id = null;

  // استخدام واجهة Navigation Timing الحديثة إن كانت متاحة
  let pageLoadTime = 0;
  if (performance.getEntriesByType && performance.getEntriesByType("navigation").length) {
    pageLoadTime = performance.getEntriesByType("navigation")[0].domContentLoadedEventEnd;
  } else if (performance.timing) {
    pageLoadTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
  }

  // دالة لإرسال البيانات باستخدام URL نسبي (سيقوم الـ proxy بتوجيهها للباك إند)
  function sendData(endpoint, data) {
    if (endpoint === '/track-visit') {
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(respData => {
        console.log("تم تتبع الزيارة:", respData);
        visit_id = respData.visit_id;
      })
      .catch(err => console.error("خطأ في تتبع الزيارة:", err));
    } else {
      navigator.sendBeacon(endpoint, JSON.stringify(data));
    }
  }

  // دالة مساعدة للحصول على المحتوى المناسب من العنصر المُضغط
  function getElementContent(element) {
    const tag = element.tagName.toLowerCase();

    // إذا كان العنصر صورة، إرجاع alt أو src
    if (tag === "img") {
      return element.alt ? element.alt.trim() : (element.src ? element.src : "img");
    }

    const innerText = element.innerText ? element.innerText.trim() : "";
    // إذا كان العنصر يحتوي على عناصر فرعية أو النص طويل (أكثر من 50 حرف)
    if ((element.children && element.children.length > 0) || innerText.length > 50) {
      return tag;
    }
    
    if (innerText) return innerText;
    
    // في حالة عدم وجود محتوى، إرجاع اسم التاج فقط
    return tag;
  }

  // عند مغادرة الصفحة، إرسال مدة التواجد
  window.addEventListener('beforeunload', function() {
    const data = { 
      visit_id: visit_id, 
      session_id: session_id, 
      duration: Date.now() - startTime 
    };
    navigator.sendBeacon("/track-duration", JSON.stringify(data));
  });

  // إرسال بيانات الزيارة عند تحميل الصفحة
  sendData('/track-visit', {
    session_id: session_id,
    page: window.location.pathname,
    user_agent: navigator.userAgent,
    referrer: document.referrer,
    device: navigator.platform,
    load_time: pageLoadTime
  });
})();
