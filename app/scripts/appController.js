(function(){

	const electron = require('electron');
  const path = require('path');

    const remote = electron.remote;
    const dialog = remote.dialog;
    const app = remote.app;
    const BrowserWindow = remote.BrowserWindow;

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

    const RNCompDefault = {
      view: '<View>',
      styles: 'const styles = StyleSheet.create({',
      import: 'import {'
    }

    const RNComp = {
      textImport: RNCompDefault.import + '\n  Text,',
      text: RNCompDefault.view + '\n        <Text style={styles.text}>InsertedText</Text>',
      textProps: RNCompDefault.styles + '\ntext: {\n' + '  color: \'black\',' +
                 '\n  textAlignVertical: \'center\'' + '\n}',

    }

	angular
		.module('app', ['ngMaterial', 'ngAnimate', 'tb-color-picker', 'Chronicle', 'pascalprecht.translate'])
		.controller('AppController', ['$scope', 'logger', 'Chronicle', AppController])
    .controller('InternalGridController', ['$scope', 'logger', InternalGridController])
    .controller('ExternalGridController', ['$scope', 'logger', ExternalGridController])
    .controller('WindowController', ['$scope', 'logger', WindowController])
    .controller('LanguageSwitchController', ['$scope', '$translate', LanguageSwitchController]);

  function LanguageSwitchController($scope, $translate) {
      $scope.changeLanguage = function(langKey) {
        $translate.use(langKey);
      };
  }

	function AppController($scope, logger, Chronicle, $translate, $timeout) {

    $scope.lang = 'pt-br';
    $scope.selectedComp = null;
    $scope.oldText = null;

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

        var canvas = document.getElementById("elementCanvas");        

        canvas.style.backgroundColor = newColor;
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

         var canvas = document.getElementById("androidCanvas");
         $scope.chronicle = Chronicle.record('canvas', canvas);
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

      // Windows
      this.closeWindow = function() {
          var window = remote.getCurrentWindow();
          window.close();
      }

      this.setLayoutTitle = function(title) {
        tabs[$scope.selectedIndex].title = title;
      }

      // this.placeComponent = function(component) {
      //   this.drawOnCanvas(component);
      //   this.createRNComp(component);
      // }

      // Canvas
      this.drawStatusBar = function() {
        // var statusBar = document.createElement("img");
        // statusBar.src = "./../assets/images/action-bar.png";
        // document.getElementById("elementCanvas").appendChild(actBar);

        $scope.selectedComp = 'status-bar';

        // this.createRNComp('action-bar');
      }

      this.drawActionBar = function() {
        var actBar = document.createElement("img");
        actBar.src = "./../assets/images/action-bar.png";
        document.getElementById("elementCanvas").appendChild(actBar);

        $scope.selectedComp = 'action-bar';

        // this.createRNComp('action-bar');
      }

      this.drawNavDrawer = function() {
        $scope.selectedComp = 'nav-drawer';
      }

      this.drawListView = function() {
        $scope.selectedComp = 'list-view';
      }

      this.drawGridView = function() {
        $scope.selectedComp = 'grid-view';
      }

      this.drawTabView = function() {
        $scope.selectedComp = 'tab-view';
      }

      this.drawMapView = function() {
        $scope.selectedComp = 'map-view';
      }

      this.drawTouchHighlight = function() {
        $scope.selectedComp = 'touch-highlight';
      }

      this.drawTouchNatFeedback = function() {
        $scope.selectedComp = 'touch-natFeedback';
      }

      this.drawTouchOpacity = function() {
        $scope.selectedComp = 'touch-opacity';
      }

      this.drawText = function() {
        var txt = document.createElement("P");
        txt.text = "Texto";
        document.getElementById("elementCanvas").appendChild(txt);

        $scope.selectedComp = 'text';

        this.createRNComp('text');
      }

      this.drawButton = function() {
        var btn = document.createElement("button");
        btn.text = "Botão de Teste";
        document.getElementById("elementCanvas").appendChild(btn);

        $scope.selectedComp = 'button';

        // this.createRNComp('btn');
      }

      this.drawImage = function() {
        var img = document.createElement("img");
        img.width = 60;
        img.height = 60;
        document.getElementById("elementCanvas").appendChild(img);

        $scope.selectedComp = 'image';

        // this.createRNComp('img');
      }

      // this.drawDatePicker = function() {}

      this.drawFAB = function() {
        var fab = document.createElement("img");
        fab.src = "./../assets/icons/plus-circle.svg";
        fab.width = 60;
        fab.height = 60;
        document.getElementById("elementCanvas").appendChild(fab);

        $scope.selectedComp = 'fab';

        // this.createRNComp('fab');
      }

      // this.drawRefreshControl = function() {}

      // Canvas
      // this.drawOnCanvas = function(component) {

      //   var canvas = document.getElementById("androidCanvas");
      //   var ctx = canvas.getContext('2d');

      //   if (canvas.getContext) {

      //     switch (component) {
      //       case 'status-bar':
      //         var imgHora = new Image();

      //         imgHora.onload = function() {
      //           ctx.drawImage(imgHora, 400, 0);
      //         }
      //         imgHora.src = "./../assets/icons/wifi.svg";

      //         ctx.globalAlpha = 0.4;
      //         ctx.fillStyle = matColors.teal;
      //         ctx.fillRect(0, 0, canvas.width, 20);
      //         ctx.globalAlpha = 1;

      //         ctx.font = "16px Roboto Regular";
      //         ctx.fillStyle = "white";
      //         ctx.fillText("12:30", 455, 15);

      //         $scope.selectedComp = 'status-bar';
      //         break;
      //       case 'text':
      //         ctx.font = "26px Roboto Regular";
      //         ctx.fillStyle = "black";
      //         ctx.fillText("Texto", 220, 450);

      //         $scope.selectedComp = 'text';
      //         break;
      //       case 'button':
      //         $scope.selectedComp = 'button';
      //         break;
      //       case 'fab':
      //         var X = 435;
      //         var Y = 835;
      //         var radius = 35;

      //         ctx.beginPath();
      //         ctx.arc(X, Y, radius, 0, 2 * Math.PI, false);
      //         ctx.fillStyle = matColors.pink;
      //         ctx.fill();
      //         ctx.lineWidth = 2;
      //         ctx.strokeStyle = 'black';
      //         ctx.stroke();

      //         $scope.selectedComp = 'fab';
      //         break;
      //       default:
      //         console.log('Entrou no default');
      //     }
      //   }
      // }

      this.createRNComp = function(component) {
        switch(component) {
            case 'text':
                var leitura = jetpack.read(temp.path('Sem Titulo.js'));
                var res = leitura.replace(RNCompDefault.view,RNComp.text);

                if (res.search('Text,') < 0)
                  res = res.replace(RNCompDefault.import,RNComp.textImport);

                res = res.replace(RNCompDefault.styles,RNComp.textProps);

                jetpack.writeAsync(temp.path('Sem Titulo.js'), res);
                break;
            default:
                console.log('Entrou no default');
        }
      }

    // this.drawTextOnCanvas = function(text) {
    //   var canvas = document.getElementById("androidCanvas");
    //   var ctx = canvas.getContext('2d');

    //   if (canvas.getContext) {
    //     canvas.width = canvas.width;
    //     ctx.translate(canvas.width / 2, canvas.height / 2);
    //     ctx.font = '18pt Calibri';
    //     ctx.textAlign = 'center';
    //     ctx.fillStyle = '#000';
    //     ctx.fillText(text, 0, 0);
    //   }
    // }

    this.onChangeText = function(newText) {
      var leitura = jetpack.read(temp.path('Sem Titulo.js'));
      
      // this.drawTextOnCanvas(newText);

      setTimeout(function () {
        var res = leitura.replace('InsertedText', newText);

        jetpack.writeAsync(temp.path('Sem Titulo.js'), res);
      }, 10000);
    }

      this.showComponentProps = function(component, visibility) {
        if (visibility == true)
          return component.style.visibility = visibility;
        else
          return component.style.visibility = !visibility;
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

      // Chronicle
      this.undo = function() {
        $scope.chronicle.undo();
      }

      this.redo = function() {
        $scope.chronicle.redo();
      }

      // Idioma
      this.changeLanguage = function(langKey)  {
        console.log('Mudando idioma para: ' + langKey);
        console.log($translate);
        $translate.use(langKey);
      }

      this.templateChooser = function() {
        const modalPath = path.join('file://', __dirname, '/screens/templateChooser.html');
        let w_templateChooser = new BrowserWindow({
            name: "Template Chooser",
            width: 800,
            height: 600,
            toolbar: true,
            frame: false
        });
        w_templateChooser.on('close', function () { win = null });
        w_templateChooser.loadURL(modalPath);
        w_templateChooser.show(); 
    }

    this.showTemplate = function(item) {
      switch (item) {
          case 'navDrawer':
              console.log('Diego');
          break;
          case 'listView':
          break;
          case 'tabView': 
          break;
          case 'gridView':
          break;
      }
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

  function WindowController($scope, logger) {

    this.langChooser = function() {
      const modalPath = path.join('file://', __dirname, '/screens/langChooser.html');
      console.log(modalPath);
      let w_langChooser = new BrowserWindow({
          name: "Lang Chooser",
          width: 320,
          height: 240,
          toolbar: true,
          frame: false
      });
      w_langChooser.on('close', function () { win = null });
      w_langChooser.loadURL(modalPath);
      w_langChooser.show(); 
    }

    this.themeChooser = function() {
      const modalPath = path.join('file://', __dirname, '/screens/themeChooser.html');
      console.log(modalPath);
      let w_themeChooser = new BrowserWindow({
          name: "Theme Chooser",
          width: 320,
          height: 240,
          toolbar: true,
          frame: false
      });
      w_themeChooser.on('close', function () { win = null });
      w_themeChooser.loadURL(modalPath);
      w_themeChooser.show(); 
    }

    this.commandList = function() {
      const modalPath = path.join('file://', __dirname, '/screens/commandList.html');
      console.log(modalPath);
      let w_commandList = new BrowserWindow({
          name: "Command List",
          width: 320,
          height: 240,
          toolbar: true,
          frame: false
      });
      w_commandList.on('close', function () { win = null });
      w_commandList.loadURL(modalPath);
      w_commandList.show();
    }

  }
	
})();