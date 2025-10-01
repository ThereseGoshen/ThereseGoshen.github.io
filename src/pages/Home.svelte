<!-- hero section: main introduction (I feel so heroic hahaha) -->
<section class="hero">
  <h1>Hi, I'm Therese Goshen</h1>

  <p>Aspiring Software Engineer | Cognitive Neuroscience Background | Technology Analyst</p>

  <div class="cta">
    <!-- resume  -->
    <a href="#/resume" class="btn">Resume</a>

    <!-- github-->
    <a href="https://github.com/ThereseGoshen" target="_blank" class="btn">GitHub</a>

    <!-- linkedin -->
    <a href="https://www.linkedin.com/in/th%C3%A9r%C3%A8se-goshen-250422274/" target="_blank" class="btn">LinkedIn</a>
  </div>
</section>

<style>
  /* main section */
  .hero {
    text-align: center;
    padding: 4rem 2rem;
  }

  /* my name! */
  .hero h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  /* tagline */
  .hero p {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
    color: #555;
  }

  /* line up button horizonally */
  .cta {
    display: flex;
    justify-content: center;
    gap: 1rem; 
  }

  /* button styles */
  .btn {
    padding: 0.75rem 1.25rem;
    border-radius: 5px;
    background: #007acc;
    color: white;
    text-decoration: none;
    /* smooth transition effect for background color on hover */
    transition: background 0.2s ease; 
  }

  /* hover effect on button */
  .btn:hover {
    background: #005f99;
  }
</style>