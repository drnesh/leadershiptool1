import { useState } from "react";

// ─── BIG FIVE FACTORS ─────────────────────────────────────────────────────────
const FACTORS = [
  {
    id: "O", label: "Openness", subtitle: "Curiosity & Vision",
    color: "#4A90A4", light: "#EBF4F7", icon: "◈",
    description: "How readily you embrace new ideas, challenge assumptions, and lead through ambiguity. In leadership this shows up as vision, creative problem-solving, and tolerance for uncertainty.",
    highLabel: "Visionary Explorer", lowLabel: "Pragmatic Stabilizer",
    highInsight: "You are a natural visionary. Bold thinking energizes you and you thrive where others freeze. Risk: losing people who need more structure before they can follow.",
    lowInsight: "You bring grounded, practical judgment teams rely on. You excel at refining what works. Risk: resisting necessary change or dismissing unconventional ideas too quickly.",
    highCoaching: ["When was the last time a 'crazy idea' from your team turned out to be right — and what stopped you from seeing it sooner?", "How do you create enough structure around your bold ideas that your team can actually execute them?"],
    lowCoaching: ["What is one area where the status quo is costing you more than you admit?", "Who on your team has ideas you tend to dismiss quickly? What would happen if you listened longer?"],
    questions: ["I naturally seek out unconventional ideas when solving complex problems.", "I find it energizing — not unsettling — to lead through ambiguity and uncertainty.", "I regularly challenge assumptions, including my own.", "I draw inspiration from ideas well outside my industry or area of expertise.", "When the future is unclear, my first instinct is curiosity rather than caution."],
  },
  {
    id: "C", label: "Conscientiousness", subtitle: "Discipline & Accountability",
    color: "#C9873A", light: "#FDF3E7", icon: "◆",
    description: "How consistently you follow through, hold yourself and others accountable, and translate intention into outcomes. This is the engine of execution in leadership.",
    highLabel: "Disciplined Executor", lowLabel: "Adaptive Improviser",
    highInsight: "You are a high-trust executor. People know what you stand for and count on you to deliver. Risk: rigidity — holding too tightly to plans when adaptability would serve better.",
    lowInsight: "You adapt fluidly and keep things moving. Risk: people around you feel uncertain about expectations, and important things fall through the cracks over time.",
    highCoaching: ["Is there anywhere your discipline has become rigidity — where you're enforcing standards that no longer serve the team?", "How do you ensure accountability without creating a culture of fear?"],
    lowCoaching: ["What is one commitment you made last month that you didn't fully follow through on — and what got in the way?", "If your team were asked what you consistently deliver on, what would they say?"],
    questions: ["I consistently follow through on commitments, even when priorities shift around me.", "I hold myself to the same standards I expect from my team.", "I plan carefully before acting and rarely leave important outcomes to chance.", "I track progress and results with rigor — not because I'm told to, but because I care.", "I address underperformance and missed commitments directly, rather than letting them slide."],
  },
  {
    id: "E", label: "Extraversion", subtitle: "Influence & Presence",
    color: "#C05A3A", light: "#FAEEE9", icon: "◎",
    description: "How naturally you draw energy from people, take up space in rooms, and inspire others through your presence. Extraversion shapes your communication style and social reach.",
    highLabel: "Energizing Influencer", lowLabel: "Reflective Strategist",
    highInsight: "You are a magnetic communicator who rallies people and makes ideas feel urgent. Risk: dominating conversations, missing quieter voices, confusing activity for progress.",
    lowInsight: "You lead through depth — your thinking is thorough, your words deliberate. Risk: being underestimated or failing to claim the visibility your ideas deserve.",
    highCoaching: ["In your last three team meetings, how much of the talking did you do — and what ideas may have gone unspoken?", "How do you create space for introverted team members to lead and be heard?"],
    lowCoaching: ["What is one situation where you held back from speaking up — and what did it cost?", "How do you ensure your most important ideas reach the people who need to hear them?"],
    questions: ["I feel energized — not drained — after presenting to large groups or leading open dialogue.", "I naturally build relationships across teams, levels, and functions.", "I am comfortable being the person who sets the tone or direction in a room.", "I find it easy to articulate a vision in a way that stirs people to action.", "I actively seek out new connections and conversations, even when it isn't required."],
  },
  {
    id: "A", label: "Agreeableness", subtitle: "Empathy & Trust",
    color: "#3A8A68", light: "#E8F5EE", icon: "◉",
    description: "How naturally you extend trust, prioritize others' wellbeing, and build psychologically safe environments. Agreeableness shapes team culture and your capacity for compassionate accountability.",
    highLabel: "Empathetic Builder", lowLabel: "Direct Challenger",
    highInsight: "You build remarkable loyalty and psychological safety. Risk: avoiding necessary confrontation, over-accommodating underperformers, saying yes when the answer should be no.",
    lowInsight: "You bring the directness and challenge that teams need to grow. Risk: people feel unsafe raising concerns, and your feedback lands as harsh rather than helpful.",
    highCoaching: ["Is there a difficult conversation you've been postponing — and what is it costing your team?", "How do you distinguish between genuine empathy and conflict avoidance?"],
    lowCoaching: ["When did someone last tell you that your feedback felt harsh? What did you do with that?", "What would it cost your team if they didn't feel psychologically safe with you?"],
    questions: ["I genuinely prioritize the wellbeing of my people, even when it costs me time or convenience.", "I find it natural to trust people and give them the benefit of the doubt.", "I listen to perspectives very different from my own without becoming defensive.", "I actively create conditions where people feel safe to speak up, push back, or admit failure.", "I would rather find a solution everyone can commit to than win an argument."],
  },
  {
    id: "N", label: "Emotional Stability", subtitle: "Composure & Resilience",
    color: "#7A5CBF", light: "#F0EBF9", icon: "◑",
    description: "How well you regulate emotional responses under pressure, recover from setbacks, and maintain clarity in high-stakes moments. Leaders with high stability become the calm that steadies teams in crisis.",
    highLabel: "Unshakeable Anchor", lowLabel: "Emotionally Sensitive Connector",
    highInsight: "You are the steady presence teams lean on in turbulence. Risk: appearing emotionally unavailable or making others feel their emotional responses are unwelcome.",
    lowInsight: "Your sensitivity makes you deeply attuned to your team. Risk: emotional variability becomes unpredictable, and people may walk on eggshells around you.",
    highCoaching: ["Is there a situation where your composure actually prevented you from acting on something important?", "How do you signal to your team that it's okay to feel — and express — difficulty at work?"],
    lowCoaching: ["What are your earliest warning signs that stress is affecting your leadership — and who notices before you do?", "What is one practice that reliably helps you return to clarity when things feel overwhelming?"],
    questions: ["I remain calm and clear-headed even in genuinely high-pressure situations.", "I recover quickly from setbacks without losing confidence or momentum.", "I am able to separate my emotional reaction from my professional decisions.", "I rarely let my stress or frustration visibly affect my team's morale.", "When I receive critical feedback, I process it constructively rather than defensively."],
  },
];

