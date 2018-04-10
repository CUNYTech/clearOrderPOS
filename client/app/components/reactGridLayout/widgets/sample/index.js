import { connect } from "react-redux";
import AbstractWidget from "../abstractWidget";
import HelloWorldWidget from './helloWorldWidget';

/*
  import HelloErrorWidget from "component/widget/sample/HelloErrorWidget.jsx";
  import HelloGraphWidget from "component/widget/sample/HelloGraphWidget.jsx";
*/
const mapStateToProps = (state, ownProps) => {
  return {
    ...AbstractWidget.mapCommonWidgetProps(state, ownProps)
  };
};

module.exports = {
  //widgetName: connect(mapStateToProps)(widgetName), /* to be used in a widget factory */ 
  HelloWorldWidget: connect(mapStateToProps)(HelloWorldWidget)
};
