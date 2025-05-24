import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			// Booki Custom Colors
  			primary: {
  				DEFAULT: '#00D4AA',
  				dark: '#00B894',
  				light: '#55E5D1',
  				foreground: '#FFFFFF'
  			},
  			secondary: {
  				DEFAULT: '#FF6B6B',
  				foreground: '#FFFFFF'
  			},
  			accent: {
  				DEFAULT: '#FFD93D',
  				foreground: '#2D3436'
  			},
  			// Sport specific colors
  			sport: {
  				padel: '#00D4AA',
  				football: '#00B894',
  				tennis: '#FF6B6B',
  				basketball: '#FFD93D',
  			},
  			// Semantic colors
  			dark: '#2D3436',
  			gray: '#636E72',
  			'light-gray': '#DDD',
  			success: '#00B894',
  			warning: '#FDCB6E',
  			error: '#E17055',
  			info: '#74B9FF',
  			// Standard Shadcn colors
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			sans: ['Inter', 'sans-serif'],
  			heading: ['Poppins', 'sans-serif'],
  			accent: ['Nunito Sans', 'sans-serif'],
  		},
  		spacing: {
  			'18': '4.5rem',
  			'88': '22rem',
  		},
  		animation: {
  			'fade-in': 'fadeIn 0.3s ease-out',
  			'slide-up': 'slideUp 0.3s ease-out',
  			'bounce-subtle': 'bounceSubtle 0.5s ease-out',
  		},
  		keyframes: {
  			fadeIn: {
  				'0%': { opacity: '0' },
  				'100%': { opacity: '1' }
  			},
  			slideUp: {
  				'0%': { transform: 'translateY(10px)', opacity: '0' },
  				'100%': { transform: 'translateY(0)', opacity: '1' }
  			},
  			bounceSubtle: {
  				'0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
  				'40%': { transform: 'translateY(-5px)' },
  				'60%': { transform: 'translateY(-2px)' }
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
