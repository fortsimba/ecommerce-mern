import React, { Component } from "react";
import { Link } from "react-router-dom";
import currency from "../../data/currency";
import axios from 'axios';

const user = localStorage.getItem('token');
export default class Details extends Component {
    constructor(props){
        super(props);
        this.state = { products : [] , prod : null }
        this.addCart = this.addCart.bind(this);
        this.addWishlist = this.addWishlist.bind(this);
    }
    componentWillMount(){
        axios.get("/api/products_import").then( (res) =>
            this.setState({
                products : res.data.products
                })
        )
    }
    addCart(product){
        if(user==''){
          alert('Please login before adding products to cart!');
          return;
        }
        var mode = "add";
        console.log(product);
        axios.post("/api/cart", {mode,user,product}).then(res => {
            alert("Item added to cart!");
        }).catch(err =>{
          console.log(err);
        });
    }
    addWishlist(product){
      if(user==''){
        alert('Please login before adding products to wishlist!');
        return;
      }
      var mode = "add";
      axios.post("/api/wishlist", {mode,user,product}).then(res => {
          alert("Item added to wishlist!");
      }).catch(err =>{
        console.log(err);
      });
    }
    render() {
        const item =  this.props.match.params.id;
        const arr  = this.state.products
        let prod = null

        for (const pr of arr) {
            if ( pr["Uniq Id"]==item ) {
                prod = pr;
                break;
               }
        }
        return (
            prod == null
            ?
            <div>
                <Link to="/">Back to catalogue</Link>
                <h3>This product is not avaiable </h3>
            </div>
            :
            <div>
                <Link to="/">Back to catalogue</Link>
                    <div>
                    <img
                    src={`${prod["Product Image Url"]}`}
                    alt={prod["Product Name"]}
                    ></img>

                    <h4>{prod["Product Name"]}</h4>
                    <h5>{prod["Product Brand"]}</h5>
                    <p>{prod["Product Description"]}</p>

                    <h6> What does it contain?</h6>
                    <p>{prod["Product Contents"]}</p>

                    <b>{currency.formatCurrency(prod["Product Price"])}</b>
                    <button
                    className="btn btn-info"
                    onClick={() => this.addCart(prod["Uniq Id"])}
                    >
                    Add To Cart
                    </button>

                    <img
                    height="50"
                    className="btn btn-display"
                    onClick={() => this.addWishlist(prod["Uniq Id"])}
                    src="https://www.flaticon.com/svg/static/icons/svg/865/865904.svg"
                    ></img>
                    </div>
            </div>

        )
    }
}
