<template>
  <div class="NewSale">
    <h1>Ny försäljning / nytt projekt</h1>
    <div class="fieldSection" @submit.prevent="createSale">
      <div class="fields">
        <b-field label="Välj kund:">
          <b-autocomplete
            v-model="customerSearchQuery"
            :data="filteredDataArray"
            field="name"
            placeholder="Sök på kundnamn"
            icon="magnify"
            @select="customerSelected">
            <template slot-scope="props">
              <div class="content">
                {{ props.option.name }}
                <br />
                <small>Kundnummer: {{ props.option.customerNumber }}</small>
              </div>
            </template>
          </b-autocomplete>
        </b-field>
      </div>

      <div class="fields">
        <b-field label="Referens:"></b-field>
        <b-input
          placeholder=" Fyll i referens.."
          v-model="sale.reference">
        </b-input>
      </div>

      <Article-row
        :articles="articles"
        v-for="(row, index) in sale.articleRows"
        v-bind:key="row.Id"
        v-model="sale.articleRows[index]">
			</Article-row>

      <div class="fields">
        <b-button @click="addArticleRow">Lägg till artikel</b-button>
      </div>
      <div class="datefields">
        <div class="fields">
          <b-field label="Datum sålt:">
            <b-datepicker
              v-model="sale.dateSold"
              placeholder="Click to select..."
              icon="calendar-today">
            </b-datepicker>
          </b-field>
        </div>

        <div class="fields">
          <b-field label="Datum skapat:">
            <b-datepicker
              v-model="sale.dateCreated"
              placeholder="Click to select..."
              icon="calendar-today">
            </b-datepicker>
          </b-field>
        </div>

        <div class="fields inputfield">
          <b-field label="Status:">
          <b-select
            v-model="sale.statusSelected"
            placeholder="Ändra status">
            <option value="0">Ej påbörjad</option>
            <option value="1">Pågående</option>
            <option value="2">Färdig</option>
            <option value="3">Borttagen</option>
          </b-select>
          </b-field>
        </div>
      </div>

      <div class="fields buttonField">
        <b-button  @click="postData" type="submit" class="saveBtn" outlined>
          <router-link to="/MySales">Spara</router-link>
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
//import debounce from "lodash/debounce";
import ArticleRow from "../components/ArticleRow.vue";

const baseArticleRow = {
  quantity: 1,
  article: {
    articleNumber: "",
    name: "",
    salesPrice: 0,
    unit: "",
    description: ""
  }
};

export default {
  name: "Sale",
  components: {
    ArticleRow
  },
  props: {
  },

  data() {
    return {
      sale: {
        customer: {
          name: "",
          customerNumber: ""
        },
        articleRows: [baseArticleRow],
        reference: "",
        dateSold: [],
        dateCreated: [],
        statusId: [],
      },
      customers: [],
      articles: [],
			customerSearchQuery: "",
    };
  },

  mounted() {
    this.fetchData();
	},
	
  methods: {
    fetchData() {
      this.$http.get("/api/customer").then(result => {
        this.customers = result.data;
      });

      this.$http.get("/api/article").then(result => {
        this.articles = result.data;
      });
    },
 
    postData: function() {
      this.$http.post("/api/sale", {sale: this.sale})
				.then(result => {this.sale = result.sale})
				.catch(error => (console.log(error.result)))
		},

    addArticleRow() {
      this.sale.articleRows.push(Object.assign({}, baseArticleRow));
		},
		
    customerSelected(option) {
      if(option) {
        this.sale.customer.name = option.name;
        this.sale.customer.customerNumber = option.customerNumber;
      }
		}
	},
	
  computed: {
    filteredDataArray() {
      return this.customers.filter(option => {
        if (option.name.toString().toLowerCase().indexOf(this.customerSearchQuery.toLowerCase()) >= 0 || option.customerNumber.toString().toLowerCase().indexOf(this.customerSearchQuery.toLowerCase()) >= 0) {
          return true;
        }
        return false;
      });
    }
  }
};
</script>

<style scoped lang="css">
  .NewSale {
    max-width: 900px;
    margin: 0 auto;
  }

  h1 {
    color: #4c4c4c;
    text-align: left;
    font-size: 36px;
    font-weight: 600;
    margin: 20px 0 0 20px;
  }

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

  .inputfield {
    width: 60%;
  }

  .datefields {
    display: flex;
  }

  .datefields .fields {
    width: 33%;
  }

  .control .select {
    width: 100%;
  }
  .buttonField {
    display: flex;
    justify-content: flex-start;
  }

  .saveBtn {
    height: 70px;
    width: 200px;
    margin-bottom: 20px;
    font-size: 28px;
  }
</style>
