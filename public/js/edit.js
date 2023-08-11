const formEditar = document.getElementById('formImagen');

formEditar.addEventListener('submit',async (e)=>{
    e.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;
    const url = window.location.href;
    const parts = url.split('/');
    const id = parts[parts.length - 1];
    const formData = new FormData();
    formData.append('titulo',titulo);
    formData.append('imagen',document.getElementById('imagen').files[0]);
    formData.append('descripcion',descripcion);

    try {
        const response = await fetch(`/api/editar/${id}`,{
            method:'PUT',
            body:formData
        });
        const respToJson = await response.json();
        if(response.status!== 201 && response.status !== 200){
            console.log('error al subir la imagen')
        }
        swal({
            title: "Good job!",
            text: "You clicked the button!",
            icon: "success",
          });
        setTimeout(() => {
            window.location.href = '/index';
          }, 2000);
    } catch (error) {
        console.log(error)
    }
})