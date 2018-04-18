import React, { Component } from 'react';
//import { Responsive as ResponsiveReactGridLayout, WidthProvider } from 'react-grid-layout';
import { Responsive, WidthProvider } from 'react-grid-layout';
import FirstWidget from './FirstWidget';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default class WidgetsGrid extends Component {
   render() {
     var layout = [
       { i: "a", x: 0, y: 0, w: 3, h: 3, minW: 2, maxW: 4 }
     ];
     var layouts = { lg: layout };
     return (
       <ResponsiveReactGridLayout
         className="layout"
         layouts={layouts}
         breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
         cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
       >
         <div key="a">
          <FirstWidget />
         </div>
         <div key="b">
          <FirstWidget />
         </div>
         <div key="c">
          <FirstWidget />
         </div>
       </ResponsiveReactGridLayout>
     );
   }
 }
