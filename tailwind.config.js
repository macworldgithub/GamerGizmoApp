// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   // content: [],
//   content: ["./app/**/*.{js,jsx,ts,tsx}"],
//   presets: [require("nativewind/preset")],
//   theme: {
//     extend: {},

  
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient": "linear-gradient(to right, rgb(99, 69, 237), #dc39fc)",
      },
    },
  },
  plugins: [],
};
