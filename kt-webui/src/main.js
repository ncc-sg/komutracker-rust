import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Vue from 'vue';

// Load the Bootstrap CSS
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
Vue.use(BootstrapVue);

import { Datetime } from 'vue-datetime';
import 'vue-datetime/dist/vue-datetime.css';
Vue.component('datetime', Datetime);

// Load the Varela Round font
import 'typeface-varela-round';

// Load the main style
import './style/style.scss';

// Loads all the filters
import './util/filters.js';

// Sets up the routing and the base app (using vue-router)
import router from './route.js';

// Sets up the pinia store
import pinia from './stores';

// Register Font Awesome icon component
Vue.component('icon', () => import('vue-awesome/components/Icon.vue'));

// General components
Vue.component('error-boundary', () => import('./components/ErrorBoundary.vue'));
Vue.component('input-timeinterval', () => import('./components/InputTimeInterval.vue'));
Vue.component('kt-header', () => import('./components/Header.vue'));
Vue.component('kt-footer', () => import('./components/Footer.vue'));
Vue.component('kt-devonly', () => import('./components/DevOnly.vue'));
Vue.component('kt-selectable-vis', () => import('./components/SelectableVisualization.vue'));
Vue.component('kt-selectable-eventview', () => import('./components/SelectableEventView.vue'));
Vue.component('new-release-notification', () => import('./components/NewReleaseNotification.vue'));
Vue.component('user-satisfaction-poll', () => import('./components/UserSatisfactionPoll.vue'));
Vue.component('kt-query-options', () => import('./components/QueryOptions.vue'));
Vue.component('kt-select-categories', () => import('./components/SelectCategories.vue'));
Vue.component('kt-select-categories-or-pattern', () =>
  import('./components/SelectCategoriesOrPattern.vue')
);

// Drawer components
Vue.component('drawer', () => import('./components/Drawer.vue'));
Vue.component('drawer-toggle', () => import('./components/DrawerToggle.vue'));
Vue.component('drawer-nav-item', () => import('./components/DrawerNavItem.vue'));
Vue.component('mac-titlebar', () => import('./components/MacTitlebar.vue'));

// Visualization components
Vue.component('kt-summary', () => import('./visualizations/Summary.vue'));
Vue.component('kt-periodusage', () => import('./visualizations/PeriodUsage.vue'));
Vue.component('kt-eventlist', () => import('./visualizations/EventList.vue'));
Vue.component('kt-sunburst-categories', () => import('./visualizations/SunburstCategories.vue'));
Vue.component('kt-sunburst-clock', () => import('./visualizations/SunburstClock.vue'));
Vue.component('kt-timeline-inspect', () => import('./visualizations/TimelineInspect.vue'));
Vue.component('kt-timeline', () => import('./visualizations/TimelineSimple.vue'));
Vue.component('vis-timeline', () => import('./visualizations/VisTimeline.vue'));
Vue.component('kt-categorytree', () => import('./visualizations/CategoryTree.vue'));
Vue.component('kt-timeline-barchart', () => import('./visualizations/TimelineBarChart.vue'));
Vue.component('kt-calendar', () => import('./visualizations/Calendar.vue'));
Vue.component('kt-custom-vis', () => import('./visualizations/CustomVisualization.vue'));
Vue.component('kt-score', () => import('./visualizations/Score.vue'));

// A mixin to make async method errors propagate
import asyncErrorCapturedMixin from './mixins/asyncErrorCaptured.js';
Vue.mixin(asyncErrorCapturedMixin);

// Set the PRODUCTION constant
// FIXME: Thould follow Vue convention and start with a $.
Vue.prototype.PRODUCTION = PRODUCTION;
Vue.prototype.COMMIT_HASH = COMMIT_HASH;

// Set the $isAndroid constant
Vue.prototype.$isAndroid = process.env.VUE_APP_ON_ANDROID;

// Create an instance of KTClient as this.$kt
// NOTE: needs to be created before the Vue app is created,
//       since stores rely on it having been run.
import { createClient, getClient, configureClient } from './util/ktclient';
createClient();

// Setup Vue app
import App from './App.vue';
new Vue({
  el: '#app',
  router: router,
  render: h => h(App),
  pinia,
});

// Set the $kt global
Vue.prototype.$kt = getClient();

// Must be run after vue init since it relies on the settings store
configureClient();
