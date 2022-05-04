module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'logo-colour': "url('src/assets/svg/logo-colour.svg')",
        'menu-icon': "url('src/assets/icons/menu.svg')",
        'header-image': "url('src/assets/images/marque-white.png')",
        'gradient-iati': 'linear-gradient(0deg, #124555 4%, #155366 20%)',
      },
      backgroundSize: { '70%': '70%' },
      colors: {
        'gray-7': '#121212',
        primary: '#81c3d6',
      },
      fontFamily: {
        sans: ['Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      transitionDuration: {
        2000: '2000ms',
      },
      transitionProperty: {
        height: 'height',
      },
      zIndex: {
        5: '5',
      },
    },
  },
  plugins: [],
};
