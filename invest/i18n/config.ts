import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          nav: {
            home: 'Home',
            plans: 'Investment Plans',
            dashboard: 'Dashboard',
            about: 'About',
            contact: 'Contact',
            login: 'Login',
            signup: 'Sign Up',
          },
          hero: {
            title: 'Grow Your Wealth Smartly',
            subtitle: 'Intelligent investment plans tailored for your financial goals',
            cta: 'Start Investing',
            stats: 'Trusted by {{count}}+ investors worldwide',
          },
          plans: {
            title: 'Investment Plans',
            subtitle: 'Choose the perfect plan for your financial journey',
            basic: {
              name: 'Basic',
              price: '$1,000',
              period: '/month',
              features: [
                'Up to 8% annual return',
                'Monthly portfolio review',
                '24/7 Support',
                'Basic analytics',
              ],
              cta: 'Get Started',
            },
            pro: {
              name: 'Professional',
              price: '$5,000',
              period: '/month',
              features: [
                'Up to 15% annual return',
                'Weekly portfolio review',
                'Personal advisor',
                'Advanced analytics',
                'Tax optimization',
              ],
              cta: 'Go Pro',
              popular: 'Most Popular',
            },
            enterprise: {
              name: 'Enterprise',
              price: 'Custom',
              period: '',
              features: [
                'Custom return targets',
                'Daily portfolio review',
                'Dedicated team',
                'AI-powered insights',
                'Priority support',
                'Risk management',
              ],
              cta: 'Contact Sales',
            },
          },
          dashboard: {
            welcome: 'Welcome back,',
            portfolio: 'Portfolio Value',
            totalReturn: 'Total Return',
            activePlans: 'Active Plans',
            recentActivity: 'Recent Activity',
            investments: 'Investments',
            performance: 'Performance',
            withdraw: 'Withdraw',
            deposit: 'Deposit',
          },
        },
      },
      es: {
        translation: {
          nav: {
            home: 'Inicio',
            plans: 'Planes',
            dashboard: 'Panel',
            about: 'Acerca',
            contact: 'Contacto',
            login: 'Iniciar',
            signup: 'Registrarse',
          },
          hero: {
            title: 'Haz Crecer Tu Riqueza Inteligentemente',
            subtitle: 'Planes de inversión inteligentes adaptados a tus objetivos financieros',
            cta: 'Empezar a Invertir',
            stats: 'Confían en nosotros {{count}}+ inversores mundialmente',
          },
        },
      },
      fr: {
        translation: {
          nav: {
            home: 'Accueil',
            plans: 'Plans',
            dashboard: 'Tableau',
            about: 'À propos',
            contact: 'Contact',
            login: 'Connexion',
            signup: "S'inscrire",
          },
          hero: {
            title: 'Faites Croître Votre Richesse Intelligemment',
            subtitle: 'Plans d\'investissement intelligents adaptés à vos objectifs financiers',
            cta: 'Commencer à Investir',
            stats: 'Fait confiance par {{count}}+ investisseurs dans le monde',
          },
        },
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;