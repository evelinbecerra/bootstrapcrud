const URL_API = 'http://programacion.xyz/mtw/204/crud/index.php/api/';

var usuario = {
    id : 0,
    nombre : '',
    apellidos : ''
}

$(document).ready(function(){
    
    var id = 0;
    var parametros = [];

    buscar();

    $("#btnBuscar").click(function(){
        buscar();
    });

    $("#btNuevo").click(function(){
        mostrarventana();
    });

    $("#btnGuardar").click(function(){
        editar();
    });

    $("#editarModal").on('hidden.bs.modal', function (e) {
        $("#editarModal input").val('');
    });

});

function buscar()
{
    var buscar = $("#txtBuscar").val();
    var url = URL_API + 'usuarios/obtener/'+buscar;
    $.ajax({
        type: 'get',
        url: url,
        data: '',
        contentType: 'application/json;charset=utf8',
        traditional: true,
        success: tblUsuario,
    });
}

function tblUsuario(data)
{
    if(data.status)
    {
        var tbl ='';
        $.each(data.result, function(i,usuario){
            tbl += '<tr>';
            tbl += '<td class="d-none d-md-table-cell">' + (i+1) + '</td>';
            tbl += '<td class="d-none d-md-table-cell">' + usuario.nombre  + '</td>';
            tbl += '<td class="d-none d-md-table-cell">' + usuario.apellidos + '</td>';
            tbl += '<td class="d-table-cell d-md-none">' + usuario.nombre + ' ' + usuario.apellidos + '</td>';
            tbl += '<td><div class="d-flex justify-content-center">';
            tbl += '<button class="btn btn-warning mx-1" onclick="mostrarventana('+usuario.id+')"><i class="fa fa-pencil-alt"></i></button>';
            tbl += '<button class="btn btn-danger mx-1" onclick="eliminar('+usuario.id+')"><i class="fa fa-trash"></i></button>';
            tbl += '</div></td>';
            tbl += '</tr>';
        });
        $('#usuarios-table-body').html(tbl);
    }
    else
    {
        $("#divMensaje").html('<i class="fa fa-3x fa-exclamation-triangle text-danger"></i><p class="mt-2">Ocurrio un error al intentar llamar el servicio.</p>');
        $("#msgModal").modal('show');
    }

}

function mostrarventana(id)
{
    usuario.id = id;
    //window.location.href = 'edicion.html?id=' + id;
    var urlApi = URL_API + 'usuarios/obtener/';
    
    $('#modaltitulo').text('Nuevo usuario');

    if( usuario.id > 0  )
    {
        $('#modaltitulo').text('Editar usuario');

        urlApi += usuario.id;

        $.ajax({
            type: 'get',
            url: urlApi,
            data: '',
            contentType: 'application/json;charset=utf8',
            traditional: true,
            success: function(data)
            {
                $("#nombre").val(data.result[0].nombre);
                $("#apellidos").val(data.result[0].apellidos);
                $("#editarModal").modal('show');
            },
            error: function(result){
                $("#divMensaje").html('<i class="fa fa-3x fa-exclamation-triangle text-danger"></i><p class="mt-2">Ocurrio un error al intentar llamar el servicio.</p>');
                $("#msgModal").modal('show');
            }
        });
    }
    else
    {        
        $("#editarModal").modal('show');
    }

}

function editar()
{
    var method = 'post';   
    var urlApi = URL_API + 'usuarios/insertar';
    
    usuario.nombre = $("#nombre").val();
    usuario.apellidos = $("#apellidos").val();

    if( usuario.id > 0  )
    {
        var method = 'put';   
        var urlApi = URL_API + 'usuarios/actualizar';        
    }

    $.ajax({
        type: method,
        url: urlApi,
        data: JSON.stringify(usuario),
        contentType: 'application/json;charset=utf8',
        traditional: true,
        success: function(data)
        {
            $("#editarModal").modal('hide');  
            buscar();          
            $("#divMensaje").html('<i class="fa fa-4x fa-check-circle text-success"></i><p class="mt-2">Los datos se han guardado correctamente.</p>');
            $("#msgModal").modal('show');
        },
        error: function(result){
            $("#divMensaje").html('<i class="fa fa-3x fa-exclamation-triangle text-danger"></i><p class="mt-2">Ocurrio un error al intentar llamar el servicio.</p>');
            $("#msgModal").modal('show');
        }
    });

}


function eliminar(id)
{
    var urlApi = URL_API + 'usuarios/eliminar/'+id;
    
    $.ajax({
        type: 'delete',
        url: urlApi,
        data: '',
        contentType: 'application/json;charset=utf8',
        traditional: true,
        success: function(data)
        {        
            buscar();
            $("#divMensaje").html('<i class="fa fa-4x fa-check-circle text-info"></i><p class="mt-2">Los datos se han eliminado correctamente.</p>');
            $("#msgModal").modal('show');
        },
        error: function(result){
            $("#divMensaje").html('<i class="fa fa-3x fa-exclamation-triangle text-danger"></i><p class="mt-2">Ocurrio un error al intentar llamar el servicio.</p>');
            $("#msgModal").modal('show');
        }
    });

}