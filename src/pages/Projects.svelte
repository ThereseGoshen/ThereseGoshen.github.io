<script>
  // Array of project data — you can expand or load dynamically later
  let projects = [
    {
      name: "EventPass Ticket Manager",
      description:
        "A C++ console app for managing events, attendees, and ticket purchases with balance tracking.",
      image: "/images/eventpass-image.png",
      link: "https://github.com/ThereseGoshen/eventpass-ticket-manager#"
    },
  ];
</script>

<style>

    h1 {
        text-align: center;
        margin-bottom: 2rem;
    }

    .projects-page {
        max-width: 1000px;
        margin: 0 auto;
        padding: 2rem;
    }

    .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.5rem;
    }

    .card {
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
        overflow: hidden;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        display: flex;
        flex-direction: column;
    }

    .card:hover {
        transform: translateY(-4px);
        box-shadow: 0 6px 14px rgba(0, 0, 0, 0.12);
    } 

    .card img {
        width: 100%;
        aspect-ratio: 20/9;
        object-fit: cover;
    }

    .card-body {
        padding: 1rem;
    }

    h2 {
        font-size: 1.3rem;
        margin-bottom: 0.5rem;
    }

    p {
        font-size: 0.95rem;
        color: #444;
        margin-bottom: 1rem;
    }

    a {
        display: inline-block;
        background-color: #007bff;
        color: white;
        padding: 0.5rem 0.9rem;
        border-radius: 6px;
        text-decoration: none;
        font-weight: 500;
    }

    a:hover {
        background-color: #0056b3;
    }
</style>

<div class="projects-page">
  <h1>My Projects</h1>
  <div class="projects-grid">
    {#each projects as project}
      <div class="card">
        <img src={project.image} alt={project.name} />
        <div class="card-body">
          <h2>{project.name}</h2>
          <p>{project.description}</p>
          <a href={project.link} target="_blank">View Project</a>
        </div>
      </div>
    {/each}
  </div>
</div>