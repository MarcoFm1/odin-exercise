import './App.css'

function List(props) {
  if (!props.animals) {
    return <div>Loading...</div>;
  }

  if (props.animals.length === 0) {
    return <div>There are no animals in the list!</div>;
  }

  return (
    <ul>
      {props.animals.map((animal) => {
        return <li key={animal}>{animal}</li>;
      })}
    </ul>
  );
}

function Button({text = "Click me",color = "white",fontSize = 18}){
  const buttonStyle = {
    color: color,
    fontSize : fontSize + "px"
  }

  return <button style={buttonStyle}>{text}</button>;
}

function App() {
  const animals = ["Dog"];

  return (
    <div>
      <h1>Animals: </h1>
      <List animals={animals} />
      <Button text="Dont click me" color="purple"/>
      <Button fontSize={12}/>
      <Button />

    </div>
  );
}
export default App
