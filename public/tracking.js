(function() {
  // شرط لاستبعاد صفحات الإدارة من التتبع
  if (window.location.pathname.indexOf("/admin") !== -1) {
    console.log("Admin page detected; tracking disabled.");
    return; // لا تنفيذ باقي الكود
  }

  // إنشاء session_id وتخزينه في localStorage إذا لم يكن موجودًا
  let session_id = localStorage.getItem('session_id') || (Date.now() + '-' + Math.random().toString(36).substr(2, 9));
  localStorage.setItem('session_id', session_id);

  let startTime = Date.now();
  let visit_id = null;
  let pageLoadTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;

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
        console.log("Visit tracked:", respData);
        visit_id = respData.visit_id;
      })
      .catch(err => console.error("Error tracking visit:", err));
    } else {
      navigator.sendBeacon(endpoint, JSON.stringify(data));
    }
  }

  // دالة مساعدة للحصول على المحتوى المناسب من العنصر المُضغط
  function getElementContent(element) {
    const tag = element.tagName.toLowerCase();

    // لو كان العنصر صورة، إرجاع alt أو src
    if (tag === "img") {
      return element.alt ? element.alt.trim() : (element.src ? element.src : "img");
    }

    // الحصول على النص الداخلي بعد قص المسافات
    const innerText = element.innerText ? element.innerText.trim() : "";
    // إذا كان العنصر يحتوي على عناصر فرعية أو النص طويل (أكثر من 50 حرف)
    if ((element.children && element.children.length > 0) || innerText.length > 50) {
      return tag;
    }
    
    // إذا كان النص موجودًا وقصيرًا
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

  // تتبع نقرات المستخدم
  document.addEventListener('click', function(event) {
    let elementContent = "";
    // إذا كان العنصر زرًا، يتم أخذ نص الزر فقط
    if (event.target.tagName.toLowerCase() === "button") {
      elementContent = event.target.innerText.trim();
    } else {
      // خلاف ذلك يتم استخدام دالة getElementContent
      elementContent = getElementContent(event.target);
    }
    // دمج اسم الصفحة مع المحتوى
    const finalContent = window.location.pathname + ">" + elementContent;
    const data = {
      session_id: session_id,
      action: 'click',
      element: finalContent,
      element_id: event.target.id || null,
      element_class: event.target.className || null
    };
    navigator.sendBeacon("/track-action", JSON.stringify(data));
  });
})();
