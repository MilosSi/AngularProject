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
    
    var orders=ordersIn();
    if(!orders)
        ordersEmpty();
    else
        displayOrders(orders);
});
function ordersIn()
{
     return JSON.parse(localStorage.getItem("order"));
}
function displayOrders(nizOrder)
{
    var ispis=`
    <div class="table-responsive-md ">
    <table class="table">
        <thead class="thead-dark">
            <tr>
            <th scope="col">Customer</th>
            <th scope="col">Address</th>
            <th scope="col">Price</th>
            <th scope="col">Rating</th>
            <th scope="col">Name</th>
            <th scope="col">Brand</th>
            <th scope="col">Picture</th>
            </tr>
        </thead>
        <tbody>
    `;
    $.ajax({
        url:"Assets/json/Proizvodi.json",
        method:"GET",
        datatype:"json",
        success:function(data){
            nizOrder.forEach(eleOrder => {
                ispis+=
                    `
                    <tr>
                        <td>${eleOrder.imeKupca}</td>
                        <td>${eleOrder.addKupca}</td>
                        
                    `;
                data.forEach(elemProiz=>{
                    if(eleOrder.idProizovda==elemProiz.id)
                    {
                        ispis+=
                        `
                            <td>${elemProiz.cene.Cena} $</td>
                            <td>${elemProiz.ocena}</td>
                            <td>${elemProiz.imeProizvoda}</td>
                        `;
                        if(elemProiz.brand.brandId==1)
                        {
                            ispis+=`<td>ROLEX</td>`;
                        }
                        else if(elemProiz.brand.brandId==2)
                        {
                            ispis+=`<td>CARTIER</td>`;
                        }
                        else if(elemProiz.brand.brandId==3)
                        {
                            ispis+=`<td>ZENITH</td>`;
                        }
                        else
                        {
                            ispis+=`<td>OMEGA</td>`;
                        }
                        ispis+=`
                            <td id="picOrder"><img src="${elemProiz.slika.putanjaSlike}" alt="${elemProiz.slika.opisSlike}" title="${elemProiz.slika.opisSlike}"></td>
                        </tr>
                        `;
                    }
                    
                });
            });
            ispis+=` </tbody>
            </table>
            </div>`;
            $(".tabela").html(ispis);
        },
        error:function(){
            console.log("GRESKA")
        }
    });

}
$("#btnOrder").click(function()
{
    localStorage.removeItem("order");
})
function ordersEmpty()
{
    $(".tabela").html("<h1>YOUR ORDER LIST IS EMPTY</h2>");
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