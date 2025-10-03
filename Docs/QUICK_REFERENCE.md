# 🎯 Quick Reference Guide

## Essential Commands

### Development
\`\`\`bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
\`\`\`

### Adding Shadcn/ui Components
\`\`\`bash
npx shadcn@latest add [component-name]
\`\`\`

Examples:
\`\`\`bash
npx shadcn@latest add card
npx shadcn@latest add tabs
npx shadcn@latest add select
\`\`\`

## 📁 Key Files

| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Main Discord interface |
| `src/app/layout.tsx` | Root layout with dark mode |
| `src/app/globals.css` | Global styles & CSS variables |
| `src/components/layout/*` | Main layout components |
| `src/components/ui/*` | Shadcn/ui components |
| `src/lib/constants.ts` | Design system constants |
| `src/types/index.ts` | TypeScript types |

## 🎨 Design Tokens

### Spacing Scale (base: 4px)
\`\`\`
0  →  0px    gap-0, p-0, m-0
1  →  4px    gap-1, p-1, m-1
2  →  8px    gap-2, p-2, m-2
3  →  12px   gap-3, p-3, m-3
4  →  16px   gap-4, p-4, m-4
6  →  24px   gap-6, p-6, m-6
8  →  32px   gap-8, p-8, m-8
\`\`\`

### Typography
\`\`\`
text-xs    12px   Timestamps, metadata
text-sm    14px   UI text, labels
text-base  16px   Body text, messages
text-lg    18px   Headings
text-xl    20px   Section titles
text-2xl   24px   Page titles
\`\`\`

### Font Weights
\`\`\`
font-normal    400   Body text
font-medium    500   UI elements
font-semibold  600   Emphasized text
font-bold      700   Headings
\`\`\`

### Colors (CSS Variables)
\`\`\`css
bg-background       Main background
bg-foreground       Text color
bg-card            Card background
bg-muted           Secondary background
bg-primary         Primary action color
bg-accent          Accent color
border-border       Border color
\`\`\`

### Layout Dimensions
\`\`\`
Server Sidebar:   72px   (w-[72px])
Channel Sidebar:  240px  (w-[240px])
Members Sidebar:  240px  (w-[240px])
Header:          60px   (h-[60px])
User Bar:        52px   (h-[52px])
\`\`\`

## 🔧 Common Patterns

### Creating a New Component
\`\`\`typescript
"use client"; // If using React hooks

import { ComponentName } from "@/components/ui/component";

interface MyComponentProps {
  title: string;
  children: React.ReactNode;
}

export function MyComponent({ title, children }: MyComponentProps) {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </div>
  );
}
\`\`\`

### Button Variants
\`\`\`typescript
<Button variant="default">Default</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
\`\`\`

### Button Sizes
\`\`\`typescript
<Button size="sm">Small</Button>      // 32px
<Button size="default">Default</Button> // 40px
<Button size="lg">Large</Button>      // 44px
<Button size="icon">Icon</Button>     // Square
\`\`\`

### Responsive Design
\`\`\`typescript
// Hide on mobile, show on tablet+
<div className="hidden md:flex">...</div>

// Full width on mobile, fixed on desktop
<div className="w-full lg:w-[240px]">...</div>

// Stack on mobile, row on desktop
<div className="flex flex-col lg:flex-row">...</div>
\`\`\`

### Theme-Aware Styling
\`\`\`typescript
// Automatically adapts to light/dark mode
<div className="bg-background text-foreground">
  <p className="text-muted-foreground">Secondary text</p>
</div>
\`\`\`

## 🎯 Common Tasks

### Add a New Channel
1. Open `src/components/layout/ChannelSidebar.tsx`
2. Add to `textChannels` or `voiceChannels` array
3. Component updates automatically

### Add a New Message
1. Open `src/components/layout/ChatArea.tsx`
2. Add to `messages` array
3. Follow the `MessageType` interface

### Add a New Server
1. Open `src/components/layout/ServerSidebar.tsx`
2. Add to `servers` array
3. Follow the `Server` interface

### Change Theme Colors
1. Open `src/app/globals.css`
2. Modify CSS variables in `:root` (light) or `.dark` (dark)
3. Changes apply automatically

### Add a New Shadcn Component
\`\`\`bash
npx shadcn@latest add [component]
# Import and use in your component
\`\`\`

## 🐛 Troubleshooting

### Development Server Won't Start
\`\`\`bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
\`\`\`

### TypeScript Errors
\`\`\`bash
# Check for type errors
npx tsc --noEmit
\`\`\`

### Styling Not Updating
\`\`\`bash
# Clear Next.js cache
rm -rf .next
npm run dev
\`\`\`

### Port Already in Use
\`\`\`bash
# Use a different port
npm run dev -- -p 3001
\`\`\`

## 📊 File Sizes

| Category | Count |
|----------|-------|
| Layout Components | 4 |
| Custom Components | 2 |
| Shadcn/ui Components | 8 |
| Type Definitions | 5 |
| Documentation Files | 5 |

## 🔗 Important Links

- **Documentation**: See README.md
- **Design System**: See DESIGN_SYSTEM.md
- **Contributing**: See CONTRIBUTING.md
- **Project Summary**: See PROJECT_SUMMARY.md

## 💡 Tips

1. **Use CSS Variables**: Always use `bg-background`, `text-foreground`, etc.
2. **Follow Spacing Scale**: Stick to 4px increments
3. **Maintain Golden Ratio**: Keep proportions consistent
4. **Add Types**: Always type your components and props
5. **Test Both Themes**: Check light and dark modes
6. **Use Tooltips**: Add tooltips for better UX
7. **Keep It Simple**: Follow the minimalist aesthetic

## 🎓 Learning Path

1. **Start**: Understand the file structure
2. **Explore**: Check out existing components
3. **Modify**: Make small changes to existing components
4. **Create**: Build new components following patterns
5. **Enhance**: Add new features and improvements

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## ⚡ Performance Tips

1. Use `"use client"` only when needed
2. Optimize images with Next.js Image component
3. Lazy load components when appropriate
4. Keep bundle size small
5. Use React.memo() for expensive components

---

**Quick access guide for Syncord development** 🚀

Keep this handy for day-to-day development!
