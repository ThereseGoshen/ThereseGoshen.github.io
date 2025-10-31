<!-- Contact page: accessible form with optional Formspree integration -->
<script>
    // Configuration:
    // FORM_ENDPOINT: Formspree endpoint URL.
	// If left empty, the form will fall back to opening the user's mail client via mailto:.
	// TEST_MODE: set to true to post to a test endpoint (httpbin) so you can try the form without signing up.
	// when ready, put Formspree endpoint into FORM_ENDPOINT and set TEST_MODE to false.
	const FORM_ENDPOINT = "";
	const TEST_MODE = true; // set to false to disable test POSTs
	const TEST_ENDPOINT = 'https://httpbin.org/post';

	let debugResponse = null; // holds the JSON response from test endpoint for display

	let name = "";
	let email = "";
	let message = "";
	let sending = false;
	let success = null; // null | true | false
	let errors = {};

	function validate() {
		errors = {};
		if (!name.trim()) errors.name = 'Please enter your name.';
		if (!email.trim()) {
			errors.email = 'Please enter your email.';
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			errors.email = 'Please enter a valid email address.';
		}
		if (!message.trim() || message.trim().length < 10) {
			errors.message = 'Please enter a message (at least 10 characters).';
		}
		return Object.keys(errors).length === 0;
	}

	async function handleSubmit(e) {
		e?.preventDefault?.();
		success = null;
		if (!validate()) return;

		sending = true;
			try {
				// Test mode: POST to TEST_ENDPOINT (httpbin) and show the JSON response for easy testing
				if (TEST_MODE) {
					const payload = { name, email, message };
					const res = await fetch(TEST_ENDPOINT, {
						method: 'POST',
						headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
						body: JSON.stringify(payload),
					});

					const data = await res.json().catch(() => null);
					debugResponse = data;
					if (res.ok) {
						success = true;
						name = email = message = '';
					} else {
						success = false;
					}
				} else if (FORM_ENDPOINT) {
				// Formspree expects either form-encoded or JSON depending on configuration.
				const payload = { name, email, message };
				const res = await fetch(FORM_ENDPOINT, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
					body: JSON.stringify(payload),
				});

				if (res.ok) {
					success = true;
					name = email = message = '';
				} else {
					success = false;
				}
			} else {
				// mailto fallback — replace the recipient with your email address below.
				const recipient = 'your-email@example.com';
				const subject = encodeURIComponent('Contact from portfolio');
				const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
				window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
				success = true;
			}
		} catch (err) {
			console.error(err);
			success = false;
		} finally {
			sending = false;
		}
	}
</script>

