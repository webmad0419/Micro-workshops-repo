import React from "react";
import store from "./reducers"

export default class AllDoneTasks extends React.Component {
    doneTasks = []

    constructor() {
        super()

        store.subscribe(() => {
            this.doneTasks = store.getState().tasks.filter(task => task.done)
        })
    }

    render() {
        return (
            <div className="done-tasks" style={{display: this.doneTasks.length > 0 ? "block" : "none"}}>
                <h1>Done tasks</h1>
                <ul>
                {
                    this.doneTasks.map(task => <li key={task.id}>{task.value}</li>)
                }
                </ul>
            </div>
        )
    }
}