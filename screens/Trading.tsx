import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { COLORS } from '../constants';
import MainLayout from './MainLayout';

const Trading = ({ navigation }) => {
    const [data, setData] = useState('');
    return (
        <MainLayout>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>وحدة Trading</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="أدخل البيانات أو المعاملة..." 
                    placeholderTextColor="#666"
                    value={data}
                    onChangeText={setData}
                />
                <TouchableOpacity style={styles.btn} onPress={() => alert('تمت معالجة بيانات Trading بنجاح')}>
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

export default Trading;
