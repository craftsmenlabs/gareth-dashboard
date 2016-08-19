'use strict';

/**
 * @ngdoc function
 * @name garethApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the garethApp
 */
 

angular.module('garethApp')
  .controller('MainCtrl', function ($scope, $http, $q) {

	var newChart = angular.module('myModule', ['chart.js']);

  
	var config = {};
    $scope.allRuns = 0;
    $scope.failureRuns = 0;
    $scope.failedExperiments = 0;
    $scope.allExperiments = 0;
	$scope.experimentData = {};

    function init() {
      if (config.backendExperimentUrl) {
        $http.get(config.backendExperimentUrl).success(function (data) {
          $scope.experiments = [];
          //an http.get needs to be done for each experiment. The responses are batched
          var promises = [];
          data.forEach(function (experiment, i) {
            promises.push($http.get(experiment._links[0].href))
          });
          $q.all(promises).then(function (responses) {
            processExperimentRunResults(data, responses);
            $scope.allExperiments = $scope.experiments.length;
			drawCombinedChart('bars');

          });
        });
      } else {
        throw new Error("Needs experiment backend URL");
      }
    }
	
	function drawCombinedChart(elementToDrawOn) {
		var successes = [];
		var failures = [];
		var sums = [];
		
		var keys = Object.keys($scope.experimentData);

		// Here we check for the number of successes and failures per day.
		for (var i=0; i<keys.length; i++) { 
			successes.push($scope.experimentData[keys[i]].succeeded);
			failures.push(-$scope.experimentData[keys[i]].failed);
			sums.push($scope.experimentData[keys[i]].succeeded - $scope.experimentData[keys[i]].failed);
		}
		
		var ctx = document.getElementById(elementToDrawOn);
		var myChart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: Object.keys($scope.experimentData),
				datasets: [{
					label: "Sum",
					type: "line",
					data: sums,
					fill: false,
                    borderColor: '#EC932F',
                    backgroundColor: '#EC932F',
                    pointBorderColor: '#EC932F',
                    pointBackgroundColor: '#EC932F',
                    pointHoverBackgroundColor: '#EC932F',
                    pointHoverBorderColor: '#EC932F',
					yAxisID: 'y-axis-1'
				},{
					label: "Successes",
					data: successes,
					backgroundColor: 'rgba(0, 255, 0, 1)',
					yAxisID: 'y-axis-1'
				},{
					label: "Failures",
					data: failures,
					backgroundColor: 'rgba(255, 0, 0, 1)',
					yAxisID: 'y-axis-1'
				}],
			},
			options: {
				 scales: {
					xAxes: [{
						display: true,
						gridLines: {
							display: false
						},
						labels: {
							show: true,
						},
						stacked: true
					}],
					yAxes: [{
						type: "linear",
						display: true,
						position: "left",
						id: "y-axis-1",
						gridLines:{
							display: false
						},
						labels: {
							show:true,
						}
					}, {
						type: "linear",
						display: false,
						position: "right",
						id: "y-axis-2",
						gridLines:{
							display: false
						},
						labels: {
							show:true,
							
						}
					}]
				}
			}
		});
	}

    //responses is an array of experiment-run arrays
    function processExperimentRunResults(experiments, responses) {
      experiments.forEach(function (experiment, i) {
        parseRunsForExperiment(experiment, responses[i].data);
		createExperimentData(experiment, responses[i].data);
      });
    }
	
	/* For a given date, get the ISO week number
	 *
	 * Based on information at:
	 *
	 *    http://www.merlyn.demon.co.uk/weekcalc.htm#WNR
	 *
	 * Algorithm is to find nearest thursday, it's year
	 * is the year of the week number. Then get weeks
	 * between that date and the first day of that year.
	 *
	 * Note that dates in one year can be weeks of previous
	 * or next year, overlap is up to 3 days.
	 *
	 * e.g. 2014/12/29 is Monday in week  1 of 2015
	 *      2012/1/1   is Sunday in week 52 of 2011
	 */
	function getWeekNumber(d) {
		// Copy date so don't modify original
		d = new Date(d);
		d.setHours(0,0,0);
		// Set to nearest Thursday: current date + 4 - current day number
		// Make Sunday's day number 7
		d.setDate(d.getDate() + 4 - (d.getDay()||7));
		// Get first day of year
		var yearStart = new Date(d.getFullYear(),0,1);
		// Calculate full weeks to nearest Thursday
		var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
		// Return array of year and week number
		return weekNo;
	}
	
	

	// Creates a map which uses week as key. 
	// succeeded = value of experiment * number of runs successful
	// failed = value of experiment * number of runs failed
	// sum = succeeded - failed
	function createExperimentData(experiment, experimentRuns) {
		var value = experiment.value;

		experimentRuns.forEach(function (er) {
			// What is the date of this run?
			var date = er.success_execution ? er.success_execution : er.failure_execution;
			var week = "week " + getWeekNumber(date);
			var success = er.success_execution ? true : false;
			//console.log('date: ' + date + experiment.experiment_name);
			
			// Check if week is already in the map.
			if (week in $scope.experimentData) {
				if (success) {
					$scope.experimentData[week].succeeded += value;
					$scope.experimentData[week].sum += value;
				}
				else {
					$scope.experimentData[week].failed += value;
					$scope.experimentData[week].sum -= value;
				}				
			} else {
				$scope.experimentData[week] = { succeeded: success ? value : 0, failed: success ? 0 : value, sum : success ? value : -value };
			}

		});
		
		console.log($scope.experimentData);
		//console.log(Object.keys($scope.experimentData));

	}
	
    function parseRunsForExperiment(experiment, experimentRuns) {
      if (experimentRuns.length > 0) {
        var experimentCopy = angular.copy(experiment);
        var lastRun = experimentRuns[experimentRuns.length - 1];
        $scope.failedExperiments += (lastRun.failure_execution ? 1 : 0);
        $scope.experiments.push(angular.merge(experimentCopy, lastRun));
      }
      experimentRuns.forEach(function (er) {
        $scope.allRuns = $scope.allRuns + 1;
        $scope.failureRuns += (er.failure_execution ? 1 : 0);
      });
    }

    function loadConfig() {
      config = {'backendExperimentUrl': '/data/experiments.json'};
      //config = {'backendExperimentUrl': 'http://localhost:8080/experiments'};

      init();
    }

    // Start
    loadConfig();


    $scope.rerun = function (rerunLink) {
      $http.get(rerunLink).success(function () {
        init();
      });
    }
  });
