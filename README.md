# 🏆 Booki - Réservation de Terrains de Sport à Dakar

La plateforme #1 pour réserver des terrains de sport à Dakar. Padel, Football, Tennis, Basketball - Réservez en 3 clics !

## 🎯 Vision & Mission

**Booki** simplifie la réservation de terrains de sport pour les jeunes de 15-35 ans à Dakar. Notre mission est de rendre le sport accessible à tous avec une expérience moderne, énergique et locale.

### Objectifs UX ✅
- ✅ Réservation en moins de 3 clics
- ✅ Interface intuitive sans apprentissage
- ✅ Expérience mobile-first
- ✅ Design moderne et énergique
- 🔄 Gamification légère (en cours)

## 🎨 Design System

### Palette de Couleurs
- **Primary**: #00D4AA (Vert turquoise vibrant)
- **Primary Dark**: #00B894 (Vert foncé pour hover)
- **Secondary**: #FF6B6B (Rouge corail pour accents)
- **Accent**: #FFD93D (Jaune doré pour notifications)

### Typographie
- **Headings**: Poppins (400, 500, 600, 700, 800)
- **Body**: Inter (300, 400, 500, 600)
- **Accents**: Nunito Sans (600, 700, 800)

### Iconographie
- **Font Awesome 6** pour toutes les icônes
- Style moderne et cohérent

## ✅ Fonctionnalités Implémentées

### Phase 1: Setup & Foundation ✅
- ✅ Projet Next.js 15 avec TypeScript
- ✅ Configuration Shadcn/ui et Tailwind CSS
- ✅ Configuration Font Awesome et icônes
- ✅ Structure des dossiers et architecture
- ✅ Design System personnalisé Booki

### Phase 2: Composants UI ✅
- ✅ Header dynamique avec salutation personnalisée
- ✅ Bottom Navigation avec 5 onglets
- ✅ SportCard pour sélection des sports
- ✅ TerrainCard avec images Unsplash
- ✅ Système de couleurs et animations

### Interface Actuelle ✅
- ✅ Page d'accueil complète et moderne
- ✅ Section "Sports Populaires" interactive
- ✅ Section "Réservations Flash" avec countdown
- ✅ Section "Près de chez vous" avec terrains
- ✅ Call-to-action attractif
- ✅ Navigation responsive

## 🛠️ Stack Technique

```json
{
  "framework": "Next.js 15 (App Router)",
  "ui": "Shadcn/ui + Tailwind CSS",
  "icons": "Font Awesome 6",
  "images": "Unsplash API + Next.js Image",
  "animations": "CSS Transitions + Keyframes",
  "state": "React Hooks (useState)",
  "forms": "React Hook Form + Zod (à venir)",
  "maps": "Mapbox/Google Maps (à venir)"
}
```

## 🚀 Installation & Setup

### 1. Installation des dépendances
```bash
npm install
```

### 2. Configuration des variables d'environnement
Créez un fichier `.env.local` avec:
```env
# Unsplash API (optionnel pour les images)
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_unsplash_access_key
```

### 3. Lancement du serveur de développement
```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📱 Structure du Projet

```
booki/
├── src/
│   ├── app/                     # Pages Next.js App Router
│   │   ├── globals.css         # Styles globaux + variables CSS
│   │   ├── layout.tsx          # Layout principal
│   │   └── page.tsx            # Page d'accueil
│   ├── components/
│   │   ├── ui/                 # Composants Shadcn/ui
│   │   ├── layout/             # Composants de mise en page
│   │   │   ├── header.tsx      # Header avec recherche
│   │   │   └── bottom-nav.tsx  # Navigation mobile
│   │   └── features/           # Composants métier
│   │       ├── search/
│   │       │   └── sport-card.tsx
│   │       ├── terrain/
│   │       │   └── terrain-card.tsx
│   │       ├── booking/        # À venir
│   │       └── profile/        # À venir
│   ├── lib/
│   │   ├── utils.ts           # Utilitaires Shadcn
│   │   ├── fontawesome.ts     # Configuration Font Awesome
│   │   └── unsplash.ts        # Intégration Unsplash
│   ├── types/
│   │   └── index.ts           # Types TypeScript
│   └── hooks/                 # Hooks personnalisés (à venir)
```

## 🎨 Composants Développés

### Layout Components
- **Header**: Salutation dynamique + météo + notifications + recherche
- **BottomNavigation**: 5 onglets avec animations et états actifs

### Feature Components
- **SportCard**: Sélection de sport avec icônes FA et animations
- **TerrainCard**: Card complexe avec images, favoris, prix, réservation

### UI Features
- ✅ Animations CSS personnalisées (fade-in, slide-up, bounce-subtle)
- ✅ Hover effects et transitions fluides
- ✅ États loading et fallbacks d'images
- ✅ Design responsive mobile-first
- ✅ Accessibilité de base

## 🔄 Prochaines Étapes

### Phase 3: Authentification & Pages (À venir)
- [ ] Pages login/register avec validation Zod
- [ ] Onboarding carousel avec images Dakar
- [ ] Middleware d'authentification
- [ ] Gestion des sessions utilisateur

### Phase 4: Recherche & Filtres (À venir)
- [ ] Page de recherche avancée
- [ ] Filtres par sport, prix, distance
- [ ] Intégration carte interactive (Mapbox)
- [ ] Géolocalisation utilisateur

### Phase 5: Booking Flow (À venir)
- [ ] Calendrier de disponibilité
- [ ] Sélection de créneaux horaires
- [ ] Processus de réservation en 3 étapes
- [ ] Intégration paiement mobile (Orange Money, Wave)

### Phase 6: Profile & Social (À venir)
- [ ] Profil utilisateur complet
- [ ] Historique des réservations
- [ ] Système de favoris
- [ ] Avis et ratings

## 🧩 Personnalisation

### Couleurs
Modifiez les couleurs dans `tailwind.config.ts`:
```typescript
primary: {
  DEFAULT: '#00D4AA',  // Votre couleur principale
  dark: '#00B894',     // Version foncée
},
```

### Fonts
Ajoutez des fonts dans `src/app/globals.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=VotreFontPerso:wght@400;600&display=swap');
```

## 🐛 Debugging & Développement

### Logs utiles
- Font Awesome: Vérifiez que les icônes sont bien importées dans `lib/fontawesome.ts`
- Images: Les fallbacks Unsplash sont configurés dans `lib/unsplash.ts`
- Styles: Variables CSS dans `app/globals.css`

### Tests
```bash
npm run build    # Test de build
npm run lint     # Vérification ESLint
```

## 📈 Métriques & Performance

### Objectifs de Performance
- ⚡ First Contentful Paint < 1.5s
- ⚡ Largest Contentful Paint < 2.5s
- ⚡ Cumulative Layout Shift < 0.1
- 📱 Mobile-first responsive design

### SEO & Accessibilité
- ✅ Métadonnées optimisées
- ✅ Structure sémantique HTML
- ✅ Alt text pour toutes les images
- ✅ Contraste de couleurs conforme
- ✅ Navigation au clavier

## 🤝 Contribution

1. Fork le projet
2. Créez votre branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 License

Ce projet est sous licence MIT. Voir `LICENSE` pour plus d'informations.

---

**Développé avec ❤️ pour la communauté sportive de Dakar**

### 🏆 Statut du Projet: Phase 1 & 2 Complétées ✅

La base de l'application est opérationnelle avec un design moderne et des composants réutilisables. Ready pour les phases suivantes !
