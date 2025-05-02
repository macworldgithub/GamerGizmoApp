import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import Productcarrd from './Productcarrd'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store/store'
import axios from 'axios'
import { API_BASE_URL } from '@/utils/config'

const PopularMainSection = () => {
    const [LaptopUsedData, setLaptopUsedData] =useState(
      [
        {
          id: 1,
          name: "Radeon RX 580 OC...",
          description: "Powerful graphics card for gaming...",
          price: "AED 551.00",
          images: [
            {
              id: 1,
              product_id: 1,
              image_url: "../../assets/images/default.png",
              created_at: "",
            },
          ],
        },
      ]
    );
     
      const ConsoleCategory = "Gaming Consoles";
      const consoleCondition = 2;
      const explorePath = `/${encodeURIComponent(
        ConsoleCategory
      )}?condition=${consoleCondition}`;
      const token = useSelector((state: RootState) => state.user.token);
      const [fetcher, seReftech] = useState(false);
    
     
     
    
      const fetchUsedLaptops = async () => {
        try {
          const conditions = [2, 3, 4]; // all conditions considered as "used"
          const promises = conditions.map((cond) =>
            axios.get(
              `${API_BASE_URL}/products/getAll?category_id=1&condition=${cond}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            )
          );
    
          const responses = await Promise.all(promises);
          const allData = responses.flatMap((res) => res?.data?.data || []);
          setLaptopUsedData(allData);
          console.log("Used Laptops Data:", allData);
        } catch (err) {
          console.error("Failed to fetch used laptops.");
        }
      };

      useEffect(() => {
        fetchUsedLaptops();
        
      }, [fetcher]);
  return (
    <View>
       <View className="mt-6">
        <Productcarrd
            title="Popular in Used Laptops"
            productList ={LaptopUsedData}
            explorePath={`/laptops?condition=2`}
            onExplore={() => console.log("Explore Gaming PC Parts")}
         />
       
        </View>
    
    </View>
  )
}

export default PopularMainSection