// import React, { useEffect, useState } from "react";
// import { View, Image } from "react-native";
// import * as Progress from "react-native-progress";

// const SplashScreen = () => {
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     let interval = setInterval(() => {
//       setProgress((oldProgress) => {
//         if (oldProgress >= 1) {
//           clearInterval(interval);
//           return 1;
//         }
//         return oldProgress + 0.01; // Increase progress gradually
//       });
//     }, 1200); // Updates every 1.2 seconds

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <View className="flex-1 items-center justify-center bg-white">
//       {/* Logo */}
//       <Image
//         source={require("../../assets/images/logo.png")}
//         className="w-40 h-40 mb-6"
//         resizeMode="contain"
//       />

//       {/* Loader with 1-Minute Completion */}
//       <Progress.Bar progress={progress} width={200} color="purple" />
//     </View>
//   );
// };

// export default SplashScreen;

import React, { useEffect, useState } from "react";
import { View, Image } from "react-native";
import * as Progress from "react-native-progress";

const SplashScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 1) {
          clearInterval(interval);
          return 1;
        }
        return oldProgress + 0.05; 
      });
    }, 100); 

    return () => clearInterval(interval);
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      {/* Logo */}
      <Image
        source={require("../../assets/images/logo.png")}
        className="w-40 h-40 mb-6"
        resizeMode="contain"
      />

      
      <Progress.Bar progress={progress} width={200} color="purple" />
    </View>
  );
};

export default SplashScreen;
