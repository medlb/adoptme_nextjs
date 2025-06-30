import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
  	extend: {
  		colors: {
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
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
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
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
      'gentle-float': {
        '0%, 100%': {
          transform: 'translateY(0px) rotate(0deg)'
        },
        '50%': {
          transform: 'translateY(-20px) rotate(5deg)'
        }
      },
      'soft-bounce': {
        '0%, 20%, 50%, 80%, 100%': {
          transform: 'translateY(0) scale(1)'
        },
        '40%': {
          transform: 'translateY(-10px) scale(1.05)'
        },
        '60%': {
          transform: 'translateY(-5px) scale(1.02)'
        }
      },
      'smooth-wiggle': {
        '0%, 100%': {
          transform: 'rotate(0deg)'
        },
        '25%': {
          transform: 'rotate(3deg)'
        },
        '75%': {
          transform: 'rotate(-3deg)'
        }
      },
      'gradient-shift': {
        '0%, 100%': {
          backgroundPosition: '0% 50%'
        },
        '50%': {
          backgroundPosition: '100% 50%'
        }
      },
      'scale-pulse': {
        '0%, 100%': {
          transform: 'scale(1)'
        },
        '50%': {
          transform: 'scale(1.05)'
        }
      },
      'slide-in-up': {
        from: {
          opacity: '0',
          transform: 'translateY(30px)'
        },
        to: {
          opacity: '1',
          transform: 'translateY(0)'
        }
      },
      'slide-in-left': {
        from: {
          opacity: '0',
          transform: 'translateX(-30px)'
        },
        to: {
          opacity: '1',
          transform: 'translateX(0)'
        }
      },
      'slide-in-right': {
        from: {
          opacity: '0',
          transform: 'translateX(30px)'
        },
        to: {
          opacity: '1',
          transform: 'translateX(0)'
        }
      },
      'confetti-fall': {
        '0%': {
          transform: 'translateY(-100vh) rotate(0deg)',
          opacity: '1'
        },
        '100%': {
          transform: 'translateY(100vh) rotate(360deg)',
          opacity: '0'
        }
      },
      'sparkle': {
        '0%, 100%': {
          opacity: '0',
          transform: 'scale(0)'
        },
        '50%': {
          opacity: '1',
          transform: 'scale(1)'
        }
      },
      'bounce-fun': {
        '0%, 20%, 50%, 80%, 100%': {
          transform: 'translateY(0)'
        },
        '40%': {
          transform: 'translateY(-10px)'
        },
        '60%': {
          transform: 'translateY(-5px)'
        }
      },
      'float': {
        '0%, 100%': {
          transform: 'translateY(0px)'
        },
        '50%': {
          transform: 'translateY(-20px)'
        }
      },
      'wiggle': {
        '0%, 100%': {
          transform: 'rotate(0deg)'
        },
        '25%': {
          transform: 'rotate(5deg)'
        },
        '75%': {
          transform: 'rotate(-5deg)'
        }
      },
      'glow': {
        '0%, 100%': {
          boxShadow: '0 0 20px rgba(255, 107, 107, 0.5)'
        },
        '50%': {
          boxShadow: '0 0 40px rgba(255, 107, 107, 0.8)'
        }
      },
      'spin': {
        from: {
          transform: 'rotate(0deg)'
        },
        to: {
          transform: 'rotate(360deg)'
        }
      }
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
        'gentle-float': 'gentle-float 6s ease-in-out infinite',
        'soft-bounce': 'soft-bounce 2s ease-in-out infinite',
        'smooth-wiggle': 'smooth-wiggle 3s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 3s ease-in-out infinite',
        'scale-pulse': 'scale-pulse 2s ease-in-out infinite',
        'slide-in-up': 'slide-in-up 0.6s ease-out',
        'slide-in-left': 'slide-in-left 0.6s ease-out',
        'slide-in-right': 'slide-in-right 0.6s ease-out',
        'confetti': 'confetti-fall 3s linear infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
        'bounce-fun': 'bounce-fun 1s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'wiggle': 'wiggle 2s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'spin': 'spin 1s linear infinite'
  		},
      screens: {
        'xs': '475px'
      }
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
