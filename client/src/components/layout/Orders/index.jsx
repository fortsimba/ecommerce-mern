import React, { Component } from "react";
import { Link } from "react-router-dom";
import currency from "../../data/currency";
import axios from "axios";

const user = localStorage.getItem("token");
export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = { orders: [], products: [], filteredProducts: [] };
  }
  componentWillMount() {
    if (user == "") {
      return;
    }
    axios.get("/api/orders", { params: { uid: user } }).then((res) => {
      this.setState({
        orders: res.data,
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
        if (!this.state.orders) {
          return;
        }
        var i, j;
        for (i = 0; i < this.state.orders.length; i++) {
          for (j = 0; j < this.state.products.length; j++) {
            if (this.state.products[j]["uniq_id"] == this.state.orders[i]) {
              this.setState({
                filteredProducts: this.state.filteredProducts.concat(
                  this.state.products[j]
                ),
              });
            }
          }
        }
      });
  }
  render() {
    const productItems = this.state.filteredProducts.map((product) => (
      <div className="col-md-6">
        <div className="thumbnail text-center">
          <div>
            <Link to={`/product/${product["uniq_id"]}`}>
              <img
                width="300"
                height="300"
                src={`${product["image_urls"]}`}
                alt={product["property_name"]}
              ></img>
              <p>{product["property_name"]}</p>
            </Link>
          </div>

          <div>
            <b>{currency.formatCurrency(product["per_person_price"])}</b>
          </div>
        </div>
        <hr />
      </div>
    ));
    return (
      <div>
        <br />
        <h2>Ordered Items: </h2>
        <hr />
        <br />
        {(() => {
          if (this.state.orders) {
            return <div style={{ marginLeft: "500px" }}>{productItems}</div>;
          } else {
            return <p>No items ordered yet!</p>;
          }
        })()}
      </div>
    );
  }
}
