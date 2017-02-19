import React from "react";

export default class TabList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
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
      let elemnt = document.getElementById(`label-tab-item-0`);
      document.getElementById("tab-line").style.width = `${elemnt.offsetWidth}px`;
      setTimeout(function () {
        document.getElementById("tab-line").style.left = `${elemnt.offsetLeft}px`;
      }, 10);
    }

    setTimeout(function () {
      this.setState({
        tabLineClass: "tab-line animation"
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
      let elemnt = document.getElementById(`label-tab-item-${activeTab.index}`);
      document.getElementById("tab-line").style.width = `${elemnt.offsetWidth}px`;
      setTimeout(function () {
        document.getElementById("tab-line").style.left = `${elemnt.offsetLeft}px`;
      }, 0);
      this.setState({
        activeTab: activeTab,
        activeTabIndex: activeTab.index
      });
    }
    else {
      let activeTabIndex = this.props.tabs.filter((tab, index) => (tab[Object.keys(activeTab)[0]] === activeTab[Object.keys(activeTab)[0]]) ? tab["index"] = index : null);
      const index = activeTabIndex.length > 0 ? activeTabIndex[0].index : 0;
      let elemnt = document.getElementById(`label-tab-item-${index}`);
      document.getElementById("tab-line").style.width = `${elemnt.offsetWidth}px`;
      setTimeout(function () {
        document.getElementById("tab-line").style.left = `${elemnt.offsetLeft}px`;
      }, 0);
      this.setState({
        activeTab: activeTab,
        activeTabIndex: index
      });
    }
  }
  selectThis(index) {
    if (!this.props.blockup) {
      let labelId = `label-tab-item-${index}`;
      let elemnt = document.getElementById(labelId);
      document.getElementById("tab-line").style.width = `${elemnt.offsetWidth}px`;
      document.getElementById("tab-line").style.left = `${elemnt.offsetLeft}px`;
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
            const id = `tab-item-${index}`;
            return (
              <div key={index} className={tab.className}>
                <input type="radio" onClick={() => this.selectThis(index)} name="tab-items" id={id} checked={this.state.activeTabIndex === index} readOnly/>
                <label className="tab" id={`label-${id}`} htmlFor={id}>{tab.htmlBefore} {tab.name} {tab.htmlAfter}</label>
              </div>
            );
          }, this)
        }
        <span className={this.state.tabLineClass} id="tab-line"></span>
      </div>
    );
  }
}
