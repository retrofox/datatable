
/**
 * Component dependencies
 */

var inherit = require('inherit')
  , o = require('jquery')
  , Emitter = require('emitter')
  , request = require('superagent')
  , type = require('type')
  , Pager = require('pager');

/**
 * Expose `DataTable`
 */

module.exports = DataTable;

/**
 * Expose `DataTable`
 *
 * @api public
 */

function DataTable(opts){
  if (!(this instanceof DataTable)) return new DataTable(opts);
  this.opts = opts || {};

  // get markup template
  this.el = o(require('./template'));

  this.rows = [];

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
  this.rows.push(row);
};

/**
 * Render the table body
 *
 * @api private
 */

DataTable.prototype.body = function(){
  var buffer = [];
  buffer = this.rows;

  for (var j = 0, row = buffer[0]; j < buffer.length; j++, row = buffer[j]) {
    for (var i = 0, tr = o('<tr>'); i < row.length; i++) {
      tr.append(o('<td>', { text: row[i] }));
    }
    this.el.find('tbody').append(tr);
  }
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

  this.el.find('tfoot tr td').attr('colspan', cols.length);

  return this;
};

/**
 * Add paginator to table footer
 *
 * Emit `pager` event
 *
 * @param {Object} opts pager options
 *  - perpage {Number}: rows per page
 *  - page {Number}: current page
 *  - total {Number}
 * @api private
 */

DataTable.prototype.paginator = function(opts){
  opts = opts || {};
  var pager = new Pager;
  pager.el.appendTo(this.el.find('tfoot td'));

  pager
    .total(opts.total || this.total)
    .perpage(opts.perpage || 5)
    .select(opts.page || 0)
    .render();

  // Emit `pager` event
  pager.on('show', this.emit.bind(this, 'pager'));
};

/**
 * Render component
 *
 * @api public
 */

DataTable.prototype.render = function(){
  this.paginator();
  this.body();
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
