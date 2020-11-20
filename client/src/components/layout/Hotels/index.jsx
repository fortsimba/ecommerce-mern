import React, { Component } from "react";
import currency from "../../data/currency";
import { Link } from "react-router-dom";
import axios from "axios";
import "./styles.css";

const user = localStorage.getItem("token");
export default class Hotels extends Component {
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
    axios
      .post("/api/wishlist_count", { pid: product, mode: "inc" })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
      });
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
    const hotels = this.props.hotels.map((hotel) => (
      console.log(hotel),
      <div className="col-md-4" key={hotel["uniq_id"]}>
        <div className="thumbnail text-center product_component">
          <div>
            <Link to={`/hotel/${hotel["uniq_id"]}`}>
              <img
                width="300"
                height="300"
                src={`${hotel["image_urls"]}`}
                alt={hotel["property_name"]}
              ></img>
              <p>{hotel["property_name"]}</p>
            </Link>
          </div>

          <div>
            <b>{currency.formatCurrency(hotel["per_person_price"])}</b>
            <button
              className="btn btn-lg btn-info"
              onClick={() => this.addCart(hotel["uniq_id"])}
            >
              Add To Cart
            </button>
            <img
              height="60"
              className="btn btn-display"
              onClick={() => this.addWishlist(hotel["uniq_id"])}
              src="https://www.flaticon.com/svg/static/icons/svg/865/865904.svg"
            ></img>
          </div>
        </div>
      </div>
    ));
    return <div className="row">{hotels}</div>;
  }
}
