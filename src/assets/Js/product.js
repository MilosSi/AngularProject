
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
    var lokacija=window.location.href;
    var idProzivoda=lokacija.split("=");
    $.ajax({
        url:"Assets/json/Proizvodi.json",
        method:"GET",
        datatype:"json",
        success:function(data){
            napraviProd(data,idProzivoda[1]);
        },
        error:function(x){
            console.log(x)
        }
    });
});
function napraviProd(data,id){
    let ispis=``;
    data.forEach(elem => {
    if(elem.id==id)
    {
        ispis+=
        `
                <h2>${elem.imeProizvoda}</h2>
                <img src="${elem.slika.putanjaSlike}" alt="${elem.slika.opisSlike}" title="${elem.slika.opisSlike}"/>
                <span id="cenaLogo">
                    <p>${elem.cene.Cena}$</p>
                    <img src="${elem.brand.brandPic}" alt="${elem.brand.opisBrenda}" title="${elem.brand.opisBrenda}" id="logoProd">
                </span>
                <p id="desc">
                    ${elem.opis}
                </p>
        `
    }
   });

   document.getElementById("uniqProd").innerHTML=ispis;
};
var fromLocal=JSON.parse(localStorage.getItem("user"));
console.log(fromLocal);
if (fromLocal!=null) {
    console.log(fromLocal);
    $("#txtUser").val(fromLocal.name);
    $("#passUser").val(fromLocal.pass);
    $("#passUserRe").val(fromLocal.pass);
    $("#emlUser").val(fromLocal.email);
    $("#addUser").val(fromLocal.addr);
    $("#userCity").val(fromLocal.city);
    $("#userState").val(fromLocal.state);
    $("#userZip").val(fromLocal.zip);
}
var nizOrders=[];
function provera()
{   
    
    /*USER REG */
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
        function ordersIn()
        {
            return JSON.parse(localStorage.getItem("order"));
        } 
        function addToOrder()
        {
            console.log("OVDE SAM");
            var lokacija=window.location.href;
            var idProzivoda=lokacija.split("=");
            var id=idProzivoda[1];
            var order=ordersIn();
            console.log(order);
            if(order)
            {
                addToLocal(id,userVal,addVal);
            }
            else
            {
                makeFirstOrder(id,userVal,addVal);
            }

            function addToLocal(id,ime,adresa)
            {
                let orders=ordersIn();
                let orderJson=
                {
                    "idProizovda":id,
                    "imeKupca":ime,
                    "addKupca":adresa
                }
                orders.push(orderJson);
                localStorage.setItem("order",JSON.stringify(orders));
            }

            function makeFirstOrder(id,ime,adresa)
            {
                let orders=[];
                orders[0]=
                {
                    "idProizovda":id,
                    "imeKupca":ime,
                    "addKupca":adresa
                };
                localStorage.setItem("order",JSON.stringify(orders));
            }

        }
        addToOrder();  
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

