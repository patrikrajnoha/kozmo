<template>
    <v-card class="mx-auto my-4" max-width="400">
        <v-card-title>{{ title }}</v-card-title>
        <v-card-subtitle>{{ author }} - {{ date }}</v-card-subtitle>
        <v-card-text>
            {{ content }}
        </v-card-text>
        <v-card-actions>
            <v-btn text @click="$emit('read-more', id)">Čítať viac</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: "BlogArticle",
    props: {
        id: { type: Number, required: true },
        title: { type: String, required: true },
        author: { type: String, required: true },
        date: { type: String, required: true },
        content: { type: String, required: true },
    },
};
</script>