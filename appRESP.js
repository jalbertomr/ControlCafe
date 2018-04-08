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
    firebase.database().ref("telmex/" + user.uid)
            .set(usuario)

}

//escribir en la base de datos
$('#guardar').click(function(){
    firebase.database().ref("telmex")
            .set({
                nombre:"Bliss",
                edad:"15",
                sexo:"mucho"
            })
});

//aqui estoy leyendo de la base de datos
firebase.database().ref("telmex")
        .on("child_added", function(s){
            var user = s.val();
            $('#root').append("<img width='100px' src='"+user.foto+"' />");
            $('#root').append(user.email)
        })
