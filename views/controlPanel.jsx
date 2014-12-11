var React = require('react');

var ControlPanel = React.createClass({
    propTypes: {
        topMargin: React.PropTypes.number.isRequired,
        leftMargin: React.PropTypes.number.isRequired
    },

    componentDidMount: function () {
    },
    getInitialState: function () {
        return {
            isFullPanel: 'shortList',
            MVAContent: false
        }
    },
    handleClick: function () {
        this.setState({
            isFullPanel: (this.state.isFullPanel == 'shortList' ? 'fullList' : 'shortList') 
        });
    },
    render: function(){
        var maxHeight = this.props.windowHeight - this.props.topMargin;
        var cpWrapperStyle = {
            top: this.props.topMargin + 'px',
            left: this.props.leftMargin + 'px',
            maxHeight: maxHeight + 'px'
        };
        var cpMainWrStyle = {
            maxHeight: maxHeight + 'px'
        };
        var MainViewAreaStyle = {
            top: this.props.topMargin + 'px',
            left: (this.state.isFullPanel == 'shortList' ? (parseInt(this.props.leftMargin) + 34) + 'px' : (parseInt(this.props.leftMargin) + 134) + 'px') ,
            maxHeight: maxHeight + 'px'
        };
        return (
            <div>
                <div className="ControlPanelWrapper" style={cpWrapperStyle}>
                    <div className={"cpMainWr " +  this.state.isFullPanel} style={cpMainWrStyle}>
                        <div className={"cpToolIcon cpIconMenu " + this.state.isFullPanel} title={this.state.isFullPanel == "shortList" ? "Раскрыть описание" : "Скрыть описание"} onClick={this.handleClick}>
                            <i>Меню</i>
                        </div>
                        <ul className={ "cpToolsList " + this.state.isFullPanel }>
                            <li className="cpToolIcon cpIconUser" title="Пользователь">
                                <i>Пользователь</i>
                            </li>
                            <li className="cpToolIcon cpIconSearch" title="Поиск">
                                <i>Поиск</i>
                            </li>
                            <li className="cpToolIcon cpIconSearch" title="Поиск">
                                <i>Поиск</i>
                            </li>
                            <li className="cpToolIcon cpIconSearch" title="Поиск">
                                <i>Поиск</i>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={"MainViewAreaWrapper " + this.state.isFullPanel} style={MainViewAreaStyle}>
                    -- some content here --
                    <br/>
                    {this.props.windowWidth} X {this.props.windowHeight}
                    <br/>
                    <br/>
                    <br/>
                    -- END some content here --
                </div>
            </div>
        );
    }
});

module.exports = ControlPanel;