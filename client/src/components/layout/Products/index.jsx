import React, { Component } from "react";
import currency from "../../data/currency";

export default class Products extends Component {
  render() {
    const productItems = this.props.products.map((product) => (
      <div className="col-md-3" key={product["Uniq Id"]}>
        <div className="thumbnail text-center">
          <a
            href={`#${product["Uniq id"]}`}
            onClick={(e) => this.props.handleAddToCard(e, product)}
          >
            <img
              src={`${product["Product Image Url"]}`}
              alt={product["Product Name"]}
            ></img>
            <p>{product["Product Name"]}</p>
          </a>
          <div>
            <b>{currency.formatCurrency(product["Product Price"])}</b>
            <button
              className="btn btn-info"
              onClick={(e) => this.props.handleAddToCard(e, product)}
            >
              Add To Cart
            </button>
            <img
              height="60"
              className="btn btn-display"
              onClick={(e) => this.props.handleAddToWishlist(e, product)}
              src="https://www.flaticon.com/svg/static/icons/svg/865/865904.svg"
            ></img>
          </div>
        </div>
      </div>
    ));
    return <div className="row">{productItems}</div>;
  }
}
