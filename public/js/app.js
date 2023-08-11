const galeria = document.getElementById('galeria');

document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('/api/obtener');
    const data = await response.json();
    data.forEach(imagen => {
        let imageURL = imagen.rutaImagen;
        galeria.innerHTML += `
        <div class="carousel-item">
          <img src="${imageURL}" class="d-block w-100" id="img" alt="...">
        </div>
        `;
    });
});




