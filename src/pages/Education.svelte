<script>
  // Education data 
  let education = [
    {
      degree: "Bachelor of Arts in Psychology, Minor in Biology, Concentration in Neuroscience",
      institution: "University of Denver", 
      location: "Denver, CO",
      graduation: "May 2023", 
      highlights: [
        "Focused on the intersection of psychology, neuroscience, and behavior",
        "Developed strong analytical and research skills",
        "Coursework in statistics, research methods, and data analysis"
      ]
    },

    {
        degree: "Bachelor of Science in Computer Science",
        institution: "University of Colorado Boulder",
        location: "Boulder, CO",
        graduation: "December 2025",
        highlights: [
          "Comprehensive curriculum covering algorithms, data structures, and software engineering",
          "Hands-on experience with full-stack development and database management",
          "Collaborated on team projects to build web applications and software solutions"
        ]
    }
  ];

  // Relevant coursework - customize these
  let coursework = [
    { name: "Software Development", description: "Team-based project development, database management" },
    { name: "Data Structures & Algorithms", description: "Problem-solving, computational thinking" },
    { name: "Research Methods", description: "Experimental design, statistical analysis" },
    { name: "Cognitive Psychology", description: "Human cognition, perception, and decision-making" },
    { name: "Statistics", description: "Data analysis and interpretation" }
  ];

  // Certifications or additional learning
  let certifications = [
    //add these later
  ];

  // Skills learned through education
  let skills = {
    technical: ["Python", "JavaScript", "C++", "SQL", "Git", "React", "Svelte", "Node.js"],
    analytical: ["Data Analysis", "Research Design", "Statistical Analysis", "Problem Solving"],
    soft: ["Team Collaboration", "Project Management", "Technical Writing", "Communication"]
  };
</script>

