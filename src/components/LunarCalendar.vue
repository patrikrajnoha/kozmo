<template>
  <div>
    <div class="calendar-container">
      <Calendar
        v-model="selectedDate"
        is-expanded
        :attributes="calendarAttributes"
        color="primary"
        class="calendar-widget"
      />
    </div>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card class="event-dialog">
        <v-card-title class="dialog-title">Detail fázy alebo udalosti</v-card-title>
        <v-card-text class="dialog-text">
          <p v-if="selectedPhase">{{ selectedPhase.description }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="dialog = false">Zatvoriť</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { Calendar } from 'v-calendar';
import moonPhasesData from '@/assets/calendar_data.json';

export default {
  components: {
    Calendar,
  },
  data() {
    return {
      selectedDate: null,
      dialog: false,
      selectedPhase: null,
      moonPhases: [],
      astronomicalEvents: [],
    };
  },
  computed: {
    calendarAttributes() {
      const moonPhaseAttributes = this.moonPhases.flatMap((phase) =>
        phase.dates.map((date) => ({
          key: `${phase.phase}-${date}`,
          dates: date,
          customData: {
            emoji: phase.emoji,
            description: `${phase.phase} (${date})`,
          },
          dot: { color: 'blue' },
          popover: { label: `${phase.emoji} - ${phase.phase}` },
        }))
      );

      const eventAttributes = this.astronomicalEvents.map((event) => ({
        key: `${event.event}-${event.dates}`,
        dates: event.dates,
        customData: {
          description: event.description,
        },
        dot: { color: 'red' },
        popover: { label: `${event.emoji} - ${event.event}` },
      }));

      return [...moonPhaseAttributes, ...eventAttributes];
    },
  },
  methods: {
    onDateClick(date) {
      const phase = this.moonPhases.find((phase) =>
        phase.dates.includes(date)
      );

      const event = this.astronomicalEvents.find((event) =>
        event.dates.includes(date)
      );

      if (phase) {
        this.selectedPhase = {
          emoji: phase.emoji,
          description: `${phase.phase} (${date})`,
        };
      } else if (event) {
        this.selectedPhase = {
          emoji: event.emoji,
          description: `${event.event} (${date}): ${event.description}`,
        };
      }

      if (this.selectedPhase) {
        this.dialog = true;
      }
    },
  },
  mounted() {
    this.moonPhases = moonPhasesData.moonPhases;
    this.astronomicalEvents = moonPhasesData.astronomicalEvents || [];
  },
};
</script>

<style>
/* Globálne štýly */
.calendar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
}

.calendar-widget {
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background: white;
  padding: 15px;
}

.event-dialog {
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  background: #f8f9fa;
  color: #212529;
}

.dialog-title {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  background-color: #343a40;
  color: white;
  padding: 15px;
  border-bottom: 1px solid #ced4da;
}

.dialog-text {
  padding: 20px;
  font-size: 1rem;
  color: #495057;
}

.dialog-text p {
  margin: 10px 0;
}

.v-btn {
  font-size: 1rem;
  text-transform: none;
}

/* Prechod na malé obrazovky */
@media (max-width: 576px) {
  .calendar-widget {
    padding: 10px;
  }

  .event-dialog {
    border-radius: 15px;
  }

  .dialog-title {
    font-size: 1.25rem;
  }

  .dialog-text {
    font-size: 0.9rem;
  }
}

</style>