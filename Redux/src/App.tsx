import React from 'react';
import './App.scss';
import Task from './Task';
import store from "./reducers"
import AllDoneTasks from './allTasks';

class App extends React.Component {
  store: object = {}

  constructor(props: object) {
    super(props)

    store.subscribe(() => {
      this.setState(store.getState())
    })
  }

  createNewTask() {
    store.dispatch({ state: this.state, type: 'CREATE_NEW_TASK' })
  }

  setNoneAsDone() {
    store.dispatch({ state: this.state, type: 'DISABLE_ALL_TASKS' })
  }

  setAllAsDone() {
    store.dispatch({ state: this.state, type: 'ENABLE_ALL_TASKS' })
  }

  render() {
    return (
      <div className="App">
        {
          store.getState().tasks.map((task: any, idx: number) => <Task key={idx} {...task} />)
        }

        <div className="buttons">
          <button onClick={() => this.createNewTask()}>Create new</button>
          <button onClick={() => this.setNoneAsDone()}>Done all</button>
          <button onClick={() => this.setAllAsDone()}>Done none</button>
        </div>

        <AllDoneTasks></AllDoneTasks>
      </div>
    )
  }
}

export default App;
