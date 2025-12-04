<script>
	import Router from "svelte-spa-router";

	//importing the pages
	import Home from "./pages/Home.svelte";
	import About from "./pages/About.svelte";
	import Contact from "./pages/Contact.svelte";
	import Resume from "./pages/Resume.svelte";
	import Projects from "./pages/Projects.svelte";
	import Blog from "./pages/Blog.svelte";
	import Education from "./pages/Education.svelte";

	//routes
	const routes = {
		"/": Home,
		"/about": About,
		"/contact": Contact,
		"/education": Education,
		"/resume": Resume,
		"/projects": Projects,
		"/blog": Blog,
	};
</script>

<nav>

	<a href="#/">Home</a>
	<a href="#/about">About</a>
	<a href="#/education">Education</a>
	<a href="#/projects">Projects</a>
  	<a href="#/blog">Blog</a>
  	<a href="#/resume">Resume</a>
  	<a href="#/contact">Contact</a>

</nav>
<main>
	<Router {routes} /> 
</main>

<style>
	/* Navbar styling */
	nav {
		display: flex; /* this displays pages horizontally*/
		gap: 1rem; /*spacing between links, size of font*/
		margin: 1rem; /*pushes navbar away from edges by size of font*/
	}
	a {
		text-decoration: none; /* removing the underline from links*/
		color: #0070f3;
	}
	a:hover {
		text-decoration: underline; /*hover gives underline*/
	}
	
</style>