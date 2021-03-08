function isEmail(Email) {
    var regex = /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,6}$/;
    return regex.test(Email);
}

function ismdp(mdp) {
    var regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\&\#\-\_\+\=\@\{\}\[\]\(\)])[A-Za-z\d\&\#\-\_\+\=\@\{\}\[\]\(\)]{6,}$/;
    return regex.test(mdp)
}

function IsEmailValid() {
    let EmailExist = false
    let x
    for (x in Users.user) {
        let ActualUser = Users.user[x]
        if (ActualUser.email == Emailcon.val()) {
            EmailExist = true
            break;
        }
    }
}

function isMdpValid() {
    let MdpExist = false
    let y
    for (y in Users.user) {
        let ActualUser = Users.user[y]
        if (ActualUser.psw == psw.val()) {
            MdpExist = true
            break;
        }
    }
}

function create_UUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

var Users
if (!localStorage.getItem("accounts")) {
    Users = {
        user: []
    }
} else {
    Users = JSON.parse(localStorage.getItem('accounts'))
}

$(document).ready(() => {
    var ins = $('.inscription')[0]
    var con = $('.connexion')[0]
    var Email = $('#Email')
    var Emailcon = $('#Emailcon')
    var pswcon = $('#pswcon')
    var psw = $('#psw')
    var psw2 = $('#psw2')
    var pseudo = $('#Nickname')
    var main = $('.MusicHall')[0]
    var profileimg = $('input[name="Avatar"]:checked')

    if (!sessionStorage.getItem("ActualUser")) {
        con.style.display = "block";
    } else {
        main.style.display = "block";
        con.style.display = "none"
    }

    $('.Login').click((event) => {
        event.preventDefault()
        if (ins.style.display === "none") {
            con.style.display = "none";
            ins.style.display = "block";
        } else {
            con.style.display = "block";
            ins.style.display = "none";
        }
    })

    $('.inscription').submit((event) => {
        event.preventDefault()
        let EmailExist = false
        let x
        for (x in Users.user) {
            let ActualUser = Users.user[x]
            if (ActualUser.email == Email.val()) {
                EmailExist = true
                break;
            }
        }
        let PseudoExist = false
        let y
        for (y in Users.user) {
            let ActualUser = Users.user[y]
            if (ActualUser.pseudo == pseudo.val()) {
                PseudoExist = true
                break;
            }
        }
        if (Email.val() == "" || psw.val() == "" || psw2.val() == "" || pseudo.val() == "") {
            alert('Veuillez remplir les champs')
        } else if (psw.val() != psw2.val()) {
            alert('Veuillez rentrer le même mot de passe')
        } else if (!isEmail(Email.val())) {
            alert('Veuillez entrer un email valide')
        } else if (!ismdp(psw.val())) {
            alert('Veuillez entrer un mot de passe contenant au moin 1 chiffre et au moins 1 caractère spécial le tout sous un minimum de 6 caractère')
        } else if (EmailExist == true) {
            alert('Cet Email existe déjà')
        } else {
            var newuser = {
                id: create_UUID(),
                pseudo: pseudo.val(),
                email: Email.val(),
                psw: psw.val(),
            }
            Users.user.push(newuser)
            alert('Vous êtes inscrit, veuillez vous connecter')
            localStorage.setItem('accounts', JSON.stringify(Users))
            con.style.display = "block";
            ins.style.display = "none";
            Email.val("")
            psw.val("")
            psw2.val("")
            pseudo.val("")
            return true
        }
    })
    
    $('.formcon').submit((event) => {
        event.preventDefault()
        let ConExist = false
        let x
        for (x in Users.user) {
            let ActualUser = Users.user[x]
            if (ActualUser.email == Emailcon.val()) {
                if (ActualUser.psw == pswcon.val()) {
                    ConExist = true
                    sessionStorage.setItem("ActualUser", JSON.stringify(ActualUser))
                    break;
                }
            }
        }
        if (!ConExist) {
            alert("Email ou mot de passe incorrect")
        } else {
            con.style.display = "none";
            main.style.display = "block";
            let ActualUser = JSON.parse(sessionStorage.getItem("ActualUser"))
            $('#ImgPfl').attr("src", ActualUser.profilimg)
        }
    })

    $('#Deco').click((event) => {
        event.preventDefault()
        sessionStorage.removeItem('session')
        main.style.display = "none";
        con.style.display = "block"
    })

    $('input:radio[name="Avatar"]').change(function(){
        if ($(this).val() == 'Avatar-1.png') {
            $('#ImgPfl').attr('src', 'Avatar-1.png')
        }
        if ($(this).val() == 'Avatar-2.png') {
            $('#ImgPfl').attr('src', 'Avatar-2.png')
        }
        if ($(this).val() == 'Avatar-3.png') {
            $('#ImgPfl').attr('src', 'Avatar-3.png')
        }
    })
})