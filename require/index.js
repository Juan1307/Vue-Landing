import { scrollRefs } from './helpers.js';
import HomeComponent from './module/v-home.js';
import NotFound from './notfound.js';

'use sctrict';

((d, w, { createApp }, { createRouter, createWebHashHistory }) => {

	const Router = createRouter({
		history: createWebHashHistory(),
  		routes: [
			{ path:'/',component: HomeComponent },
			{ path:'/home', component: HomeComponent },
			{ path:'/blogs', component: () => import('./module/v-blog.js') },
			{ path:'/portfolio', component: () => import('./module/v-portfolio.js')},
			{ path:'/:pathMatch(.*)*', component: NotFound }
		],
	});

    const render = createApp({
    	data() {
	    	return {
	      		objTabs: {home: true, blogs: false, portfolio: false, contact: false},
	      		pageTheme: false,
	      		scrollY: 0,
	      		onBurguer : false,
	      		onModal: false,
	      		modalFlag: 'contact',
	      		link: null
		    };
		},
	  	computed: {
	  		currentBtnupScroll(){
	  			return { 'show--scroll--btn': this.scrollY >= 550 };
	  		},
	  		currentNavbarScroll(){
	  			return {
	  				'header--hide': this.scrollY >= 100 && this.scrollY < 550,
	  				'header--show': this.scrollY >= 550
	  			};
	  		}
		},
		methods:{
			setLink(val){
				for (const key in this.objTabs) {
					this.objTabs[key] = (key == val) ? true : false;
				}
				if (val == 'contact') return this.openModal();
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
    render.use(Router);
    render.mount('#v-render');

})(document, window, Vue , VueRouter);