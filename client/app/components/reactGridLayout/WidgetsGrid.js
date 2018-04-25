// React and essential imports
// import { Responsive as ResponsiveReactGridLayout, WidthProvider } from 'react-grid-layout';
import React, { Component } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';

// Widgets
import FirstWidget from './FirstWidget';
import PizzaMaker from '../mods/pizzaMaker.jsx';
import BurgerMaker from '../mods/BurgerMaker.jsx';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

/*
var layout = [
  { i: "a", x: 0, y: 0, w: 2, h: 2, minW: 2, maxW: 4 },
  { i: "b", x: 1, y: 1, w: 3, h: 3, minW: 2, maxW: 4 },
  { i: "c", x: 2, y: 2, w: 3, h: 7, minW: 2, maxW: 4 }
];
*/

export default class WidgetsGrid extends Component {
  constructor(props){
    super(props);
  }

    onResize() {
        this.forceUpdate();
    }
    /*
   componentDidUpdate() {
        if (this.state.needResizeManually) {
             this._fireResizeManually();
         }
    }

    _fireResizeManually() {
    this.timeoutResizing = setTimeout(() => {
        const evt = document.createEvent('UIEvents');
        evt.initUIEvent('resize', true, false, window, 0);
        window.dispatchEvent(evt);
    }, 301); // wait just 1 millisecond more than transition open/close dashboard notes animations
  }
  */

  /**
   * Responsible for extracting w and h when grid got resized
   * */
   /*
    onLayoutChange(layout) {
      console.log(layout);
      //get w and h number in other to resize highcharts
      this.setState({w : layout[1].w, h : layout[1].h });
  }*/

   render() {
     var layout = [
       {/*w: 2, h: 2*/}
     ]; /* define only w & h here, define others on data-grid */

     var layouts = { lg: layout };
     return (
       <ResponsiveReactGridLayout
         className="layout"
         layout={layout}
         breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
         cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
         onResize={this.onResize.bind(this)}
       >
         <div key="a" data-grid={{x: 1, y: 4, w: 2, h: 3, maxH: 3}}> <FirstWidget /> </div>
         <div key="b" data-grid={{x: 2, y: 4, w: 2, h: 1, maxH: 3}}> <FirstWidget /> </div>
         <div key="c" data-grid={{x: 3, y: 4, w: 2, h: 1, maxH: 3}}> <FirstWidget /> </div>
         <div key="d" data-grid={{x: 4, y: 4, w: 2, h: 1, maxH: 3}}> <FirstWidget /> </div>
         <div key="e" data-grid={{x: 5, y: 4, w: 2, h: 1, maxH: 3}}> <FirstWidget /> </div>
         <div key="f" data-grid={{x: 0, y: 0, w: 5, h: 3, maxH: 5}}> <BurgerMaker /> </div>
         <div key="g" data-grid={{x: 5, y: 0, w: 5, h: 3, maxH: 5}}> <PizzaMaker /> </div>
       </ResponsiveReactGridLayout>
     );
     /* onLayoutChange={this.onLayoutChange.bind(this)} */
   }
 }
