import { default as ObjConfig, scrollRefs } from './../helpers.js';

export default {
	template : `
		<div>
	    <main class="module grid--sys">
	        <div class="main__intro flex--sys">
	            <h1 class="module__title">Blogs</h1>
	            <article class="module__description">
	                <p>Descubre mi blog con contenido <b>variado</b> en desarrollo,</p>
	                <p>de <b>apps</b> y novedades.</p>
	            </article>
	        </div>
	        <div class="main__autor">
	            <div class="card grid--sys">
	            	<div class="card__image">
	            		<img src="assets/svgs/blogspot.svg" alt="blogspot">
	            	</div>
	            	<div class="card__body">
	            		<h4 class="mb--0">Descubre nuestro contenido ...</h4>
	            		<div class="card__text">
	            			<p class="mb--0">Conformado en:</p>
	            			<ul class="card__list">
	            				<li>Frameworks.</li>
	            				<li>Js esencial.</li>
	            				<li>Estructura UX.</li>
	            				<li>Progresive Web Applications.</li>
	            			</ul>
	            		</div>
	            	</div>
	            </div>
	        </div>
	    </main>
	    <!-- MODULE SECTION  -->
	    <div class="blog container--module grid--sys">
	        <div class="blog__add flex--sys">
	        	<b class="blog__add--info flex--sys" > 
	        		<i class='bx bxl-blogger bx-md'></i> &nbsp; &nbsp;
	        		Contenido proveido por Blogger
	        	</b>
	        </div>
	        <div class="blog__find flex--sys">
	            <label for="find" class="mb--0">Buscar:</label>
	            <input type="text" class="input__form" id="find" v-model="strTitle" placeholder="Ingrese tema ...">
	            <div class="blog__find--results" :class="{'active':showTitles}">
	                <div class="result__title" v-for="post in filterarrPosts" 
	                	:key="post.id" @click="getBlogId(post.id) , strTitle = ''">
	                	<span v-text="post.title"></span>
	                </div>
	            	<p class="text--center" v-show="filterarrPosts.length === 0"> 
	            		<i class='bx bx-block'></i> No se encontraron resultados
	            	</p>
	            </div>
	        </div>
	    </div>	    
    	<section class="blog container--module grid--sys">
	    	<article class="blog__content flex--sys">
		    	<div class="text--center blog__loader flex--sys">
		    		<i :class="{'d--none':!postLoad}" class='bx bx-loader-alt bx-spin bx-md m--auto'></i>
		    	</div>
		    	<div :class="{'d--none':postLoad}">
		    		<div class="blog__header">
		    			<h2 class="mb--0" v-text="objPost.title"></h2>
		    			<div class="blog__header--info flex--sys mb--0">
		    				<small><i class='bx bx-time'></i> Publicado: <b v-text="objPost.published"></b> </small>
		    				<small><i class='bx bx-time'></i> Actualizado: <b v-text="objPost.updated"></b> </small>
		    			</div>
		    		</div>
		    		<div class="blog__body" v-html="objPost.content"></div>
		    	</div>
	    	</article>
	    	<aside class="blog__subcontent">
	    		<div class="blog__video">
	    			<div class="blog__video--ref flex--sys">
	    				<b class="flex--sys"> 
	    					<i class='bx bx-chevrons-right bx-sm'></i> Recurso de referencia
	    				</b>
	    			</div>
	    			<div class="blog__video--content flex--sys">
	    				<p class="text--center" :class="{'d--none':videoPost}"> 
	            			<i class='bx bx-block'></i> No se encontro recurso.
	            		</p>
	    				<iframe class="blog__frame" :class="{'d--none':!videoPost}" :src="videoPost" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
	    			</div>
	    		</div>
	    		<div class="blog__comments">
	    			<div id="disqus_thread"></div>
	    		</div>
	    	</aside>
	    </section>
	    <!-- MODULE SECTION  -->
		</div>
	`,
	data(){
		return {
			strTitle: '',

			showTitles: false,
			arrPosts: [],
			objPost: {},
			videoPost: false,
			// load
			postLoad: true
		}
	},
	computed: {
		filterarrPosts(){
			return this.arrPosts.filter( (ele) => 
					(ele.title).toLowerCase().includes(this.strTitle.toLowerCase()));
		}
	},
	watch: {
		strTitle(nv, ov){
			return this.showTitles = (nv.length === 0) ? false : true;
		}
	},
	methods:{
		setBaseUrl(...param){
			let pcount = param.length;
			let [ prmA, prmB = '' ] = param;

			if (pcount <= 0 || pcount > 2) return console.error('OOpps param not found');
			return `https://www.googleapis.com/blogger/v3/${prmA}/9045516692467119460/${prmB}?key=AIzaSyCzlHjHF67TLn7XdNedJ4cZ9jvlbqWhPb8`;
		},
		async callSyncBlogs() {
			try {
				const posts = await axios.get(this.setBaseUrl('blogs','posts'));
				const { data: { items: arrPsts } } = posts;
				
				this.arrPosts = arrPsts.map(({id, title}) => [{id, title}]).flat(1);
				// get blog
				this.getBlogId(arrPsts[0].id);
			} catch(e) {
				console.log(e);
			}
		},
		async getBlogId(id){
			this.postLoad = true;

			try {
				const blog = await axios.get(this.setBaseUrl('blogs',`posts/${id}`));
				let { title, published, updated, content, url } = blog.data;
						
					published = new Date(published).toLocaleDateString();
	                updated = new Date(updated).toLocaleDateString();

				this.objPost = { title, published, updated, content, url };
				// get comments
				this.getBlogComment(url);

			} catch(e) {
				console.log(e);
			} finally {
				this.postLoad = false;
			}
		},
		getBlogComment(url_d, d = document){
			let frag = d.createRange().createContextualFragment(this.objPost.content);
            let fUrl = frag.querySelector('#video-post');
            this.videoPost = fUrl == null ? fUrl : fUrl.href; 

        	DISQUS.reset({ reload: true,
				config: function () {
					this.page.url = url_d;
				    // this.page.identifier = url_d.slice(30);
				}
			});
		},
		scrollRefs
	},
	mounted(){
		this.scrollRefs();
	},
	created(d = document){
		
		const disqus = new Promise((resolve, reject) => {
			const dqz = d.createElement('script');
		          dqz.type = 'text/javascript';
		          dqz.src = 'https://blogdev01.disqus.com/embed.js';

		    dqz.addEventListener('load',() => resolve(), false);
		    dqz.addEventListener('error',() => reject('No loaded error'), false);
		    (d.head || d.body).appendChild(dqz);
		});
		disqus.then((res) => this.callSyncBlogs()) 
			  .catch((err) => console.error(err.status));
	}
}