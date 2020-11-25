import React, { Component } from "react";

export default class Filter extends Component {
  render() {
    return (
      <container>
        <div className="row">
          <div className="col-md-4">
            <label>
              Order by
              <select
                className="form-control"
                value={this.props.sort}
                onChange={this.props.handleChangeSort}
              >
                <option value="">Select</option>
                {/* <option value="lowest">lowest to highest Price</option>
              <option value="highest">highest to lowest Price</option> */}
                <option value="lowest">highest to lowest Price</option>
                <option value="highest">lowest to highest Price</option>
              </select>
            </label>
          </div>
          <div className="col-md-4">
            <label>
              Filter by City
              <select
                className="form-control"
                value={this.props.category}
                onChange={this.props.handleChangeCategory}
              >
                <option value="">ALL</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Manali">Manali</option>
                <option value="Udaipur">Udaipur</option>
              </select>
            </label>
          </div>
        </div>
        <hr />
        <div>{this.props.count} products found.</div>
      </container>
    );
  }
}
