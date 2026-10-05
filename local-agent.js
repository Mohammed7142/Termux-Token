const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const action = args[0]; 
const targetName = args[1]; 

const screensDir = path.join(__dirname, 'screens');

// ميزة الإصلاح الذاتي للأخطاء الشائعة
if (action === 'fix') {
    console.log("🔍 [الوكيل الذاتي]: جاري فحص ملفات المشروع لتصحيح أخطاء AnimatedEvent (مثل nativeEven)...");
    
    if (!fs.existsSync(screensDir)) {
        console.log("❌ مجلد screens غير موجود.");
        process.exit(1);
    }

    const files = fs.readdirSync(screensDir);
    let fixedCount = 0;

    files.forEach(file => {
        if (file.endsWith('.tsx') || file.endsWith('.js')) {
            const filePath = path.join(screensDir, file);
            let content = fs.readFileSync(filePath, 'utf8');
            
            if (content.includes('nativeEven')) {
                content = content.replace(/nativeEven/g, 'nativeEvent');
                fs.writeFileSync(filePath, content);
                console.log(`✅ [الوكيل]: تم تصحيح الخطأ الإملائي في الملف: ${file}`);
                fixedCount++;
            }
        }
    });

    console.log(`🎯 [الوكيل]: اكتمل الإصلاح الذاتي بنجاح! تم تصحيح ${fixedCount} ملف.`);
    process.exit(0);
}

if (!action || !targetName) {
    console.log("❌ الاستخدام الصحيح:");
    console.log("   1. لإنشاء ميزة: node local-agent.js feature Deposit");
    console.log("   2. للإصلاح الذاتي: node local-agent.js fix");
    process.exit(1);
}

const homePath = path.join(screensDir, 'Home.tsx');
const targetFilePath = path.join(screensDir, `${targetName}.tsx`);

if (!fs.existsSync(screensDir)){
    fs.mkdirSync(screensDir, { recursive: true });
}

// توليد كود الشاشة الجديدة
const screenTemplate = `import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from 'react-native';
import { COLORS } from '../constants';
import MainLayout from './MainLayout';

const ${targetName} = ({ navigation }) => {
    const [amount, setAmount] = useState('');
    const [account, setAccount] = useState('');

    const handleAction = () => {
        alert('تم تنفيذ العملية بنجاح في ${targetName}');
    };

    return (
        <MainLayout>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>عملية ${targetName}</Text>

                <Text style={styles.label}>رقم الحساب أو الجهة</Text>
                <TextInput
                    style={styles.input}
                    placeholder="أدخل التفاصيل هنا"
                    placeholderTextColor="#888"
                    value={account}
                    onChangeText={setAccount}
                />

                <Text style={styles.label}>المبلغ المراد</Text>
                <TextInput
                    style={styles.input}
                    placeholder="0.00"
                    placeholderTextColor="#888"
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={setAmount}
                />

                <TouchableOpacity style={styles.submitButton} onPress={handleAction}>
                    <Text style={styles.submitButtonText}>تأكيد العملية</Text>
                </TouchableOpacity>
            </ScrollView>
        </MainLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: COLORS.black,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        color: '#aaa',
        fontSize: 14,
        marginBottom: 8,
        marginTop: 12,
    },
    input: {
        backgroundColor: '#1e1e1e',
        color: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#333',
        fontSize: 16,
    },
    submitButton: {
        backgroundColor: '#059669',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ${targetName};
`;

fs.writeFileSync(targetFilePath, screenTemplate);
console.log(`🚀 [الوكيل]: تم إنشاء ملف الشاشة ${targetName}.tsx بنجاح.`);

if (action === 'feature' && fs.existsSync(homePath)) {
    let homeContent = fs.readFileSync(homePath, 'utf8');
    
    const importStatement = `import ${targetName} from './${targetName}';`;
    if (!homeContent.includes(importStatement)) {
        homeContent = importStatement + '\n' + homeContent;
    }

    const buttonSnippet = `
            <TouchableOpacity 
                style={styles.agentButton} 
                onPress={() => navigation.navigate('${targetName}')}
            >
                <Text style={styles.agentButtonText}>الانتقال إلى ${targetName}</Text>
            </TouchableOpacity>`;

    const styleSnippet = `
    agentButton: {
        backgroundColor: '#1e1e1e',
        padding: 15,
        borderRadius: 10,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#333',
        alignItems: 'center',
    },
    agentButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },`;

    if (!homeContent.includes(`navigation.navigate('${targetName}')`)) {
        if (homeContent.includes('</ScrollView>')) {
            homeContent = homeContent.replace('</ScrollView>', `${buttonSnippet}\n</ScrollView>`);
        } else if (homeContent.includes('</View>')) {
            homeContent = homeContent.replace('</View>', `${buttonSnippet}\n</View>`);
        }

        if (homeContent.includes('StyleSheet.create({') && !homeContent.includes('agentButton:')) {
            homeContent = homeContent.replace('StyleSheet.create({', `StyleSheet.create({${styleSnippet}`);
        }

        fs.writeFileSync(homePath, homeContent);
        console.log(`🧠 [الوكيل]: تم تعديل ملف Home.tsx وحقن الزر بنجاح.`);
    }
}

console.log(`🎯 [الوكيل]: اكتملت المهمة بنجاح تام!`);
