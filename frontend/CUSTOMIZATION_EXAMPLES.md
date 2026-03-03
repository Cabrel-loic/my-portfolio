# Premium Hero - Customization Examples

Quick examples to customize your hero section. Copy and modify these snippets!

## 🎨 Change Color Theme

### Option 1: Green/Emerald Tech Theme

**File:** `components/hero/PremiumHero.tsx`

Find and replace:
```tsx
// BEFORE (Cyan/Purple)
<button className="... from-cyan-500 to-blue-500 ...">

// AFTER (Green/Emerald)
<button className="... from-emerald-500 to-teal-500 ...">
```

Update all occurrences:
```tsx
// Find: cyan-500 → Replace with: emerald-500
// Find: cyan-400 → Replace with: emerald-400
// Find: cyan-950 → Replace with: emerald-950
// Find: blue-500 → Replace with: teal-500
// Find: blue-400 → Replace with: teal-400
// Find: purple-500 → Replace with: green-500
```

### Option 2: Red/Orange Fire Theme

```tsx
// Primary color changes
cyan-500 → red-500
cyan-400 → red-400
purple-500 → orange-500
blue-500 → orange-600
```

### Option 3: Blue/Cyan Professional

```tsx
// This is the current default
// To make it more blue:
cyan-500 → blue-500
cyan-400 → blue-400
cyan-950 → blue-950
purple-500 → indigo-500
```

---

## ✏️ Change Text Content

### Update Hero Badge

**File:** `components/hero/PremiumHero.tsx`, around line 185

```tsx
// CURRENT
<p className="text-sm font-semibold text-cyan-400 flex items-center gap-2">
  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
  Available for Projects
</p>

// CHANGE TO
<p className="text-sm font-semibold text-cyan-400 flex items-center gap-2">
  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
  Open for Collaborations
</p>
```

### Update Intro Text

**File:** `components/hero/PremiumHero.tsx`, around line 197

```tsx
// CURRENT
<h2 className="text-lg sm:text-xl text-gray-400">
  Hi, I build intelligent digital systems
</h2>

// CHANGE TO
<h2 className="text-lg sm:text-xl text-gray-400">
  Welcome to my digital creative space
</h2>
```

### Change Typing Words

**File:** `components/hero/PremiumHero.tsx`, around line 220

```tsx
// CURRENT
const typingWords = [
  "Full-Stack Developer",
  "AI/ML Engineer",
  "Tech Architect",
];

// CHANGE TO - Option A: Designer Focus
const typingWords = [
  "UI/UX Designer",
  "Brand Strategist",
  "Creative Technologist",
];

// CHANGE TO - Option B: Frontend Focus
const typingWords = [
  "React Developer",
  "Web Designer",
  "User Experience Engineer",
];

// CHANGE TO - Option C: Freelancer
const typingWords = [
  "Freelance Developer",
  "Code Craftsman",
  "Digital Creator",
];
```

### Update Subtext

**File:** `components/hero/PremiumHero.tsx`, around line 235

```tsx
// CURRENT
<p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-lg">
  I design scalable <span className="text-cyan-400 font-semibold">AI-driven applications</span> and
  <span className="text-purple-400 font-semibold"> high-performance web platforms</span> that solve real problems.
</p>

// CHANGE TO - Designer Version
<p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-lg">
  I create <span className="text-cyan-400 font-semibold">beautiful, intuitive designs</span> paired with
  <span className="text-purple-400 font-semibold"> robust technical solutions</span> that inspire.
</p>

// CHANGE TO - Entrepreneur Version
<p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-lg">
  I build <span className="text-cyan-400 font-semibold">SaaS products</span> and help founders launch
  <span className="text-purple-400 font-semibold"> innovative digital ventures</span> that scale.
</p>
```

### Update Stats Section

**File:** `components/hero/PremiumHero.tsx`, around line 305

