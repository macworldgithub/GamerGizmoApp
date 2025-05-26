import * as Location from 'expo-location';
import Geocoder from 'react-native-geocoding';
import { MAP_KEY } from './config'; 

Geocoder.init(MAP_KEY); 

export const getLocation = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      console.warn("Location permission not granted");
      return null;
    }

    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    const geoResponse = await Geocoder.from(latitude, longitude);

    const addressComponents = geoResponse.results[0].address_components;

    const cityComponent = addressComponents.find((component: any) =>
      component.types.includes("locality")
    );

    const city = cityComponent?.long_name || null;

    return city;

  } catch (error) {
    console.error("Error fetching location or city:", error);
    return null;
  }
};
