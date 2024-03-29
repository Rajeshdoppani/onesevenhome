angular.module('newapp')
.controller('advertisementsCtrl', function($scope, $http, $location, resturl) {
	
	//Files to Store and Read The Selected Files //
	$scope.files = [];
	$scope.$on("seletedFile", function (event, args) {
        $scope.$apply(function () {
            //add the file object to the scope's files collection
            if ($scope.files.length == 0) {
               $scope.files.push(args.file);
            } else {
               $scope.files.splice(0, 1);
               $scope.files.push(args.file);
            }
        });
    });
	
	// Data To Retrieve In The Table //
	$scope.tableData = [
		{ "sectionNo": "section1",
		  "selection":[
			{"type": "Category", "value": "Category"},
			{"type": "Service", "value": "Service" },
			{"type": "New Products", "value": "New Products"},
			{"type": "Sub Category", "value": "Sub Category"},
		  ]
		},
		{ "sectionNo": "section2",
		  "selection":[
			{"type": "Category", "value": "Category"},
			{"type": "Service", "value": "Service" },
			{"type": "New Products", "value": "New Products"},
			{"type": "Sub Category", "value": "Sub Category"},
		  ]
		},
		{ "sectionNo": "section3",
		  "selection":[
			{"type": "Category", "value": "Category"},
			{"type": "Service", "value": "Service" },
			{"type": "New Products", "value": "New Products"},
			{"type": "Sub Category", "value": "Sub Category"},
		  ]
		},
		{ "sectionNo": "section4",
		  "selection":[
			{"type": "Category", "value": "Category"},
			{"type": "Service", "value": "Service" },
			{"type": "New Products", "value": "New Products"},
			{"type": "Sub Category", "value": "Sub Category"},
		  ]
		}
	];
	
	// Method to Retrieve The Row Details and API Calling Based On Selected Type Of Selection //
	$scope.getSectionDetails = function(rowDetails){
		console.log(rowDetails.sectionNo, rowDetails.selectedValue);
		if(rowDetails.selectedValue == undefined){
			$scope.failure = "Please select advertisement section";
			$('.failurePopup').modal('show');
		}
		else{
		$scope.rowInfo = {};
		$scope.rowInfo.sectionNo = rowDetails.sectionNo;
		$scope.rowInfo.selectedValue = rowDetails.selectedValue;
		if(rowDetails.selectedValue == "Service"){
			$http.get(resturl+"/services").then(function(resp){
				console.log(resp);
				$scope.serviceData = resp.data.services;
			});
			$('.sectionPopup').modal('show');
			$scope.catDropBox = false;
			$scope.serviceDropBox = true;
		}
		else{
			$http.get(resturl+"/getAllCategories").then(function(resp){
				console.log(resp.data.categoryData);
				$scope.categoryData = resp.data.categoryData;
			});
			$('.sectionPopup').modal('show');
			$scope.catDropBox = true;
			$scope.serviceDropBox = false;			
		}
		}
	}
	// Method To Retrieve Sub-Categories When Category Is Changed //
	$scope.categoryChange = function(){
		var index = $scope.categoryData.findIndex(function(item, i) {
			return item.title === $scope.catvalue;
		});
		$scope.categorySub = $scope.categoryData[index].subCategory
	}
	
	// Method To Create A Section //
	$scope.createAdd = function(catvalue, subCatValue, rowInfo){
		console.log(catvalue, subCatValue, rowInfo);
		$('.sectionPopup').modal('hide');
		if(rowInfo.selectedValue == "Service"){
			var request = {
				categoryName : rowInfo.serviceType,
				subCategoryName : "",
				sectionName : rowInfo.sectionNo,
				description : rowInfo.description,
				categoryTitle : rowInfo.categoryTitle,
				discount : rowInfo.discount
			};
		}
		else{
			var request = {
				categoryName : catvalue,
				subCategoryName : subCatValue,
				sectionName : rowInfo.sectionNo,
				description : rowInfo.description,
				categoryTitle : rowInfo.categoryTitle,
				discount : rowInfo.discount
			};
		}
		console.log(request);
		$http({
		method: 'POST',
		url: resturl+"/homePageOffers",
		headers: {
			'Content-Type': undefined
		},
		transformRequest: function(data) {
			var formData = new FormData();
			formData.append("homePageOffersRequestStr", JSON.stringify(request));
				if (data.file.length == 0) {
					formData.append("catImage", new File([""], "emptyFile.jpg", {
						type: "impage/jpeg"
					}));
				}
				else {
					for (var i = 0; i < data.file.length; i++) {
						formData.append("catImage", data.file[i]);
					}
				}
				return formData;
			},
			data: {
				fileInfo: request,
				file: $scope.files
			}
	}).success(function(resp, status, headers, config) {
			console.log(resp);
			$scope.files = [];
			if (resp.status == "true") {
				$scope.success = resp.successMessage;
				$('.successPopup').modal('show');
				$scope.sectionForm.$setPristine();
				$scope.sectionForm.$setUntouched();
				$scope.sectionForm.$submitted = false;
			}
			else {
				$scope.failure = resp.errorMessage;
				$('.failurePopup').modal('show');
			}
		})
	};
});

// Custom Directive To Read The Selected Files When A File Is Selected //
newapp.directive('advertisementImages', function () {
	return {
      require: 'ngModel',
      //create a new scope
      scope: true,
      link: function (scope, el, attrs, ngModel) {
         el.bind('change', function (event) {
            var files = event.target.files;
            //iterate files since 'multiple' may be specified on the element
            for (var i = 0; i < files.length; i++) {
               //emit event upward
               scope.$emit("seletedFile", {
                  file: files[i]
               });
            }
            scope.$apply(function () {
               console.log(el.val());
               ngModel.$setViewValue(el.val());
               ngModel.$render();
            })
         });
      }
   };
});