import sorter from './sorting';
import filter from './filtering';
import grouper from './grouping';

export const datawranglers = {
	sort: sorter.sortBy,
	filter: filter.filterBy,
	group: grouper.groupBy,
};
