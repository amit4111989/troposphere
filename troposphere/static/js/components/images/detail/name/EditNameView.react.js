
define(
  [
    'react',
    'backbone',
    'showdown'
  ],
  function (React, Backbone, Showdown) {

    return React.createClass({
      displayName: "EditNameView",

      propTypes: {
        image: React.PropTypes.instanceOf(Backbone.Model).isRequired,
        value: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired
      },

      render: function () {
        var image = this.props.image,
          name = this.props.value;

        return (
          <div className="image-info-segment row">
            <h4 className="t-title col-md-2">Name</h4>
            <div className="form-group col-md-10">
              <input className="form-control" value={name} onChange={this.props.onChange}/>
            </div>
          </div>
        );
      }

    });

  });
