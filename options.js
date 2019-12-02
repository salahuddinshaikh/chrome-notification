$(document).ready(function() {
    if (localStorage.user_id && localStorage.name) {
        $("#signin-div").hide();
        $("#welcome-div").show();
        $("#user_name").html(localStorage.name);
        if (localStorage.action) {
            if (localStorage.action == "started") {
                $("#start_div").hide();
            }else{
                $("#stop_div").hide();
            }
        }else{
            $("#stop_div").hide();
        }
    }else{
        $("#welcome-div").hide();
    }
    $("#signin").on('click',function(){login()});

    $("#logout").on('click',function(){clear_localStorage()});

    $("#start").on('click',function(){start()});

    $("#stop").on('click',function(){stop()});
});

/**
 * [login]
 */
function login(){
    console.log('login');
    var email       =   $("#email").val();
    var password    =   $("#password").val();
    var regex       =   /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var flag        =   1;
    if(email == ""){
        $("#email_error").html('Please Enter Email');
        flag = 0;
    }else if(!regex.test(email)){
        $("#email_error").html('Please Enter Valid Email');
        flag = 0;
    }else{
        $("#email_error").html('');
    }

    if(password == ""){
        $("#password_error").html('Please Enter Password');
        flag = 0;
    }else{
        $("#password_error").html('');
    }
    if(flag == 1){
        $.ajax({
            url: 'https://www.technokeens.com/projects/index.php/Technokeens_notification/login',
            type: 'POST',
            dataType: 'JSON',
            data: {
                email: email,
                password:password,
            },
            success: function(result){
                if(result.status == 200){
                    $("#alert-success").removeClass('d-none');
                    localStorage.user_id = result.user_id;
                    localStorage.name = result.name;
                    window.location.reload();
                }else{
                    $("#alert-danger").removeClass('d-none');
                }
            },beforeSend: function(){
                $("#alert-success").addClass('d-none');
                $("#alert-danger").addClass('d-none');
            },
            complete : function(){

            }
        })
    }
}

/**
 * [start Start Notification]
 * @return {[type]} [description]
 */
function start(){
    localStorage.action = "started";
    window.location.reload();

}

/**
 * [stop Stops Notification]
 */
function stop(){
    localStorage.action = "stopped";
    window.location.reload();
}

/**
 * [clear_localStorage Clear Localstorage]
 */
function clear_localStorage(){
    localStorage.clear();
    window.location.reload();
}











// console.log(localStorage);
