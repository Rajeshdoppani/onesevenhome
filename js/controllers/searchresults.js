angular.module('newapp')
	.controller('searchResultsCtrl', ['$scope', '$http', '$routeParams', '$location', '$window', 'resturl', 'sharedList', function ($scope, $http, $routeParams, $location, $window, resturl, sharedList) {
		$scope.typeOfSearch = [{
			name: "Category",
			value: "Category"
		},
		{
			name: "Brand",
			value: "Brand"
		},
		{
			name: "Product",
			value: "Product"
		}
		];
		$scope.page = 1;
		$scope.pagingincrement = false;
		$window.scrollTo(0, 0);
		/**** Get Search Response ****/
		var shresponse = sharedList.getList();
		if (shresponse.length > 0) {
			$scope.searchInput = shresponse[0].searchparamSelected;
			// Category Search Response Buinding //
			if (shresponse[0].searchType == "Category") {
				// Category Data Available //
				if (shresponse[0].categoryData != null) {
					$scope.searchParam = $routeParams.searchValue;
					$scope.categoryValue = $routeParams.category;
					if ($routeParams.searchValue != undefined) {
						$scope.categoryResults = shresponse[0].categoryData;
						var subCatTitle = $scope.searchParam.replace(/_/g, " ");
						var catTitle = $scope.categoryValue.replace(/_/g, " ");
						$scope.subCategoryTitle = subCatTitle;
						if (catTitle == "Architects" && subCatTitle == "Architects") {
							var request = { code: "Civil" };
							$http.post(resturl + "/getVendorsList?pageNumber=1&pageSize=5", request).then(function (resp) {
								$scope.pagingincrement = false;
								$scope.pagingnormal = true;
								$scope.vendorCategoryData = resp.data.responseData;
								$scope.vendorcatCount = resp.data.paginationData.totalCount;
								$scope.totalCount = $scope.vendorcatCount;
								$scope.currentPage = resp.data.paginationData.currentPage;
								$scope.pageSize = resp.data.paginationData.pageSize;
								if ($scope.totalCount < $scope.pageSize) {
									$scope.pageSize = $scope.totalCount;
								}
							});
							$scope.page = 1;
							$scope.vendorByCategoryPaging = function (page, pageSize, total) {
								$http.post(resturl + "/getVendorsList?pageNumber=" + page + "&pageSize=5", request).then(function (resp) {
									$scope.pagingincrement = true;
									$scope.pagingnormal = false;
									$scope.vendorCategoryData = resp.data.responseData;
									$scope.vendorcatCount = resp.data.paginationData.totalCount;
									$scope.totalCount = $scope.vendorcatCount;
									$scope.currentPage = resp.data.paginationData.currentPage;
									$scope.pageSize = resp.data.paginationData.pageSize;
									$scope.pagedropSize = $scope.pageSize * $scope.currentPage;
									$scope.currentPage = resp.data.paginationData.currentPage;
									$scope.pageSize = resp.data.paginationData.pageSize;
									if ($scope.totalCount < $scope.pageSize) {
										$scope.pageSize = $scope.totalCount;
									}
									if ($scope.currentPage == 2) {
										$scope.currentdropPage = $scope.pageSize + 1;
									} else if ($scope.currentPage == 1) {
										$scope.currentdropPage = $scope.currentPage;
									} else {
										$scope.currentdropPage = ($scope.pagedropSize + 1) - $scope.pageSize;
									}
									if ($scope.totalCount < $scope.pagedropSize) {
										$scope.pagedropSize = $scope.totalCount;
									}
								});
								$window.scrollTo(0, 0);
							};
							$scope.categoryResults[0].subCategory[0].checked = true;
							$scope.showCategoryResponse = false;
							$scope.showBrandResponse = false;
							$scope.showProductResponse = false;
							$scope.showVendorResponse = true;
						}
						else if ((catTitle == "Architects" && subCatTitle == "Civil") || (catTitle == "Architects" && subCatTitle == "Interior") || (catTitle == "Architects" && subCatTitle == "Landscape")) {
							$scope.request = { code: subCatTitle };
							$http.post(resturl + "/getVendorsList?pageNumber=1&pageSize=5", $scope.request).then(function (resp) {
								$scope.pagingincrement = false;
								$scope.pagingnormal = true;
								$scope.vendorCategoryData = resp.data.responseData;
								$scope.vendorcatCount = resp.data.paginationData.totalCount;
								$scope.totalCount = $scope.vendorcatCount;
								$scope.currentPage = resp.data.paginationData.currentPage;
								$scope.pageSize = resp.data.paginationData.pageSize;
								if ($scope.totalCount < $scope.pageSize) {
									$scope.pageSize = $scope.totalCount;
								}
							});
							$scope.page = 1;
							$scope.vendorByCategoryPaging = function (page, pageSize, total) {
								$http.post(resturl + "/getVendorsList?pageNumber=" + page + "&pageSize=5", request).then(function (resp) {
									$scope.pagingincrement = true;
									$scope.pagingnormal = false;
									$scope.vendorCategoryData = resp.data.responseData;
									$scope.vendorcatCount = resp.data.paginationData.totalCount;
									$scope.totalCount = $scope.vendorcatCount;
									$scope.currentPage = resp.data.paginationData.currentPage;
									$scope.pageSize = resp.data.paginationData.pageSize;
									$scope.pagedropSize = $scope.pageSize * $scope.currentPage;
									$scope.currentPage = resp.data.paginationData.currentPage;
									$scope.pageSize = resp.data.paginationData.pageSize;
									if ($scope.totalCount < $scope.pageSize) {
										$scope.pageSize = $scope.totalCount;
									}
									if ($scope.currentPage == 2) {
										$scope.currentdropPage = $scope.pageSize + 1;
									} else if ($scope.currentPage == 1) {
										$scope.currentdropPage = $scope.currentPage;
									} else {
										$scope.currentdropPage = ($scope.pagedropSize + 1) - $scope.pageSize;
									}
									if ($scope.totalCount < $scope.pagedropSize) {
										$scope.pagedropSize = $scope.totalCount;
									}
								});
								$window.scrollTo(0, 0);
							};
							for (a = 0; a < $scope.categoryResults.length; a++) {
								for (b = 0; b < $scope.categoryResults[a].subCategory.length; b++) {
									if ($scope.categoryResults[a].subCategory[b].title == subCatTitle) {
										$scope.categoryResults[a].subCategory[b].checked = true;
									}
								}
							}
							$scope.showCategoryResponse = false;
							$scope.showBrandResponse = false;
							$scope.showProductResponse = false;
							$scope.showVendorResponse = true;
						}
						if (catTitle == "Machinery & Equipment" && subCatTitle == "Machinery & Equipment") {
							$scope.request = { code: "Slab Equipment" };
							$http.post(resturl + "/getVendorsList?pageNumber=1&pageSize=5", $scope.request).then(function (resp) {
								$scope.vendorCategoryData = resp.data.responseData;
								$scope.vendorcatCount = resp.data.paginationData.totalCount;
							});
							$scope.page = 1;
							$scope.vendorByCategoryPaging = function (page, pageSize, total) {
								$http.post(resturl + "/getVendorsList?pageNumber=" + page + "&pageSize=5", request).then(function (resp) {
									$scope.vendorCategoryData = resp.data.responseData;
									$scope.vendorcatCount = resp.data.paginationData.totalCount;
								});
								$window.scrollTo(0, 0);
							};
							$scope.categoryResults[0].subCategory[0].checked = true;
							$scope.showCategoryResponse = false;
							$scope.showBrandResponse = false;
							$scope.showProductResponse = false;
							$scope.showVendorResponse = true;
						}
						else if ((catTitle == "Machinery & Equipment" && subCatTitle == "Slab Equipment") || (catTitle == "Machinery & Equipment" && subCatTitle == "Earth Movers") || (catTitle == "Machinery & Equipment" && subCatTitle == "Borewell Drilling") || (catTitle == "Machinery & Equipment" && subCatTitle == "Transit Mixers") || (catTitle == "Machinery & Equipment" && subCatTitle == "Stone Crusher")) {
							$scope.request = { code: subCatTitle };
							$http.post(resturl + "/getVendorsList?pageNumber=1&pageSize=5", $scope.request).then(function (resp) {
								$scope.vendorCategoryData = resp.data.responseData;
								$scope.vendorcatCount = resp.data.paginationData.totalCount;
							});
							$scope.page = 1;
							$scope.vendorByCategoryPaging = function (page, pageSize, total) {
								$http.post(resturl + "/getVendorsList?pageNumber=" + page + "&pageSize=5", request).then(function (resp) {
									$scope.vendorCategoryData = resp.data.responseData;
									$scope.vendorcatCount = resp.data.paginationData.totalCount;
								});
								$window.scrollTo(0, 0);
							};
							for (a = 0; a < $scope.categoryResults.length; a++) {
								for (b = 0; b < $scope.categoryResults[a].subCategory.length; b++) {
									if ($scope.categoryResults[a].subCategory[b].title == subCatTitle) {
										$scope.categoryResults[a].subCategory[b].checked = true;
									}
								}
							}
							$scope.showCategoryResponse = false;
							$scope.showBrandResponse = false;
							$scope.showProductResponse = false;
							$scope.showVendorResponse = true;
						}
						if (catTitle == "Wall Paper" && subCatTitle == "Wall Paper") {
							$scope.request = { code: "Wall Papers" };
							$http.post(resturl + "/getVendorsList?pageNumber=1&pageSize=5", $scope.request).then(function (resp) {
								$scope.vendorCategoryData = resp.data.responseData;
								$scope.vendorcatCount = resp.data.paginationData.totalCount;
							});
							$scope.page = 1;
							$scope.vendorByCategoryPaging = function (page, pageSize, total) {
								$http.post(resturl + "/getVendorsList?pageNumber=" + page + "&pageSize=5", request).then(function (resp) {
									$scope.vendorCategoryData = resp.data.responseData;
									$scope.vendorcatCount = resp.data.paginationData.totalCount;
								});
								$window.scrollTo(0, 0);
							};
							$scope.categoryResults[0].subCategory[0].checked = true;
							$scope.showCategoryResponse = false;
							$scope.showBrandResponse = false;
							$scope.showProductResponse = false;
							$scope.showVendorResponse = true;
						}
						else if ((catTitle == "Wall Paper" && subCatTitle == "Wall Papers") || (catTitle == "Wall Paper" && subCatTitle == "Accessories and Fixtures")) {
							$scope.request = { code: subCatTitle };
							$http.post(resturl + "/getVendorsList?pageNumber=1&pageSize=5", $scope.request).then(function (resp) {
								$scope.vendorCategoryData = resp.data.responseData;
								$scope.vendorcatCount = resp.data.paginationData.totalCount;
							});
							$scope.page = 1;
							$scope.vendorByCategoryPaging = function (page, pageSize, total) {
								$http.post(resturl + "/getVendorsList?pageNumber=" + page + "&pageSize=5", request).then(function (resp) {
									$scope.vendorCategoryData = resp.data.responseData;
									$scope.vendorcatCount = resp.data.paginationData.totalCount;
								});
								$window.scrollTo(0, 0);
							};
							for (a = 0; a < $scope.categoryResults.length; a++) {
								for (b = 0; b < $scope.categoryResults[a].subCategory.length; b++) {
									if ($scope.categoryResults[a].subCategory[b].title == subCatTitle) {
										$scope.categoryResults[a].subCategory[b].checked = true;
									}
								}
							}
							$scope.showCategoryResponse = false;
							$scope.showBrandResponse = false;
							$scope.showProductResponse = false;
							$scope.showVendorResponse = true;
						}
						if (catTitle != "Architects" && catTitle != "Wall Paper" && catTitle != "Machinery & Equipment") {
							for (m = 0; m < $scope.categoryResults.length; m++) {
								if ($scope.categoryResults[m].title == subCatTitle) {
									$scope.categoryResults[0].subCategory[0].checked = true;
									$scope.subTitle = $scope.categoryResults[0].subCategory[0].title;
									$http.get(resturl + "/categories/" + subCatTitle + "?pageNumber=1&pageSize=15").then(function (resp) {
										$scope.pagingincrement = false;
										$scope.pagingnormal = true;
										$scope.productsByCategory = resp.data.responseData;
										$scope.prodByCatCount = resp.data.paginationData.totalCount;
										$scope.totalCount = $scope.prodByCatCount;
										$scope.currentPage = resp.data.paginationData.currentPage;
										$scope.pageSize = resp.data.paginationData.pageSize;
										if ($scope.totalCount < $scope.pageSize) {
											$scope.pageSize = $scope.totalCount;
										}
									});
									$scope.showCategoryResponse = true;
									$scope.showBrandResponse = false;
									$scope.showProductResponse = false;
									$scope.showVendorResponse = false;
								}
								else {
									for (j = 0; j < $scope.categoryResults[m].subCategory.length; j++) {
										if ($scope.categoryResults[m].subCategory[j].title == subCatTitle) {
											$scope.categoryResults[m].subCategory[j].checked = true;
											$scope.subTitle = $scope.categoryResults[m].subCategory[j].title;
											$http.get(resturl + "/categories/" + subCatTitle + "?pageNumber=1&pageSize=15").then(function (resp) {
												$scope.pagingincrement = false;
												$scope.pagingnormal = true;
												$scope.productsByCategory = resp.data.responseData;
												$scope.prodByCatCount = resp.data.paginationData.totalCount;
												$scope.totalCount = $scope.prodByCatCount;
												$scope.currentPage = resp.data.paginationData.currentPage;
												$scope.pageSize = resp.data.paginationData.pageSize;
												if ($scope.totalCount < $scope.pageSize) {
													$scope.pageSize = $scope.totalCount;
												}
											});
											$scope.showCategoryResponse = true;
											$scope.showBrandResponse = false;
											$scope.showProductResponse = false;
											$scope.showVendorResponse = false;
										}
									}
									$scope.page = 1;
									$scope.prodByCategoryPaging = function (page, pageSize, total) {
										$http.get(resturl + "/categories/" + subCatTitle + "?pageNumber=" + page + "&pageSize=15").then(function (resp) {
											$scope.pagingincrement = true;
											$scope.pagingnormal = false;
											$scope.productsByCategory = resp.data.responseData;
											$scope.prodByCatCount = resp.data.paginationData.totalCount;
											$scope.totalCount = $scope.prodByCatCount;
											$scope.currentPage = resp.data.paginationData.currentPage;
											$scope.pageSize = resp.data.paginationData.pageSize;
											$scope.pagedropSize = $scope.pageSize * $scope.currentPage;
											$scope.currentPage = resp.data.paginationData.currentPage;
											$scope.pageSize = resp.data.paginationData.pageSize;
											if ($scope.totalCount < $scope.pageSize) {
												$scope.pageSize = $scope.totalCount;
											}
											if ($scope.currentPage == 2) {
												$scope.currentdropPage = $scope.pageSize + 1;
											} else if ($scope.currentPage == 1) {
												$scope.currentdropPage = $scope.currentPage;
											} else {
												$scope.currentdropPage = ($scope.pagedropSize + 1) - $scope.pageSize;
											}
											if ($scope.totalCount < $scope.currentdropPage) {
												$scope.currentdropPage = $scope.totalCount;
											}
										});
										$window.scrollTo(0, 0);
									};
								}
							}
						}
					}
				}
				// Category Data Not Available //
				else {
					$scope.noResults = shresponse[0].searchparamSelected;
					$scope.noReultsMessage = true;
					$scope.pagingincrement = false;
					$scope.pagingnormal = false;
				}
			}
			// Brand Search Response Buinding //
			else if (shresponse[0].searchType == "Brand") {
				// Brand Data Available //
				if (shresponse[0].filteredData[0] != undefined) {
					$scope.showCategoryResponse = false;
					$scope.showBrandResponse = true;
					$scope.showProductResponse = false;
					$scope.showVendorResponse = false;
					if ($routeParams.searchValue != undefined) {
						$scope.searchParam = $routeParams.searchValue;
						var searchSelectKey = $routeParams.searchValue.replace(/_/g, " ");
						$scope.brandResults = shresponse[0].filteredData;
						for (i = 0; i < $scope.brandResults.length; i++) {
							for (j = 0; j < $scope.brandResults[i].filterTypes.length; j++) {
								if ($scope.brandResults[i].filterTypes[j].filterTypeName == searchSelectKey) {
									$scope.brandResults[i].filterTypes[j].checked = true;
									$scope.filterId = $scope.brandResults[i].filterTypes[j].filterTypeId;
								}
							}
						}
						$scope.filterIds = [$scope.filterId];
						$scope.request = {
							filterIds: $scope.filterIds
						};
						$http.post(resturl + "/getProductsByFilters?pageNumber=1&pageSize=15", $scope.request).then(function (resp) {
							$scope.pagingincrement = false;
							$scope.pagingnormal = true;
							$scope.productsRespByFilters = resp.data.filteredProducts;
							$scope.filterProdCount = resp.data.paginationData.totalCount;
							$scope.totalCount = $scope.filterProdCount;
							$scope.currentPage = resp.data.paginationData.currentPage;
							$scope.pageSize = resp.data.paginationData.pageSize;
							if ($scope.totalCount < $scope.pageSize) {
								$scope.pageSize = $scope.totalCount;
							}
						});
					}
					else {
						$scope.brandResults = shresponse[0].filteredData;
						$scope.brandResults[0].filterTypes[0].checked = true;
						$scope.filterIds = [$scope.brandResults[0].filterTypes[0].filterTypeId];
						$scope.request = {
							filterIds: $scope.filterIds
						};
						$http.post(resturl + "/getProductsByFilters?pageNumber=1&pageSize=15", $scope.request).then(function (resp) {
							$scope.pagingincrement = false;
							$scope.pagingnormal = true;
							$scope.productsRespByFilters = resp.data.filteredProducts;
							$scope.filterProdCount = resp.data.paginationData.totalCount;
							$scope.totalCount = $scope.filterProdCount;
							$scope.currentPage = resp.data.paginationData.currentPage;
							$scope.pageSize = resp.data.paginationData.pageSize;
							if ($scope.totalCount < $scope.pageSize) {
								$scope.pageSize = $scope.totalCount;
							}
						});
					}
				}
				// Brand Data Not Available //
				else {
					$scope.noResults = shresponse[0].searchparamSelected;
					$scope.noReultsMessage = true;
					$scope.pagingincrement = false;
					$scope.pagingnormal = false;
				}
			}
			// Product Search Response Buinding //
			else {
				// Products Data Available //
				if (shresponse[0].filteredProducts[0] != undefined) {
					$scope.getsearchResults = shresponse[0].filteredProducts;
					$scope.pagingincrement = false;
					$scope.pagingnormal = true;
					$scope.totalCount = shresponse[0].paginationData.totalCount;
					//  $scope.totalCount = $scope.totalCount;
					$scope.currentPage = shresponse[0].paginationData.currentPage;
					$scope.pageSize = shresponse[0].paginationData.pageSize;
					if ($scope.totalCount < $scope.pageSize) {
						$scope.pageSize = $scope.totalCount;
					}
					$scope.showCategoryResponse = false;
					$scope.showBrandResponse = false;
					$scope.showProductResponse = true;
					$scope.showvendorResponse = false;

					$scope.page = 1;
					$scope.prodBySearchPaging = function (page, pageSize, total) {
						var searchRequest = {
							searchString: shresponse[0].searchparamSelected
						};
						$http.post(resturl + "/getProductsBySearch" + "?" + "pageNumber=" + page + "&pageSize=15", searchRequest).then(function (response) {
							$scope.pagingincrement = true;
							$scope.pagingnormal = false;
							$scope.getsearchResults = response.data.filteredProducts;
							$scope.totalCount = response.data.paginationData.totalCount;
							//$scope.totalCount=$scope.searchProdCount;
							$scope.currentPage = response.data.paginationData.currentPage;
							$scope.pageSize = response.data.paginationData.pageSize;
							$scope.pagedropSize = $scope.pageSize * $scope.currentPage;
							$scope.currentPage = response.data.paginationData.currentPage;
							// $scope.pageSize = response.data.paginationData.pageSize;
							if ($scope.totalCount < $scope.pageSize) {
								$scope.pageSize = $scope.totalCount;
							}
							if ($scope.currentPage == 2) {
								$scope.currentdropPage = $scope.pageSize + 1;
							} else if ($scope.currentPage == 1) {
								$scope.currentdropPage = $scope.currentPage;
							} else {
								$scope.currentdropPage = ($scope.pagedropSize + 1) - $scope.pageSize;
							}
							if ($scope.totalCount < $scope.pagedropSize) {
								$scope.pagedropSize = $scope.totalCount;
							}
						});
					};
				}
				// Products Data Not Available //
				else {
					$scope.noResults = shresponse[0].searchparamSelected;
					$scope.noReultsMessage = true;
					$scope.pagingincrement = false;
					$scope.pagingnormal = false;
				}
			}
		}
		// If Any Other Type Of Search, (No Need For This ELSE Block) //
		else {
			$scope.noResults = shresponse[0].searchparamSelected;
			$scope.noReultsMessage = true;
			$scope.pagingincrement = false;
			$scope.pagingnormal = false;
			$scope.getsearchResults = "";
			$scope.categoryResults = "";
			$scope.brandResults = "";
		}

		/**** Get Search Response ****/
		if (localStorage.loggedInUser != undefined) {
			$scope.loggedInUser = localStorage.loggedInUser;
			$scope.loggedInUserName = localStorage.loggedInUserName;
			$scope.loggedInUserType = localStorage.loggedInUserType;
			$scope.loggedInuserId = localStorage.loggedInuserId;
			$scope.userlogged = true;
		} else {
			$scope.userlogged = false;
		}
		$http.get(resturl + "/getAllCategories").then(function (resp) {
			$scope.menuitem = resp.data.categoryData;
		});
		$scope.mouseOver = function (param) {
			$scope.set_bg = function () {
				$scope.bgimg = param.imageURL;
				return {
					"background-image": "url(/clients/onesevenhome/img/" + $scope.bgimg + ".jpg)"
				};
			};
		};
		$scope.searchProducts = function (searchSelected, searchType) {
			if (searchType == "Category") {
				var request = {
					searchString: searchSelected
				};
				$http.post(resturl + "/getProductByCategory", request).then(function (resp) {
					if (resp.data.categoryData != null) {
						$scope.noReultsMessage = false;
						$scope.categoryResults = resp.data.categoryData;
						$scope.categoryResults[0].subCategory[0].checked = true;
						$scope.categoryTitle = $scope.categoryResults[0].title;
						$scope.subCategoryTitle = $scope.categoryResults[0].subCategory[0].title;
						$location.path('/searchresults/' + $scope.categoryTitle + "/" + $scope.subCategoryTitle);
						if ($scope.categoryTitle == "Architects" || $scope.categoryTitle == "Machinery & Equipment" || $scope.categoryTitle == "Wall Paper") {
							var request = { code: $scope.subCategoryTitle };
							$http.post(resturl + "/getVendorsList?pageNumber=1&pageSize=5", request).then(function (resp) {
								$scope.vendorCategoryData = resp.data.responseData;
								$scope.vendorcatCount = resp.data.paginationData.totalCount;
							});
							for (a = 0; a < $scope.categoryResults.length; a++) {
								for (b = 0; b < $scope.categoryResults[a].subCategory.length; b++) {
									if ($scope.categoryResults[a].subCategory[b].title == subCatTitle) {
										$scope.categoryResults[a].subCategory[b].checked = true;
									}
								}
							}
							$scope.showCategoryResponse = false;
							$scope.showBrandResponse = false;
							$scope.showProductResponse = false;
							$scope.showVendorResponse = true;
						}
						else {
							$http.get(resturl + "/categories/" + $scope.subCategoryTitle + "?pageNumber=1&pageSize=15").then(function (resp) {
								$scope.pagingincrement = false;
								$scope.pagingnormal = true;
								$scope.productsByCategory = resp.data.responseData;
								$scope.prodByCatCount = resp.data.paginationData.totalCount;
								$scope.currentPage = resp.data.paginationData.currentPage;
								$scope.pageSize = resp.data.paginationData.pageSize;
								if ($scope.prodByCatCount < $scope.pageSize) {
									$scope.pageSize = $scope.prodByCatCount;
								}
								$(".menu-search input").val("");
								// cat pagination
								$scope.page = 1;
								$scope.prodByCategoryPaging = function (page, pageSize, total) {
									$http.get(resturl + "/categories/" + $scope.subCategoryTitle + "?pageNumber=" + page + "&pageSize=15").then(function (resp) {
										$scope.productsByCategory = resp.data.responseData;
										$scope.prodByCatCount = resp.data.paginationData.totalCount;
										$(".menu-search input").val("");
									});
									$window.scrollTo(0, 0);
								};
							});
							$scope.showCategoryResponse = false;
							$scope.showBrandResponse = false;
							$scope.showProductResponse = false;
							$scope.showVendorResponse = true;
						}
					}
					else {
						$scope.noResults = searchSelected;
						$scope.noReultsMessage = true;
						$scope.pagingincrement = false;
						$scope.pagingnormal = false;
						$scope.categoryResults = "";
						$scope.productsByCategory = "";
						$scope.prodByCatCount = 0;
						$(".menu-search input").val("");
					}
				});
			}

			// Brand Search From Search Results Page //
			else if (searchType == "Brand") {
				$scope.request = {
					searchFilterString: searchSelected
				};
				$http.post(resturl + "/getFiltersBySearch", $scope.request).then(function (resp) {
					if (resp.data.filteredData[0] != undefined) {
						$scope.noReultsMessage = false;
						$scope.brandResults = resp.data.filteredData;
						$scope.brandResults[0].filterTypes[0].checked = true;
						$scope.filterIds = [$scope.brandResults[0].filterTypes[0].filterTypeId];
						var request = {
							filterIds: $scope.filterIds
						};
						$http.post(resturl + "/getProductsByFilters?pageNumber=1&pageSize=15", request).then(function (resp) {
							$scope.pagingincrement = false;
							$scope.pagingnormal = true;
							$scope.productsRespByFilters = resp.data.filteredProducts;
							$scope.filterProdCount = resp.data.paginationData.totalCount;
							$scope.totalCount = $scope.filterProdCount;
							$scope.currentPage = resp.data.paginationData.currentPage;
							$scope.pageSize = resp.data.paginationData.pageSize;
							if ($scope.totalCount < $scope.pageSize) {
								$scope.pageSize = $scope.totalCount;
							}
							$(".menu-search input").val("");
						});
					}
					else {
						$scope.noResults = searchSelected;
						$scope.noReultsMessage = true;
						$scope.pagingincrement = false;
						$scope.pagingnormal = false;
						$scope.brandResults = "";
						$scope.productsRespByFilters = "";
						$scope.filterProdCount = 0;
						$(".menu-search input").val("");
					}
				});
				$scope.showCategoryResponse = false;
				$scope.showBrandResponse = true;
				$scope.showProductResponse = false;
				$scope.showvendorResponse = false;
			}
			// Products Search From Search Page //
			else {
				$scope.showCategoryResponse = false;
				$scope.showBrandResponse = false;
				$scope.showProductResponse = true;
				$scope.showvendorResponse = false;
				var searchRequest = {
					searchString: searchSelected
				};
				$http.post(resturl + "/getProductsBySearch", searchRequest).then(function (response) {
					if (response.data.filteredProducts[0] != undefined) {
						$scope.noReultsMessage = false;
						$scope.getsearchResults = response.data.filteredProducts;
						$(".menu-search input").val("");
					}
					else {
						$scope.noResults = searchSelected;
						$scope.noReultsMessage = true;
						$scope.pagingincrement = false;
						$scope.pagingnormal = false;
						$scope.getsearchResults = "";
						$(".menu-search input").val("");
					}
				});
			}
		};

		$scope.searchitems = function (searchSelected, keyEvent, searchType) {
			if (keyEvent.which === 13) {
				$(".menu-search input").val("");
				$(".menu-search .input > .fa").trigger("click");
				// Category Search From Search Results Page //
				if (searchType == "Category") {
					var request = {
						searchString: searchSelected
					};
					$http.post(resturl + "/getProductByCategory", request).then(function (resp) {
						if (resp.data.categoryData != null) {
							$scope.noReultsMessage = false;
							$scope.categoryResults = resp.data.categoryData;
							$scope.categoryTitle = resp.data.categoryData[0].title.replace(/ /g, "_");
							$scope.subCategoryTitle = resp.data.categoryData[0].subCategory[0].title.replace(/ /g, "_");
							if ($scope.categoryTitle == "Architects" || $scope.categoryTitle == "Machinery_&_Equipment" || $scope.categoryTitle == "Wall_Paper") {
								$scope.categoryResults[0].subCategory[0].checked = true;
								$scope.showVendorResponse = true;
								$scope.showCategoryResponse = false;
								$scope.showBrandResponse = false;
								$scope.showProductResponse = false;
								var request = { code: $scope.subCategoryTitle };
								$http.post(resturl + "/getVendorsList?pageNumber=1&pageSize=5", request).then(function (resp) {
									$scope.pagingincrement = false;
									$scope.pagingnormal = true;
									$scope.vendorCategoryData = resp.data.responseData;
									$scope.vendorcatCount = resp.data.paginationData.totalCount;
									$scope.totalCount = $scope.vendorcatCount;
									$scope.currentPage = resp.data.paginationData.currentPage;
									$scope.pageSize = resp.data.paginationData.pageSize;
									if ($scope.totalCount < $scope.pageSize) {
										$scope.pageSize = $scope.totalCount;
									}
									for (a = 0; a < $scope.categoryResults.length; a++) {
										for (b = 0; b < $scope.categoryResults[a].subCategory.length; b++) {
											if ($scope.categoryResults[a].subCategory[b].title == $scope.subCategoryTitle) {
												$scope.categoryResults[a].subCategory[b].checked = true;
											}
										}
									}
								});
							}
							else {
								$http.get(resturl + "/categories/" + $scope.subCategoryTitle + "?pageNumber=1&pageSize=15").then(function (resp) {
									$scope.pagingincrement = false;
									$scope.pagingnormal = true;
									$scope.productsByCategory = resp.data.responseData;
									$scope.prodByCatCount = resp.data.paginationData.totalCount;
									$scope.currentPage = resp.data.paginationData.currentPage;
									$scope.pageSize = resp.data.paginationData.pageSize;
									if ($scope.prodByCatCount < $scope.pageSize) {
										$scope.pageSize = $scope.prodByCatCount;
									}
									$(".menu-search input").val("");
									$scope.categoryResults[0].subCategory[0].checked = true;
									$scope.showCategoryResponse = true;
									$scope.showBrandResponse = false;
									$scope.showProductResponse = false;
									$scope.showVendorResponse = false;
								});
							}
							// $location.path('/searchresults/'+$scope.categoryTitle+"/"+$scope.subCategoryTitle);
						}
						else {
							$scope.noResults = searchSelected;
							$scope.noReultsMessage = true;
							$scope.pagingincrement = false;
							$scope.pagingnormal = false;
							$scope.categoryResults = "";
							$scope.productsByCategory = "";
							$scope.prodByCatCount = 0;
							$(".menu-search input").val("");
						}
					});
				}

				// Brand Search From Search Results Page //
				else if (searchType == "Brand") {
					$scope.request = {
						searchFilterString: searchSelected
					};
					$http.post(resturl + "/getFiltersBySearch", $scope.request).then(function (resp) {
						if (resp.data.filteredData[0] != undefined) {
							$scope.noReultsMessage = false;
							$scope.brandResults = resp.data.filteredData;
							$scope.brandResults[0].filterTypes[0].checked = true;
							var request = {
								"filterIds": [$scope.brandResults[0].filterTypes[0].filterTypeId]
							};
							$http.post(resturl + "/getProductsByFilters?pageNumber=1&pageSize=15", request).then(function (resp) {
								$scope.pagingincrement = false;
								$scope.pagingnormal = true;
								$scope.productsRespByFilters = resp.data.filteredProducts;
								$scope.filterProdCount = resp.data.paginationData.totalCount;
								$scope.totalCount = $scope.filterProdCount;
								$scope.currentPage = resp.data.paginationData.currentPage;
								$scope.pageSize = resp.data.paginationData.pageSize;
								if ($scope.totalCount < $scope.pageSize) {
									$scope.pageSize = $scope.totalCount;
								}
								$(".menu-search input").val("");
							});
						}
						else {
							$scope.noResults = searchSelected;
							$scope.noReultsMessage = true;
							$scope.pagingincrement = false;
							$scope.pagingnormal = false;
							$scope.brandResults = "";
							$scope.productsRespByFilters = "";
							$scope.filterProdCount = 0;
							$(".menu-search input").val("");
						}
					});
					$scope.showCategoryResponse = false;
					$scope.showBrandResponse = true;
					$scope.showProductResponse = false;
					$scope.showvendorResponse = false;
				}
				// Products Search From Search Page //
				else {
					$scope.showCategoryResponse = false;
					$scope.showBrandResponse = false;
					$scope.showProductResponse = true;
					$scope.showvendorResponse = false;
					var searchRequest = {
						searchString: searchSelected
					};
					$http.post(resturl + "/getProductsBySearch" + "?" + "pageNumber=1&pageSize=15", searchRequest).then(function (response) {
						if (response.data.filteredProducts[0] != undefined) {
							$scope.noReultsMessage = false;
							$scope.pagingincrement = false;
							$scope.pagingnormal = true;
							$scope.getsearchResults = response.data.filteredProducts;
							if (response.data.paginationData == null) {
								$scope.totalCount = 0;
								$scope.getsearchResults = "";
							}
							$scope.totalCount = response.data.paginationData.totalCount;
							//$scope.totalCount = $scope.filterProdCount;
							$scope.currentPage = response.data.paginationData.currentPage;
							$scope.pageSize = response.data.paginationData.pageSize;
							if ($scope.totalCount < $scope.pageSize) {
								$scope.pageSize = $scope.totalCount;
							}
							$(".menu-search input").val("");
						}
						else {
							$scope.noResults = searchSelected;
							$scope.noReultsMessage = true;
							$scope.pagingincrement = false;
							$scope.pagingnormal = false;
							$scope.getsearchResults = "";
							$(".menu-search input").val("");
						}
					});


					$scope.page = 1;
					$scope.prodBySearchPaging = function (page, pageSize, total) {
						var searchRequest = {
							searchString: searchSelected
						};
						$http.post(resturl + "/getProductsBySearch" + "?" + "pageNumber=" + page + "&pageSize=15", searchRequest).then(function (response) {
							if (response.data.filteredProducts[0] != undefined) {
								$scope.noReultsMessage = false;
								$scope.pagingincrement = true;
								$scope.pagingnormal = false;
								$scope.getsearchResults = response.data.filteredProducts;
								if (response.data.paginationData == null) {
									$scope.totalCount = 0;
									$scope.getsearchResults = "";
								}
								$scope.totalCount = response.data.paginationData.totalCount;
								$scope.pageSize = response.data.paginationData.pageSize;
								$scope.currentPage = response.data.paginationData.currentPage;
								$scope.pagedropSize = $scope.pageSize * $scope.currentPage;
								if ($scope.currentPage == 2) {
									$scope.currentdropPage = $scope.pageSize + 1;
								} else if ($scope.currentPage == 1) {
									$scope.currentdropPage = $scope.currentPage;
								} else {
									$scope.currentdropPage = ($scope.pagedropSize + 1) - $scope.pageSize;
								}
								if ($scope.totalCount < $scope.pagedropSize) {
									$scope.pagedropSize = $scope.totalCount;
								}
								$(".menu-search input").val("");
							}
							else {
								$scope.noResults = searchSelected;
								$scope.noReultsMessage = true;
								$scope.pagingincrement = false;
								$scope.pagingnormal = false;
								$scope.getsearchResults = "";
								$(".menu-search input").val("");
							}
						});
					};

				}
			}
		};

		if (localStorage.loggedInuserId == undefined) {
			$scope.lengthofcart = 0;
		} else {
			$http.get(resturl + "/cart/displayCart?userId=" + localStorage.loggedInuserId).then(function (resp) {
				$scope.cartlist = resp.data;
				if (resp.data.shoppingCartItems == null) {
					$scope.lengthofcart = 0;
				} else {
					$scope.lengthofcart = resp.data.shoppingCartItems.length;
				}
			});
		}
		$scope.getProductsForCategory = function (subCatObj, subFil) {
			angular.forEach($scope.categoryResults, function (item) {
				angular.forEach(item.subCategory, function (item) {
					item.checked = false;
				});
			});
			subFil.checked = true;
			$scope.subCatTitle = subFil.title.replace(/ /g, "_");
			$scope.categoryTitle = subCatObj.title.replace(/ /g, "_");
			$location.path('/searchresults/' + $scope.categoryTitle + "/" + $scope.subCatTitle);
			if ($routeParams.category == "Architects" || $routeParams.category == "Machinery & Equipment" || $routeParams.category == "Wall Paper") {
				var request = {
					code: $scope.subCatTitle
				};
				$http.post(resturl + "/getVendorsList?pageNumber=1&pageSize=5", request).then(function (resp) {
					$scope.pagingincrement = false;
					$scope.pagingnormal = true;
					$scope.vendorCategoryData = resp.data.responseData;
					$scope.vendorcatCount = resp.data.paginationData.totalCount;
					$scope.totalCount = $scope.vendorcatCount;
					$scope.currentPage = resp.data.paginationData.currentPage;
					$scope.pageSize = resp.data.paginationData.pageSize;
					if ($scope.totalCount < $scope.pageSize) {
						$scope.pageSize = $scope.totalCount;
					}
				});
				$scope.showCategoryResponse = false;
				$scope.showBrandResponse = false;
				$scope.showProductResponse = false;
				$scope.showVendorResponse = true;
			}
			else {
				$http.get(resturl + "/categories/" + $scope.subCatTitle + "?pageNumber=1&pageSize=15").then(function (resp) {
					$scope.pagingincrement = false;
					$scope.pagingnormal = true;
					$scope.productsByCategory = resp.data.responseData;
					$scope.prodByCatCount = resp.data.paginationData.totalCount;
					$scope.totalCount = $scope.prodByCatCount;
					$scope.currentPage = resp.data.paginationData.currentPage;
					$scope.pageSize = resp.data.paginationData.pageSize;
					if ($scope.totalCount < $scope.pageSize) {
						$scope.pageSize = $scope.totalCount;
					}

				});
				$scope.subCategoryTitle = $scope.subCatTitle;
				$scope.showCategoryResponse = true;
				$scope.showBrandResponse = false;
				$scope.showProductResponse = false;
				$scope.showVendorResponse = false;
			}
		};
		$scope.prodByCategoryPaging = function (page, pageSize, total) {
			$http.get(resturl + "/categories/" + $scope.subCategoryTitle + "?pageNumber=" + page + "&pageSize=15").then(function (resp) {
				$scope.pagingincrement = true;
				$scope.pagingnormal = false;
				$scope.productsByCategory = resp.data.responseData;
				$scope.prodByCatCount = resp.data.paginationData.totalCount;
				$scope.totalCount = $scope.prodByCatCount;
				$scope.currentPage = resp.data.paginationData.currentPage;
				$scope.pageSize = resp.data.paginationData.pageSize;
				$scope.pagedropSize = $scope.pageSize * $scope.currentPage;
				$scope.currentPage = resp.data.paginationData.currentPage;
				//$scope.pageSize = resp.data.paginationData.pageSize;
				if ($scope.totalCount < $scope.pageSize) {
					$scope.pageSize = $scope.totalCount;
				}
				if ($scope.currentPage == 2) {
					$scope.currentdropPage = $scope.pageSize + 1;
				} else if ($scope.currentPage == 1) {
					$scope.currentdropPage = $scope.currentPage;
				} else {
					$scope.currentdropPage = ($scope.pagedropSize + 1) - $scope.pageSize;
				}
				if ($scope.totalCount < $scope.pagedropSize) {
					$scope.pagedropSize = $scope.totalCount;
				}
			});
			$scope.showCategoryResponse = true;
			$scope.showBrandResponse = false;
			$scope.showProductResponse = false;
			$scope.showVendorResponse = false;
			$window.scrollTo(0, 0);
		};
		$scope.filterCheck = function (filparam, paramval) {
			if (paramval == true)
				$scope.filterIds.push(filparam);
			else {
				$scope.filterIds = jQuery.grep($scope.filterIds, function (a) {
					return a !== filparam;
				});
			}
			var request = {
				filterIds: $scope.filterIds
			};
			$http.post(resturl + "/getProductsByFilters?pageNumber=1&pageSize=15", request).then(function (resp) {
				$scope.pagingincrement = false;
				$scope.pagingnormal = true;
				$scope.productsRespByFilters = resp.data.filteredProducts;
				$scope.filterProdCount = resp.data.paginationData.totalCount;
				$scope.totalCount = $scope.filterProdCount;
				$scope.currentPage = resp.data.paginationData.currentPage;
				$scope.pageSize = resp.data.paginationData.pageSize;
				if ($scope.totalCount < $scope.pageSize) {
					$scope.pageSize = $scope.totalCount;
				}

			});
		};
		$scope.prodByFilterPaging = function (page, pageSize, total) {
			var request = {
				filterIds: $scope.filterIds
			};
			$http.post(resturl + "/getProductsByFilters?pageNumber=" + page + "&pageSize=15", request).then(function (resp) {
				$scope.pagingincrement = true;
				$scope.pagingnormal = false;
				$scope.productsRespByFilters = resp.data.filteredProducts;
				$scope.filterProdCount = resp.data.paginationData.totalCount;
				$scope.totalCount = $scope.filterProdCount;
				$scope.currentPage = resp.data.paginationData.currentPage;
				$scope.pageSize = resp.data.paginationData.pageSize;
				$scope.pagedropSize = $scope.pageSize * $scope.currentPage;
				$scope.currentPage = resp.data.paginationData.currentPage;
				if ($scope.totalCount < $scope.pageSize) {
					$scope.pageSize = $scope.totalCount;
				}
				if ($scope.currentPage == 2) {
					$scope.currentdropPage = $scope.pageSize + 1;
				} else if ($scope.currentPage == 1) {
					$scope.currentdropPage = $scope.currentPage;
				} else {
					$scope.currentdropPage = ($scope.pagedropSize + 1) - $scope.pageSize;
				}
				if ($scope.totalCount < $scope.pagedropSize) {
					$scope.pagedropSize = $scope.totalCount;
				}
			});
		};

		// On Seearch Select Method //
		$scope.onSelect = function (searchSelected, $item, $model, $label, $event, searchType) {
			$(".menu-search input").val("");
			$(".menu-search .input > .fa").trigger("click");
			if (searchType == "Category") {
				var request = {
					searchString: searchSelected
				};
				$http.post(resturl + "/getProductByCategorySelection", request).then(function (resp) {
					if (resp.data.categoryData != null) {
						$scope.noReultsMessage = false;
						$scope.categoryResults = resp.data.categoryData;
						$scope.categoryTitle = resp.data.categoryData[0].title.replace(/ /g, "_");
						$scope.subCategoryTitle = resp.data.categoryData[0].subCategory[0].title.replace(/ /g, "_");
						if ($scope.categoryTitle == "Architects" || $scope.categoryTitle == "Machinery_&_Equipment" || $scope.categoryTitle == "Wall_Paper") {
							$scope.categoryResults[0].subCategory[0].checked = true;
							$scope.showVendorResponse = true;
							$scope.showCategoryResponse = false;
							$scope.showBrandResponse = false;
							$scope.showProductResponse = false;
							var request = { code: $scope.subCategoryTitle };
							$http.post(resturl + "/getVendorsList?pageNumber=1&pageSize=5", request).then(function (resp) {
								$scope.pagingincrement = false;
								$scope.pagingnormal = true;
								$scope.vendorCategoryData = resp.data.responseData;
								$scope.vendorcatCount = resp.data.paginationData.totalCount;

								$scope.totalCount = $scope.vendorcatCount;
								$scope.currentPage = resp.data.paginationData.currentPage;
								$scope.pageSize = resp.data.paginationData.pageSize;
								if ($scope.totalCount < $scope.pageSize) {
									$scope.pageSize = $scope.totalCount;
								}
								for (a = 0; a < $scope.categoryResults.length; a++) {
									for (b = 0; b < $scope.categoryResults[a].subCategory.length; b++) {
										if ($scope.categoryResults[a].subCategory[b].title == $scope.subCategoryTitle) {
											$scope.categoryResults[a].subCategory[b].checked = true;
										}
									}
								}
							});
						}
						else {
							$http.get(resturl + "/categories/" + $scope.subCategoryTitle + "?pageNumber=1&pageSize=15").then(function (resp) {
								$scope.pagingincrement = false;
								$scope.pagingnormal = true;
								$scope.productsByCategory = resp.data.responseData;
								$scope.prodByCatCount = resp.data.paginationData.totalCount;
								$scope.currentPage = resp.data.paginationData.currentPage;
								$scope.pageSize = resp.data.paginationData.pageSize;
								if ($scope.totalCount < $scope.pageSize) {
									$scope.pageSize = $scope.totalCount;
								}
								$(".menu-search input").val("");
								$scope.categoryResults[0].subCategory[0].checked = true;
								$scope.showCategoryResponse = true;
								$scope.showBrandResponse = false;
								$scope.showProductResponse = false;
								$scope.showVendorResponse = false;
							});
						}
						// $location.path('/searchresults/'+$scope.categoryTitle+"/"+$scope.subCategoryTitle);
					}
					else {
						$scope.noResults = searchSelected;
						$scope.noReultsMessage = true;
						$scope.pagingincrement = false;
						$scope.pagingnormal = false;
						$scope.categoryResults = "";
						$scope.productsByCategory = "";
						$scope.prodByCatCount = 0;
						$(".menu-search input").val("");
					}
				});
			}

			// Brand Search From Search Results Page //
			else if (searchType == "Brand") {
				$scope.request = {
					searchFilterString: searchSelected
				};
				$http.post(resturl + "/getFiltersBySearch", $scope.request).then(function (resp) {
					if (resp.data.filteredData[0] != undefined) {
						$scope.noReultsMessage = false;
						$scope.brandResults = resp.data.filteredData;
						$scope.brandResults[0].filterTypes[0].checked = true;
						var request = {
							"filterIds": [$scope.brandResults[0].filterTypes[0].filterTypeId]
						};
						$http.post(resturl + "/getProductsByFilters?pageNumber=1&pageSize=15", request).then(function (resp) {
							$scope.productsRespByFilters = resp.data.filteredProducts;
							$scope.filterProdCount = resp.data.paginationData.totalCount;
							$(".menu-search input").val("");
						});
					}
					else {
						$scope.noResults = searchSelected;
						$scope.noReultsMessage = true;
						$scope.pagingincrement = false;
						$scope.pagingnormal = false;
						$scope.brandResults = "";
						$scope.productsRespByFilters = "";
						$scope.filterProdCount = 0;
						$(".menu-search input").val("");
					}
				});
				$scope.showCategoryResponse = false;
				$scope.showBrandResponse = true;
				$scope.showProductResponse = false;
				$scope.showvendorResponse = false;
			}
			// Products Search From Search Page //
			else {
				$scope.showCategoryResponse = false;
				$scope.showBrandResponse = false;
				$scope.showProductResponse = true;
				$scope.showvendorResponse = false;
				var searchRequest = {
					searchString: searchSelected
				};
				$http.post(resturl + "/getProductsBySearch", searchRequest).then(function (response) {
					if (response.data.filteredProducts[0] != undefined) {
						$scope.noReultsMessage = false;
						$scope.pagingincrement = false;
						$scope.pagingnormal = true;
						$scope.getsearchResults = response.data.filteredProducts;

						$scope.totalCount = response.data.paginationData.totalCount;
						//  $scope.totalCount = $scope.totalCount;
						$scope.currentPage = response.data.paginationData.currentPage;
						$scope.pageSize = response.data.paginationData.pageSize;
						if ($scope.totalCount < $scope.pageSize) {
							$scope.pageSize = $scope.totalCount;
						}
						$(".menu-search input").val("");
					}
					else {
						$scope.noResults = searchSelected;
						$scope.noReultsMessage = true;
						$scope.pagingincrement = false;
						$scope.pagingnormal = false;
						$scope.getsearchResults = "";
						$(".menu-search input").val("");
					}
				});
			}
		};

		$http.get(resturl + "/getRecommendedProduct").then(function (resp) {
			$scope.recommend = resp.data.recommendedProducts;
			$scope.RecomendLoaded = true;
			$scope.slickrecommendedprocutsConfig = {
				dots: false,
				arrows: false,
				infinite: true,
				slidesToShow: 4,
				slidesToScroll: 1,
				autoplay: true,
				autoplayspeed: 500,
				responsive: [
					{
						breakpoint: 1024,
						settings: {
							arrows: false,
							centerMode: true,
							centerPadding: '40px',
							slidesToShow: 3,
							slidesToScroll: 1
						}
					},
					{
						breakpoint: 800,
						settings: {
							arrows: false,
							centerMode: true,
							centerPadding: '40px',
							slidesToShow: 2,
							slidesToScroll: 1
						}
					},
					{
						breakpoint: 767,
						settings: {
							arrows: false,
							centerMode: true,
							centerPadding: '40px',
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}]
			};
		});
		$http.get(resturl + "/getRecentBought").then(function (resp) {
			$scope.recently = resp.data.recentlyBought;
			$scope.RecentlyLoaded = true;
			$scope.slickrecentbroughtConfig = {
				dots: false,
				arrows: false,
				infinite: true,
				slidesToShow: 4,
				slidesToScroll: 1,
				autoplay: true,
				autoplayspeed: 500,
				responsive: [
					{
						breakpoint: 1024,
						settings: {
							arrows: false,
							centerMode: true,
							centerPadding: '40px',
							slidesToShow: 3,
							slidesToScroll: 1
						}
					},
					{
						breakpoint: 800,
						settings: {
							arrows: false,
							centerMode: true,
							centerPadding: '40px',
							slidesToShow: 2,
							slidesToScroll: 1
						}
					},
					{
						breakpoint: 767,
						settings: {
							arrows: false,
							centerMode: true,
							centerPadding: '40px',
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}]
			};
		});
	}]);