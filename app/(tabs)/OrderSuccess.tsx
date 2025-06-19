import { useLocalSearchParams, router } from 'expo-router';
import { View, Text, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';

export default function OrderSuccess() {
  const params = useLocalSearchParams();
  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const paymentIntent = params.payment_intent as string;
  const clientSecret = params.client_secret as string;
  const redirectStatus = params.redirect_status as string;

  useEffect(() => {
    if (redirectStatus === 'succeeded') {
      setStatusMessage('🎉 Payment successful! Thank you for your order.');
    } else if (redirectStatus === 'failed') {
      setStatusMessage('❌ Payment failed. Please try again.');
    } else {
      setStatusMessage('⚠️ Payment status unknown.');
    }
    setLoading(false);
  }, [redirectStatus]);

  
  useEffect(() => {
    if (!loading) {
      const timeout = setTimeout(() => {
        router.replace('/Orders');
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [loading]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#8b5cf6" />
        <Text className="mt-4 text-gray-700">Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center bg-gray-100 p-4">
      <View className="bg-purple-200 p-6 rounded-lg w-full">
        <Text className="text-2xl font-bold text-purple-900 mb-2 text-center">Order Status</Text>
        <Text className="text-base text-gray-800 mb-2 text-center">{statusMessage}</Text>
        <Text className="text-sm text-gray-600 text-center">
          Payment Intent: {paymentIntent}
        </Text>
        <Text className="text-sm text-gray-600 text-center">
          Client Secret: {clientSecret}
        </Text>
        <Text className="text-xs text-gray-500 text-center mt-4">
          Redirecting to orders screen in 5 seconds...
        </Text>
      </View>
    </View>
  );
}
