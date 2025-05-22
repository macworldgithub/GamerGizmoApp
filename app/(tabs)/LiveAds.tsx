import { API_BASE_URL } from "@/utils/config";
import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";

interface AdProps {
  pageName: string;
  adId: number;
}

const Ad = ({ pageName, adId }: AdProps) => {
  const [adImages, setAdImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAdImages = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/ads/fetch?page=${pageName}`);
      const data = await response.json();
      console.log("Ad data:", data);
      setAdImages(data || []);
    } catch (err) {
      console.error("Error fetching ads:", err);
      setError("Failed to load ad");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdImages();
  }, [pageName]);

  const selectedAd = adImages.find((ad: any) => ad.ad_id === adId);

  const adUrl = selectedAd
    ? selectedAd.url.startsWith("http")
      ? selectedAd.url
      : `https://backend.gamergizmo.com${selectedAd.url.startsWith("/") ? selectedAd.url : "/" + selectedAd.url
      }`
    : "";

  return (
    <View style={{
      height: 130,
      padding: 10,
      borderRadius: 16,
      backgroundColor: !loading && !selectedAd ? "#E5E7EB" : "transparent",
      borderWidth: !loading && !selectedAd ? 1 : 0,
      borderColor: !loading && !selectedAd ? "#D1D5DB" : "transparent",
    }}>
      {loading && <ActivityIndicator size="small" color="#000" />}
      {!loading && error && <Text style={{ color: "red" }}>{error}</Text>}

      {!loading && selectedAd ? (
        <Image
          source={{ uri: adUrl }}
          style={{ width: "100%", height: "100%", borderRadius: 12 }}
          resizeMode="cover"
          onError={() => setError("Failed to load image")}
        />
      ) : !loading && !selectedAd ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text className="text-center text-gray-500">
            No ad available for this slot
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default Ad;