// ─── PROGRAMS DATABASE ────────────────────────────────────────────────────────
const PROGRAMS = {
  P1: {
    id: "P1",
    targetFactor: "O",
    title: "Leading Through Change",
    tagline: "Turn uncertainty into your competitive advantage.",
    duration: "8 Weeks", format: "Cohort · Live + Async", level: "All Levels",
    seats: "12–18 per cohort", color: "#4A90A4", light: "#EBF4F7",
    badge: "High Impact",
    forProfiles: ["Pragmatic Stabilizer", "Disciplined Anchor", "Trusted Counselor"],
    forYou: "Designed for leaders who are highly reliable and execution-focused but find themselves resisting — or failing to inspire — necessary transformation. If your team looks to you for stability but the world is demanding agility, this program builds the bridge.",
    problem: "Most leaders are promoted for delivering results in a stable environment. But the skills that made you successful in certainty become liabilities in disruption. This program rewires how you relate to change — personally and organizationally.",
    outcomes: [
      "Reframe ambiguity as a leadership asset rather than a threat",
      "Lead your team through organizational change without losing trust",
      "Challenge the status quo constructively — without becoming destabilizing",
      "Build a personal change leadership playbook grounded in your strengths",
      "Develop the vocabulary and frameworks to communicate change with confidence",
    ],
    modules: [
      { week: "Weeks 1–2", title: "The Change-Ready Leader", desc: "Explore your personal relationship with uncertainty. Identify the beliefs and habits that make you resistant to change — and where they once served you well. Map your change leadership style." },
      { week: "Weeks 3–4", title: "Reading the Room", desc: "Understand how your team experiences change differently from you. Learn to diagnose team resistance, navigate emotional cycles of transition, and lead people through — not around — difficulty." },
      { week: "Weeks 5–6", title: "Challenging the Status Quo", desc: "Practical tools for constructive disruption: how to raise uncomfortable truths, run productive experiments, and advocate for bold moves from a foundation of credibility." },
      { week: "Weeks 7–8", title: "Your Change Leadership Playbook", desc: "Synthesize your learning into a personal framework. Apply it to a live change initiative you are currently leading. Present to your cohort for structured feedback." },
    ],
    approach: ["Weekly 90-minute live cohort sessions (12–18 leaders)", "Async reflection modules between sessions", "Real initiative as the learning vehicle throughout", "Peer accountability triads", "Optional 1-on-1 coaching integration"],
    facilitators: "Led by experienced organizational psychologists and change practitioners with backgrounds in corporate transformation, not just theory.",
  },
  P2: {
    id: "P2",
    targetFactor: "C",
    title: "From Intention to Impact",
    tagline: "Stop starting. Start finishing.",
    duration: "6 Weeks", format: "Self-Paced + Live Workshops", level: "Mid to Senior",
    seats: "Unlimited (self-paced)", color: "#C9873A", light: "#FDF3E7",
    badge: "Most Popular",
    forProfiles: ["Adaptive Improviser", "Visionary Catalyst", "Empathetic Innovator"],
    forYou: "Built for leaders whose vision and energy are undeniable — but whose follow-through, systems, and accountability culture leave people uncertain about what will actually happen. If you are brilliant at starting things and weak at finishing them, this is your program.",
    problem: "High-Openness and high-Extraversion leaders often over-commit and under-deliver — not from lack of care, but from a deficit of systems. This program installs the operational backbone your leadership is missing.",
    outcomes: [
      "Build a personal commitment architecture that others can rely on",
      "Design accountability systems that motivate rather than police",
      "Learn to say no — or not yet — with authority and without guilt",
      "Create clear expectations that make performance conversations easier",
      "Turn your team's effort into consistent, measurable results",
    ],
    modules: [
      { week: "Module 1", title: "The Commitment Gap", desc: "Audit your current promises — to yourself, your team, and your stakeholders. Identify the patterns behind your follow-through failures and the stories you tell yourself about them." },
      { week: "Module 2", title: "Systems Over Willpower", desc: "Replace personal discipline with structural accountability. Weekly planning rhythms, prioritization frameworks (RICE, Eisenhower, NOW/NEXT/LATER), and commitment logging tools." },
      { week: "Module 3", title: "Designing Accountability Cultures", desc: "How to set expectations clearly, run check-ins that actually work, and address underperformance before it becomes a performance management issue." },
      { week: "Module 4", title: "The Art of the No", desc: "How high-performing leaders manage their yes. Boundary-setting, renegotiating commitments gracefully, and protecting your team's focus from organizational noise." },
      { week: "Module 5", title: "Results Architecture", desc: "OKRs, milestones, and progress reviews that drive accountability without bureaucracy. How to make results visible and motivating rather than threatening." },
      { week: "Module 6", title: "Live Application Workshop", desc: "Apply every tool to a real team challenge in a facilitated live workshop. Leave with a 90-day accountability plan your team has co-created." },
    ],
    approach: ["Self-paced video modules (avg. 25 min each)", "Downloadable frameworks and templates", "Two live group workshops (sessions 3 and 6)", "Peer accountability partner matching", "Weekly micro-challenges applied to real work"],
    facilitators: "Built by performance coaches and operations leaders who have scaled teams in high-growth environments.",
  },
  P3: {
    id: "P3",
    targetFactor: "E",
    title: "Visible Leadership",
    tagline: "Your ideas deserve to be heard. Let's make sure they are.",
    duration: "10 Weeks", format: "Cohort · High Intensity", level: "Senior & Executive",
    seats: "8–12 per cohort", color: "#C05A3A", light: "#FAEEE9",
    badge: "Executive Track",
    forProfiles: ["Reflective Strategist", "Trusted Counselor", "Strategic Pioneer"],
    forYou: "Designed for deeply capable leaders who are consistently underestimated. If your thinking is sophisticated but your presence isn't commanding the room — or if you lead well in depth but struggle with breadth and visibility — this program changes that.",
    problem: "Introversion is not a leadership deficit. But in most organizations, invisible leadership is. This program doesn't ask you to become someone else — it helps you claim your full authority as exactly who you are.",
    outcomes: [
      "Develop a distinct, authentic executive presence that doesn't require performance",
      "Communicate complex thinking in ways that move people to action",
      "Build strategic visibility across your organization without self-promotion",
      "Claim your authority in rooms that don't naturally amplify you",
      "Design an influence strategy that leverages your natural depth",
    ],
    modules: [
      { week: "Weeks 1–2", title: "The Visibility Audit", desc: "Where are you invisible — and why? Map your organizational footprint, identify where your impact is unrecognized, and surface the beliefs that are keeping you small." },
      { week: "Weeks 3–4", title: "Your Leadership Voice", desc: "Find and refine your authentic leadership voice. Narrative frameworks for executives, how to speak with authority on things you know deeply, and how to be memorable without being loud." },
      { week: "Weeks 5–6", title: "Influence Architecture", desc: "How introverted leaders build extraordinary influence: through depth of relationship, quality of insight, and strategic positioning — not volume or charisma." },
      { week: "Weeks 7–8", title: "Commanding the Room", desc: "Practical tools for high-stakes moments: board presentations, all-hands, difficult conversations with senior stakeholders. Video-recorded practice with structured coaching feedback." },
      { week: "Weeks 9–10", title: "Strategic Presence Plan", desc: "Design a 6-month visibility strategy tailored to your organization, role, and goals. Build the habits that sustain your presence without draining you." },
    ],
    approach: ["Small cohort (8–12) for deep peer trust", "Video-recorded practice sessions with expert feedback", "1-on-1 coaching call (weeks 4 and 8)", "Stakeholder interview data included at start", "Senior sponsor integration option"],
    facilitators: "Led by executive coaches specializing in introverted leadership and organizational influence, with deep experience at board level.",
  },
  P4: {
    id: "P4",
    targetFactor: "A",
    title: "Courageous Accountability",
    tagline: "Hard conversations. Real trust. No casualties.",
    duration: "8 Weeks", format: "Cohort · Live Sessions", level: "All Levels",
    seats: "14–20 per cohort", color: "#3A8A68", light: "#E8F5EE",
    badge: "Most Transformative",
    forProfiles: ["Direct Challenger", "Driven Commander", "Disciplined Anchor"],
    forYou: "For leaders who find feedback, difficult conversations, or accountability either too easy (and therefore too blunt) or too hard (and therefore always delayed). If performance conversations in your team are either avoided or feared, this program resets the culture.",
    problem: "The absence of courageous accountability is the most common reason high-performing teams stop performing. Either leaders don't hold the bar, or they hold it in ways that create fear. This program builds the third path: honest, humane, and effective.",
    outcomes: [
      "Have difficult conversations without damaging the relationship",
      "Deliver feedback that lands as honest care rather than criticism",
      "Address underperformance early, directly, and constructively",
      "Build a team culture where honest dialogue is the norm",
      "Distinguish between empathy and conflict avoidance — and act accordingly",
    ],
    modules: [
      { week: "Weeks 1–2", title: "The Accountability Gap", desc: "Diagnose your current accountability culture honestly. Where are standards slipping? Where is fear operating? Map the real cost of unaddressed underperformance on your team." },
      { week: "Weeks 3–4", title: "Feedback That Works", desc: "The science and practice of effective feedback. SBI (Situation-Behavior-Impact), COIN, and Radical Candor frameworks applied to real situations from your work — with live role-play." },
      { week: "Weeks 5–6", title: "The Hard Conversation Playbook", desc: "Step-by-step preparation and delivery frameworks for underperformance conversations, expectations resets, and conflict resolution. Practice with actors in simulated scenarios." },
      { week: "Weeks 7–8", title: "Building a Culture of Candor", desc: "Move from individual accountability to team-wide honesty. How to model the behavior, reinforce it structurally, and make courageous dialogue a competitive advantage." },
    ],
    approach: ["Live role-play with professional actors (sessions 4 and 6)", "Weekly real-world application challenges", "Anonymous team pulse data at program start", "Peer coaching circles for accountability", "Manager integration session (optional)"],
    facilitators: "Facilitated by leadership coaches and HR specialists who have worked on the most complex people challenges in scaling organizations.",
  },
  P5: {
    id: "P5",
    targetFactor: "N",
    title: "Leading Under Pressure",
    tagline: "The way you lead when it's hardest is who you actually are.",
    duration: "6 Weeks", format: "Self-Paced + Coaching", level: "All Levels",
    seats: "Unlimited (self-paced)", color: "#7A5CBF", light: "#F0EBF9",
    badge: "High Urgency",
    forProfiles: ["Emotionally Sensitive Connector", "Adaptive Improviser", "Empathetic Innovator"],
    forYou: "For leaders whose stress is visible to their team even when they think they're hiding it — or for those who know their emotional variability is creating uncertainty for the people around them. If your team reads your mood before they read the situation, this program is for you.",
    problem: "Leadership under pressure is not about suppressing emotion — it's about regulating it. The leaders who perform best in crises are not the ones who feel less. They are the ones who have built robust systems for processing, deciding, and communicating clearly when the stakes are highest.",
    outcomes: [
      "Identify your personal pressure triggers before they trigger you",
      "Build a regulation toolkit that works in real-time leadership moments",
      "Separate your emotional state from your decision-making",
      "Communicate with clarity and calm even in genuine crises",
      "Create recovery rituals that restore your capacity quickly",
    ],
    modules: [
      { week: "Module 1", title: "The Stress-Performance Curve", desc: "Understand the neuroscience of pressure, why some stress improves performance and some derails it, and where you currently sit on the curve." },
      { week: "Module 2", title: "Your Trigger Map", desc: "Identify the specific situations, people, and dynamics that reliably spike your stress response. Build a personal early-warning system." },
      { week: "Module 3", title: "Regulation in Real Time", desc: "Evidence-based techniques for in-the-moment regulation: physiological tools, cognitive reframing, the pause practice. Tested in simulated pressure scenarios." },
      { week: "Module 4", title: "Decision-Making Under Pressure", desc: "How cognitive load and emotional arousal affect decision quality. Frameworks for making sound calls when you are least equipped to make them." },
      { week: "Module 5", title: "The Visible Leader", desc: "Your emotional state is data for your team. Learn to communicate your inner state in ways that model resilience rather than instability — and make it safe for others to do the same." },
      { week: "Module 6", title: "Recovery as a Leadership Practice", desc: "Build personal restoration rituals, boundary systems, and recovery architecture that sustains your capacity over time — not just in the next crisis." },
    ],
    approach: ["Self-paced modules with embedded reflection exercises", "Biometric stress tracking integration (optional)", "Two 1-on-1 coaching sessions included", "Daily micro-practices (5 min) between modules", "Partner or peer accountability option"],
    facilitators: "Built with clinical psychologists, performance coaches, and leaders who have navigated genuine organizational crises.",
  },
};

