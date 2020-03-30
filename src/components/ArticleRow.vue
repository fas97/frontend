<template id="article">
  <div class="fields article">
    <div class="articleInfo">
      <div class="inputfield">
        <b-field label="Artikel:"></b-field>
        <b-autocomplete
          v-model="searchQuery"
          :data="filteredDataArray"
          field="name"
          placeholder="Sök på artikel"
          @select="articleSelected">
          <template slot-scope="props">
            <div class="content">
              {{ props.option.name }}
            </div>
          </template>
        </b-autocomplete>
      </div>
      <div class="price">
        <b-field label="Pris:"></b-field>
        <b-input v-model.number="selected.article.salesPrice"></b-input>
      </div>
      <div class="quantity">
        <b-field label="Antal:" ></b-field>
        <b-input v-model.number="selected.quantity"></b-input>
      </div>
      <div class="total">
        <b-field label="Summa:"></b-field>
        <b-input readonly :value="calculateTotalSum"></b-input>
      </div>
    </div>
    <div class="articleMessage">
      <b-field>
        <b-input type="textarea" v-model="selected.article.description"></b-input>
      </b-field>
    </div>
    <hr>
  </div>
</template>

<script>
export default {  
  name: "Article",
  components: {},
  props: {
    value: Object,
    articles: Array
  },

  data() {
    return {
      searchQuery: '',
      selected: this.value,
      tempSelected: null,
      isFetching: false
    };
  },

  methods: {
    articleSelected(option) {
      if(option) {
        this.selected.article = option;
      }
    },
  },

  computed: {
    filteredDataArray() {
      return this.articles.filter(option => {
          if (option.name.toString().toLowerCase().indexOf(this.searchQuery.toLowerCase()) >= 0 || option.articleNumber.toString().toLowerCase().indexOf(this.searchQuery.toLowerCase()) >= 0) {
            return true;
          }
          return false;
      });
    },
    
    calculateTotalSum() {
      if(this.selected.article) { 
        return this.selected.article.salesPrice*this.selected.quantity
      }
      return 0;
    },
  }
}
</script>

<style>
  .fieldSection {
    width: 100%;
  }

  .fields {
    height: auto;
    margin: 10px 20px;
  }

  .field {
    text-align: left;
  }

  .articleInfo {
    display: flex;
  }

  .inputfield {
    width: 60%;
  }

  .price,
  .quantity,
  .total {
    width: 20%;
    margin-left: 20px;
  }

  .articleMessage {
    margin: 20px 0;
  }
</style>