<section class="contact">
	<h2>Contact</h2>

	<p class="lead">I'd love to hear from you — whether it's about a role, a project, or a hello!</p>

	<div class="contact-grid">
		<!-- Form column -->
		<div class="form-col">
			<form on:submit|preventDefault={handleSubmit} novalidate>
				<div class="field">
					<label for="name">Name</label>
					<input id="name" type="text" bind:value={name} aria-describedby="name-error" required />
					{#if errors.name}
						<p id="name-error" class="error" aria-live="polite">{errors.name}</p>
					{/if}
				</div>

				<div class="field">
					<label for="email">Email</label>
					<input id="email" type="email" bind:value={email} aria-describedby="email-error" required />
					{#if errors.email}
						<p id="email-error" class="error" aria-live="polite">{errors.email}</p>
					{/if}
				</div>

				<div class="field">
					<label for="message">Message</label>
					<textarea id="message" rows="6" bind:value={message} aria-describedby="message-error" required></textarea>
					{#if errors.message}
						<p id="message-error" class="error" aria-live="polite">{errors.message}</p>
					{/if}
				</div>

				<div class="actions">
					<button class="btn" type="submit" disabled={sending} aria-busy={sending}>
						{sending ? 'Sending...' : 'Send Message'}
					</button>
				</div>
			</form>

			{#if success === true}
				<div class="notice success" role="status" aria-live="polite">Thanks — your message was sent.</div>
			{:else if success === false}
				<div class="notice error" role="alert" aria-live="polite">Something went wrong. Please try again later.</div>
			{/if}

			{#if debugResponse}
				<section class="debug-response">
					<h4>Test response</h4>
					<pre class="debug">{JSON.stringify(debugResponse, null, 2)}</pre>
				</section>
			{/if}
		</div>

		<!-- Info column -->
		<aside class="info-col" aria-label="Contact information">
			<!-- Replace the placeholders below with your actual info -->
			<div class="card">
				<h3>Therese Goshen</h3>
				<p class="bio">Aspiring Software Engineer with a background in Cognitive Neuroscience and technology analysis. I build thoughtful, accessible web experiences.</p>

				<ul class="contact-list">
					<li><strong>Email:</strong> <a href="mailto:theresegoshen@gmail.com">theresegoshen@gmail.com</a></li>
					<li><strong>Location:</strong> Denver, CO</li>
					<li><strong>Resume:</strong> <a href="/resume.pdf" target="_blank" rel="noopener">Download PDF</a></li>
				</ul>

				<div class="social">
					<a href="https://github.com/ThereseGoshen" target="_blank" rel="noopener">GitHub</a>
					<a href="https://www.linkedin.com/in/th%C3%A9r%C3%A8se-goshen-250422274/" target="_blank" rel="noopener">LinkedIn</a>
				</div>

				<p class="note">You can use the form to message me directly, or contact me via the links above. To have messages delivered directly to this site, add a Formspree endpoint to the <code>FORM_ENDPOINT</code> constant at the top of this file.</p>
			</div>
		</aside>
	</div>
</section>

<style>
	.contact {
		max-width: 680px;
		margin: 2rem auto;
		padding: 1.5rem;
	}

		/* grid layout: form + info card */
		.contact-grid {
			display: grid;
			grid-template-columns: 1fr 320px;
			gap: 1.5rem;
			align-items: start;
		}

		.form-col {
			min-width: 0;
		}

		.info-col .card {
			border: 1px solid #e6e6e6;
			padding: 1rem;
			border-radius: 8px;
			background: #fbfbfb;
		}

		.card h3 {
			margin: 0 0 0.25rem 0;
		}

		.bio {
			color: #444;
			margin-bottom: 0.75rem;
		}

		.contact-list {
			list-style: none;
			padding: 0;
			margin: 0 0 0.75rem 0;
		}

		.contact-list li {
			margin-bottom: 0.45rem;
		}

		.social {
			display: flex;
			gap: 0.5rem;
			margin-bottom: 0.75rem;
		}

		.note {
			font-size: 0.9rem;
			color: #666;
		}

	.contact h2 {
		font-size: 1.75rem;
		margin-bottom: 0.25rem;
	}

	.lead {
		color: #555;
		margin-bottom: 1rem;
	}

	.field {
		margin-bottom: 1rem;
		display: flex;
		flex-direction: column;
	}

	label {
		margin-bottom: 0.35rem;
		font-weight: 600;
	}

	input[type="text"], input[type="email"], textarea {
		padding: 0.6rem 0.75rem;
		border: 1px solid #d0d0d0;
		border-radius: 6px;
		font-size: 1rem;
		outline: none;
	}

	input:focus, textarea:focus {
		border-color: #007acc;
		box-shadow: 0 0 0 3px rgba(0, 122, 204, 0.08);
	}

	.actions {
		margin-top: 0.5rem;
	}

	.btn {
		padding: 0.6rem 1rem;
		background: #007acc;
		color: #fff;
		border: none;
		border-radius: 6px;
		cursor: pointer;
	}

	.btn[disabled] {
		opacity: 0.7;
		cursor: default;
	}

	.error {
		color: #b00020;
		margin-top: 0.35rem;
		font-size: 0.95rem;
	}

	.notice {
		margin-top: 1rem;
		padding: 0.75rem 1rem;
		border-radius: 6px;
	}

	.notice.success {
		background: #e6ffef;
		color: #024b24;
		border: 1px solid #b7f0c7;
	}

	.notice.error {
		background: #ffeef0;
		color: #55000a;
		border: 1px solid #f5c2c7;
	}

	.small {
		margin-top: 1rem;
		color: #666;
		font-size: 0.9rem;
	}

	.debug-response {
		margin-top: 1rem;
		background: #f7f9fc;
		border: 1px solid #e3e8ef;
		padding: 0.75rem;
		border-radius: 6px;
	}

	.debug {
		white-space: pre-wrap;
		font-size: 0.85rem;
		color: #222;
	}

		/* Responsive: stack columns on small screens */
		@media (max-width: 820px) {
			.contact-grid {
				grid-template-columns: 1fr;
			}
		}
</style>

