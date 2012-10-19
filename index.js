
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

  // Options
  this.opts = opts || {};

  // Options: paginator
  this.opts.perpage = this.opts.perpage || 5;
  this.opts.page = this.opts.page || 0;

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
  return this;
};

/**
 * Add a lot of rows
 *
 *@param {Array} data
 * @api public
 */

DataTable.prototype.load = function(data){
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
    var cssname = !isstr && c[1] ? 'sort' : '';
    var el = isstr ?
             o('<span>') :
             o('<a>', { href: '#', class: cssname })
               .click(this.onsort.bind(this, c[2] || 'numeric'));

    o('<th>').append(el.text(isstr ? c : c[0])).appendTo(this.el.find('thead tr'));
  }

  // set colspan in footer element
  this.el.find('tfoot tr td').attr('colspan', cols.length);

  return this;
};

/**
 * Bind `click` event in table header
 *
 * @param {string} type
 * @param {Object} ev jQuery object event
 * @api public
 */

DataTable.prototype.onsort = function(type, ev){
  ev.preventDefault();
  var el = o(ev.target);
  var th = el.closest('th');

  var col = th.prevAll().length;
  var dir = el.hasClass('asc') ? -1 : 1;

  this.sort(col, dir, type);
};

/**
 * Sort the tabe data
 *
 * @api public
 */

DataTable.prototype.sort = function(col, dir, type){
  var th = this.el.find('thead tr th').eq(col);
  var el = th.find('a');

  this.el.find('thead th a').removeClass('asc desc');
  el[(dir > 0 ? 'add' : 'remove') + 'Class']('asc');
  el[(dir < 0 ? 'add' : 'remove') + 'Class']('desc');

  sortBy(this.rows, col, dir, type);
  this.body();
};


/**
 * Render the table body
 *
 * @api private
 */

DataTable.prototype.body = function(){
  var ini = this.opts.page * this.opts.perpage;
  var end = Math.min(ini + this.opts.perpage, this.rows.length);

  this.el.find('tbody').empty();
  for (var j = ini, row = this.rows[ini]; j < end; j++, row = this.rows[j]) {
    for (var i = 0, tr = o('<tr>'); i < row.length; i++) {
      tr.append(o('<td>', { text: row[i] }));
    }
    this.el.find('tbody').append(tr);
  }
};

/**
 * Add paginator to table footer
 *
 * Emit `pager` event
 *
 * @param {Object} opts pager options
 * @api private
 */

DataTable.prototype.paginator = function(opts){
  opts = opts || {};
  var pager = new Pager;
  pager.el.appendTo(this.el.find('tfoot td'));

  pager
    .total(opts.total || this.rows.length)
    .perpage(opts.perpage)
    .select(opts.page)
    .render();

  // Emit `pager` event
  pager.on('show', this.onpager.bind(this));
};

/**
 * Bind pager `show` event
 *
 * @param {Number} page select page
 * @api public
 */

DataTable.prototype.onpager = function(page){
  this.opts.page = page;
  this.body();
  this.emit('pager');
};

/**
 * Render component
 *
 * @api public
 */

DataTable.prototype.render = function(){
  this.paginator(this.opts);
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

/**
 * Sort the given array by col and dir
 *
 * @param {Array} arr array to sort
 * @param {Number} col
 * @param {Number} dir
 */

function sortBy(arr, col, dir, type){
  arr.sort(function(e0, e1){
    var v0 = e0[col];
    var v1 = e1[col];

    switch(type) {
      case 'numeric':
        v0 = Number(v0);
        v1 = Number(v1);
      break;
    }
    return (v1 < v0 ? 1 : -1) * dir;
  });
}
