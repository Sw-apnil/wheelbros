import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        bone: "#EDEDE9",
        linen: "#F5EBE0",
        clay: "#E3D5CA",
        dune: "#D6CCC2",
        saddle: "#D5BDAF",
        ink: "#111111",
        carbon: "#1A1A1A",
        graphite: "#2A2A2A",
        ember: "#9F3428",
        olive: "#5D6650"
      },
      fontFamily: {
        heading: ["Space Grotesk", "Inter", "sans-serif"],
        body: ["Inter", "sans-serif"]
      },
      boxShadow: {
        premium: "0 22px 70px rgba(17, 17, 17, 0.14)",
        soft: "0 18px 45px rgba(17, 17, 17, 0.08)"
      },
      backgroundImage: {
        "grain-radial":
          "radial-gradient(circle at 20% 15%, rgba(213, 189, 175, 0.28), transparent 32%), radial-gradient(circle at 80% 20%, rgba(159, 52, 40, 0.12), transparent 24%), linear-gradient(135deg, #F5EBE0 0%, #EDEDE9 45%, #D6CCC2 100%)"
      }
    }
  },
  plugins: []
};

export default config;
