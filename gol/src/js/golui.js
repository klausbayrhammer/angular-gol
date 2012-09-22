var golApp = angular.module('gol', []);

golApp.controller('golUiCtrl', function golUiCtrl($scope) {
	$scope.cellsAlive = 15;

	function initRows()
	{
		maxRows = 20;
		maxCols = 20;
		rows = [];
		for(i=0; i<maxRows; i++)
		{
			row = []
			for(j=0; j<maxCols; j++)
			{
				row.push({alive: false})
			}
			rows.push(row)
		}
		return rows;
	}

	$scope.rows = initRows();

	$scope.switchState = function (col)
	{
		col.alive = !col.alive;
	};
});