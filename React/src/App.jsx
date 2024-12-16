import './App.css'

function Person({ name = "Guest" }) {
  return (
    <h1>Hello {name}</h1>
  )
}

function App() {
  // This function will be triggered when the button is clicked
  const handleClick = () => {
    alert("Button clicked!");
  }

  return (
    <>
      <Person name="shira" />
      <Person name="Persky" />
      <Person />
      
      {/* Button added here */}
      <button onClick={handleClick}>Click Me</button>
    </>
  )
}

export default App
