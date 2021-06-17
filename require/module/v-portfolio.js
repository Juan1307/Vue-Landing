import { scrollRefs } from './../helpers.js';

export default {
	template:`
	<div>
		<main class="module grid--sys">
	        <div class="main__intro flex--sys">
	            <h1 class="module__title">Portfolio</h1>
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
		                    <img src="assets/imgs/autor.jpg" alt="autor">
		                </div>
		                <div class="qualification__body">
		                    <h3 class="mb--0" v-text="port.title"></h3>
		                    <p v-text="port.description"></p>
		                    <a href="" class="btn btn--secondary flex--sys">
		                        <i class='bx bx-chevron-right bx-sm' ></i> Ver más
		                    </a>
		                </div>
		            </div>
		         </transition-group>
	        <!-- </div> -->
	    </section>
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
			portfolioArr:[
				{ 	flag:'proyect', img:'',
					title:'Sys Rec', description:'Sistema de gestion de recibos.',
					link:'' },
				{ 	flag:'proyect', img:'',
					title:'Sys Res', description:'Sistema de administracion de resoluciones.',
					link:'' },
				{ 	flag:'proyect', img:'',
					title:'Audio App', description:'Aplicacion de musica con espectro',
					link:'' },
				{ 	flag:'proyect', img:'',
					title:'Cafe App', description:'Aplicacion de pedidos de cafe',
					link:'' },
				{ 	flag:'proyect', img:'',
					title:'Lading Page', description:'Pagina de presentacion de Natural.',
					link:'' },
				{ 	flag:'platform', img:'',
					title:'Git y GitHub', description:'Sistema gestor de versiones.',
					link:'' },
				{ 	flag:'platform', img:'',
					title:'Trello', description:'Para gestiòn y flujo de trabajo.',
					link:'' },
				{ 	flag:'platform', img:'',
					title:'Star Uml', description:'Diseño estructura de Apps en lenguaje UML',
					link:'' },
				{ 	flag:'demo', img:'',
					title:'Sis Comentarios', description:'Sistema de comentarios',
					link:'' },
				{ 	flag:'demo', img:'',
					title:'Card Animations', description:'Animaciones a cartas con Css puro.',
					link:'' },
				{ 	flag:'demo', img:'',
					title:'Portfolio plantilla', description:'PLantilla reutilizable para Landings',
					link:'' },
				{ 	flag:'demo', img:'',
					title:'Galeria', description:'Galeria de imagenes',
					link:'' },
				{ 	flag:'demo', img:'',
					title:'Gato game', description:'Juegos de encontrar figuras',
					link:'' }
			]
		}
	},
	computed:{
		portfolioArrFilter(){
			return ( this.strFlag === 'all' ) ? this.portfolioArr : 
					 this.portfolioArr.filter( ({flag}) => this.strFlag === flag);
		}
	},
	methods:{
		setArrContent(flag){
			this.strFlag = flag;
		},
		scrollRefs
	},
	mounted(){
		this.scrollRefs();
	}
}