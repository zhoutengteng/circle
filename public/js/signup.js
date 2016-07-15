/**
 * Created by zhoutengteng on 16/6/26.
 */
$('document').ready(function(){
    $('#submit').click(function(){
        var username = $('#username').val();
        var sex = $("input[name='sex']:checked").val();
        var password = $('#password').val();
        var password_repeat = $('#password_repeat').val();
        var email = $('#email').val();
        var telephone = $('#telephone').val();
        var checkUsername = /^[A-Za-z0-9@]+$/;
        var onlyAl = /^[A-Za-z@]+$/;
        var onlyDi = /^[0-9@]+$/;
        var checkPassword = /^[A-Za-z0-9@\.]+$/;
        var checkPassword_repeat = password_repeat;
        var checkMail =  /^[A-Za-z0-9]+([A-Za-z0-9]+)@[A-Za-z0-9]+(\.[A-Za-z0-9]+)$/;
        var checkTel =  /^1[0-9]{10}$/;
        if (sex != null &&  !onlyDi.test(username) &&   checkUsername.test(username) && checkPassword.test(password) && checkPassword_repeat == password && checkMail.test(email) && checkTel.test(telephone)) {
            $.ajax({
                type: 'POST',
                url:"/signup",
                async:true,
                data:{
                    username : username,
                    sex : sex,
                    password : password,
                    password_repeat: password_repeat,
                    email : email,
                    telephone : telephone
                },
                cache:false,
                dataType:'json',
                success:function(data) {
                    //console.log(data)
                    if(data.status =="true" ){
                        window.location.href = "/signin";
                    }else{
                        alert("异常");
                    }
                },
                error : function() {
                    alert("mysql出现问题注册失败！");
                }
            });
        } else {
            alert("输入有误，请检查输入");
        }
    });
    $('#username').bind('input propertychange', function() {
        var username = $('#username');
        var parent = username.parent();
        var usernameValue = username.val();
        var check = /^[A-Za-z0-9@]+$/;
        var onlyAl = /^[A-Za-z@]+$/;
        var onlyDi = /^[\d@]+$/;
        if (check.test(usernameValue) && !onlyDi.test(usernameValue) ) {
            parent.addClass('has-success');
            parent.removeClass("has-error");
        } else {
            parent.removeClass('has-success');
            parent.addClass("has-error");
        }
    });
    $('#password').bind('input propertychange', function() {
        var password = $('#password');
        var parent = password.parent();
        var passwordValue = password.val();
        var check = /^[A-Za-z0-9@\.]+$/;
        if (check.test(passwordValue)) {
            parent.addClass('has-success');
            parent.removeClass("has-error");
        } else {
            parent.removeClass('has-success');
            parent.addClass("has-error");
        }
    });
    $('#password_repeat').bind('input propertychange', function() {
        var password_repeat = $('#password_repeat');
        var parent = password_repeat.parent();
        var password_repeat_Value = password_repeat.val();
        var passwordValue = $('#password').val();
        if (passwordValue == (password_repeat_Value)) {
            parent.addClass('has-success');
            parent.removeClass("has-error");
        } else {
            parent.removeClass('has-success');
            parent.addClass("has-error");
        }
    });
    $('#email').bind('input propertychange', function() {
        var email = $('#email');
        var parent = email.parent();
        var emailValue = email.val();
        var check =  /^[A-Za-z0-9]+([A-Za-z0-9]+)@[A-Za-z0-9]+(\.[A-Za-z0-9]+)$/;
        if (check.test(emailValue)) {
            parent.addClass('has-success');
            parent.removeClass("has-error");
        } else {
            parent.removeClass('has-success');
            parent.addClass("has-error");
        }
    });
    $('#telephone').bind('input propertychange', function() {
        var telephone = $('#telephone');
        var parent = telephone.parent();
        var telephoneValue = telephone.val();
        var check =  /^1[0-9]{10}$/;
        if (check.test(telephoneValue)) {
            parent.addClass('has-success');
            parent.removeClass("has-error");
        } else {
            parent.removeClass('has-success');
            parent.addClass("has-error");
        }
    });

});