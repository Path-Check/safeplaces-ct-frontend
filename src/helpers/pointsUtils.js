const _ = require('lodash');

export const mapPoints = points => points.map(point => ({
  ...point,
  hidden: _.has(point, 'hidden') ? point.hidden : false
}))