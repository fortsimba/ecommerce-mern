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
        alert("Item saved for later!");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    const hotels = this.props.hotels.map(
      (hotel) => (
        (
          <div className="col-md-4" key={hotel["uniq_id"]}>
            <div className="thumbnail text-center product_component">
              <div>
                <Link to={`/hotel/${hotel["uniq_id"]}`}>
                  <img
                    className="card_img"
                    src={`${hotel["image_urls"]}`}
                    alt={hotel["property_name"]}
                  ></img>
                  <h2 className="hotel_title">{hotel["property_name"]}</h2>
                </Link>
              </div>
              <div className="hotel_info">
                <div>
                  <p className="hotel_info">
                    {currency.formatCurrency(hotel["per_person_price"])}
                  </p>
                  {/* <button
                    className="btn btn-lg btn-info"
                    onClick={() => this.addCart(hotel["uniq_id"])}
                  >
                    Add To Cart
                  </button> */}
                  <img
                    // className="wishlist_button"
                    height="40"
                    className="btn btn-display"
                    title="Save for Later"
                    onClick={() => this.addWishlist(hotel["uniq_id"])}
                    src="https://www.flaticon.com/svg/static/icons/svg/865/865904.svg"
                  ></img>
                </div>
                <h4 className="hotel_info">
                  {hotel["hotel_star_rating"] +
                    " ☆ Rating: "}
                </h4>
              </div>
            </div>
          </div>
        )
      )
    );
    return <div className="row">{hotels}</div>;
  }
}
