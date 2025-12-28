document.addEventListener("DOMContentLoaded", function() {
  const footerPlaceholder = document.getElementById("footer-placeholder");
  if (!footerPlaceholder) return;

  // Check if we are in a subdirectory (like /projects/) by looking for the CSS path
  // If the page loads "../styles.css", we know we need to go up one level for links too.
  const isProject = document.querySelector('link[href="../styles.css"]') !== null;
  const pathPrefix = isProject ? "../" : "";

  const footerHTML = `
  <footer class="site-footer">
    <div class="footer-inner">
      <div>
        <img src="${pathPrefix}assets/logo-mrida-gold.png" alt="Mrida Interiors" class="footer-logo">
        <p class="small">
          Boutique interior design studio crafting warm, modern spaces across Sanand.
        </p>
      </div>
      <div>
        <h4>Studio</h4>
        <a href="${pathPrefix}index.html">Home</a>
        <a href="${pathPrefix}services.html">Services</a>
        <a href="${pathPrefix}portfolio.html">Portfolio</a>
        <a href="${pathPrefix}contact.html">Contact</a>
      </div>
      <div>
        <h4>Contact</h4>
        <p class="small">
          Sanand, Gujarat<br>
          WhatsApp: +91 99794 44584<br>
          Email: mridainteriors@gmail.com
        </p>
      </div>
    </div>
    <div class="footer-bottom">
      © 2025 Mrida Interiors. All rights reserved.
    </div>
  </footer>
  <a class="whatsapp-fab"
     href="https://wa.me/919979444584?text=Hi%20Mrida%20Interiors%2C%20I%27d%20like%20to%20discuss%20an%20interior%20project."
     target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
    💬
  </a>
  `;

  footerPlaceholder.innerHTML = footerHTML;
});