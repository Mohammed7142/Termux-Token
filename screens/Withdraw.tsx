import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function WithdrawScreen({ navigation }) {
  const [currency, setCurrency] = useState('USD');
  const [method, setMethod] = useState('Bank Transfer');
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');

  // الأرصدة المتاحة في المحفظة
  const balances = {
    USD: 1250.00,
    SAR: 4687.50,
    YER: 312500.00,
  };

  const handleWithdraw = () => {
    if (!accountNumber || !amount) {
      Alert.alert('خطأ', 'يرجى إدخال تفاصيل حساب السحب والمبلغ المطلوب.');
      return;
    }
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      Alert.alert('خطأ', 'يرجى إدخال مبلغ صحيح.');
      return;
    }
    if (numAmount > balances[currency]) {
      Alert.alert('خطأ', 'المبلغ المطلوب للسحب يتجاوز الرصيد المتاح لهذه العملة.');
      return;
    }

    Alert.alert(
      'تأكيد طلب السحب',
      `هل أنت متأكد من سحب مبلغ ${numAmount} ${currency} إلى الحساب (${accountNumber}) عبر (${method})؟`,
      [
        { text: 'إلغاء', style: 'cancel' },
        { 
          text: 'تأكيد السحب', 
          onPress: () => {
            Alert.alert('نجاح', 'تم تقديم طلب السحب بنجاح وسيتم معالجته قريباً!');
            setAmount('');
            setAccountNumber('');
          } 
        }
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>سحب الأموال</Text>
      
      {/* اختيار العملة */}
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

      {/* طريقة السحب */}
      <Text style={styles.label}>طريقة السحب</Text>
      <View style={styles.currencyContainer}>
        {['حوالة نقدية', 'حساب بنكي'].map((m) => (
          <TouchableOpacity
            key={m}
            style={[styles.currencyButton, method === m && styles.activeCurrency]}
            onPress={() => setMethod(m)}
          >
            <Text style={[styles.currencyText, method === m && styles.activeCurrencyText]}>
              {m}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* رقم الحساب / المستلم */}
      <Text style={styles.label}>رقم الحساب أو اسم المستلم للاستلام</Text>
      <TextInput
        style={styles.input}
        placeholder="أدخل رقم الحساب البنكي أو الهاتف"
        placeholderTextColor="#888"
        value={accountNumber}
        onChangeText={setAccountNumber}
      />

      {/* المبلغ */}
      <Text style={styles.label}>مبلغ السحب</Text>
      <TextInput
        style={styles.input}
        placeholder="0.00"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      {/* زر تنفيذ السحب */}
      <TouchableOpacity style={styles.submitButton} onPress={handleWithdraw}>
        <Ionicons name="arrow-down-circle" size={20} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.submitButtonText}>تأكيد طلب السحب</Text>
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
    backgroundColor: '#10b981',
    borderColor: '#10b981',
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
