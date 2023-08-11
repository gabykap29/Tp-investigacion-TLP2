const formImagen = document.getElementById('formImagen');

formImagen.addEventListener('submit',async (e)=>{
    e.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;

    const formData = new FormData();
    formData.append('titulo',titulo);
    formData.append('imagen',document.getElementById('imagen').files[0]);
    formData.append('descripcion',descripcion);

    try {
        const response = await fetch('/api/cargar',{
            method:'POST',
            body:formData
        });
        const respToJson = await response.json();
        if(response.status!== 201 && response.status !== 200){
            console.log('error al subir la imagen')
        }
        setTimeout(() => {
            window.location.href = '/index';
          }, 2000);
    } catch (error) {
        console.log(error)
    }
})