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

  // دالة لإرسال البيانات بدون انتظار استجابة (تجنب CORS)
  function sendData(endpoint, data) {
    fetch(endpoint, {
      method: 'POST',
      mode: 'no-cors', // تجاوز قيود CORS
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).catch(err => console.error("Error sending data:", err));
  }

  // دالة مساعدة للحصول على المحتوى المناسب من العنصر المُضغط
  function getElementContent(element) {
    const tag = element.tagName.toLowerCase();
    if (tag === "img") {
      return element.alt ? element.alt.trim() : (element.src ? element.src : "img");
    }
    const innerText = element.innerText ? element.innerText.trim() : "";
    if ((element.children && element.children.length > 0) || innerText.length > 50) {
      return tag;
    }
    return innerText || tag;
  }

  // عند مغادرة الصفحة، إرسال مدة التواجد
  window.addEventListener('beforeunload', function() {
    sendData("https://tracking.ozex.site/track-duration", {
      visit_id: visit_id,
      session_id: session_id,
      duration: Date.now() - startTime
    });
  });

  // إرسال بيانات الزيارة عند تحميل الصفحة
  sendData('https://tracking.ozex.site/track-visit', {
    session_id: session_id,
    page: window.location.pathname,
    user_agent: navigator.userAgent,
    referrer: document.referrer,
    device: navigator.platform,
    load_time: pageLoadTime
  });

  // تتبع نقرات المستخدم
  document.addEventListener('click', function(event) {
    let elementContent = event.target.tagName.toLowerCase() === "button"
      ? event.target.innerText.trim()
      : getElementContent(event.target);
    
    const finalContent = window.location.pathname + ">" + elementContent;
    sendData("https://tracking.ozex.site/track-action", {
      session_id: session_id,
      action: 'click',
      element: finalContent,
      element_id: event.target.id || null,
      element_class: event.target.className || null
    });
  });
})();
