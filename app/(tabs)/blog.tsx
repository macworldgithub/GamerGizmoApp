import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ArrowLeftIcon, SearchIcon } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    Image,
    Linking,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import HeaderImage from '../../assets/images/header.png';

const Card = ({ children }: { children: React.ReactNode }) => (
  <View className="bg-white p-4 mb-4 rounded-2xl shadow">{children}</View>
);

const Button = ({
  children,
  onPress,
}: {
  children: React.ReactNode;
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    className="bg-white border border-gray-300 px-3 py-1 rounded-md"
  >
    <Text className="text-sm text-black text-center">{children}</Text>
  </TouchableOpacity>
);

const blogData = new Array(2).fill({
  title: 'Exploring the Off-plan Investment Hotspots in Umm Al Quwain',
  description:
    'Want to make a potentially rewarding investment? Check out these off-plan hotspots in Umm Al Quwain',
});

const totalPages = 216;

const BlogCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <Card>
    <View className="h-40 bg-gray-200 mb-2 rounded" />
    <Text className="font-semibold text-base mb-1">{title}</Text>
    <Text className="text-xs text-gray-600">{description}</Text>
  </Card>
);

const BlogScreen = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <ScrollView className="bg-gray-100 h-full">
      {/* Navbar */}
      <View className="flex-row items-center justify-between px-4 py-2 bg-white border-b border-gray-200">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeftIcon size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-center font-semibold text-base flex-1 ml-[-20]">
          Blogs
        </Text>
      </View>

      {/* Search Bar */}
      <View className="flex-row items-center px-4 py-2 bg-white border-b border-gray-200">
        <View className="flex-row items-center bg-gray-100 px-3 py-2 rounded-xl flex-1">
          <SearchIcon size={16} color="gray" className="mr-2" />
          <TextInput
            className="flex-1"
            placeholder="Search"
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {/* Header Image with Text Overlay */}
      <View className="relative w-full h-40">
        <Image source={HeaderImage} className="w-full h-40" resizeMode="cover" />
        <View className="absolute inset-0 justify-center px-4">
          <Text className="text-white font-bold text-lg">NEW GAMING PCs</Text>
          <Text className="text-blue-400 font-bold text-base">OF THE WEEK</Text>
        </View>
      </View>

      {/* Blog Cards */}
      <View className="px-4 py-4">
        {blogData.map((item, index) => (
          <BlogCard
            key={index}
            title={item.title}
            description={item.description}
          />
        ))}
      </View>

      {/* Pagination */}
      <View className="flex-row justify-center items-center space-x-2 pb-6">
        {page > 1 && <Button onPress={() => handlePageChange(page - 1)}>Prev</Button>}
        <Button onPress={() => handlePageChange(1)}>1</Button>
        {page > 4 && <Text className="text-sm">...</Text>}
        {page > 2 && (
          <Button onPress={() => handlePageChange(page - 1)}>{page - 1}</Button>
        )}
        <Button onPress={() => {}}>{page}</Button>
        {page < totalPages - 1 && (
          <Button onPress={() => handlePageChange(page + 1)}>{page + 1}</Button>
        )}
        {page < totalPages - 3 && <Text className="text-sm">...</Text>}
        <Button onPress={() => handlePageChange(totalPages)}>{totalPages}</Button>
        {page < totalPages && (
          <Button onPress={() => handlePageChange(page + 1)}>Next</Button>
        )}
      </View>

      {/* Footer */}
      <View className="bg-black py-6 px-4">
        <View className="flex-row flex-wrap justify-center mb-4">
          {[
            'About Us',
            'Advertising',
            'Careers',
            'Terms of use',
            'Privacy Policy',
            'Contact Us',
          ].map((label, index, arr) => (
            <View key={label} className="flex-row items-center">
              <TouchableOpacity onPress={() => console.log(`${label} pressed`)}>
                <Text className="text-gray-400 text-sm mx-1">{label}</Text>
              </TouchableOpacity>
              {index !== arr.length - 1 && (
                <Text className="text-gray-400 text-sm">|</Text>
              )}
            </View>
          ))}
        </View>

        <View className="flex-row justify-center space-x-4">
          <TouchableOpacity
            onPress={() => Linking.openURL('https://facebook.com')}
            className="rounded-full p-3"
            style={{ backgroundColor: '#8e2de2' }}
          >
            <Ionicons name="logo-facebook" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://linkedin.com')}
            className="bg-gray-800 rounded-full p-3"
          >
            <Ionicons name="logo-linkedin" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://youtube.com')}
            className="bg-gray-800 rounded-full p-3"
          >
            <Ionicons name="logo-youtube" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default BlogScreen;
