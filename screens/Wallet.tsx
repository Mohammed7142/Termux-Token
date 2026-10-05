import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants';
import MainLayout from './MainLayout';

const Wallet = ({ navigation }) => {
    return (
        <MainLayout>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>شاشة Wallet (تم إنشاؤها تلقائياً)</Text>
                <Text style={styles.subtitle}>هذه الشاشة تعمل بكفاءة تتم إدارتها بواسطة الوكيل المستقل.</Text>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.goBack()}>
                    <Text style={styles.btnText}>العودة للرئيسية</Text>
                </TouchableOpacity>
            </ScrollView>
        </MainLayout>
    );
};

const styles = StyleSheet.create({
    container: { flexGrow: 1, backgroundColor: COLORS.black, padding: 20, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 22, fontWeight: 'bold', color: '#fff', marginBottom: 10, textAlign: 'center' },
    subtitle: { color: '#aaa', fontSize: 14, marginBottom: 30, textAlign: 'center' },
    btn: { backgroundColor: '#059669', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 8 },
    btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});

export default Wallet;
