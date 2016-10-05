var React = require('react');
var InputValidationMixin = require('./InputValidationMixin.jsx');
var UniqueIdMixin = require('./UniqueIdMixin.jsx');
var ScenePicker = require('./ScenePicker.jsx');

var SceneSetCommand = module.exports = React.createClass({
    mixins: [UniqueIdMixin, InputValidationMixin],
    getInitialState: function() {
        return {
            clientId: this.getNextIdAndIncrement() + '',
            sceneId: this.props.command.attributes.SceneID || '',
            errors: null,
        }
    },

    getDefaultProps: function() {
        return {
            scenes: []
        }
    },

    toJson: function() {
        return {
            type: 'sceneSet',
            clientId: this.state.clientId,
            attributes: {
                SceneID: this.state.sceneId
            }
        };
    },

    setErrors: function(errors) {
        this.setState({ errors: errors });
    },

    scenePickerChanged: function(sceneId) {
        this.setState({ sceneId: sceneId });
    },
    
    render: function() {
        //TODO: Filter out the parent scene from the scenes list so it can't call itself
        return (
            <div className="cmp-SceneSetCommand">
              <h4>Scene Set</h4>
              <div className={this.addErr("form-group", "attributes_SceneID")}>
                <label className="control-label" htmlFor={this.uid("attributes_SceneID")}>Scene*</label>
                <ScenePicker
                    disabled={this.props.disabled}
                    changed={this.scenePickerChanged}
                    scenes={this.props.scenes}
                    sceneId={this.state.sceneId}
                    parentSceneId={this.props.parentSceneId}/>
                {this.errMsg("attributes_SceneID")}
              </div>
            </div>
        );
    }
});
module.exports = SceneSetCommand;