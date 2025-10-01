

<main>
    <section>
        <h1>My Resume</h1>
        
        <!-- embedding the resume into the page with iframe-->
        <iframe
            src="/resume.pdf"
            width="100%" 
            height="600px" 
            title="Resume"
            style="border: none;">
        </iframe>
        
        <!-- the link to download -->
        <p>
            <a href=".resume.pdf" download="Therese_Goshen_Resume.pdf">
                Download My Resume Here
            </a>
        </p>
    </section>
</main>

<style>
    /* added some basic styling (play around with this)*/
    main {
        padding: 2rem;
        font-family: Arial, sans-serif;
    }

    h1 {
        text-align: center;
        margin-bottom: 1rem;
    }

    iframe {
        display: block;
        margin: 0 auto;
    }

    p {
        text-align: center;
        margin-top: 1rem;
    }

    a {
        color: #007BFF;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }
</style>
