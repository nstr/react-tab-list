# react-tab-list


## Installation

```
npm i react-tab-list
```

## Simple usage: 


```jsx
import TabList form "react-tab-list";

const items = [
   {
     name: "First"
   },
   {
     name: "Second"
   },
   {
     name: "Third"
   }
];

class SomeComponent extends React.Component{
  constructor(props) {
    super(props);
  {
  callBackFunction(tab) {
    // There will be the active tab data
  }
  render() {
    return <TabList tabs={items} onTab={this.callBackFunction}/>;
  }
}
```
