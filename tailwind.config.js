/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			container: {
				center: true,
				padding: 20,
			},
		},
	},
	plugins: [require('@tailwindcss/line-clamp')],
};
