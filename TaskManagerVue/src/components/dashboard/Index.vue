<template>
  <div class="card mb-3">
      <div class="card-body text-center p-5">
        <Bar
            id="my-chart-id"
            :options="chartOptions"
            :data="chartData"
        />
      </div>
  </div>
</template>
<script>
import jwtInterceptor from '../../jwt.interceptor'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
export default {
  name: 'Index',
  components: { Bar },
  data() {
    return {
      item: {},

      chartOptions: {
        responsive: true
      }
    }
  },
  methods: {
    get() {
      jwtInterceptor.get(this.$store.getters.getUrl+'/profile').
      then(response => {

        this.item = response.data.user.tasks;
        
      })
      .catch(error => {
        this.$toast.error(error.response.data.message, {position: "top-right"});
        Object.keys(error.response.data.errors).forEach((key) => {
          error.response.data.errors[key].forEach((errorMessage) => {
              this.$toast.error(`${errorMessage}`, {position: "top-right"});
            });
        });
      })
    },
  },
  created(){
    this.get();
  },
  computed:{
    chartData(){
        return {
        labels: [ 'All', 'Completed', 'Pending' ],
        datasets: [
            {   
                label: 'Tasks',
                backgroundColor: '#5dc44d', 
                data: [this.item.completed + this.item.pending,this.item.completed, this.item.pending]
            }
        ]
      }
    }
  }
}
</script>