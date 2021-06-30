import { createApp, defineAsyncComponent } from './../assets/js/vue.esm-browser.prod.js';
import { scrollRefs } from './helpers.js';
import HomeComponent from './module/v-home.js';

'use sctrict';

((d, w) => {

	const routes = {
		'/': HomeComponent,
		'/home': HomeComponent,
		'/blogs': defineAsyncComponent( () => import('./module/v-blog.js')),
		'/portfolio': defineAsyncComponent( () => import('./module/v-portfolio.js'))
	};

    const render = createApp({
    	data() {
	    	return {
	    		currentRoute: w.location.pathname,
	      		objTabs: {home: true, blogs: false, portfolio: false, contact: false},
	      		pageTheme: false,
	      		scrollY: 0,
	      		onBurguer : false,
	      		onModal: false,
	      		modalFlag: 'contact',
	      		link: null
		    }
		},
	  	computed: {
	  		currentBtnupScroll(){
	  			return { 'show--scroll--btn': this.scrollY >= 550 };
	  		},
	  		currentNavbarScroll(){
	  			return {
	  				'header--hide': this.scrollY >= 100 && this.scrollY < 550,
	  				'header--show': this.scrollY >= 550
	  			}
	  		},
	    	currentTabComponent() {
	      		// return routes[this.currentRoute]'v-' + this.currentTab.toLowerCase();
	      		return routes[this.currentRoute] || this.notFound();
	    	}
		},
		methods:{
			setRoute(hash){
				this.currentRoute =  `/${hash}`;//out in production
				history.pushState({ref: hash}, hash, this.currentRoute + hash);
			},
			setLink(val){
				for (const key in this.objTabs) {
					this.objTabs[key] = (key == val) ? true : false;
				}
				if (val == 'contact') return this.openModal();
				this.setRoute(val);
			},
			openModal(opt = 'Contacto'){
				this.onModal = true;
				this.modalFlag = opt;
			},
			closeModal(){
				this.onModal = false;
			},
			setTheme(bool, body = d.body){
				if (bool) {
					localStorage.setItem('themeTik', 'dark');
					body.classList.add('dark--theme');
				}else{
					localStorage.clear();
					body.classList.remove('dark--theme');
				}
				this.pageTheme = bool;
			},
			notFound(){
				return w.location.href = '_404.html';
			},
			scrollRefs
		},
		mounted(){
			w.addEventListener('scroll', () => this.scrollY = w.scrollY);
			if (!localStorage.getItem('themeTik')) return;
			else this.setTheme(true);
		}
    });
    render.mount('#v-render');

})(document, window);