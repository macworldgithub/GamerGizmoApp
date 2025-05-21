import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { ArrowLeftIcon, SearchIcon } from "lucide-react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import {
  Image,
  Linking,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import HeaderImage from "../../assets/images/header.png";
import { API_BASE_URL } from "@/utils/config";
import TermsModal from "../(tabs)/TermsModal";
// import PrivacyModal from "@/components/PrivacyModal";

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


const tagColors = [
  "bg-blue-100 text-blue-600",
  "bg-indigo-100 text-indigo-600",
  "bg-orange-100 text-orange-600",
  "bg-green-100 text-green-600",
  "bg-teal-100 text-teal-600",
  "bg-pink-100 text-pink-600",
  "bg-gray-100 text-gray-600",
  "bg-yellow-100 text-yellow-600",
  "bg-red-100 text-red-600",
  "bg-purple-100 text-purple-600",
];


const getRandomTagColor = () =>
  tagColors[Math.floor(Math.random() * tagColors.length)];


const BlogCard = ({
  images,
  title,
  tags,
  created_at,
}: {
  images: string;
  title: string;
  tags: string;
  created_at: string;
}) => {
  return (
    <Card>
      <View className="h-40 mb-2 rounded" >
        <Image
          source={{ uri: images }}
          className="rounded-lg w-full h-full"
          resizeMode="cover"
        />
      </View>
      <Text className="font-semibold text-base mb-1">{title}</Text>
      <View className="flex-row flex-wrap gap-2 mb-1">
        {tags.split(",").map((tag: string, index: number) => (
          <Text
            key={index}
            className={`px-3 py-1 text-xs rounded-full ${getRandomTagColor()}`}
          >
            {tag.trim()}
          </Text>
        ))}
      </View>
      <Text className="text-xs text-gray-400 mt-1">{created_at}</Text>
    </Card>
  );
};

const totalPages = 216;

const BlogScreen = () => {
  const [page, setPage] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);


  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/blogs/getAll?pageNo=${page}`
      );
      const json = await response.json();
      setBlogs(json?.data || []);

    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [page]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const footerLinks = [
    { label: "About Us", url: "https://gamergizmo.com/about" },
    { label: "Advertising", url: "https://gamergizmo.com/advertising" },
    { label: "Terms of use", url: "" },
    { label: "Privacy Policy", url: "https://gamergizmo.com/privacy" },
    { label: "Contact Us", url: "https://gamergizmo.com/contact" },
  ];



  return (
    <ScrollView className="h-full ">
      {/* Navbar */}
      <View className="flex-row items-center justify-between px-4 py-2 bg-white border-b border-gray-200">
        <TouchableOpacity onPress={() => router.push("/profile")}>
          <ArrowLeftIcon size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-center font-semibold text-base flex-1 ml-[-20]">
          Blogs
        </Text>
      </View>

      {/* Header Image */}
      <View className="relative w-full h-48">
        <Image source={HeaderImage} className="w-full h-40" resizeMode="cover" />
        <View className="absolute inset-0 justify-center px-4">
          <Text className="text-white font-bold text-lg">NEW GAMING PCs</Text>
          <Text className="text-blue-400 font-bold text-base">OF THE WEEK</Text>
        </View>
      </View>

      {/* Blog Cards */}
      <View className="px-4 py-4">
        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          blogs.map((item: any, index: number) => (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/blog/[id]",
                  params: { id: item.id.toString() },
                })
              }
            >
              <BlogCard
                key={index}
                images={item.images}
                title={item.title}
                tags={item.tags}
                created_at={new Date(item.created_at).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              />
            </TouchableOpacity>
          ))
        )}
      </View>

      {/* Pagination */}
      <View className="flex-row justify-center items-center space-x-2 pb-6">
        {page > 1 && (
          <Button onPress={() => handlePageChange(page - 1)}>Prev</Button>
        )}
        <Button onPress={() => handlePageChange(1)}>1</Button>
        {page > 4 && <Text className="text-sm">...</Text>}
        {page > 2 && (
          <Button onPress={() => handlePageChange(page - 1)}>{page - 1}</Button>
        )}
        <Button onPress={() => { }}>{page}</Button>
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
          {footerLinks.map((item, index) => (
            <View key={item.label} className="flex-row items-center">
              <TouchableOpacity
                onPress={() => {
                  if (item.label === "Terms of use") {
                    setShowTermsModal(true);
                  } else if (item.label === "Privacy Policy") {
                    setShowPrivacyModal(true);
                  } else {
                    Linking.openURL(item.url);
                  }
                }}
              >
                <Text className="text-gray-400 text-sm mx-1">{item.label}</Text>
              </TouchableOpacity>

              {index !== footerLinks.length - 1 && (
                <Text className="text-gray-400 text-sm">|</Text>
              )}
            </View>
          ))}
        </View>

        <View className="flex-row justify-center gap-4">
          <TouchableOpacity
            onPress={() => Linking.openURL("https://www.facebook.com/profile.php?id=61573613765643")}
            className="rounded-full p-3"
            style={{ backgroundColor: "#8e2de2" }}
          >
            <Ionicons name="logo-facebook" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL("https://www.instagram.com/gamergizmo_official?utm_source=qr&igsh=eWdrMmpkMjEyc3p6")}
            className="bg-gray-800 rounded-full p-3"
          >
            <FontAwesome5 name="instagram" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL("https://www.youtube.com/@GamerGizmo_Official")}
            className="bg-gray-800 rounded-full p-3"
          >
            <Ionicons name="logo-youtube" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL("https://www.tiktok.com/@gamergizmo_official")}
            className="bg-gray-800 rounded-full p-3"
          >
            <FontAwesome5 name="tiktok" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <TermsModal visible={showTermsModal} onClose={() => setShowTermsModal(false)} />
      {/* <PrivacyModal visible={showPrivacyModal} onClose={() => setShowPrivacyModal(false)} /> */}

    </ScrollView>
  );
};

export default BlogScreen;
