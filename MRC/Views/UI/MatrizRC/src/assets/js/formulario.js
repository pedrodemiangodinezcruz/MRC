//Función creada para el aumneto de porcentaje de cobertura por control
$(document).ready(function(){
    
    var quantitiy=0;
       $('.cantidad-mas').click(function(e){
            
            // Deja de funcionar como un boton
            e.preventDefault();
            // Toma el id del campo
            var cantidad = parseInt($('#cantidad').val());
            
            // Incrementar
                $('#cantidad').val(cantidad + 1);
            
        });
    
         $('.cantidad-menos').click(function(e){ 
            e.preventDefault();
        
            var cantidad = parseInt($('#cantidad').val());
            
        
          
                // Disminuir
                if(cantidad>0){
                $('#cantidad').val(cantidad - 1);
                }
        });

    });
