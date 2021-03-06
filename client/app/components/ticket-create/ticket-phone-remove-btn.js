import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
    tagName: '',
    ticketService: inject("ticket-service"),

    actions: {
        removeLastNumber() {
            var ticketService = this.get('ticketService');
            ticketService.removeLastNumber();
        }
    }
});