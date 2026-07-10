export type Resource = {
  kind: "watch" | "read" | "do";
  time?: string;
  label: string;
  why: string;
  href?: string;
};
export type Day = {
  id: number;
  week: number;
  title: string;
  objective: string;
  lesson: string[];
  resources: Resource[];
  quiz: string[];
  output: string;
  answerKey?: string;
  isLab?: boolean;
};
export type Week = {
  id: number;
  title: string;
  subtitle: string;
  objective: string;
  passBar: string;
  days: number[];
};

export const course = {
  title: "Robotics for Drift Growth",
  subtitle: "The Full Course",
  meta: "4 weeks · 20 lessons · one document",
  intro:
    "You're a growth marketer learning enough robotics to understand Drift's users, answer their questions, and position the product on evidence instead of founder framing.",
  howToUse: [
    {
      k: "Cadence",
      v: "5 lessons a week, 45–60 min each, plus one weekend lab (60–90 min). Total: 4 weeks.",
    },
    { k: "Structure", v: "Each lesson: Objective → Lesson → Resources → Quiz → Output." },
    {
      k: "Quizzes",
      v: "Answer in writing before checking the key. Writing forces recall; reading answers teaches nothing.",
    },
    { k: "Outputs", v: "Compound. Your Day 8 glossary feeds your Day 19 positioning work." },
    {
      k: "Pass bar",
      v: "70%+ on the week's quiz AND completed outputs. Miss it, repeat the weakest day.",
    },
  ],
  covers: [
    "The robotics development workflow and where simulation sits in it",
    "ROS 2: what it is, its core vocabulary, and why its setup pain created Drift's market",
    "The simulation toolchain: Gazebo, RViz, URDF, controllers, plugins, and the competing simulators",
    "Sim-to-real, domain randomization, and the robot learning wave",
    "Drift's three personas, their communities, and how to run user research on them",
    "Competitive framing and evidence-based positioning for Drift",
  ],
  skips: [
    "Math: kinematics, dynamics, control theory, transforms, quaternions",
    "Programming proficiency: no C++ or Python; only read snippets to recognize patterns",
    "Hardware: electronics, motors, PCBs, CAD, 3D printing, embedded systems",
    "Algorithm internals: how SLAM, planners, or NNs work inside. Concept level only",
    "ML engineering: training pipelines, GPU infrastructure, hyperparameters",
  ],
};

export const weeks: Week[] = [
  {
    id: 1,
    title: "The world Drift lives in",
    subtitle: "Workflow, simulation, and ROS vocabulary",
    objective:
      "Understand what a robotics engineer does all day, why simulation exists, and what ROS is. By Friday you can read a beginner ROS thread and follow the plot.",
    passBar: "70%+ and both outputs done (glossary at ~35 terms, gauntlet log complete).",
    days: [1, 2, 3, 4, 5, 100],
  },
  {
    id: 2,
    title: "The toolchain, the tribes, and the pain map",
    subtitle: "Simulators, sim-to-real, robot learning, forum literacy",
    objective:
      "Know the simulator landscape and its tribal loyalties, understand sim-to-real and robot learning at concept level, and build the pain inventory.",
    passBar: "70%+, pain inventory complete with 20 rows, memo written.",
    days: [6, 7, 8, 9, 10, 200],
  },
  {
    id: 3,
    title: "The people",
    subtitle: "Three personas, a listening system, and user interviews",
    objective:
      "Know Drift's three personas deeply enough to write for each, build a permanent listening system, and gather primary evidence from real users.",
    passBar: "70%+, persona sheet done, listening system live, memo written.",
    days: [11, 12, 13, 14, 15, 300],
  },
  {
    id: 4,
    title: "Drift through unbiased eyes",
    subtitle: "Drive the product, competitive frame, positioning, final exam",
    objective:
      "Use the product yourself, master the competitive comparisons, rebuild positioning from your own evidence, and pass the final exam.",
    passBar: "Final exam: Part A 70%+, Part B all four answerable without help, Part C drafted.",
    days: [16, 17, 18, 19, 20],
  },
];

