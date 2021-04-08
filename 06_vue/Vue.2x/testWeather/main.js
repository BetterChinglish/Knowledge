var app = new Vue({
    el:"#app",
    data:{
        city:"",
        weatherList:[],
    },
    methods:{
        searchWeather:function(){
            // console.log("查找天气")
            // console.log(this.city)
            var that = this;
            axios
            .get("http://wthrcdn.etouch.cn/weather_mini?city=" + this.city)
            .then(function(response){
                // console.log(response)
                console.log(response.data.data.forecast)
                that.weatherList = response.data.data.forecast
            },function(err){
                console.log(err)
            })
        }
    }
})