import React, { Component } from "react";

export default class Products extends Component {
  render() {
    const productItems = this.props.products.map((product) => (
      <div className="col-md-4">
        <div className="thumbnail text-center">
          <a
            href={`#${product["Uniq id"]}`}
            onClick={this.props.handleAddToCard}
          >
            <img
              src={`${product["Product Image Url"]}`}
              alt={product["Product Name"]}
            ></img>
            <p>{product["Product Name"]}</p>
          </a>
        </div>
      </div>
    ));
    return <div className="row">{productItems}</div>;
  }
}
