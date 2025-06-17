document.addEventListener("DOMContentLoaded", () => {
    
    const posters = document.querySelectorAll('.poster-container img');

    
    posters.forEach((poster) => {
      poster.addEventListener('click', async () => {
        const movieId = poster.getAttribute('data-id');
        const detailsDiv = document.getElementById('movie-details');

        
        detailsDiv.innerHTML = "Loading movie details...";
        detailsDiv.style.display = "block";

        try {
          
          const res = await fetch(`http://localhost:7000/movie/${movieId}`);
          const movie = await res.json();

          // Show movie information
          detailsDiv.innerHTML = `
            <h1>${movie.title}</h1>
            <img src="images/top${Math.floor(Math.random() * 20) + 1}.jpeg" alt="Poster" style="max-width: 200px;">
            <p><strong>Plot:</strong> ${movie.plot || "No short summary available."}</p>
            <p><strong>Full Story:</strong> ${movie.fullplot || "No detailed story available."}</p>
            <p><strong>Cast:</strong> ${movie.cast?.join(", ") || "Cast information not available."}</p>
            <p><strong>Director(s):</strong> ${movie.directors?.join(", ") || "Director info not available."}</p>
            <p><strong>Rating:</strong> ${movie.rated || "Not rated."}</p>
            <p><strong>IMDB Score:</strong> ${movie.imdb?.rating || "No rating."}</p>

            <div id="comments">Getting comments...</div>
          `;

          // Fetch and show comments
          const commentsRes = await fetch(`http://localhost:7000/comments/${movieId}`);
          const comments = await commentsRes.json();

          let commentsHTML = "<h3>What people say:</h3>";

          if (comments.length > 0) {
            for (let i = 0; i < comments.length; i++) {
              commentsHTML += `<p> ${comments[i].text}</p>`;
            }
          } else {
            commentsHTML = "<p>No reviews yet. Be the first to comment!</p>";
          }

          document.getElementById("comments").innerHTML = commentsHTML;

        } catch (error) {
          detailsDiv.innerHTML = "Couldn't load movie info. Please try again.";
        }
      });
    });
});
