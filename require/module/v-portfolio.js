import { scrollRefs } from './../helpers.js';

export default {
	template:`
	<div>
		<main class="module grid--sys">
	        <div class="main__intro flex--sys">
	            <h1 class="module__title">Portafolio</h1>
	            <article class="module__description">
	                <p>Descubre mis proyectos y demos en desarrollo,</p>
	                <p>de <b>apps</b> y las plataformas que utilizo.</p>
	            </article>
	        </div>
	        <div class="main__autor">
	            <div class="card grid--sys">
	            	<div class="card__image">
	            		<img src="assets/svgs/portfolio.svg" alt="portfolio">
	            	</div>
	            	<div class="card__body">
	            		<h4 class="mb--0">Aqui encontraràs...</h4>
	            		<div class="card__text">
	            			<p class="mb--0">Plaformas de:</p>
	            			<ul class="card__list">
	            				<li>Gestion de proyectos.</li>
	            				<li>Flujo de versiones.</li>
	            				<li>Demos y Componentes</li>
	            			</ul>
	            		</div>
	            	</div>
	            </div>
	        </div>
	    </main>
		<section class="qualifications container--module">
	        <ul class="qualifications__nav flex--sys">
	            <li class="nav__list--item" 
	            	:class="{'item__active': currentTab == stab.tab}" 
	            	v-for="stab in tabsArr" :key="stab.key"
	            	@click="currentTab = stab.tab, setArrContent(stab.key)"><a v-text="stab.tab"></a></li>
	        </ul>
	        <!-- <div class="qualifications__boxes grid--sys"> -->
	        	<transition-group class="qualifications__boxes grid--sys" name="fadeIn" tag="div">
		            <div class="qualification__box" v-for="port in portfolioArrFilter" :key="port.title">
		                <div class="qualification__img">
		                    <img :src="port.img" alt="image-portfolio">
		                </div>
		                <div class="qualification__body">
		                    <h3 class="mb--0" v-text="port.title"></h3>
		                    <p v-text="port.description"></p>
		                    <a class="btn btn--secondary flex--sys" @click="viewImage(port)">
		                        <i class='bx bx-chevron-right bx-sm' ></i> Ver más
		                    </a>
		                </div>
		            </div>
		         </transition-group>
	        <!-- </div> -->
	    </section>
	    
	    <div class="modal__image" :class="{'open': currentImage.img.length !== 0}" @click="outImage">
	    	<img class="image__modal" :class="{'open': currentImage.img.length !== 0}" :src="currentImage.img">
	    	<p class="image__text" v-text="currentImage.title"></p>
	    </div>
	</div>
	`,
	data(){
		return{
			currentTab : 'Todos',
			strFlag : 'all',
			tabsArr:[ {tab:'Todos',key:'all'},
					  {tab:'Proyectos',key:'proyect'},
					  {tab:'Plataformas',key:'platform'},
					  {tab:'Demos',key:'demo'} ],
			currentImage: {img:'', title:''},
			portfolioArr:[
				{ 	flag:'proyect', img:'assets/imgs/recibe.png',
					title:'Sys Rec', description:'Sistema de gestion de recibos.',
					link:'' },
				{ 	flag:'proyect', img:'assets/imgs/archive.jpg',
					title:'Sys Res', description:'Sistema de administracion de resoluciones.',
					link:'' },
				{ 	flag:'proyect', img:'assets/imgs/audioapp.jpg',
					title:'Audio App', description:'Aplicacion de musica con espectro',
					link:'' },
				{ 	flag:'proyect', img:'assets/imgs/blogs.jpg',
					title:'Blog App', description:'App con blogger para blogs',
					link:'' },
				{ 	flag:'proyect', img:'assets/imgs/landing.jpg',
					title:'Landing Page', description:'Plantilla reutilizable para landings.',
					link:'' },
				{ 	flag:'platform', img:'assets/imgs/github.jpg',
					title:'Git y GitHub', description:'Sistema gestor de versiones.',
					link:'' },
				{ 	flag:'platform', img:'assets/imgs/trello.jpg',
					title:'Trello', description:'Para gestiòn y flujo de trabajo.',
					link:'' },
				{ 	flag:'platform', img:'assets/imgs/staruml.jpg',
					title:'Star Uml', description:'Diseño estructura de Apps en lenguaje UML.',
					link:'' },
				{ 	flag:'platform', img:'assets/imgs/balsamiq.jpg',
					title:'Balsamiq', description:'Diseño de prototipado de Aplicaciones.',
					link:'' },
				{ 	flag:'demo', img:'assets/imgs/comments.jpg',
					title:'Sys Comentarios', description:'Sistema de comentarios con fecth',
					link:'' },
				{ 	flag:'demo', img:'assets/imgs/transforms.jpg',
					title:'Animations', description:'Animaciones a elementos con css puro.',
					link:'' },
				{ 	flag:'demo', img:'assets/imgs/webnatural.jpg',
					title:'Web Natural', description:'Landing page natural.',
					link:'' },
				{ 	flag:'demo', img:'assets/imgs/galery.jpg',
					title:'Galeria', description:'Galeria de imagenes con APi fecth',
					link:'' },
				{ 	flag:'demo', img:'assets/imgs/timer.jpg',
					title:'Reloj', description:'Reloj con captura de tiempo.',
					link:'' }
			]
		}
	},
	computed:{
		portfolioArrFilter(){
			return ( this.strFlag === 'all' ) ? this.portfolioArr : 
					 this.portfolioArr.filter( ({ flag }) => this.strFlag === flag);
		}
	},
	methods:{
		viewImage({img, title}){
			this.currentImage.img = img;
			this.currentImage.title = title;
		},
		outImage(){
			this.currentImage.img = '';
			this.currentImage.title = '';
		},
		setArrContent(flag){
			this.strFlag = flag;
		},
		scrollRefs
	},
	mounted(){
		this.scrollRefs();
	}
}