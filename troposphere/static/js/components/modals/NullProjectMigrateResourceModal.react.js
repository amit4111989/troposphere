/** @jsx React.DOM */

define(
  [
    'react',
    'backbone',
    'components/mixins/BootstrapModalMixin.react'
  ],
  function (React, Backbone, BootstrapModalMixin) {

    // Example Usage from http://bl.ocks.org/insin/raw/8449696/
    // render: function(){
    // <div>
    //   ...custom components...
    //   <ExampleModal
    //      ref="modal"
    //      show={false}
    //      header="Example Modal"
    //      buttons={buttons}
    //      handleShow={this.handleLog.bind(this, 'Modal about to show', 'info')}
    //      handleShown={this.handleLog.bind(this, 'Modal showing', 'success')}
    //      handleHide={this.handleLog.bind(this, 'Modal about to hide', 'warning')}
    //      handleHidden={this.handleLog.bind(this, 'Modal hidden', 'danger')}
    //    >
    //      <p>I'm the content.</p>
    //      <p>That's about it, really.</p>
    //    </ExampleModal>
    // </div>
    //

    // To show the modal, call this.refs.modal.show() from the parent component:
    // handleShowModal: function() {
    //   this.refs.modal.show();
    // }

    return React.createClass({
      mixins: [BootstrapModalMixin],

      propTypes: {
        dateTimeStamp: React.PropTypes.string.isRequired,
        resources: React.PropTypes.instanceOf(Backbone.Collection).isRequired
      },

      getInitialState: function () {
        return {
          projectName: this.props.dateTimeStamp
        };
      },

      //
      // Internal Modal Callbacks
      // ------------------------
      //

      cancel: function(){
        this.hide();
      },

      confirm: function () {
        this.hide();
        this.props.onConfirm(this.state.projectName);
      },

      //
      // Custom Modal Callbacks
      // ----------------------
      //

      onProjectNameChange: function (e) {
        this.setState({projectName: e.target.value});
      },

      //
      // Render
      // ------
      //

      render: function () {
        var buttonArray = [
          {type: 'danger', text: 'Cancel', handler: this.cancel},
          {type: 'primary', text: this.props.confirmButtonMessage, handler: this.confirm}
        ];

        var buttons = buttonArray.map(function (button) {
          // Enable all buttons be default
          var isDisabled = false;

          // Disable the launch button if the user hasn't provided a name, size or identity for the volume
          var stateIsValid = this.state.projectName;
          if(button.type === "primary" && !stateIsValid ) isDisabled = true;

          return (
            <button key={button.text} type="button" className={'btn btn-' + button.type} onClick={button.handler} disabled={isDisabled}>
              {button.text}
            </button>
          );
        }.bind(this));

        var resourceNames = this.props.resources.map(function(resource){
          return (
            <li key={resource.id}>{resource.get('name')}</li>
          );
        });

        var body = "Looks like you have resources that aren't in a project. Would you like to migrate them? " +
                   "This will create a new project called '" + this.props.dateTimeStamp +
                   "' and move all of these resources into that project.";

        var content = (
          <form role='form'>

            <div className='form-group'>
              <p>{"Looks like you have some resources that aren't in a project! Would you like to migrate the following resources into a project so that you can interact with them?"}</p>
              <ul>
                {resourceNames}
              </ul>
            </div>

            <div className='form-group'>
              <label>Project Name</label>
              <p>{"If you accept, a new project will be created with the following name. Feel free to change it to something more meaningful, and you can always rename the project later."}</p>
              <input type='text' className='form-control' value={this.state.projectName} onChange={this.onProjectNameChange}/>
            </div>

          </form>
        );

        return (
          <div className="modal fade">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  {this.renderCloseButton()}
                  <strong>{this.props.header}</strong>
                </div>
                <div className="modal-body">
                  {content}
                </div>
                <div className="modal-footer">
                  {buttons}
                </div>
              </div>
            </div>
          </div>
        );
      }

    });

  });