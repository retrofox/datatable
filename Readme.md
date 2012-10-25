
# DataTable

  DataTable UI component

  ![js datatable
  component](http://f.cl.ly/items/02152k04070v1Y1d023m/Screen%20Shot%202012-10-25%20at%2012.24.00%20PM.png)

## Installation

```
$ npm install datatable-component
```

## Features

  - pager
  - sort

## Components UI dependencies

  - [component/pager](https://github.com/component/pager)

## Example

```js
// Include `data-table` component
var DataTable = require('data-table');

// Create an instance
var players = new DataTable()
  .header([
    ['P', true, 'numeric'],
    ['Equipo', true, 'alpha'],
    'PJ',
    'PG',
    'PE',
    'PP',
    ['Pts', true, 'numeric']
  ])
  .load([
    [1, "NEWELL`S", 10, 6, 4, 0, 22],
    [2, "RACING", 10, 6, 2, 2, 20],
    [3, "BELGRANO", 10, 5, 4, 1, 19],
    [4, "VÉLEZ SARSFIELD", 10, 5, 2, 3, 17],
    [5, "BOCA", 10, 5 , 2, 3, 17],
    [7, "ESTUDIANTES", 10, 5, 1, 4, 16],
    [8, "RIVER", 10, 4, 3, 3, 15],
    [9, "COLÓN", 10, 4, 3, 3, 15],
    [10, "LANÚS", 10, 4, 2, 4, 14],
    [11, "ARGENTINOS", 10, 3, 4, 3, 13],
    [12, "ATL. RAFAELA", 10, 3, 4, 3, 13],
    [13, "ARSENAL", 10, 3, 3, 4, 12],
    [14, "QUILMES", 10, 2, 5, 3, 11],
    [15, "ALL BOYS", 10, 2, 4, 4, 10],
    [16, "SAN MARTÍN (SJ)", 10, 3, 1, 6, 10],
    [17, "INDEPENDIENTE", 10, 2, 4, 4, 10],
    [19, "TIGRE", 10, 0, 6, 4, 6],
    [20, "UNIÓN", 10, 0, 3, 7, 3]
  ])
  .add([6, "GODOY CRUZ", 10, 5, 1, 4, 16])
  .add([18, "SAN LORENZO", 10, 2, 4, 4, 10])
  .paginate(1, 6)
  .sort(6, -1)
  .replace('#placeholder');
```

## API
  
### DataTable()

  Create a new `DataTable`:

```js
var DataTable = require('menu');
var menu = new DataTable();
var menu = DataTable();
```

### Data#header(Array)

### Data#load([Arr1, Arr2, ... Arrn])

### Data#add(Array)

### Data#paginate(page, perpage)

### Data#sort(by, dir)

## Test

  - `make` to compile build.js
  - Load with a browser test/index.html

## License

(The MIT License)
Copyright(c) 2012 Damian Suarez <rdsuarez@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

