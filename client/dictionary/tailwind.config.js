export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'custom': "url('./src/assets/images/banner.png')",
      }),
      backgroundSize: {
        'zoom': '110%',
      },
    },
  },
  plugins: [],
}