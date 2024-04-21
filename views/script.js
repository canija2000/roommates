$(document).ready(function() {
    // AJAX para la tabla de roommates
    $.ajax({
        url: 'http://localhost:3000/roommates',
        method: 'GET',
    }).then((data) => {
        // Create a table with the data
        let t_row = '';
        data.rommies.forEach((roommate) => {
            t_row += `<tr>
                <td>${roommate.nombre}</td>
                <td>${roommate.debe}</td>
                <td>${roommate.recibe}</td>
            </tr>`;
        });
        // Append the table rows to the #roommates tbody
        $('#roommates').append(t_row);

    }).catch((error) => {
        console.error('Error:', error);
    });

    // agregar rumies
    $('#aggRommi').click(function(e){
        // Data to be sent in the request
        e.preventDefault();
        const newRoommate = {
            // Add your roommate data here
        };

        // AJAX request to post a new roommate
        $.ajax({
            url: 'http://localhost:3000/roommate',
            method: 'POST',
            data: newRoommate // Send the newRoommate data in the request
        }).then((data) => {
            console.log(data);
            // reload the page
            location.reload()
        }).catch((error) => {
            console.error('Error:', error);
        });
    });

    // AJAX para select de roommates
    $.ajax({
        url: 'http://localhost:3000/roommates',
        method: 'GET',
    }).then((data) => {
        let options = '';
        data.rommies.forEach((roommate) => {
            options += `<option value="${roommate.nombre}">${roommate.nombre}</option>`;
        });
        $('#roommatesSelect').append(options);
        
    }).catch((error) => {
        console.error('Error:', error);
    });

    // agregar gastos
    $('#aggGasto').click(function(){
        //lo que se envia al servidor
        let nombre = $('#roommatesSelect').val();
        let monto = $('#monto').val();
        let descripcion = $('#descripcion').val();
        const newGasto = { nombre, monto, descripcion };    

        // AJAX 
        $.ajax({
            url: 'http://localhost:3000/gastos',
            method: 'POST',
            data: newGasto
        }).then((data) => {
            console.log(data);
            //clear inputs
            $('#roommatesSelect').val('');
            $('#monto').val('');
            $('#descripcion').val('');
            //recargar la pagina
            location.reload()
        }).catch((error) => {
            console.error('Error:', error);
        });

    });
    // AJAX para la tabla de gastos
    $.ajax({
        url: 'http://localhost:3000/gastos',
        method: 'GET',
    }).then((data) => {
        // Create a table with the data
        let t_row = '';
        data.gastos.forEach((gasto) => {
            t_row += `<tr>
                <td>${gasto.nombre}</td>
                <td>${gasto.monto}</td>
                <td>${gasto.descripcion}</td>
                <td> <i class="fas fa-edit text-warning" id="editGasto" data-id="${gasto.id}"></i> </td>
                <td> <i class="fas fa-trash-alt text-danger" id="delgasto" data-id="${gasto.id}"></i> </td>
            </tr>`;
        });
        // Append the table rows to the #gastos tbody
        $('#gastos').append(t_row);
    }).catch((error) => {
        console.error('Error:', error);
    });

    // eliminar gasto
    $(document).on('click', '#delgasto', function(){
        let id = $(this).data('id');
        $.ajax({
            url: `http://localhost:3000/gasto?id=${id}`,
            method: 'DELETE',
        }).then((data) => {
            console.log(data);
            location.reload()
        }).catch((error) => {
            console.error('Error:', error);
        });
    });

    // editar gasto
    $(document).on('click', '#editGasto', function(){
        let id = $(this).data('id');
        let nombre = prompt('Nuevo nombre');
        let monto = prompt('Nuevo monto');
        let descripcion = prompt('Nueva descripcion');
        const gasto = { nombre, monto, descripcion };
        $.ajax({
            url: `http://localhost:3000/gasto?id=${id}`,
            method: 'PUT',
            data: gasto
        }).then((data) => {
            console.log(data);
            //recargar la pagina
            location.reload()
        }).catch((error) => {
            console.error('Error:', error);
        });
    });
});

