import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import widgetCard from '../reactGridLayout/widgets/widget';
import HelloWorld from './helloWorld';

const gridStyle = {
  backgroundColor:'#C0C0C0',
  border: '1px solid black',
  margin: 'auto'
}
const ReactGridLayout = WidthProvider(RGL);
// First time grid mounted,
// dont know size, dispatch resize event
//
// this belongs inside render inside reactgridlayout {this.generateDOM()}

export default class BasicLayout extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    items: 6, //amount of component/grid item
    rowHeight: 30,
    onLayoutChange: function() {},
    cols: 12
  };

  constructor(props) {
    super(props);

    const layout = this.generateLayout();
    this.state = { layout };
  }

  componentDidMount(){

  }

// key correlates to each tile key
  generateDOM() {
    return _.map(_.range(this.props.items), function(i) {
      return (
        <div key={i}>
          <span className="text">{i}</span>
        </div>
      );
    });
  }

  generateLayout() {
    const p = this.props;
    return _.map(new Array(p.items), function(item, i) {
      const y = _.result(p, "y") || Math.ceil(Math.random() * 4) + 1;
      return {
        x: (i * 2) % 12,
        y: Math.floor(i / 6) * y,
        w: 2,
        h: y,
        i: i.toString()
      };
    });
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
  }

  // widgetCard - Does not work. Widgets need to be injected into grid w/ redux
  render() {
    return (
        <div>
        <ReactGridLayout
          style={gridStyle}
          layout={this.state.layout}
          breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
          onLayoutChange={this.onLayoutChange}
          {...this.props}
        >
          <widgetCard />
          {this.generateDOM()}
        </ReactGridLayout>
      </div>
    );
  }
}
