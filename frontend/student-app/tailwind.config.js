/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        /* Brand */
        primary: "#6CFFC4",
        "primary-foreground": "#0B0F14",

        /* Base */
        background: "#0B0F14",
        foreground: "#E6EDF3",

        /* UI surfaces */
        card: "#121823",
        "card-foreground": "#E6EDF3",
        border: "#1F2937",
        input: "#1F2937",

        /* Secondary */
        secondary: "#1A2232",
        "secondary-foreground": "#E6EDF3",

        /* Muted */
        muted: "#2A3441",
        "muted-foreground": "#9AA4B2",

        /* Status */
        destructive: "#EF4444",
        "destructive-foreground": "#FFFFFF",
        success: "#22C55E",
        warning: "#FACC15",
        info: "#38BDF8",
      },
      fontFamily: {
        thin: ["Inter-Thin", "sans-serif"],
        extralight: ["Inter-ExtraLight", "sans-serif"],
        light: ["Inter-Light", "sans-serif"],
        regular: ["Inter-Regular", "sans-serif"],
        medium: ["Inter-Medium", "sans-serif"],
        semibold: ["Inter-SemiBold", "sans-serif"],
        bold: ["Inter-Bold", "sans-serif"],
        extrabold: ["Inter-ExtraBold", "sans-serif"],
        black: ["Inter-Black", "sans-serif"],

        // Sora specific weights
        "sora-thin": ["Sora-Thin", "sans-serif"],
        "sora-extralight": ["Sora-ExtraLight", "sans-serif"],
        "sora-light": ["Sora-Light", "sans-serif"],
        "sora-regular": ["Sora-Regular", "sans-serif"],
        "sora-medium": ["Sora-Medium", "sans-serif"],
        "sora-semibold": ["Sora-SemiBold", "sans-serif"],
        "sora-bold": ["Sora-Bold", "sans-serif"],
        "sora-extrabold": ["Sora-ExtraBold", "sans-serif"],

        // Inter specific weights
        "inter-thin": ["Inter-Thin", "sans-serif"],
        "inter-extralight": ["Inter-ExtraLight", "sans-serif"],
        "inter-light": ["Inter-Light", "sans-serif"],
        "inter-regular": ["Inter-Regular", "sans-serif"],
        "inter-medium": ["Inter-Medium", "sans-serif"],
        "inter-semibold": ["Inter-SemiBold", "sans-serif"],
        "inter-bold": ["Inter-Bold", "sans-serif"],
        "inter-extrabold": ["Inter-ExtraBold", "sans-serif"],
        "inter-black": ["Inter-Black", "sans-serif"],
      },

      borderRadius: {
        lg: 14,
        xl: 18,
        "2xl": 22,
      },
    },
  },
  plugins: [],
}