export const days: Day[] = [
  {
    id: 1,
    week: 1,
    title: "What a robot is, to an engineer",
    objective:
      "Internalize the perception → planning → control loop and the robot development workflow.",
    lesson: [
      "To an engineer, a robot is a loop running many times per second:",
      "1. Perceive: sensors report the world. Cameras give images, lidar gives distance points, IMUs give orientation and acceleration, encoders report how far each joint has turned.",
      '2. Plan/decide: software turns sensor data into a decision. "Obstacle ahead, re-route." "Object at coordinates X, grasp from above."',
      "3. Act: controllers convert decisions into motor commands. Wheels turn, joints rotate.",
      'Every robotics role is a slice of this loop. A "perception engineer" works on step 1, a "controls engineer" on step 3, a "robotics software engineer" often glues all three together. That glue role is Drift\'s core user.',
      "The development workflow wraps around this loop: design or buy a robot → write the software → test in simulation → deploy to hardware → discover reality differs from sim → iterate. Hardware testing is slow (minutes per reset), expensive (arms cost $5k–$50k), and risky (crashes break things). Simulation testing is milliseconds per reset, free, and safe. That asymmetry is why simulation is a mandatory step and not an optional one, and why a tool that compresses simulation setup has a real market.",
    ],
    resources: [
      {
        href: "https://articulatedrobotics.xyz",
        kind: "watch",
        time: "25 min",
        label: 'Articulated Robotics — "Making a Mobile Robot" #1',
        why: "He builds a real robot using the exact stack Drift automates. Absorb vocabulary and the sheer amount of manual work.",
      },
      {
        kind: "read",
        time: "10 min",
        label: "Drift docs introduction (docs.godrift.ai)",
        why: "Read it TODAY with fresh eyes and save your reaction. In week 4 you'll compare what the docs claim against what you've learned.",
      },
    ],
    quiz: [
      "Name the three stages of the robot loop and one sensor or component per stage.",
      "Give three concrete reasons an engineer tests in simulation before hardware.",
      "In which single step of the dev workflow does Drift live?",
    ],
    output:
      "A 5-sentence plain-English explanation of the loop, written for your Substack audience.",
    answerKey:
      "(1) Perceive (camera/lidar/IMU/encoders) → plan (planner software) → act (controllers/motors). (2) Cost of hardware, speed of iteration/resets, safety of crashes; also parallelism (1,000 overnight trials). (3) Step 3, simulation testing.",
  },
  {
    id: 2,
    week: 1,
    title: "Inside a simulation",
    objective: "Know the four components of every robotics simulation and what URDF is.",
    lesson: [
      "Every simulation, regardless of tool, contains:",
      "1. A robot model. A text file describing the robot's physical body: links (rigid parts), joints (connections that move), plus each part's mass, inertia, and collision geometry. In the ROS world, this is a URDF (Unified Robot Description Format). It's XML, verbose, engineers hate writing it, and subtle errors cause bizarre bugs like robots that jitter or flip. Drift generates URDF from a description.",
      '2. A world. The environment: ground, walls, objects, light. Gazebo stores these in "world files."',
      "3. A physics engine. Code that steps time forward in tiny increments (timesteps) and computes gravity, friction, and collisions each step.",
      "4. Simulated sensors. Fake cameras, lidar, IMUs that produce realistic data streams. The robot's actual software consumes that data without knowing it's fake, so the same code runs in sim and on hardware.",
    ],
    resources: [
      {
        kind: "read",
        time: "15 min",
        label: 'Gazebo "Getting started" (gazebosim.org/docs)',
        why: "The canonical simulator in Drift's stack; skim to see official framing and screenshots.",
      },
      {
        href: "https://articulatedrobotics.xyz",
        kind: "watch",
        time: "15 min",
        label: 'Articulated Robotics — "Describing robots with URDF"',
        why: "Watching someone hand-write URDF for 15 minutes teaches you the pain viscerally. This pain is a Drift feature.",
      },
    ],
    quiz: [
      "Name the four components of a simulation.",
      "What is a link? A joint? Which file format describes them in ROS?",
      'A user posts: "my robot flips over the moment it spawns in Gazebo." Which part of the robot model is the likely culprit?',
    ],
    output:
      "Add your first 10 glossary entries: URDF, link, joint, inertia, collision geometry, world file, physics engine, timestep, spawn, headless.",
    answerKey:
      "(1) Robot model, world, physics engine, simulated sensors. (2) Link = rigid part; joint = moving connection between links; URDF. (3) The model's inertia values (or collision geometry); bad inertia makes robots jitter or flip.",
  },
  {
    id: 3,
    week: 1,
    title: "ROS, part 1: the plumbing",
    objective: "Explain what ROS is and define node, topic, publisher, subscriber.",
    lesson: [
      'ROS (Robot Operating System) is misnamed. It\'s middleware: plumbing that lets the many programs inside one robot talk to each other. The modern version is ROS 2; releases have names like Humble and Jazzy ("distros," like Ubuntu versions; mismatches cause a huge share of setup pain).',
      'The mental model is a newsroom: a node is one program with one job (camera driver, planner, motor controller). A topic is a named channel: a node publishes messages, other nodes subscribe. `/cmd_vel` is the most famous topic name: velocity commands. Half of all beginner debugging threads are some version of "I publish to /cmd_vel and nothing moves."',
      "A service is a request-reply call between nodes, unlike topics which stream continuously.",
      'Why engineers accept this complexity: modularity. Why they curse it: the network is invisible. When it breaks, you detective across a dozen processes. Drift\'s debugging pitch is "we do the detective work."',
    ],
    resources: [
      {
        href: "https://docs.ros.org/en/rolling/Concepts.html",
        kind: "read",
        time: "20 min",
        label: "docs.ros.org — Concepts: Nodes and Topics",
        why: "Vocabulary source of truth; the diagrams are good.",
      },
      {
        kind: "watch",
        time: "10 min",
        label: '"ROS 2 nodes and topics explained" (The Construct)',
        why: "Seeing messages flow between nodes as moving dots makes the newsroom model stick.",
      },
    ],
    quiz: [
      'Explain ROS to a marketer friend in two sentences without the word "middleware."',
      "What travels on `/cmd_vel`, and who publishes vs subscribes to it typically?",
      "Topic vs service: which one streams, which one asks-and-answers?",
      'What is a "distro" and why do distro mismatches matter?',
    ],
    output:
      "Add 10 more glossary entries: node, topic, publisher, subscriber, service, message, ROS 2, distro, middleware, /cmd_vel.",
    answerKey:
      '(1) "ROS is the messaging system inside a robot; it lets the camera program, planner, and motor program talk to each other without being one giant program." (2) Velocity commands; a planner or teleop node publishes, the motor/base controller subscribes. (3) Topics stream; services ask-and-answer. (4) A ROS release version; packages built for one distro often break on another.',
  },
  {
    id: 4,
    week: 1,
    title: "ROS, part 2: workspaces, packages, launch files (the pain layer)",
    objective: "Understand the setup artifacts Drift generates, and why they hurt to make by hand.",
    lesson: [
      'A package is a folder bundling related code, configs, and metadata. A robot project is several packages. A workspace is the parent directory holding all your packages. You build it with colcon, and then "source" it so the terminal knows where everything is. Forgetting to source the workspace is a rite-of-passage error.',
      'A launch file is a script starting many nodes at once with the right parameters. Real robots need 10–30 nodes running together. Launch files are powerful, finicky, and fail in unhelpful ways (a typo\'d parameter often fails silently: everything "runs" and nothing works).',
      "Zombie processes: when a simulation crashes, background processes (like gzserver, Gazebo's engine) keep running invisibly and block the next launch. Drift's copy \"you're not juggling terminals or hunting for zombie gzserver instances\" reads as jargon until today.",
      "The manual setup gauntlet for one new simulated robot: create workspace → create packages → write URDF → write world file → configure controllers → write launch files → build → source → launch → debug the five things that went wrong. Days, for experienced engineers.",
    ],
    resources: [
      {
        href: "https://docs.ros.org/en/rolling/Concepts.html",
        kind: "read",
        time: "15 min",
        label: 'docs.ros.org tutorials: "Creating a workspace" and "Creating a package"',
        why: "Don't do the tutorial, READ it and count the steps. The step count is the point.",
      },
      {
        kind: "read",
        time: "10 min",
        label: 'r/ROS: search "launch file not working," read 2 threads',
        why: "Pattern-match the tone of someone stuck at 1 a.m.",
      },
    ],
    quiz: [
      "Order these smallest to largest: workspace, node, package.",
      "What does a launch file do and why do robots need them?",
      "What is a zombie gzserver and why does it block the next simulation run?",
      'An engineer says "it builds but nothing shows up when I launch." Name two plausible categories of cause.',
    ],
    output:
      'Glossary: package, workspace, colcon, build, source, launch file, parameter, zombie process, gzserver. Then write "The Gauntlet": one paragraph on manual sim setup in your own words.',
    answerKey:
      "(1) Node < package < workspace. (2) Starts many nodes with correct parameters in one command. (3) A leftover Gazebo engine process from a crashed run; holds resources so the next launch fails. (4) Launch/parameter problems (silent failure), forgot to source, controller config.",
  },
  {
    id: 5,
    week: 1,
    title: "RViz, controllers, plugins: the last three recurring characters",
    objective: "Distinguish Gazebo from RViz, and know what controllers and plugins do.",
    lesson: [
      "RViz is a visualization tool, and it is NOT a simulator. Gazebo simulates the world (physics, ground truth). RViz displays what the robot believes: its sensor data, estimated position, planned path. Gazebo is reality, RViz is the robot's brain. Distinguishing them crisply marks you as someone who gets it.",
      "Controllers translate high-level commands into motor-level signals, with tuning parameters. The classic symptom of controller misconfiguration: robot spawns fine, looks fine, refuses to move.",
      "Plugins extend Gazebo with capabilities like specific sensors or the bridge that connects Gazebo to ROS topics. Wrong or missing plugin = sensor publishes nothing = downstream nodes starve silently.",
      'QoS (Quality of Service): settings on topics governing delivery guarantees. Two nodes with incompatible QoS both run happily and never exchange a message. A silent killer. Drift\'s docs name-check "QoS compatibility" because engineers recognize it as a real nightmare.',
    ],
    resources: [
      {
        href: "https://articulatedrobotics.xyz",
        kind: "watch",
        time: "15 min",
        label: "Articulated Robotics — RViz/Gazebo episode",
        why: "You'll SEE the two windows side by side and never confuse them again.",
      },
      {
        href: "https://docs.godrift.ai/getting-started/introduction",
        kind: "read",
        time: "10 min",
        label: "Drift docs feature list (docs.godrift.ai)",
        why: "Re-read it now. Count how many terms you understand today vs Day 1. This is your Week 1 progress bar.",
      },
    ],
    quiz: [
      "Gazebo vs RViz: one sentence each.",
      '"Robot spawns but won\'t move." First suspect?',
      "What's a QoS mismatch and why is it called a silent killer?",
      'Translate this Drift line for Week-1-Day-1 you: "launches Gazebo, spawns your robot, opens RViz with the right config, and bridges all topics in one command."',
    ],
    output:
      "Glossary: RViz, controller, plugin, QoS, bridge, ground truth. You should be at ~35 terms.",
    answerKey:
      "(1) Gazebo simulates the world as it is; RViz displays the world as the robot believes it to be. (2) Controller configuration. (3) Incompatible topic delivery settings between two nodes; both run without errors and never communicate. (4) Self-graded.",
  },
  {
    id: 100,
    week: 1,
    isLab: true,
    title: "Weekend Lab 1 — Watch the gauntlet in real time",
    objective: "Feel the pain you'll be marketing against. (90 min)",
    lesson: [
      'Watch one complete "ROS 2 + Gazebo robot simulation from scratch" tutorial on YouTube IN REAL TIME. No skipping. Recommended: any full setup video from Articulated Robotics or The Construct, 40–80 min.',
      "Keep a two-column log:",
      "Column A: every distinct manual step (aim for 25+).",
      'Column B: every moment of friction: an error, a workaround, a "make sure you don\'t forget to…", a sigh.',
    ],
    resources: [],
    quiz: [],
    output:
      "Your log + a 3-sentence summary: total steps, total friction moments, and the single worst one. Primary-source evidence of Drift's value prop; will feed content for months.",
  },
  {
    id: 6,
    week: 2,
    title: "The simulator landscape",
    objective:
      'Recognize the five major simulators, who uses each, and why "which simulator" is a tribal question.',
    lesson: [
      "Engineers pick simulators partly on merit, largely on tribe.",
      "Gazebo — ROS users, industry prototyping, education. Deepest ROS integration; the default. Drift's home turf today.",
      'NVIDIA Isaac Sim — funded teams, ML-heavy robotics. Photorealistic rendering, massive parallel GPU training. The "premium" tribe.',
      "MuJoCo — RL researchers, academic robot learning. Fast, accurate physics; open source (Google DeepMind). The academic darling.",
      "Webots — education, some research. Friendly, batteries included. The teaching tool.",
      "PyBullet — quick prototypes, older RL papers. Lightweight, pure Python. Fading but still cited.",
      'When a Product Hunt commenter asks "does Drift support Isaac Sim," they\'re really asking "does this tool live in my world or someone else\'s."',
      "Also: Gazebo Classic vs new Gazebo (formerly Ignition) coexist in tutorials and forums. Version confusion generates endless threads. More pain, more market.",
    ],
    resources: [
      {
        href: "https://gazebosim.org/docs",
        kind: "read",
        time: "15 min",
        label: "gazebosim.org, mujoco.org, NVIDIA Isaac Sim pages",
        why: "Absorb how each tribe describes itself; the marketing language differences ARE the tribal differences.",
      },
      {
        kind: "read",
        time: "10 min",
        label: 'r/robotics: "Gazebo vs Isaac Sim" thread',
        why: "Hear tribe members argue in their own words.",
      },
    ],
    quiz: [
      "Match tribe to tool: RL academic / funded ML team / ROS default / classroom.",
      'A user asks "Isaac Sim support?" What are they really asking?',
      "Why do Gazebo tutorials contradict each other so often?",
    ],
    output:
      "Glossary: Isaac Sim, MuJoCo, Webots, PyBullet, Gazebo Classic vs new Gazebo, GPU-parallel simulation.",
    answerKey:
      "(1) MuJoCo / Isaac Sim / Gazebo / Webots. (2) Which tribe Drift serves and whether they're a supported user. (3) Two coexisting Gazebos (Classic vs Ignition/new) with incompatible instructions.",
  },
  {
    id: 7,
    week: 2,
    title: "Sim-to-real and domain randomization",
    objective:
      "Explain the sim-to-real gap and its standard countermeasure well enough to survive a skeptical engineer's follow-up.",
    lesson: [
      "The sim-to-real gap: simulated physics never perfectly matches reality. Friction coefficients are estimates, motors have quirks physics engines don't model, real sensors are noisier than fake ones. A robot behavior that works in sim can fail on hardware. This is THE standing objection to all simulation tooling.",
      "The standard countermeasure is domain randomization: during simulated training/testing, randomize the parameters you're unsure about (friction, masses, lighting, sensor noise). The software can't overfit to one fake world; it learns to handle a RANGE, and reality is usually inside that range.",
      "A cousin technique, system identification, goes the other way: measure the real robot carefully and tune sim parameters to match it.",
      "Your honest, non-overclaiming answer as Drift's marketer: Drift compresses the setup and iteration side of simulation; the sim-to-real gap is a property of physics engines. Faster iteration means MORE cycles for randomization and hardware validation. Never claim a setup tool closes the gap itself.",
    ],
    resources: [
      {
        kind: "read",
        time: "15 min",
        label: 'OpenAI "domain randomization" blog post',
        why: "The canonical framing, with pictures of randomized worlds.",
      },
      {
        href: "https://www.producthunt.com/products/drift-ai",
        kind: "read",
        time: "10 min",
        label: "Sim-to-real thread on Drift's Product Hunt page",
        why: "This exact objection will reach your inbox; study how it's phrased.",
      },
    ],
    quiz: [
      "Define sim-to-real gap in one sentence with two concrete example causes.",
      "How does domain randomization counter it? What does system identification do instead?",
      'A skeptic says "sim results are meaningless, the gap kills everything." Write your 3-sentence response.',
    ],
    output:
      'A written FAQ entry: "How does Drift relate to the sim-to-real gap?" (150 words max). First entry in "Drift FAQ, my words."',
    answerKey:
      "(1) Sim physics never exactly matches reality, e.g., estimated friction and unmodeled motor quirks. (2) Randomization trains across many parameter variations so reality falls in range; system ID tunes the sim to match the real robot. (3) Concede the gap is real; position Drift on setup/iteration speed; argue faster iteration buys more cycles for hardening.",
  },
  {
    id: 8,
    week: 2,
    title: "The robot learning wave (why the market is growing now)",
    objective:
      "Understand imitation learning, RL, and VLAs at cocktail-party depth, and why they multiply simulation demand.",
    lesson: [
      "Old way: hand-code every behavior. New wave, robot learning, trains neural networks instead.",
      "Imitation learning: humans demonstrate (often via teleoperation), the network learns to copy. Data-hungry: teams collect thousands of demonstrations.",
      "Reinforcement learning: the robot tries, fails, gets reward, improves over millions of trials. Millions of physical trials are impossible, so RL essentially REQUIRES simulation, ideally massively parallel (Isaac Sim's specialty).",
      'VLAs (vision-language-action models): the "GPT for robots" ambition. Models take camera images + language and output actions. Names: pi0 (Physical Intelligence), GR00T (NVIDIA), the open LeRobot ecosystem (Hugging Face).',
      "Every one of these consumes simulation at industrial scale. More robot learning → more sims → bigger market for setup compression. Drift's mission line, a billion robots by 2035, rides this tide.",
    ],
    resources: [
      {
        kind: "read",
        time: "15 min",
        label: "huggingface.co/lerobot + LeRobot GitHub README",
        why: "Named target in Drift's growth plan; know what they actually build.",
      },
      {
        kind: "read",
        time: "10 min",
        label: "Physical Intelligence pi0 announcement",
        why: 'The most-cited "GPT for robots" moment; referenced in threads constantly.',
      },
    ],
    quiz: [
      "Imitation learning vs RL: one sentence each, including where the data comes from.",
      "Why does RL essentially require simulation?",
      "What's a VLA? Name two.",
      "Connect the dots: why does the robot learning wave grow Drift's market?",
    ],
    output:
      'Glossary: imitation learning, RL, teleoperation, VLA, pi0, GR00T, LeRobot, parallel simulation. Plus a 4-sentence "why now" paragraph.',
    answerKey:
      "(1) Imitation: learn from demonstrations via teleoperation. RL: learn from trial-and-error, millions of simulated attempts. (2) Physical trials too slow, costly, destructive. (3) VLA = vision-language-action; pi0, GR00T. (4) Learning methods consume sims at scale → more setups → bigger market for compression.",
  },
  {
    id: 9,
    week: 2,
    title: "Reading the room: how engineers talk online",
    objective:
      "Decode forum threads: what's being asked, and what response earns respect vs contempt.",
    lesson: [
      'Specificity is status. "Great post! Check out our tool!" is spam. "This looks like a QoS mismatch; run `ros2 topic info` on both ends" is currency, even from a company account.',
      "Show your homework. Threads open with environment details (distro, simulator version, error output). Answers that ignore those details get ignored.",
      'Vendor claims get stress-tested. Anticipate "too good to be true" energy; pre-concede real limitations (beta, Ubuntu/x86-only, prompt sensitivity) before others discover them. Confessed limitations buy trust superlatives can\'t.',
      'The failure story beats the success story. "Generation is easy. Recovery from broken states is where the hard engineering lives." Content about how Drift debugs a broken setup will outperform content about how it creates a fresh one.',
      'Structure of a typical help thread: title (symptom) → environment block → what they tried → error text → replies triaging causes. "What they tried" is your empathy goldmine: a diary of wasted hours.',
    ],
    resources: [
      {
        href: "https://discourse.ros.org",
        kind: "read",
        time: "25 min",
        label: "ROS Discourse — 5 threads end to end",
        why: "Official forum where serious users live; tone here is your calibration target.",
      },
      {
        href: "https://www.producthunt.com/products/drift-ai",
        kind: "read",
        time: "10 min",
        label: "Drift's Product Hunt comment section, all of it",
        why: "A corpus of real questions asked of YOUR product.",
      },
    ],
    quiz: [
      'Rewrite this reply to earn respect: "Drift can fix this easily, try it! Link in bio."',
      "Why does pre-conceding limitations work on engineer audiences?",
      "What four sections does a typical help thread contain, and which one is the empathy goldmine?",
    ],
    output:
      "Pick one real r/ROS thread. Draft (don't post) the reply you'd write from a Drift community account: diagnosis first, tool mention last or absent.",
    answerKey:
      '(1) Specific diagnosis, reference to their env/error, actionable next step, tool mention last or absent. (2) Signals honesty and technical self-awareness; discovered flaws cost more trust than confessed ones. (3) Title/symptom, environment block, what-they-tried, error text; "what they tried" is the goldmine.',
  },
  {
    id: 10,
    week: 2,
    title: "The pain taxonomy",
    objective: "Build the classification system for the weekend's pain inventory.",
    lesson: [
      "Setup pain isn't one thing. Six recurring categories:",
      "1. Install & versioning: distro mismatches, dependency hell, Gazebo Classic vs new. Drift angle: environment orchestration.",
      "2. Robot description (URDF): malformed XML, wrong inertia, robot flips/sinks. Drift angle: generated URDF with correct inertia.",
      "3. Launch & configuration: silent failures, wrong parameters, forgot to source. Drift angle: generated launch files, one-command bring-up.",
      "4. Runtime & connection: nothing moves, topics not connected, QoS mismatches, zombie processes. Drift angle: live ROS state inspection.",
      "5. Controller & motion: spawns but won't move, jerky motion. Drift angle: controller configs generated.",
      "6. Sim-to-real & fidelity: works in sim, fails on robot. Drift angle: more iteration cycles for hardening.",
      'Categories 3 and 4 are where "hours lost" stories cluster and where Drift\'s differentiation (state inspection vs error-text guessing) is sharpest.',
    ],
    resources: [
      {
        kind: "read",
        time: "20 min",
        label:
          "r/ROS: one thread per category (install / URDF / launch / topic / motion / sim-to-real)",
        why: "One live specimen per category before you hunt at scale.",
      },
    ],
    quiz: [
      "Name the six categories from memory.",
      '"Everything runs, no errors, robot ignores commands." Category? Likely suspects?',
      "Which two categories map to Drift's sharpest differentiation, and what is that differentiation?",
    ],
    output:
      "A blank pain-inventory spreadsheet: thread link, one-line problem, category (1–6), hours lost, exact user phrasing, content idea.",
    answerKey:
      "(1) Install/versioning, URDF, launch/config, runtime/connection, controller/motion, sim-to-real. (2) Category 4 (runtime/connection); QoS mismatch or topic not bridged. (3) Categories 3 and 4; Drift inspects live system state instead of guessing from error text.",
  },
  {
    id: 200,
    week: 2,
    isLab: true,
    title: "Weekend Lab 2 — The Pain Inventory",
    objective: "Build the single most reusable growth asset of this course. (90 min)",
    lesson: [
      "Fill the spreadsheet with 20 threads across r/ROS, r/robotics, and ROS Discourse. For each: link, one-line problem, category, hours lost if mentioned, and one verbatim quote of the user's frustration (their words, not yours).",
      "Then write the summary memo (half page): which category dominated; three best verbatim quotes (these become ad copy, Reddit replies, landing page language); one pain Drift does NOT solve today (roadmap input for the founders).",
    ],
    resources: [],
    quiz: [],
    output:
      "The filled inventory + memo. Every content calendar you build for Drift from now on draws from this document.",
  },
  {
    id: 11,
    week: 3,
    title: "Persona 1: The researcher",
    objective:
      "Understand the academic robotics user: incentives, calendar, vocabulary, watering holes.",
    lesson: [
      "The researcher (PhD student, postdoc, lab engineer) lives on a conference calendar. Robotics papers go to ICRA, IROS, RSS, and robot-learning work to CoRL. Deadlines are hard walls; the weeks before them are all-nighters. Timing campaigns to them is free relevance.",
      "Incentives: publications, novelty, citations. Simulation setup is pure tax on their real work. They are budget-poor, time-poor, and influence-rich: today's PhD student is next year's industry engineer.",
      'Vocabulary tells: baseline, benchmark, ablation, reproduce. A researcher asking "can Drift reproduce the setup from paper X" is asking about reproducibility, a chronic academic pain. A tool that makes a described setup runnable from a prompt has a genuine reproducibility story.',
      "Where they live: lab Twitter/X, LeRobot Discord, arXiv, university mailing lists, GitHub issues of research codebases.",
    ],
    resources: [
      {
        kind: "read",
        time: "15 min",
        label: "CoRL site + one accepted-papers list",
        why: "Skim 20 paper titles; you're learning the field's current obsessions.",
      },
      {
        kind: "read",
        time: "15 min",
        label: "LeRobot Discord — lurk in help channels",
        why: "Watch researchers and hobbyists ask setup questions in real time.",
      },
    ],
    quiz: [
      "Name three robotics conferences and why their deadlines matter to your campaign calendar.",
      "What is the reproducibility pain and how does Drift plausibly speak to it?",
      "Three vocabulary tells that you're talking to a researcher.",
    ],
    output:
      "A quarter-page researcher persona card: goals, pains, calendar, channels, one campaign idea timed to a deadline.",
    answerKey:
      "(1) ICRA/IROS/RSS/CoRL; deadline weeks are peak pain and receptivity. (2) Papers ship broken sim setups; a tool that turns a description into a runnable setup shortens reproduction from days to minutes. (3) Baseline, benchmark, ablation, reproduce.",
  },
  {
    id: 12,
    week: 3,
    title: "Persona 2: The industry engineer",
    objective:
      "Understand the professional user: trust requirements, evaluation process, buying dynamics.",
    lesson: [
      'The industry engineer ships products. Their evaluation of any AI tool starts from distrust: "what will this change in my workspace, can I review it, will it break something." Drift\'s permission-gating exists because this persona demands it; these pipelines eventually run on real robots.',
      'Buying dynamics: they rarely buy from ads. Path: engineer discovers tool (HN, word of mouth, Reddit) → tries on side task → champions internally → team adopts → someone with a card pays. Your job is arming the internal champion: benchmarks, security/permissions docs, a "what it touches" page.',
      'Objections: "too good to be true," "what happens when it breaks something," "another wrapper around an LLM," "our setup is too custom." Each needs an honest answer.',
      "Where they live: Hacker News, LinkedIn, private Slacks, GitHub. HN is the highest-stakes venue: technical, adversarial, allergic to marketing.",
    ],
    resources: [
      {
        kind: "read",
        time: "20 min",
        label: 'HN: "ROS" and "robotics simulation" — read two comment threads',
        why: "This persona's native habitat and rhetorical style, uncut.",
      },
      {
        kind: "read",
        time: "10 min",
        label: "Drift docs known-limitations section",
        why: "Honest limitation docs are champion ammunition.",
      },
    ],
    quiz: [
      "Trace the industry adoption path from discovery to payment.",
      "Why does permission-gating matter more in robotics than in web dev tooling?",
      'What does "arming the champion" mean and name two artifacts that do it.',
    ],
    output:
      'Industry engineer persona card + "Champion kit: what Drift should hand an internal advocate" (6 items).',
    answerKey:
      '(1) Discover → side task → champion → team adopts → company pays. (2) Generated code eventually touches physical machines; unreviewed changes risk hardware and safety. (3) Equipping the internal advocate; e.g., security/permissions docs, honest limitations page, benchmarks, a "what it touches" one-pager.',
  },
  {
    id: 13,
    week: 3,
    title: "Persona 3: The hobbyist/student + the persona funnel",
    objective: "Understand the beginner user and how the three personas feed each other.",
    lesson: [
      "The hobbyist/student wants a robot idea alive without deep expertise. Most numerous, least monetizable, loudest online. Their chronic pain is the cliff: tutorials assume Linux fluency, ROS knowledge, and hours of patience; most quit at the install step.",
      "Drift's Ubuntu/x86-only requirement (Mac needs VMware) is a real cliff for this group; never hide it, always link the workaround.",
      "The funnel insight: personas aren't segments, they're life stages. Student → researcher or junior engineer → senior engineer. Tools adopted at the student stage travel upward with the person. Hobbyist content is top-of-funnel for the personas who pay later.",
      "Metric caution: hobbyist engagement inflates vanity metrics (views, installs) while researcher/engineer adoption drives actual outcomes. Track them separately.",
    ],
    resources: [
      {
        kind: "watch",
        time: "15 min",
        label: 'One "my first robot in ROS" beginner video + comments',
        why: "Comment sections are unfiltered beginner pain.",
      },
      {
        href: "https://www.hackster.io/robotics",
        kind: "read",
        time: "10 min",
        label: "Hackster.io robotics section",
        why: "Named channel in Drift's growth strategy.",
      },
    ],
    quiz: [
      "What does the hobbyist contribute to growth if they rarely pay?",
      "Explain the persona funnel in two sentences.",
      "Which Drift limitation hits this persona hardest and how do you handle it in content?",
      'Bonus: For each persona, complete: "Simulation setup pain costs them ______."',
    ],
    output:
      "Hobbyist persona card + one-page three-column persona sheet combining all three cards.",
    answerKey:
      "(1) Top-of-funnel volume: views, stars, upvotes, social proof, future-professional pipeline. (2) Personas are career stages; tools adopted early travel upward with the person. (3) Ubuntu/x86-only (VMware for Mac); state upfront, always link workaround. Bonus: Researcher — deadline days. Engineer — sprint velocity and trust. Hobbyist — the hobby itself; they quit.",
  },
  {
    id: 14,
    week: 3,
    title: "Build the listening system",
    objective: "Turn ad-hoc lurking into a permanent 10-minutes-a-day intelligence habit.",
    lesson: [
      "Daily (10 min): skim r/ROS + r/robotics new posts; LeRobot Discord help channels.",
      "Weekly (20 min): ROS Discourse hot threads; HN search for robotics/ROS/simulation; Drift's Product Hunt forum and GitHub issues of adjacent tools.",
      "Monthly (30 min): skim one conference's recent-papers page or a robotics newsletter; update the pain inventory with 5 fresh rows; note new tool launches.",
      'Keyword set: beyond "Drift"/"godrift," add pain phrases: "gazebo not working," "URDF error," "ros2 launch fail," "robot won\'t move," "simulation setup." Pain-phrase alerts surface engagement opportunities brand alerts never catch.',
      "Maintain a follows list on X: LeRobot/HF robotics people, simulator maintainers, robot learning researchers. You'll absorb the field's news ambiently.",
    ],
    resources: [
      {
        kind: "do",
        time: "25 min",
        label: "Set the system up right now",
        why: "This lesson is infrastructure; doing IS the resource.",
      },
    ],
    quiz: [
      "Why do pain-phrase alerts beat brand alerts for community growth work?",
      "What belongs in daily vs weekly vs monthly rotation?",
    ],
    output:
      "Screenshot/list of your configured system + recurring calendar block for the daily 10 minutes.",
    answerKey:
      "(1) Brand alerts catch conversations about Drift; pain alerts catch conversations Drift can join usefully. (2) Daily: subreddits + Discord. Weekly: Discourse, HN, PH forum, GitHub issues. Monthly: papers/newsletter, inventory refresh, competitor launches.",
  },
  {
    id: 15,
    week: 3,
    title: "User interviews: the script and the craft",
    objective: "Prepare to run non-leading user interviews that produce quotable evidence.",
    lesson: [
      'Ask the founders for intros to 2–3 users. Frame: "20 minutes, I\'m new to the domain and want to understand your workflow, not sell you anything."',
      'The script: 1) "Walk me through the last simulation you set up, start to finish." 2) "Where did it break? How long did the fixing take?" 3) "What did you use before Drift, and what made you try it?" 4) "What almost made you NOT try it?" 5) "If Drift vanished tomorrow, what would you do?" 6) "How would you describe Drift to a labmate, one sentence?" — Positioning gold, collect verbatim.',
      'Craft rules: never pitch, never defend when they criticize (say "tell me more"), record with permission, transcribe killer quotes exactly. Two interviews beat zero.',
    ],
    resources: [
      {
        kind: "read",
        time: "20 min",
        label: '"Mom Test" summary',
        why: "The standard playbook for non-leading user conversations.",
      },
    ],
    quiz: [
      "Why is question 6 the most valuable to a marketer specifically?",
      "A user criticizes Drift mid-interview. What do you say, and what do you never do?",
      'What does the "vanished tomorrow" question actually measure?',
    ],
    output:
      "Your personalized interview guide (6 questions in your voice) + outreach message + intro request sent to founders.",
    answerKey:
      '(1) Produces positioning language in the user\'s own words, tested by a real human persuading a peer. (2) "Tell me more"; never defend or correct. (3) Retention severity and true dependence, beyond politeness.',
  },
  {
    id: 300,
    week: 3,
    isLab: true,
    title: "Weekend Lab 3 — Primary evidence",
    objective:
      "Produce the unbiased-view memo you originally asked this course for. (90 min, or spread across the week)",
    lesson: [
      "1. Run at least one user interview (two if scheduling allows). Transcribe the best quotes.",
      "2. Combine: interview quotes + pain inventory + a week of listening-system observations.",
      "3. Write the User Reality Memo (one page): what you now believe about Drift's users and value that the founders didn't tell you, where their framing matches reality, and where it doesn't. Include the three strongest verbatim user quotes.",
    ],
    resources: [],
    quiz: [],
    output:
      'The memo. Consider sharing it with the founders; "here\'s what your market sounds like from outside" is a consultant deliverable most clients never get.',
  },
  {
    id: 16,
    week: 4,
    title: "Drive the product",
    objective: "Experience Drift's wow and friction firsthand, with the vocabulary to name both.",
    lesson: [
      "Path A (preferred): Run Drift yourself on Ubuntu x86_64. On Mac/Windows, follow the VMware route; NOTE the setup time — it's a real acquisition-funnel number.",
      "Path B: Screen-share with a founder, but YOU drive.",
      "Session script: 1) Prompt Drift to build a simple differential-drive robot in a warehouse world. Name the artifacts as they appear: URDF, package structure, launch files, controller configs, world file. 2) Launch the sim. Note the one-command bring-up vs the 25+ step gauntlet from Lab 1. 3) Break something on purpose and watch Drift debug. 4) Try a vague prompt and a detailed one; observe the quality gap.",
      "Keep a two-column note: WOW moments (verbatim what impressed you) and FRICTION moments. Your outsider eyes expire in about a month.",
    ],
    resources: [
      {
        href: "https://docs.godrift.ai/getting-started/quickstart",
        kind: "read",
        time: "10 min",
        label: "Drift quickstart docs before the session",
        why: "Arrive prepared; grade the docs as an onboarding asset.",
      },
      {
        kind: "watch",
        time: "10 min",
        label: "Drift's demo video",
        why: "Compare demo smoothness to your session's reality; the gap is your honesty calibration.",
      },
    ],
    quiz: [
      "Name five artifacts Drift generated in your session and one sentence on what each does.",
      "Where was YOUR biggest wow? Biggest friction?",
      "How did the debugging behavior compare to the docs' claim?",
    ],
    output:
      "The wow/friction note, cleaned up. Send the friction half to the founders as onboarding feedback.",
  },
  {
    id: 17,
    week: 4,
    title: "The competitive frame",
    objective: "Tell each of the three competitive stories in 30 seconds, honestly.",
    lesson: [
      "1. vs. doing it manually (the real competitor). Most prospects use nothing; they hand-build. Manual gives full control and zero trust questions, at the cost of days per setup. Drift's story: same artifacts, generated in minutes, with permission-gated changes.",
      "2. vs. general AI coding agents (Cursor, Claude Code). Sharpest differentiation. Same Gazebo error given to a general agent: it concludes from the error text that Gazebo isn't installed (it was). Drift inspects the actual ROS 2 environment and finds the real cause. Your 30-second version: \"General coding agents read the error message. Drift reads the running system. In robotics, the error text lies; the system state doesn't.\"",
      '3. vs. existing ROS tooling. ROS ships command-line inspection tools engineers already trust. Powerful, manual, fragmented. Drift wraps them in natural language with workspace-wide context. Honest framing: "the tools are good; the orchestration is the burden."',
      "Rules: no superlatives, concede the tradeoff each alternative wins on (manual = control; general agents = breadth; ROS tools = zero magic, full transparency), lead with the mechanism.",
    ],
    resources: [
      {
        kind: "watch",
        time: "10 min",
        label: "Drift's Claude-vs-Drift debugging comparison video",
        why: "The flagship differentiation story; know its beats by heart.",
      },
      {
        kind: "read",
        time: "15 min",
        label: 'PH "alternatives" page for Drift + one HN thread about AI coding agents',
        why: "See which comparisons the market makes unprompted.",
      },
    ],
    quiz: [
      "Deliver all three 30-second stories out loud, timed.",
      "Name the tradeoff each alternative honestly wins.",
      "Why does story 3 require respecting the existing ROS tools?",
    ],
    output:
      "The three stories written, ≤75 words each, in user language, zero superlatives. These go in the FAQ doc.",
  },
  {
    id: 18,
    week: 4,
    title: "Objection clinic",
    objective: "Prepared, honest answers to the seven objections you'll actually face.",
    lesson: [
      "Draft answers to each, under 100 words, concede what's true, cite mechanisms:",
      '1. "Too good to be true. Config automation always breaks on real setups." (Debugging-is-core; recovery is Drift\'s centerpiece.)',
      '2. "What about the sim-to-real gap?" (Your Day 7 answer.)',
      '3. "It\'s just a wrapper around an LLM." (Live ROS state tracking, workspace context, comparison demo.)',
      '4. "Will it wreck my workspace?" (Permission-gating; nothing executes without approval.)',
      "5. \"I'm on Mac.\" (VMware route, ~10 min setup; link the guide; don't oversell.)",
      '6. "Does it handle multi-robot / swarms?" (Experimental today; may need manual adjustment; say so plainly.)',
      '7. "My setup is too custom / it\'ll produce generic results." (Prompt sensitivity is real; detailed prompts produce specific results.)',
      "Grade drafts against three checks: Would an engineer nod? Did you concede the true part? Did you cite a mechanism instead of an adjective?",
    ],
    resources: [
      {
        href: "https://www.producthunt.com/products/drift-ai",
        kind: "read",
        time: "15 min",
        label: "Founder replies on the Drift PH thread",
        why: "Grade THEIR objection handling with today's rubric.",
      },
    ],
    quiz: [
      "The seven answers ARE the quiz. Self-grade with the three checks; any answer failing two checks gets rewritten.",
    ],
    output:
      "All seven added to the FAQ doc. Your FAQ now covers: sim-to-real + 3 competitive stories + 7 objections.",
  },
  {
    id: 19,
    week: 4,
    title: "Rebuild positioning from evidence",
    objective:
      "Produce positioning grounded in your pain inventory and interviews instead of the website.",
    lesson: [
      "Lay out three documents side by side: pain inventory (Lab 2), user reality memo (Lab 3), wow/friction note (Day 16).",
      "1. Map pains to features. For each pain category, mark: Drift solves it well / partially / not at all. Dense-overlap zones are your messaging core.",
      '2. Write 5 positioning statements, each one sentence, each using vocabulary lifted from real threads or interviews. Formula: [persona] + [pain in their words] + [mechanism] + [outcome in their units]. Example: "For ROS engineers who lose afternoons to launch files that fail silently, Drift inspects the live system and finds the real cause, so a broken sim costs minutes instead of a day."',
      "3. Stress-test each statement against a real thread from your inventory.",
      "4. Kill your favorite. Whichever statement you're most attached to, rewrite it once more with fresher user language. Attachment usually marks the one drifting toward marketing-speak.",
    ],
    resources: [
      {
        kind: "read",
        label: "Your own three documents",
        why: "The entire point of the course; today, you are the resource.",
      },
    ],
    quiz: [
      "Which pain categories showed dense overlap with Drift's features? Which showed gaps?",
      "Read your 5 statements aloud. Do any contain a superlative or a term absent from your inventory's verbatim column? Fix them.",
    ],
    output:
      "The feature-pain map + 5 positioning statements + roadmap memo of unsolved pains for the founders.",
  },
  {
    id: 20,
    week: 4,
    title: "FINAL EXAM",
    objective: "Prove you can operate as Drift's marketer without pinging a founder.",
    lesson: [
      "Part A — Knowledge (closed-book): 1) Trace a /cmd_vel message: which node publishes, what subscribes, and two reasons the robot might still not move. 2) Gazebo vs RViz vs Isaac Sim vs MuJoCo: one line each, including tribe. 3) Explain URDF, two commonly botched fields, and symptoms. 4) Sim-to-real gap + domain randomization + Drift's honest relationship to both, under 90 seconds spoken. 5) The three personas: pain, watering hole, and what setup pain costs each. 6) All three competitive stories, from memory, 30 seconds each. 7) QoS mismatches, zombie processes, and silent launch failures — why do they cluster in Drift's sharpest differentiation zone?",
      "Part B — Application: Open Drift's Product Hunt page. Answer in writing, without founder help: the sim-to-real question; the multi-robot/swarm question; the debugging-depth-vs-existing-ROS-tools question; the Mac support question. Compare to founders' replies. Where yours are better, note it: that's your value.",
      "Part C — Production: Write one Reddit reply to a real, current thread from your listening system: diagnosis first, genuinely useful, Drift mentioned only if it fits. Post it if the founders agree.",
    ],
    resources: [],
    quiz: [],
    output:
      "Pass all three parts and you've graduated. Part A 70%+, Part B all four answerable without help, Part C drafted.",
    answerKey:
      "(1) Teleop/planner publishes; base controller subscribes; failure candidates: topic not bridged, QoS mismatch, controller misconfigured, workspace not sourced. (2) Gazebo: ROS-default world simulator. RViz: robot-belief visualizer. Isaac Sim: NVIDIA photorealistic GPU-scale, funded/ML tribe. MuJoCo: fast open-source physics, RL-academic. (3) XML body description; botched inertia → jitter/flipping; botched collision geometry → sinking through floors. (4) Gap is physics-modeling reality; randomization widens trained range; Drift compresses setup/iteration and buys more hardening cycles — never claims to close the gap. (5) Per your persona sheet. (6) Per Day 17. (7) Runtime/connection failures invisible in error text; findable only by inspecting live system state — Drift's differentiation.",
  },
];

