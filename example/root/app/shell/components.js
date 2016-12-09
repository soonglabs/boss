'use strict';
//Vue Terminal component
Vue.component('shell', {
    template: '<div class="shell"></div>',
    props: ['name', 'prompt', 'greeting'],
    mounted: function(){
        $(this.$el).terminal(this.$parent.client, {
            greetings: this.greeting,
            name: this.name,
            prompt: this.prompt,
            memory: true,
            history: false,
            completion: this.$parent.completion
        });
    }
});