
$(document).ready(function refresh() {
  function displayCharts(){
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
  var fatturato_venditori ={
    Riccardo: 0,
    Roberto: 0,
    Marco: 0,
    Giuseppe: 0
  };
  var oggetto_data = {
    labels: [],
    datasets: [{
      label: 'Vendite Per mese',
      data: [],
    }]
  };

  var data_venditori = {
    labels: [],
    datasets: [{
      label: 'Vendite Per venditore',
      data: [],
      backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',

            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',

            ],
            borderWidth: 1
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
        var valoreVendita = parseInt(data[i].amount);
        for (x in fatturato_mensile) {
          if (x == mese) {
            fatturato_mensile[x] += valoreVendita
          } //chiuso if
        } //chiuso forin
        for (z in fatturato_venditori) {
          if (z == venditore) {
            fatturato_venditori[z] += valoreVendita
          } //chiuso if
        } //chiuso forin

        var source   = document.getElementById("entry-template").innerHTML;
        var template = Handlebars.compile(source);
        var context = {
          venditore: venditore,
          data: data[i].date,
          valore: valoreVendita
        };
        var html    = template(context);
        $('tbody').append(html)
      } //chiuso for

      //push dei dati
      for (var y in fatturato_mensile) {
        oggetto_data.datasets[0].data.push(fatturato_mensile[y]);
        var nomimesi = moment(y, 'M').format('MMMM');
        oggetto_data.labels.push(nomimesi);
      }
      for (var z in fatturato_venditori) {
        data_venditori.datasets[0].data.push(fatturato_venditori[z]);
        data_venditori.labels.push(z);
      }
      //=============chart 1==============

      var ctx = document.getElementById('myChart').getContext('2d');
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

}; // closing displayCharts
displayCharts()
//========================================= inserimento vendita ============

  $('#btn').click(function() {
    var newsaleSeller = $('.select-seller').val();
    var newsaleData = $('#datevendita').val()

    var newsaleAmount = $('#amount').val()
      console.log(newsaleAmount)
      $.ajax({
        url: 'http://157.230.17.132:4016/sales',
        method: 'POST',
        data: {
          'salesman': newsaleSeller,
          'amount': newsaleAmount,
          'date': newsaleData
        },
        success: function () {
          alert('inserito')
        },
        error: function(){
          alert('errore')
        }

      }); // closing ajax post



}); //closing click

//========================================= delete sale ============

$('#btnDel').click(function() {
  var saleId = parseInt($('#delete').val())

    $.ajax({
      url: 'http://157.230.17.132:4016/sales/'+ saleId,
      method: 'DELETE',
      success: function () {
        alert('eliminato')
      },
      error: function(){
        alert('errore')
      }

    }); // closing ajax post

}); //closing click


}); //doc ready close
