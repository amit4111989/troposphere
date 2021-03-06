define(function (require) {

  var React = require('react/addons'),
    Backbone = require('backbone'),
    SelectableRow = require('../SelectableRow.react'),
    Name = require('../tableData/volume/Name.react'),
    Status = require('../tableData/volume/Status.react'),
    Size = require('../tableData/volume/Size.react'),
    Provider = require('../tableData/volume/Provider.react'),
    stores = require('stores'),
    CryptoJS = require('crypto-js'),
    Gravatar = require('components/common/Gravatar.react');

  return React.createClass({
    displayName: "VolumeRow",

    propTypes: {
      volume: React.PropTypes.instanceOf(Backbone.Model).isRequired,
      onResourceSelected: React.PropTypes.func.isRequired,
      onResourceDeselected: React.PropTypes.func.isRequired,
      onPreviewResource: React.PropTypes.func.isRequired,
      isPreviewed: React.PropTypes.bool,
      isChecked: React.PropTypes.bool
    },

    render: function () {
      var volume = this.props.volume,
        volumeHash = CryptoJS.MD5((volume.id || volume.cid).toString()).toString(),
        type = stores.ProfileStore.get().get('icon_set'),
        iconSize = 18;

      return (
        <SelectableRow
          isActive={this.props.isPreviewed}
          isSelected={this.props.isChecked}
          onResourceSelected={this.props.onResourceSelected}
          onResourceDeselected={this.props.onResourceDeselected}
          onPreviewResource={this.props.onPreviewResource}
          resource={volume}
          >
          <td className="image-preview sm-cell" data-label="Name">
            <Gravatar
              hash={volumeHash}
              size={iconSize}
              type={type}
              />
            <Name volume={volume}/>
          </td>
          <td className="sm-cell" data-label="Status">
            <Status volume={volume}/>
          </td>
          <td className="sm-cell" data-label="Size">
            <Size volume={volume}/>
          </td>
          <td className="sm-cell" data-label="Provider">
            <Provider volume={volume}/>
          </td>
        </SelectableRow>
      );
    }

  });

});
