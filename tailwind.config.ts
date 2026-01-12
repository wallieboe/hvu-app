import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                hvu: {
                    red: "#F23D20", // The bright action color
                    dark: "#3A0A0A", // The header background
                    cream: "#FAF7F4", // The soft background
                    lila: "#D8B4E2",
                    blue: "#AEBCFC",
                    pink: "#F2C4C4",
                }
            },
            fontFamily: {
                sans: ["var(--font-inter)", "sans-serif"],
                display: ["var(--font-anton)", "sans-serif"],
            }
        },
    },
    plugins: [],
};
export default config;
