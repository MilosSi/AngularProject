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

    

    generateAjax("Assets/json/Proizvodi.json",napraviProizvod);
    generateAjax("Assets/json/pol.json",napraviLinkove);

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
            error:function(){
                console.log("GRESKA")
            }
        });
    }

    /*NAPRAVI PROIZVODE */

    function napraviProizvod(data)
    {
        var e=0;
        var ispis=`<div class="row fDrzac">`;
        data.forEach(element => {
            e++;
            ispis+=
            `
            <div class="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-xs-12 fArticles">`;
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
        document.getElementById("products").innerHTML=ispis;
    };

    /* NAPRAVI LINKOVE*/
    function napraviLinkove(data)
    {
        var ispis=``;
        data.forEach(function(elem){
                    if(elem.polId==2)
                    {
                        ispis+=`<a href="#" data-idpol="${elem.polId}" class="polLink mr-auto ml-auto">${elem.pol}</a><br/>`
                    }
                    else
                     ispis+=`<a href="#" class="polLink" data-idpol="${elem.polId}">${elem.pol}</a><br/>`;

        });
        document.getElementById("polLinkovi").innerHTML=ispis;


        /*FILTER GENDER */
        var linkovi=$(".polLink");
        linkovi.click(function(e){
            e.preventDefault();
            var vred=$(this).data("idpol");
            $.ajax({
                url:"Assets/json/Proizvodi.json",
                method:"GET",
                datatype:"json",
                success:function(data)
                {
                    var filterGen=filterGender(data,vred);
                    napraviProizvod(filterGen);
                },
                error:function()
                {
                    console.log("Greska");
                }
            })
        });
    
        function filterGender(data,id)
        {
            var rezultat=data.filter(function(element)
            {
                if(element.polKat.polId==id)
                    return true;
            });
            return rezultat;
        }
    }

    /*PRETRAGA */

    $("#serchProd").keyup(function(){
        var vredSearch=$(this).val().toLowerCase(); 
        $.ajax({
            url:"Assets/json/Proizvodi.json",
            method:"GET",
            datatype:"json",
            success:function(data){
                var searchRez=searchFilter(data,vredSearch);
                if(searchRez.length==0)
                {
                    napraviProizvod(data);  /*AKO JE NIZ ZA PRETRAGU PRAZAN PRIKAZI ORIGINAL */
                }
                napraviProizvod(searchRez);

            },
            error:function(){
                console.log("GRESKA")
            }
        });

    });

    function searchFilter(data,naziv)
    {
        var rezultat=data.filter(function(elem){
            var nazivProizvoda=elem.imeProizvoda.toLowerCase(); /*PRVO IH SMANJIH */
            var nizNaziva=nazivProizvoda.split(" "); 
            for(var pojedNaziv of nizNaziva) /* FOR OF KAKO BI MOGAO DA VRATIS VREDNOST*/
            {
                if(pojedNaziv==naziv)
                {
                    return true;
                }
            }
        });
        return rezultat;
    }

    /*FILTER BRENDOVA */
    var nizCbx=[];
    $(".brendCbx").change(function(){
        var vredCbx=$(this).val();
        var index=nizCbx.indexOf(vredCbx);
        if(index>-1)
        {
            nizCbx.splice(index,1);
        }
        else
        {
            nizCbx.push(vredCbx);
        }
            $.ajax({
                url:"Assets/json/Proizvodi.json",
                method:"GET",
                datatype:"json",
                success:function(data){
                    var cbxNIz=filterBrands(data,nizCbx);
                    napraviProizvod(cbxNIz);
                    if(cbxNIz.length==0)
                    {
                       
                        napraviProizvod(data);  /*AKO JE NIZ ZA PRETRAGU PRAZAN PRIKAZI ORIGINAL */
                    }
    
                },
                error:function(){
                    console.log("GRESKA")
                }
            });
    });

    function filterBrands(data,nizVred)
    {
        var rezultat=data.filter(function(element){
            for(var idBrenda of nizVred)
            {
                if(element.brand.brandId==idBrenda)
                    return true;
            }
        });
        return rezultat;
    }

    /*SORT */
    $("#sortSelect").change(function(){
        var selVred=$(this).val();
        $.ajax({
            url:"Assets/json/Proizvodi.json",
            method:"GET",
            datatype:"json",
            success:function(data){
                sortProducts(data,selVred);
                napraviProizvod(data);
            },
            error:function(){
                console.log("GRESKA")
            }
        });
        
    })

    



    function sortProducts(data,idSorta)
    {
        if(idSorta==0)
        {
            return data;
        }
        else if(idSorta==1)
        { /* RASTUCE PO CENAMA*/
         data.sort(function(a,b){
            return a.cene.Cena-b.cene.Cena; 
         });
         
        }
        else if(idSorta==2)
        { /*OPADAJUCI PO CENAMA */
            data.sort(function(a,b){
                return b.cene.Cena-a.cene.Cena;
             });
        }
        else if(idSorta==3) 
        {
            data.sort(function(a,b){
                if(a.imeProizvoda>b.imeProizvoda)
                    return 1; /* vracas jedan*/
                else if(a.imeProizvoda==b.imeProizvoda)
                    return 0;
                else
                    return -1;
            });
        }
        else
        {
            data.sort(function(a,b){
                if(a.imeProizvoda>b.imeProizvoda)
                    return -1;
                else if(a.imeProizvoda==b.imeProizvoda)
                    return 0;
                else
                    return 1
            });
        }
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