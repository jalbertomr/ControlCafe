var acumulado = 1;

var provider=new firebase.auth.GoogleAuthProvider();
$('#login').click(function(){
   firebase.auth()
           .signInWithPopup(provider)
           .then(function(result) {
               console.log(result.user);
               guardaDatos(result.user);
               $('#login').hide();
               $('#root').append("<img width='100px' src='"+result.user.photoURL+"' />")
           });
});

//esta funcion guarda los datos automaticamente
function guardaDatos(user){
    var usuario = {
        uid:user.uid,
        nombre:user.displayName,
        email:user.email,
        phoneNumber:user.phoneNumber,
        foto:user.photoURL
    }
    //firebase.database().ref("telmex")
    //        .push(usuario)
    firebase.database().ref("DosisCafe/" + user.uid)
            .set(usuario)

}

//escribir en la base de datos
$('#guardar').click(function(){
    var fecha = new Date();
    firebase.database().ref("DosisCafe")
            .push({
                tipo:"Descafeinado",
                tamano:"chico",
                acumulada: acumulado,
                diaDeSemana: fecha.getDay(),
                fecha: fecha.getFullYear()+"/"+fecha.getMonth()+"/"+fecha.getDate(),
                hora: fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds()
            })
});

//leer datos de la base de datos
$('#leerDatos').click(function() {
   var datoLeido = firebase.database().ref("DosisCafe");

    datoLeido.on('value',function(snapshot){
        var dosisCafe = snapshot.val();
        acumulado = dosisCafe.acumulada + 1;
       $('#parrafo').text(dosisCafe.tipo + " " +
                          dosisCafe.tamano + " " +
                          dosisCafe.acumulada + " " +
                          acumulado
                         );
    });
});

//aqui estoy leyendo de la base de datos
firebase.database().ref("DosisCafe")
        .on("child_added", function(s){
            var user = s.val();
            $('#root').append("<img width='100px' src='" + user.foto + "' />");
            $('#root').append(user.email)
        })
