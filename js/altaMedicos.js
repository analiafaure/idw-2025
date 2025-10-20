const formAltaMedico = document.getElementById('altaMedicoForm');
const inputNombre = document.getElementById('nombre');
const inputEspecialidad = document.getElementById('especialidad');
const inputObraS = document.getElementById('obraSocial');
const tablaMedicosBody = document.querySelector('#tablaMedicos tbody')

let flagIndex = null;
function actualizarTabla(){
    let medicos = JSON.parse(localStorage.getItem('medicos')) || []; 
    tablaMedicosBody.innerHTML = '';

    medicos.forEach((medico, index) => {
        let fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${medico.nombre}</td>
            <td>${medico.especialidad}</td>
            <td>${medico.obraSocial}</td>
            <td>${medico.email}</td>
            <td>
                <button class="btn btn-sm btn-warning me-2 btn-editar" data-index="${index}">Editar </button>
                <button class="btn btn-sm btn-warning me-2 btn-eliminar" data-index="${index}">Eliminar </button>
            </td>
        `;
        tablaMedicosBody.appendChild(fila);
    });
}  

tablaMedicosBody.addEventListener('click', function(event){
    if(event.target.classList.contains('btn-editar')){
        const index = Number(event.target.dataset.index);
        editarMedicos(index);
    }
    if(event.target.classList.contains('btn-eliminar')){
        const index = Number(event.target.dataset.index);
        eliminarMedicos(index);
    }
})

function editarMedicos(index){
    let medicos = JSON.parse(localStorage.getItem('medicos')) || [];
    let medico = medicos[index];
    inputNombre.value = medico.nombre;
    inputEspecialidad.value = medico.especialidad;
    inputObraS = medico.obraSocial;
    flagIndex = index;
}
function eliminarMedicos(index){
    let medicos = JSON.parse(localStorage.getItem('medicos')) || [];
    if(confirm(`esta seguro de eliminar a ${medicos[index].nombre}?`)){
        medicos.splice(index,1);
        localStorage.setItem('medicos', JSON.stringify(medicos));
        actualizarTabla();
        formAltaMedico.reset();
        flagIndex = null;
    }
}
function altaMedicos(event){
    event.preventDefault();
    
    let nombre = inputNombre.value.trim();
    let especialidad = inputEspecialidad.value.trim();
    let obraSocial = inputObraS.value.trim();

    if(!nombre || !especialidad || !obraSocial ){
        alert('Por favor completa los campos requeridos');
        return;
    }
    let medicos = JSON.parse(localStorage.getItem('medicos')) || [];
    const medico = { nombre, especialidad, obraSocial };

    if(flagIndex !== null){
        //editando
        medicos[flagIndex] = medico;
        flagIndex = null;
    } else{
        //alta
        medicos.push(medico);
        alert(
        `Médico registrado:\n\n` +
        `Nombre: ${nombre}\n` +
        `Especialidad: ${especialidad}\n` +
        `Obra Social: ${obraSocial}\n`
        );
    }
    localStorage.setItem('medicos', JSON.stringify(medicos));
    actualizarTabla();
    formAltaMedico.reset();

}
actualizarTabla();
formAltaMedico.addEventListener('submit', altaMedicos)