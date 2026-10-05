import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TransferScreen({ navigation }) {
  const [currency, setCurrency] = useState('USD');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const balances = {
    USD: 1250.00,
    SAR: 4687.50,
    YER: 312500.00,
  };

  const handleTransfer = () => {
    if (!recipient || !amount) {
      Alert.alert('خطأ', 'يرجى إدخال عنوان المستلم والمبلغ المراد تحويله.');
      return;
    }
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      Alert.alert('خطأ', 'يرجى إدخال مبلغ صحيح.');
      return;
    }
    if (numAmount > balances[currency]) {
      Alert.alert('خطأ', 'المبلغ المطلوب يتجاوز الرصيد المتاح لهذه العملة.');
      return;
    }

    Alert.alert(
      'تأكيد التحويل',
      `هل أنت متأكد من تحويل ${numAmount} ${currency} إلى ${recipient}؟`,
      [
        { text: 'إلغاء', style: 'cancel' },
        { 
          text: 'تأكيد', 
          onPress: () => {
            Alert.alert('نجاح', 'تمت عملية التحويل بنجاح!');
            setAmount('');
            setRecipient('');
          } 
        }
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>تحويل الأموال</Text>
      
      <Text style={styles.label}>اختر العملة</Text>
      <View style={styles.currencyContainer}>
        {['USD', 'SAR', 'YER'].map((cur) => (
          <TouchableOpacity
            key={cur}
            style={[styles.currencyButton, currency === cur && styles.activeCurrency]}
            onPress={() => setCurrency(cur)}
          >
            <Text style={[styles.currencyText, currency === cur && styles.activeCurrencyText]}>
              {cur}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.balanceText}>
        الرصيد المتاح: {balances[currency].toLocaleString()} {currency}
      </Text>

      <Text style={styles.label}>عنوان المستلم / رقم الحساب</Text>
      <TextInput
        style={styles.input}
        placeholder="أدخل عنوان المحفظة أو رقم الحساب"
        placeholderTextColor="#888"
        value={recipient}
        onChangeText={setRecipient}
      />

      <Text style={styles.label}>المبلغ المراد تحويله</Text>
      <TextInput
        style={styles.input}
        placeholder="0.00"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleTransfer}>
        <Ionicons name="send" size={20} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.submitButtonText}>تنفيذ التحويل</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#121212',
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
  currencyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  currencyButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#1e1e1e',
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#333',
  },
  activeCurrency: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  currencyText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  activeCurrencyText: {
    color: '#fff',
  },
  balanceText: {
    color: '#888',
    fontSize: 12,
    marginBottom: 10,
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
    flexDirection: 'row',
    backgroundColor: '#2563eb',
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
