import React, { Component } from "react";
import { Link } from "react-router-dom";
import currency from "../../data/currency";
import axios from 'axios';



const user = localStorage.getItem('token');
export default class Details extends Component {
    constructor(props){
        super(props);
        this.state = { products : [] , comments: []}
        this.addCart = this.addCart.bind(this);
        this.addWishlist = this.addWishlist.bind(this);
        // this.commenter = this.commenter.bind(this);
    }
    componentWillMount(){
        var prod_id = this.props.match.params.id

        axios.get("/api/products_import").then( (res) =>
            this.setState({
                products : res.data.products
                })
        )

        axios.get("/api/details", {params: {
            _id : prod_id }}
        ).then((res) =>
        {this.setState({
                comments : res.data[0]})}
        )
    }


    addCart(product){
        if(user==''){
          alert('Please login before adding products to cart!');
          return;
        }
        var mode = "add";
        console.log(product);
        axios.post("/api/cart", {mode,user,product}).then(res => {
            alert("Item added to cart!")
        }).catch(err =>{
          console.log(err);
          console.log(this.state.products)
        })
    }


    submit(product){
        var inp_name = document.getElementById('name').value
        var inp_rating = document.getElementById('rating').value
        var inp_comment = document.getElementById('comment').value
        console.log(inp_name)
        axios.post("/api/details" , { product , inp_name , inp_rating, inp_comment }).then( res => {
            alert("Comment Posted");
        }).catch(err =>{
            alert("Comment could not be posted")
        })
        window.location.reload(false)
    }

    addWishlist(product){
      axios.post("/api/wishlist_count", {pid:product,mode:'inc'}).catch(err =>{
        console.log(err);
        console.log(err.response);
      });
      if(user==''){
        alert('Please login before adding products to wishlist!');
        return;
      }
      var mode = "add";
      axios.post("/api/wishlist", {mode,user,product}).then(res => {
          alert("Item added to wishlist!");
      }).catch(err =>{
        console.log(err);
      });
    }



    commenter(what){
        /* 'coms' for comments  , 'avg_ratings' for average ratings , everything else null*/
        if(this.state.comments){
            const ct = this.state.comments.comment;
            const nm = this.state.comments.name;
            const rt = this.state.comments.rate;

            const names = []
            if (nm) {
                for (var i =0 ; i<nm.length ; i++){
                    names.push(nm[i])
                }}

            const ratings = []
            if (rt) {
                for (var i =0 ; i<rt.length ; i++){
                    ratings.push(rt[i])
                }}

            const cmnts = []
            if (ct) {
                for (var i =0 ; i<ct.length ; i++){
                    cmnts.push(ct[i])
                }}


            var ind = []
            for ( var j = names.length - 1 ; j > names.length - 6 ; j--){
                if (j<0){break}
                ind.push(j)
            }

            var coms = ind.map( (indx) =>
                <div>
                    <br/>
                    <b>{names[indx]}</b> has rated this product {ratings[indx]}/5.
                    <br/>
                    <i>{cmnts[indx]}</i>
                    <br/>
                    <hr/>
                </div>
            )


            var rts = ratings.map(i => parseInt(i))
            if(rts[0]){
              var sum = rts.reduce((previous,current) => previous += current);
            }
            else{
              var sum=0;
            }
            // var sum = rts.reduce((previous,current) => previous += current)
            var avg = sum/ratings.length


            if (what=='avg_ratings'){
                return(
                        <h5>Our customers rated this product {avg}/5 </h5>
                );
            }
            else if (what=='coms') {
                return(
                    <div>
                        <h5>Hear What Our Customers Say</h5>
                        {coms}
                    </div>
                );
            }
            else {
                return (null)
            }

        }

    }


    render() {
        const item =  this.props.match.params.id;
        const arr  = this.state.products
        let prod = null



        for (const pr of arr) {
            if (pr["Uniq Id"]==item ) {
                prod = pr;
                break;
               }
        }



        return (
            prod==null?
            <div>

                <h3>This product is not avaiable </h3>
            </div>
            :
            <div>

                    <div>
                    <img
                    src={`${prod["Product Image Url"]}`}
                    alt={prod["Product Name"]}
                    ></img>

                    <h4>{prod["Product Name"]}</h4>
                    <h5>{prod["Product Brand"]}</h5>
                    <br />
                    <h5>{prod["wishlist"]} People are interested in this product</h5>
                    {this.commenter('avg_ratings')}
                    <br />
                    <p>{prod["Product Description"]}</p>

                    <h6> What does it contain?</h6>
                    <p>{prod["Product Contents"]}</p>

                    <b>{currency.formatCurrency(prod["Product Price"])}</b>
                    <button
                    className="btn btn-info"
                    onClick={() => this.addCart(prod["Uniq Id"])}
                    >
                    Add To Cart
                    </button>

                    <img
                    height="50"
                    className="btn btn-display"
                    onClick={() => this.addWishlist(prod["Uniq Id"])}
                    src="https://www.flaticon.com/svg/static/icons/svg/865/865904.svg"
                    ></img>
                    <br/>
                    <br/>
                    <hr/>
                    </div>


                    {this.commenter('coms')}


                    <div>
                        <form method ="get" action="" name="commentbox">

                            <label for="name">Your Name:</label> <br/>
                            <input type="text" id="name" name="name" required/> <br/>
                            <br/>

                            <label for="rating" > Rate our products:  </label>
                            <select id="rating" name="rating" required>
                                <option value="5">5</option>
                                <option value="4">4</option>
                                <option value="3">3</option>
                                <option value="2">2</option>
                                <option value="1">1</option>
                            </select> <br/>

                            <label for="comment">Leave a comment here:  </label> <br/>
                            <textarea id="comment" name="comment" row="5" col="200" required/> <br/>
                            <input type="reset" value="submit" onClick={()=> this.submit(prod["Uniq Id"])} />
                            </form>
                    </div>
            </div>
        )
    }
}
