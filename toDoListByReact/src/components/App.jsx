import React, {useState} from "react";

function App() {
  const [list, setList] = useState([]);
  const [inputState, setState] = useState("");

  function saveState(event){
    const value = event.target.value;
    setState(value);
  }

  function handleSubmit(event){
    setList(prev=>[...prev, inputState  ])
    setState("");
    event.preventDefault();
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <form onSubmit = {handleSubmit}>
      <div className="form">
        <input onChange = {saveState} type="text" value = {inputState}/>
        <button type = "submit">
          <span>Add</span>
        </button>
      </div>
      </form>
      <div>
        <ul>
          {list.map((x)=>
            <li>{x}</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
