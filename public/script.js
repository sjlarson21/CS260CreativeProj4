var app = new Vue({
    el: '#app',
    data: {
      hikes: [],
    },
    methods: {
      async getHikes() {
        try {
          let response = await axios.get("/api/hikes");
          this.hikes = response.data;
          return true;
        } catch (error) {
          console.log(error);
        }
      },
    },
    created() {
      this.getHikes();
    },
  });
  
  