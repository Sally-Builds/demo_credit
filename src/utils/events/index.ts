export namespace Event {

    const events:any = {}

    export async function publish(eventName:string, data:any){
        console.log(`PUBSUB: Making an broadcast about ${eventName} with ${data}`);
        if (events[eventName]) {
            events[eventName].forEach(async (fn:any) => {
              fn.save(data);
            });
          }
    }

    export async function subscribe(eventName:string, fn: any){
        console.log(`PUBSUB: someone just subscribed to know about ${eventName}`);
        events[eventName] = events[eventName] || [];
        events[eventName].push(fn);
        console.log(events)
    }


}