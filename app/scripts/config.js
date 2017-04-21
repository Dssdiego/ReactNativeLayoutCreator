(function() {

	angular
		.module('app')
		.config(['$mdThemingProvider', configure])
        .config(['$translateProvider', language]);

    function language($translateProvider) {
        $translateProvider
            .translations('pt-br', {
                "SUP_MENU_FILE": "Arquivo",

                "SUP_MENU_NEW_SCENE": "Nova Cena",
                "SUP_MENU_OPEN_SCENE": "Abrir Cena",
                "SUP_MENU_SAVE_SCENE": "Salvar Cena",
                "SUP_MENU_SAVE_SCENE_AS": "Salvar Como...",
                "SUP_MENU_IMPORT": "Importar...",
                "SUP_MENU_EXPORT": "Exportar...",
                "SUP_MENU_TEMPLATES": "Templates...",
                "SUP_MENU_QUIT": "Sair",

                "SUP_MENU_EDIT": "Editar",

                "SUP_MENU_UNDO": "Desfazer",
                "SUP_MENU_REDO": "Refazer",

                "SUP_MENU_CUT": "Cortar",
                "SUP_MENU_COPY": "Copiar",
                "SUP_MENU_PASTE": "Colar",
                "SUP_MENU_SELECT_ALL": "Selecionar Tudo",

                "LAYOUT_PROPS": "Propriedades de Layout",

                "LAYOUT_TITLE": "Título",
                "LAYOUT_BACK_COLOR": "Cor de Fundo",
                "GRID_VISIBILITY": "Visibilidade",
                "GRID_INT_COLOR": "Cor Interna",
                "GRID_EXT_COLOR": "Cor Externa",
                "GRID_HEIGHT": "A",
                "GRID_WIDTH": "L",

                "COMPONENT_PROPS": "Propriedades do Componente",

                "COMPONENT_STATUS_BAR": "Status Bar",
                "COMPONENT_TEXT": "Texto",
                "COMPONENT_BUTTON": "Botão",
                "COMPONENT_IMG": "Imagem",
                "COMPONENT_MAP_VIEW": "MapView",
                "COMPONENT_REFRESH_CONTROL": "Refresh Control",

                "TOAST_API": "Toast",
                "VIBRATION_API": "Vibração",
                "NOTIFICATION_API": "Notificação",
                "FIREBASE_API": "Firebase",
                "FACE_LOGIN_API": "Login do Facebook",
                "TWITTER_LOGIN_API": "Login do Twitter",
                "GOOGLE_LOGIN_API": "Login do Google",

                "LANG_EN": "Inglês",
                "LANG_PT-BR": "Português",
                "LANG_FR": "Francês",
                "LANG_CHOOSER": "Seletor de Idioma",
                "LANG": "Idioma:",

                "THEME_CHOOSER": "Seletor de Tema",
                "THEME": "Tema:",

                "TEMPLATE_CHOOSER": "Escolha seu template",

                "NO_COMPONENT": "Não há nenhum componente selecionado no momento",
            })
						.translations('fr', {
                "SUP_MENU_FILE": "Fichier",

                "SUP_MENU_NEW_SCENE": "Nouvelle Scène",
                "SUP_MENU_OPEN_SCENE": "Scène Ouverte",
                "SUP_MENU_SAVE_SCENE": "Sauver la Scène",
                "SUP_MENU_SAVE_SCENE_AS": "Enregistrer Sous...",
                "SUP_MENU_IMPORT": "Importer...",
                "SUP_MENU_EXPORT": "Exportation...",
                "SUP_MENU_TEMPLATES": "Modèle...",
                "SUP_MENU_QUIT": "Sortie",

                "SUP_MENU_EDIT": "Editar",

                "SUP_MENU_UNDO": "Annuler",
                "SUP_MENU_REDO": "Refaire",

                "SUP_MENU_CUT": "Couper",
                "SUP_MENU_COPY": "Copie",
                "SUP_MENU_PASTE": "Coller",
                "SUP_MENU_SELECT_ALL": "Tout Sélectionner",

                "LAYOUT_PROPS": "Propriétés de Mise en Page",

                "LAYOUT_TITLE": "Titre",
                "LAYOUT_BACK_COLOR": "Couleur de Fond",
                "GRID_VISIBILITY": "Visibilité",
                "GRID_INT_COLOR": "Couleur Interne",
                "GRID_EXT_COLOR": "Couleur Externe",
                "GRID_HEIGHT": "T",
                "GRID_WIDTH": "L",

                "COMPONENT_PROPS": "Propriétés des Composants",

                "COMPONENT_STATUS_BAR": "Status Bar",
                "COMPONENT_TEXT": "Texte",
                "COMPONENT_BUTTON": "Bouton",
                "COMPONENT_IMG": "Image",
                "COMPONENT_MAP_VIEW": "MapView",
                "COMPONENT_REFRESH_CONTROL": "Refresh Control",

                "TOAST_API": "Toast",
                "VIBRATION_API": "Vibration",
                "NOTIFICATION_API": "Notification",
                "FIREBASE_API": "Firebase",
                "FACE_LOGIN_API": "Connexion à Facebook",
                "TWITTER_LOGIN_API": "Connexion à Twitter",
                "GOOGLE_LOGIN_API": "Connexion à Google",

                "LANG_EN": "Anglais",
                "LANG_PT-BR": "Portugais",
                "LANG_FR": "Français",
                "LANG_CHOOSER": "Sélecteur de Langue",
                "LANG": "Langue:",

                "THEME_CHOOSER": "Sélecteur de Thème",
                "THEME": "Thème:",

                "TEMPLATE_CHOOSER": "Choisissez votre modèle",

                "NO_COMPONENT": "Aucun composant n'a été sélectionné",
            })
            .translations('en', {
                "SUP_MENU_FILE": "File",

                "SUP_MENU_NEW_SCENE": "New Scene",
                "SUP_MENU_OPEN_SCENE": "Open Scene",
                "SUP_MENU_SAVE_SCENE": "Save Scene",
                "SUP_MENU_SAVE_SCENE_AS": "Save As...",
                "SUP_MENU_IMPORT": "Import...",
                "SUP_MENU_EXPORT": "Export...",
                "SUP_MENU_TEMPLATES": "Templates...",
                "SUP_MENU_QUIT": "Quit",

                "SUP_MENU_EDIT": "Edit",

                "SUP_MENU_UNDO": "Undo",
                "SUP_MENU_REDO": "Redo",

                "SUP_MENU_CUT": "Cut",
                "SUP_MENU_COPY": "Copy",
                "SUP_MENU_PASTE": "Paste",
                "SUP_MENU_SELECT_ALL": "Select All",

                "LAYOUT_PROPS": "Layout Props",

                "LAYOUT_TITLE": "Title",
                "LAYOUT_BACK_COLOR": "Background Color",
                "GRID_VISIBILITY": "Visibility",
                "GRID_INT_COLOR": "Internal Color",
                "GRID_EXT_COLOR": "External Color",
                "GRID_HEIGHT": "H",
                "GRID_WIDTH": "W",

                "COMPONENT_PROPS": "Props of Component",

                "COMPONENT_STATUS_BAR": "Status Bar",
                "COMPONENT_TEXT": "Text",
                "COMPONENT_BUTTON": "Button",
                "COMPONENT_IMG": "Image",
                "COMPONENT_MAP_VIEW": "MapView",
                "COMPONENT_REFRESH_CONTROL": "Refresh Control",

                "TOAST_API": "Toast",
                "VIBRATION_API": "Vibration",
                "NOTIFICATION_API": "Notification",
                "FIREBASE_API": "Firebase",
                "FACE_LOGIN_API": "Facebook Login",
                "TWITTER_LOGIN_API": "Twitter Login",
                "GOOGLE_LOGIN_API": "Google Login",

                "LANG_EN": "English",
                "LANG_PT-BR": "Portuguese",
                "LANG_FR": "French",
                "LANG_CHOOSER": "Language Selector",
                "LANG": "Language:",

                "THEME_CHOOSER": "Theme Selector",
                "THEME": "Theme:",

                "TEMPLATE_CHOOSER": "Choose your template",

                "NO_COMPONENT": "There is no component selected",
            })
            // .useStaticFilesLoader({
            //    prefix: './translations/locale-pt-br',
            //    suffix: '.json'
            // })
            .preferredLanguage('pt-br')
            .useMissingTranslationHandlerLog();
    }

	function configure($mdThemingProvider) {
	    // Default Theme : Indigo
	    $mdThemingProvider
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

			// Orange
    	$mdThemingProvider
	    	.theme('blueMaterial')
    		.primaryPalette('blue')
    		.accentPalette('orange');

	}

})();
