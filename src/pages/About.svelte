<section class="about">
  <div class="intro">
    <h1>About Me</h1>
    <p class="tagline">Building thoughtful software with a unique perspective</p>
  </div>

  <div class="content-grid">
    <!-- Main bio section -->
    <div class="bio-section">
    <h2>Hello! I'm Therese</h2>
    <p>
        I'm an aspiring software engineer with a passion for creating meaningful technology. 
        My journey into software development is unique—I bring a background in cognitive neuroscience 
        and technology analysis that gives me a different lens for problem-solving.
    </p>
    <p>
        What excites me most about programming is the endless opportunity to learn and build. 
        Whether it's developing data visualizations, creating full-stack applications, or exploring 
        game development, I approach each project with curiosity and determination.
    </p>
    <p>
        I'm particularly interested in projects that combine technology with human-centered design—
        applications that not only work well but genuinely improve people's lives. My background 
        in cognitive neuroscience helps me think about user experience from both a technical and 
        psychological perspective.
    </p>
    <p>
        In my free time, I enjoy lifting weights, playing video games, being outdoors, and exploring 
        Denver. I live with my partner and our beautiful dog, Koda. I love trying new things and 
        am always looking for ways to grow both personally and professionally. I love movies, music, 
        and anything that sparks creativity. Connecting with my community and learning from others is 
        something I truly value.
    </p>
    </div>

    <!-- Quick facts sidebar -->
    <aside class="quick-facts">
      <h3>Quick Facts</h3>
      <ul>
        <li><strong>Location:</strong> Denver, CO</li>
        <li><strong>Background:</strong> Cognitive Neuroscience</li>
        <li><strong>Current Role:</strong> Technology Analyst</li>
        <li><strong>Learning:</strong> Full-stack development, APIs, data visualization</li>
        <li><strong>Interests:</strong> Video games, gamification, mental health tech</li>
      </ul>
    </aside>
  </div>

  <!-- What I'm working on section -->
  <div class="current-work">
    <h2>What I'm Working On</h2>
    <div class="work-items">
      <div class="work-card">
        <h3>Portfolio Development</h3>
        <p>Building this website from scratch using Svelte to showcase my projects and growth as a developer.</p>
      </div>
      <div class="work-card">
        <h3>API Projects</h3>
        <p>Creating data visualization dashboards and exploring how to work with various APIs like Spotify.</p>
      </div>
      <div class="work-card">
        <h3>Continuous Learning</h3>
        <p>Practicing coding challenges, exploring new frameworks, and deepening my understanding of JavaScript and full-stack development.</p>
      </div>
    </div>
  </div>

  <!-- Philosophy section -->
  <div class="philosophy">
    <h2>My Approach</h2>
    <blockquote>
      "The more I see, the less I know" — but I embrace that feeling as part of the journey.
    </blockquote>
    <p>
      I believe in learning by doing, breaking problems into manageable pieces, and not being afraid 
      to dive into documentation. Every project teaches me something new, and I'm committed to being 
      a lifelong learner in this ever-evolving field.
    </p>
  </div>

  <!-- Call to action -->
  <div class="cta-section">
    <h2>Let's Connect</h2>
    <p>I'm always interested in new opportunities, collaborations, or just chatting about technology.</p>
    <div class="cta-buttons">
      <a href="#/contact" class="btn">Get in Touch</a>
      <a href="#/projects" class="btn btn-secondary">View My Projects</a>
    </div>
  </div>
</section>

<style>
  .about {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem 1.5rem;
  }

  .intro {
    text-align: center;
    margin-bottom: 3rem;
  }

  .intro h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  .tagline {
    font-size: 1.2rem;
    color: #555;
  }

  .content-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
    margin-bottom: 3rem;
  }

  .bio-section h2 {
    margin-bottom: 1rem;
  }

  .bio-section p {
    line-height: 1.7;
    margin-bottom: 1rem;
    color: #333;
  }

  .quick-facts {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 8px;
    height: fit-content;
  }

  .quick-facts h3 {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  .quick-facts ul {
    list-style: none;
    padding: 0;
  }

  .quick-facts li {
    margin-bottom: 0.75rem;
    line-height: 1.5;
  }

  .current-work {
    margin-bottom: 3rem;
  }

  .current-work h2 {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .work-items {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .work-card {
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 1.5rem;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .work-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .work-card h3 {
    margin-top: 0;
    margin-bottom: 0.75rem;
    color: #007acc;
  }

  .work-card p {
    margin: 0;
    line-height: 1.6;
    color: #555;
  }

  .philosophy {
    background: #f0f7ff;
    padding: 2rem;
    border-radius: 8px;
    margin-bottom: 3rem;
  }

  .philosophy h2 {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  blockquote {
    font-style: italic;
    font-size: 1.1rem;
    color: #007acc;
    margin: 1rem 0;
    padding-left: 1rem;
    border-left: 3px solid #007acc;
  }

  .philosophy p {
    line-height: 1.7;
    color: #333;
  }

  .cta-section {
    text-align: center;
    padding: 2rem;
    background: #f8f9fa;
    border-radius: 8px;
  }

  .cta-section h2 {
    margin-top: 0;
    margin-bottom: 0.5rem;
  }

  .cta-section p {
    margin-bottom: 1.5rem;
    color: #555;
  }

  .cta-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .btn {
    padding: 0.75rem 1.5rem;
    border-radius: 5px;
    background: #007acc;
    color: white;
    text-decoration: none;
    transition: background 0.2s ease;
    display: inline-block;
  }

  .btn:hover {
    background: #005f99;
  }

  .btn-secondary {
    background: #6c757d;
  }

  .btn-secondary:hover {
    background: #545b62;
  }

  /* Responsive design */
  @media (max-width: 768px) {
    .content-grid {
      grid-template-columns: 1fr;
    }

    .intro h1 {
      font-size: 2rem;
    }

    .work-items {
      grid-template-columns: 1fr;
    }
  }
</style>