```tsx
// CURRENT
<div className="flex items-center gap-8 pt-4 text-sm text-gray-400 border-t border-cyan-500/10 mt-8 pt-8">
  <div>
    <p className="text-cyan-400 text-lg font-bold">5+</p>
    <p>Years Experience</p>
  </div>
  <div>
    <p className="text-cyan-400 text-lg font-bold">30+</p>
    <p>Projects Delivered</p>
  </div>
  <div>
    <p className="text-cyan-400 text-lg font-bold">15+</p>
    <p>Happy Clients</p>
  </div>
</div>

// CHANGE TO - Your Stats
<div className="flex items-center gap-8 pt-4 text-sm text-gray-400 border-t border-cyan-500/10 mt-8 pt-8">
  <div>
    <p className="text-cyan-400 text-lg font-bold">3+</p>
    <p>Years Experience</p>
  </div>
  <div>
    <p className="text-cyan-400 text-lg font-bold">50+</p>
    <p>Designs Created</p>
  </div>
  <div>
    <p className="text-cyan-400 text-lg font-bold">20+</p>
    <p>Satisfied Clients</p>
  </div>
</div>
```

### Update Tech Icons

**File:** `components/hero/PremiumHero.tsx`, around line 380

```tsx
// CURRENT
<TechIcon name="AI/ML" icon="🤖" />
<TechIcon name="Web Dev" icon="⚡" />
<TechIcon name="Cloud" icon="☁️" />
<TechIcon name="APIs" icon="🔗" />

// CHANGE TO - Design Focus
<TechIcon name="Figma" icon="✨" />
<TechIcon name="Branding" icon="🎨" />
<TechIcon name="Animation" icon="🎬" />
<TechIcon name="UX/UI" icon="💎" />

// CHANGE TO - DevOps Focus
<TechIcon name="Docker" icon="🐳" />
<TechIcon name="Kubernetes" icon="⚙️" />
<TechIcon name="CI/CD" icon="🔄" />
<TechIcon name="AWS" icon="☁️" />
```

---

## 🎬 Change Animation Speeds

### Slow Down Typing

**File:** `components/hero/PremiumHero.tsx`, around line 250

```tsx
// CURRENT
<TypingEffect
  words={typingWords}
  className="block font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent"
  speed={80}
  deleteSpeed={40}
  delayBetweenWords={2000}
/>

// SLOWER VERSION
<TypingEffect
  words={typingWords}
  className="block font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent"
  speed={150}          // Slower typing
  deleteSpeed={80}     // Slower deletion
  delayBetweenWords={3000}  // Longer pause
/>

// FASTER VERSION
<TypingEffect
  words={typingWords}
  className="block font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent"
  speed={50}          // Faster typing
  deleteSpeed={25}    // Faster deletion
  delayBetweenWords={1500}  // Shorter pause
/>
```

### Adjust Neural Network Speed

**File:** `components/hero/NeuralNetwork.tsx`, around line 40

```tsx
// CURRENT - Moderate speed
const CONNECTION_DISTANCE = 180;
node.vx += (Math.random() - 0.5) * 0.2;

// FASTER/MORE ACTIVE
const CONNECTION_DISTANCE = 200;  // Larger connection area
node.vx += (Math.random() - 0.5) * 0.4;  // More movement

// SLOWER/MORE CALM
const CONNECTION_DISTANCE = 150;  // Smaller connection area
node.vx += (Math.random() - 0.5) * 0.1;  // Less movement
```

### Change Particle Rise Speed

**File:** `components/hero/DataStreams.tsx`, around line 55

```tsx
// CURRENT
@keyframes particle-rise {
  // Duration controlled by --duration variable (4-8s)
}

// FASTER
animation: particle-rise 2s ease-out infinite;  // 2 seconds

// SLOWER
animation: particle-rise 6s ease-out infinite;  // 6 seconds
```

---

## 🔘 Change Button Behavior

### Make Buttons Open External Links

**File:** `components/hero/PremiumHero.tsx`, around line 245

