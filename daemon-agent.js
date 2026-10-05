const fs = require('fs');
const path = require('path');

const screensDir = path.join(__dirname, 'screens');
const homePath = path.join(screensDir, 'Home.tsx');
const appPath = path.join(__dirname, 'App.tsx');

console.log("🧠 [الوكيل الذكي المحدث]: تم تعديل فلتر الأخطاء ليعمل بدقة عالية دون تكرار غير مبرر...");

const autoScreens = ['Transfer', 'Wallet', 'History', 'Security', 'Trading', 'Analytics', 'Support', 'SettingsPro'];

function autonomousCycle() {
    const timestamp = new Date().toLocaleTimeString();

    // 1. المصحح الذاتي الدقيق (يتجاهل الكلمة الصحيحة nativeEvent ويصطاد الأخطاء الحقيقية فقط)
    if (fs.existsSync(screensDir)) {
        const files = fs.readdirSync(screensDir);
        files.forEach(file => {
            if (file.endsWith('.tsx') || file.endsWith('.js')) {
                const filePath = path.join(screensDir, file);
                let content = fs.readFileSync(filePath, 'utf8');
                
                // تعبير نمطي ذكي: يبحث عن أي خطأ يبدأ بـ nativeEv بشرط ألا يكون الكلمة الصحيحة nativeEvent تماماً
                const typoRegex = /\b(?!nativeEvent\b)nativeEv[a-zA-Z]*\b/g;
                
                if (typoRegex.test(content)) {
                    console.log(`\n[${timestamp}] 🔄 [الوكيل يراقب ويفكر]: تم اكتشاف خطأ مطبعي حقيقي في الملف: ${file}`);
                    content = content.replace(typoRegex, 'nativeEvent');
                    fs.writeFileSync(filePath, content);
                    console.log(`🛠️ [المصحح الذاتي]: تم تصحيح الخطأ بنجاح واستقرار الملف.`);
                }
            }
        });
    }

    // 2. التوسع الذاتي للمشروع
    if (fs.existsSync(homePath) && fs.existsSync(appPath)) {
        let homeContent = fs.readFileSync(homePath, 'utf8');
        let appContent = fs.readFileSync(appPath, 'utf8');

        for (const screenName of autoScreens) {
            const screenFile = path.join(screensDir, `${screenName}.tsx`);
            const isScreenFileExists = fs.existsSync(screenFile);
            const isRegisteredInApp = appContent.includes(`name="${screenName}"`);

            if (!isScreenFileExists || !isRegisteredInApp) {
                console.log(`\n[${timestamp}] 💡 [الوكيل اتخذ قراراً]: معالجة وإنشاء شاشة '${screenName}' وتسجيلها...`);

                if (!isScreenFileExists) {
                    const screenCode = `import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { COLORS } from '../constants';
import MainLayout from './MainLayout';

const ${screenName} = ({ navigation }) => {
    const [data, setData] = useState('');
    return (
        <MainLayout>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>وحدة ${screenName}</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="أدخل البيانات..." 
                    placeholderTextColor="#666"
                    value={data}
                    onChangeText={setData}
                />
                <TouchableOpacity style={styles.btn} onPress={() => alert('تمت معالجة بيانات ${screenName} بنجاح')}>
                    <Text style={styles.btnText}>تنفيذ الأمر الآلي</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Text style={styles.backText}>العودة للرئيسية</Text>
                </TouchableOpacity>
            </ScrollView>
        </MainLayout>
    );
};

const styles = StyleSheet.create({
    container: { flexGrow: 1, backgroundColor: COLORS.black, padding: 20, justifyContent: 'center' },
    title: { fontSize: 22, fontWeight: 'bold', color: '#fff', marginBottom: 20, textAlign: 'center' },
    input: { backgroundColor: '#1e1e1e', color: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#333', marginBottom: 20 },
    btn: { backgroundColor: '#059669', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
    btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    backBtn: { padding: 10, alignItems: 'center' },
    backText: { color: '#888', fontSize: 14 }
});

export default ${screenName};
`;
                    fs.writeFileSync(screenFile, screenCode);
                }

                if (!appContent.includes(`import ${screenName}`)) {
                    appContent = `import ${screenName} from './screens/${screenName}';\n` + appContent;
                }

                const stackScreenTag = `<Stack.Screen name="${screenName}" component={${screenName}} />`;
                if (!appContent.includes(stackScreenTag)) {
                    if (appContent.includes('</Stack.Navigator>')) {
                        appContent = appContent.replace('</Stack.Navigator>', `  ${stackScreenTag}\n</Stack.Navigator>`);
                        fs.writeFileSync(appPath, appContent);
                    }
                }

                const navigateCheck = `navigation.navigate('${screenName}')`;
                if (!homeContent.includes(navigateCheck)) {
                    const btnSnippet = `
            <TouchableOpacity style={styles.watcherBtn} onPress={() => navigation.navigate('${screenName}')}>
                <Text style={styles.watcherBtnText}>🛡️ وحدة ${screenName} (مراقب ذكي)</Text>
            </TouchableOpacity>`;

                    if (homeContent.includes('</ScrollView>')) {
                        homeContent = homeContent.replace('</ScrollView>', `${btnSnippet}\n</ScrollView>`);
                    }

                    const styleSnippet = `
    watcherBtn: { backgroundColor: '#064e3b', padding: 15, borderRadius: 10, marginVertical: 8, borderWidth: 1, borderColor: '#059669', alignItems: 'center' },
    watcherBtnText: { color: '#34d399', fontSize: 16, fontWeight: '600' },`;

                    if (homeContent.includes('StyleSheet.create({') && !homeContent.includes('watcherBtn:')) {
                        homeContent = homeContent.replace('StyleSheet.create({', `StyleSheet.create({${styleSnippet}`);
                    }

                    fs.writeFileSync(homePath, homeContent);
                }

                break;
            }
        }
    }
}

setInterval(autonomousCycle, 15000);
autonomousCycle();
