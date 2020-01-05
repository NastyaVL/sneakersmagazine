import React from "react";
import "./cart.css";
import pic from "../../images/cross/adidas-yeezy-boost-350-v2-trfrm_01-1200x800-1200x800_0.jpg";
import Button from "../../components/button/button";
import EmptyCart from "./emptyCart";
import RowCart from "./rowCart";
import Tooltip from "../../components/tooltip/tooltip";
import PopUpWindows from "../../components/modal/popUpWindows";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productsCart: [],
      error: -2
    };
    this.getServerData();
    this.clearCart = this.clearCart.bind(this);
  }

  async getServerData() {
    const responce = await fetch(
      "https://sneakers-shop-back.herokuapp.com/cart/read/"
    );
    const jsonData = await responce.json();
    var productsCart = [
      {
        _id: 0,
        img: pic,
        name: "Название",
        size: 37,
        cost: 20000,
        count: 2,
        sum: 40000
      },
      {
        _id: 1,
        img: pic,
        name: "Название",
        size: 38,
        cost: 20000,
        count: 1,
        sum: 20000
      },
      {
        _id: 2,
        img: pic,
        name: "Название",
        size: 39,
        cost: 26000,
        count: 1,
        sum: 26000
      }
    ];
    if (jsonData.error > 0) {
      this.setState({
        productsCart: jsonData.results,
        //productsCart: productsCart,
        error: jsonData.error
      });
    } else if (jsonData.error === 0) {
      this.setState({
        error: jsonData.error
      });
    } else {
      alert(jsonData.messages);
    }
  }

  getTableHeader = () => {
    let headers = [];
    let rowHeader = [
      "Товар",
      "Название",
      "Размер",
      "Цена",
      "Количество",
      "Сумма",
      <>
        <Tooltip position="right" content="Очистить">
          <PopUpWindows
            content={
              <>
                "Вы точно хотите удалить все товары? Отменить действие будет
                невозможно"
                <div className="btn-clear">
                  <Button onClick={this.clearCart}>Очистить корзину</Button>
                </div>
              </>
            }
            title="Удаление всех товаров"
            nameIcon="far fa-trash-alt"
            sizeIcon={1}
          />
        </Tooltip>
      </>
    ];
    for (let header of rowHeader) {
      headers.push(<th>{header}</th>);
    }
    return headers;
  };

  deleteProduct = (element, e) => {
    const productsCart = Object.assign([], this.state.productsCart);
    productsCart.splice(productsCart.indexOf(element), 1);
    this.setState({ productsCart: productsCart });

    // fetch("http://sneakers-shop-back.herokuapp.com/cart/delete_one/", {
    //   method: "POST",
    //   body: JSON.stringify(element._id),
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // });
  };

  async clearCart() {
    const productsCart = Object.assign([], this.state.productsCart);
    let lengthMassivaProductCart = this.state.productsCart.length;
    productsCart.splice(0, lengthMassivaProductCart);
    this.setState({ productsCart: productsCart });

    // let response = await fetch('http://sneakers-shop-back.herokuapp.com/cart/delete_all/');
    // let jsonData = await response.json();
    // switch (jsonData.error) {
    //   case 0:
    //     this.setState({
    //       productsCart: jsonData.results,
    //       error: jsonData.error
    //     });
    //     break;
    //   default:
    //     alert(jsonData.messages);
    //     this.setState({
    //       error: jsonData.error
    //     });
    //   }
  }

  render() {
    let cart;
    let renderMessageEmpty = <EmptyCart />;
    let renderCart = (
      <section className="cart">
        <div className="container-cart">
          <main className="cart-main">
            <table className="cart-table">
              <thead>
                <tr>{this.getTableHeader()}</tr>
              </thead>
              <tbody>
                {this.state.productsCart.map(element => (
                  <RowCart
                    pic={element.img}
                    name={element.name}
                    size={element.size}
                    cost={element.cost}
                    count={element.count}
                    sum={element.sum}
                    delEvent={this.deleteProduct.bind(this, element)}
                  />
                ))}
              </tbody>
            </table>
          </main>
        </div>
        <div className="orders-transition-block">
          <div className="btn-orders">
            <Button className="invert">Перейти к оформлению</Button>
          </div>
          <div className="total">
            <h3 className="label-total">Общая стоимость</h3>
            <span>86000 &#8381;</span>
          </div>
          <div className="total">
            <h3 className="label-total">Количество товаров</h3>
            <span>4</span>
          </div>
        </div>
      </section>
    );

    if (this.state.productsCart.length === 0) cart = renderMessageEmpty;
    else cart = renderCart;
    return <>{cart}</>;
  }
}

export default Cart;
