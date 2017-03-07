import React from "react";

function getRandomInt() {
  return Math.floor(Math.random() * (1000000000000 - 1 + 1)) + 1;
}

export default class TabList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      id: `${getRandomInt()}`,
      activeTab: this.props.activeTab,
      activeTabIndex: 0,
      tabLineClass: "tab-line"
    };
    this.selectThis = this.selectThis.bind(this);
    this.defineActiveTab = this.defineActiveTab.bind(this);
  }
  componentDidMount() {
    if (this.props.activeTab) {
      this.defineActiveTab(this.props.activeTab);
    }
    else {
      let elemnt = document.getElementById(`label-${this.state.id}-tab-item-0`);
      document.getElementById(`${this.state.id}-tab-line`).style.width = `${elemnt.offsetWidth}px`;
      setTimeout(() => {
        document.getElementById(`${this.state.id}-tab-line`).style.left = `${elemnt.offsetLeft}px`;
      }, this, 10);
    }

    setTimeout(function () {
      this.setState({
        tabLineClass: "tab-line react-tab-animation"
      });
    }.bind(this), 500);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.activeTab !== this.props.activeTab) {
      this.defineActiveTab(nextProps.activeTab);
    }
  }
  defineActiveTab(activeTab) {
    if (activeTab.index) {
      let elemnt = document.getElementById(`label-${this.state.id}-tab-item-${activeTab.index}`);
      document.getElementById(`${this.state.id}-tab-line`).style.width = `${elemnt.offsetWidth}px`;
      setTimeout(function () {
        document.getElementById(`${this.state.id}-tab-line`).style.left = `${elemnt.offsetLeft}px`;
      }, 0);
      this.setState({
        activeTab: activeTab,
        activeTabIndex: activeTab.index
      });
    }
    else {
      let activeTabIndex = this.props.tabs.filter((tab, index) => (tab[Object.keys(activeTab)[0]] === activeTab[Object.keys(activeTab)[0]]) ? tab["index"] = index : null);
      const index = activeTabIndex.length > 0 ? activeTabIndex[0].index : 0;
      let elemnt = document.getElementById(`label-${this.state.id}-tab-item-${index}`);
      document.getElementById(`${this.state.id}-tab-line`).style.width = `${elemnt.offsetWidth}px`;
      setTimeout(function () {
        document.getElementById(`${this.state.id}-tab-line`).style.left = `${elemnt.offsetLeft}px`;
      }, 0);
      this.setState({
        activeTab: activeTab,
        activeTabIndex: index
      });
    }
  }
  selectThis(index) {
    if (!this.props.blockup) {
      let labelId = `label-${this.state.id}-tab-item-${index}`;
      let elemnt = document.getElementById(labelId);
      document.getElementById(`${this.state.id}-tab-line`).style.width = `${elemnt.offsetWidth}px`;
      document.getElementById(`${this.state.id}-tab-line`).style.left = `${elemnt.offsetLeft}px`;
      if (this.props.onTab) this.props.onTab(this.props.tabs[index]);
      this.setState({
        activeTabIndex: index
      });
    }
  }
  render() {
    var { tabs } = this.props;
    return(
      <div className="react-tab-list">
        {
          tabs.map(function(tab, index) {
            const id = `${this.state.id}-tab-item-${index}`;
            return (
              <div key={index} className={tab.className}>
                <input id={id}
                  type="radio" onClick={() => this.selectThis(index)} name={`${this.state.id}-tab-items`}
                  checked={this.state.activeTabIndex === index} readOnly/>
                <label id={`label-${id}`}
                  htmlFor={id} className="tab">{tab.htmlBefore} {tab.name} {tab.htmlAfter}</label>
              </div>
            );
          }, this)
        }
        <span className={this.state.tabLineClass} id={`${this.state.id}-tab-line`}></span>
      </div>
    );
  }
}

TabList.PropTypes = {
  tabs: React.PropTypes.array.isRequired
};
