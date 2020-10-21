import React, { Component } from "react";
import Products from "../Products";
import axios from "axios";
import Filter from "../Filter";
import { Row } from "react-bootstrap";
import "./styles.css";
import FuzzySearch from "react-fuzzy"


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
    var list = this.state.products;
    if (this.state.products) {
      const list = this.state.products;
      console.log(list)
    }
    return (
      <div>
        <Row>
          <div>
          {(() => {
              if(this.state.products) {
                return <div className="row" style={{marginBottom:"50px", marginTop:"20px"}}><div className="col-md-5"></div><div className="col-md-4"><FuzzySearch
                    list={list}
                    keys={['Uniq Id']}
                    width={430}
                    onSelect={() => {console.log(this.state.products)}}
                    resultsTemplate={(props, state, styles, clickHandler) => {
                      return state.results.map((val, i) => {
                        const style = state.selectedIndex === i ? styles.selectedResultStyle : styles.resultsStyle;
                        return (
                          <div
                            key={i}
                            style={style}
                            onClick={() => window.location.replace("/product/"+val["Uniq Id"])}
                          >
                          <img
                            width="40"
                            height="40"
                            src={val["Product Image Url"]}
                          ></img>
                            {val["Product Name"]}
                          </div>
                        );
                      });
                    }}
                  /></div></div>
             }
          })()}
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
