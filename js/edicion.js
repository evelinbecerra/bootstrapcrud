$(document).ready(function(){
    const URL_API = 'http://programacion.xyz/mtw/204/crud/index.php/api/';
    const url = document.URL;

    var id = 0;
    var parametros = [];

    var usuario = {
        id : 0,
        nombre : '',
        apellidos : ''
    }

    function cargaPagina()
    {
        var urlApi = URL_API + 'usuarios/obtener/';
        usuario.id = url.split('?').length > 1 ? url.split('?')[1].split('=')[1] : 0;

        $('#titulo').text('Editar usuario');

        if( usuario.id > 0  )
        {
            $('#titulo').text('Editar usuario');

            urlApi += usuario.id;

            $.ajax({
                type: 'get',
                url: url,
                data: '',
                contentType: 'application/json;charset=utf8',
                traditional: true,
                success: function()
                {
                    $("#nombre").val(data.result[0].nombre);
                    $("#apellidos").val(data.result[0].apellidos);
                },
                error: function(result){
                    alert("Ocurrio un error al intentar llamar el servicio.");
                }
            });
        }

    }

    
    $("#btnGuardar").click(function(){
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
                window.location.href = "index.html";
            },
            error: function(result){
                alert("Ocurrio un error al intentar llamar el servicio.");
            }
        });
    });

    
    $('#btnVolver').click(function(){
        window.location.href = "index.html";
    });

    cargaPagina();

});