export const artifacts = [
  "Robotics Glossary (40+ terms, your definitions)",
  "The Gauntlet log (Lab 1)",
  "Pain Inventory + memo (Lab 2, refresh monthly)",
  "Persona sheet (three columns)",
  "Listening system (daily 10 min)",
  "User Reality Memo (Lab 3)",
  "Wow/Friction note (Day 16)",
  "FAQ doc: sim-to-real + 3 competitive stories + 7 objections",
  "Feature-pain map + 5 positioning statements + roadmap memo (Day 19)",
];

export function getDay(id: number) {
  return days.find((d) => d.id === id);
}
export function getWeek(id: number) {
  return weeks.find((w) => w.id === id);
}

export type GlossaryTerm = { term: string; def: string; category: string };

export const glossary: GlossaryTerm[] = [
  // Robot model & simulation
  {
    category: "Robot model & simulation",
    term: "URDF",
    def: "Unified Robot Description Format. An XML file describing a robot's body: its links, joints, masses, inertia, and collision shapes. Tedious to hand-write, easy to botch; Drift generates it from a prompt.",
  },
  {
    category: "Robot model & simulation",
    term: "Link",
    def: "One rigid part of a robot, like an upper arm or a wheel.",
  },
  {
    category: "Robot model & simulation",
    term: "Joint",
    def: "A moving connection between two links, like an elbow. Defines how the parts rotate or slide relative to each other.",
  },
  {
    category: "Robot model & simulation",
    term: "Inertia",
    def: "How a body resists rotation. Wrong inertia values in a URDF make simulated robots jitter, wobble, or flip on spawn.",
  },
  {
    category: "Robot model & simulation",
    term: "Collision geometry",
    def: "Simplified shapes (boxes, cylinders) used to compute crashes cheaply instead of the detailed visual mesh. Botch it and robots sink through floors or collide with nothing.",
  },
  {
    category: "Robot model & simulation",
    term: "World file",
    def: "Gazebo's description of the environment: ground, walls, objects, lighting. Another hand-written format Drift generates.",
  },
  {
    category: "Robot model & simulation",
    term: "Physics engine",
    def: "Software that steps time forward in tiny increments and computes gravity, friction, and collisions, so simulated objects behave physically.",
  },
  {
    category: "Robot model & simulation",
    term: "Timestep",
    def: "One tiny increment of simulated time. Physics is computed once per step, thousands of times per simulated second.",
  },
  {
    category: "Robot model & simulation",
    term: "Spawn",
    def: "To place a robot model into a running simulation world.",
  },
  {
    category: "Robot model & simulation",
    term: "Headless",
    def: "Running a simulation without the graphical window, for speed. Common in training and CI runs.",
  },
  {
    category: "Robot model & simulation",
    term: "Ground truth",
    def: "The simulator's perfect knowledge of where everything actually is, as opposed to what the robot estimates from its sensors.",
  },
  // ROS
  {
    category: "ROS",
    term: "ROS 2",
    def: "Robot Operating System, current generation. Misnamed: it's middleware, the plumbing that lets the programs inside a robot talk to each other.",
  },
  {
    category: "ROS",
    term: "Node",
    def: "One program with one job: camera driver, path planner, motor controller. A robot runs dozens at once.",
  },
  {
    category: "ROS",
    term: "Topic",
    def: "A named channel nodes use to pass messages. Publishers send, subscribers listen.",
  },
  {
    category: "ROS",
    term: "Publisher / Subscriber",
    def: "The two ends of a topic. The camera node publishes images; the perception node subscribes to them.",
  },
  {
    category: "ROS",
    term: "/cmd_vel",
    def: 'The most famous topic name: velocity commands ("forward at 0.5 m/s, turn at 0.2 rad/s"). Half of beginner debugging is some version of "I publish to /cmd_vel and nothing moves."',
  },
  {
    category: "ROS",
    term: "Service",
    def: "A request-reply call between nodes: ask once, get an answer. Topics stream; services answer.",
  },
  {
    category: "ROS",
    term: "Message",
    def: "One packet of structured data traveling on a topic: an image, a velocity command, a laser scan.",
  },
  {
    category: "ROS",
    term: "Package",
    def: "A folder bundling related code, configs, and metadata. A robot project is several packages.",
  },
  {
    category: "ROS",
    term: "Workspace",
    def: 'The parent directory holding all your packages. You build it, then "source" it so the terminal knows where everything is.',
  },
  { category: "ROS", term: "colcon", def: "The build tool for ROS 2 workspaces." },
  {
    category: "ROS",
    term: "Source (a workspace)",
    def: 'Load the workspace into your terminal session. Forgetting this is the "have you tried turning it off and on" of ROS forums.',
  },
  {
    category: "ROS",
    term: "Launch file",
    def: "A script that starts many nodes at once with the right parameters. Powerful, finicky, and prone to failing silently on a typo.",
  },
  {
    category: "ROS",
    term: "Parameter",
    def: "A named setting a node reads at startup: wheel radius, topic name, controller gain.",
  },
  {
    category: "ROS",
    term: "Distro",
    def: "A ROS release version, named like Ubuntu releases (Humble, Jazzy). Distro mismatches cause a huge share of setup pain.",
  },
  {
    category: "ROS",
    term: "QoS",
    def: "Quality of Service: delivery settings on topics. Two nodes with incompatible QoS both run happily and never exchange a message. A notorious silent killer.",
  },
  {
    category: "ROS",
    term: "Bridge",
    def: "The connector that links simulator data streams to ROS topics, so ROS nodes can read simulated sensors and command simulated motors.",
  },
  {
    category: "ROS",
    term: "Zombie process",
    def: "A leftover background process (classically gzserver) from a crashed run that blocks or corrupts the next launch. Engineers hunt and kill them between attempts.",
  },
  {
    category: "ROS",
    term: "gzserver",
    def: "Gazebo's physics engine process. The classic zombie.",
  },
  // Ecosystem & tools
  {
    category: "Ecosystem & tools",
    term: "Gazebo",
    def: "The default simulator of the ROS world and Drift's home turf. Note the two coexisting generations: Gazebo Classic and the rewritten Gazebo (formerly Ignition), whose tutorials contradict each other.",
  },
  {
    category: "Ecosystem & tools",
    term: "RViz",
    def: "A visualization tool, NOT a simulator. Gazebo shows the world as it is; RViz shows what the robot believes: its sensor data, estimated position, planned path.",
  },
  {
    category: "Ecosystem & tools",
    term: "Isaac Sim",
    def: "NVIDIA's simulator. Photorealistic rendering and massive GPU-parallel training. The tribe of funded, ML-heavy teams.",
  },
  {
    category: "Ecosystem & tools",
    term: "MuJoCo",
    def: "Fast, accurate open-source physics from Google DeepMind. The academic and RL-research darling.",
  },
  {
    category: "Ecosystem & tools",
    term: "Webots",
    def: "Beginner-friendly, batteries-included simulator. The teaching tool.",
  },
  {
    category: "Ecosystem & tools",
    term: "PyBullet",
    def: "Lightweight pure-Python simulator. Fading, still cited in older RL papers.",
  },
  {
    category: "Ecosystem & tools",
    term: "Controller",
    def: 'Software translating high-level commands ("joint to 45°") into motor signals. The classic misconfiguration symptom: robot spawns fine, refuses to move.',
  },
  {
    category: "Ecosystem & tools",
    term: "Plugin",
    def: "An add-on giving Gazebo extra abilities, like a specific sensor or the ROS bridge. Wrong plugin = sensor publishes nothing = downstream nodes starve silently.",
  },
  {
    category: "Ecosystem & tools",
    term: "IMU",
    def: "Inertial Measurement Unit: a sensor reporting orientation and acceleration.",
  },
  {
    category: "Ecosystem & tools",
    term: "Lidar",
    def: "A sensor measuring distances with laser pulses, producing a point cloud of the surroundings.",
  },
  {
    category: "Ecosystem & tools",
    term: "Teleoperation",
    def: "A human driving the robot with controllers, often to collect demonstration data for imitation learning.",
  },
  // Learning & research
  {
    category: "Learning & research",
    term: "Sim-to-real gap",
    def: "Simulated physics never perfectly matches reality, so behavior validated in sim can fail on hardware. The standing objection to all simulation tooling.",
  },
  {
    category: "Learning & research",
    term: "Domain randomization",
    def: "The standard countermeasure: randomize uncertain sim parameters (friction, masses, lighting) during training so the software learns a range of worlds, and reality falls inside it.",
  },
  {
    category: "Learning & research",
    term: "System identification",
    def: "The inverse approach: measure the real robot carefully and tune the simulation to match it.",
  },
  {
    category: "Learning & research",
    term: "Imitation learning",
    def: "Training a robot from human demonstrations, usually collected by teleoperation.",
  },
  {
    category: "Learning & research",
    term: "Reinforcement learning (RL)",
    def: "Training by trial-and-error over millions of attempts with a reward signal. Millions of physical trials are impossible, so RL essentially requires simulation.",
  },
  {
    category: "Learning & research",
    term: "VLA",
    def: 'Vision-language-action model: takes camera images plus a language instruction, outputs robot actions. The "GPT for robots" ambition. See pi0, GR00T.',
  },
  {
    category: "Learning & research",
    term: "pi0",
    def: 'Physical Intelligence\'s VLA, the most-cited "GPT for robots" reference point.',
  },
  {
    category: "Learning & research",
    term: "GR00T",
    def: "NVIDIA's robot foundation model effort.",
  },
  {
    category: "Learning & research",
    term: "LeRobot",
    def: "Hugging Face's open robot-learning library and community. A named target in Drift's growth strategy.",
  },
  {
    category: "Learning & research",
    term: "Reproducibility",
    def: "The chronic academic pain of published papers shipping broken or undocumented sim setups. A tool that turns a description into a runnable setup has a genuine reproducibility story.",
  },
  {
    category: "Learning & research",
    term: "Baseline / benchmark / ablation",
    def: "Researcher vocabulary tells. Baseline: the method you compare against. Benchmark: the standard test. Ablation: removing one component to measure its contribution.",
  },
];

