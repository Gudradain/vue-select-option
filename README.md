# vue-select-option
A simple select with options and optgroups for vuejs

## Example

```html
<div id="app">
    <select-option v-model="value" :options="options"></select-option>
</div>

<script>
    new Vue({
        el: '#app',
        data: {
            value: '',
            options: [
                {value: '1-1', text: 'Item 1-1', group: '1'},
                {value: '1-2', text: 'Item 1-2', group: '1'},
                {value: '2-1', text: 'Item 2-1', group: '2'},
                {value: '2-2', text: 'Item 2-2', group: '2'},
            ]
        }
    });
</script>
```

The resulting html will be

```html
<div id="app">
    <select>
        <optgroup label="1">
            <option value="1-1">Item 1-1</option>
            <option value="1-2">Item 1-2</option>
        </optgroup>
        <optgroup label="2">
            <option value="2-1">Item 2-1</option>
            <option value="2-2">Item 2-2</option>
        </optgroup>
    </select>
</div>
```

## Motivation & Inspiration

- Have a simple way to support <optgroup> in vuejs
- Fix a "bug" in vuejs : the first value of a select is not automatically selected if the model doesn't match. The Vuejs documentation talk about it as "unselected" state https://vuejs.org/v2/guide/forms.html#Select
- Easily reused my selectList from C#. The options structure is inspired by the class SelectListItem in C#. https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.mvc.rendering.selectlistitem?view=aspnetcore-2.0

## Properties

### v-model

Value binding and update

### options

The options for the select. It supports a list of strings or a                    list of objects. The objects support the following properties.

| Property      | Information |
| ------------- | ----------- |
| text<br />Text | (string) The text of the option |
| value<br />Value | (string) The value of the option |
| group<br />Group | (string) The optgroup label of the option |
| disabled<br />Disabled | (boolean) Indicate if the option is disabled or not |

```javascript
var options = ['one', 'two', 'three'];
var options = [
    {value: 'one', text: 'one', group: 'one'},
    {value: 'two', text: 'two', group: 'one', disabled: true},
    {value: 'tow', text: 'one', group: 'two'}
]
```

Note: The first letters of all the properties on the objects in the option list are case insensitive. I made it that way because javascript convention is to used lowercase letters but when I received a option list from my C# server it was starting with a capital letter.

### first

The first option in the select. It only accepts an option object as described in the above section.

```html
<select-option v-model="country"
               :options="countryOptions"
               :first="{value: '', text: 'Please select a country'}">
```

### config

Used to configure the component.

Not implemented yet.

## Use at your own risk

I haven't tested this library extensively and I'm unaware if there is bugs or if it works on all devices.

Feel free to submit pull request or fork the project if you want to improve it.