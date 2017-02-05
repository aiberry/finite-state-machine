class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.config = config;
        this.currentState = config.initial;
        this.suportedStates = Object.getOwnPropertyNames(config.states);
        this.stateHistory = [];
        this.redoStates = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.currentState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if(this.suportedStates.indexOf(state) !== -1){
            this.stateHistory.push(this.currentState);
            this.currentState = state;
            this.redoStates = [];
        } else {
            toInt('state is not exist');
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if(this.config.states[this.currentState].transitions[event]){
            this.changeState(this.config.states[this.currentState].transitions[event]);
            this.redoStates = [];
        } else {
            toInt('event is not exist');
        }

    }


    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.changeState(this.config.initial);
        this.redoStates = [];
        this.stateHistory = [];
    }


    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if(!event){
            return this.suportedStates;
        }
        return this.suportedStates.filter(x=>
            Object.getOwnPropertyNames(this.config.states[x].transitions).find(s=> s === event));
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(this.stateHistory.length){
            this.redoStates.push(this.currentState);
            this.currentState = this.stateHistory[this.stateHistory.length-1];
            this.stateHistory.splice(this.stateHistory.length-1, 1);
            return true;
        }
        return false;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(this.redoStates.length){
            this.stateHistory.push( this.currentState);
            this.currentState = this.redoStates[this.redoStates.length-1];
            this.redoStates.splice(this.redoStates.length-1, 1);
            return true;
        } else {
            return false;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.stateHistory = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
