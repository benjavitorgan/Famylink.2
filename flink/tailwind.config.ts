import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;

module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      height: {
        '30vh': '30vh',
      },
    },
  },
  plugins: [],
} satisfies Config;
