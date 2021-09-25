module.exports = {
	purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	mode: "jit",
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				primary: "#191932",
				soft: "#F9FAFE",
			},
			boxShadow: {
				blues: "0px 16px 40px 0px rgba(112, 144, 176, 0.25)",
			},
			animation: {
				"spin-slow": "spin 2s linear infinite",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
