import React from 'react';

function Home() {
    return (
        <>
            <section id="welcome-section">
                <h1>Hi I&apos;m Tom</h1>
                <p>I work as a developer for a law firm as a developer for their <a href="https://www.elite.com/3e/" target="_blank" rel="noopener noreferrer">Elite 3E</a> &amp; <a href="https://www.elite.com/3e/matter-management/" target="_blank" rel="noopener noreferrer">MatterSphere</a> systems using VB.Net, C# and SQL.
                    In my spare time I am working on various apps using JavaScript, React and Python.</p>
                <p>When I&apos;m not on the PC, I&apos;m either writing, playing with Lego or the model railway.</p>
            </section>
            <section>
                <h2>Projects</h2>
                <article className="project-title">
					<header><a href="https://codepen.io" target="_blank" rel="noopener noreferrer">CodePen.IO</a> Projects</header>
					<p>These are various sites I created as part of the <a href="https://learn.freecodecamp.org" target="_blank" rel="noopener noreferrer">FreeCodeCamp Responsive Web Design Certification</a>,
					 to view them <a href="https://codepen.io/sl477" target="_blank" rel="noopener noreferrer">click here</a>.</p>
				</article>
				<article className="project-title">
					<header><a href="https://glitch.com/@SL477" target="_blank" rel="noopener noreferrer">Node.js/Glitch</a> Projects</header>
					<p>The are various Node.js applications I created as part of the <a href="https://learn.freecodecamp.org" target="_blank" rel="noopener noreferrer">FreeCodeCamp APIs and Microservices Cetification and 
					Information Security and Quality Assurance Certification</a>, to view them <a href="https://glitch.com/@SL477" target="_blank" rel="noopener noreferrer">click here</a>.</p>
				</article>
            </section>
        </>
    );
}

export default Home;