import React, { useState } from 'react';
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

const Settings = ({ navigation }) => {
    const [amount, setAmount] = useState('');
    const [account, setAccount] = useState('');

    const handleAction = () => {
        alert('تم تنفيذ العملية بنجاح في Settings');
    };

    return (
        <MainLayout>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>عملية Settings</Text>

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

export default Settings;