<section class="education">
  <div class="header">
    <h1>Education</h1>
    <p class="subtitle">My academic background and continuous learning journey</p>
  </div>

  <!-- Formal Education -->
  <div class="section-block">
    <h2>Formal Education</h2>
    {#each education as edu}
      <div class="education-card">
        <div class="card-header">
          <div>
            <h3>{edu.degree}</h3>
            <p class="institution">{edu.institution}</p>
            <p class="meta">{edu.location} • {edu.graduation}</p>
          </div>
          {#if edu.gpa}
            <div class="gpa">
              <span class="gpa-label">GPA</span> <!-- if I choose to include it -->
              <span class="gpa-value">{edu.gpa}</span>
            </div>
          {/if}
        </div>
        <ul class="highlights">
          {#each edu.highlights as highlight}
            <li>{highlight}</li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>

  <!-- Relevant Coursework -->
  <div class="section-block">
    <h2>Relevant Coursework</h2>
    <div class="coursework-grid">
      {#each coursework as course}
        <div class="course-card">
          <h4>{course.name}</h4>
          <p>{course.description}</p>
        </div>
      {/each}
    </div>
  </div>

  <!-- Skills Developed -->
  <div class="section-block">
    <h2>Skills Developed Through Education</h2>
    <div class="skills-section">
      <div class="skill-category">
        <h3>Technical Skills</h3>
        <div class="skill-tags">
          {#each skills.technical as skill}
            <span class="tag">{skill}</span>
          {/each}
        </div>
      </div>
      <div class="skill-category">
        <h3>Analytical Skills</h3>
        <div class="skill-tags">
          {#each skills.analytical as skill}
            <span class="tag">{skill}</span>
          {/each}
        </div>
      </div>
      <div class="skill-category">
        <h3>Soft Skills</h3>
        <div class="skill-tags">
          {#each skills.soft as skill}
            <span class="tag">{skill}</span>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <!-- Certifications & Continued Learning -->
  <div class="section-block">
    <h2>Certifications & Continued Learning</h2>
    <p class="learning-statement">
      I'm committed to continuous learning and regularly engage with online courses, 
      tutorials, and documentation to expand my technical skills.
    </p>
    <div class="cert-list">
      {#each certifications as cert}
        <div class="cert-item">
          <div class="cert-icon">🎓</div>
          <div class="cert-details">
            <h4>{cert.name}</h4>
            <p>{cert.provider} • {cert.date}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Call to Action -->
  <div class="cta-box">
    <h3>Interested in working together?</h3>
    <p>Check out my projects or get in touch to discuss opportunities.</p>
    <div class="cta-buttons">
      <a href="#/projects" class="btn">View Projects</a>
      <a href="#/contact" class="btn btn-secondary">Contact Me</a>
    </div>
  </div>
</section>

<style>
  .education {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem 1.5rem;
  }

  .header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .header h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    font-size: 1.1rem;
    color: #666;
  }

  .section-block {
    margin-bottom: 3rem;
  }

  .section-block h2 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: #333;
    border-bottom: 2px solid #007acc;
    padding-bottom: 0.5rem;
  }

  /* Education Cards */
  .education-card {
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 2rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
  }

  .education-card h3 {
    margin: 0 0 0.5rem 0;
    color: #007acc;
    font-size: 1.4rem;
  }

  .institution {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0 0 0.25rem 0;
    color: #333;
  }

  .meta {
    color: #666;
    margin: 0;
    font-size: 0.95rem;
  }

  .gpa {
    text-align: center;
    background: #f0f7ff;
    padding: 0.75rem 1rem;
    border-radius: 8px;
  }

  .gpa-label {
    display: block;
    font-size: 0.85rem;
    color: #666;
    margin-bottom: 0.25rem;
  }

  .gpa-value {
    display: block;
    font-size: 1.5rem;
    font-weight: bold;
    color: #007acc;
  }

  .highlights {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .highlights li {
    padding-left: 1.5rem;
    margin-bottom: 0.5rem;
    position: relative;
    line-height: 1.6;
  }

  .highlights li::before {
    content: "▸";
    position: absolute;
    left: 0;
    color: #007acc;
    font-weight: bold;
  }

  /* Coursework Grid */
  .coursework-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
  }

  .course-card {
    background: #f8f9fa;
    padding: 1.25rem;
    border-radius: 8px;
    border-left: 3px solid #007acc;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .course-card:hover {
    transform: translateX(4px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .course-card h4 {
    margin: 0 0 0.5rem 0;
    color: #333;
  }

  .course-card p {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
    line-height: 1.5;
  }

  /* Skills Section */
  .skills-section {
    display: grid;
    gap: 1.5rem;
  }

  .skill-category h3 {
    font-size: 1.2rem;
    margin-bottom: 0.75rem;
    color: #333;
  }

  .skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .tag {
    background: #007acc;
    color: white;
    padding: 0.4rem 0.9rem;
    border-radius: 20px;
    font-size: 0.9rem;
    transition: background 0.2s ease;
  }

  .tag:hover {
    background: #005f99;
  }

  /* Certifications */
  .learning-statement {
    color: #555;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  .cert-list {
    display: grid;
    gap: 1rem;
  }

  .cert-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 1rem;
  }

  .cert-icon {
    font-size: 2rem;
  }

  .cert-details h4 {
    margin: 0 0 0.25rem 0;
    color: #333;
  }

  .cert-details p {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
  }

  /* Call to Action */
  .cta-box {
    background: linear-gradient(135deg, #007acc 0%, #005f99 100%);
    color: white;
    padding: 2.5rem;
    border-radius: 12px;
    text-align: center;
    margin-top: 3rem;
  }

  .cta-box h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.8rem;
  }

  .cta-box p {
    margin: 0 0 1.5rem 0;
    font-size: 1.1rem;
    opacity: 0.95;
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
    background: white;
    color: #007acc;
    text-decoration: none;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    font-weight: 600;
  }

  .btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .btn-secondary {
    background: transparent;
    color: white;
    border: 2px solid white;
  }

  .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .header h1 {
      font-size: 2rem;
    }

    .card-header {
      flex-direction: column;
      gap: 1rem;
    }

    .gpa {
      align-self: flex-start;
    }

    .coursework-grid {
      grid-template-columns: 1fr;
    }

    .cta-buttons {
      flex-direction: column;
    }

    .btn {
      width: 100%;
    }
  }
</style>