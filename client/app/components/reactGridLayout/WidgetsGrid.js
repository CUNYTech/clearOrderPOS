// React and essential imports
// import { Responsive as ResponsiveReactGridLayout, WidthProvider } from 'react-grid-layout';
import React, { Component } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { outerBox, cardStyle, cardContents, buttonStyle } from '../../styles/cardStyle';
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider'

// Widgets
import FirstWidget from './FirstWidget';
import PizzaMaker from '../mods/pizzaMaker.jsx';
import BurgerMaker from '../mods/burgerMaker.jsx';
import {dashStyle} from '../../styles/cardStyle';

import axios from 'axios';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

/*
var layout = [
  { i: "a", x: 0, y: 0, w: 2, h: 2, minW: 2, maxW: 4 },
  { i: "b", x: 1, y: 1, w: 3, h: 3, minW: 2, maxW: 4 },
  { i: "c", x: 2, y: 2, w: 3, h: 7, minW: 2, maxW: 4 }
];
*/
const dividePad = {
  marginTop: 5,
  marginBottom: 5,
  padding: 2,
  width: 100,
  backgroundColor: 'white',
};

export default class WidgetsGrid extends Component {
  constructor(props){
    super(props);
    this.state = {
      categories : {},
    }
    this.addItem = this.addItem.bind(this);
  }

  addItem = (event) => {
    event.preventDefault();
    const item_name = event.currentTarget.value;
    const item_price = event.currentTarget.name
    axios.post('/business/add-table-item', {current_table : this.props.current_table, item_name, item_price})
      .then((response) => {
        this.props.forceUpdate();
      })
  }

  componentWillMount(){
    const categories = this.state;

    axios.get('/business/get-categories')
      .then((response) => {
        this.setState({
          categories : response.data[0].business_items,
        })
      })
      .catch((error) => {
      })
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
     const {categories} = this.state;
     return (
       <div>
       <ResponsiveReactGridLayout
         className="layout"
         layout={layout}
         style={dashStyle}
         breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
         cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
         onResize={this.onResize.bind(this)}
       >
         <div key="burger" data-grid={{x: 0, y: 0, w: 6, h: 3 }}> <BurgerMaker /> </div>
         <div key="pizza" data-grid={{x: 6, y: 0, w: 6, h: 3 }}> <PizzaMaker /> </div> 
         {/*
         <div key="b" data-grid={{x: 3, y: 8, w: 3, h: 1 }}> <FirstWidget /> </div>
         <div key="c" data-grid={{x: 6, y: 8, w: 3, h: 1 }}> <FirstWidget /> </div>
         <div key="d" data-grid={{x: 9, y: 8, w: 3, h: 1 }}> <FirstWidget /> </div>
         <div key="e" data-grid={{x: 0, y: 9, w: 3, h: 1 }}> <FirstWidget /> </div>
         <div key="f" data-grid={{x: 3, y: 9, w: 3, h: 1 }}> <FirstWidget /> </div>
         <div key="g" data-grid={{x: 6, y: 8, w: 3, h: 1 }}> <FirstWidget /> </div>
         <div key="h" data-grid={{x: 9, y: 8, w: 3, h: 1 }}> <FirstWidget /> </div>
         */}
        {categories.length > 0 ?
          Object.keys(categories).map((category, index) => {
          return(
            <div key={index} data-grid={{x: 0, y: 8, w: 2, h: 2, minW : 2, minH: 2, maxH: 2 }}>
              <div style={outerBox} >
                <Card style={cardStyle}>
                  <div className="cardContents" style={cardContents}>
                    <CardHeader title={categories[category].category} />
                    <CardText>
                    {Object.keys(categories[index].items).map((item, subIndex) => {
                        return(
                          <div key={subIndex}>
                          <RaisedButton value={categories[index].items[subIndex].name} name={categories[index].items[subIndex].price}
                            onClick={this.addItem} style={buttonStyle} primary={true} label={categories[index].items[subIndex].name + ' $' + categories[index].items[subIndex].price} />
                          <Divider style={dividePad} />
                          </div>
                        )
                    })}
                    </CardText>
                  </div>
                </Card>
              </div>
            </div>
          )
        })
      : <div key='dummy'></div>}
       </ResponsiveReactGridLayout>
       </div>
     );
     /* onLayoutChange={this.onLayoutChange.bind(this)} */
   }
 }
