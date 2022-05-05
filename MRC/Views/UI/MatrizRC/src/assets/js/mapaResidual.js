function getPointCategoryName(point, dimension) {
	var series = point.series,
	  isY = dimension === 'y',
	  axis = series[isY ? 'yAxis' : 'xAxis'];
	return axis.categories[point[isY ? 'y' : 'x']];
  }