export type LibraryItem = { label: string; href?: string; note: string };
export type LibraryGroup = { title: string; items: LibraryItem[] };

export const library: LibraryGroup[] = [
  {
    title: "Core video",
    items: [
      {
        label: 'Articulated Robotics — "Making a Mobile Robot" series',
        href: "https://articulatedrobotics.xyz",
        note: "The course's video backbone: real builds, beginner pacing, the exact stack Drift automates.",
      },
      {
        label: "The Construct (YouTube)",
        href: "https://www.youtube.com/@TheConstruct",
        note: "Short concept explainers on nodes, topics, and launch files.",
      },
      {
        label: "Drift's demo + comparison videos",
        href: "https://www.godrift.ai",
        note: "Know the flagship debugging-comparison story by heart.",
      },
    ],
  },
  {
    title: "Core reading",
    items: [
      {
        label: "ROS 2 docs — Concepts",
        href: "https://docs.ros.org/en/rolling/Concepts.html",
        note: "The vocabulary source of truth. Read the nodes and topics pages; don't do the tutorials.",
      },
      {
        label: "Gazebo docs",
        href: "https://gazebosim.org/docs",
        note: "Getting-started overview of the canonical simulator in Drift's stack.",
      },
      {
        label: "Drift docs",
        href: "https://docs.godrift.ai/getting-started/introduction",
        note: "Read at Day 1, Day 5, and Day 16. Watch your comprehension climb.",
      },
      {
        label: "MuJoCo docs",
        href: "https://mujoco.readthedocs.io",
        note: "Skim for how the RL-academic tribe describes itself.",
      },
      {
        label: "LeRobot",
        href: "https://huggingface.co/lerobot",
        note: "The robot-learning community named in Drift's growth plan.",
      },
      {
        label: "Physical Intelligence (pi0)",
        href: "https://www.physicalintelligence.company",
        note: 'The "GPT for robots" reference point you\'ll see cited in threads.',
      },
      {
        label: "OpenAI's domain randomization post",
        href: "https://openai.com/index/generalizing-from-simulation/",
        note: "The canonical sim-to-real countermeasure explainer, with pictures of randomized worlds.",
      },
    ],
  },
  {
    title: "Listening posts (permanent)",
    items: [
      {
        label: "r/ROS",
        href: "https://www.reddit.com/r/ROS/",
        note: "Daily 10-minute skim. Beginner and intermediate pain, live.",
      },
      {
        label: "r/robotics",
        href: "https://www.reddit.com/r/robotics/",
        note: "Broader robotics conversation and hobbyist energy.",
      },
      {
        label: "ROS Discourse",
        href: "https://discourse.ros.org",
        note: "The official forum where serious ROS users live. Your tone calibration target.",
      },
      {
        label: "LeRobot Discord",
        href: "https://huggingface.co/lerobot",
        note: "Researchers and hobbyists asking setup questions in real time.",
      },
      {
        label: "Hacker News search",
        href: "https://hn.algolia.com/?q=robotics+simulation",
        note: "Weekly. The industry engineer's native habitat and rhetorical style, uncut.",
      },
      {
        label: "Drift on Product Hunt",
        href: "https://www.producthunt.com/products/drift-ai",
        note: "A corpus of real questions asked of your product, with founder answers you can grade.",
      },
      {
        label: "Hackster.io robotics",
        href: "https://www.hackster.io/robotics",
        note: "What beginner-friendly robotics content looks like when it works.",
      },
      {
        label: "Conference calendars: ICRA, IROS, RSS, CoRL",
        href: "https://www.corl.org",
        note: "Deadline seasons are peak pain and peak receptivity. Time campaigns to them.",
      },
      {
        label: "The Robot Report / IEEE Spectrum robotics",
        href: "https://www.therobotreport.com",
        note: "Monthly industry-news skim.",
      },
    ],
  },
];

