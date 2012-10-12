
/**
 * Component dependencies
 */

var inherit = require('inherit')
  , o = require('jquery')
  , Emitter = require('emitter')
  , request = require('superagent')
  , pager = require('pager');

/**
 * Expose `DataTable`
 */

module.exports = DataTable;

function DataTable(){
  if (!(this instanceof DataTable)) return new DataTable;
}

/**
 * Inherits from `Emitter.prototype`.
 */

DataTable.prototype.__proto__ = Emitter.prototype;

/**
 * Add new row to DataTable
 *
 * @api public
 */

DataTable.prototype.add = function(row){
  
};

