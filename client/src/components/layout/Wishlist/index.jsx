import React, { Component } from "react";
import { Link } from "react-router-dom";
import currency from "../../data/currency";
import axios from "axios";
import "./styles.css";
const user = localStorage.getItem("token");
export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = { wishlist: [], products: [], filteredProducts: [] };
  }
  componentWillMount() {
    if (user == "") {
      return;
    }
    axios.get("/api/wishlist", { params: { uid: user } }).then((res) => {
      this.setState({
        wishlist: res.data,
      });
    });
    axios
      .get("/api/hotel_import")
      .then((res) => {
        this.setState({
          products: res.data.hotels,
        });
      })
      .then(() => {
        if (!this.state.wishlist) {
          return;
        }
        var i, j;
        for (i = 0; i < this.state.wishlist.length; i++) {
          for (j = 0; j < this.state.products.length; j++) {
            if (this.state.products[j]["uniq_id"] == this.state.wishlist[i]) {
              this.setState({
                filteredProducts: this.state.filteredProducts.concat(
                  this.state.products[j]
                ),
              });
            }
          }
          console.log(this.state.filteredProducts);
        }
      });
  }
  removeWishlist(product) {
    console.log(this.state.wishlist);
    axios
      .post("/api/wishlist_count", { pid: product, mode: "dec" })
      .catch((err) => {
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
    axios
      .post("/api/wishlist", { mode, user, arr })
      .then((res) => {
        alert("Item removed from Saves!");
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    const productItems = this.state.filteredProducts.map((product) => (
      <div className="col-md-6">
        <div className="thumbnail text-center">
          <div>
            <Link to={`/product/${product["Uniq Id"]}`}>
              <img
                width="400"
                height="300"
                src={`${product["image_urls"]}`}
                alt={product["property_name"]}
              ></img>
              <p>{product["property_name"]}</p>
            </Link>
          </div>

          <div>
            <b>{currency.formatCurrency(product["per_person_price"])}</b>

            <button
              className="btn btn-info"
              onClick={() => this.removeWishlist(product["uniq_id"])}
            >
              Remove Item
            </button>
          </div>
          <hr />
        </div>
      </div>
    ));
    return (
      <div>
        <br />
        <h2>Saved for Later: </h2>
        <hr />
        <br />
        {(() => {
          if (this.state.wishlist) {
            return <div style={{ marginLeft: "450px" }}>{productItems}</div>;
          } else {
            return <p>No items in the wishlist!</p>;
          }
        })()}
      </div>
    );
  }
}
