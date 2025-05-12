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
  modelId:  number | null;
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
    if (!userData || !userData.id || !userData.username) {
      Alert.alert("Error", "User is not logged in.");
      return;
    }

    if (!adData.category?.id) {
      Alert.alert("Error", "Category is missing.");
      return;
    }

    if (!adData.imageUri) {
      Alert.alert("Error", "upload an image before posting.");
      return;
    }

    const formData = new FormData();
    formData.append("title", adData.details.title);
    formData.append("description", adData.details.description);
    //formData.append("brand", adData.details.brand || "Unknown");
    formData.append("brand_id", String(adData.details.brandId ?? ""));
    formData.append("model_id", String(adData.details.modelId ?? ""));
    //formData.append("condition", adData.details.condition);
    formData.append("location", adData.details.location);
    //formData.append("city", adData.city?.name || "Unknown");
   // formData.append("category", adData.category?.name || "Uncategorized");
    formData.append("price", adData.price || "0");
    formData.append("stock", "1");
    formData.append("user_id", String(userData.id));
    formData.append("name", userData.username || "Anonymous");
    formData.append("category_id", String(adData.category?.id || ""));


    console.log({
  title: adData.details.title,
  description: adData.details.description,
  brandId: adData.details.brandId,
  model_id: adData.details.model,
  location: adData.details.location,
  price: adData.price,
  category_id: adData.category?.id,
  user_id: userData.id,
  name: userData.username,
  //stock:"1",
  image: adData.imageUri,
});

    if (adData.imageUri) {
    formData.append("file", {
      uri: adData.imageUri,
      type: "image/jpeg",
      name: "photo.jpg",
    } as any);
  }
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");

      const response = await axios.post(
        "https://backend.gamergizmo.com/products/createProduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        Alert.alert("Success", "Ad posted successfully!");
        
      } else {
        Alert.alert("Error", "Failed to post ad. Please try again.");
      }
    } catch (error: any) {
      console.log("Error Response:", JSON.stringify(error.response?.data, null, 2));

      if (error.response?.data?.message) {
        Alert.alert("Error", `Failed: ${error.response.data.message}`);
      } else {
        Alert.alert("Error", "Something went wrong while posting the ad.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>View Details</Text>

      <View style={styles.section}>
        <Text style={styles.label}>City:</Text>
        <TextInput style={styles.input} value={adData.city?.name ?? "City not selected"} editable={false} />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Category:</Text>
        <TextInput style={styles.input} value={adData.category?.name ?? "Category not selected"} editable={false} />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Title:</Text>
        <TextInput style={styles.input} value={adData.details.title} editable={false} />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Description:</Text>
        <TextInput style={styles.input} value={adData.details.description} editable={false} multiline />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Brand:</Text>
        <TextInput style={styles.input} value={adData.details.brand || ""} editable={false} />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Model:</Text>
        <TextInput style={styles.input} value={adData.details.model} editable={false} />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Condition:</Text>
        <TextInput style={styles.input} value={adData.details.condition} editable={false} />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Location:</Text>
        <TextInput style={styles.input} value={adData.details.location} editable={false} />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Price:</Text>
        <TextInput style={styles.input} value={adData.price || "0"} editable={false} />
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
