(function(){

	const electron = require('electron');

    const remote = electron.remote;
    const dialog = remote.dialog;
    const app = remote.app;

    var platform = 'android';
    var layout = 'code';

    // Jetpack - File API Manager
    var jetpack = require('fs-jetpack');
    var template = jetpack.cwd('app/templates');
    var destCode = jetpack.dir('export/code');
    var destImages = jetpack.dir('export/images');
    var temp = jetpack.dir('temp', { empty: true });

    var contNewScene = 0;

    var matColors = {
      red        : '#e51c23',
      pink       : '#E91E63',
      purple     : '#9C27B0',
      deepPurple : '#673AB7',
      indigo     : '#3F51B5',
      blue       : '#2196F3',
      lightBlue  : '#03A9F4',
      cyan       : '#00BCD4',
      teal       : '#009688',
      green      : '#4CAF50',
      lightGreen : '#8BC34A',
      lime       : '#CDDC39',
      yellow     : '#FFEB3B',
      amber      : '#FFC107',
      orange     : '#FF9800',
      deepOrange : '#FF5722',
      brown      : '#795548',
      grey       : '#9E9E9E',
      blueGrey   : '#607D8B'
    };

	angular
		.module('app', ['ngMaterial', 'ngAnimate', 'tb-color-picker'])
		.controller('AppController', ['$scope', 'logger', AppController])
    .controller('InternalGridController', ['$scope', 'logger', InternalGridController])
    .controller('ExternalGridController', ['$scope', 'logger', ExternalGridController]);

	function AppController($scope, logger) {

    // Color Pickers
    $scope.colorPickerOptions = [
      'transparent',        matColors.red,
      matColors.pink,       matColors.purple,
      matColors.deepPurple, matColors.indigo,
      matColors.blue,       matColors.lightBlue,
      matColors.cyan,       matColors.teal,
      matColors.green,      matColors.lightGreen,
      matColors.lime,       matColors.yellow,
      matColors.amber,      matColors.orange,
      matColors.deepOrange, matColors.brown,
      matColors.grey,       matColors.blueGrey
    ];
    $scope.colorPickerMainColor = matColors.red;

    $scope.colorPickerChanged = function(newColor, oldColor) {
        console.log('from ', oldColor, ' to ', newColor);

        var canvas = document.getElementById("androidCanvas");        

        canvas.style.background = newColor;
    }

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
        var inputLayoutTitle = document.getElementById("inputLayoutTitle");
        var index = tabs.indexOf(tab);
        
        inputLayoutTitle.value = null;
	    	
        tabs.splice(index, 1);
	    }

      // Disable Buttons
	    this.disableSaveBtn = function(){
	    	if (tabs.length == 0)
	    		return true;
	    	else
	    		return false;
	    }

      this.disableFormatText = function() {
        return true;
      }

      this.disableFormatLayout = function() {
        return true;
      }

      // Toggle Platform/Layout
      
      this.togglePlatform  = function() {
        if (platform == 'android')
          platform = 'ios';
        else if (platform == 'ios')
          platform = 'android';
      }

      this.changePlatformIcon = function() {
        if (platform == 'android')
          return false;
        else
          return true;
      }

      // Toggle Design/Code Layout
      
      this.toggleLayout = function() {
        if (layout == 'design')
          layout = 'code';
        else if (layout == 'code')
          layout = 'design';
      }

      this.changeLayoutIcon = function() {
        if (layout == 'design')
          return false;
        else
          return true;
      }

      // Menus
		  this.openMenu = function($mdOpenMenu, ev) {
	        originatorEv = ev;
	        $mdOpenMenu(ev);
     	}

      // Theme
      this.changeTheme = function(theme) {
        console.log($scope.theme);
        $scope.theme = theme;
        // $mdThemingProvider.setDefaultTheme(theme);
      }

      // Scene
    	this.newScene = function(title, view) {
		     var saveBtn = document.getElementById("menuSaveBtn");
         var defaultView = jetpack.read(template.path('rnlDefault.js'));
         var templatePath = template.path('');

         var inputLayoutTitle = document.getElementById("inputLayoutTitle");

         inputLayoutTitle.value = null;

    		 view = view || title + " Content View";
    		 tabs.push({ title: title, content: view, disabled: false});
    		
    	   saveBtn.ngDisabled = "false";

         console.log('contNewScene: ' + contNewScene);

         // Criação de Arquivos
         if (contNewScene == 0){
           temp.write('' + title + '.js', defaultView);
           temp.write('' + title + '.rnl', 'path: \'' + templatePath + '\'\ntitle: \'' + title + '\'');
         }
         else{
           temp.write('' + title + '_' + contNewScene + '.js', defaultView);
           temp.write('' + title + '_' + contNewScene + '.rnl', 'path: \'' + templatePath + '\'\ntitle: \'' + title + '_' + contNewScene + '\'');
         }

         // template.copy('rnlDefault.js', temp.path('Sem Titulo.js'));

         contNewScene = contNewScene + 1;
    	}

    	this.openScene = function() {
      	dialog.showOpenDialog({
        	properties: ['openFile']
      	});
    	}

    	this.saveScene = function () {
    		const options = {
	    	  title: 'Salvar Cena',
	      }
	      dialog.showSaveDialog(options);
    	}

    	this.saveSceneAs = function () {
    		const options = {
	    	  title: 'Salvar Cena Como...',
	      }
	      dialog.showSaveDialog(options);
    	}

    	this.exitApp = function() {
    	  	app.quit();
      }

      // Dialogs
      this.showCommandsDialog = function() {
        // TODO: Mostar nova janela com todos os atalhos disponíveis
      }

      // Windows
      this.closeWindow = function() {
          var window = remote.getCurrentWindow();
          window.close();
      }

      // Component Creation
      this.createText = function(content) {
        
        var leitura = jetpack.read(temp.path('Sem Titulo.js'));
        console.log('leitura: ' + leitura);
      }

      this.setLayoutTitle = function(title) {
        tabs[$scope.selectedIndex].title = title;
      }

      // Canvas
      this.drawOnCanvas = function(component) {

        var canvas = document.getElementById("androidCanvas");

        switch(component) {
            case 'status-bar':
                if (canvas.getContext) {
                  var ctx = canvas.getContext('2d');

                  ctx.fillStyle = matColors.teal;
                  ctx.fillRect(0,0,300,4);
                }
                break;
            default:
                console.log('Entrou no default');
        }
      }

      // Grid Canvas
      this.enableGridCanvas = function(visible) {
        var gridCanvas = document.getElementById("gridCanvas");

        gridCanvas.style.visibility = (visible ? 'hidden' : 'visible');
      }

      $scope.gridSlider = {
        altura: 100,
        largura: 100
      }     

      this.isGridVisible = function() {

        var gridCanvas = document.getElementById("gridCanvas");

        if (gridCanvas.style.visibility == 'hidden')
          return true;
        else
          return false;
      }

	}

  function InternalGridController($scope, logger) {

    $scope.gridColorOptions = [
      'dimgrey',           matColors.red,
      matColors.blue,      matColors.lime,
      matColors.yellow,    matColors.orange,
      matColors.lightBlue,
    ];

    $scope.internalGridColorChanged = function(newColor, oldColor) {

      var internalGrid = document.getElementById("internalGrid");

      internalGrid.style.stroke = newColor;
    }

  }

  function ExternalGridController($scope, logger) {

    $scope.gridColorOptions = [
      'dimgrey',           matColors.red,
      matColors.blue,      matColors.lime,
      matColors.yellow,    matColors.orange,
      matColors.lightBlue,
    ];

    $scope.externalGridColorChanged = function(newColor, oldColor) {
    
        var externalGrid = document.getElementById("externalGrid");

        externalGrid.style.stroke = newColor;
    }

  }
	
})();