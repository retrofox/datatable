
/**
 * Component dependencies
 */

var inherit = require('inherit')
  , o = require('jquery')
  , Emitter = require('emitter')
  , request = require('superagent')
  , type = require('type')
  , pager = require('pager');

/**
 * Expose `DataTable`
 */

module.exports = DataTable;

function DataTable(){
  if (!(this instanceof DataTable)) return new DataTable;

  // Render template
  this.el = o(require('./template'));

  return this;
}

/**
 * Inherits from `Emitter.prototype`.
 */

DataTable.prototype.__proto__ = Emitter.prototype;

/**
 * Add new row to DataTable
 *
 * @param {Array} row
 * @api public
 */

DataTable.prototype.add = function(row){
  if (!row.length) return this;

  for (var i = 0, tr = o('<tr>'); i < row.length; i++) {
    tr.append(o('<td>', { text: row[i] }));
  }
  this.el.find('tbody').append(tr);
  return this;
};

/**
 * Add a lot of rows
 *
 *@param {Array} data
 * @api public
 */

DataTable.prototype.addData = function(data){
  if (!data.length) return this;
  for (var i = 0; i < data.length; i++) {
    this.add(data[i]);
  }
  return this;
};


/**
 * Set table header
 *
 * @param {Array} rows
 * @api public
 */

DataTable.prototype.header = function(cols){
  if (!cols.length) return this;

  for (var i = 0, c = cols[0]; i < cols.length; i++, c = cols[i]) {
    var isstr = 'string' == type(c);
    var text = isstr ? c : c[0];
    var classname = !isstr && c[1] ? 'sort' + (c[2] == -1 ? ' desc' : ' asc') : '';

    var th = o('<th>', {
      text: text,
      class: classname
    }).appendTo(this.el.find('thead tr'));
  }

  return this;
};

/**
 * Render component
 *
 * @api public
 */

DataTable.prototype.render = function(){
  return this.el;
};

/**
 * Replace markup into the given element
 *
 * @param {String|jQuery} el reference element to inject the markup
 * @api public
 */

DataTable.prototype.replace = function(el){
  o(el).append(this.render());
};
