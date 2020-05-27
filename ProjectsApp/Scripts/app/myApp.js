var myApp = angular.module('myApp', ['ui.bootstrap']);

myApp.controller('ProjectApiController', ['$scope', 'ProjectService','$uibModal', function ($scope, ProjectService, $uibModal) {

    $scope.searchFilter;

    getAllProjects();
    $scope.loading = true;
    function getAllProjects() {
        ProjectService.getProjects().then(function (result) {
            $scope.projects = result.data;
            $scope.projects.sort(function (a, b) {
                return new Date(b.ScheduledDate) - new Date(a.ScheduledDate);
            });
            $scope.loading = false;
        }, function (err) {
            console.log(err);
        });
    }

    

    $scope.newProject = {};
    $scope.newProject.ScheduledDate = new Date();
    $scope.create = function () {
        var project = { Name: $scope.newProject.Name, Price: $scope.newProject.Price, ScheduledDate: new Date($scope.newProject.ScheduledDate) };
        ProjectService.createProject(project).then(function (result) {
            getAllProjects();
        }, function (err) {
            console.log(err);
        });
    };

    $scope.projectSelected = {};
    $scope.getTemplate = function (project) {
        if (project.Id === $scope.projectSelected.Id) {
            return 'edit';
        }
        return 'display';
    };

    $scope.edit = function (project) {
        $scope.projectSelected = angular.copy(project);
        $scope.projectSelected.ScheduledDate = new Date(project.ScheduledDate);
    };  

    $scope.save = function (idx) {
        ProjectService.editProject($scope.projectSelected).then(function (result) {
            $scope.projects[idx] = angular.copy($scope.projectSelected);
            $scope.reset();
        }, function (err) {
            console.log(err);
        });
    };

    $scope.reset = function () {
        $scope.projectSelected = {};
    };


    $scope.showDetails = function (project) {
        $scope.projectDetails = angular.copy(project);
        var modalInstance = $uibModal.open({
            templateUrl: 'ProjectDetailsModal.html',
            scope: $scope
        });

    };

    $scope.delete = function (projectId) {
        ProjectService.deleteProject(projectId).then(function (result) {
            var removeIndex = $scope.projects.map(function (item) { return item.Id; }).indexOf(projectId);
            $scope.projects.splice(removeIndex, 1);
        }, function (err) {
            console.log(err);
        });
    };
}]);

myApp.factory('ProjectService', ['$http', function ($http) {

    var service = {
        getProjects: function () {
            return $http.get('/api/projectapi');
        },
        createProject: function (project) {
            return $http.post('api/projectapi', project);
        },
        editProject: function (project) {
            return $http.put('api/projectapi', project);
        },
        deleteProject: function (projectId) {
            return $http.delete('api/projectapi/' + projectId);
        }
    };
    return service;
}]);  