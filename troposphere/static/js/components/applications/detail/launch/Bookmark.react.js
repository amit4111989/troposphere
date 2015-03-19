define(function (require) {

  var React = require('react'),
      actions = require('actions'),
      stores = require('stores');

  return React.createClass({

    toggleFavorite: function (e) {
      e.preventDefault();
      actions.ApplicationActions.toggleFavorited(this.props.application);
    },

    render: function () {
      var image = this.props.application,
          isFavorited = stores.ImageBookmarkStore.getImageBookmarkFor(image),
          img;

      if(isFavorited){
        img = (
          <img src="/assets/images/filled-star-icon.png"/>
        );
      }else {
        img = (
          <img src="/assets/images/empty-star-icon.png"/>
        );
      }

      return (
        <a className="bookmark" href="#" onClick={this.toggleFavorite}>
          {img}
        </a>
      );
    }

  });

});
