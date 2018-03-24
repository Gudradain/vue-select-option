/*
 * @author Gudradain
 * Repo: 
 */
Vue.component('select-option', {
    template: ' \
        <select v-model="innerValue"> \
            <option v-if="first" :key="getValue(first) || \'first\'" :value="getValue(first)">{{getText(first)}}</option> \
            <template v-for="group in optionGroups"> \
                <optgroup v-if="group.key" :label="group.key"> \
                    <option v-for="item in group.values" :key="getValue(item)" :value="getValue(item)">{{getText(item)}}</option> \
                </optgroup> \
                <option v-else v-for="item in group.values" :key="getValue(item)" :value="getValue(item)">{{getText(item)}}</option> \
            </template> \
        </select> \
    ',
    props: ['value', 'options', 'first', 'config'],
    computed: {
        /*
        Using a computed property with getter/setter because of a bug in vue when you try to change the value and options
        at the same time.
        See: https://stackoverflow.com/q/49431312/3043529
        */
        innerValue: {
            get: function() { return this.value; },
            set: function(newValue) { this.update(newValue); }
        },
        optionGroups: function () {
            var app = this;

            var groupBy = function(array, selector) {
                var result = [];
                var keys = [];

                var reducer = function(result, item) {
                    var key = selector(item) || '';
                    if(keys.indexOf(key) === -1) {
                        keys.push(key);
                    }
                    (result[key] = result[key] || []).push(item);
                    return result;
                }

                var groups = array.reduce(reducer, {});

                for(var i = 0; i < keys.length; i++){
                    var key = keys[i];
                    result.push({key: key, values: groups[key]})
                }

                return result;
            }

            return groupBy(this.options, function(x) { return app.getGroup(x); });
        }
    },
    methods: {
        update: function(value) {
            this.$emit('input', value);
        },
        selectFirst: function () {
            var app = this;
            var exist = this.options.some(function(x) { return app.getValue(x) === app.value; });
            if(!exist && this.options.length > 0) {
                if(this.first){
                    this.update(this.getValue(this.first));
                }else {
                    this.update(this.getValue(this.options[0]));
                }
            }
        },
        getValue: function(item) {
            return this.isString(item)
                ? item
                : (item.hasOwnProperty('Value') ? item.Value : item.value);
        },
        getText: function(item) {
            if(this.isString(item)){
                return item;
            } else if(item.hasOwnProperty('Text')) {
                return item.Text;
            } else if (item.hasOwnProperty('text')) {
                return item.text;
            } else {
                return this.getValue(item);
            }
        },
        getGroup: function(item) {
            return item.hasOwnProperty('Group') ? item.Group : item.group;
        },
        isString: function(item) {
            return typeof item === 'string' || item instanceof String;
        }
    },
    mounted: function () {
        this.selectFirst();
    },
    watch: {
        options: {
            deep: true,
            handler: function(newValue, oldValue) {
                this.selectFirst();
            }
        },
        first: {
            deep: true,
            handler: function (newValue, oldValue){
                this.selectFirst();
            }
        }
    }
});