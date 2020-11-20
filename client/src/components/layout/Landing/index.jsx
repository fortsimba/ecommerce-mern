import React, { Component } from "react";
import Hotels from "../Hotels";
import axios from "axios";
import Filter from "../Filter";
import { Row } from "react-bootstrap";
import "./styles.css";
import FuzzySearch from "react-fuzzy"


class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = { hotels: [], filteredHotels: [] };
    this.handleChangeSort = this.handleChangeSort.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
  }
  componentWillMount() {
    axios.get("/api/hotel_import").then((res) => {
      this.setState({
        hotels: res.data.hotels,
        filteredHotels: res.data.hotels,
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
        state.hotels.sort((a, b) =>
          state.sort === "lowest"
            ? a["per_person_price"] < b["per_person_price"]
              ? 1
              : -1
            : a["per_person_price"] > b["per_person_price"]
            ? 1
            : -1
        );
      } else {
        state.hotels.sort((a, b) => (a["uniq_id"] < b["uniq_id"] ? 1 : -1));
      }
      if (state.category !== "") {
        return {
          filteredHotels: state.hotels.filter(
            (a) => a["city"].indexOf(state.category) >= 0
          ),
        };
      }
      // if (state.category !== "") {
      //   return {
      //     filteredHotels: state.product((a) => a["city"]),
      //   };
      // }
      return { filteredHotels: state.hotels };
    });
  }

  render() {
    console.log(this.state.hotels)
    var list = this.state.hotels;
    if (this.state.hotels) {
      const list = this.state.hotels;
      console.log(list)
    }
    return (
      <div>
        <Row>
          <div>
          {(() => {
              if(this.state.hotels) {
                return <div className="row" style={{marginBottom:"50px", marginTop:"20px"}}><div className="col-md-5"></div><div className="col-md-4"><FuzzySearch
                    list={list}
                    keys={["property_name"]}
                    width={430}
                    onSelect={() => {console.log(this.state.hotels)}}
                    resultsTemplate={(props, state, styles, clickHandler) => {
                      return state.results.map((val, i) => {
                        const style = state.selectedIndex === i ? styles.selectedResultStyle : styles.resultsStyle;
                        return (
                          <div
                            style={style}
                            onClick={() => window.location.replace("/hotel/"+val["uniq_id"])}
                          >
                          <img
                            width="100"
                            height="100"
                            src={val["image_urls"]}
                          ></img>
                            <p>{val["property_name"]}</p>
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
              count={this.state.filteredHotels.length}
            />
            <hr />
            <Hotels
              hotels={this.state.filteredHotels}
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
