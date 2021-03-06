/* jshint node: true */

module.exports = function (environment) {
	var ENV = {
		modulePrefix: 'nova',
		environment: environment,
		rootURL: '/',
		locationType: 'auto',
		//host: 'https://service4barbers-h2osis.rhcloud.com',
		host: 'http://localhost:8080',
		EmberENV: {
			FEATURES: {
				// Here you can enable experimental features on an ember canary build
				// e.g. 'with-controller': true
			},
			EXTEND_PROTOTYPES: {
				// Prevent Ember Data from overriding Date.parse.
				Date: false
			}
		},

		APP: {
			// Here you can pass flags/options to your application instance
			// when it is created
		}
	};

	ENV['ember-simple-auth'] = {
        routeAfterAuthentication: 'auth',
        routeIfAlreadyAuthenticated: 'auth'
    };

	ENV['ember-simple-auth-token'] = {
		serverTokenEndpoint: ENV.host + '/api/login',
		tokenPropertyName: 'access_token',
	};

	ENV['ember-toastr'] = {
		toastrOptions: {
			closeButton: true,
			debug: false,
			newestOnTop: true,
			progressBar: false,
			positionClass: 'toast-top-right',
			preventDuplicates: true,
			onclick: null,
			showDuration: '5000',
			hideDuration: '1000',
			timeOut: '4000',
			extendedTimeOut: '1000',
			showEasing: 'swing',
			hideEasing: 'linear',
			showMethod: 'fadeIn',
			hideMethod: 'fadeOut'
		}
	};

	ENV['ember-cli-uuid'] = {
		defaultUUID: false
	};

	ENV['emberFullCalendar'] = {
		includeLocales: ['ru'],
		includeScheduler: true
	};

	ENV['moment'] = {
		includeLocales: ['ru']
	};

	ENV['i18n'] = {
		defaultLocale: 'ru'
	};

	if (environment === 'development') {
		// ENV.APP.LOG_RESOLVER = true;
		// ENV.APP.LOG_ACTIVE_GENERATION = true;
		// ENV.APP.LOG_TRANSITIONS = true;
		// ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
		// ENV.APP.LOG_VIEW_LOOKUPS = true;
	}

	if (environment === 'test') {
		// Testem prefers this...
		ENV.locationType = 'none';

		// keep test console output quieter
		ENV.APP.LOG_ACTIVE_GENERATION = false;
		ENV.APP.LOG_VIEW_LOOKUPS = false;

		ENV.APP.rootElement = '#ember-testing';
	}

	if (environment === 'production') { }

	return ENV;
};
