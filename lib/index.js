"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getRandomInt() {
  return Math.floor(Math.random() * (1000000000000 - 1 + 1)) + 1;
}

var TabList = function (_React$Component) {
  _inherits(TabList, _React$Component);

  function TabList(props) {
    _classCallCheck(this, TabList);

    var _this = _possibleConstructorReturn(this, (TabList.__proto__ || Object.getPrototypeOf(TabList)).call(this, props));

    _this.state = {
      id: "" + getRandomInt(),
      activeTab: _this.props.activeTab,
      activeTabIndex: 0,
      tabLineClass: "tab-line"
    };
    _this.selectThis = _this.selectThis.bind(_this);
    _this.defineActiveTab = _this.defineActiveTab.bind(_this);
    return _this;
  }

  _createClass(TabList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.activeTab) {
        this.defineActiveTab(this.props.activeTab);
      } else {
        var elemnt = document.getElementById("label-" + this.state.id + "-tab-item-0");
        document.getElementById(this.state.id + "-tab-line").style.width = elemnt.offsetWidth + "px";
        setTimeout(function () {
          document.getElementById(this.state.id + "-tab-line").style.left = elemnt.offsetLeft + "px";
        }.bind(this), 10);
      }

      setTimeout(function () {
        this.setState({
          tabLineClass: "tab-line react-tab-animation"
        });
      }.bind(this), 500);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.activeTab !== this.props.activeTab) {
        this.defineActiveTab(nextProps.activeTab);
      }
    }
  }, {
    key: "defineActiveTab",
    value: function defineActiveTab(activeTab) {
      if (activeTab.index) {
        var elemnt = document.getElementById("label-" + this.state.id + "-tab-item-" + activeTab.index);
        document.getElementById(this.state.id + "-tab-line").style.width = elemnt.offsetWidth + "px";
        setTimeout(function () {
          document.getElementById(this.state.id + "-tab-line").style.left = elemnt.offsetLeft + "px";
        }.bind(this), 0);
        this.setState({
          activeTab: activeTab,
          activeTabIndex: activeTab.index
        });
      } else {
        var activeTabIndex = this.props.tabs.filter(function (tab, index) {
          return tab[Object.keys(activeTab)[0]] === activeTab[Object.keys(activeTab)[0]] ? tab["index"] = index : null;
        });
        var index = activeTabIndex.length > 0 ? activeTabIndex[0].index : 0;
        var _elemnt = document.getElementById("label-" + this.state.id + "-tab-item-" + index);
        document.getElementById(this.state.id + "-tab-line").style.width = _elemnt.offsetWidth + "px";
        setTimeout(function () {
          document.getElementById(this.state.id + "-tab-line").style.left = _elemnt.offsetLeft + "px";
        }.bind(this), 0);
        this.setState({
          activeTab: activeTab,
          activeTabIndex: index
        });
      }
    }
  }, {
    key: "selectThis",
    value: function selectThis(index) {
      if (!this.props.blockup) {
        var labelId = "label-" + this.state.id + "-tab-item-" + index;
        var elemnt = document.getElementById(labelId);
        document.getElementById(this.state.id + "-tab-line").style.width = elemnt.offsetWidth + "px";
        document.getElementById(this.state.id + "-tab-line").style.left = elemnt.offsetLeft + "px";
        if (this.props.onTab) this.props.onTab(this.props.tabs[index]);
        this.setState({
          activeTabIndex: index
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var tabs = this.props.tabs;

      return _react2.default.createElement(
        "div",
        { className: "react-tab-list" },
        tabs.map(function (tab, index) {
          var _this2 = this;

          var id = this.state.id + "-tab-item-" + index;
          return _react2.default.createElement(
            "div",
            { key: index, className: tab.className },
            _react2.default.createElement("input", { id: id,
              type: "radio", onClick: function onClick() {
                return _this2.selectThis(index);
              }, name: this.state.id + "-tab-items",
              checked: this.state.activeTabIndex === index, readOnly: true }),
            _react2.default.createElement(
              "label",
              { id: "label-" + id,
                htmlFor: id, className: "tab" },
              tab.htmlBefore,
              " ",
              tab.name,
              " ",
              tab.htmlAfter
            )
          );
        }, this),
        _react2.default.createElement("span", { className: this.state.tabLineClass, id: this.state.id + "-tab-line" })
      );
    }
  }]);

  return TabList;
}(_react2.default.Component);

exports.default = TabList;


TabList.PropTypes = {
  tabs: _react2.default.PropTypes.array.isRequired
};
