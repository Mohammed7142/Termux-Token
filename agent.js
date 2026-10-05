const axios = require('axios');

// يمكنك وضع مفتاح الـ API الخاص بـ DeepSeek هنا مباشرة أو عبر متغيرات البيئة
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || "ضع_مفتاح_الـ_API_هنا";

async function runAgent(taskDescription) {
    if (DEEPSEEK_API_KEY === "ضع_مفتاح_الـ_API_هنا") {
        console.log("⚠️ تنبيه: يجب وضع مفتاح DeepSeek API الصحيح داخل ملف agent.js أولاً.");
        return;
    }

    try {
        console.جاري تشغيل وكيل DeepSeek وإرسال المهمة...('\n----------------------------------------');
        
        const response = await axios.post('https://api.deepseek.com/chat/completions', {
            model: "deepseek-chat",
            messages: [
                { 
                    role: "system", 
                    content: "أنت مهندس برمجيات خبير ومساعد ذكي مستقل لمشروع تطبيق محفظة عملات رقمية باستخدام React Native و Expo. ساعد المطور بكتابة الأكواد وحل المشكلات بدقة." 
                },
                { role: "user", content: taskDescription }
            ],
            temperature: 0.2
        }, {
            headers: {
                'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        console.log("\n💡 رد وكيل الهندسة والبرمجة:");
        console.log(response.data.choices[0].message.content);
        console.log('\n----------------------------------------');

    } catch (error) {
        console.error("❌ حدث خطأ أثناء الاتصال بالوكيل:", error.response?.data || error.message);
    }
}

// استقبال المهمة المكتوبة من سطر الأوامر
const task = process.argv.slice(2).join(' ');
if (task) {
    runAgent(task);
} else {
    console.log("❓ يرجى كتابة المهمة بعد الأمر. مثال:");
    console.log("node agent.js \"اعطني كود شاشة الإيداع\"");
}