// ─── PROGRAM RECOMMENDATION LOGIC ────────────────────────────────────────────
function recommendPrograms(scores) {
  const sorted = Object.entries(scores).sort((a, b) => a[1] - b[1]);
  const primary = PROGRAMS[{ O: "P1", C: "P2", E: "P3", A: "P4", N: "P5" }[sorted[0][0]]];
  const secondary = PROGRAMS[{ O: "P1", C: "P2", E: "P3", A: "P4", N: "P5" }[sorted[1][0]]];
  return { primary, secondary, gapScores: sorted.slice(0, 2) };
}

// ─── ARCHETYPES ───────────────────────────────────────────────────────────────
const ARCHETYPES = [
  { id: "visionary_catalyst", name: "The Visionary Catalyst", topFactors: ["O", "E"], tagline: "You ignite the future — but the present may struggle to keep up.", summary: "Bold, articulate, and magnetically optimistic. You paint pictures of what could be and rally people toward them. The challenge: grounding vision in execution, and ensuring the people behind you don't burn out chasing your horizon.", strengths: "Inspiring communication, creative problem-solving, future orientation, energizing presence", watchOuts: "Impatience with detail, over-promising, leaving quieter team members behind" },
  { id: "disciplined_anchor", name: "The Disciplined Anchor", topFactors: ["C", "N"], tagline: "You are the bedrock — make sure you don't calcify.", summary: "Reliable, structured, and emotionally steady. You are the person organizations trust with the things that matter most. The challenge: your consistency can tip into rigidity, and your high standards can feel punishing rather than motivating.", strengths: "Accountability, follow-through, composure under pressure, building trust through consistency", watchOuts: "Resistance to change, perfectionism, undervaluing creativity" },
  { id: "people_architect", name: "The People Architect", topFactors: ["A", "E"], tagline: "You build extraordinary teams — now build a culture of candor.", summary: "Warm, connected, and fiercely loyal to the people you lead. You create environments where people feel genuinely valued. The challenge: your relationship-first instinct can make accountability feel like a betrayal.", strengths: "Psychological safety, talent development, cross-functional relationships, inclusive culture", watchOuts: "Avoiding conflict, protecting underperformers, over-promising to individuals" },
  { id: "strategic_pioneer", name: "The Strategic Pioneer", topFactors: ["O", "C"], tagline: "You build what others only imagine — share the blueprints.", summary: "Intellectually rigorous and creatively ambitious. You see patterns others miss and build systems that last. The challenge: communicating your thinking at a pace others can follow, and bringing people into the process.", strengths: "Systems thinking, structured innovation, long-range planning, intellectual depth", watchOuts: "Communicating accessibly, over-engineering, working in isolation" },
  { id: "driven_commander", name: "The Driven Commander", topFactors: ["E", "C"], tagline: "You move mountains — make sure people want to come.", summary: "High-energy, decisive, and results-obsessed. You set the pace and hold the bar. The challenge: your leadership can feel relentless, your standards can feel unachievable, and people may be quietly burning out.", strengths: "Decisiveness, high performance standards, urgency, stakeholder confidence", watchOuts: "Empathy deficits, burnout in teams, undervaluing reflection" },
  { id: "trusted_counselor", name: "The Trusted Counselor", topFactors: ["A", "N"], tagline: "You are the safe harbor — now learn to lead the fleet.", summary: "Deeply empathetic and emotionally steady. People come to you with their hardest problems and feel heard. The challenge: your comfort in the background can leave you under-visible and under-decisive.", strengths: "Emotional safety, crisis support, deep listening, consistent presence", watchOuts: "Under-claiming authority, avoiding bold action, being underestimated" },
  { id: "empathetic_innovator", name: "The Empathetic Innovator", topFactors: ["O", "A"], tagline: "You change the world gently — now give it a deadline.", summary: "Human-centered and creatively alive. You build change around people, not despite them. The challenge: execution can lag inspiration, and bringing everyone along can slow necessary change.", strengths: "Human-centered innovation, co-creation, inclusive ideation, adaptive thinking", watchOuts: "Execution gaps, consensus-seeking at cost of speed, difficulty with hard deadlines" },
  { id: "servant_leader", name: "The Servant Leader", topFactors: ["C", "A"], tagline: "You build trust that lasts — now use it to demand more.", summary: "Principled, consistent, and genuinely committed to the growth of your people. The challenge: your ethic of service can become self-effacing — and your people need you to make bold calls, not just model good ones.", strengths: "Integrity, role modeling, team development, ethical culture", watchOuts: "Over-serving at cost of leading, difficulty asserting authority, avoiding bold decisions" },
];

