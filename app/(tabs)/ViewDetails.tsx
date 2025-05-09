import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "@/utils/config";

interface City {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

interface AdDetails {
  title: string;
  description: string;
  brand: string;
  brandId: number | null;
  model: string;
  modelId: number | null;
  condition: string;
  location: string;
}

interface AdState {
  city: City | null;
  category: Category | null;
  details: AdDetails;
  price: string | null;
  imageUri: string | null;
}

const ViewDetails: React.FC = ({ navigation }: any) => {
  const adData: AdState = useSelector((state: RootState) => state.ad);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        const token = await AsyncStorage.getItem("token");

        if (user && token) {
          const parsedUser = JSON.parse(user);
          setUserData({ ...parsedUser, token });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUserData();
  }, []);

  const handlePostAd = async () => {
    setLoading(true);
    const formData = new FormData();

    formData.append("name", "heelo");
    formData.append("user_id", "164");
    formData.append("description", adData.details.description);
    formData.append("price", adData.price ?? "0");
    formData.append("stock", "1");
    formData.append("brand_id", String(adData.details.brandId ?? 0));
    formData.append("otherBrandName", adData.details.brand || "");
    formData.append("model_id", String(adData.details.modelId || 0));
    formData.append("category_id", String(adData.category?.id || 0));
    formData.append("condition", "Used");
    formData.append("location", "Ajman");
    // formData.append("condition", adData.details.condition || "1");
    // formData.append("location", adData.details.location || "1");
    formData.append("is_published", "true");
    formData.append("component_type", "33");
    formData.append("is_store_product", "false");

    if (adData.imageUri) {
      const imageName = adData.imageUri.split("/").pop() || "photo.jpg";
      const file = {
        uri: adData.imageUri,
        name: imageName,
        type: "image/jpeg",
      };

      // 👇 Important: must match field expected by backend exactly
      formData.append("images", file as any);
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/products/createProduct`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", response.data);
      Alert.alert("Success", "Your ad has been posted successfully.");
    } catch (error: any) {
      console.log("Error Response:", error.response?.data || error.message);
      Alert.alert("Error", "There was a problem posting your ad.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>View Details</Text>

      <View style={styles.section}>
        <Text style={styles.label}>City:</Text>
        <TextInput
          style={styles.input}
          value={adData.city?.name ?? "City not selected"}
          editable={false}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Category:</Text>
        <TextInput
          style={styles.input}
          value={adData.category?.name ?? "Category not selected"}
          editable={false}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Title:</Text>
        <TextInput
          style={styles.input}
          value={adData.details.title}
          editable={false}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={styles.input}
          value={adData.details.description}
          editable={false}
          multiline
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Brand:</Text>
        <TextInput
          style={styles.input}
          value={adData.details.brand || ""}
          editable={false}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Model:</Text>
        <TextInput
          style={styles.input}
          value={adData.details.model}
          editable={false}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Condition:</Text>
        <TextInput
          style={styles.input}
          value={adData.details.condition || "Condition not specified"}
          editable={false}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Location:</Text>
        <TextInput
          style={styles.input}
          value={adData.details.location || "Location not specified"}
          editable={false}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Price:</Text>
        <TextInput
          style={styles.input}
          value={adData.price || "0"}
          editable={false}
        />
      </View>

      {adData.imageUri && (
        <View style={styles.section}>
          <Text style={styles.label}>Image:</Text>
          <Image source={{ uri: adData.imageUri }} style={styles.image} />
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.postAdButton}
          onPress={handlePostAd}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Posting..." : "Post an Ad"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    marginBottom: 15,
  },
  label: {
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginTop: 5,
    backgroundColor: "#f5f5f5",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
    marginBottom: 30,
  },
  postAdButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ViewDetails;
