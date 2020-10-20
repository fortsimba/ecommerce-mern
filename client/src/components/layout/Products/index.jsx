import React, { Component } from "react";
import currency from "../../data/currency";
import { Link } from "react-router-dom";
import axios from "axios";
import "./styles.css";

const user = localStorage.getItem("token");
export default class Products extends Component {
  constructor(props) {
    super(props);
    this.addCart = this.addCart.bind(this);
    this.addWishlist = this.addWishlist.bind(this);
  }
  addCart(product) {
    var mode = "add";
    if (user == "") {
      alert("Please login before adding products to cart!");
      return;
    }
    axios
      .post("/api/cart", { mode, user, product })
      .then((res) => {
        alert("Item added to cart!");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  addWishlist(product) {
    if (user == "") {
      alert("Please login before adding products to wishlist!");
      return;
    }
    var mode = "add";
    axios
      .post("/api/wishlist", { mode, user, product })
      .then((res) => {
        alert("Item added to wishlist!");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    const productItems = this.props.products.map((product) => (
      <div className="col-md-4" key={product["Uniq Id"]}>
        <div className="thumbnail text-center product_component">
          <div>
            <Link to={`/product/${product["Uniq Id"]}`}>
              <img
                width="300"
                height="300"
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
              Add To Cart
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
    return <div className="row">{productItems}</div>;
  }
}
