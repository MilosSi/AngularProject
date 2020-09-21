import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  ordersIn()
  {
    return JSON.parse(localStorage.getItem('order'));
  }

  addToLocal(id, name, address, watchname, watchpic, price, brandname, type)
  {
    if (type == 0)
    {
      const orders = [];
      orders[0] =
        {
          idProizovda: id,
          imeKupca: name,
          addKupca: address,
          imeSata: watchname,
          slikaSata: watchpic,
          cena: price,
          slikaBrenda: brandname
        };
      localStorage.setItem('order', JSON.stringify(orders));
    }
    else
    {
      const orders = this.ordersIn();
      const orderJson =
        {
          idProizovda: id,
          imeKupca: name,
          addKupca: address,
          imeSata: watchname,
          slikaSata: watchpic,
          cena: price,
          slikaBrenda: brandname
        };
      orders.push(orderJson);
      localStorage.setItem('order', JSON.stringify(orders));
    }
  }

  deleteOrder(id)
  {
    let orders = this.ordersIn();
    orders = orders.filter(function(el, index) {
        return (index != id);
    });
    localStorage.setItem('order', JSON.stringify(orders));
    if (orders.length == 0)
    {
      this.deleteCart();
    }
  }

  deleteCart()
  {
    localStorage.removeItem('order');
  }
}