function getArchetype(scores) {
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const top2 = [sorted[0][0], sorted[1][0]];
  for (const arch of ARCHETYPES) {
    if (arch.topFactors.every(f => top2.includes(f))) return arch;
  }
  return ARCHETYPES.find(a => a.topFactors[0] === sorted[0][0]) || ARCHETYPES[0];
}

const SCALE = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly Agree" },
];

function getScores(answers) {
  const scores = {};
  for (const f of FACTORS) {
    const vals = f.questions.map((_, qi) => answers[`${f.id}-${qi}`] || 0);
    scores[f.id] = vals.reduce((a, b) => a + b, 0) / (f.questions.length * 5);
  }
  return scores;
}

// ─── PENTAGON ─────────────────────────────────────────────────────────────────
function PentagonChart({ scores }) {
  const cx = 160, cy = 155, r = 110;
  const angles = FACTORS.map((_, i) => (Math.PI * 2 * i) / 5 - Math.PI / 2);
  function pt(angle, radius) { return [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)]; }
  return (
    <svg viewBox="0 0 320 310" width="100%" style={{ maxWidth: 340, display: "block", margin: "0 auto" }}>
      {[0.25, 0.5, 0.75, 1].map(l => (
        <polygon key={l} points={angles.map(a => pt(a, r * l).join(",")).join(" ")} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
      ))}
      {angles.map((a, i) => { const [x, y] = pt(a, r); return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(0,0,0,0.06)" strokeWidth="1" />; })}
      <polygon
        points={FACTORS.map((f, i) => { const [x, y] = pt(angles[i], r * (scores[f.id] || 0)); return `${x},${y}`; }).join(" ")}
        fill="rgba(74,144,164,0.12)" stroke="#4A90A4" strokeWidth="2"
      />
      {FACTORS.map((f, i) => {
        const [x, y] = pt(angles[i], r * (scores[f.id] || 0));
        return <circle key={f.id} cx={x} cy={y} r={5} fill={f.color} stroke="white" strokeWidth="2" />;
      })}
      {FACTORS.map((f, i) => {
        const [x, y] = pt(angles[i], r + 26);
        const anchor = x < cx - 5 ? "end" : x > cx + 5 ? "start" : "middle";
        return (
          <g key={f.id}>
            <text x={x} y={y - 4} textAnchor={anchor} fill={f.color} style={{ fontSize: 10.5, fontFamily: "'DM Mono', monospace", letterSpacing: "0.05em", textTransform: "uppercase" }}>{f.label}</text>
            <text x={x} y={y + 11} textAnchor={anchor} fill="rgba(30,30,30,0.4)" style={{ fontSize: 9, fontFamily: "'DM Mono', monospace" }}>{Math.round((scores[f.id] || 0) * 100)}%</text>
          </g>
        );
      })}
    </svg>
  );
}

function Bar({ value, color }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
      <div style={{ flex: 1, height: 5, background: "rgba(0,0,0,0.07)", borderRadius: 3, overflow: "hidden" }}>
        <div style={{ width: `${Math.round(value * 100)}%`, height: "100%", background: color, borderRadius: 3, transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)" }} />
      </div>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: "rgba(26,26,26,0.4)", minWidth: 30 }}>{Math.round(value * 100)}%</span>
    </div>
  );
}

