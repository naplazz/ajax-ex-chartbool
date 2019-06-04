$(document).ready(function() {

  var url_base = 'http://157.230.17.132:4016/sales';
  $.ajax({
    url: 'http://157.230.17.132:4016/sales',
    method: 'GET',
    success: function(data) {
      var venditebymese = [];

      for (var i = 0; i < data.length; i++) {
        var mese = moment(data[i].date,'DD/MM/YYYY').format('MMMM');
        var venditore = data[i].salesman;
        var valoreVendita = data[i].amount;


        console.log(mese);
      }

      var ctx = $('#myChart1').getContext('2d');
      var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August','September', 'October', 'November', 'December'],
          datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: venditebymese
          }]
        },

        // Configuration options go here
        options: {}
      });









    }, //closing success
    error: function() {
      alert('errore');
    } // closing error


  }); // closing ajax









}); //doc ready close
