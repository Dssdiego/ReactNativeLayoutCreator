(function(){

	const electron = require('electron');

    const remote = electron.remote;
    const dialog = remote.dialog;
    const app = remote.app;

	angular
		.module('app', ['ngMaterial', 'ngAnimate'])
		.controller('AppController', ['$scope', 'logger', AppController]);

	function AppController($scope, logger) {

		// Tabs do Canvas de Desenho
		var tabs = [],
	        selected = null,
	        previous = null;
	    $scope.tabs = tabs;
	    $scope.selectedIndex = 2;
	    $scope.$watch('selectedIndex', function(current, old){
	      previous = selected;
	      selected = tabs[current];
	      if ( old + 1 && (old != current));
	      if ( current + 1 );
	    });

	    this.removeTab = function(tab) {
	    	var index = tabs.indexOf(tab);
      		tabs.splice(index, 1);
	    };

	    this.enableSaveBtn = function(){
	    	if (tabs.length == 0)
	    		return true;
	    	else
	    		return false;
	    };

		  this.openMenu = function($mdOpenMenu, ev) {
	        originatorEv = ev;
	        $mdOpenMenu(ev);
     	};

    	this.newScene = function(title, view) {
		     var saveBtn = document.getElementById("menuSaveBtn");

    		 view = view || title + " Content View";
    		 tabs.push({ title: title, content: view, disabled: false});
    		
    	   saveBtn.ngDisabled = "false";
    	};

    	this.openScene = function() {
      	dialog.showOpenDialog({
        	properties: ['openFile']
      	});
    	};

    	this.saveScene = function () {
    		const options = {
	    	title: 'Salvar Cena',
	    }
	    dialog.showSaveDialog(options)
    	}

    	this.saveSceneAs = function () {
    		const options = {
	    	title: 'Salvar Cena Como...',
	    }
	    dialog.showSaveDialog(options)
    	}

    	this.exitApp = function() {
    	  	app.quit();
      };

	}

	angular
    .module('menuDemoBasic', ['ngMaterial'])
    .config(function($mdIconProvider) {
      $mdIconProvider
        .iconSet("call", 'img/icons/sets/communication-icons.svg', 24)
        .iconSet("social", 'img/icons/sets/social-icons.svg', 24);
    })
    .controller('BasicDemoCtrl', function DemoCtrl($mdDialog) {
      var originatorEv;

      this.notificationsEnabled = true;
      this.toggleNotifications = function() {
        this.notificationsEnabled = !this.notificationsEnabled;
      };

      this.redial = function() {
        $mdDialog.show(
          $mdDialog.alert()
            .targetEvent(originatorEv)
            .clickOutsideToClose(true)
            .parent('body')
            .title('Suddenly, a redial')
            .textContent('You just called a friend; who told you the most amazing story. Have a cookie!')
            .ok('That was easy')
        );

        originatorEv = null;
      };

      this.checkVoicemail = function() {
        // This never happens.
      };
    });

})();