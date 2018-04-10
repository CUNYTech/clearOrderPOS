import React, {Component} from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import Transition from 'react-transition-group/Transition';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

function Card ({children, onRemove}) {
  return (
    <div className="card">
      <div className= "itemButton">
        <RaisedButton>
          {children}
          <button onClick={onRemove}>Remove</button>
        </RaisedButton>  
      </div>
    </div>
  );
};

function Board ({children}) {
  return (
    <ul className="board">
      {children}
    </ul>
  );
}


// <FadeAndSlideTransition /> is a component that wraps children in 
// a <Transition /> component. 
// 'children' is the element to be animated.
// 'duration' is the duration of the animation in milliseconds.
// The `in` prop will be provided by <TransitionGroup />.
function FadeAndSlideTransition ({children, duration, in: inProp}) {
  // Styles to set on children which are necessary in order
  // for the animation to work.
  const defaultStyle = {
    // Transition "opacity" and "transform" CSS properties.
    // Set duration of the transition to the duration of the animation.
    transition: `${duration}ms ease-in`,
    transitionProperty: 'opacity, transform'
  }

  // Styles that will be applied to children as the status
  // of the transition changes. Each key of the
  // 'transitionStyles' object matches the name of a 
  // 'status' provided by <Transition />. 
  const transitionStyles = {
    // Start with component invisible and shifted up by 10%
    entering: {
      opacity: 0,
      transform: 'translateY(-10%)'
    },
    // Transition to component being visible and having its position reset. 
    entered: {
      opacity: 1,
      transform: 'translateY(0)'
    },
    // Fade element out and slide it back up on exit.
    exiting: {
      opacity: 0,
      transform: 'translateY(-10%)'
    }
  }

  // Wrap child node in <Transition />.
  return (
    <Transition in={inProp} timeout={{
      // Set 'enter' timeout to '0' so that enter animation
      // will start immediately.
      enter: 0,

      // Set 'exit' timeout to 'duration' so that the 'exited'
      // status won't be applied until animation completes.
      exit: duration
    }}>
      {
        // Children is a function that receives the current
        // status of the animation.
        (status) => {
          // Don't render anything if component has 'exited'.
          if (status === 'exited') {
            return null
          }

          // Apply different styles to children based
          // on the current value of 'status'. 
          const currentStyles = transitionStyles[status]
          return React.cloneElement(children, {
            style: Object.assign({}, defaultStyle, currentStyles)
          })
        }
      }
    </Transition>
  )
}


export default class Extra extends Component {
    constructor (props) {
    super(props)

    this.state = {
      cards: []
    }

    this.addCard = this.addCard.bind(this)
    this.removeCard = this.removeCard.bind(this)
    this.removeLastCard = this.removeLastCard.bind(this)
  }

  render () {
    const {cards} = this.state

    return (
      <main className="container">
        <h1>React Transition: Add items Demo</h1>
        <div className="addItem">
          <TextField
            ref = "itemName"
            floatingLabelText="Item Name"
            
          /><br />
          <TextField
            floatingLabelText="Item Price"
            
          /><br />
        </div>


        <button onClick={this.addCard}>Add a card</button>
        <button onClick={this.removeLastCard}>Remove a card</button>
        
<TransitionGroup component={Board}>
  {
    cards.map(card => {
      return (
        <FadeAndSlideTransition duration={150} key={card.id}>
          <li className="board__item">
            <Card onRemove={() => {
              this.removeCard(card.id)
            }}>{card.content}</Card>
          </li>
        </FadeAndSlideTransition>
      )
    })
  }
</TransitionGroup>

      </main>
    )
  }

  addCard () {
    const {cards} = this.state
    const id = cards.length + 1
    const newCard = {
      id,
      content: `Card ${id}`
    }
    this.setState({
      cards: cards.concat([newCard])
    })
  }

  removeCard (id) {
    const {cards} = this.state
    this.setState({
      cards: cards.filter(card => card.id !== id)
    })
  }

  removeLastCard () {
    const {cards} = this.state
    this.setState({
      cards: cards.slice(0, -1)
    })
  }
} 
