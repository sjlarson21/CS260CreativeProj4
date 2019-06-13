var app = new Vue({
    el: '#admin',
    data: {
        title: "",
        selected: "",
        addHike: null,
        photos: [
            {name: 'bridal veil falls', id: 1, path: '/images/bridalveilfalls.jpg'},
            {name: 'buffalo peak', id: 2, path: '/images/buffalopeak.JPG'},
            {name: 'fifth water hot springs', id: 3, path: '/images/fifthwaterhotsprings.jpg'},
            {name: 'red ledges', id: 4, path: '/images/redledges.jpg'},
            {name: 'squaw peak', id: 5, path: '/images/squawpeak.jpg'},
            {name: 'y hike', id: 6, path: '/images/yhike.jpg'},
            {name: 'timpanogos', id: 7, path: '/images/timpsunset.jpg'},
        ],
        hikes: [],
        findTitle: "",
        findHike: null,
        location: "",
        
    },
    methods: {
        async addNewHike(){
            try {
                let result = await axios.post('/api/hikes', {
                    title: this.title,
                    path: this.selected.path,
                    location: this.location
                });
                this.addHike = result.data;
                this.getHikes();
            } catch (error) {
                console.log(error);
            }
        },
        async getHikes() {
            try {
                let response = await axios.get("/api/hikes");
                this.hikes = response.data;
                return true;
            } catch (error) {
                console.log(error);
            }
        },
        selectHike(hike) {
            this.findTitle = "",
            this.findHike = hike;
        },
        async deleteHike(hike) {
            try {
                let response = await axios.delete("/api/hikes/" + hike.id);
                this.findHike = null;
                this.getHikes();
                return true;
            } catch (error) {
                console.log(error);
            }
        },
        async editHike(hike) {
            try {
                let response = await axios.put("/api/hikes/" + hike.id, {
                    title: this.findHike.title,
                    location: this.findHike.location
                });
                this.findHike = null;
                this.getHikes();
                return true;
            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        this.getHikes();
    },
    computed: {
        suggestions() {
            return this.hikes.filter(hike => hike.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
        }
    },
});