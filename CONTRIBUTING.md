# Contributing to Portfolio Website

First off, thank you for considering contributing to this project! 🎉

It's people like you that make this portfolio template better for everyone. We welcome contributions from developers of all skill levels.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Community](#community)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [satyasubudhi089@gmail.com](mailto:satyasubudhi089@gmail.com).

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check the [existing issues](https://github.com/satya00089/portfolio/issues) to avoid duplicates.

When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** (code snippets, screenshots)
- **Describe the behavior you observed** and what you expected
- **Include your environment details** (OS, browser, Node version)

**Bug Report Template:**

```markdown
**Description:**
A clear description of the bug.

**Steps to Reproduce:**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior:**
What you expected to happen.

**Actual Behavior:**
What actually happened.

**Screenshots:**
If applicable, add screenshots.

**Environment:**
- OS: [e.g., Windows 11, macOS 13]
- Browser: [e.g., Chrome 120, Firefox 121]
- Node Version: [e.g., 18.17.0]
```

### 💡 Suggesting Enhancements

Enhancement suggestions are tracked as [GitHub issues](https://github.com/satya00089/portfolio/issues).

When suggesting an enhancement:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the suggested enhancement
- **Explain why this enhancement would be useful**
- **List examples** of how it would be used
- **Include mockups or examples** if applicable

### 🎨 Design Improvements

We welcome design suggestions! If you have ideas for:
- UI/UX improvements
- Accessibility enhancements
- Responsive design fixes
- Animation improvements

Please open an issue with mockups or detailed descriptions.

### 📝 Documentation

Improvements to documentation are always welcome:
- Fix typos or unclear instructions
- Add examples or tutorials
- Improve README or Wiki
- Add code comments

### 🚀 Code Contributions

Want to write code? Great! Here's how:

1. Look for issues labeled `good first issue` or `help wanted`
2. Comment on the issue to let others know you're working on it
3. Fork the repo and create a branch
4. Make your changes
5. Submit a pull request

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git
- A code editor (VS Code recommended)

### Fork and Clone

1. **Fork the repository** on GitHub
2. **Clone your fork locally:**

```bash
git clone https://github.com/YOUR-USERNAME/portfolio.git
cd portfolio
```

3. **Add upstream remote:**

```bash
git remote add upstream https://github.com/satya00089/portfolio.git
```

4. **Install dependencies:**

```bash
npm install
```

5. **Start development server:**

```bash
npm run dev
```

## Development Workflow

### 1. Create a Branch

Always create a new branch for your work:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `style/` - Code style changes (formatting)
- `refactor/` - Code refactoring
- `test/` - Adding tests
- `chore/` - Maintenance tasks

### 2. Make Your Changes

- Write clean, readable code
- Follow the project's coding style
- Add comments where necessary
- Update documentation if needed
- Test your changes thoroughly

### 3. Test Your Changes

```bash
# Run linter
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

### 4. Commit Your Changes

Follow our [commit message guidelines](#commit-message-guidelines):

```bash
git add .
git commit -m "feat: add new skill visualization component"
```

### 5. Keep Your Branch Updated

```bash
git fetch upstream
git rebase upstream/main
```

### 6. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

## Pull Request Process

### Before Submitting

- ✅ Code follows the style guidelines
- ✅ Self-review of your code completed
- ✅ Comments added for complex code
- ✅ Documentation updated if needed
- ✅ No new warnings or errors
- ✅ Changes tested locally
- ✅ Commit messages follow guidelines

### Submitting a Pull Request

1. **Go to the original repository** on GitHub
2. **Click "New Pull Request"**
3. **Select your fork and branch**
4. **Fill out the PR template:**

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix (non-breaking change)
- [ ] New feature (non-breaking change)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## How Has This Been Tested?
Describe your testing process

## Screenshots (if applicable)
Add screenshots to demonstrate the changes

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where necessary
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have tested my changes
```

5. **Submit the pull request**

### After Submitting

- Respond to feedback promptly
- Make requested changes
- Push updates to the same branch
- Be patient - reviews may take time

### PR Review Process

1. Maintainers will review your PR
2. Feedback may be provided
3. Make necessary changes
4. Once approved, your PR will be merged! 🎉

## Style Guidelines

### TypeScript/React

- Use **TypeScript** for type safety
- Use **functional components** with hooks
- Follow **React best practices**
- Use **meaningful variable names**
- Keep components **small and focused**

**Example:**

```typescript
// ✅ Good
interface SkillCircleProps {
  skillName: string;
  proficiency: number;
  category: string;
}

export const SkillCircle: React.FC<SkillCircleProps> = ({ 
  skillName, 
  proficiency, 
  category 
}) => {
  return (
    <div className="skill-circle">
      {/* Component content */}
    </div>
  );
};

// ❌ Avoid
export const SkillCircle = (props: any) => {
  return <div>{props.n}</div>;
};
```

### CSS/Tailwind

- Use **Tailwind utility classes** primarily
- Follow **mobile-first** approach
- Use **consistent spacing** (4, 8, 12, 16, etc.)
- Group related classes together

**Example:**

```tsx
// ✅ Good
<div className="flex flex-col items-center justify-center gap-4 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">

// ❌ Avoid
<div className="flex bg-white p-6 flex-col rounded-lg items-center gap-4 shadow-lg dark:bg-gray-900 justify-center">
```

### File Organization

- Keep related files together
- Use clear, descriptive filenames
- Follow existing folder structure

```
components/
  ├── shared/          # Shared components
  ├── resume/          # Resume-specific
  └── ComponentName.tsx
```

### Import Order

1. External libraries
2. Internal components
3. Types/Interfaces
4. Styles
5. Assets

```typescript
// ✅ Good
import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { Header } from './components/shared/Header';
import { SkillCircle } from './components/SkillCircle';

import type { Skill, Project } from './types';

import './App.css';
```

## Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes

### Examples

```bash
# Feature
git commit -m "feat(skills): add circular progress animation"

# Bug fix
git commit -m "fix(header): resolve mobile menu toggle issue"

# Documentation
git commit -m "docs(readme): update installation instructions"

# Style
git commit -m "style(components): format code with prettier"

# Refactor
git commit -m "refactor(portfolio): extract project modal logic"
```

### Rules

- Use **present tense** ("add feature" not "added feature")
- Use **imperative mood** ("move cursor" not "moves cursor")
- Keep subject line **under 72 characters**
- Reference issues: `fix(auth): resolve login error (closes #123)`

## Community

### Getting Help

- 📖 Read the [README](README.md) and [Wiki](WIKI.md)
- 🔍 Search [existing issues](https://github.com/satya00089/portfolio/issues)
- 💬 Ask questions in [Discussions](https://github.com/satya00089/portfolio/discussions)
- 📧 Email: [satyasubudhi089@gmail.com](mailto:satyasubudhi089@gmail.com)

### Recognition

Contributors will be recognized in:
- README contributors section
- Release notes
- Project acknowledgments

## Questions?

Don't hesitate to ask! We're here to help:

- **Open an issue** for bugs or feature requests
- **Start a discussion** for questions or ideas
- **Contact the maintainer** directly if needed

---

Thank you for contributing! 🙏

**Happy Coding! 💻✨**