export type BipPost = { week: number; title: string; material: string; angle: string };

export const buildInPublic: BipPost[] = [
  {
    week: 1,
    title: '"I watched an engineer spend 40 minutes setting up one robot simulation."',
    material: "Your gauntlet log from Lab 1.",
    angle:
      "The step count and the friction moments, as a marketer discovering what her users survive daily. End on the count. No pitch.",
  },
  {
    week: 2,
    title:
      "\"I read 20 threads of robotics engineers asking for help. Here's what nobody's marketing addresses.\"",
    material: "Pain inventory + your best verbatim quote (anonymized).",
    angle: "The gap between how tools are marketed and how pain is actually phrased.",
  },
  {
    week: 3,
    title:
      '"I interviewed users of the product I market. One question produced better positioning than anything I\'ve written."',
    material: "Interview question 6 and a paraphrased answer.",
    angle:
      "Users' words vs marketers' words. Travels beyond robotics; it's a marketing-craft post.",
  },
  {
    week: 4,
    title: "\"Four weeks ago I couldn't read a ROS forum thread. Here's the system I used.\"",
    material: "The course itself.",
    angle:
      "How a non-technical marketer builds domain literacy: taxonomy → listening system → interviews → evidence-based positioning. Link the series together.",
  },
];

export const bipRules = [
  "Your editorial standards apply: active voice, observation-first, jargon explained or cut.",
  "Anonymize thread authors and interviewees.",
  "Clear anything Drift-specific with the founders before posting.",
  "Each post must stand alone for marketers outside robotics, with the robotics detail as texture.",
];

export const maintenance = [
  "10 minutes daily in the listening system; add pain-inventory rows weekly.",
  "One user conversation per month, minimum.",
  "Re-run the Day 16 product session after every major Drift release; refresh the wow/friction note.",
  "Revisit the glossary when a term stumps you; a stump means the field moved, which is itself a signal.",
  "Quarterly: re-score your 5 positioning statements against fresh threads; retire any drifting into marketing-speak.",
];
