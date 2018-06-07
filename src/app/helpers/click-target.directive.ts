import { Directive, ElementRef, Output, EventEmitter } from '@angular/core';
@Directive({
    selector: "click-target",
    outputs: [
        "clickOutside",
        "mousedownOutside",
        "mouseupOutside"
    ],
    host: {
        // Track mouse events at the global level.
        "(document: click)": "handleEvent( $event )",
        "(document: mousedown)": "handleEvent( $event )",
        "(document: mouseup)": "handleEvent( $event )"
    }
})
export class ClickTargetDiective {
    @Output() clickOutside = new EventEmitter();
    @Output() mousedownOutside = new EventEmitter();
    @Output() mouseupOutside = new EventEmitter();
    constructor(private elementRef: ElementRef) {
    }
    public handleEvent(globalEvent) {
        // We are only concerned with mouse events that were triggered
        // outside of the current host component.
        if (this.eventTriggeredInsideHost(globalEvent)) {
            return;
        }
        // Now that we know the event was initiated outside of the host,
        // we can emit the output event. By convention above, we know
        // that we can simply use the event type to reference the
        // correct output event stream.
        this[globalEvent.type + "Outside"].emit(globalEvent);
    }
    private eventTriggeredInsideHost(event) {
        var current = event.target;
        // Reach under the hood to get the actual DOM element that is
        // being used to render the component.
        var host = this.elementRef.nativeElement;
        // Here, we are going to walk up the DOM tree, checking to see
        // if we hit the "host" node. If we hit the host node at any
        // point, we know that the target must reside within the local
        // tree of the host.
        do {
            // If we hit the host node, we know that the target resides
            // within the host component.
            if (current === host) {
                return (true);
            }
            current = current.parentNode;
        } while (current);
        // If we made it this far, we never encountered the host
        // component as we walked up the DOM tree. As such, we know that
        // the target resided outside of the host component.
        return (false);
    }
}