angular.module('newapp')
  .controller('reportsCtrl', function ($scope, $http, $location, $window, resturl, $timeout) {
	$("#historyfromdate, #historytodate").datepicker({
		autoclose: true,
		format: "yyyy-mm-dd",
		endDate: "today"
	});
	  
      // Multi Dropdown Selection Settings //
      $scope.example8settings = {
         checkBoxes: true,
         enableSearch: true
      };
      $scope.vendorsDate = function (historyDates) {
		  if(historyDates.startDate > historyDates.endDate){
			$scope.failure = "startDate should be Less than endDate";
			$('.errorPopup').modal('show');
		}else{
         var vendorslist = {
            "startDate": historyDates.startDate,
            "endDate": historyDates.endDate
         }
         $scope.example8model = [];
         $http.post(resturl + "/getRevenueVendors", vendorslist).then(function (resp) {
            var resparr = resp.data.revenueVendors;
            $scope.example8data = [];
            for (i = 0; i < resparr.length; i++) {
				resparr[i].label = resparr[i]['vendorName']+' ('+resparr[i]['vendorId']+')'
               //resparr[i][id] = resparr[i];
               // $scope.example8data.push({
                  // label: resparr[i]
               // });
			   delete resparr[i]['vendorName'];
            }
			$scope.example8data = resparr;
            console.log($scope.example8data);
         });
		}
      }
      $scope.constitutionchange = function (param) {
         console.log(param);
         $scope.desc = param;
         console.log($scope.desc);
      }
      //report vendors
      $scope.historyByDate = function (historyDates){
		  $scope.dates = historyDates;
		  console.log(historyDates);
         var temparr = [];
         for (i = 0; i < $scope.example8model.length; i++) {
            temparr.push($scope.example8model[i].vendorId );
         }
         $scope.vendorIds = temparr;
         console.log($scope.vendorIds);
         $scope.start = historyDates.startDate;
         $scope.end = historyDates.endDate;
         console.log(historyDates);
         if ($scope.vendorIds.length == $scope.example8data.length) {
            $scope.vendorIds = [];
         }
		 else {
            $scope.vendorIds = $scope.vendorIds;
         }
         if ($scope.desc == "DESC" || $scope.desc == undefined) {
            var payload = {
               "startDate": historyDates.startDate,
               "endDate": historyDates.endDate,
               "sortBy": "DESC",
               "vendorIds": $scope.vendorIds
            };
         }
		 else {
            var payload = {
               "startDate": historyDates.startDate,
               "endDate": historyDates.endDate,
               "sortBy": "ASC",
               "vendorIds": $scope.vendorIds
            };

         }
         $http.post(resturl + "/getVendorRevenues?pageNumber=1&pageSize=10", payload).then(function (resp) {
            console.log(resp);
            $scope.revenueGrid.data = resp.data.vendorRevenues;
            console.log($scope.revenueGrid.data);
            $scope.reportstotal = resp.data.total;
            $scope.vendorsprodCount = resp.data.paginationData.totalCount;
			/*$scope.myDataSource = {};
			$scope.myDataSource = {
				chart: {
					caption: "Vendor Wise Revenues",
					subCaption: "Selected Vendors Revenue in Specified Dates",
					numberPrefix: "₹",
					theme: "ocean"
				}
			};
			$scope.myDataSource.data = [];
			for(i=0; i<resp.data.vendorRevenues.length; i++){
				var obj = {};
				obj.label = resp.data.vendorRevenues[i].vendorName;
				obj.value = resp.data.vendorRevenues[i].totalRevenue;
				$scope.myDataSource.data.push(obj);
			}
			/*$scope.myDataSource = {
				chart: {
					caption: "Vendor Wise Revenues",
					subCaption: "Selected Vendors Revenue in Specified Dates",
					numberPrefix: "₹",
					theme: "ocean"
				},
				data:[
					{label: "Manikanta", value: "880000"},
					{label: "Aparna",value: "730000"},
					{label: "Abhijeet",value: "590000"},
					{label: "OneSevenHome",value: "520000"},
					{label: "OSH Heights",value: "330000"}
				]
			};*/
			/*
			console.log($scope.myDataSource);
			console.log($scope.myDataSource.data);*/		
         });
         $scope.example8model = [];
         $scope.page = 1;
         $scope.vendorsPagingAct = function (page, pageSize, total) {
            $http.post(resturl + "/getVendorRevenues?pageNumber=" + page + "&pageSize=10", payload).then(function (resp) {
               console.log(resp);
               $scope.revenueGrid.data = resp.data.vendorRevenues;
               console.log($scope.revenueGrid.data);
               $scope.reportstotal = resp.data.total;
               $scope.vendorsprodCount = resp.data.paginationData.totalCount;
            });
            $scope.example8model = [];
         }
      };
	  
	  // Vendor Search Method Starts //
	  $scope.vendorArray = [
			{type: 'Vendor Name', value: 'VENDOR_NAME'},
			{type: 'Vendor Id', value: 'VENDOR_ID'}
	  ];
	  
	  $scope.getVendorBySearch = function(vendorType, reportDates){
		  $scope.dates = reportDates;
		  console.log(reportDates);
		  if('sortBy' in reportDates){
			  var sortBy = reportDates.sortBy;
		  }
		  else{
			  var sortBy = 'DESC';
		  }
		  if(vendorType.type == 'Vendor Name'){
			  var string = vendorType.name;
		  }
		  else{
			  var string = vendorType.id
		  }
		  var request = {
			  searchBy : vendorType.value,
			  searchString : string,
			  sortBy : sortBy,
			  startDate : reportDates.startDate,
			  endDate : reportDates.endDate
		  };
		  console.log(request);
		  $http.post(resturl+"/getVendorRevenuesBySearch?pageNumber=1&pageSize=10", request).then(function(resp){
			  console.log(resp);
			  if(resp.data.vendorRevenues.length>0){
				$scope.noVendor = false;
				$scope.revenueGrid.data = resp.data.vendorRevenues;
				$scope.vendorsprodCount = resp.data.paginationData.totalCount;			  
			  }
			  else{
				  $scope.noVendor = true;
				  $scope.noVendorRes = string;
				  $scope.revenueGrid.data = [];
				  $scope.vendorsprodCount = 0;
				  $timeout(function(){
					  $scope.noVendor = false;
					  $scope.vendorType.id = '';
					  $scope.vendorType.name = '';
				  }, 3000);
			  }
		  });
	  };
	  
	  // Vendor Search Method Ends //
	  
      // Grid Data Retrieval //
      $scope.revenueGrid = {};
      $scope.revenueGrid.columnDefs = [
		{name: 'vendorId'},
        {name: 'vendorName'},
		{name: 'totalRevenue'},
        {name: 'Actions', width: 110, enableSorting: false, enableFiltering: false,
            cellTemplate: '<div class="text-center ui-grid-cell-contents"><button class="btn btn-primary"  ng-click="grid.appScope.vendorgetOrder(row)">Details</button></div>'
        }
      ];
      //vendors details
      $scope.vendorgetOrder = function (row) {
		  console.log($scope.dates);
         var productreportvendor = {
            "startDate": $scope.dates.startDate,
            "endDate": $scope.dates.endDate,
            "vendorId": row.entity.vendorId
         }
		 console.log(productreportvendor);
         $http.post(resturl + "/getProductRevenuesByVendor", productreportvendor).then(function (resp) {
            console.log(resp);
            $('.historyMgntPopup').modal('show');
            $scope.vendorbyprodbyrevenue = resp.data.vendorProductRevenueData[0].vendorProducts;
            console.log($scope.vendorbyprodbyrevenue);
            $scope.finalAmount = resp.data.vendorProductRevenueData[0].totalRevenue;
            $scope.vendorid = resp.data.vendorProductRevenueData[0].vendorId;
            $scope.vendorName = resp.data.vendorProductRevenueData[0].vendorName;
         });
         $scope.example8model = [];
      };

      //******product reoprts************//
      //dropdown reports
	  $scope.example8model = [];
      $scope.example8settings = {
         checkBoxes: true,
         enableSearch: true
      };
	  // Product Search Method Starts //
	  $scope.productArray = [
		{type: 'Product Name', value: 'PRODUCT_NAME'},
		{type: 'Product Id', value: 'PRODUCT_ID'}
	  ];
	  
	  $scope.getProductBySearch = function(productType, reportproduct){
		  $scope.prodDates = reportproduct;
		  console.log(productType, reportproduct);
		  if('sortBy' in reportproduct){
			  var sortBy = reportproduct.sortBy;
		  }
		  else{
			  var sortBy = 'DESC';
		  }
		  if(productType.type == 'Product Name'){
			  var string = productType.name;
			  console.log(string);
		  }
		  else{
			  var string = productType.id;
			  console.log(string);
		  }
		  var request = {
			  searchBy : productType.value,
			  searchString : string,
			  startDate : reportproduct.startDate,
			  endDate : reportproduct.endDate,
			  sortBy : sortBy
		  };
		  console.log(request);
		  $http.post(resturl+"/getProductRevenuesBySearch?pageNumber=1&pageSize=10", request).then(function(resp){
			  console.log(resp);
			  if(resp.data.productRevenues != null){
				$scope.noProduct = false; 
				$scope.revenueproductGrid.data = resp.data.productRevenues;
				$scope.productreportCount = resp.data.paginationData.totalCount;
			  }
			  else{
				  $scope.noProduct = true;
				  $scope.noProductRes = resp.data.errorMsg;
				  $scope.revenueproductGrid.data = [];
				  $scope.productreportCount = 0;
				  $timeout(function(){
					  $scope.noProduct = false;
					  $scope.productType.name = '';
					  $scope.productType.id = '';
				  }, 3000);
			  }
		  });
	  }
	  // Product Search Method Ends //
	  
      // Multi Dropdown Selection Settings //
      $scope.Product = function (reportproduct) {
         var vendorslist = {
            "startDate": reportproduct.startDate,
            "endDate": reportproduct.endDate
         }
         $scope.example8model = [];
         $http.post(resturl + "/getRevenueProducts", vendorslist).then(function (resp) {
            var resparr = resp.data.revenueProducts;
            $scope.example8data = [];
            for (i = 0; i < resparr.length; i++) {
				resparr[i].label = resparr[i]['productName']+' ('+resparr[i]['productId']+')'
               //resparr[i][id] = resparr[i];
               // $scope.example8data.push({
                  // label: resparr[i]
               // });
			   delete resparr[i]['productName']
            }
			$scope.example8data = resparr
            console.log($scope.example8data);
         });
      }
	        $scope.constitutionchange = function (param) {
         console.log(param);
		 if(param == ""){
			$scope.desc = "DESC" 
		 }else{
         $scope.desc = param;
		 }
         console.log($scope.desc);
      }
      //retreval
      $scope.ProductByDate = function (reportproduct) {
         console.log(reportproduct);
		  var temparr = [];
            for (i = 0; i < $scope.example8model.length; i++) {
                temparr.push($scope.example8model[i].productSku);
            }
			 $scope.productSku = temparr;
			 console.log($scope.productSku);
         $scope.start = reportproduct.startDate;
         $scope.end = reportproduct.endDate;
         if ($scope.productSku.length == $scope.example8data.length) {
            $scope.productsku = [];
         } else{
         $scope.productsku = $scope.productsku;
          }
       	if($scope.desc == "DESC" || $scope.desc == undefined){
		var payload={
	"startDate":reportproduct.startDate,
	"endDate":reportproduct.endDate,
	"sortBy":"DESC",
	"productSkus": $scope.productsku
	

		};
		}else{
			var payload={
	"startDate":reportproduct.startDate,
	"endDate":reportproduct.endDate,
	"sortBy":"ASC",
	"productSkus": $scope.productsku
};	
			
		}
         $http.post(resturl + "/getProductRevenues?pageNumber=1&pageSize=10", payload).then(function (resp) {
            console.log(resp);
            $scope.revenueproductGrid.data = resp.data.productRevenues;
            $scope.productreportCount = resp.data.paginationData.totalCount;
         });
         $scope.productsku = []; 
      }
      // Grid Data Retrieval //
      $scope.revenueproductGrid = {};
      $scope.revenueproductGrid.columnDefs = [
		{name: 'productId'},
		{name: 'productSku', displayName: 'Product SKU'},
		{name: 'productQuantity'},
		{name: 'productName'},
		{name: 'totalRevenue'},
		{name: 'Actions', width: 110, enableSorting: false, enableFiltering: false,
            cellTemplate: '<div class="text-center ui-grid-cell-contents"><button class="btn btn-primary"  ng-click="grid.appScope.productOrder(row)">Details</button></div>'
         }
      ];
      //details
      $scope.productOrder = function (row) {
		 $scope.prodDates
         var productreportvendor = {
            "startDate": $scope.prodDates.startDate,
            "endDate": $scope.prodDates.endDate,
            "productId": row.entity.productId
         }
		 console.log(productreportvendor);
         $http.post(resturl + "/getProductVendors", productreportvendor).then(function (resp) {
            console.log(resp);
            $('.productModal').modal('show');
            $scope.prodbyvendorbyrevenue = resp.data.productVendorRevenueData[0].productVendors;
            $scope.productSku = resp.data.productVendorRevenueData[0].productSku;
            $scope.productName = resp.data.productVendorRevenueData[0].productName;
            console.log($scope.productVendors);
            //$scope.finalAmount = resp.data.productVendorRevenueData[0].totalRevenue;
            $scope.vendorid = resp.data.productVendorRevenueData[0].vendorId;
            $scope.vendorName = resp.data.productVendorRevenueData[0].vendorName;
         });
      }
	  /*$scope.myDataSource = {
		chart: {
			caption: "Vendor Wise Revenues",
			subCaption: "Selected Vendors Revenue in Specified Dates",
			numberPrefix: "₹",
			/*theme: "ocean"
			theme: "carbon"
		},
		data:[{
				label: "Manikanta",
				value: "10000"
			},
			{
				label: "Aparna",
				value: "5000"
			},
			{
				label: "Abhijeet",
				value: "15000"
			},
			{
				label: "OneSevenHome",
				value: "20000"
			},
			{
				label: "OSH Heights",
				value: "25000"
			}
		]
	};*/
});