const aBarStyle = {
  border:"0px solid transparent",
  borderRadius:"15px"
} //app bar in app.js

const dashStyle = {
  boxSizing: 'border-box',
  border: '5px solid transparent',
  borderRadius: '15px',
  maxHeight: '100%',
  minHeight: '100%',
  padding: '5px',
  textAlign: 'center',
  backgroundColor: '#C2D0DE',
  margin: '0px',
  width: '100%',
  overflow: 'hidden',
}

const outerBox = {
  boxSizing: 'border-box',
  margin: 'auto',
  width: '100%',
  height: 'auto',
  padding: '0vw',
  overflow: 'auto',
  maxHeight: '100%',
} //widget outerbox

const oldOuterBox ={
  boxSizing: 'border-box',
  margin: 'auto',
  width: '75%',
  height: 'auto',
  padding: '20px',
  overflow: 'auto',
  maxHeight: '100%',
}//for nondashboard "widgets"

const cardStyle = {
  position: 'absolute',
  boxSizing: 'border-box',
  border: '1px solid white',
  borderRadius: '1vw',
  height: 'auto',
  maxHeight: '100%',
  backgroundColor: 'white',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'inherit',
  paddingBottom: '50px'
} //widget cardStyle

const oldCardStyle = {
  boxSizing: 'border-box',
  border: '5px solid transparent',
  borderRadius: '15px',
  height: 'auto',
  maxHeight: '100%',
  padding: '20px',
  textAlign: 'center',
  backgroundColor: '#C2D0DE',
  margin: '10px 0px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
}//for nondashboard "widgets"

const cardContents = {
  position: 'relative',
  textAlign: 'center',
  verticalAlign: 'top',
  /* outerBox > cardStyle > cardContents */
}

const flexColumn = {
  display: 'flex',
  flexDirection: 'row',
}

const column = {
  textAlign: 'center',
  margin: 'auto',
}

const outerBusiness = {
  boxSizing: 'border-box',
  border: '5px solid transparent',
  borderRadius: '15px',
  margin: '0px',
  padding: '0px',
  width: '100%',
  height: '100%',
  height: '100vh',
  maxHeight: '100%',
  minHeight: '100%',
  display: 'flex',
  flexDirection: 'row',
}

const pane = {
  boxSizing: 'border-box',
  border: '5px solid transparent',
  borderRadius: '15px',
  height: 'auto',
  padding: '0px',
  margin: '0px',
  textAlign: 'center',
  width: '50%',
  minWidth: '50%',
  maxWidth: '50%',
  overflow: 'auto',
}

const wideButton ={
  margin: 'auto',
  width: '75%',
}

const appBarStyle = {
  border: '0px solid transparent',
  borderRadius: '15px',
}

const dashReceipt = {
  boxSizing: 'border-box',
  border: '5px solid transparent',
  borderRadius: '15px',
  height: 'auto',
  padding: '5px',
  margin: '0px',
  textAlign: 'center',
  width: '25%',
  minWidth: '25%',
  maxWidth: '25%',
  overflow: 'auto',
} // for receipt section on the Dashboard

const receiptStyle = {
  boxSizing: 'border-box',
  border: '5px solid transparent',
  borderRadius: '15px',
  maxHeight: '100%',
  minHeight: '100%',
  padding: '5px',
  textAlign: 'center',
  backgroundColor: 'white',
  margin: '0px',
  width: '100%',
  overflow: 'auto',
}

const receiptHeader = {
  boxSizing: 'border-box',
  padding: '0px',
  margin: '0px',
  overflow: 'auto',
  height: '20%',

}
const receiptBody = {
  boxSizing: 'border-box',
  padding: '0px',
  margin: '0px',
  overflow: 'auto',
  height: '60%',
}
const receiptFooter = {
  boxSizing: 'border-box',
  padding: '0px',
  margin: '0px',
  overflow: 'auto',
  height: '20%',
}

const buttonStyle = {
  margin: '0px',
  width: '7vw',
  borderRadius: '15px',
}

export {
  aBarStyle,
  dashStyle,
  outerBox,
  oldOuterBox,
  cardStyle,
  oldCardStyle,
  cardContents,
  dashReceipt,
  flexColumn,
  column,
  outerBusiness,
  pane,
  wideButton,
  appBarStyle,
  receiptStyle,
  receiptHeader,
  receiptBody,
  receiptFooter,
  buttonStyle,
}
