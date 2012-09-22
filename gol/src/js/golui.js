var golApp = angular.module('gol', []);

golApp.controller('golUiCtrl', function ($scope)
{
	$scope.rows = emptyBoard();

	function emptyBoard()
	{
		maxRows = 15;
		maxCols = 15;
		rows = [];
		for (i = 0; i < maxRows; i++)
		{
			row = [];
			for (j = 0; j < maxCols; j++)
			{
				row.push({alive: false})
			}
			rows.push(row)
		}
		return rows;
	}

	$scope.switchState = function (col)
	{
		col.alive = !col.alive;
	};

	$scope.iterate = function()
	{
		newBoard = emptyBoard();
		iterateBoard(function(col, i, j)
		{
			var nrOfNeighbours = getNrOfAliveNeighbours(i, j);
			var isAlive = nextState(col.alive, nrOfNeighbours);
			newBoard[i][j] = {alive: isAlive};
		});
		$scope.rows = newBoard;
	};

	function getNrOfAliveNeighbours(cellX, cellY)
	{
		nrOfNeighbours = 0;
		iterateBoard(function(col, checkX, checkY)
		{
			distanceX = Math.abs(cellX - checkX)
			distanceY = Math.abs(cellY - checkY);
			if (Math.max(distanceX, distanceY) == 1 && $scope.rows[checkX][checkY].alive)
			{
				nrOfNeighbours++;
			}
		});
		return nrOfNeighbours;
	}

	function nextState(alive, nrOfNeighbours)
	{
		return (alive && nrOfNeighbours == 2) || nrOfNeighbours == 3;
	}

	function iterateBoard(closure)
	{
		angular.forEach($scope.rows, function(row, i)
		{
			angular.forEach(row, function(col, j)
			{
				closure(col, i, j);
			});
		});
	}
});