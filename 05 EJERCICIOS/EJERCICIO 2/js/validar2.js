function validarn(e){
    var teclado = (document.all)?e.keyCode:e.which;
    if(teclado==8)return true;
    var patron = /[0-9\d .]/;
    var codigo = String.fromCharCode(teclado);
    return patron.test(codigo);
}

        function calcularComisiones(){
            var sueldoBase = document.getElementById("sueldobase").value;
            var venta1 = document.getElementById("venta1").value;
            var venta2 = document.getElementById("venta2").value;
            var venta3 = document.getElementById("venta3").value;
            
            var parseoSueldo = parseFloat(sueldoBase);
            var parseoVenta1 = parseFloat(venta1);
            var parseoVenta2 = parseFloat(venta2);
            var parseoVenta3 = parseFloat(venta3);
            
            alert("Sueldo base: $" + parseoSueldo);
            alert("Venta 1: $" + parseoVenta1);
            alert("Venta 2: $" + parseoVenta2);
            alert("Venta 3: $" + parseoVenta3);

            var comision1 = parseoVenta1 * 0.10;
            var comision2 = parseoVenta2 * 0.10;
            var comision3 = parseoVenta3 * 0.10;
            
            alert("Comisión venta 1 (10%): $" + comision1.toFixed(2));
            alert("Comisión venta 2 (10%): $" + comision2.toFixed(2));
            alert("Comisión venta 3 (10%): $" + comision3.toFixed(2));
            
            var totalComisiones = comision1 + comision2 + comision3;
            alert("Total de comisiones: $" + totalComisiones.toFixed(2));
            
            var totalMes = parseoSueldo + totalComisiones;
            alert("Total a recibir en el mes: $" + totalMes.toFixed(2));
            
        
            document.getElementById("comisiones").value = "$" + totalComisiones.toFixed(2);
            document.getElementById("totalmes").value = "$" + totalMes.toFixed(2);
        }

function borrarDatos(){
    document.getElementById("sueldobase").value = "";
    document.getElementById("venta1").value = "";
    document.getElementById("venta2").value = "";
    document.getElementById("venta3").value = "";
    document.getElementById("comisiones").value = "";
    document.getElementById("totalmes").value = "";
}