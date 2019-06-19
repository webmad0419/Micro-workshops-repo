import React from 'react';
import './Task.scss';
import Moment from 'react-moment';
import TaskDataModel from './TaskDataModel';
import store from "./reducers"

interface MakeCounterProps extends TaskDataModel {
    className?: string,
    key: Number
}

class Task extends React.Component<MakeCounterProps> {
    store: any;
    theClass: string;

    state = {
        done: false
    }

    constructor(props: MakeCounterProps) {
        super(props)

        this.theClass = this.props.className || "normal";
    }

    setTaskAsDone() {
        store.dispatch({ type: 'SET_TASK_AS_DONE', id: this.props.id })
    }

    setTaskAsUndone() {
        store.dispatch({ type: 'SET_TASK_AS_UNDONE', id: this.props.id })
    }

    removeThisTask() {
        store.dispatch({ type: 'REMOVE_ONE_TASK', id: this.props.id })
    }

    render() {
        return (
            <div className={`task task--${this.theClass} task--${this.props.done}`}>
                <div className="task-data">
                    {this.props.value} (<Moment date={this.props.date} format="DD/MM/YYYY" />)
                </div>
                <div className="buttons">
                    <button onClick={() => this.removeThisTask()} disabled={this.props.done ? true : false}>Remove</button>
                    <button onClick={() => this.setTaskAsDone()} disabled={this.props.done ? true : false}>Done</button>
                    <button onClick={() => this.setTaskAsUndone()} disabled={this.props.done ? false : true}>Not done</button>
                </div>
            </div>
        )
    }
}

export default Task;
