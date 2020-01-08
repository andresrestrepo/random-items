import React, { useState } from 'react';
import './App.css';
import Items from './components/Items';
import Swal from 'sweetalert2'


function App() {

  const defaultValues = [{
    title: "Option 1",
    active: false
  }, {
    title: "Option 2",
    active: false
  },
  {
    title: "Option 3",
    active: false
  }
  ]

  const [values, setValues] = useState(defaultValues);

  const [steps, setSteps] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isDisaled, setIsDisabled] = useState(false);
  const [newItem, setNewItem] = useState("");

  const onActivar = () => {

    if (values.length < 2) {
      Swal.fire(
        'Validation',
        'You needs to have more than 1 item',
        'warning'
      )
      return;
    }

    let index = 0;
    let i = 0;
    let max = 100;
    let min = 40;

    let number_to_finish = Math.floor(Math.random() * (max - min)) + min;

    setSteps(number_to_finish);

    setIsDisabled(true);
    let interval = setInterval(() => {
      let current_values = values;

      if (index === current_values.length) {
        index = 0;
      }
      current_values = current_values.map(item => {
        item.active = false;
        return item;
      });

      current_values[index].active = true;
      setValues(items => [...current_values]);

      setCurrentStep(i);

      if (i === number_to_finish) {
        clearInterval(interval);
        setIsDisabled(false);

        let item_selected = current_values.filter(item => item.active);
        Swal.fire(
          'Finished',
          `Option Selected: ${item_selected[0].title}`,
          'success'
        )
      }

      index += 1;
      i += 1;
    }, 150)
  }

  const onReset = () => {
    setSteps(0);
    setCurrentStep(0);
    setNewItem("");
    setValues(items => [...defaultValues]);

  }

  const onDeleteItem = (index) => {
    if (isDisaled) {
      return;
    }
    let current_values = values;
    current_values.splice(index, 1);
    setValues(items => [...current_values]);

  }

  const onAddNewItem = () => {
    if (newItem.trim() === "") {
      Swal.fire(
        'Validation',
        'Please put a value',
        'warning'
      )
    } else {
      setValues(values => [...values, {
        title: newItem.trim(),
        active: false
      }]);
      setNewItem("");

    }

  }

  let btn = <button type="button" className="btn btn-primary btn-start" onClick={onActivar}>Start</button>;
  let btnReset = <button type="button" className="btn btn-outline-primary" onClick={onReset}>Reset</button>;
  let btnAdd = <button type="button" className="btn btn-primary btn-add" onClick={onAddNewItem}>+</button>;


  if (isDisaled) {
    btn = <button type="button" className="btn btn-primary btn-start" disabled>Start</button>;
    btnReset = <button type="button" className="btn btn-outline-primary" disabled>Reset</button>;
    btnAdd = <button type="button" className="btn btn-primary btn-add" disabled>+</button>;
  }

  return (
    <div className="container">

      <div className="title">Random Items <br /><br />

        <div className="row">
          <div className="col-md-11">
            <input className="form-control form-control-lg" type="text" placeholder="Add New Item"
              value={newItem} onChange={e => setNewItem(e.target.value)}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  onAddNewItem();
                }
              }}
            /><br></br>

          </div>
          <div className="col-md-1">
            {btnAdd}
          </div>
        </div>
      </div> <br></br>
      <div className="content-header">
        {btn}
        {btnReset}
      </div>
      <br></br>
      <div className="info-box">
        Random Step: <span className="badge badge-primary">{steps}</span>
        <br></br>
        Current Step: <span className="badge badge-primary"> {currentStep}</span>
      </div>
      <div>
        <Items values={values} onDeleteItem={onDeleteItem}></Items>
      </div>
    </div>
  );
}

export default App;
