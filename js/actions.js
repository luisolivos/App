//Funcionalidades principales
var fn = {
    init: function(){
        if(true)
            window.location.href = "#reg";
        else
            window.location.href = "#home";
        
        //$('#reg ul[data-role = listview] a').click(mc.start);
        $("#reg div[data-role = footer] a").click(fn.registrarClick);
		//$('#nr1 ul[data-role = listview] a').click(fn.seleccionarTipo);
		//$('#nr1 div[data-role = navbar] li').click(fn.nr1Siguiente);
		//$('#resSend').click(fn.nr2Send);
		
		//sdocument.addEventListener("online", almacen.leerReservas, false);
    },
    deviceready: function(){
        addEventListener("load", fn.init, false);
		document.addEventListener("deviceready", fn.init, false);
    },
    estaRegistrado: function(){
		//if(window.localStorage.getItem('uuid') != undefined)
			return false;
		//else
		//	return true;
    },
    registrarClick: function(){
        //$.mobile.loading( "show" );
        var nom = $('#regNom').val();
        var mai = $('#regMail').val();
        var tel = $('#regTel').val();
		var foto = 'sdf';
        //var foto = $('#fotoTomada').attr("rel");
        if(nom != '' && mai != '' && tel != '' )
            fn.enviarRegistro(nom,mai,tel,foto);
        else{
		alert('obligatorios');
            //navigator.notification.alert("Todos los campos son requeridos", null, "Registro", "Aceptar");
            //$.mobile.loading( "hide" );
        }
    },
    enviarRegistro: function(nom,mai,tel,foto){
        $.ajax({
            method: "POST",
            crossDomain : true,
            url: "http://carlos.igitsoft.com/apps/test.php",
            data: { nom: nom, mail: mai, tel: tel },
            xhrFields: {
        withCredentials: true
    }
            error: function(){
                alert("ajax connection error");
            }
        }).done(function( msg ) {
            if(msg == 1){
			alert('ok');
                //ft.start(foto);//Enviar Foto
            }else{
				alert("Error al enviar los datos");
                //navigator.notification.alert("Error al enviar los datos", null, "Enviar Datos", "Aceptar");
            }   
        });
    },
	seleccionarTipo: function(){
		$(this).parents('ul').find('a').css("background-color","");
		$('#nr1').attr("th",$(this).text());
		$(this).css("background-color","#00aa00");
	},
	nr1Siguiente: function(){
		if($(this).index() == 1 && $('#nr1').attr('th') != undefined){
			window.location.href = "#nr2";
		}else{
			if($(this).index() != 0)
				alert("Es necesario seleccionar un tipo de habitación");
		}
	},
	nr2Send: function(){
		var th = $('#nr1').attr('th');
		var pr = $('#resPer').val();
		var ha = $('#resHab').val();
        
		var di = $('#resDia').val();
		
		if(conex.isConnected())
        {
            alert("Conectado.. sincronizanco con server");
            fn.enviarRegistroServidor(th, pr, ha);
        }//Detectar si está conectado a internet
			//Enviar Reservas al servidor
		else//sino  
			almacen.guardarReserva(th,pr,ha,di);//Guardar datos en el dispositivo
      
	},
    
    //enviar registro servidord
    enviarRegistroServidor: function(nom,mai,tel){
        alert("");
        $.ajax({
            method: "POST",
            url: "http://carlos.igitsoft.com/apps/test.php",
            data: { nom: nom, mail: mai, tel: tel },
            error: function(){
                alert("ajax connection error");
            }
        }).done(function( msg ) {
            if(msg == 1){
                 navigator.notification.alert("Enviado al servidor", null, "Enviar Datos", "Aceptar");
               // ft.start(foto);//Enviar Foto
            }else{
                navigator.notification.alert("Error al enviar los datos", null, "Enviar Datos", "Aceptar");
            }   
        });
    }
};

$(fn.deviceready);