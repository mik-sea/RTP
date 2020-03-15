function alert_info(title, isi,link) {
    Swal.fire({
        allowOutsideClick: false,
        icon: "info",
        title: "<strong>" + title + "</strong>",
        html: isi,
        showCancelButton: true,
    }).then((result) => {
        if (result.value) {
            window.location.href = link
        }
    });
}

function prize_info(title,isi){
    Swal.fire({
        allowOutsideClick:false,
        icon:"info",
        title:"<strong>"+ title +"</strong>",
        html:isi,
        showCancelButton:true,
    }).then((result)=>{
        if(result.value){
            var settings = {
                "url": "https://rtp-v1.glitch.me/prize",
                "method": "POST",
                "timeout": 0,
                "headers": {
                    "Content-Type": "application/json"
                },
                "data": JSON.stringify({"poin":10,"email":localStorage.getItem('email')}),
            };
            $.ajax(settings).done(function (response) {
                if(response == "Email tidak ada"){
                    alert_info('Email tidak ada',`${response}`,'prize-page.html')
                }else if(response == "Point kamu kurang"){
                    alert_info('Point Kurang',`${response}`,'prize-page.html')
                }else{
                    alert_succes('Berhasil','','prize-page.html')
                }
            });
            // alert_succes('Yeay, kamu berhasil menukarkan barang ini','kamu bisa mengambilnya di bank sampah terdekat','prize-page.html')
        }
    })
}

function alert_danger(title,isi,link){
    Swal.fire({
        allowOutsideClick: false,
        icon: "error",
        title: "<strong>" + title + "</strong>",
        html: isi,
        // showCancelButton: true,
    }).then((result) => {
        if (result.value) {
            window.location.href = link;
        }
    });
}

function alert_succes(title,isi,link){
    Swal.fire({
        allowOutsideClick: false,
        icon: "success",
        title: "<strong>" + title + "</strong>",
        html: isi,
        // showCancelButton: true,
    }).then((result) => {
        if(result.value) {
            window.location.href = link;
        }
    });
}

function textInput(){
    var user = window.localStorage.getItem('email')
    Swal.fire({
        title:"Masukan kode :",
        input:'text',
        inputAttributes:{
            autocapitalize:'off'
        },
        showCancelButton:true,
        confirmButtonText:'OK',
    }).then((result)=>{
        $.ajax({
            type:"POST",
            url:"https://rtp-v1.glitch.me/getPoint",
            dataType:"JSON",
            headers:{
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            data:JSON.stringify({
                email: user,
                token:result.value
            }),
            success:(res)=>{
                // var poin = user[poin] = res
                // localStorage.add('user',JSON.stringify(poin))
                if(res == "limits"){
                    alert_danger(`${res}`,'Token limit','account-page.html')
                }else{
                    alert_succes('Berhasil',`Total poin bertambah :${res}`,'account-page.html')
                }
            },
            error:(res)=>{
                console.log(res)
            }
        })
    })
}

$(document).ready(function(){
    $("#login").click(()=>{
        var email = $("#email").val()
        var password = $("#password").val()
        $.ajax({
            type:"POST",
            url:"https://rtp-v1.glitch.me/login",
            headers:{
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            data:JSON.stringify({
                email:email,
                password:password
            }),
            success:(res)=>{
                if(res == "gagal"){
                    alert_danger(res,'','login.html')
                }else if(res == "password salah"){
                    alert_danger(res,'','login.html')
                }
                else{
                    window.localStorage.setItem('email',res.email)
                    alert_succes('Berhasil',"Klik ok untuk melanjutkannya","index.html")
                }
            },
            error:()=>{
                alert_danger('Gagal','Cek kembail email/password!','login.html')
            }
        })
    })
    $("#signup").click(()=>{
        const data = {}
        var email = $("#email").val()
        var username = $("#username").val()
        var tel = $("#phone").val()
        var password = $("#password").val()
        var id = "RTP-"+username.split(" ",1)
        data.id = id
        data.email = email
        data.username = username
        data.password = password
        data.telephone = tel
        data.poin = 0
        // console.log(data)
        $.ajax({
            type:"POST",
            // dataType:"JSON",
            url:"https://rtp-v1.glitch.me/register",
            data:JSON.stringify(data),
            headers:{
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            success:()=>{
                alert_succes('Berhasil','Klik OK untuk ke halaman index','login.html')
            },
            error:()=>{
                alert_danger('Gagal','Cek datamu','register.html')
            }
        })
        // window.localStorage.setItem('user',JSON.stringify(data))
        // alert_succes("Succes Register","Thanks for register","login.html")
    })
    $("#reedem").click(()=>{
        textInput()
    })
})