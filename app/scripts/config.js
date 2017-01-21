(function() {

	angular
		.module('app')
		.config(['$mdThemingProvider', configure]);

	function configure($mdThemingProvider) {
	    // Default Theme : Indigo
	    // $mdThemingProvider
	    // 	.theme('default')
    	// 	.primaryPalette('green')
    	// 	.accentPalette('orange');
    	
    	$mdThemingProvider.alwaysWatchTheme(true);

    	// Green
	    $mdThemingProvider
	    	.theme('greenMaterial')
    		.primaryPalette('green')
    		.accentPalette('orange');

    	// Red
    	$mdThemingProvider
	    	.theme('redMaterial')
    		.primaryPalette('red')
    		.accentPalette('amber');

    	// Orange
    	$mdThemingProvider
	    	.theme('orangeMaterial')
    		.primaryPalette('orange')
    		.accentPalette('indigo');

	}

})();