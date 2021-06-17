import {default as slide} from './widgets/slideSocial.js';

export default {
     template: `
            <div class="container container-content">
                <div class="row mb-2">
                    <slide-info></slide-info>
                </div>
                <div class="row">
                    <div class="col-sm-12 col-md-6">
                        Nuestro patrocinador
                        <!--slide-info></slide-info-->       
                    </div>
                    <div class="col-sm-12 col-md-6 position-relative">
                        <label for="search">Buscar</label>
                        <input type="text" class="form-control" id="search" v-model="findPost" placeholder="Ingresa tema ...">
                        <div v-show="findPost.length > 0" class="list-group list-group-flush shadow-3 search-box bg-white">
                            <li class="list-group-item list-group-item-action" v-for="posts in findPostsArray"
                                v-text="posts.title" @click="getBlogPostId(posts.id)">
                            </li>
                            <li v-show="findPostsArray.length === 0" class="list-group-item text-center"> 
                                <i class="fas fa-ban"></i> No hay resultados.
                            </li>
                        </div>    
                    </div>
                </div>
                <div class="row my-3">
                    <div class="col-sm-12 col-md-6">
                        <transition-group name="fade" enter-active-class="animate__animated animate__fadeIn" 
                            leave-active-class="animate__animated animate__fadeOut" :duration="{enter:400, leave:500}" mode="out-in">
                            <div class="d-flex justify-content-center align-items-center" :class="{'vh-80':load_post.post}" key="loader">
                                <div :class="{'spinner-border':load_post.post}" role="status">
                                    <span class="visually-hidden">Cargando...</span>
                                </div>
                            </div>
                            <div v-show="!load_post.post" key="content">
                                <h3 v-text="obj_post.title"></h3>
                                <div class="d-flex justify-content-between my-2">
                                    <small class="text-muted" :class="{'invisible':obj_post.updated == obj_post.published}">Actualizado: <i class="fas fa-clock"></i> {{ obj_post.updated }}</small>
                                    <small><b>Publicado: <i class="fas fa-clock"></i></b> <b v-text="obj_post.published"></b></small>
                                </div>
                                <div v-html="obj_post.content" class="lh-sm text-justify"></div>
                            </div>
                        </transition-group>
                    </div>
                    <div class="col-sm-12 col-md-6">
                        <div class="accordion accordion-flush" id="accordionVideo">
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="video-reference">
                                    <button class="accordion-button rounded collapsed bg-danger text-white d-flex justify-content-between" type="button" data-mdb-toggle="collapse" data-mdb-target="#flush-video-net" aria-expanded="false" aria-controls="flush-video-net">
                                        <b><i class="fas fa-angle-double-left"></i> VIDEO DEL TEMA</b>
                                    </button>
                                </h2>
                                <div id="flush-video-net" class="accordion-collapse collapse border border-danger" aria-labelledby="video-reference" data-mdb-parent="#accordionVideo">
                                    <p class="text-center mt-2" :class="{'d-none':video_post !== null}">
                                        <i class="fas fa-ban"></i> Este tema no contiene video.
                                    </p>
                                    <div :class="{'d-none':video_post == null}">
                                        <iframe class="youtube-box" :src="video_post" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="comments">
                            <div id="disqus_thread" class="my-3 comment-box bg-light rounded shadow-3 p-3"></div>
                            <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
                        </div>
                    </div>
                </div>
            </div>`,
    data() {
        return {
            //scopes
            findPost: '',
            counter: 0,
            //data
            load_post:{
                comments: false,
                post: false
            },
            arr_posts: [],
            obj_post: {},
            video_post: null
        }
    },
    components:{
        'slide-info': slide
    },
    computed:{
        findPostsArray(){
            return this.arr_posts.filter((e) => e.title.toLowerCase().indexOf(this.findPost.toLowerCase()) == -1 ? false : true);
        }
    },
    methods:{
        getParseUrlApi(A, B){
            const GET_API = {
                API_URL : 'https://www.googleapis.com/blogger/v3/',
                API_KEY : 'AIzaSyCzlHjHF67TLn7XdNedJ4cZ9jvlbqWhPb8',
                POST_ID : '9045516692467119460'
            };

            const {API_URL, API_KEY, POST_ID} = GET_API;
            return `${API_URL}${A}/${POST_ID}/${B}?key=${API_KEY}`;
        },
        getBlogPosts(){
            let vm = this;
            this.load_post.post = true;
            const Url = this.getParseUrlApi('blogs','posts');

            axios.get(Url).then(res => {
                let dat = res.data.items;
                dat.map((e) => {
                    vm.arr_posts.push({id:e.id, title:e.title}); 
                });

                vm.getBlogPostId(vm.arr_posts[0].id);//call first
            }).catch(err => console.error(err.status));
        },
        getBlogPostId(id){
            this.findPost = '';            
            this.load_post.post = true;

            let vm = this;
            const Url = this.getParseUrlApi('blogs',`posts/${id}`);

            axios.get(Url).then(res => { 
                let {title, published, updated, content, url} = res.data;

                    published = new Date(published).toLocaleDateString();
                    updated = new Date(updated).toLocaleDateString(); 

                vm.obj_post = {title, published, updated, content , url};

                setTimeout(vm.getPostComments(url), 1000); //call first
            }).catch(err => console.error(err.status) )
              .finally(() => vm.load_post.post = false );

        },
        getPostComments(ide){
            //Get url from content blog
            let frag = document.createRange().createContextualFragment(this.obj_post.content);
            let fUrl = frag.querySelector('#video-post');
            this.video_post = fUrl == null ? fUrl : fUrl.href; 

            DISQUS.reset({
                reload: true,
                config: function () {
                    this.page.url = 'https://tiknetbat.blogspot.com/';
                    this.page.identifier = ide.slice(30);
                }
            });
        }
    },
    mounted(){
        this.getBlogPosts();
    },
    created(){
        (function(d) {
            var s = d.createElement('script');
                s.src = 'https://blogdev01.disqus.com/embed.js';
                s.setAttribute('data-timestamp', +new Date());
                (d.head || d.body).appendChild(s);
        })(document);
    }
}