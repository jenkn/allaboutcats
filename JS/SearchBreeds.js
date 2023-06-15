new Vue({
    el: '#sBreed',                                                  //HTML element ID
    vuetify: new Vuetify(),                                         //Instance of Vuetify created and assigned to the Vue instance
    data: {                                                         //data managed by the Vue instance
        country_flag_url:"",
        images: [],
        breeds:[],
        selected_breed: {},
        current_image: {}
    },
    created(){                                                      //is called as soon as the VUE instance has been created for getting the breed
        this.getBreeds();
    } ,
    watch: {                                                       //Observation function for changes to the selected_breed property

        selected_breed: function()
        {
            console.log(this.selected_breed)

            //CountryFlag
            let country_code = this.selected_breed.country_code.toLowerCase();
            this.country_flag_url = `https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.1/flags/1x1/${country_code}.svg`;
            this.getImages();
        }
    },
    methods:{

        async getBreeds()                                         //to make asynchronous requests using Axios -> code pauses until the requests are completed and the response is returned
        {
            try{
                axios.defaults.headers.common['x-api-key'] = "live_M9jXUdxdpEod5DlSEXxW0a8rBh7AKlCJ5TcLjnsmNH1A0QARWqhItW42kZsvFBXl"

                let response = await axios.get('https://api.thecatapi.com/v1/breeds/' )
                //"await" indicates that the request is asynchronous and is waiting for the response to be returned before the code continues
                //Axios = JavaScript library -> execute HTTP requests-> GET, POST, PUT, or DELETE-For communicating with HTTP-based APIs.
                this.breeds = response.data;

                this.selected_breed = this.breeds[10]
            }catch(err){
                console.log(err)
            }
        },
        async getImages()
        {
            try{
                let query_params = {
                    breed_ids: this.selected_breed.id,
                    limit:8
                }

                let response = await axios.get('https://api.thecatapi.com/v1/images/search', { params: query_params} )
                this.pagination_count = response.headers['pagination-count'];
                this.images = response.data
                this.current_image = this.images[0]


            }catch(err){
                console.log(err)
            }
        }

    }
})