```tsx
// CURRENT - Scrolls to section
<button
  className="... from-cyan-500 to-blue-500 ...">
  Hire Me
</button>

// CHANGE TO - Open Email/Link
<a
  href="mailto:your.email@example.com"
  target="_blank"
  rel="noopener noreferrer"
  className="group relative px-8 py-4 rounded-full font-semibold text-lg text-white overflow-hidden transition-all duration-300 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 block text-center"
>
  Hire Me
  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform inline-block ml-2" />
</a>

// CHANGE TO - Open Calendly/Booking
<a
  href="https://calendly.com/yourname/meeting"
  target="_blank"
  rel="noopener noreferrer"
  className="group relative px-8 py-4 rounded-full font-semibold text-lg text-white overflow-hidden transition-all duration-300 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 block text-center"
>
  Schedule a Call
</a>
```

---

## 📋 Change Hero Title in Browser Tab

**File:** `app/layout.tsx`, around line 19

```tsx
// CURRENT
export const metadata: Metadata = {
  title: "Full-Stack Web Developer & Graphic Designer | Portfolio",
  description: "...",
};

// CHANGE TO
export const metadata: Metadata = {
  title: "Code With Cabrel | AI & Full-Stack Developer",
  description: "Premium AI-driven applications and high-performance web platforms.",
};
```

---

## 🎯 Modify Hero Section ID for Scroll

**File:** `components/hero/PremiumHero.tsx`, line 88

```tsx
// ADD THIS AT THE TOP of the <section> tag:
<section
  id="home"  // Add this line so it can be scrolled to
  className="relative w-full min-h-screen overflow-hidden bg-black/95"
>
```

---

## 🔍 Hide/Show Specific Elements

### Hide Right Side Tech Stack (Mobile-Friendly)

**File:** `components/hero/PremiumHero.tsx`, around line 350

```tsx
// CURRENT
<div className="hidden lg:flex flex-col ...">

// CHANGE TO - Show on all devices
<div className="flex flex-col ...">

// OR - Hide completely
<div className="hidden flex-col ...">
```

### Hide Scroll Indicator

**File:** `components/hero/PremiumHero.tsx`, around line 425

```tsx
// CURRENT
<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-scroll-down">

// CHANGE TO - Hide
<div className="hidden absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-scroll-down">
```

---

## 🌈 Add More Typing Words

**File:** `components/hero/PremiumHero.tsx`, around line 220

```tsx
// CURRENT (3 words)
const typingWords = [
  "Full-Stack Developer",
  "AI/ML Engineer",
  "Tech Architect",
];

// EXPANDED (6 words)
const typingWords = [
  "Full-Stack Developer",
  "AI/ML Engineer",
  "Tech Architect",
  "Solutions Designer",
  "Innovation Leader",
  "Code Craftsman",
];
```

---

## 🚀 Performance Tweaks

### Reduce Particle Count (Mobile Performance)

**File:** `components/hero/ParticleSystem.tsx`, around line 35

```tsx
// CURRENT
const particleCount = Math.random() < 0.5 ? 1 : 2;

// LESS PARTICLES (FASTER)
const particleCount = Math.random() < 0.3 ? 1 : 0;

// MORE PARTICLES (HEAVIER)
const particleCount = Math.random() < 0.7 ? 2 : 3;
```

### Reduce Neural Network Nodes

**File:** `components/hero/NeuralNetwork.tsx`, around line 25

```tsx
// CURRENT
const NODE_COUNT = 12;

// FEWER NODES (FASTER)
const NODE_COUNT = 8;

// MORE NODES (HEAVIER)
const NODE_COUNT = 16;
```

---

## 💡 Pro Tips

1. **Test each change** - Make one change, reload, verify
2. **Use browser DevTools** - Inspect elements to find exact lines
3. **Keep backups** - Copy original before major changes
4. **Check mobile** - Test changes on mobile devices
5. **Monitor performance** - Use Chrome DevTools Performance tab

---

**More customization examples coming soon!** 🎨

Check `components/hero/README.md` for advanced customization guides.
