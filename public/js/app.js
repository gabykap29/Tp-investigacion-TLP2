const galeria = document.getElementById('galeria');

document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('/api/obtener');
    const data = await response.json();
    console.log(data);
    data.forEach(imagen => {
        let imageURL = window.location.origin + '/'+imagen.RutaImagen;
        console.log(imageURL)
        galeria.innerHTML += `
        <div class="carousel-item">
          <img src="${imageURL}" class="d-block w-100" alt="...">
        </div>
        `;
    });
});




