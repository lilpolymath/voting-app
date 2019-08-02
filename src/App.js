import React, { Component } from "react";
import "./App.css";
import "semantic-ui/dist/semantic.min.css";
import products from "./seed";
class Product extends Component {
  constructor(props) {
    super(props);
    this.handleUpVote = this.handleUpVote.bind(this);
  }
  handleUpVote = () => {
    this.props.onVote(this.props.id);
  };
  render() {
    return (
      <div className="item">
        <div className="image">
          <img alt="aqua" src={this.props.productImageUrl} />
        </div>
        <div className="middle aligned content">
          <div className="header">
            <a onClick={this.handleUpVote}>
              <i className="large caret up icon" />
              {this.props.votes}
            </a>
          </div>
          <div className="description">
            <a href={this.props.id}>{this.props.title}</a>
            <p>{this.props.description}</p>
          </div>
          <div className="extra">
            <span>Submitted by:</span>
            <img
              className="ui avatar image"
              src={this.props.submitterAvatarUrl}
            />
          </div>
        </div>
      </div>
    );
  }
}

class ProductList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    };

    this.handleProductUpVote = this.handleProductUpVote.bind(this);
  }

  componentDidMount() {
    this.setState({ products: products });
  }

  handleProductUpVote = productId => {
    const nextProducts = this.state.products.map(product => {
      if (product.id === productId) {
        return Object.assign({}, product, {
          votes: product.votes + 1,
        });
      } else {
        return product;
      }
    });
    this.setState({
      products: nextProducts,
    });
  };

  render() {
    const data = this.state.products.sort((a, b) => b.votes - a.votes);
    const productComponent = data.map(product => (
      <Product
        key={"product-" + product.id}
        id={product.id}
        title={product.title}
        description={product.description}
        url={product.url}
        votes={product.votes}
        submitterAvatarUrl={product.submitterAvatarUrl}
        productImageUrl={product.productImageUrl}
        onVote={this.handleProductUpVote}
      />
    ));
    return <div className="ui unstackable items">{productComponent}</div>;
  }
}

export default ProductList;
