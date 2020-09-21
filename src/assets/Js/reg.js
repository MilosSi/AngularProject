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
var ulogovan=0;
function provera()
{   /*USER REG */
    var regUser=/^[A-Z][A-z0-9]{1,}$/;
    var userVal=$("#txtUser").val();
    var resUser = regUser.test(userVal);
    /*PASS REG */
    var regPass=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; /* MIN 1 NUM I 1 BR*/
    var passVal=$("#passUser").val();
    var resPass=regPass.test(passVal);
    /*CONF PASS */
    var jedn=false;
    var cfPassVal=$("#passUserRe").val();
    if(passVal==cfPassVal)
        {
            jedn=true;
        }
    /*EMAIL */
    var regEmail=/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/;
    var emailVal=$("#emlUser").val();
    var resEmail=regEmail.test(emailVal);
    /* ADDRESA*/
    var regAdr=/^[A-z]+(\s\w+)*$/
    var addVal=$("#addUser").val();
    var resAdd=regAdr.test(addVal);
    /*CITY */
    var regCty=/^[a-zA-Z]+([\s-]?[a-zA-Z]+)*$/;
    var ctyVal=$("#userCity").val();
    var resCty=regCty.test(ctyVal);
    /*STATE SAME AS CITY */
    var staVal=$("#userState").val();
    var resSt=regCty.test(staVal);
    /*ZIP CODE */
    var regZip=/^\d{5}(?:[-\s]\d{4})?$/;
    var zipVal=$("#userZip").val();
    var resZip=regZip.test(zipVal);
    
    var error=true;
    if(resUser!=true)
    {
        $("#txtUserLabel").css("color","#0056b3");
        error=false;
    }
    if(resPass!=true)
    {
        $("#passUserLabel").css("color","#0056b3");
        error=false;
    }
    if(jedn!=true)
    {
        $("#passUserLabelRe").css("color","#0056b3");
        error=false;
    }
    if(resEmail!=true)
    {
        $("#emlUserLabel").css("color","#0056b3");
        error=false;
    }
    if(resAdd!=true)
    {
        $("#addUserLabel").css("color","#0056b3");
        error=false;
    }
    if(resCty!=true)
    {
        $("#userCityLabel").css("color","#0056b3");
        error=false;
    }
    if(resSt!=true)
    {
        $("#userStateLabel").css("color","#0056b3");
        error=false;
    }
    if(resZip!=true)
    {
        $("#userZipLabel").css("color","#0056b3");
        error=false;
    }
    if(error==true)
    {
        if(localStorage)
        {
                console.log("AAA");
                ulogovan=1;
                var user =
                {
                    "status":ulogovan,
                    "name":userVal,
                    "pass":passVal,
                    "email":emailVal,
                    "addr":addVal,
                    "city":ctyVal,
                    "state":staVal,
                    "zip":zipVal
                };
                localStorage.setItem('user', JSON.stringify(user));
                
        }
        
    }
    return error;

}
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

console.log(localStorage.getItem("user"));