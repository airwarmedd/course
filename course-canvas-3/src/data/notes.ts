// Full study notes for each resource — enough to grasp the source without opening it.
// Keyed by the resource's exact label string.

export const resourceNotes: Record<string, string[]> = {
  'Articulated Robotics — "Making a Mobile Robot" #1': [
    "The whole point of watching this: see how much manual work one robot takes, and pick up vocabulary by osmosis. You are not meant to follow every step.",
    "The series builds a two-wheeled 'differential drive' robot — the simplest useful mobile robot. Two powered wheels do all the moving: spin them together to go straight, spin them opposite ways to turn on the spot. A free-rolling 'caster' wheel keeps it from tipping. This differential-drive setup is the 'hello world' of mobile robotics and it's what most Drift demos spin up too.",
    "Josh (the creator) works in the exact stack Drift automates: ROS 2 for the software plumbing, URDF to describe the robot's body, Gazebo to simulate it, RViz to visualise it. Over the series he hand-writes each of these. Watch how many separate files and commands one small robot demands — that manual burden is the 'before' picture in every Drift story you'll tell.",
    "Takeaway you can repeat back: a robot is built as body (URDF) + brain-plumbing (ROS) + a place to test it (Gazebo/RViz), and wiring those together by hand is slow and fiddly even for an expert.",
  ],
  "Drift docs introduction (docs.godrift.ai)": [
    "This is a deliberate 'before' snapshot, not a study source. Read it on Day 1 and again on Day 5, and notice how many words made no sense the first time and click the second time. That delta is your progress bar.",
    "What to look for: how Drift describes the problem (setup takes days, breaks constantly) and the solution (natural-language commands that scaffold and debug a ROS/Gazebo project). Note the specific nouns — URDF, launch files, topics, RViz — because by Week 1's end you'll own all of them.",
    "Save your Day-1 reaction in a note. In Week 4 you compare what the docs *claim* against what you've learned users actually feel, and that gap is where honest positioning lives.",
  ],
  'Gazebo "Getting started" (gazebosim.org/docs)': [
    "Gazebo is the simulator — the 3D physics world where a virtual robot lives before it exists in metal. It computes gravity, friction, and collisions, and feeds fake-but-realistic sensor data (camera, lidar) to the robot's software so the same code can later run on real hardware.",
    "You're skimming for two things: what the interface looks like (a 3D world with a robot in it, plus panels of settings) and the vocabulary of 'world files' (the environment description) and 'plugins' (add-ons that give the sim extra abilities like a specific sensor).",
    "One confusing thing worth knowing so it doesn't trip you later: there are two Gazebos. An older 'Gazebo Classic' and a rewritten modern 'Gazebo' (briefly called 'Ignition'). Tutorials mix them and their commands differ, which generates a steady stream of 'why doesn't this work' forum threads. That confusion is itself part of the setup pain Drift sells against.",
  ],
  'Articulated Robotics — "Describing robots with URDF"': [
    "URDF (Unified Robot Description Format) is the robot's body described in a text file. It's XML — lots of angle-bracket tags — and it defines links (rigid parts like a wheel or arm segment) and joints (the moving connections between them, like a wheel's axle or an elbow).",
    "Two fields cause most URDF misery, and knowing them makes you sound literate: inertia (how a part resists spinning) and collision geometry (a simplified shape used to compute crashes). Get inertia wrong and the simulated robot jitters, wobbles, or flips the instant it appears. Get collision geometry wrong and it sinks through the floor or bumps into nothing.",
    "Watching someone hand-write URDF for fifteen minutes is the point — it's tedious, repetitive, and error-prone. When Drift's site brags about generating 'URDF with correct inertia and collision geometry,' this is exactly the chore it's removing. That phrase is not filler; it names a real, specific pain.",
    "Bonus term you'll see: 'xacro,' a shortcut system that lets engineers avoid repeating themselves in URDF. You don't need to use it — just recognise it as 'URDF with macros.'",
  ],
  "docs.ros.org — Concepts: Nodes and Topics": [
    "ROS (Robot Operating System) isn't an operating system — it's middleware, the messaging system that lets the many small programs inside a robot talk to each other. Think of a newsroom.",
    "A node is one program doing one job (camera driver, path planner, motor controller). A topic is a named channel that carries a stream of messages. A node publishes to a topic; other nodes subscribe to receive. The camera node publishes images; the perception node subscribes to them.",
    "The one topic name to memorise is /cmd_vel — it carries velocity commands ('drive forward at 0.5 m/s, turn at 0.2 rad/s'). A huge share of beginner debugging boils down to 'I'm publishing to /cmd_vel and the robot won't move,' which means something between the command and the wheels is broken.",
    "Also meet 'service': a one-off request-and-reply between nodes (ask once, get an answer), as opposed to a topic's continuous stream. Nodes + topics + services is 90% of what you need to read a ROS thread.",
  ],
  '"ROS 2 nodes and topics explained" (The Construct)': [
    "Same concepts as the docs, but animated — watch the messages travel between nodes as moving dots. If the newsroom model didn't fully land from reading, seeing the flow usually locks it in.",
    "The Construct is a well-known ROS training company; their short explainers are reliable and beginner-safe. Good channel to keep for whenever a term stumps you later.",
    "After this you should be able to say, unprompted: nodes are programs, topics are the channels between them, publishers send and subscribers receive, and the whole graph is invisible until something breaks — which is why debugging it is hard and why Drift's 'inspect the live system' pitch matters.",
  ],
  'docs.ros.org tutorials: "Creating a workspace" and "Creating a package"': [
    "Don't do these tutorials — read them and count the steps. That's the exercise.",
    "Vocabulary: a package is a folder bundling related code and configs; a workspace is the parent folder holding all your packages. You 'build' the workspace with a tool called colcon, then 'source' it so your terminal knows where everything is. Forgetting to source is the classic rookie error — 'did you source your workspace?' is the ROS equivalent of 'have you tried turning it off and on again.'",
    "The takeaway is emotional, not technical: notice that before you've done anything interesting, you've already created folders, built, and sourced — pure setup overhead. Multiply that across URDF, world files, controllers, and launch files and you see why 'days of setup' is literal, not marketing exaggeration.",
  ],
  'r/ROS: search "launch file not working," read 2 threads': [
    "A launch file is a script that starts many nodes at once with the right settings — real robots need 10-30 nodes running together, so nobody starts them by hand. Launch files are powerful and notoriously fragile: a small typo often fails silently, so everything 'runs' and nothing works.",
    "Reading two real stuck-at-1am threads gives you the tone and shape of user pain in their own words. Notice the structure: they post their environment (ROS version, OS), what they tried, and the error text, then strangers triage it. The 'what I tried' section is a diary of wasted hours — pure empathy fuel and future content.",
    "You're not learning to fix launch files. You're learning to recognise this genre of suffering instantly, because 'launch config that fails silently' is one of Drift's sharpest value stories.",
  ],
  "Articulated Robotics — RViz/Gazebo episode": [
    "The single most useful distinction in this whole course: Gazebo vs RViz. Gazebo is the simulated world as it truly is (ground truth physics). RViz shows the world as the robot *believes* it to be — its sensor readings, its estimated position, its planned path. Gazebo is reality; RViz is the robot's mind.",
    "Engineers run both side by side constantly. Confusing them marks you as an outsider; stating the difference crisply marks you as someone who gets it. RViz also needs its own config file to display the right things, which is one more setup chore Drift handles ('opens RViz with the right config').",
    "Watch just enough to see the two windows next to each other — the mental image is what sticks. After this you can decode a sentence like 'it looks fine in Gazebo but RViz shows no laser scan,' which means the world is fine but the robot isn't receiving/interpreting its sensor data.",
  ],
  "Drift docs feature list (docs.godrift.ai)": [
    "Re-read the feature list now, at the end of Week 1, as a comprehension test. Terms that were opaque on Day 1 — URDF, launch files, topics, RViz config, QoS — should now read as plain English.",
    "For each feature, ask: which specific pain from my week does this remove? 'Generates launch files' removes the silent-failure genre. 'Inspects running nodes and topic connections' removes the invisible-graph debugging. Mapping features to felt pains is literally the positioning work you'll formalise in Week 4.",
    "If any term still stumps you, that's your signal for what to review — the docs double as a self-diagnostic.",
  ],
  'r/robotics: "Gazebo vs Isaac Sim" thread': [
    "Read one comparison thread to hear tribe members argue in their own words. You'll see the trade-offs surface naturally: Gazebo is lighter and ROS-native; Isaac Sim is gorgeous and powerful but hardware-hungry and heavier to set up.",
    "Note the emotional subtext — people defend their simulator like a sports team. That loyalty is useful intelligence: 'which simulator do you support' is never a neutral feature question, it's an identity question, and your content should respect that.",
    "Collect any vivid phrases users use for pain ('spent a weekend just getting it to launch') — these are the exact words that make ad copy and Reddit replies land.",
  ],
  'OpenAI "domain randomization" blog post': [
    "This explains the standard fix for the sim-to-real gap, and it's the one robot-learning idea worth understanding at concept level.",
    "The problem: simulated physics never perfectly matches reality (estimated friction, unmodelled motor quirks, cleaner-than-real sensors), so a skill learned in sim can fail on the real robot. Domain randomization is the countermeasure: during training, randomly vary the uncertain parameters — friction, lighting, masses, sensor noise, object positions. The robot then can't overfit to one specific fake world; it learns to handle a whole range, and reality usually falls inside that range.",
    "The classic images are a robot hand trained across thousands of randomly-coloured, randomly-lit virtual rooms so it works in a real one. Your one-line version: 'train across many messy fake worlds so the real world is just one more variation.'",
    "Why you care: this is what a skeptical engineer means when they probe sim-to-real. Drift doesn't close the gap (no setup tool does) — it speeds up iteration so teams get more cycles to apply randomization and hardware testing. That's the honest, defensible framing.",
  ],
  "Sim-to-real thread on Drift's Product Hunt page": [
    "Read the actual sim-to-real question a commenter asked Drift, and the founders' reply. This exact objection will reach your inbox, so study how it's phrased and answered.",
    "The gap between sim and reality is the standing objection to ALL simulation tooling, so it comes up whenever a serious person evaluates Drift. The trap is over-claiming; the win is conceding the gap is real, then reframing Drift's value as setup-and-iteration speed rather than physics fidelity.",
    "Draft your own 150-word answer after reading (that's the Day 7 output). If yours is clearer or more honest than the founders' reply, that's a concrete example of the value you add to the team.",
  ],
  "huggingface.co/lerobot + LeRobot GitHub README": [
    "LeRobot is Hugging Face's open-source robot-learning library and the community around it — one of the named targets in Drift's growth strategy, so you need to know what it actually is.",
    "In plain terms: it's a toolkit and shared home for people teaching robots via machine learning, with datasets, pretrained models, and cheap hardware guides. The vibe is open, friendly, researcher-and-hobbyist, Discord-centric. It's where a lot of the 'GPT for robots' energy lives in the open.",
    "For growth: this community is receptive, technical, and un-marketed-to. Value-first participation (answering setup questions, sharing genuinely useful things) is the only thing that works here. Skim the README to see the projects and vocabulary so you don't sound like a tourist when you show up.",
  ],
  "Physical Intelligence pi0 announcement": [
    "pi0 (pi-zero) is the most-cited 'GPT for robots' moment — a single AI model that takes camera images plus a plain-language instruction and outputs robot actions (folding laundry, bussing tables). This kind of model is called a VLA: vision-language-action.",
    "You don't need the technical internals. You need the significance: models like this need enormous amounts of practice data, much of it generated in simulation, which is part of why demand for simulation (and tools that make simulation easier) is rising. This is the 'why now' tide under Drift.",
    "Names you'll see alongside it: GR00T (NVIDIA's version) and the LeRobot ecosystem. Being able to say 'VLAs like pi0 and GR00T are driving simulation demand' in one sentence is exactly the fluency this resource buys you.",
  ],
  "ROS Discourse — 5 threads end to end": [
    "ROS Discourse (discourse.ros.org) is the official forum where serious, professional ROS users live — a more senior, more measured crowd than Reddit. Read five threads fully, including all replies, to calibrate the tone you'll need to match if you ever post as a Drift account.",
    "Watch the norms: specificity earns respect ('this looks like a QoS mismatch, run this command to check'), vagueness and self-promotion get ignored. Good answers reference the asker's exact environment and error, and offer a concrete next step.",
    "This is your etiquette training. The single biggest way a marketer torpedoes a technical community is posting generic enthusiasm or a link with no diagnosis. Absorb the register here before you ever contribute.",
  ],
  "Drift's Product Hunt comment section, all of it": [
    "This is a free corpus of real questions asked of YOUR product, with the founders' answers attached — the highest-signal document you'll read all week. Read every comment.",
    "Catalogue the questions: sim-to-real, multi-robot support, how it differs from general AI coding agents, Mac support. These are precisely the questions you must be able to answer without pinging a founder by Week 4 — this thread is a preview of your final exam.",
    "Also grade the founders' answers. Where they over-claim, concede too little, or miss the real worry under the question, you've found something you can do better. That's your job made visible.",
  ],
  "CoRL site + one accepted-papers list": [
    "CoRL (Conference on Robot Learning) is one of the field's big deadlines. Skim its accepted-papers list — you're not reading papers, you're reading twenty titles to learn what the field is obsessed with right now (manipulation, VLAs, sim-to-real appear constantly).",
    "Deadlines matter to your calendar: the weeks before ICRA, IROS, RSS, and CoRL are peak crunch for researchers, which is peak receptivity to anything that saves setup time. Timing content or outreach to those windows is free relevance.",
    "Vocabulary you'll absorb: 'baseline,' 'benchmark,' 'ablation,' 'reproduce.' When a researcher uses these, you'll know you're talking to the academic persona and can speak to reproducibility pain specifically.",
  ],
  "LeRobot Discord — lurk in help channels": [
    "This is an activity, not a reading. Join the LeRobot Discord and lurk in the help channels for ten minutes to watch researchers and hobbyists ask setup questions in real time.",
    "What to notice: how they describe being stuck, which tools recur, how much of the friction is environment/versioning/setup versus the actual robot-learning they came to do. Every 'I can't get X to run' is a data point for your pain inventory and a potential place Drift helps.",
    "Don't pitch. You're building situational awareness and a feel for the community's voice. If you eventually contribute, it's value-first: a genuine answer, never a link-drop.",
  ],
  'HN: "ROS" and "robotics simulation" — read two comment threads': [
    "Hacker News (search via hn.algolia.com) is where the industry-engineer persona argues in its purest, most skeptical form. Read two threads to feel the rhetorical style: technical, blunt, allergic to marketing, quick to call things 'just a wrapper.'",
    "This audience is won by substance and honesty, never enthusiasm. Note how commenters stress-test claims and reward people who concede limitations. Your content aimed at this persona has to survive exactly this scrutiny.",
    "Collect the objections you see verbatim ('another LLM wrapper,' 'breaks on real setups,' 'our stack is too custom'). You'll draft honest answers to each in the Day 18 objection clinic.",
  ],
  "Drift docs known-limitations section": [
    "Read Drift's own limitations page and assess it as champion ammunition. An honest limitations page is one of the most persuasive assets you can hand an industry engineer trying to sell Drift to a skeptical teammate.",
    "Note what's disclosed: beta rough edges, Ubuntu/x86-only (Mac needs a workaround), prompt sensitivity, multi-robot being experimental. Confessed limitations buy trust that superlatives can't — engineers distrust tools that claim no downsides.",
    "If the page is thin, that's a gap you can flag to the founders and a content opportunity: a clear, honest 'what Drift does and doesn't touch' page helps the internal champion more than any feature list.",
  ],
  'One "my first robot in ROS" beginner video + comments': [
    "Watch one beginner 'first robot' tutorial and — importantly — read the comments. The comment section is unfiltered beginner pain: where people got stuck, what didn't work on their machine, where they gave up.",
    "The hobbyist/student persona hits a cliff: tutorials assume Linux fluency, ROS basics, and patience, and most quit at the install step. You're documenting exactly where that cliff is, because it's the persona Drift's 'no deep expertise needed' promise targets.",
    "Note the recurring stumbles (environment setup, version mismatches, cryptic errors). These are the same pains from your inventory, seen from the absolute-beginner end.",
  ],
  "Hackster.io robotics section": [
    "Hackster.io is a maker/hobbyist project hub and a named channel in Drift's growth plan. Skim the robotics section to see what beginner-friendly robotics content looks like when it actually works: project-based, photo-heavy, outcome-first ('I built X').",
    "For growth this is top-of-funnel territory — high volume, high enthusiasm, low direct monetisation, but it's where the future researchers and engineers start. Content that helps a hobbyist get a win is how you seed the persona funnel.",
    "Study the format: successful hobbyist content shows a finished thing first, then the how. That structure ('here's the robot, here's how') is one you can borrow for Drift demos aimed at beginners.",
  ],
  "Set the system up right now": [
    "This is a do-it-now infrastructure task, not a reading. Set up your permanent listening system in one sitting so market awareness becomes a 10-minute daily habit instead of an occasional scramble.",
    "Configure: alerts (F5Bot or similar) not just for 'Drift'/'godrift' but for pain phrases — 'gazebo not working,' 'URDF error,' 'ros2 launch fail,' 'robot won't move,' 'simulation setup.' Pain-phrase alerts surface threads where Drift is the answer and nobody's mentioned it yet — the best community-growth openings.",
    "Also: a bookmarks folder (r/ROS, r/robotics, ROS Discourse, LeRobot Discord, HN search, Drift's PH page, Hackster) and an X follow-list of LeRobot people, simulator maintainers, and robot-learning researchers. Then block a recurring 10-minute daily slot. The system is the deliverable.",
  ],
  '"Mom Test" summary': [
    "The Mom Test is the standard playbook for user interviews that don't produce flattering lies. Its core rule: ask about the person's actual past behaviour, never about hypothetical futures or opinions of your idea.",
    "Practically: 'walk me through the last time you set up a simulation' (good — concrete past) beats 'would you use a tool that does this?' (bad — invites a polite yes). Ask what they did, what it cost them, what they tried before. Never pitch, never defend when they criticise — just 'tell me more.'",
    "Why it matters here: you want positioning language in users' real words, and severity signals ('if this vanished I'd go back to manual, ugh'). Leading questions poison both. Read one good summary and internalise the ask-about-the-past reflex before your Day 15 interviews.",
  ],
  "Drift quickstart docs before the session": [
    "Read the quickstart before you drive Drift, for two reasons: arrive prepared so the session isn't wasted on fumbling, and grade the quickstart itself as an onboarding asset while you follow it.",
    "Note the setup path and time — especially the Ubuntu/x86 requirement and the Mac/VMware workaround. That setup time is a real number in the acquisition funnel; feel it yourself so your marketing never pretends onboarding is frictionless.",
    "Track where the docs assume knowledge a newcomer lacks. Every such spot is a place beginners drop off, and fixing docs is often higher-leverage than any campaign.",
  ],
  "Drift's demo video": [
    "Watch the flagship demo and compare its smoothness to the reality you'll feel when you drive the product yourself (Day 16). The gap between a polished demo and a live first-run is your honesty calibration for every piece of content you make.",
    "Note what the demo chooses to show — usually the magical one-command bring-up — and what it doesn't (the messy debugging, the edge cases). Knowing what's been tidied away keeps you from over-promising.",
    "Also study it as a format template: what makes a robotics tool demo compelling in 60-90 seconds? You'll reuse those beats when scripting your own Reels and clips.",
  ],
  "Drift's Claude-vs-Drift debugging comparison video": [
    "This is Drift's single most important differentiation story, so learn its beats by heart. Same Gazebo error handed to a general AI coding agent and to Drift.",
    "The general agent reads the error text and guesses ('Gazebo probably isn't installed' — but it was). Drift inspects the actual running system — which processes are alive, which topics are connected, what the launch really did — and finds the true cause. The lesson: in robotics the error message lies, but the live system state doesn't.",
    "Your 30-second retelling: 'General coding agents read the error message. Drift reads the running robot — the nodes, the topic connections, the process output — so it diagnoses the real problem instead of the apparent one.' Practice until it's automatic; this is the comparison the market makes most.",
  ],
  'PH "alternatives" page for Drift + one HN thread about AI coding agents': [
    "Look at which alternatives the market spontaneously compares Drift to — mostly general AI coding agents (Cursor, Claude Code) and 'just doing it manually.' That tells you which competitive story you'll tell most often.",
    "The three honest comparisons: vs manual (Drift trades some control for speed, with permission-gating to keep control); vs general coding agents (Drift inspects live system state, they read code and error text); vs existing ROS command-line tools (Drift wraps the tools engineers already trust in natural language with whole-workspace context).",
    "For each, concede what the alternative genuinely wins — manual = total control, general agents = breadth beyond robotics, ROS tools = full transparency/no magic. Conceding the true trade-off is what makes the rest of your claim credible to skeptics.",
  ],
  "Founder replies on the Drift PH thread": [
    "Re-read the founders' answers to objections with your Day 18 rubric: did they concede the true part, cite a mechanism (not an adjective), and would an engineer nod?",
    "Use them as both model and foil. Where the founders answer well, borrow the framing. Where they over-claim or dodge, write the better version — that's your value made concrete and a preview of the FAQ you're building.",
    "Pay attention to their tone with skeptics. The successful moves are usually honest concession plus specific detail; the weak moves are enthusiasm without substance. Copy the former.",
  ],
  "Your own three documents": [
    "By Week 4 the 'resource' is you. Lay your pain inventory (Lab 2), user reality memo (Lab 3), and wow/friction note (Day 16) side by side — this primary evidence is worth more than any external source for the positioning work ahead.",
    "Map each pain category to Drift's features (solves well / partly / not at all). Dense-overlap zones are your messaging core; unsolved zones are the roadmap memo for the founders. Then write positioning statements using vocabulary lifted straight from real threads and interviews, not the website.",
    "This is the point of the whole course: you now generate positioning from evidence you gathered, in users' own words, instead of inheriting the founders' framing. The 'source' being your own research is the graduation itself.",
  ],
  "gazebosim.org, mujoco.org, NVIDIA Isaac Sim pages": [
    "Skim three simulator homepages back to back and notice how differently each 'tribe' talks. The marketing language differences ARE the tribal differences.",
    "Gazebo speaks to ROS users and prototyping — practical, integration-focused. MuJoCo (Google DeepMind, open source) speaks to researchers about fast, accurate physics — academic, benchmark-flavoured. Isaac Sim (NVIDIA) speaks to funded, ML-heavy teams about photorealism and massive GPU-parallel training — premium, scale-flavoured.",
    "Why this matters to you: when someone asks 'does Drift support Isaac Sim?' they're really asking 'does this tool live in MY world or someone else's?' Recognising which tribe a question comes from lets you answer the real concern under the literal one.",
  ],
};
