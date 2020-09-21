$("document").ready(function(){
    function slajderDivova()
    {
        let trenutni=$("#drzacSlider .active");
        let sled=trenutni.next().length ? trenutni.next():trenutni.parent().children(":first");
        trenutni.fadeOut(2500).removeClass("active");
        sled.fadeIn(2500).addClass("active");
        setTimeout(slajderDivova,5000);
    }
    slajderDivova();
    
    /*PROSIRIVANJE SEARCHA*/
    $("#srProd").focus(function(){
        $("#srForma").animate({"width":"100%"},2000);
        
    });
    $("#srProd").blur(function(){
        $("#srForma").animate({"width":"70%"},2000);
        
    });
});
function proveraNews()
{
    var regEmail=/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/;
    var emailVal=$("#emlNewspaper").val();
    var resEmail=regEmail.test(emailVal);
    var error=true;
    if(resEmail!=true)
    {
        $("#subP").css("color","#0056b3");
        error=false;
    }
    return error;
}

function proveraLog()
{
     /*USER REG */
     var regUser=/^[A-Z][A-z0-9]{1,}$/;
     var userVal=$("#txtUserLog").val();
     var resUser = regUser.test(userVal);
     /*PASS REG */
     var regPass=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; /* MIN 1 NUM I 1 BR*/
     var passVal=$("#passUserLog").val();
     var resPass=regPass.test(passVal);

     var error=true;
     if(resUser!=true)
     {
         $("#txtUserLogLabel").css("color","#0056b3");
         error=false;
     }
     if(resPass!=true)
     {
         $("#passUserLogLabel").css("color","#0056b3");
         error=false;
     }
     return error;
}