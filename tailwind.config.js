module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-iati': 'linear-gradient(0deg, #124555 4%, #155366 20%)',
        'header-image': "url('src/assets/images/marque-white.png')",
        'logo-colour': "url('src/assets/svg/logo-colour.svg')",
        'logo-white': "url('src/assets/svg/logo-white.svg')",
        'menu-icon': "url('src/assets/icons/menu.svg')",
      },
      backgroundSize: { '70%': '70%' },
      colors: {
        'gray-7': '#121212',
        primary: '#81c3d6',
        secondary: '#155366',
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
