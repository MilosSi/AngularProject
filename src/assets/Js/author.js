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