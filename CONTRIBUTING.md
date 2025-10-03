# Contributing to Syncord

Thank you for your interest in contributing to Syncord! This guide will help you get started.

## 🎯 Development Philosophy

We maintain high standards for:
- **Design Consistency**: Follow golden ratio and Swiss grid principles
- **Code Quality**: TypeScript, clean code, proper typing
- **User Experience**: Smooth animations, intuitive interactions
- **Accessibility**: WCAG AAA compliance where possible

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or later
- npm or yarn
- Git

### Setup
1. Fork the repository
2. Clone your fork:
   \`\`\`bash
   git clone https://github.com/YOUR_USERNAME/syncord-ui.git
   cd syncord-ui
   \`\`\`
3. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
4. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

## 📝 Development Workflow

### 1. Create a Branch
\`\`\`bash
git checkout -b feature/your-feature-name
\`\`\`

### 2. Make Changes
- Follow the existing code style
- Maintain design system consistency
- Add TypeScript types
- Test your changes

### 3. Commit Changes
Use conventional commits:
\`\`\`bash
git commit -m "feat: add new message reactions feature"
git commit -m "fix: resolve scroll issue in chat area"
git commit -m "docs: update README with new features"
\`\`\`

Commit types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

### 4. Push and Create PR
\`\`\`bash
git push origin feature/your-feature-name
\`\`\`

Then create a Pull Request on GitHub.

## 🎨 Design Guidelines

### Color System
- Stick to the monochrome palette
- Use CSS variables from `globals.css`
- Maintain high contrast ratios

### Spacing
- Use the defined spacing scale (4px base)
- Follow golden ratio proportions
- Maintain consistent padding/margins

### Typography
- Use Geist Sans for UI text
- Use Geist Mono for code
- Follow the type scale (xs, sm, base, lg, xl, 2xl)

### Components
- Create reusable components
- Use Shadcn/ui primitives when possible
- Add proper TypeScript types
- Include accessibility features

## 🧪 Code Standards

### TypeScript
\`\`\`typescript
// ✅ Good
interface MessageProps {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

// ❌ Bad
interface MessageProps {
  id: any;
  author;
  content;
}
\`\`\`

### Component Structure
\`\`\`typescript
"use client"; // If using hooks

import { Component } from "@/components/ui/component";

interface ComponentProps {
  // Props definition
}

export function Component({ prop1, prop2 }: ComponentProps) {
  // Component logic
  
  return (
    <div className="proper-styling">
      {/* JSX */}
    </div>
  );
}
\`\`\`

### Styling
\`\`\`typescript
// ✅ Good - Use Tailwind classes
<div className="flex items-center gap-2 p-4">

// ✅ Good - Use design tokens
<div className="h-[60px]"> // Golden ratio height

// ❌ Bad - Avoid inline styles
<div style={{ height: "60px" }}>

// ❌ Bad - Avoid arbitrary values without reason
<div className="mt-[13px]"> // Use scale instead
\`\`\`

## 🔍 Testing Guidelines

### Before Submitting
- [ ] Code compiles without errors
- [ ] No TypeScript errors
- [ ] No console warnings
- [ ] All interactive elements work
- [ ] Responsive design maintained
- [ ] Accessibility features intact
- [ ] Theme toggle works (light/dark)

### Manual Testing
1. Test on different screen sizes
2. Test keyboard navigation
3. Test with screen reader (if applicable)
4. Test hover states
5. Test click interactions

## 📋 Pull Request Checklist

- [ ] Branch is up to date with main
- [ ] Code follows style guidelines
- [ ] Design system consistency maintained
- [ ] TypeScript types added/updated
- [ ] No console errors or warnings
- [ ] Manual testing completed
- [ ] PR description is clear and detailed
- [ ] Screenshots/videos added (for UI changes)

## 🐛 Reporting Bugs

### Bug Report Template
\`\`\`markdown
**Describe the bug**
A clear description of the bug.

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g., Windows 11, macOS 14]
- Browser: [e.g., Chrome 120, Firefox 121]
- Node version: [e.g., 18.17.0]

**Additional context**
Any other relevant information.
\`\`\`

## 💡 Feature Requests

### Feature Request Template
\`\`\`markdown
**Feature Description**
Clear description of the feature.

**Use Case**
Why is this feature needed?

**Proposed Solution**
How should it work?

**Design Mockups**
If applicable, add mockups or sketches.

**Additional Context**
Any other relevant information.
\`\`\`

## 🎓 Learning Resources

### Design
- [Golden Ratio in UI Design](https://www.interaction-design.org/literature/article/the-golden-ratio-principles-of-form-and-layout)
- [Swiss Design Principles](https://www.smashingmagazine.com/2009/07/lessons-from-swiss-style-graphic-design/)

### Tech Stack
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn/ui Documentation](https://ui.shadcn.com/)

### Best Practices
- [React Best Practices](https://react.dev/learn)
- [Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)

## 🤝 Code Review Process

1. **Automated Checks**: CI/CD runs linting and type checks
2. **Design Review**: Maintainer checks design consistency
3. **Code Review**: Maintainer reviews code quality
4. **Testing**: Changes are tested manually
5. **Merge**: PR is merged to main branch

## 📞 Getting Help

- **Questions**: Open a [Discussion](https://github.com/Cryptk1ddo/syncord-ui/discussions)
- **Bugs**: Open an [Issue](https://github.com/Cryptk1ddo/syncord-ui/issues)
- **Chat**: Join our Discord community (coming soon)

## 🙏 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Credited in release notes
- Acknowledged in project README

## 📜 Code of Conduct

### Our Standards
- Be respectful and inclusive
- Welcome newcomers
- Accept constructive criticism
- Focus on what's best for the community
- Show empathy towards others

### Unacceptable Behavior
- Harassment or discriminatory language
- Trolling or insulting comments
- Public or private harassment
- Publishing others' private information
- Other unethical or unprofessional conduct

### Enforcement
Violations may result in:
1. Warning
2. Temporary ban
3. Permanent ban

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to Syncord!** 🎉

Your contributions help make this project better for everyone.
