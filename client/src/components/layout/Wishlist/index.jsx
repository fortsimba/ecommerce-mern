import React, { Component } from "react";
import { Link } from "react-router-dom";
import currency from "../../data/currency";
import axios from 'axios';

const user = localStorage.getItem('token');
export default class Details extends Component {
    constructor(props){
        super(props);
        this.state = { wishlist : [], products: [], filteredProducts: [] };
    }
    componentWillMount(){
        if(user==''){
          return;
        }
        axios.get("/api/wishlist", {params: {uid: user}}).then( (res) => {
            this.setState({
                wishlist : res.data
              });
            }
        )
        axios.get("/api/products_import").then((res) => {
          this.setState({
            products: res.data.products
          });
        }).then(() =>{
          if(!this.state.wishlist){
            return;
          }
          var i,j;
          for(i=0;i<this.state.wishlist.length;i++){
            for(j=0;j<this.state.products.length;j++){
              if(this.state.products[j]["Uniq Id"]==this.state.wishlist[i]){
                this.setState({
                  filteredProducts: this.state.filteredProducts.concat(this.state.products[j])
                });
              }
            }
          }
        });
    }
    removeWishlist(product){
        console.log(this.state.wishlist);
        axios.post("/api/wishlist_count", {pid:product,mode:'dec'}).catch(err =>{
          console.log(err);
          console.log(err.response);
        });
        var arr = this.state.wishlist;
        var mode = "remove";
        const index = arr.indexOf(product);
        if (index > -1) {
          arr.splice(index, 1);
        }
        console.log(arr);
        axios.post("/api/wishlist", {mode,user,arr}).then(res => {
            alert("Item removed from wishlist!");
            window.location.reload(false);
        }).catch(err =>{
          console.log(err);
        });
    }
    addCart(product){
      this.removeWishlist(product);
      var mode = "add";
      axios.post("/api/cart", {mode,user,product}).then(res => {
          alert("Item moved to cart!");
      }).catch(err =>{
        console.log(err);
      });
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
                onClick={() => this.addCart(product["Uniq Id"])}
              >
                Move to cart
              </button>
              <button
                className="btn btn-info"
                onClick={() => this.removeWishlist(product["Uniq Id"])}
              >
                Remove Item
              </button>
            </div>
          </div>
        </div>
      ));
        return (
            <div style={{marginLeft: "500px"}}>
              <h1>Wishlist Items: </h1><br/>
              {(() => {
                  if(this.state.wishlist) {
                    return <div>{productItems}</div>
                 } else {
                   return <p>No items in the wishlist!</p>
                 }
              })()}

            </div>

        )
    }
}
