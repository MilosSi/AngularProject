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
    
     /*AJAX PROZIVODI */
    /*$.ajax({
        url:"Assets/json/Proizvodi.json",
        method:"GET",
        datatype:"json",
        success:function(data){
            console.log(data);
            napraviFProizvode(data);
        },
        error:function(){
            console.log("GRESKA")
        }
    });*/
    /*POZIVANJE FJA */
    generateAjax("Assets/json/Proizvodi.json",napraviFProizvode);
    generateAjax("Assets/json/brand.json",napraviBrandove);

    /*DEF FJA */
    function generateAjax(jsonUrl,func)
    {
        $.ajax({
            url:jsonUrl,
            method:"GET",
            datatype:"json",
            success:function(data){
                func(data);
            },
            error:function(x){
                console.log(x)
            }
        });
    }
    function napraviProizvod(data)
    {
        var e=0;
        var ispis=`<div class="row fDrzac">
        <h2 id="fH2">&middot;FEATURED COLLECTION&middot;</h2>`;
        data.forEach(element => {
            console.log(e);
            e++;
            ispis+=
            `
            <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12 fArticles">`;
            if(element.cene.popust==1)
            {
                ispis+=`<p id="akc">AKCIJA</p>`;
            }
            if(element.novProizvod==1)
            {
                ispis+=`<p id="nvn">NOVO</p>`;
            }
            ispis+=
            `   
                
                <span id="slikaProd">
                    <img src="${element.slika.putanjaSlike}" alt="${element.slika.opisSlike}" title="${element.slika.opisSlike}"/>
                </span>
                <span id="stars">
            `;
            for(var i=0;i<element.ocena;i++)
            {
                ispis+=`<i class="fas fa-star"></i>`;
            }
            for(var k=0;k<(5-element.ocena);k++)
            {
                ispis+=`<i class="far fa-star"></i>`;
            }
            ispis+=`
                </span>
                <p id="prodName">${element.imeProizvoda}</p>
                <span id="sNCenaBrand">
                    <span id="sNcena">
                `;
                if(element.cene.popust==1)
                {
                    ispis+=`<p id="staraCena" >${element.cene.staraCena} $</p>`
                }
                if(element.cene.popust==0)
                {
                    ispis+=`<p>&nbsp</p>`

                }
                ispis+=`
                
                    
                        
                        <p>${element.cene.Cena} $</p>
                    </span>
                    <span id="brand">
                        <a href="products.html?BrandId=${element.brand.brandId}"><img src="${element.brand.brandPic}" alt="${element.brand.opisBrenda}" title="${element.brand.opisBrenda}"/></a>
                    </span>
                </span>
                <span id="order">
                    <a href="product.html?productId=${element.id}"><button><i class="fas fa-cart-plus"></i> ORDER NOW</button></a>
                </span>
            </div>
            `;
        });
        ispis+=`</div>`;
        document.getElementById("fGlavniDrzac").innerHTML=ispis;
    };
    function napraviBrandove(data)
    {
        var ispis1="";
        var ispis2="";
        var ispis="";
        data.forEach(element =>{
            ispis=`<div class="row">`;
            ispis1=
            `   
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 abBrands">
                    <img src="${element.fullBrandPic}" alt="${element.imeBrenda} About" title="${element.imeBrenda} About">
                </div> 
            `;
            ispis2=
            `
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 abBrands">
                <h2>${element.imeBrenda}</h2>
                <p>${element.OpisDetaljniji}</p>
                <a href="products.html">EXPLORE THE COLLECTION</a>
            </div>
            `;
            if(element.brandId%2!=0)
            {
                ispis+=ispis1+ispis2;
            }
            else
            {
                ispis+=ispis2+ispis1;
            }
            ispis+="</div>";
            document.getElementById("brendovi").innerHTML+=ispis;
        });
        
    }

    function napraviFProizvode(data)
    {
        var fProdutcs=data.filter(function(element){
            if(element.isF==1)
            {
                return element;
            }

        });

        napraviProizvod(fProdutcs);
    }
    
    
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