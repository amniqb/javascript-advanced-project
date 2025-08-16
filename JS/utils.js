import _ from 'lodash';

export function debounce(fn, delay = 300) {
  return _.debounce(fn, delay);
}
