import React, { Component } from "react";
import { Link } from "react-router-dom";
import currency from "../../data/currency";
import axios from 'axios';

const user = localStorage.getItem('token');
export default class Details extends Component {
    constructor(props){
        super(props);
        this.state = { cart : [], products: [], filteredProducts: [] };
    }
    componentWillMount(){
        if(user==''){
          return;
        }
        axios.get("/api/cart", {params: {uid: user}}).then( (res) => {
            this.setState({
                cart : res.data
              });
            }
        )
        axios.get("/api/products_import").then((res) => {
          this.setState({
            products: res.data.products
          });
        }).then(() =>{
          if(!this.state.cart){
            return;
          }
          var i,j;
          for(i=0;i<this.state.cart.length;i++){
            for(j=0;j<this.state.products.length;j++){
              if(this.state.products[j]["Uniq Id"]==this.state.cart[i]){
                this.setState({
                  filteredProducts: this.state.filteredProducts.concat(this.state.products[j])
                });
              }
            }
          }
        });
    }
    removeCart(product){
        console.log(this.state.cart);
        var arr = this.state.cart;
        var mode = "remove";
        const index = arr.indexOf(product);
        if (index > -1) {
          arr.splice(index, 1);
        }
        // console.log(arr);
        axios.post("/api/cart", {mode,user,arr}).then(res => {
            alert("Item removed from cart!");
            window.location.reload(false);
        }).catch(err =>{
          console.log(err);
        });
    }
    addWishlist(product){
      this.removeCart(product);
      axios.post("/api/wishlist_count", {pid:product,mode:'inc'}).catch(err =>{
        console.log(err);
        console.log(err.response);
      });
      var mode = "add";
      axios.post("/api/wishlist", {mode,user,product}).then(res => {
          alert("Item moved to wishlist!");
      }).catch(err =>{
        console.log(err);
      });
    }
    checkout(){
      if(this.state.cart){
        var arr = this.state.cart;
        axios.post("/api/orders", {user,arr}).then(res => {
            alert("Order placed!");
            window.location.reload(false);
        }).catch(err =>{
          console.log(err);
        });
        arr = [null];
        var mode = "remove";
        console.log(this.state.cart);
        axios.post("/api/cart", {mode,user,arr}).then(res => {
            alert("Item removed from cart!");
            window.location.reload(false);
        }).catch(err =>{
          console.log(err);
        });
      }
      else{
        alert("Your cart is empty! please add some items in order to checkout.");
      }
    }
    render() {
      const productItems = this.state.filteredProducts.map((product) => (
        <div className="col-md-3">
          <div className="thumbnail text-center">

              <div>
              <Link to={`/product/${product["Uniq Id"]}`} >
                <img
                  src={`${product["Product Image Url"]}`}
                  alt={product["Product Name"]}
                ></img>
                <p>{product["Product Name"]}</p>
              </Link>
              </div>

            <div>
              <b>{currency.formatCurrency(product["Product Price"])}</b>
              <button
                className="btn btn-info"
                onClick={() => this.removeCart(product["Uniq Id"])}
              >
                Remove Item
              </button>
              <img
                height="50"
                className="btn btn-display"
                onClick={() => this.addWishlist(product["Uniq Id"])}
                src="https://www.flaticon.com/svg/static/icons/svg/865/865904.svg"
              ></img>
            </div>
          </div>
        </div>
      ));
        return (
            <div style={{marginLeft: "500px"}}>
              <h1>Cart Items: </h1><br/>
              {(() => {
                  if(this.state.cart) {
                    return <div>{productItems}</div>
                 } else {
                   return <p>No items in the cart!</p>
                 }
              })()}
              <button
                className="btn btn-info"
                onClick={() => this.checkout()}
              >
                Checkout
              </button>
            </div>

        )
    }
}
