// app/blog/[id].tsx
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { API_BASE_URL } from "@/utils/config";
import { ArrowLeftIcon } from "lucide-react-native";

type BlogItem = {
  id: number;
  images: string;
  title: string;
  tags: string;
  created_at: string;
  content?: string; 
};

const BlogDetail = () => {
  const { id } = useLocalSearchParams(); 
  const [blog, setBlog] = useState<BlogItem | null>(null);;
  const [loading, setLoading] = useState(true);

  const fetchBlogDetail = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/blogs/getSingleBlogsDetails?id=${id}`);
      const json = await response.json();
      setBlog(json?.data);
    } catch (error) {
      console.error("Failed to fetch blog detail:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogDetail();
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!blog) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Blog not found.</Text>
      </View>
    );
  }

  return (
    <>
    <View className="flex-row items-center justify-between px-4 py-2 bg-white border-b border-gray-200">
        <TouchableOpacity onPress={() => router.push("/blog")}>
          <ArrowLeftIcon size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-center font-semibold text-base flex-1 ml-[-20]">
          Blogs
        </Text>
      </View>
    <ScrollView className="bg-white p-4 ">
      <Image
        source={{ uri: blog.images }}
        className="w-full h-60 rounded-lg mb-4"
        resizeMode="cover"
      />
      <Text className="text-sm text-[#9333eb] mb-4">
        {new Date(blog.created_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </Text>
      <View className="flex-row flex-wrap gap-2 mb-4">
        {blog.tags.split(",").map((tag: string, idx: number) => (
          <Text
            key={idx}
            className="px-3 py-1 rounded-full text-xs text-[#9333eb] bg-[#f3e8ff]"
          >
            {tag.trim()}
          </Text>
        ))}
      </View>
      <Text className="text-2xl font-bold mb-2">{blog.title}</Text>
      <Text className="text-base text-gray-800 leading-relaxed mb-4">{blog.content}</Text>
    </ScrollView>
    </>
  );
};

export default BlogDetail;

