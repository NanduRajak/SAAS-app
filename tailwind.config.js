/** @type {import('tailwindcss').Config} */
export const content = [
  "./app/**/*.{js,ts,jsx,tsx}", // For Next.js 13+ app directory
  "./pages/**/*.{js,ts,jsx,tsx}", // For pages directory
  "./components/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {},
};
export const plugins = [require("daisyui")];
