import { type Config } from "tailwindcss";

export default {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {

            colors: {
                "accent": "var(--accent)",
                "bgrd": "var(--bgrd)",
                "bgrd-b": "var(--bgrd-b)",
                "gray": "var(--gray)"
            },
            fontFamily: {
                firaCode: ["var(--font-fira-code)"]
            }
        },
    },
    plugins: [],
} satisfies Config;
