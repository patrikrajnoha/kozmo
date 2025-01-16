import { defineStore } from "pinia";
import eventsData from "@/assets/events.json";

export const useEventStore = defineStore("eventStore", {
  state: () => ({
    events: eventsData,
  }),
  getters: {
    allEvents: (state) => state.events,
    upcomingEvents: (state) =>
      state.events.filter(
        (event) => new Date(event.date) >= new Date()
      ),
    eventsByCategory: (state) => (category) =>
      state.events.filter((event) => event.category === category),
    eventById: (state) => (id) =>
      state.events.find((event) => event.id === id),
  },
  actions: {
    addEvent(event) {
      this.events.push({
        ...event,
        id: this.events.length + 1,
      });
    },
    updateEvent(updatedEvent) {
      const index = this.events.findIndex((event) => event.id === updatedEvent.id);
      if (index !== -1) {
        this.events[index] = updatedEvent;
      }
    },
    deleteEvent(id) {
      this.events = this.events.filter((event) => event.id !== id);
    },
  },
});
