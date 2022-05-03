module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      zIndex: {
        5: '5',
      },
      backgroundImage: {
        'logo-colour': "url('src/assets/svg/logo-colour.svg')",
      },
    },
  },
  plugins: [],
};
