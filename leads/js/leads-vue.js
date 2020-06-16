/* Configuração das Equipes */
var equipes = [
  { nome: 'Big Gama Brasil', persona: 'Netflix' , URL: 'https://smtl.gama.academy/leads/db21f310-915e-11ea-9e98-2f3c29e0891c', fillColor: "#48A497", leads: 0},
  { nome: 'HERMES'         , persona: 'Airbnb'  , URL: 'https://smtl.gama.academy/leads/db228f50-915e-11ea-9e98-2f3c29e0891c', fillColor: "#0000E0", leads: 0}, /*#A4C5EA*/
  { nome: 'GAMALEÃO'       , persona: 'Zoom'    , URL: 'https://smtl.gama.academy/leads/db22b660-915e-11ea-9e98-2f3c29e0891c', fillColor: "#8D7CC5", leads: 0},
  { nome: 'PANDEMONIACS'   , persona: 'Uber'    , URL: 'https://smtl.gama.academy/leads/db22b661-915e-11ea-9e98-2f3c29e0891c', fillColor: "#D86564", leads: 0},
  { nome: 'FUSCÃO PRETO'   , persona: 'WeChat'  , URL: 'https://smtl.gama.academy/leads/db22b662-915e-11ea-9e98-2f3c29e0891c', fillColor: "#950BFF", leads: 0},
  { nome: 'GAMA RAYS'      , persona: 'Pipefy'  , URL: 'https://smtl.gama.academy/leads/db22b663-915e-11ea-9e98-2f3c29e0891c', fillColor: "#000000", leads: 0},
  { nome: 'Multi7'         , persona: 'Cabify'  , URL: 'https://smtl.gama.academy/leads/db22dd70-915e-11ea-9e98-2f3c29e0891c', fillColor: "#590561", leads: 0},
  { nome: 'OCTAGAMA'       , persona: 'TikTok'  , URL: 'https://smtl.gama.academy/leads/db22dd71-915e-11ea-9e98-2f3c29e0891c', fillColor: "#F5BB00", leads: 0},
  { nome: 'Entendifoinada' , persona: 'SnapChat', URL: 'https://smtl.gama.academy/leads/db22dd72-915e-11ea-9e98-2f3c29e0891c', fillColor: "#711CBB", leads: 0},
];



/* Vue */
const vm = new Vue({
  el: "#app",
  data: {
    loading: true,
    labels: [],
    leads: [],
    backgroundColor: []
  },
  methods: {
    puxarLeads(i) {
        fetch(equipes[i].URL)
          .then(r => r.json())
          .then(r => {
            equipes[i].leads = r.length;
            if (i < equipes.length-1)
              this.puxarLeads(++i)
            else
              this.montaDataset()
          });
    },
    montaDataset() {
      for(var i=0; i<equipes.length; i++)
      {
        this.labels.push(equipes[i].nome);
        this.leads.push(equipes[i].leads);
        this.backgroundColor.push(equipes[i].fillColor);
      }

      this.montaGraficoBarras();
      this.montaGraficoPizza();
      this.loading = false;
    },
    montaGraficoBarras() {
      /* Grafico de Barras */
      var graphBarras = document.getElementById("graphBarras").getContext("2d");
      var barChart = new Chart(graphBarras, {
        type: 'bar',
        data: {
          labels: this.labels,
          datasets: [
            {
              label: 'Quantidade de Leads',
              data: this.leads,
              backgroundColor: this.backgroundColor,
            },
          ]
        }
      });
    },
    montaGraficoPizza() {
      var graphPizza = document.getElementById("graphPizza").getContext("2d");
      var pieChart = new Chart(graphPizza, {
        type: 'pie',
        data: {
          labels: this.labels,
          datasets: [{
            data: this.leads,
            backgroundColor: this.backgroundColor,
          }],
        }
    });
    }
  },
  created() { 
    this.puxarLeads(0);
  }
})

/*
  this.leads[0].id
  this.leads[0].name
  this.leads[0].email
  this.leads[0].ip
*/