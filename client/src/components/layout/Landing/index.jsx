import React, { Component } from "react";
import Products from "../Products";
import axios from "axios";
import Filter from "../Filter";
import { Row } from "react-bootstrap";
import "./styles.css";


class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [], filteredProducts: [] };
    this.handleChangeSort = this.handleChangeSort.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
  }
  componentWillMount() {
    axios.get("/api/products_import").then((res) => {
      this.setState({
        products: res.data.products,
        filteredProducts: res.data.products,
      });
    });
  }

  handleChangeSort(e) {
    this.setState({ sort: e.target.value });
    this.listProducts();
  }
  handleChangeCategory(e) {
    this.setState({ category: e.target.value });
    this.listProducts();
  }

  listProducts() {
    this.setState((state) => {
      if (state.sort !== "") {
        state.products.sort((a, b) =>
          state.sort === "lowest"
            ? a["Product Price"] < b["Product Price"]
              ? 1
              : -1
            : a["Product Price"] > b["Product Price"]
            ? 1
            : -1
        );
      } else {
        state.products.sort((a, b) => (a["Uniq Id"] < b["Uniq Id"] ? 1 : -1));
      }
      if (state.category !== "") {
        return {
          filteredProducts: state.products.filter(
            (a) => a["Product Category"].indexOf(state.category) >= 0
          ),
        };
      }

      // if (state.category !== "") {
      //   return {
      //     filteredProducts: state.product((a) => a["Product Category"]),
      //   };
      // }
      return { filteredProducts: state.products };
    });
  }

  render() {
    return (
      <div>
        <Row>
          <div>
            {/*className="col-md-8"*/}
            <Filter
              category={this.state.category}
              sort={this.state.sort}
              handleChangeCategory={this.handleChangeCategory}
              handleChangeSort={this.handleChangeSort}
              count={this.state.filteredProducts.length}
            />
            <hr />
            <Products
              products={this.state.filteredProducts}
              handleAddToCart={this.handleAddToCart}
              handleAddToWishlistt={this.handleAddToWishlist}
            />
          </div>
        </Row>
      </div>
    );
  }
}

export default Landing;
