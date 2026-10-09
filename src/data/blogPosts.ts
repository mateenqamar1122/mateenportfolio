export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  featured: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: "scalable-saas-architecture",
    title: "Building Scalable SaaS Architecture with React & Supabase",
    excerpt:
      "Lessons learned from building Spikelance — handling multi-tenancy, real-time updates, and role-based access at scale.",
    content: `
## The Challenge

When I started building Spikelance, a project management SaaS tool, I knew the architecture decisions made early on would define the product's ceiling. Multi-tenancy, real-time collaboration, and role-based access aren't features you bolt on later — they're foundational.

The first month was spent entirely on architecture — no UI, no features, just infrastructure. It felt slow, but it paid dividends when we scaled from 10 to 10,000 users without rewriting a single database query.

## Multi-Tenancy with Row Level Security

Supabase's Row Level Security (RLS) turned out to be the perfect fit. Instead of filtering data in application code, every query is automatically scoped to the user's organization. This means:

- **Zero data leakage** — even if application code has a bug, the database won't serve unauthorized data.
- **Simpler application logic** — no need for \`WHERE org_id = ?\` on every query.
- **Performance** — PostgreSQL optimizes RLS policies at the query planner level.

\`\`\`sql
CREATE POLICY "Users can only see their org data"
ON projects FOR SELECT
USING (org_id = (SELECT org_id FROM profiles WHERE id = auth.uid()));
\`\`\`

## The Tenant Isolation Pattern

Beyond RLS, we implemented a layered isolation strategy. Each organization gets its own namespace in the storage bucket, its own set of API keys, and its own rate limits. The schema looks like this:

\`\`\`sql
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  plan TEXT DEFAULT 'free',
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE org_members (
  org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member',
  joined_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (org_id, user_id)
);
\`\`\`

The beauty of this pattern is that adding a new tenant is just an INSERT — no schema migrations, no new databases, no infrastructure changes.

## Real-Time Updates

Supabase's real-time subscriptions made collaborative features surprisingly straightforward. Task updates, comments, and status changes propagate instantly across all connected clients.

The key insight was **debouncing optimistic updates** — update the UI immediately, but batch the database writes to avoid overwhelming the real-time channel.

\`\`\`typescript
const useRealtimeTasks = (projectId: string) => {
  useEffect(() => {
    const channel = supabase
      .channel(\`tasks:\${projectId}\`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'tasks',
        filter: \`project_id=eq.\${projectId}\`
      }, (payload) => {
        queryClient.invalidateQueries(['tasks', projectId]);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [projectId]);
};
\`\`\`

## Handling Conflicts

Real-time collaboration inevitably leads to conflicts. Two users editing the same task simultaneously? We solved this with a **last-write-wins** strategy combined with field-level granularity. Instead of overwriting the entire task object, each update only touches the specific fields that changed.

For text-heavy fields like descriptions, we implemented a simple operational transform: if two users edit different parts of the same text, both changes are preserved. If they edit the same paragraph, the later write wins with a visual notification to the other user.

## Role-Based Access Control

I implemented a three-tier role system: Owner, Admin, and Member. The critical decision was storing roles in a **separate table** rather than on the user profile, which prevents privilege escalation attacks.

\`\`\`sql
CREATE TYPE app_role AS ENUM ('owner', 'admin', 'member');

CREATE OR REPLACE FUNCTION has_org_role(
  _user_id UUID, _org_id UUID, _role app_role
) RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM org_members
    WHERE user_id = _user_id
      AND org_id = _org_id
      AND role = _role
  );
$$ LANGUAGE sql STABLE SECURITY DEFINER;
\`\`\`

## Scaling Lessons

At 5,000 concurrent users, we hit our first bottleneck: the real-time subscription system was creating too many database connections. The fix was connection pooling with PgBouncer and consolidating subscriptions — instead of one channel per task, one channel per project.

At 10,000 users, we hit the second: RLS policies were adding 15-20ms to every query. The solution was adding strategic indexes that aligned with the RLS filter patterns and caching frequently-accessed permission checks in Redis.

## Key Takeaways

1. Start with security policies before writing application code
2. Real-time features need careful thought about conflict resolution
3. Multi-tenancy is an architecture pattern, not a feature — plan for it from day one
4. PostgreSQL is incredibly powerful when you lean into its features
5. Connection pooling isn't optional at scale — implement it before you need it
6. Monitor your RLS policy performance — they can become bottlenecks
    `,
    date: "Feb 2026",
    readTime: "12 min",
    category: "Architecture",
    featured: true,
  },
  {
    id: "smooth-page-transitions",
    title: "The Art of Smooth Page Transitions in React",
    excerpt:
      "A deep dive into creating buttery-smooth page transitions using Framer Motion's AnimatePresence and layout animations.",
    content: `
## Why Transitions Matter

Page transitions aren't just eye candy — they provide spatial context. When a user navigates from a list to a detail view, a well-crafted transition communicates the relationship between those views.

Studies show that perceived performance improves by up to 40% when transitions are used effectively. Users report apps as "faster" even when the actual load time is identical — because the animation masks the loading state and provides continuity.

## The AnimatePresence Pattern

Framer Motion's \`AnimatePresence\` is the foundation. It detects when components mount and unmount, letting you animate both entry and exit.

\`\`\`tsx
<AnimatePresence mode="wait">
  <motion.div
    key={location.pathname}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <Routes location={location}>
      {/* routes */}
    </Routes>
  </motion.div>
</AnimatePresence>
\`\`\`

The \`mode="wait"\` prop is critical — it ensures the exiting page fully animates out before the entering page begins. Without it, both pages render simultaneously, causing layout conflicts.

## The Strip Wipe Effect

For this portfolio, I chose a staggered horizontal strip wipe. Five strips animate sequentially with alternating transform origins, creating a zigzag reveal pattern.

The trick is using \`scaleX\` instead of \`width\` — it's GPU-accelerated and avoids layout thrashing.

\`\`\`tsx
const STRIPS = [0, 1, 2, 3, 4];

{STRIPS.map((i) => (
  <motion.div
    key={i}
    className="flex-1"
    style={{
      background: "hsl(var(--primary))",
      transformOrigin: i % 2 === 0 ? "left" : "right"
    }}
    initial={{ scaleX: 1 }}
    animate={{ scaleX: 0 }}
    exit={{ scaleX: 1 }}
    transition={{
      duration: 0.5,
      delay: i * 0.08,
      ease: [0.76, 0, 0.24, 1],
    }}
  />
))}
\`\`\`

## Shared Element Transitions

The holy grail of page transitions is the shared element — an image or card that smoothly morphs from its position on one page to its position on another. Framer Motion's \`layoutId\` makes this surprisingly simple:

\`\`\`tsx
// On the list page
<motion.div layoutId={\`card-\${project.id}\`}>
  <ProjectCard project={project} />
</motion.div>

// On the detail page
<motion.div layoutId={\`card-\${project.id}\`}>
  <ProjectHero project={project} />
</motion.div>
\`\`\`

The catch: both elements must be mounted simultaneously during the transition. This is where \`AnimatePresence\` with \`mode="popLayout"\` becomes essential.

## Route-Aware Transitions

Not all transitions should be the same. A forward navigation (list → detail) should feel different from a backward navigation (detail → list). I track navigation direction with a simple context:

\`\`\`tsx
const NavigationContext = createContext<{ direction: 'forward' | 'back' }>({
  direction: 'forward'
});

// Use it in your transition variants
const variants = {
  enter: (direction) => ({
    x: direction === 'forward' ? 100 : -100,
    opacity: 0
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({
    x: direction === 'forward' ? -100 : 100,
    opacity: 0
  })
};
\`\`\`

## Performance Considerations

- Always use \`transform\` and \`opacity\` for animations — they're composited on the GPU
- Use \`will-change\` sparingly and only during active animations
- Keep exit animations short (300-500ms) to avoid feeling sluggish
- Test on low-end devices — a 60fps animation on your MacBook might stutter on a budget phone
- Avoid animating \`border-radius\` — it triggers paint. Fake it with an inner element

## Debugging Jank

When transitions feel "off," open Chrome DevTools' Performance panel and record the transition. Look for:

1. Long tasks on the main thread (red bars)
2. Forced reflows (layout thrashing)
3. Excessive paint operations

The most common culprit? Animating properties that trigger layout: \`width\`, \`height\`, \`top\`, \`left\`, \`margin\`, \`padding\`. Replace them with \`transform: translate()\` and \`transform: scale()\`.

## The Golden Rule

The best transition is one the user barely notices. It should feel natural and guide attention, not demand it. If someone comments "nice transition," it's probably too much.
    `,
    date: "Jan 2026",
    readTime: "9 min",
    category: "Frontend",
    featured: false,
  },
  {
    id: "tailwind-vs-styled-components",
    title: "Why I Chose Tailwind CSS Over Styled Components",
    excerpt:
      "A practical comparison of utility-first CSS vs CSS-in-JS for building design systems in production applications.",
    content: `
## The Context

After years of using Styled Components, I switched to Tailwind CSS for all new projects. Here's why — and where CSS-in-JS still wins.

This isn't a theoretical comparison. I've shipped production apps with both approaches, and the differences only become clear when you're maintaining code at scale with a team.

## Speed of Development

Tailwind's utility classes eliminate the context-switching between files. You're styling inline with your markup, which means:

- No naming fatigue (goodbye \`.card-wrapper-inner-container\`)
- Instant visual feedback as you type
- Co-located styles that move with their components

In a timed experiment with my team, we built the same dashboard layout in both approaches. Tailwind was 35% faster for initial implementation. But the real difference showed up during code review — Tailwind changes were self-evident, while Styled Components required jumping between files.

## The Design System Argument

Critics say Tailwind leads to inconsistent designs. In practice, the opposite is true. The constrained set of values (\`spacing-4\`, \`text-lg\`, \`rounded-md\`) enforces consistency far better than freeform CSS values.

\`\`\`tsx
// Consistent, constrained, readable
<div className="p-6 rounded-2xl bg-card shadow-lg">
  <h2 className="text-xl font-semibold mb-2">Title</h2>
  <p className="text-muted-foreground text-sm">Description</p>
</div>
\`\`\`

Compare this to Styled Components where a developer might write \`padding: 23px\` instead of sticking to the 4px grid. Tailwind makes the wrong thing hard to do.

## The Responsive Design Advantage

This is where Tailwind truly shines. Responsive modifiers are inline and scannable:

\`\`\`tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
  {/* items */}
</div>
\`\`\`

With Styled Components, this requires media query blocks that break the visual flow of your component. It's more code, harder to scan, and easier to introduce inconsistencies.

## Dark Mode: A Case Study

Implementing dark mode with Tailwind is trivial — prefix utilities with \`dark:\`:

\`\`\`tsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
\`\`\`

Or better yet, use CSS custom properties with semantic naming, which is the approach I use in all my projects:

\`\`\`css
:root {
  --background: 0 0% 100%;
  --foreground: 222 84% 5%;
}

.dark {
  --background: 222 84% 5%;
  --foreground: 210 40% 98%;
}
\`\`\`

## Bundle Size Impact

Tailwind's purge mechanism strips unused classes at build time. Our production CSS went from 180KB (Styled Components) to 12KB (Tailwind). That's a 93% reduction.

More importantly, Styled Components generates styles at runtime, adding JavaScript execution time. Tailwind's styles are static CSS — parsed once, cached indefinitely.

## Where CSS-in-JS Wins

- **Dynamic styles based on complex props** — Tailwind's conditional classes can get unwieldy
- **Theme-dependent keyframe animations** — easier with template literals
- **Component libraries distributed as packages** — Tailwind requires the consumer to have it configured
- **Type-safe style props** — TypeScript integration is more natural with CSS-in-JS

## The Maintenance Factor

After 6 months of maintaining both codebases, the Tailwind project had 40% fewer style-related bugs. The reason? Styles are right next to the markup they affect. There's no hunting through a stylesheet to find why a margin is wrong.

## My Recommendation

For application development with a small-to-medium team, Tailwind wins. For building reusable component libraries meant to be consumed by others, consider CSS-in-JS. And for design systems? Use Tailwind with \`class-variance-authority\` — it gives you the best of both worlds.
    `,
    date: "Dec 2025",
    readTime: "10 min",
    category: "CSS",
    featured: false,
  },
  {
    id: "ai-try-on-ecommerce",
    title: "Integrating AI Try-On Features in E-Commerce",
    excerpt:
      "How I built the virtual try-on system for VirtueWear using TensorFlow.js and real-time image processing.",
    content: `
## The Vision

VirtueWear needed a way for customers to visualize clothing on themselves before purchasing. The goal: a real-time virtual try-on that runs entirely in the browser — no server uploads, no waiting, no privacy concerns.

The business case was clear: return rates for clothing average 30-40% in e-commerce, and "didn't look like expected" is the #1 reason. A try-on feature could cut returns in half.

## Architecture Overview

The system has three main components:

1. **Pose Detection** — Using TensorFlow.js's PoseNet to identify body keypoints from a webcam feed
2. **Garment Mapping** — Warping product images to match the detected body shape
3. **Real-Time Rendering** — Compositing the warped garment onto the video feed at 30fps

## The Pose Detection Pipeline

PoseNet provides 17 keypoints (nose, shoulders, elbows, wrists, hips, knees, ankles). For clothing try-on, we primarily use the shoulder, hip, and torso keypoints.

\`\`\`typescript
const net = await posenet.load({
  architecture: 'ResNet50',
  outputStride: 32,
  quantBytes: 2
});

const pose = await net.estimateSinglePose(videoElement, {
  flipHorizontal: true
});
\`\`\`

The accuracy difference between MobileNet and ResNet50 architectures was significant for our use case. MobileNet would occasionally misplace shoulder keypoints by 10-15 pixels, causing the garment to "swim" on the body. ResNet50's accuracy was worth the performance trade-off.

## Body Segmentation

Beyond pose detection, we needed body segmentation to handle occlusion — when the user's arms cross in front of the garment, the arms should appear in front. We used BodyPix for this:

\`\`\`typescript
const segmentation = await bodyPix.segmentPerson(videoElement, {
  flipHorizontal: true,
  internalResolution: 'medium',
  segmentationThreshold: 0.7
});

// Create a mask where arms are "in front"
const armMask = segmentation.data.map(
  (val) => val === 10 || val === 11 ? 255 : 0  // left/right arm parts
);
\`\`\`

## Garment Warping

The most challenging part was warping the 2D garment image to match the user's body proportions. I used a triangulated mesh approach — dividing the garment into triangles, then applying affine transformations to each triangle based on the corresponding body keypoints.

The mesh has 12 control points: 4 for the neckline, 4 for the shoulders/sleeves, and 4 for the hem. Each garment image comes with pre-defined control point positions that map to body keypoints.

\`\`\`typescript
interface GarmentMesh {
  controlPoints: Point2D[];
  triangles: [number, number, number][];
  textureCoords: Point2D[];
}

function warpGarment(
  mesh: GarmentMesh,
  bodyKeypoints: Keypoint[],
  ctx: CanvasRenderingContext2D
) {
  for (const [a, b, c] of mesh.triangles) {
    const srcTri = [mesh.textureCoords[a], mesh.textureCoords[b], mesh.textureCoords[c]];
    const dstTri = mapToBody([mesh.controlPoints[a], mesh.controlPoints[b], mesh.controlPoints[c]], bodyKeypoints);
    drawTriangle(ctx, garmentImage, srcTri, dstTri);
  }
}
\`\`\`

## Lighting and Color Matching

A garment overlay looks fake if the lighting doesn't match the video feed. We extract the average luminance from the area around the user's torso and adjust the garment's brightness and contrast accordingly:

\`\`\`typescript
function matchLighting(garmentCanvas: HTMLCanvasElement, videoLuminance: number) {
  const ctx = garmentCanvas.getContext('2d')!;
  const adjustment = videoLuminance / 128; // normalize to 0-2 range
  ctx.filter = \`brightness(\${adjustment}) contrast(\${0.8 + adjustment * 0.2})\`;
  ctx.drawImage(garmentCanvas, 0, 0);
}
\`\`\`

## Performance Optimization

Running ML inference in the browser is expensive. Key optimizations:

- **WebGL backend** — 5x faster than the CPU backend
- **Frame skipping** — Run pose detection every 3rd frame, interpolate between
- **Resolution scaling** — Detect at 256x256, render at full resolution
- **Web Workers** — Offload non-rendering computation
- **Model warm-up** — Run a dummy inference on page load to initialize the GPU pipeline

## The Smoothing Problem

Raw pose detection is noisy — keypoints jitter frame-to-frame. Without smoothing, the garment vibrates unnervingly. We applied an exponential moving average with velocity prediction:

\`\`\`typescript
function smoothKeypoint(current: Point2D, previous: Point2D, alpha = 0.7): Point2D {
  return {
    x: previous.x + alpha * (current.x - previous.x),
    y: previous.y + alpha * (current.y - previous.y)
  };
}
\`\`\`

## Results

The final system achieves 25-30fps on modern devices with a detection-to-render latency under 100ms. Customer engagement increased 40% on product pages with try-on enabled, and return rates dropped by 28% for products that supported the feature.

The total JavaScript payload for the try-on feature is 2.4MB (compressed), loaded on-demand only when the user activates the camera. First inference takes ~1.5s; subsequent frames process in 30-40ms.
    `,
    date: "Nov 2025",
    readTime: "14 min",
    category: "AI / ML",
    featured: true,
  },
  {
    id: "framer-motion-production",
    title: "Mastering Framer Motion for Production Apps",
    excerpt:
      "Performance tips, animation patterns, and reusable components for creating delightful motion in React apps.",
    content: `
## Beyond Basic Animations

Most Framer Motion tutorials cover \`initial\`, \`animate\`, and \`exit\`. But production apps need more sophisticated patterns — ones that handle edge cases, perform well at scale, and are maintainable by a team.

After shipping 12+ production apps with Framer Motion, here are the patterns I reach for every time.

## The Stagger Pattern

Staggering is the most impactful animation pattern. It turns a list of items appearing at once into a cascading reveal that guides the eye.

\`\`\`tsx
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};
\`\`\`

The magic number for stagger delay is **0.05-0.12 seconds**. Below 0.05s, items appear nearly simultaneous. Above 0.12s, the animation feels sluggish. I default to 0.08s.

## The Reveal Pattern

For sections that appear on scroll, I use a reusable wrapper component that handles the intersection observer logic:

\`\`\`tsx
const AnimatedSection = ({
  children,
  className,
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{
      duration: 0.7,
      delay,
      ease: [0.22, 1, 0.36, 1]
    }}
    className={className}
  >
    {children}
  </motion.div>
);
\`\`\`

The \`margin: "-80px"\` means the animation triggers when the element is 80px from entering the viewport — giving the user a brief moment to notice the animation.

## Scroll-Triggered Animations

For long pages, triggering animations on scroll creates a sense of discovery. The key is using \`whileInView\` with appropriate \`viewport\` settings.

\`\`\`tsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
>
\`\`\`

## Gesture Animations

\`whileHover\` and \`whileTap\` are essential for interactive elements. The subtle scale and shadow changes make buttons feel physical.

\`\`\`tsx
<motion.button
  whileHover={{ scale: 1.03, y: -2 }}
  whileTap={{ scale: 0.97 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
>
  Click me
</motion.button>
\`\`\`

The spring physics here are important: high stiffness (400) means the button responds quickly; moderate damping (17) allows a tiny overshoot that feels satisfying.

## The Exit Animation Trap

The biggest mistake I see: exit animations that are too long. Users clicked away because they want to see something new. A long exit animation feels like the app is fighting them.

My rule: **exit animations should be 50-70% the duration of enter animations.** If your enter is 0.6s, your exit should be 0.3-0.4s.

\`\`\`tsx
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1, y: 0,
    transition: { duration: 0.6 }
  },
  exit: {
    opacity: 0, y: -10,
    transition: { duration: 0.3 }
  }
};
\`\`\`

## Orchestrating Complex Sequences

Sometimes you need multiple elements to animate in a choreographed sequence. Framer Motion's \`useAnimate\` hook (v10+) gives you imperative control:

\`\`\`tsx
const [scope, animate] = useAnimate();

const handleOpen = async () => {
  await animate(".backdrop", { opacity: 1 }, { duration: 0.2 });
  await animate(".modal", { scale: 1, opacity: 1 }, { type: "spring" });
  await animate(".modal-content", { opacity: 1, y: 0 }, { delay: 0.1 });
};
\`\`\`

## Performance Rules

1. **Never animate layout properties** (width, height, top, left) — use \`transform\` instead
2. **Use \`layoutId\`** for shared element transitions between routes
3. **Prefer \`spring\` over \`tween\`** for natural-feeling motion
4. **Set \`layout="position"\`** when you only need position animations, not size
5. **Avoid animating inside lists** with frequently changing data — use \`key\` carefully

## The 60fps Checklist

- Profile with React DevTools — are animations causing re-renders?
- Use \`useTransform\` for scroll-linked animations instead of state
- Memoize variants objects defined outside components
- Test on throttled CPU in Chrome DevTools
- Use \`layout\` prop cautiously — it measures DOM on every frame
- Batch state updates that trigger animation changes

## A Word on Accessibility

Always respect \`prefers-reduced-motion\`. Wrap your animated components:

\`\`\`tsx
const prefersReducedMotion = useReducedMotion();

<motion.div
  animate={prefersReducedMotion ? {} : { y: [0, -10, 0] }}
  transition={{ repeat: Infinity, duration: 2 }}
>
\`\`\`

Motion is delightful for most users, but it can cause vestibular discomfort for others. This isn't optional — it's an accessibility requirement.
    `,
    date: "Oct 2025",
    readTime: "12 min",
    category: "Animation",
    featured: false,
  },
  {
    id: "typescript-patterns-react",
    title: "Advanced TypeScript Patterns for React Components",
    excerpt:
      "Discriminated unions, generic components, and type-safe event handlers that make your React code bulletproof.",
    content: `
## Why TypeScript Matters in React

TypeScript doesn't just catch bugs — it serves as living documentation. When a component's props are well-typed, any developer can understand its API at a glance.

But most React TypeScript code barely scratches the surface. Let's go deeper into patterns that fundamentally change how you think about component APIs.

## Discriminated Unions for Component Variants

Instead of optional props that create invalid states, use discriminated unions:

\`\`\`typescript
type ButtonProps =
  | { variant: "link"; href: string; onClick?: never }
  | { variant: "button"; onClick: () => void; href?: never };
\`\`\`

This makes it **impossible** to pass both \`href\` and \`onClick\`, eliminating an entire class of bugs at compile time.

Here's a more complex example — a notification component with different data requirements per type:

\`\`\`typescript
type NotificationProps =
  | { type: "success"; message: string; action?: () => void }
  | { type: "error"; message: string; errorCode: string; retry: () => void }
  | { type: "loading"; progress: number; cancelable?: boolean };

// TypeScript knows exactly which props are available
function Notification(props: NotificationProps) {
  switch (props.type) {
    case "error":
      // props.errorCode and props.retry are available here
      return <ErrorBanner {...props} />;
    case "loading":
      // props.progress is available here
      return <LoadingBar progress={props.progress} />;
    default:
      return <SuccessToast message={props.message} />;
  }
}
\`\`\`

## Generic Components

The most powerful pattern for reusable components:

\`\`\`tsx
interface SelectProps<T> {
  options: T[];
  value: T;
  onChange: (value: T) => void;
  getLabel: (item: T) => string;
  getKey?: (item: T) => string;
}

function Select<T>({ options, value, onChange, getLabel, getKey }: SelectProps<T>) {
  return (
    <select
      value={getKey ? getKey(value) : String(value)}
      onChange={(e) => {
        const selected = options.find(
          (opt) => (getKey ? getKey(opt) : String(opt)) === e.target.value
        );
        if (selected) onChange(selected);
      }}
    >
      {options.map((opt) => (
        <option key={getKey ? getKey(opt) : String(opt)} value={getKey ? getKey(opt) : String(opt)}>
          {getLabel(opt)}
        </option>
      ))}
    </select>
  );
}

// Usage — TypeScript infers T as User
<Select
  options={users}
  value={selectedUser}
  onChange={setSelectedUser}  // (value: User) => void
  getLabel={(user) => user.name}
  getKey={(user) => user.id}
/>
\`\`\`

Now the \`onChange\` callback is automatically typed to match whatever you pass as \`options\`.

## The Polymorphic Component Pattern

Want a component that can render as different HTML elements? This is the \`as\` prop pattern:

\`\`\`typescript
type PolymorphicProps<E extends React.ElementType> = {
  as?: E;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<E>, 'as' | 'children'>;

function Text<E extends React.ElementType = 'p'>({
  as,
  children,
  ...props
}: PolymorphicProps<E>) {
  const Component = as || 'p';
  return <Component {...props}>{children}</Component>;
}

// Usage
<Text>Default paragraph</Text>
<Text as="h1" id="title">This is an h1</Text>
<Text as="a" href="/about">This is a link</Text>
\`\`\`

TypeScript knows the available props based on the \`as\` value — \`href\` is only valid when \`as="a"\`.

## Type-Safe Event Handlers

Stop using \`any\` for event handlers:

\`\`\`typescript
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value); // fully typed
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget); // typed
};
\`\`\`

## Branded Types for Domain Safety

Prevent mixing up IDs of different entities:

\`\`\`typescript
type UserId = string & { readonly __brand: 'UserId' };
type ProjectId = string & { readonly __brand: 'ProjectId' };

function createUserId(id: string): UserId {
  return id as UserId;
}

function getUser(id: UserId) { /* ... */ }
function getProject(id: ProjectId) { /* ... */ }

const userId = createUserId("abc123");
getUser(userId);     // OK
getProject(userId);  // ERROR — Argument of type 'UserId' is not assignable to 'ProjectId'
\`\`\`

## The \`as const\` Trick

Use \`as const\` for configuration objects to get literal types:

\`\`\`typescript
const ROUTES = {
  home: "/",
  blog: "/blog",
  projects: "/projects",
} as const;

type Route = typeof ROUTES[keyof typeof ROUTES]; // "/" | "/blog" | "/projects"
\`\`\`

## Utility Types You Should Know

\`\`\`typescript
// Make specific fields optional
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Make specific fields required
type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

// Extract component props
type ButtonProps = React.ComponentProps<typeof Button>;

// Deep readonly
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};
\`\`\`

## Key Takeaway

The goal isn't 100% type coverage — it's making invalid states unrepresentable. Focus your typing effort on component APIs and data boundaries. Every \`as any\` is a bug waiting to happen.
    `,
    date: "Sep 2025",
    readTime: "13 min",
    category: "TypeScript",
    featured: false,
  },
  {
    id: "optimizing-web-performance",
    title: "Web Performance Optimization: A Practical Guide",
    excerpt:
      "Core Web Vitals, lazy loading strategies, and bundle optimization techniques that actually move the needle.",
    content: `
## The Performance Mindset

Performance isn't about making everything fast — it's about making the **right things** fast. A 100ms improvement to your LCP matters more than shaving 5ms off a rarely-used feature.

I've audited dozens of production React apps, and the same patterns emerge. Here's a field guide to the optimizations that consistently deliver measurable results.

## Core Web Vitals That Matter

- **LCP (Largest Contentful Paint)** — How fast does the main content appear? Target: < 2.5s
- **FID (First Input Delay)** — How responsive is the page to interaction? Target: < 100ms
- **CLS (Cumulative Layout Shift)** — Does the page jump around? Target: < 0.1
- **INP (Interaction to Next Paint)** — How fast does the UI respond to any interaction? Target: < 200ms

## Image Optimization

Images are typically 50%+ of page weight. Quick wins:

1. Use \`srcset\` and \`sizes\` for responsive images
2. Lazy load below-the-fold images with \`loading="lazy"\`
3. Use WebP/AVIF formats with fallbacks
4. Set explicit \`width\` and \`height\` to prevent CLS
5. Use \`fetchpriority="high"\` on your LCP image

\`\`\`tsx
// The LCP image — load it as fast as possible
<img
  src="/hero.webp"
  alt="Hero banner"
  width={1920}
  height={1080}
  fetchPriority="high"
  decoding="async"
/>

// Below-the-fold images — lazy load
<img
  src="/feature.webp"
  alt="Feature screenshot"
  loading="lazy"
  decoding="async"
  width={800}
  height={600}
/>
\`\`\`

## Font Loading Strategy

Custom fonts are a silent performance killer. A poorly loaded font can cause invisible text (FOIT) or a jarring text swap (FOUT). The optimal strategy:

\`\`\`html
<!-- Preload the most critical font weight -->
<link rel="preload" href="/fonts/display-bold.woff2" as="font" type="font/woff2" crossorigin>

<!-- Use font-display: swap for body text, optional for display text -->
<style>
  @font-face {
    font-family: 'Display';
    src: url('/fonts/display-bold.woff2') format('woff2');
    font-display: optional; /* Don't swap if it takes too long */
    font-weight: 700;
  }
</style>
\`\`\`

## Bundle Optimization

\`\`\`typescript
// Instead of importing the entire library
import _ from 'lodash';

// Import only what you need
import debounce from 'lodash/debounce';
\`\`\`

Use dynamic imports for route-level code splitting:

\`\`\`tsx
const Blog = lazy(() => import('./pages/Blog'));
const Projects = lazy(() => import('./pages/Projects'));

// Wrap in Suspense with a meaningful fallback
<Suspense fallback={<PageSkeleton />}>
  <Routes>
    <Route path="/blog" element={<Blog />} />
    <Route path="/projects" element={<Projects />} />
  </Routes>
</Suspense>
\`\`\`

## The Waterfall Problem

The biggest performance killer is sequential loading. Fonts load after CSS, which loads after HTML. Break the chain:

- Preload critical fonts: \`<link rel="preload" as="font">\`
- Inline critical CSS (or use Vite's automatic CSS code-splitting)
- Use \`fetchpriority="high"\` on LCP images
- Avoid render-blocking third-party scripts

## React-Specific Optimizations

\`\`\`tsx
// 1. Memoize expensive computations
const sortedItems = useMemo(
  () => items.sort((a, b) => a.date - b.date),
  [items]
);

// 2. Virtualize long lists
import { useVirtualizer } from '@tanstack/react-virtual';

// 3. Defer non-critical state updates
import { useDeferredValue } from 'react';
const deferredSearchTerm = useDeferredValue(searchTerm);

// 4. Use transitions for non-urgent updates
import { useTransition } from 'react';
const [isPending, startTransition] = useTransition();
startTransition(() => setFilteredResults(filterResults(query)));
\`\`\`

## The Performance Budget

Set concrete limits and enforce them in CI:

- JavaScript bundle: < 200KB (gzipped)
- CSS: < 30KB (gzipped)
- LCP: < 2.0s on 4G
- Total page weight: < 1MB for initial load
- No third-party script > 50KB

## Measuring What Matters

Don't optimize blind. Use Lighthouse, WebPageTest, and Chrome's Performance panel. Set performance budgets and fail CI if they're exceeded.

The most important metric is **real user data**. Synthetic benchmarks tell you what's possible; field data tells you what's actually happening. Use the Web Vitals library to collect real user metrics:

\`\`\`typescript
import { onLCP, onFID, onCLS, onINP } from 'web-vitals';

onLCP(sendToAnalytics);
onFID(sendToAnalytics);
onCLS(sendToAnalytics);
onINP(sendToAnalytics);
\`\`\`
    `,
    date: "Aug 2025",
    readTime: "13 min",
    category: "Performance",
    featured: true,
  },
  {
    id: "design-systems-from-scratch",
    title: "Building a Design System From Scratch with Tailwind",
    excerpt:
      "How I created a consistent, themeable design system using CSS custom properties and Tailwind's configuration.",
    content: `
## Why Build Your Own?

Off-the-shelf component libraries are great for prototyping, but production apps need a design system that reflects the brand's identity. Building from scratch gives you full control over aesthetics and behavior.

The decision to build vs buy isn't about ego — it's about **brand differentiation**. If your app looks like every other shadcn/ui app, you're competing on features alone. A custom design system lets your product feel unique from the first interaction.

## The Token Foundation

Everything starts with design tokens — the atomic values that define your visual language:

\`\`\`css
:root {
  /* Spacing scale */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;

  /* Typography */
  --radius: 0.75rem;
  --font-display: 'Clash Display', sans-serif;
  --font-body: 'Cabinet Grotesk', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  
  /* Colors — HSL for easy manipulation */
  --background: 20 14.3% 4.1%;
  --foreground: 60 9.1% 97.8%;
  --primary: 84 35% 40%;
  --primary-foreground: 84 35% 8%;
  
  /* Elevation */
  --shadow-sm: 0 1px 2px hsl(0 0% 0% / 0.05);
  --shadow-md: 0 4px 6px -1px hsl(0 0% 0% / 0.1);
  --shadow-lg: 0 10px 25px -3px hsl(0 0% 0% / 0.15);
}
\`\`\`

## The Naming Convention

Token names should describe **intent**, not **appearance**:

- \`--color-primary\` not \`--color-green\`
- \`--shadow-elevated\` not \`--shadow-big\`
- \`--space-section\` not \`--space-64px\`

This makes theming trivial — change the token value, and every component updates. It also prevents meaningless discussions like "should this be green-500 or green-600?"

## Component Architecture

Each component follows a consistent pattern:

1. **Base styles** — Layout, typography, and structural CSS
2. **Variants** — Visual variations (size, color, state) using \`class-variance-authority\`
3. **Composition** — Compound components for complex UIs

\`\`\`tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        sm: "h-9 px-3 text-sm rounded-md",
        md: "h-10 px-4 py-2",
        lg: "h-11 px-8 text-lg rounded-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);
\`\`\`

## Compound Components

For complex UI patterns like tabs, menus, and accordions, use the compound component pattern:

\`\`\`tsx
// Usage
<Card>
  <Card.Header>
    <Card.Title>Project Stats</Card.Title>
    <Card.Description>Last 30 days</Card.Description>
  </Card.Header>
  <Card.Content>
    {/* content */}
  </Card.Content>
  <Card.Footer>
    <Button variant="outline">View All</Button>
  </Card.Footer>
</Card>
\`\`\`

Each sub-component is independently styled but shares context through React's context API or simply through CSS scoping.

## Theming Strategy

Dark mode isn't an afterthought — it's a first-class feature. By defining all colors as HSL values in CSS custom properties, switching themes is a single class change on the root element.

\`\`\`css
.dark {
  --background: 20 14.3% 4.1%;
  --foreground: 60 9.1% 97.8%;
  --card: 20 14.3% 6%;
  --primary: 84 35% 50%;
}
\`\`\`

But theming goes beyond dark mode. I create theme presets for different contexts:

\`\`\`css
[data-theme="marketing"] {
  --primary: 280 100% 60%;
  --radius: 1.5rem;
  --font-display: 'Satoshi', sans-serif;
}

[data-theme="dashboard"] {
  --primary: 210 100% 50%;
  --radius: 0.5rem;
  --font-display: 'Inter', sans-serif;
}
\`\`\`

## Animation Tokens

Motion is part of the design system. Define animation tokens for consistent feel:

\`\`\`css
:root {
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out-cubic: cubic-bezier(0.65, 0, 0.35, 1);
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
}
\`\`\`

## Documentation

A design system without documentation is just a collection of components. Use Storybook or a dedicated docs page to showcase every component, variant, and usage pattern.

Every component in the system should have:

1. A live interactive example
2. A prop reference table
3. Do/Don't usage guidelines
4. Accessibility notes

The documentation IS the design system. If it's not documented, it doesn't exist.
    `,
    date: "Jul 2025",
    readTime: "11 min",
    category: "Design",
    featured: false,
  },
];

export const getPostBySlug = (slug: string) =>
  blogPosts.find((post) => post.id === slug);
