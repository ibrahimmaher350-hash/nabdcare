/**
 * CallMeBot WhatsApp API Service
 * Free API for sending WhatsApp messages to yourself (admin).
 */

export const sendAdminWhatsAppAlert = async ({
  actionType,
  personName,
  phone,
  service,
  actionBy,
}) => {
  try {
    const waPhone = import.meta.env.VITE_WA_PHONE;
    const waApiKey = import.meta.env.VITE_WA_API_KEY;

    if (!waPhone || !waApiKey || waApiKey === "YOUR_API_KEY_HERE") {
      console.warn("WhatsApp API credentials missing in .env");
      return;
    }

    const text =
      `📱 *إشعار إداري فوري - نبض للتمريض المنزلي*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `🔔 *نوع العملية*: ${actionType}\n` +
      `👤 *الاسم*: ${personName || "غير محدد"}\n` +
      `📞 *الهاتف*: ${phone || "غير محدد"}\n` +
      `🏥 *الخدمة/التفاصيل*: ${service || "غير محدد"}\n` +
      (actionBy ? `👨‍💻 *بواسطة*: ${actionBy}\n` : "") +
      `⏰ *التوقيت*: ${new Date().toLocaleTimeString("ar-EG")}\n` +
      `━━━━━━━━━━━━━━━━━━━━`;

    const url = `https://api.callmebot.com/whatsapp.php?phone=${waPhone}&text=${encodeURIComponent(text)}&apikey=${waApiKey}`;

    // CallMeBot uses GET request
    // Mode no-cors is used because CallMeBot might not return CORS headers, and we just want to fire & forget
    await fetch(url, {
      method: "GET",
      mode: "no-cors",
    });

    console.log("WhatsApp alert sent via CallMeBot.");
  } catch (error) {
    console.error("Failed to send WhatsApp alert:", error);
  }
};
