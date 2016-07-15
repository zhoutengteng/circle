/**
 * Created by zhoutengteng on 16/6/30.
 */
$('document').ready(function(){
    $('#submit').click(function(){
        var account = $('#account').val();
        var remeber = $('#remenber').is(':checked');
        var password = $('#password').val();
        var checkPassword = /^[A-Za-z0-9@\.]+$/;
        //var checkMail =  /^[A-Za-z0-9]+([A-Za-z0-9]+)@[A-Za-z0-9]+(\.[A-Za-z0-9]+)$/;
        var checkUsername = /^[A-Za-z0-9@]+$/;
        if (checkUsername.test(account) && checkPassword.test(password)) {
            $.ajax({
                type: 'POST',
                url: "/signin",
                async: true,
                data: {
                    account: account,
                    remeber: remeber,
                    password: password
                },
                cache: false,
                dataType: 'json',
                success: function (data) {
                    console.log("===>" + data);
                    if (data.status == "true") {
                        console.log("登录成功");
                        window.location.href = data.url;

                    } else {
                        alert("账户不存在，请重新书写");
                    }
                },
                error: function () {
                    alert("服务器 error！");
                }
            });
        } else {
            alert("潜在输入错误")
        }
    });



});