// ─── PROGRAM PAGE ─────────────────────────────────────────────────────────────
function ProgramPage({ program, scores, onBack }) {
  const [activeSection, setActiveSection] = useState("overview");
  const factorScore = scores[program.targetFactor] || 0;
  const factor = FACTORS.find(f => f.id === program.targetFactor);

  return (
    <div style={{ animation: "fadeUp 0.5s ease both" }}>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(26,26,26,0.4)", display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "1.5rem", padding: 0 }}>
          ← Back to Results
        </button>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
          <div style={{ flex: 1 }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: program.color, display: "block", marginBottom: "0.5rem" }}>
              {program.badge} · Recommended for Your Profile
            </span>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 5vw, 2.6rem)", fontWeight: 400, color: "#1A1A1A", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
              {program.title}
            </h1>
            <p style={{ fontSize: "1rem", color: "rgba(26,26,26,0.55)", fontStyle: "italic" }}>{program.tagline}</p>
          </div>
        </div>

        {/* Meta strip */}
        <div style={{ display: "flex", gap: "0", marginTop: "1.5rem", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 4, overflow: "hidden", background: "white" }}>
          {[["Duration", program.duration], ["Format", program.format], ["Level", program.level], ["Cohort Size", program.seats]].map(([k, v]) => (
            <div key={k} style={{ flex: 1, padding: "0.9rem 1rem", borderRight: "1px solid rgba(0,0,0,0.08)" }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(26,26,26,0.35)", marginBottom: "0.25rem" }}>{k}</div>
              <div style={{ fontSize: "0.8rem", fontWeight: 500, color: "#1A1A1A" }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Your match score */}
      <div style={{ background: program.light, border: `1px solid ${program.color}30`, borderRadius: 4, padding: "1.2rem 1.5rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
        <div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: program.color, marginBottom: "0.3rem" }}>Your {factor?.label} Score</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 400, color: program.color }}>{Math.round(factorScore * 100)}%</div>
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <Bar value={factorScore} color={program.color} />
          <p style={{ fontSize: "0.8rem", color: "rgba(26,26,26,0.6)", lineHeight: 1.65, marginTop: "0.6rem" }}>{program.forYou}</p>
        </div>
      </div>

      {/* Section tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid rgba(0,0,0,0.1)", marginBottom: "1.5rem" }}>
        {[["overview", "Overview"], ["curriculum", "Curriculum"], ["approach", "Approach"]].map(([id, label]) => (
          <button key={id} onClick={() => setActiveSection(id)} style={{ padding: "0.65rem 1.1rem", fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", background: "none", border: "none", borderBottom: `2px solid ${activeSection === id ? "#1A1A1A" : "transparent"}`, cursor: "pointer", color: activeSection === id ? "#1A1A1A" : "rgba(26,26,26,0.4)", marginBottom: -1, transition: "all 0.2s" }}>
            {label}
          </button>
        ))}
      </div>

      {/* Overview */}
      {activeSection === "overview" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 4, padding: "1.5rem", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(26,26,26,0.35)", marginBottom: "1rem" }}>The Problem This Solves</div>
            <p style={{ fontSize: "0.86rem", lineHeight: 1.75, color: "rgba(26,26,26,0.65)" }}>{program.problem}</p>
          </div>
          <div style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 4, padding: "1.5rem", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(26,26,26,0.35)", marginBottom: "1rem" }}>What You Will Leave With</div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {program.outcomes.map((o, i) => (
                <li key={i} style={{ display: "flex", gap: "0.6rem", fontSize: "0.83rem", color: "rgba(26,26,26,0.65)", lineHeight: 1.55 }}>
                  <span style={{ color: program.color, flexShrink: 0, marginTop: "0.05rem" }}>→</span>
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ gridColumn: "1 / -1", background: "white", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 4, padding: "1.5rem", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(26,26,26,0.35)", marginBottom: "1rem" }}>About the Facilitators</div>
            <p style={{ fontSize: "0.86rem", lineHeight: 1.75, color: "rgba(26,26,26,0.65)" }}>{program.facilitators}</p>
          </div>
        </div>
      )}

      {/* Curriculum */}
      {activeSection === "curriculum" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
          {program.modules.map((mod, i) => (
            <div key={i} style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 4, padding: "1.4rem 1.5rem", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", display: "flex", gap: "1.2rem" }}>
              <div style={{ minWidth: 90 }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase", color: program.color }}>{mod.week}</span>
              </div>
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 400, color: "#1A1A1A", marginBottom: "0.4rem" }}>{mod.title}</h3>
                <p style={{ fontSize: "0.83rem", lineHeight: 1.7, color: "rgba(26,26,26,0.6)" }}>{mod.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Approach */}
      {activeSection === "approach" && (
        <div style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 4, padding: "1.8rem", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(26,26,26,0.35)", marginBottom: "1.2rem" }}>Program Methodology</div>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            {program.approach.map((a, i) => (
              <li key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", padding: "0.9rem 1rem", background: program.light, borderRadius: 3, border: `1px solid ${program.color}25` }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: program.color, marginTop: "0.05rem", flexShrink: 0 }}>0{i + 1}</span>
                <span style={{ fontSize: "0.85rem", color: "rgba(26,26,26,0.7)", lineHeight: 1.6 }}>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Enroll CTA */}
      <div style={{ background: "#1A1A1A", borderRadius: 4, padding: "2rem", marginTop: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1.5rem", flexWrap: "wrap" }}>
        <div>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,232,0.4)", marginBottom: "0.3rem" }}>Ready to Begin?</p>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", fontWeight: 400, color: "#F5F0E8", marginBottom: "0.3rem" }}>{program.title}</p>
          <p style={{ fontSize: "0.8rem", color: "rgba(245,240,232,0.45)" }}>Next cohort enrolling now · {program.seats}</p>
        </div>
        <button onClick={() => alert("Connect this to your enrollment / payment system.")}
          style={{ background: program.color, color: "white", border: "none", padding: "0.9rem 2rem", fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", borderRadius: 2, whiteSpace: "nowrap", flexShrink: 0 }}>
          Enroll in This Program →
        </button>
      </div>
    </div>
  );
}

// ─── PROGRAM CARD (in results) ────────────────────────────────────────────────
function ProgramCard({ program, scores, rank, onOpen }) {
  const factorScore = scores[program.targetFactor] || 0;
  return (
    <div style={{ background: "white", border: `1px solid ${rank === 1 ? program.color + "60" : "rgba(0,0,0,0.08)"}`, borderRadius: 4, padding: "1.5rem", boxShadow: "0 2px 16px rgba(0,0,0,0.05)", cursor: "pointer", transition: "all 0.2s" }}
      onClick={onOpen}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,0.1)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.05)"; }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.8rem", gap: "0.5rem" }}>
        <div>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: program.color, display: "block", marginBottom: "0.3rem" }}>
            {rank === 1 ? "★ Primary Recommendation" : "Also Recommended"} · {program.badge}
          </span>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", fontWeight: 400, color: "#1A1A1A", lineHeight: 1.2 }}>{program.title}</h3>
        </div>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: program.color, background: program.light, padding: "0.25rem 0.6rem", borderRadius: 2, flexShrink: 0 }}>
          {Math.round(factorScore * 100)}% {FACTORS.find(f => f.id === program.targetFactor)?.label}
        </span>
      </div>
      <p style={{ fontSize: "0.82rem", color: "rgba(26,26,26,0.55)", lineHeight: 1.65, marginBottom: "1rem", fontStyle: "italic" }}>{program.tagline}</p>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
        {[program.duration, program.format, program.level].map(m => (
          <span key={m} style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.08em", padding: "0.2rem 0.5rem", borderRadius: 2, background: "rgba(0,0,0,0.04)", color: "rgba(26,26,26,0.5)" }}>{m}</span>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Bar value={factorScore} color={program.color} />
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: program.color, marginLeft: "1rem", flexShrink: 0 }}>View Program →</span>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [phase, setPhase] = useState("intro");
  const [factorIdx, setFactorIdx] = useState(0);
  const [qIdx, setQIdx] = useState(0);
  const [showFactorIntro, setShowFactorIntro] = useState(true);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [fading, setFading] = useState(false);
  const [activeTab, setActiveTab] = useState("programs");
  const [openProgram, setOpenProgram] = useState(null);

  const currentFactor = FACTORS[factorIdx];
  const totalQ = FACTORS.reduce((s, f) => s + f.questions.length, 0);
  const answeredCount = Object.keys(answers).length;
  const progress = answeredCount / totalQ;

  const scores = getScores(answers);
  const archetype = phase === "results" ? getArchetype(scores) : null;
  const { primary, secondary } = phase === "results" ? recommendPrograms(scores) : {};

  const sortedFactors = [...FACTORS].sort((a, b) => (scores[b.id] || 0) - (scores[a.id] || 0));
  const topFactors = sortedFactors.slice(0, 2);
  const gapFactors = sortedFactors.slice(-2).reverse();

  function handleAnswer(val) {
    setSelected(val);
    const key = `${currentFactor.id}-${qIdx}`;
    const newAnswers = { ...answers, [key]: val };
    setAnswers(newAnswers);
    setFading(true);
    setTimeout(() => {
      setSelected(null); setFading(false);
      if (qIdx < currentFactor.questions.length - 1) { setQIdx(qIdx + 1); }
      else if (factorIdx < FACTORS.length - 1) { setFactorIdx(factorIdx + 1); setQIdx(0); setShowFactorIntro(true); }
      else { setPhase("results"); setActiveTab("programs"); }
    }, 320);
  }

  function retake() {
    setPhase("intro"); setFactorIdx(0); setQIdx(0);
    setAnswers({}); setSelected(null); setShowFactorIntro(true); setFading(false); setOpenProgram(null);
  }

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@300;400;500&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    body{background:#F5F0E8;color:#1A1A1A;font-family:'DM Sans',sans-serif;min-height:100vh;}
    .app{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding:2.5rem 1.5rem;position:relative;}
    .texture{position:fixed;inset:0;z-index:0;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Ccircle cx='1' cy='1' r='0.5' fill='rgba(0,0,0,0.04)'/%3E%3C/svg%3E");}
    .progress-strip{position:fixed;top:0;left:0;right:0;height:3px;z-index:100;background:rgba(0,0,0,0.08);}
    .progress-fill{height:100%;background:linear-gradient(90deg,#4A90A4,#3A8A68);transition:width 0.5s cubic-bezier(0.4,0,0.2,1);}
    .wrap{position:relative;z-index:1;width:100%;max-width:740px;padding-top:1rem;}
    @keyframes fadeUp{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);}}
    
    .intro{animation:fadeUp 0.7s ease both;}
    .eyebrow{font-family:'DM Mono',monospace;font-size:0.62rem;letter-spacing:0.22em;text-transform:uppercase;color:#4A90A4;margin-bottom:1.5rem;display:block;}
    .intro-title{font-family:'Playfair Display',serif;font-size:clamp(2.2rem,6vw,3.6rem);font-weight:400;line-height:1.1;letter-spacing:-0.02em;margin-bottom:1.2rem;color:#1A1A1A;}
    .intro-title em{font-style:italic;color:#4A90A4;}
    .intro-body{font-size:0.95rem;font-weight:300;line-height:1.85;color:rgba(26,26,26,0.6);max-width:520px;margin-bottom:2rem;}
    .ocean-grid{display:flex;flex-wrap:wrap;gap:0.5rem;margin-bottom:2rem;}
    .ocean-chip{display:flex;align-items:center;gap:0.4rem;padding:0.4rem 0.75rem;border-radius:2px;font-family:'DM Mono',monospace;font-size:0.62rem;letter-spacing:0.1em;text-transform:uppercase;border:1px solid;}
    .meta-strip{display:flex;gap:2.5rem;margin-bottom:2.5rem;padding:1.2rem 0;border-top:1px solid rgba(0,0,0,0.08);border-bottom:1px solid rgba(0,0,0,0.08);}
    .meta-item{display:flex;flex-direction:column;}
    .meta-num{font-family:'Playfair Display',serif;font-size:1.9rem;font-weight:400;color:#1A1A1A;line-height:1;}
    .meta-sub{font-family:'DM Mono',monospace;font-size:0.58rem;letter-spacing:0.15em;text-transform:uppercase;color:rgba(26,26,26,0.4);margin-top:0.3rem;}
    .btn-start{background:#1A1A1A;color:#F5F0E8;border:none;padding:0.9rem 2.2rem;font-family:'DM Sans',sans-serif;font-size:0.82rem;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;cursor:pointer;transition:all 0.2s;border-radius:2px;}
    .btn-start:hover{background:#333;}

    .factor-intro{background:white;border:1px solid rgba(0,0,0,0.08);border-radius:4px;padding:3rem 2.5rem;text-align:center;animation:fadeUp 0.4s ease both;box-shadow:0 4px 24px rgba(0,0,0,0.05);}
    .btn-ghost{background:transparent;border:1px solid rgba(0,0,0,0.18);color:rgba(26,26,26,0.65);padding:0.65rem 1.6rem;font-family:'DM Sans',sans-serif;font-size:0.78rem;letter-spacing:0.07em;text-transform:uppercase;cursor:pointer;transition:all 0.2s;border-radius:2px;}
    .btn-ghost:hover{border-color:rgba(0,0,0,0.4);color:#1A1A1A;}

    .q-card{background:white;border:1px solid rgba(0,0,0,0.08);border-radius:4px;padding:2.5rem;animation:fadeUp 0.35s ease both;box-shadow:0 4px 24px rgba(0,0,0,0.05);transition:opacity 0.28s,transform 0.28s;}
    .q-card.fade{opacity:0;transform:translateY(-6px);}
    .scale-wrap{display:flex;flex-direction:column;gap:0.55rem;}
    .scale-btn{display:flex;align-items:center;gap:1rem;padding:0.8rem 1.1rem;border:1px solid rgba(0,0,0,0.1);border-radius:3px;cursor:pointer;background:transparent;text-align:left;transition:all 0.16s;width:100%;}
    .scale-btn:hover{border-color:rgba(0,0,0,0.25);background:rgba(0,0,0,0.02);}

    .tab-bar{display:flex;border-bottom:1px solid rgba(0,0,0,0.1);margin-bottom:2rem;gap:0;}
    .tab-btn{padding:0.7rem 1.1rem;font-family:'DM Mono',monospace;font-size:0.6rem;letter-spacing:0.14em;text-transform:uppercase;background:transparent;border:none;border-bottom:2px solid transparent;cursor:pointer;color:rgba(26,26,26,0.4);transition:all 0.2s;margin-bottom:-1px;}
    .tab-btn.active{color:#1A1A1A;border-bottom-color:#1A1A1A;}
    .tab-btn:hover:not(.active){color:rgba(26,26,26,0.7);}

    @media(max-width:580px){
      .meta-strip{gap:1.2rem;}
      .intro-title{font-size:2rem;}
    }
  `;

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <div className="texture" />
        {phase !== "intro" && !openProgram && (
          <div className="progress-strip">
            <div className="progress-fill" style={{ width: `${progress * 100}%` }} />
          </div>
        )}
        <div className="wrap">

          {/* ── INTRO ── */}
          {phase === "intro" && (
            <div className="intro">
              <span className="eyebrow">Big Five Leadership Assessment</span>
              <h1 className="intro-title">Understand how your<br /><em>personality shapes</em><br />your leadership.</h1>
              <p className="intro-body">Grounded in the Big Five (OCEAN) — the most rigorously validated personality framework in psychology — this assessment reveals how your natural dispositions show up in your leadership, where your wiring serves you, and which development programs will move the needle most for you specifically.</p>
              <div className="ocean-grid">
                {FACTORS.map(f => (
                  <div key={f.id} className="ocean-chip" style={{ color: f.color, borderColor: f.color + "40", background: f.light }}>
                    <span>{f.icon}</span><span>{f.label}</span>
                  </div>
                ))}
              </div>
              <div className="meta-strip">
                {[["25", "Questions"], ["5", "OCEAN Factors"], ["~10", "Minutes"], ["5", "Programs"]].map(([n, l]) => (
                  <div key={l} className="meta-item"><span className="meta-num">{n}</span><span className="meta-sub">{l}</span></div>
                ))}
              </div>
              <button className="btn-start" onClick={() => setPhase("question")}>Begin Assessment →</button>
            </div>
          )}

          {/* ── FACTOR INTRO ── */}
          {phase === "question" && showFactorIntro && (
            <div className="factor-intro">
              <span style={{ fontSize: "2.2rem", marginBottom: "0.8rem", display: "block", color: currentFactor.color }}>{currentFactor.icon}</span>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(26,26,26,0.35)", marginBottom: "0.5rem" }}>Factor {factorIdx + 1} of {FACTORS.length}</p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 400, color: currentFactor.color, marginBottom: "0.3rem" }}>{currentFactor.label}</h2>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: currentFactor.color + "90", marginBottom: "1rem" }}>{currentFactor.subtitle}</p>
              <p style={{ fontSize: "0.9rem", lineHeight: 1.75, color: "rgba(26,26,26,0.55)", maxWidth: "420px", margin: "0 auto 1.8rem" }}>{currentFactor.description}</p>
              <button className="btn-ghost" onClick={() => setShowFactorIntro(false)}>Begin this section →</button>
            </div>
          )}

          {/* ── QUESTION ── */}
          {phase === "question" && !showFactorIntro && (
            <div className={`q-card ${fading ? "fade" : ""}`}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "2rem" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: currentFactor.color, flexShrink: 0 }} />
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(26,26,26,0.4)" }}>{currentFactor.label} · {currentFactor.subtitle}</span>
                <span style={{ marginLeft: "auto", fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: "rgba(26,26,26,0.25)" }}>{answeredCount + 1} / {totalQ}</span>
              </div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.2rem, 3.5vw, 1.7rem)", fontWeight: 400, lineHeight: 1.45, color: "#1A1A1A", marginBottom: "2.2rem", letterSpacing: "-0.01em" }}>
                "{currentFactor.questions[qIdx]}"
              </p>
              <div className="scale-wrap">
                {SCALE.map(s => (
                  <button key={s.value} className={`scale-btn ${selected === s.value ? "active" : ""}`}
                    style={selected === s.value ? { borderColor: currentFactor.color, background: currentFactor.light } : {}}
                    onClick={() => handleAnswer(s.value)}>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: selected === s.value ? currentFactor.color : "rgba(26,26,26,0.3)", minWidth: 16 }}>{s.value}</span>
                    <span style={{ fontSize: "0.82rem", color: selected === s.value ? currentFactor.color : "rgba(26,26,26,0.6)", fontWeight: selected === s.value ? 500 : 300 }}>{s.label}</span>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: currentFactor.color, marginLeft: "auto", opacity: selected === s.value ? 1 : 0, transition: "opacity 0.15s" }} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── RESULTS ── */}
          {phase === "results" && !openProgram && archetype && (
            <div style={{ animation: "fadeUp 0.6s ease both" }}>
              <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#4A90A4", marginBottom: "0.8rem", display: "block" }}>Your Leadership Archetype</span>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 400, color: "#1A1A1A", lineHeight: 1.1, marginBottom: "0.6rem", letterSpacing: "-0.02em" }}>
                  <em style={{ fontStyle: "italic", color: "#4A90A4" }}>{archetype.name}</em>
                </h1>
                <p style={{ fontSize: "0.9rem", color: "rgba(26,26,26,0.5)", fontStyle: "italic" }}>"{archetype.tagline}"</p>
              </div>

              <div className="tab-bar">
                {[["programs", "Your Programs"], ["profile", "Profile"], ["scores", "OCEAN Scores"], ["gaps", "Growth Areas"], ["coaching", "Coaching"]].map(([id, label]) => (
                  <button key={id} className={`tab-btn ${activeTab === id ? "active" : ""}`} onClick={() => setActiveTab(id)}>{label}</button>
                ))}
              </div>

              {/* PROGRAMS TAB */}
              {activeTab === "programs" && (
                <div>
                  <p style={{ fontSize: "0.86rem", color: "rgba(26,26,26,0.55)", lineHeight: 1.75, marginBottom: "1.5rem" }}>
                    Based on your OCEAN profile, these programs are matched to your specific leadership gaps. Your primary recommendation targets your lowest-scoring factor — the area where focused development will have the greatest leverage on your overall effectiveness.
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
                    {primary && <ProgramCard program={primary} scores={scores} rank={1} onOpen={() => setOpenProgram(primary)} />}
                    {secondary && secondary.id !== primary?.id && <ProgramCard program={secondary} scores={scores} rank={2} onOpen={() => setOpenProgram(secondary)} />}
                  </div>
                  <div style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 4, padding: "1.2rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem", justifyContent: "space-between", flexWrap: "wrap" }}>
                    <div>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(26,26,26,0.35)", marginBottom: "0.3rem" }}>All Available Programs</div>
                      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                        {Object.values(PROGRAMS).map(p => (
                          <button key={p.id} onClick={() => setOpenProgram(p)}
                            style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.1em", padding: "0.28rem 0.65rem", borderRadius: 2, border: `1px solid ${p.color}40`, background: p.light, color: p.color, cursor: "pointer", transition: "all 0.15s" }}>
                            {p.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PROFILE TAB */}
              {activeTab === "profile" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div style={{ gridColumn: "1/-1" }}><PentagonChart scores={scores} /></div>
                  <div style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 4, padding: "1.4rem", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(26,26,26,0.35)", marginBottom: "0.8rem" }}>Profile Summary</div>
                    <p style={{ fontSize: "0.85rem", lineHeight: 1.75, color: "rgba(26,26,26,0.65)" }}>{archetype.summary}</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 4, padding: "1.4rem", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(26,26,26,0.35)", marginBottom: "0.7rem" }}>Natural Strengths</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                        {archetype.strengths.split(", ").map(s => <span key={s} style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.08em", padding: "0.25rem 0.6rem", borderRadius: 2, border: "1px solid #3A8A6840", background: "#E8F5EE", color: "#3A8A68" }}>{s}</span>)}
                      </div>
                    </div>
                    <div style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 4, padding: "1.4rem", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(26,26,26,0.35)", marginBottom: "0.7rem" }}>Watch-Outs</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                        {archetype.watchOuts.split(", ").map(w => <span key={w} style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.08em", padding: "0.25rem 0.6rem", borderRadius: 2, border: "1px solid #C05A3A40", background: "#FAEEE9", color: "#C05A3A" }}>{w}</span>)}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SCORES TAB */}
              {activeTab === "scores" && (
                <div style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 4, padding: "1.8rem", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", display: "flex", flexDirection: "column", gap: "1.4rem" }}>
                  {FACTORS.map(f => (
                    <div key={f.id}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.4rem" }}>
                        <span style={{ color: f.color }}>{f.icon}</span>
                        <span style={{ fontSize: "0.88rem", fontWeight: 500 }}>{f.label}</span>
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", marginLeft: "auto", color: "rgba(26,26,26,0.35)" }}>{scores[f.id] >= 0.65 ? f.highLabel : f.lowLabel}</span>
                      </div>
                      <Bar value={scores[f.id]} color={f.color} />
                      <p style={{ fontSize: "0.8rem", color: "rgba(26,26,26,0.55)", lineHeight: 1.65, marginTop: "0.3rem" }}>{scores[f.id] >= 0.65 ? f.highInsight : f.lowInsight}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* GAPS TAB */}
              {activeTab === "gaps" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  {topFactors.map(f => (
                    <div key={f.id} style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 4, padding: "1.4rem", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.2rem 0.5rem", borderRadius: 2, background: "#E8F5EE", color: "#3A8A68", display: "inline-block", marginBottom: "0.7rem" }}>↑ Foundation Strength</span>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.6rem" }}><span style={{ color: f.color }}>{f.icon}</span><h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 400 }}>{f.label}</h3></div>
                      <Bar value={scores[f.id]} color={f.color} />
                      <p style={{ fontSize: "0.82rem", lineHeight: 1.7, color: "rgba(26,26,26,0.6)", marginTop: "0.7rem" }}>{f.highInsight}</p>
                    </div>
                  ))}
                  {gapFactors.map(f => (
                    <div key={f.id} style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 4, padding: "1.4rem", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.2rem 0.5rem", borderRadius: 2, background: "#FAEEE9", color: "#C05A3A", display: "inline-block", marginBottom: "0.7rem" }}>↓ Priority Growth Area</span>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.6rem" }}><span style={{ color: f.color }}>{f.icon}</span><h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 400 }}>{f.label}</h3></div>
                      <Bar value={scores[f.id]} color={f.color} />
                      <p style={{ fontSize: "0.82rem", lineHeight: 1.7, color: "rgba(26,26,26,0.6)", marginTop: "0.7rem" }}>{f.lowInsight}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* COACHING TAB */}
              {activeTab === "coaching" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                  <p style={{ fontSize: "0.85rem", color: "rgba(26,26,26,0.5)", lineHeight: 1.75 }}>These questions are designed for deep reflection — individually, in a journal, or as the starting point of a coaching conversation. There are no right answers; only honest ones.</p>
                  {FACTORS.map(f => {
                    const isHigh = scores[f.id] >= 0.65;
                    return (
                      <div key={f.id} style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 4, padding: "1.4rem", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                          <span style={{ color: f.color }}>{f.icon}</span>
                          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(26,26,26,0.4)" }}>{f.label} · {isHigh ? f.highLabel : f.lowLabel}</span>
                        </div>
                        {(isHigh ? f.highCoaching : f.lowCoaching).map((q, i, arr) => (
                          <p key={i} style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.95rem", fontWeight: 400, fontStyle: "italic", color: "#1A1A1A", lineHeight: 1.55, paddingLeft: "0.8rem", borderLeft: `2px solid ${f.color}`, marginBottom: i < arr.length - 1 ? "0.8rem" : 0 }}>{q}</p>
                        ))}
                      </div>
                    );
                  })}
                </div>
              )}

              <button onClick={retake} style={{ display: "block", margin: "1.5rem auto 0", background: "transparent", border: "1px solid rgba(0,0,0,0.15)", color: "rgba(26,26,26,0.45)", padding: "0.55rem 1.3rem", fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s", borderRadius: 2 }}>
                ↺ Retake Assessment
              </button>
            </div>
          )}

          {/* ── PROGRAM PAGE ── */}
          {phase === "results" && openProgram && (
            <ProgramPage program={openProgram} scores={scores} onBack={() => setOpenProgram(null)} />
          )}

        </div>
      </div>
    </>
  );
}
