const imagenes = document.getElementById('imagenes');

document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('/api/obtener');
    const data = await response.json();
    data.forEach(imagen => {
        let imageURL = imagen.rutaImagen;
        imagenes.innerHTML += `
        <tr>
            <td><img src="${imageURL}" class="d-block img"  alt="..."></td>
            <td>${imagen.titulo}</td>
            <td>${imagen.descripcion}</td>
            <td>${imagen.createdAt}</td>
            <td>
              <a onclick="eliminarImagen(event)" class="btn btn-danger btn-sm" data-id="${imagen.id}">Eliminar</a>
              <a href="/editar/${imagen.id}" class="btn btn-success btn-sm">Editar</a>
            </td>
          </tr>
        `;
    });
});

const eliminarImagen = async (event) => {
    const id = event.target.dataset.id;

    try {
        const res = await fetch(`/api/eliminar/${id}`, {
            method: 'DELETE'
        });
        const data = await res.json();
        swal({
            icon: 'success',
            title: 'Imagen eliminada',
            text: data.message,
        });
        
        setTimeout(() => {
            window.location.reload();
        }, 2200);

    } catch (error) {
        console.log(error);
        swal({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
        })
    }

}