import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['portlet', 'light', 'bordered'],
    ticketService: Ember.inject.service("ticket-service"),
    ticket: Ember.computed.readOnly("ticketService.ticket"),

    didInsertElement() {
        const ticketService = this.get("ticketService");
        ticketService.createTicketRecord();
    },

    actions: {
        saveTicketRecord() {
            const ticketService = this.get("ticketService");
            ticketService.saveTicketRecord();
        }
    }
});
