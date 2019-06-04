$(document).ready(function() {
  var url_base = 'http://157.230.17.132:4016/sales';
  var fatturato_mensile = {
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
    '6': 0,
    '7': 0,
    '8': 0,
    '9': 0,
    '10': 0,
    '11': 0,
    '12': 0,
  }

  var oggetto_data = {
    labels: [],
    datasets: [{
      label: 'Vendite Per mese',
      data: [],
    }]
  };
  var fatturato_venditori = [];
  var data_venditori = {
    labels: [],
    datasets: [{
      label: 'Vendite Per venditore',
      data: [],
    }]
  };

  $.ajax({
    url: 'http://157.230.17.132:4016/sales',
    method: 'GET',
    success: function(data) {
      ////=========== inizio funzione per recuperare i dati per chart
      for (var i = 0; i < data.length; i++) {
        var mese = moment(data[i].date, 'DD/MM/YYYY').format('M');
        var venditore = data[i].salesman;
        var valoreVendita = data[i].amount;
        for (x in fatturato_mensile) {
          if (x == mese) {
            fatturato_mensile[x] += valoreVendita
          } //chiuso if
        } //chiuso forin
        if (!fatturato_venditori.includes(venditore)) {
            fatturato_venditori.push([venditore,valoreVendita])
        }
      } //chiuso for
      console.log(fatturato_venditori)
      //push dei dati
      for (var y in fatturato_mensile) {
        oggetto_data.datasets[0].data.push(fatturato_mensile[y]);
        var nomimesi = moment(y, 'M').format('MMMM');
        oggetto_data.labels.push(nomimesi);
      }
      //=============chart 1==============
      var ctx = $('#myChart')[0].getContext('2d');
      var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
        // The data for our dataset
        data: oggetto_data,
        // Configuration options go here
        options: {}
      }); //===========closing chart 1 =================
      ////=========== fine funzione per recuperare i dati per chart 1
      //=============chart 2==============
      var ctx2 = document.getElementById('myChart2').getContext('2d');

      var myDoughnutChart = new Chart(ctx2, {
        type: 'doughnut',
        data: data_venditori,
        options: {}
      });
      //=============fine chart 2==============

    }, //closing success
    error: function() {
      alert('errore');
    } // closing error
  }); // closing ajax
}); //doc ready close
