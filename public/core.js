//this is the main angular file contaning a blue print all we need for our app to run (for now)
//basically our presentation layer

var myTodo = angular.module('myTodo', []);

function mainController($scope, $http){
    //get request using our api which loads all the todos from database 
    //this would be done automatically without any function call
    $http.get('/api/todos')
        .success(function(data){
            //get all the todos so we can loop on them in frontend
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data){
            console.log('Error: '+data);
        });
    
    //handling adding a new todo, if successed we empty our form and console log the data 
    $scope.createTodo = function(){
        $http.post('api/todos', $scope.formData)
        .success(function(data) {
            $scope.formData = {};
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data){
            console.log('Error: '+ data);
        });
    };

    //handling deleting a tood when the user wants
    $scope.deleteTodo = function(id){
        $http.delete('/api/todos/' +id)
        .success(function(data){
            $scope.todos = data
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' +data);
        });
    };
}