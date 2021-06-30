import { scrollOffs, scrollRefs } from './../helpers.js';

export default {
	template: `
		<div>
		<main class="main grid--sys container--fluid">
			<div class="main__intro flex--sys">
				<h1 class="main__title">Antik</h1>
				<article class="main__description">
					<p>Soy <b>Juan Cabanillas</b> y desarrollador de</p>
					<p>aplicaciones enfocado al entorno web</p>
					<p>y multiplataforma</p>
				</article>
				<div class="main__button">
					<a href="https://codepen.io/antik133up" target="__blank" class="icon__main"><i class='bx bxl-codepen bx-sm '></i></a>
					<a href="https://github.com/Juan1307" target="__blank" class="icon__main"><i class='bx bxl-github bx-sm '></i></a>
					<a href="https://www.linkedin.com/in/juan-antoni-cabanillas-chuquiruna-20a449174/" target="__blank" class="icon__main"><i class='bx bxl-linkedin bx-sm '></i></a>
				</div>
			</div>
			<figure class="main__autor">
			  	<img src="assets/svgs/developer.svg" alt="developer">
			  	<figcaption class="main__autor--ref">
				  	<p>Single Page App (SPA).</p>
				  	<p>Multiplatform Apps (Native).</p>
				  	<p>Progresive Web Aplications (PWA).</p>

			  		<button class="btn btn--primary" @click="downloadCV">Descargar CV</button>
			  	</figcaption>
			</figure>
			<div class="btn__down text--center">

				<button class="btn btn--out--primary lg--block" 
					@click="scrollOffs(refdata)"> 
					<i class='bx bx-chevron-down bx-md bx-burst'></i>
				</button>
				
				<button class="btn btn--out--primary md--block" 
					@click="scrollOffs(refdata,0)"> 
					<i class='bx bx-chevron-down bx-md bx-burst'></i>
				</button>
			</div>
		</main>

		<section class="about container--normal" :ref="(el) => refdata = el">
			<h1 class="section--title text--center bx-md">Sobre mi</h1>
			<div class="about__content grid--sys">
				<figure class="about__image flex--sys">
					<div class="about__autor">
						<img class="rounded" src="assets/imgs/autor.jpg" alt="autor">
						<figcaption class="about__text"> <b>Dev :</b> Juan Cabanillas.</figcaption>
					</div>
				</figure>
				<article class="about__description text--center">
					<p>Soy desarrollador, enfocado a tecnologias modernas y metodologias de desarrollo solidas y expansibles, mi objetivo es desempeñarme eficasmente en esta industria a traves de la colaboraciòn con metas propuestas en este campo.</p>
					<div class="about__qualifications grid--sys">
						<div class="about__qualifications--pro ">
							<p>+ 4</p>
							<p>WebApps</p>	
						</div>

						<div class="about__qualifications--pro">
							<p>10</p>
							<p>Demo Scripts</p>	
						</div>

						<div class="about__qualifications--pro">
							<p>+ 9</p>
							<p>Sub Apps</p>	
						</div>

						<div class="card__line">
							<div class="card__text flex--sys">
								<i class='bx bx-sync bx-md' ></i>
								<span>Reactivo</span>
							</div>
							<div class="card__line--bar"></div>
						</div>
						<div class="card__line">
							<div class="card__text flex--sys">
								<i class='bx bx-line-chart bx-md' ></i>
								<span>Progresivo</span>
							</div>
							<div class="card__line--bar"></div>
						</div>
						<div class="card__line">
							<div class="card__text flex--sys">
								<i class='bx bx-category-alt bx-md'></i>
								<span>Modular</span>
							</div>
							<div class="card__line--bar"></div>
						</div>
					</div>
				</article>
			</div>
			<div class="about__skills grid--sys">
				<div class="skill__square square--left flex--sys skill__one">
					<div class="skill__content">
						<h3 class="mb--0">Front Stack</h3>
						<p>Conformado por marcos de desarrollo y tecnologias populares como HTML - CSS - JS donde los marcos desempeñan un desarrollo enfocado a la reactividad.</p>
						<ul class="skill__list">
							<li><i class='bx bxl-bootstrap bx-sm'></i> Bootstrap</li>
							<li><i class='bx bxl-vuejs bx-sm'></i> Vue js</li>
							<li><i class='bx bxl-javascript bx-sm' ></i> Vanilla JS</li>
						</ul>
					</div>
				</div>
				<figure class="skill__image skill__two">
					<img src="assets/svgs/ux_desing.svg" alt="ux_desing">
					<ul class="skill__desc text--end">
						<li>Diseño UX -</li>
						<li>Responsive Desing -</li>
						<li>Flex Box y Grid Layout -</li>
					</ul>
				</figure>

				<figure class="skill__image skill__three">
					<img src="assets/svgs/backend.svg" alt="backend">
					<figcaption class="skill__desc">
						<ul class="skill__desc text--start">
							<li>- Patron MVC.</li>
							<li>- POO y modelo Funcional.</li>
							<li>- Arquitectura basada en SOLID.</li>
						</ul>
					</figcaption>		
				</figure>
				<div class="skill__square square--right skill__four">
					<div class="skill__content text--end">
						<h3 class="mb--0">Back Stack</h3>
						<p>Lenguajes y marcos del lado del servidor para procesos complejos, enfocados a la gestiòn de datos relacionales o no relacionales con datos destructurados.</p>
						<ul class="skill__list">
							<li> PHP <i class='bx bx-minus-back bx-sm'></i></li>
							<li> Node JS <i class='bx bxl-nodejs bx-sm'></i></li>
							<li> Mysql <i class='bx bx-data bx-sm' ></i></li>
						</ul>
					</div>
				</div>
			</div>
		</section>
		</div>
	`,
	data() {
		return {
			refdata: null
		}
	},
	methods:{
		downloadCV(){
			window.open('CV.pdf', '_blank');
		},
		scrollOffs,
		scrollRefs
	},
	mounted(){
		this.scrollRefs();
	}
}