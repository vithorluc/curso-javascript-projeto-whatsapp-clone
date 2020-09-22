export class ClassEvent {


    constructor(){

        this._events = {}

    }

    on(Eventname, fn) {

        if (!this._events[Eventname]) this._events[Eventname] = new Array()

        this._events[Eventname].push(fn)

        console.log(fn)

    }


    trigger(){

        let args = [...arguments] 
        let eventName = args.shift() 

        args.push(new Event(eventName))

        if(this._events[eventName] instanceof Array) {

            this._events[eventName].forEach(fn => {

                fn.apply(null, args)

            })

        }
    }
}