<script>
  import { onMount } from 'svelte';
  
  // Stats that count up on page load
  let projectsCount = 0;
  let skillsCount = 0;
  let coffeeCups = 0;
  
  // Fun facts that rotate
  let facts = [
    "Background in Cognitive Neuroscience",
    "Passionate about game development",
    "Love creating data visualizations",
    "Powered by curiosity (and coffee)",
    "Always learning something new"
  ];
  let currentFact = 0;
  
  // Animated typing effect
  let typedText = "";
  let fullText = "Aspiring Software Engineer | Cognitive Neuroscience Background | Technology Analyst";
  let typingIndex = 0;
  
  onMount(() => {
    // Count up animation for stats
    const countUp = (target, setter, duration) => {
      const increment = target / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.floor(current));
        }
      }, 16);
    };
    
    countUp(3, (val) => projectsCount = val, 1000);
    countUp(15, (val) => skillsCount = val, 1200);
    countUp(247, (val) => coffeeCups = val, 1500);
    
    // Typing effect
    const typeInterval = setInterval(() => {
      if (typingIndex < fullText.length) {
        typedText += fullText[typingIndex];
        typingIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 50);
    
    // Rotate fun facts every 3 seconds
    const factInterval = setInterval(() => {
      currentFact = (currentFact + 1) % facts.length;
    }, 3000);
    
    return () => {
      clearInterval(typeInterval);
      clearInterval(factInterval);
    };
  });
</script>

<div class="home-container">
  <!-- Hero Section -->
  <section class="hero">
    <h1>Hi, I'm Therese Goshen</h1>
    
    <div class="typing-container">
      <p class="typed-text">{typedText}<span class="cursor">|</span></p>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">[#]</div>
        <div class="stat-value">{projectsCount}+</div>
        <div class="stat-label">Projects</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">(*)</div>
        <div class="stat-value">{skillsCount}+</div>
        <div class="stat-label">Skills</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">c[_]</div>
        <div class="stat-value">{coffeeCups}</div>
        <div class="stat-label">Cups of Coffee</div>
      </div>
    </div>
    
    <!-- Rotating Fun Fact -->
    <div class="fun-fact">
      <span class="fact-icon">~></span>
      <div class="fact-content">{facts[currentFact]}</div>
    </div>

    <!-- CTA Buttons -->
    <div class="cta">
      <a href="#/resume" class="btn btn-primary">Resume</a>
      <a href="https://github.com/ThereseGoshen" target="_blank" class="btn btn-secondary">GitHub</a>
      <a href="https://www.linkedin.com/in/th%C3%A9r%C3%A8se-goshen-250422274/" target="_blank" class="btn btn-secondary">LinkedIn</a>
    </div>
  </section>

  <!-- Quick Links -->
  <section class="quick-links">
    <h2>Explore My Portfolio</h2>
    <div class="links-grid">
      <a href="#/about" class="link-card">
        <div class="link-icon">@</div>
        <h3>About Me</h3>
        <p>Learn about my journey</p>
      </a>
      <a href="#/projects" class="link-card">
        <div class="link-icon">++</div>
        <h3>Projects</h3>
        <p>See what I've built</p>
      </a>
      <a href="#/blog" class="link-card">
        <div class="link-icon">~</div>
        <h3>Blog</h3>
        <p>Weekly updates</p>
      </a>
    </div>
  </section>
</div>

<style>
  .home-container {
    min-height: 100vh;
  }

  /* Hero Section */
  .hero {
    text-align: center;
    padding: 4rem 2rem;
    max-width: 900px;
    margin: 0 auto;
  }

  .hero h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #007acc;
  }

  /* Typing Effect */
  .typing-container {
    min-height: 2rem;
    margin-bottom: 2rem;
  }

  .typed-text {
    font-size: 1.25rem;
    color: #555;
  }

  .cursor {
    animation: blink 1s infinite;
  }

  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }

  /* Stats Grid */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1.5rem;
    max-width: 600px;
    margin: 2rem auto;
  }

  .stat-card {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .stat-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 122, 204, 0.2);
  }

  .stat-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    font-family: 'Courier New', monospace;
    font-weight: bold;
    color: #007acc;
  }

  .stat-value {
    font-size: 2.5rem;
    font-weight: bold;
    color: #007acc;
    margin-bottom: 0.5rem;
  }

  .stat-label {
    color: #666;
    font-size: 1rem;
  }

  /* Fun Fact */
  .fun-fact {
    margin: 2rem auto;
    padding: 1rem 2rem;
    background: linear-gradient(135deg, #f0f7ff 0%, #e6f2ff 100%);
    border-radius: 12px;
    max-width: 600px;
    border-left: 4px solid #007acc;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .fact-icon {
    font-family: 'Courier New', monospace;
    font-size: 1.5rem;
    font-weight: bold;
    color: #007acc;
    flex-shrink: 0;
  }

  .fact-content {
    font-size: 1.1rem;
    color: #333;
    animation: fadeIn 0.5s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-5px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* CTA Buttons */
  .cta {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
    margin-top: 2rem;
  }

  .btn {
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  .btn-primary {
    background: #007acc;
    color: white;
  }

  .btn-primary:hover {
    background: #005f99;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 122, 204, 0.3);
  }

  .btn-secondary {
    background: #6c757d;
    color: white;
  }

  .btn-secondary:hover {
    background: #545b62;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(108, 117, 125, 0.3);
  }

  /* Quick Links */
  .quick-links {
    max-width: 1000px;
    margin: 4rem auto;
    padding: 2rem;
  }

  .quick-links h2 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 2rem;
    color: #333;
  }

  .links-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
  }

  .link-card {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    text-align: center;
    text-decoration: none;
    color: inherit;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    border-top: 4px solid transparent;
  }

  .link-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 122, 204, 0.2);
    border-top-color: #007acc;
  }

  .link-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    font-family: 'Courier New', monospace;
    font-weight: bold;
    color: #007acc;
  }

  .link-card h3 {
    margin: 0 0 0.5rem 0;
    color: #007acc;
    font-size: 1.3rem;
  }

  .link-card p {
    margin: 0;
    color: #666;
    font-size: 0.95rem;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .hero h1 {
      font-size: 2rem;
    }

    .typed-text {
      font-size: 1rem;
    }

    .stats-grid {
      grid-template-columns: 1fr;
    }

    .cta {
      flex-direction: column;
    }

    .btn {
      width: 100%;
      text-align: center;
    }
  }
</style>