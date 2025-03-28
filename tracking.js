(function () {
  try {
    // استبعاد صفحات الإدارة
    if (window.location.pathname.includes("/admin")) {
      console.log("تم اكتشاف صفحة الإدارة؛ تم تعطيل التتبع.");
      return;
    }

    // إنشاء session_id آمن
    let session_id;
    try {
      session_id = localStorage.getItem("session_id");
      if (!session_id) {
        session_id = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
        localStorage.setItem("session_id", session_id);
      }
    } catch (e) {
      session_id = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      console.warn("لم يتم استخدام localStorage بسبب خطأ:", e);
    }

    const startTime = Date.now();
    let visit_id = null;

    // حساب وقت تحميل الصفحة
    let pageLoadTime = 0;
    const navEntry = performance.getEntriesByType?.("navigation")?.[0];
    if (navEntry) {
      pageLoadTime = navEntry.domContentLoadedEventEnd;
    }

    function sendData(endpoint, data) {
      const payload = JSON.stringify(data);

      if (endpoint === 'https://tracking.ozex.site/track-visit') {
        fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain' },
          body: payload
        })
        .then(res => res.json())
        .then(resp => {
          console.log("تم تتبع الزيارة:", resp);
          visit_id = resp.visit_id;
        })
        .catch(err => console.error("خطأ في تتبع الزيارة:", err));
      } else {
        try {
          navigator.sendBeacon(endpoint, payload);
        } catch (e) {
          console.warn("فشل إرسال البيانات عبر Beacon:", e);
        }
      }
    }

    // إرسال المدة عند مغادرة الصفحة
    window.addEventListener("beforeunload", () => {
      sendData("https://tracking.ozex.site/track-duration", {
        visit_id,
        session_id,
        duration: Date.now() - startTime
      });
    });

    // إرسال بيانات الزيارة
    sendData("https://tracking.ozex.site/track-visit", {
      session_id,
      page: window.location.pathname,
      user_agent: navigator.userAgent,
      referrer: document.referrer,
      device: navigator.platform,
      load_time: pageLoadTime
    });

  } catch (err) {
    console.error("حدث خطأ في كود التتبع:", err);
  }
})();
