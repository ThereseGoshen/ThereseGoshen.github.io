<script>
    //The weekly posts as an array
    let posts = [
        {
            title: "Week 2: Introduction to the class",
            date: "09-11-2025",
            content: `<p>Since I joined the class this week, I don't have much to work with from last week, and have been trying to brainstorm a project to go off of. 
            I am a bit stuck between two ideas: a data pipeline and dashboard, or learning how to develop a full-stack app. 
            My data dashboard idea would probably combine Python, SQL, and Power BI to collect data from a public API and create a visualization dashboard for it. 
            I'm not sure what data I would want to capture, but I think this would help develop a strong background in data analytics. </p>
            <p>For the full-stack app, I thought this would be a great project because I would love to learn how to make applications for my own personal projects. 
            I also love video games and would love to have some background in app dev. 
            I could also combine some of the data aspects by creating an app that pulls data from APIs for trivia or something similar. 
            Some other ideas I have could combine my previous background in psychology and biology, and create a journal/mental health tracker that could gamify journaling and mental wellbeing (maybe mixing Cognitive Processing Therapy and Cognitive Behavioral Therapy techniques). 
            I also like the idea of creating a fitness tracker app or a game. "Gamifying" something sounds really exciting to me!</p>
            <p>I have also been thinking about my personal portfolio website and practicing coding questions. 
            The idea of creating a project is daunting to me, and it is hard to narrow down exactly what I want to try to learn. My main goal is to become a more knowledgeable programmer. 
            Sometimes I relate to the quote, "the more I see, the less I know." I want to feel more confident in myself with my programming skills and commit to being a lifelong learner. 
            I actually received an offer letter today from my previous internship! I am looking to keep refining my skills and portfolio.</p>`
        },
        {
            title: "Week 3: Project Decision",
            date: "09-18-2025",
            content:`<p>This week, I was finalizing some ideas for my project and researching how to make a portfolio website and what technologies to use for my project. 
            I think I have finally settled on creating a data visualization dashboard with Spotify and creating a personal portfolio website. 
            I've been looking at the documentation that the Spotify API website has, and looking at what I need to learn.</p>
            <a href="https://developer.spotify.com/documentation/web-api" target="_blank">Spotify API Documentation</a>
            <p>I have also been researching different ways to visualize the data and website, and I was thinking of using React. 
            Last week, I was looking into different ways that I could go about making a game and narrowing down what I wanted to do for my project. I was having a hard time narrowing down what I wanted to do because I have a hard time knowing exactly how much time a specific project may take. 
            This week, I was having a lot of different family events that made getting things done on time a bit difficult. 
            Next week, I really want to focus on creating a more thought-out framework for the website and starting to work on how the API will function.</p>`
        },
        {
            title: "Week 4: Node.js, React.js, and Vite",
            date: "09-25-2025",
            content: `<p>Last week, I was researching the different technologies I would need to make the Spotify dashboard, such as Node.js and React.js. 
            I was also researching and looking into how to host a website on GitHub. 
            To be honest, I was also still figuring out what my project would be since I was floating around a lot of ideas of what I would finally pick. 
            I decided on the Spotify dashboard API because I thought it would be a great way to practice the front and backend of an API and web development.</p>
            <p>This week, I've been going through the Spotify website through the tutorial they have on using their API. 
            I was able to download Node.js and start making a practice app on the Spotify website. I'm using Conda as my environment control. 
            The tutorial and app use Vite as a development server. I want to play around more with the tutorial, and I also would love to read more about JavaScript documentation and maybe watch some tutorials since I haven't been exposed to it too much. 
            In the software dev class, I remember hosting a database with a front-end website for a fake pet store with my team. However, I still forget some things, and it feels a lot different doing it all alone.</p>
            <p> I feel like doing a project on my own has made me feel both inspired and intimidated. I am having a lot of fun looking into the languages and technologies on my own. 
            The best way I've been learning has been trying to do something and realizing I have no idea what I'm doing. 
            Then I can look into each piece of the puzzle one step at a time. (Like: do I have to install Vite? Ohh, it's a package on NVM on Node.js, and I can install it through there.) </p>
            <p>It's a feeling of "the more I see, the less I know," but I am enjoying the process! 
            I hope to have a practice app up and play around with it, as well as look into JavaScript and both Node and React.</p>`
        }
        //new posts can be added here in the array
    ];
</script>



<section class="blog">
    <h1>Weekly Blog Posts</h1>
    <!-- loop through each post with #each-->
    {#each posts.reverse() as post}
        <!-- blog post article with consistent styling -->
        <article class="post"> 
            <h2>{post.title}</h2>
            <p class="date">{post.date}</p>
            <p>{@html post.content}</p> 
            <hr>
        </article>
        <!-- looping through each post and presenting each as one article-->
    {/each}
</section>

<!-- make sure that the post.content is in the /each, otherwise it wont be able to see it-->

<style>
  .blog {
    max-width: 800px;
    margin: 2rem auto;
    padding: 0 1rem;
  }

  .blog h1 {
    text-align: center;
    margin-bottom: 2rem;
  }

  .post h2 {
    font-size: 1.5rem;
    margin-bottom: 0.25rem;
  }

  .date {
    font-size: 0.85rem;
    color: #777;
    margin-bottom: 0.5rem;
  }

  .post p {
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  hr {
    margin: 2rem 0;
    border: none;
    border-top: 1px solid #ddd;
  }
</style>