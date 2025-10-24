# Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. Features an interactive project showcase, skills visualization, CLI-style resume, and smooth animations.

🔗 **Live Demo**: [https://satya00089.github.io/portfolio](https://satya00089.github.io/portfolio)

## ✨ Features

- **Interactive Portfolio**: Showcase your projects with modal views and detailed descriptions
- **Dynamic Resume**: Interactive resume page with print functionality
- **CLI Resume**: Terminal-style resume interface for a unique user experience
- **Skills Visualization**: Circular progress bars and interactive skill displays
- **Theme Support**: Dark/Light theme toggle with smooth transitions
- **Smooth Animations**: Powered by Framer Motion for engaging UI interactions
- **Markdown Support**: Project descriptions rendered with GitHub-flavored markdown
- **Contact Form**: Interactive contact form for visitor inquiries
- **Responsive Design**: Fully responsive across all device sizes
- **Scroll Enhancements**: Progress bar and scroll-to-top functionality

## 🛠️ Tech Stack

### Core
- **React 19** - UI framework
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and dev server
- **React Router DOM** - Client-side routing

### Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **React Icons** - Additional icon sets

### Additional Libraries
- **React Markdown** - Markdown rendering
- **React Circular Progressbar** - Skill visualization
- **React Scroll** - Smooth scrolling functionality
- **GitHub Markdown CSS** - GitHub-style markdown styling

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── shared/         # Shared components (Header, Footer, etc.)
│   └── resume/         # Resume-specific components
├── pages/              # Page components
│   ├── PortfolioPage.tsx
│   └── ResumePage.tsx
├── config/             # Configuration files
│   └── portfolioData.ts
├── context/            # React contexts (Theme)
├── types/              # TypeScript type definitions
└── assets/             # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/satya00089/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

## 🎨 Customization

### Update Portfolio Data
Edit `src/config/portfolioData.ts` to customize:
- Personal information
- Projects
- Skills
- Experience
- Education

### Modify Theme
Theme configuration is managed through `src/context/ThemeContext.ts` and `src/components/ThemeProvider.tsx`.

### Styling
Tailwind configuration can be modified in `tailwind.config.js`.

## 🌐 Deployment

This project is configured for deployment to GitHub Pages:

1. Update the `homepage` field in `package.json` with your GitHub Pages URL
2. Update the `base` field in `vite.config.ts` to match your repository name
3. Run the deployment command:
```bash
npm run deploy
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Satya Subudhi**
- GitHub: [@satya00089](https://github.com/satya00089)
- Email: satyasubudhi089@gmail.com

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/satya00089/portfolio/issues).

---

Built with ❤️ using React + TypeScript + Vite
